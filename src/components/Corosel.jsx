import React, { useEffect, useState } from "react";
import {Carousel} from 'react-bootstrap'

export default class Corosel extends React.Component{
    render(){
        return (
                <div className="container">
                {/* {ControlledCarousel} */}

                <Carousel>
                    <Carousel.Item interval={2000} >
                        <img
                            className="d-block w-100"
                            src="images/poster_1.jpg"
                            alt="First slide"
                            style={{maxHeight:"450px", width:"auto", objectFit:"cover"}}
                        />
                        <Carousel.Caption>
                            <h3>Mengantri Membosankan</h3>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="images/poster_2.jpg"
                            alt="Second slide"
                            style={{maxHeight:"450px", width:"auto", objectFit:"cover"}}
                        />

                        <Carousel.Caption>
                            <h3>Tidak Adanya Kepastian Waktu</h3>
                        
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="images/poster_3.jpg"
                            alt="Third slide"
                            style={{maxHeight:"450px", width:"auto", objectFit:"cover"}}
                        />

                        <Carousel.Caption>
                            <h3>Mengantri Melelahkan</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}
