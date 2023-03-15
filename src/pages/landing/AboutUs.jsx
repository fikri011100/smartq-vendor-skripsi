import React, { Component } from 'react'

import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';

import { Card, CardDeck, Modal, Col, Row} from 'react-bootstrap'

import './AboutUs.css';
import '../../style/css/app.css';

function AboutUs() {
    return (
        <>
            <NavBar />
            <section className='about-section dark-bg head-box' >
                <div className='container'>
                    <Row>
                        <Col>
                            <div className='about-text-wrapper'>
                                <p className='about-header-text'>Nice to meet you</p>
                                <h1 className='about-header'>Tentang Kami</h1>
                            </div>    
                        </Col>
                        <Col>
                            <div className='about-text-wrapper '>
                                <p className='about-header-text center'>
                                    Pelajari lebih lanjut produk kami untuk siapa serta
                                    kami bekerja sama dengan siapa
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className='about-section light-bg' >
                <div className='container'>
                    <Row>
                        <Col>
                            <div className='about-text-wrapper'>
                                <h1 className='about-header'>The Apps.</h1>
                                <div className='about-img-wrapper'>
                                    <img src="images/aboutus.png" alt="" className='about-img' />
                                </div>
                            </div>    
                        </Col>
                        <Col xs={7}>
                            <div className='about-text-wrapper'>
                                <p className='about-text'>
                                    <b>SmartQ</b> merupakan sebuah aplikasi booking dan atau antrian yang 
                                    dilakukan secara online dengan tujuan memberikan konsumen <b>kemudahan, 
                                    efisiensi,</b> dan <b>efektivitas waktu yang lebih baik.</b> Selain itu SmartQ 
                                    juga memberikan profitabilitas lebih bagi UMKM yang sampai hari ini 
                                    masih memiliki kendala mengenai system antrian. 
                                </p>
                                <p className='about-text'>
                                    Dengan adanya perbaikan system antrian yang ada di Indonesia 
                                    diharapkan mampu menciptakan, menumbuhkan dan menerapkan kembali 
                                    budaya antri yang sudah mulai menghilang di lingkungan masyarakat 
                                    saat ini. Selain itu budaya  antri merupakan sebuah kegiatan yang 
                                    seharusnya diterapkan oleh setiap orang pada tempat dan waktu 
                                    tertentu. 
                                </p>
                                <p className='about-text'>
                                    Usaha layanan ini juga dapat <b>mengintegrasikan UMKM</b> yang membutuhkan 
                                    solusi mengenai system antrian yang masih belum berjalan dengan 
                                    baik sehingga dapat meningkatkan  pelayanannya terhadap konsumen yang 
                                    ada pada suatu tempat tersebut, sehingga mampu  meningkatkan pelayanan 
                                    yang jauh lebih baik dibandingkan dengan sebelumnya.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className='about-section light-bg' >
                <div className='container'>
                    <Row>
                        <Col>
                            <div className='about-text-wrapper'>
                                <h1 className='about-header'>Kami Bekerja Sama Dengan</h1>
                                <p className='about-text'>Tidak ada yang melakukannya sendiri.<br/>Mitra kami cukup keren</p>
                            </div>    
                        </Col>
                        <Col>
                            <div className='about-text-wrapper'>
                                <div className='about-img-wrapper'>
                                    <img src="images/sponsor_logo.png" alt="" className='about-img' />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default AboutUs