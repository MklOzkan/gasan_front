"use client";
import React from "react";
import { Button } from "react-bootstrap";
import Icon from "../icon";
import { useRouter } from "next/navigation";

const BackButton = ({
    title = 'Geri Dön',
    icon = 'MdOutlineArrowBack',
    iconfamily = 'md',
    ...rest
}) => {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        window.location.pathname === "/" ?(null):
        <Button type="button" variant="primary" {...rest} onClick={handleClick}>
            <Icon family={iconfamily} icon={icon} /> {title}
        </Button>
    );
};

export default BackButton;
