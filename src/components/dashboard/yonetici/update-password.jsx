'use client';

import data from '@/helpers/data/update-password-and-main-menu.json';
import { initialResponse } from '@/helpers/form-validation';
import { swAlert } from '@/helpers/swal'; 
import './update-password.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import PageHeader from '@/components/common/page-header.jsx';
import Spacer from '@/components/common/spacer.jsx';
import { SubmitButton, BackButton } from '@/components/common/form-fields';
import { useFormState } from "react-dom";
import { updatePasswordAction } from '@/actions/yonetici-actions';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';



const UpdatePassword = () => {
    const [state, dispatch] = useFormState(updatePasswordAction, initialResponse);
    const router = useRouter();
    const [selectedUsername, setSelectedUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState('');

    const passwordRegex =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*]).{8,}$/;
    const ErrorMessage =
        'Şifre en az bir rakam, bir küçük harf, bir büyük harf, bir özel karakter içermek zorunda ve en az 8 karakter uzunluğunda olmalı.';

    const handleUserChange = (e) => {
        setSelectedUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        const isValid = passwordRegex.test(password);
        setPasswordValid(isValid);
        setInvalidPasswordMessage(ErrorMessage);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Creating a FormData object
        const formData = new FormData();
        formData.append('username', selectedUsername);
        formData.append('newPassword', newPassword);

        if (passwordValid) {
            // Dispatching with formData
        dispatch(formData);
        }

        
    };

   useEffect(() => {
       if (state.ok) {
           swAlert('Şifre Güncellendi', 'success', '', 4000);
           router.push('/dashboard/yonetici-menu');
       } else if (state.message) {
           swAlert('Şifre Güncellenemedi', 'error', '', 4000);
       }
   }, [state, router]);


    return (
        // <div>update password</div>
        <>
            <Spacer height={50} />
            <Container className="text-center m-auto">
                <Row className="menuRow">
                    <div className="inner_container">
                        <Form onSubmit={handleSubmit} noValidate>
                            <div className="passwordMenu">
                                <div controlId="userSelect">
                                    <label>Kullanıcı Seçin</label>
                                    <select
                                        className="select ms-3"
                                        typeof="select"
                                        value={selectedUsername}
                                        onChange={handleUserChange}
                                        required
                                    >
                                        <option className="option" value="">
                                            Seçiniz...
                                        </option>
                                        {data.map((item) => (
                                            <option
                                                className="option"
                                                key={item.id}
                                                value={item.username}
                                            >
                                                {item.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Form.Group controlId="password">
                                    <Form.Label>Yeni Şifre</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            } // Toggle type between text and password
                                            value={newPassword}
                                            className="password_input"
                                            onChange={handlePasswordChange}
                                            placeholder="Yeni Şifreyi Giriniz"
                                            required
                                        />
                                        <InputGroup.Text
                                            onClick={handleTogglePassword}
                                            className="eye"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </InputGroup.Text>
                                        {passwordValid && (
                                            <InputGroup.Text>
                                                <FaCheck color="green" />
                                            </InputGroup.Text>
                                        )}
                                        <Form.Control.Feedback type="invalid">
                                            {invalidPasswordMessage}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    {!passwordValid && (
                                        <div className="text-danger mt-2 ">
                                            {invalidPasswordMessage}
                                        </div>
                                    )}
                                </Form.Group>

                                <SubmitButton
                                    title="Güncelle"
                                    disabled={!passwordValid}
                                />
                            </div>
                        </Form>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default UpdatePassword;