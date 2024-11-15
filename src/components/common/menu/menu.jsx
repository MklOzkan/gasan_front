"use client";

import { Col, Row} from "react-bootstrap";
import styles from "./menu.module.scss";
import { useRouter } from "next/navigation";
import PageHeader from "../page-header";
import Spacer from "../spacer";
import menuItems from "@/helpers/data/update-password-and-main-menu.json";

const Menu = () => {
    const router = useRouter();

    const handleClick = (username, link, text) => {
        if (typeof username === 'string') {
            router.push(
                `/login?username=${encodeURIComponent(
                    username
                )}&link=${encodeURIComponent(link)}
                &user=${encodeURIComponent(text)}`
            );
        }
    };

    return (
        <>
            <PageHeader>ANA SAYFA</PageHeader>
            <Spacer height={25} />
            <main className={styles.container}>
                    {menuItems.map((item) => (
                        <div key={item.id} className={styles.innerContainer}>
                            <div
                                style={{ backgroundColor: item.color }}
                                onClick={() => handleClick(item.username, item.link, item.text)}
                                className={styles.menuDiv}
                            >
                                {item.text}
                            </div>
                        </div>
                    ))}
            </main>
        </>
    );
};

export default Menu;
