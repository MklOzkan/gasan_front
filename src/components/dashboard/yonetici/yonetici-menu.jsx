
import { Col, Container, Row } from 'react-bootstrap';
import {menu} from '@/helpers/data/admin-menu.js';
import Logout from '@/components/common/form-fields/logout-button.jsx';
import './update-password';
import Spacer from '@/components/common/spacer.jsx';
import PageHeader from '@/components/common/page-header.jsx';
import { auth } from '@/auth';
import Link from 'next/link';
import styles from './yonetici-menu.module.scss';

const YoneticiMenu = async () => {

    return (
        <>
            <div className={styles.container}>
                {menu.map((item) => (
                    <div key={item.id} className={styles.inner_container}>
                        <Link
                            href={item.link}
                            style={{ backgroundColor: item.color }}
                            type='button'
                            className={styles.button}
                        >
                            {item.text}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default YoneticiMenu;
