import React from 'react';
import './page-header.scss';
import LogoutButton from './form-fields/logout-button';
import BackButton from './form-fields/back-button';

const PageHeader = ({ children }) => {
    return (
        <div className="page-header-container">
            <div>
                <BackButton />
            </div>
            <h1 className="page-header">{children}</h1>
            <div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default PageHeader;
