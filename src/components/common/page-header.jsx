import React from 'react';
import styles from './page-header.module.scss';
import LogoutButton from './form-fields/logout-button';
import dynamic from 'next/dynamic';

// Dynamically import the BackButton component, disabling SSR
const BackButton = dynamic(
    () => import('@/components/common/form-fields/back-button'),
    {
        ssr: false
    }
);

const PageHeader = ({ children }) => {
    return (
        <div className={styles.page_header_container}>
            <div>
                <BackButton />
            </div>
            <h1 className={styles.page_header}>{children}</h1>
            <div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default PageHeader;
