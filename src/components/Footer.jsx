import React from 'react'
import './Footer.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Footer() {
    return (
        <Navbar collapseOnSelect expand="lg" className="landing-navbar">
            {/* <Navbar.Brand href="#home" id="navbar-logo">
                <img src="images/logo.png" alt="logo smartq" className="logo"/>
                <span>copyright © 2021 Smart Q</span>
            </Navbar.Brand> */}
            <img src="images/getapp.png" alt="geet app in playstore" className="footer-logo"/>
            <span className="copyright">copyright © 2021 Smart Q</span>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="landing-navbar-nav">
                <Nav id="landing-navbar-group">
                    <Nav.Link href="/#about" id="landing-navbar-item">Tentang Kami</Nav.Link>
                    <Nav.Link href="/#layanan" id="landing-navbar-item">Layanan</Nav.Link>
                    <Nav.Link href="/#ontact" id="landing-navbar-item">Hubungi</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Footer
