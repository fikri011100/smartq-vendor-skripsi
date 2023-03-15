import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import button from 'react-bootstrap/button'
import "../style/css/button.css";
import "../style/css/navbar.css";

function NavBar() {
	return (
		// <Navbar collapseOnSelect expand="lg" fixed="top" className="landing-navbar">
		//     <Navbar.Brand href="/#main" className="navbar-logo">
		//         <img src="images/logo.png" alt="logo smartq" className="logo"/>
		//         <span>SmartQ</span>
		//     </Navbar.Brand>
		//     {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		//     <Navbar.Collapse id="responsive-navbar-nav">

		//         <Nav className="">
		//             <Nav.Link href="#features">Features</Nav.Link>
		//             <Nav.Link href="#pricing">Pricing</Nav.Link>
		//             <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
		//                 <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
		//                 <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
		//                 <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
		//                 <NavDropdown.Divider />
		//                 <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
		//             </NavDropdown>
		//         </Nav> */}

		//     <Navbar.Toggle aria-controls="responsive-navbar-nav" />

		//     <Navbar.Collapse id="responsive-navbar-nav" className="navbar-nav">
		//         <Nav className="me-auto">
		//             <Nav.Link href="/#about" className="navbar-item">Tentang Kami</Nav.Link>
		//             <Nav.Link href="/#layanan" className="navbar-item">Layanan</Nav.Link>
		//             <Nav.Link href="/#contact" className="navbar-item">Hubungi</Nav.Link>

		//             <button className="btn btn-secondary" active href="https://forms.gle/ZrrYHXq1ZaziRKMb6">
		//                 Ayo Gabung
		//             </button>
		//         </Nav>

		//     </Navbar.Collapse>
		// </Navbar>
		<Navbar collapseOnSelect expand='lg' fixed='top' className='landing-navbar'>
			<Navbar.Brand href='/#main' className='navbar-logo'>
				<img src='images/logo.png' alt='logo smartq' className='logo' />
				<span>SmartQ</span>
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='responsive-navbar-nav' />

			<Navbar.Collapse
				id='responsive-navbar-nav'
				className='justify-content-end'
			>
				<Nav className='me-auto nav-group'>
					<Nav.Link href='/#about' className='navbar-item'>
						Tentang Kami
					</Nav.Link>
					<Nav.Link href='/#layanan' className='navbar-item'>
						Layanan
					</Nav.Link>
					<Nav.Link href='/#contact' className='navbar-item'>
						Hubungi
					</Nav.Link>
				</Nav>
				<Nav>
					<button
						className='btn btn-secondary'
						href='https://forms.gle/ZrrYHXq1ZaziRKMb6'
					>
						Ayo Gabung
					</button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
