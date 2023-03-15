import React, {Component, useState} from 'react'
import { Link,Redirect } from 'react-router-dom';

import { FaInstagram, FaFacebookSquare, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../../common/Firebase/authContext";

import { Card, CardDeck, Modal, Col, Row} from 'react-bootstrap'

import Corosel from '../../components/Corosel'
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';

import '../../style/css/button.css';
import '../../style/css/homepage.css';
import '../../style/css/app.css';

function Homepage() {
    const [modalShow, setModalShow] = useState(false);
    const {currentUser} = useAuth();

     function userCheck(e){
        if(e==null){
            <Redirect link="/login" />
        }else{
            <Redirect link="/antrian" />
        }
    }
    return (
        <>
            <NavBar/>

            {/* Top Section */}
            <section className='landing-section light-bg' id="main" >
                <div className='container'>
                    <Row>
                        <Col>
                            <div className='landing-text-wrapper'>
                                <h1 className='landing-header'>
                                    <div>SmartQ</div>
                                    <div>Solusi Atrian Anda</div>
                                </h1>
                                <p className='landing-text'>
                                    Gunakan SmartQ untuk Mendapatkan Pengalaman Baru 
                                    dan Cara Baru yang Menyenangkan dan Mudah dalam Mengantri.
                                </p>
                                    <button className="btn btn-primary" id="homepage-button" onClick={userCheck()}>
                                        Ayo Gabung
                                    </button>
                            </div>
                        </Col>
                        <Col>
                            <div className='landing-img-wrapper'>
                                <img src="images/queue_1.svg" alt="Antrian" className='landing-img' />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Second Section */}
            <section className='landing-section dark-bg' id="about">
                <div className='container'>
                    <Row>
                        <Col>
                            <div className='landing-text-wrapper'>
                                <h1 className='landing-header'>
                                    Apa Itu SmartQ ?
                                </h1>
                                <p  className='landing-text'>
                                    SmartQ merupakan sebuah aplikasi booking 
                                    dan antrian yang dapat dilakukan secara 
                                    online dengan tujuan untuk dapat memudahkan 
                                    masyarakat dalam mengantri serta praktis 
                                    dan lebih efisien waktu. 
                                </p>
                                <button className="btn btn-secondary" id="hompage-button" onClick={() => setModalShow(true)}>
                                    Lihat lebih lanjut
                                </button>

                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className='landing-img-wrapper'>
                                <img src="images/app_1.svg" alt="Antrian" className='landing-img' />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="landing-section light-bg" id='carosel'>
                <Corosel />
            </section>

            {/* Layanan Section */}
            <section className='landing-section dark-bg' id="layanan">
                <div className='container'>
                    <div className="landing-text-wrapper">
                        <h1 className='landing-header'>
                            Layanan Kami
                        </h1>
                        <p className='landing-text'>
                            Terdapat Dua layanan yang Ditawarkan 
                            Yaitu untuk Masyarakat dan Pemilik Usaha.
                        </p>
                    </div>
                    
                    <Row>
                        <Col>
                            <div className="landing-card">
                                <div className="card-img-wrapper">
                                    <img className="card-img" src="images/layanan_1.png" />

                                </div>
                                <div className="landing-card-body">
                                    <h2 className="landing-card-header">SmartQ User</h2>
                                    <p className="landing-card-text">
                                        SmartQ User merupakan fasilitas yang diberikan
                                        kepada seluruh masyarakat untuk dapat menggunakan 
                                        fasilitas tersebut dengan tujuan dan harapan 
                                        dapat mempermudah dan memberikan cara serta pengalaman
                                        yang jauh lebih menyenangkan dalam mengantri
                                        pada suatu tempat.
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div className="landing-card">
                                <img className="card-img" src="images/layanan_2.png" />
                                <div className="landing-card-body">
                                   <h2 className="landing-card-header">SmartQ Vendor</h2>
                                    <p className="landing-card-text">
                                        SmartQ Partner merupakan pihak-pihak merchant yang
                                        telah bekerja sama dengan SmartQ dengan tujuan serta
                                        harapan dapat membantu pertumbuhan dan perkembangan
                                        juga meningkatkan kualitas pelayanan yang ada pada setiap 
                                        merchant yang telah bergabung.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
            </section>

            {/* Contact Section */}
            <section className='landing-section light-bg' id="contact">
                <div className='container' >
                    <Row>
                        <Col>
                            <div className='landing-text-wrapper'>
                                <h1 className='landing-header'>
                                    Hubungi Kami
                                </h1>
                                <p className= 'landing-text'>
                                    Untuk informasi lebih lanjut atau pertanyaan 
                                    mengenai layanan SmartQ silahkan untuk langsung 
                                    menghubungi kami melalui Sosial media kami 
                                    dengan cara menekan icon dibawah ini
                                </p>
                                <Row className="icon-row">
                                    <div className="icon-tray">
                                        <a href="https://api.whatsapp.com/send?phone=6281335125677/?text=Selamat Malam" target="_blank"><FaWhatsapp className="landing-icon"/></a>
                                    </div>
                                    <div className="icon-tray">
                                        <a href="https://www.instagram.com/smartqofficial.id/" target="_blank"><FaInstagram className="landing-icon"/></a>
                                    </div>
                                    <div className="icon-tray">
                                        <a href="https://web.facebook.com/antrian.smartq" target="_blank"><FaFacebookSquare className="landing-icon"/></a>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            <div className='landing-img-wrapper'>
                                <img src="images/contact_2.svg" alt="Antrian" className='landing-img' />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <Footer/>
        </>
    )
}

// Modal Function for Second Section
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <strong>Apa Itu SmartQ?</strong> 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    SmartQ merupakan sebuah aplikasi booking dan atau antrian yang dilakukan secara online 
                    dengan tujuan memberikan konsumen kemudahan, efisiensi, dan efektivitas waktu yang lebih 
                    baik. Selain itu SmartQ juga memberikan profitabilitas lebih bagi UMKM yang sampai hari 
                    ini masih memiliki kendala mengenai system antrian. Dengan adanya perbaikan system antrian 
                    yang ada di Indonesia diharapkan mampu menciptakan, menumbuhkan dan menerapkan kembali 
                    budaya antri yang sudah mulai menghilang di lingkungan masyarakat saat ini. Selain itu 
                    budaya antri merupakan sebuah kegiatan yang seharusnya diterapkan oleh setiap orang pada 
                    tempat dan waktu tertentu. Usaha layanan ini juga dapat mengintegrasikan UMKM yang 
                    membutuhkan solusi mengenai system antrian yang masih belum berjalan dengan baik sehingga 
                    dapat meningkatkan pelayanannya terhadap konsumen yang ada pada suatu tempat tersebut, 
                    sehingga mampu meningkatkan pelayanan yang jauh lebih baik dibandingkan dengan sebelumnya.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={props.onHide}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default Homepage
