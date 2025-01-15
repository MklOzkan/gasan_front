"use client";

import { useEffect, useState } from 'react';
import styles from './page-header.module.scss';
import LogoutButton from './form-fields/logout-button';
import dynamic from 'next/dynamic';
import { IoMdMenu } from 'react-icons/io';
import { auth } from '@/auth';
import { CloudFogFill } from 'react-bootstrap-icons';
import MenuButton from './menu-button/MenuButton';

// Dynamically import the BackButton component, disabling SSR
const BackButton =  dynamic(
    () => import('@/components/common/form-fields/back-button'),
    {
        ssr: false
    }
);

const PageHeader =  ( {session, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [ses, setSes] = useState(null);

    useEffect(() => {
        if (session?.accessToken) {
            setUsername(session.user.username || null);
        }
        setSes(session?.accessToken || null); 
    }, [session]);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    }

    

    return (
        <div className={styles.page_header_container}>
            <div>
                <BackButton />
            </div>
            <h1 className={styles.page_header}>{children}</h1>
            <div>
                { !isOpen &&
                   <button
                    tzpe="button"
                    className={styles.menu_button}
                    onClick={() => {
                        handleMenuClick();
                    }}
                >
                    <IoMdMenu size={30} />
                </button> 
                }
                
                {isOpen && (
                    <MenuButton
                        isOpen={isOpen}
                        username={username}
                        session={ses}
                        handleMenuClick={handleMenuClick}
                    />
                )}
            </div>
        </div>
    );
};

export default PageHeader;
