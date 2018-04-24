// Framework
import React from "react";

const Footer = ({children}) => {
	return (
		children ? 
		<footer>{children}</footer>:
		<footer>Humble Footer</footer>
	)

}

export default Footer;
