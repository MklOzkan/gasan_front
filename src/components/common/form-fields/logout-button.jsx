"use client";
import React from "react";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import styles from '@/styles/common/form-fields/logout-button.module.scss';

const LogoutButton = () => {
    const router = useRouter();
    const handleSignOut = async () => {
        //  const result = await signOut({ redirect: false }); // Prevent automatic redirection
        // const logoutUrl = 'http://192.168.0.100:80';
        // if (result) {
        //     router.push(logoutUrl); // Manually redirect to the logout URL
        // }
        signOut({ callbackUrl: '/' });

    };
    return (
        <button className={styles.button} onClick={handleSignOut}>
            Çıkış
        </button>
    );
}

export default LogoutButton;