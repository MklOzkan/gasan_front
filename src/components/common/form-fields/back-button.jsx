"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Icon from "../icon";
import { useRouter } from "next/navigation";
import styles from "./back-button.module.scss";

const BackButton = ({
    title = 'Geri',
    icon = 'MdOutlineArrowBack',
    iconfamily = 'md',
    ...rest
}) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Set the state to true when the component is mounted
    }, []);

    const handleClick = () => {
        router.back();
    };

    if (!isMounted) {
        return null;
    }

    return (
        window.location.pathname === "/" ?(null):
        <Button className={styles.button} type="button" variant="primary" {...rest} onClick={handleClick}>
            {/* <Icon family={iconfamily} icon={icon} />  */}
            {title}
        </Button>
    );
};

export default BackButton;
