import { useState } from 'react';
import rolesData from '@/json/roles';
import PageHeader from '../common/page-header';
import Spacer from '../common/spacer';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/passwordManager.scss';
import '@/styles/passwordManager.scss';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { config } from '@/helpers/config';

// Sifre olustururken kullanilacak regex
const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

function PasswordManager() {
    const [passwords, setPasswords] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState({}); // Sifrenin gecerli olup olmadigini kontrol eder
    const [passwordVisibility, setPasswordVisibility] = useState({}); // Sifrenin gorunurlugunu kontrol eder
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordChange = (role, value) => {
        setPasswords((prev) => ({ ...prev, [role]: value }));

        if (passwordRegex.test(value)) {
            // Password is valid
            setErrors((prev) => ({ ...prev, [role]: '' }));
            setIsValid((prev) => ({ ...prev, [role]: true }));
        } else {
            // Password is invalid
            setErrors((prev) => ({
                ...prev,
                [role]: 'Şifre en az bır rakam, bir küçük harf, bir büyük harf, bir özel karakter içermek zorunda, ve şifre uzunluğu en az 8 karakter olmak zorunda.'
            }));
            setIsValid((prev) => ({ ...prev, [role]: false }));
        }
    };

    const togglePasswordVisibility = (role) => {
        setPasswordVisibility((prev) => ({ ...prev, [role]: !prev[role] }));
    };

    const handleSubmit = async (role) => {
        if (errors[role] || !passwords[role] || !isValid[role]) {
            alert('Please fix the errors before submitting.');
            return;
        }

        setLoading(true);
        setSuccessMessage('');

        try {
            const response = await fetch(
                `${config.api.baseUrl}/api/set-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role, password: passwords[role] })
                }
            );

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage(
                    `${role} rolü için şifre başarıyla oluşturuldu.`
                );
            } else {
                setErrors((prev) => ({
                    ...prev,
                    [role]: result.message || 'Something went wrong.'
                }));
                setIsValid((prev) => ({ ...prev, [role]: false }));
            }
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                [role]: 'Şifre oluşturma başarısız oldu. Lütfen tekrar deneyin.'
            }));
            setIsValid((prev) => ({ ...prev, [role]: false }));
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {rolesData.length > 0 && (
                <PageHeader role={null}>Şifre Ekranı</PageHeader>
            )}

            <Spacer height={50} />
            <div className="container user">
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
                <table className="table table-striped">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Kullanıcı</th>
                            <th scope="col">Şifre</th>
                            <th scope="col">Kayıt</th>
                        </tr>
                    </thead>
                    <tbody className="user">
                        {rolesData.map((role) => (
                            <tr className="table_row" key={role.id}>
                                <td
                                    className={`role-${role.id} user_role`}
                                    style={{ color: role.color }}
                                >
                                    {role.text}
                                </td>
                                <td>
                                    <div className="d-flex pass_input">
                                        <input
                                            type={
                                                passwordVisibility[role.text]
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            className={`form-control ${
                                                errors[role.text]
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                            value={passwords[role.text] || ''}
                                            onChange={(e) =>
                                                handlePasswordChange(
                                                    role.text,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary ms-2"
                                            onClick={() =>
                                                togglePasswordVisibility(
                                                    role.text
                                                )
                                            }
                                        >
                                            {passwordVisibility[role.text] ? (
                                                <FaRegEye />
                                            ) : (
                                                <FaRegEyeSlash />
                                            )}
                                        </button>
                                    </div>
                                    {errors[role.text] && (
                                        <div className="text-danger mt-1">
                                            {errors[role.text]}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary submit_button"
                                        onClick={() => handleSubmit(role.text)}
                                        disabled={
                                            !isValid[role.text] || loading
                                        }
                                    >
                                        {loading ? 'Onaylanıyor...' : 'Onay'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PasswordManager;
