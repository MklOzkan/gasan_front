
'use client';
import { loginAction } from '@/actions/auth-actions';
import { initialResponse } from '@/helpers/form-validation';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login-form.module.scss';
import TextInput from '../common/form-fields/TextInput';
import { AlertText } from '../common/AlertText';

const LoginForm = () => {
    const [state, dispatch] = useFormState(loginAction, initialResponse);//Formun durumunu ve dispatch fonksiyonunu tutar
    const router = useRouter();//Sayfalar arası geçiş yapmayı sağlar
    const searchParams = useSearchParams();//URL'deki parametreleri alır
    const [username, setUsername] = useState('');//Kullanıcı adını tutar
    const [user, setUser] = useState('');

    useEffect(() => {
        // Get the username from the query parameters
        const usernameFromQuery = searchParams.get('username');
        const linkFromQuery = searchParams.get('link');
        const userFromQuery = searchParams.get('user');
        if (usernameFromQuery && linkFromQuery) {
            setUsername(usernameFromQuery);
            setUser(userFromQuery);
        }
    }, [router, searchParams]);
  
    return (
        <main className={styles.container}>
            <div className={styles.group_container}>
                <form action={dispatch} className={styles.form}>
                    {/* Email Field */}
                    {state.message && (
                        <AlertText type="error" text={state.message} />
                    )}
                    <TextInput
                        className="input_group"
                        labelClassName="label_field"
                        inputClassName="input_field"
                        label={user}
                        name="username"
                        type="hidden"
                        existingValue={username}
                        required
                        error={state?.errors?.email}
                    />
                    {/* Password Field */}
                    <TextInput
                        className="input_group"
                        labelClassName="label_field"
                        inputClassName="input_field"
                        label="Şifre"
                        name="password"
                        type="password"
                        passwordVisible={true}
                        required
                        error={state?.errors?.password}
                    />
                    {/* Submit Button */}
                    <button type="submit" className={styles.login_button}>
                        LOGIN
                    </button>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;
