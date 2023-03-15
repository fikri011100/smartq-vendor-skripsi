import React from 'react'
import DrawerBar from '../../components/Drawer'

import './Pegawai.css'

function Pegawai() {
    return (
        <div>
            <DrawerBar/>
            <div className='pegawai-img-wrapper'>
                <img src="images/comingsoon.png" alt="Antrian" className='pegawai-img' />
            </div>
        </div>
    )
}

export default Pegawai
