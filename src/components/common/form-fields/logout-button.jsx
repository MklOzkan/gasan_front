"use client";
import React from "react";
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };
    return (
        <button className="btn btn-primary" onClick={handleSignOut}>
            Logout
        </button>
    );
}

export default LogoutButton;