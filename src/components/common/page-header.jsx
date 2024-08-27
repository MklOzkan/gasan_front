import React from 'react';
import './page-header.scss';
import { signOut } from 'next-auth/react';

const PageHeader = ({ children }) => {

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };
    return (
        <div className="page-header-container">
            <h1 className="page-header">{children}</h1>
            
            
        </div>
    );
};

export default PageHeader;
