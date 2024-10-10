'use client';

import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import LoginForm from '@/components/login/login-form';
import { Suspense } from 'react';

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageHeader>Giriş</PageHeader>
            <Spacer height={150} />
            <LoginForm />
        </Suspense>
    );
};

export default LoginPage;
