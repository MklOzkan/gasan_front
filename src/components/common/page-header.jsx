import React from "react";
import "./page-header.scss";

const PageHeader = ({ role, children }) => {

	return <div>
	{role ? <span className="role">{role}</span>:null}
	<h1 className="page-header">{children}</h1>;</div>
};

export default PageHeader;
