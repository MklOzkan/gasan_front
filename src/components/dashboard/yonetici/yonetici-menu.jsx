
import { Col, Container, Row } from 'react-bootstrap';
import data from '@/helpers/data/admin-menu.json';
import Logout from '@/components/common/form-fields/logout-button.jsx';
import './update-password';
import Spacer from '@/components/common/spacer.jsx';
import PageHeader from '@/components/common/page-header.jsx';
import { auth } from '@/auth';
import Link from 'next/link';
import './yonetici-menu.scss';

const YoneticiMenu = async () => {
    const session = await auth();
    const username = session.user.username.toLowerCase();
    console.log("username form yoneti-menu",username);
    console.log("Session from yonetici-menu",session);
    const adminMenu = data[username];

    return (
        <>
            <div className='menu'>
                <PageHeader >YÖNETİCİ EKRANI <Logout /></PageHeader>
                
            </div>
            <Spacer height={50} />
            <Container className="text-center m-auto">
                <Row className="menuRow">
                    {adminMenu.map((item) => (
                        <Col key={item.id}>
                            <Link
                                href={item.link}
                                style={{ backgroundColor: item.color }}
                                className="btn btn-outline-secondary w-100 h-100 align-items-center justify-content-center "
                            >
                                {item.text}
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default YoneticiMenu;
