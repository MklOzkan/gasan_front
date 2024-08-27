"use client";
import React from "react";
import { Button } from "react-bootstrap";
import Icon from "../icon";
import { useRouter } from "next/navigation";

const BackButton = ({
	title = "Return back",
	icon = "MdOutlineArrowBack",
	iconfamily = "md",
	...rest
}) => {
	const router = useRouter();

	const handleClick = () => {
		router.back();
	};

	return (
		<Button type="button" variant="secondary" {...rest} onClick={handleClick}>
			<Icon family={iconfamily} icon={icon} /> {title}
		</Button>
	);
};

export default BackButton;
