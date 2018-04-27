// Framework
import React from "react";

const Footer = ({footer}) => {
 	const FooterContent = footer;
	return (
		<footer> {footer ? <FooterContent/> : "Humble Footer"} </footer>
	)
}

export default Footer;
