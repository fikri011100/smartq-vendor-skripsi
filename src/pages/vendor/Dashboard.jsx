import React from 'react'
import { Doughnut, Line } from '@reactchartjs/react-chart.js';
import {Row, Col, Dropdown} from 'react-bootstrap'

import DrawerBar from '../../components/Drawer'
import '../../../node_modules/chart.js/dist/Chart.css'
import '../../../node_modules/react-linechart/dist/styles.css';
// import './Dashboard.css'
import '../../../src/style/css/dashboard.css'

function Dashboard() {
    const dataPie = {
        labels: [
            'Online',
            'Offline',
        ],
        datasets: [{
            label: 'Pengunjung Hari Ini',
            data: [300, 50],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };

    // const labels = Utils.months({count: 7});
    const dataLine = {
        datasets: [{
            label: ['Januari', 'Februari', 'Februari'],
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    return (  
        <div>
            <DrawerBar/>
            <div className="dashboard">
                <div className="container">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <div className="dashboard-box">
                        <div className="dashboard-head">

                        </div>  
                    </div>
                    <Row>
                        <Col xs={6}>
                            <div className="dashboard-box">
                                <h3 className="dashboard-box-title">Perbandingan Pengunjung</h3>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Hari ini
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Hari Ini</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Minggu Ini</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Bulan Ini</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Doughnut data={dataPie} />
                            </div>
                        </Col>
                        <Col>
                            <div className="dashboard-box">
                                <h3 className="dashboard-box-title">Total Pengunjung</h3>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Hari ini
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Hari Ini</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Minggu Ini</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Bulan Ini</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <p className="jumlah-pengunjung">100</p>
                            </div>
                        </Col>
                    </Row>

                    <div className="dashboard-box">
                        <Line data={dataLine} />
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default Dashboard
