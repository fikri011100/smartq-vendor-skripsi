import React,{useState,useEffect,useRef} from 'react';
import { Modal, Col, Row, Button, Form} from 'react-bootstrap'
 import anterian from '../../common/Firebase/anterian.service'
 import toko from '../../common/Firebase/toko.service'
import {useParams} from 'react-router-dom'


export default function KonfirmasiBatalModal(props) {
	function updateStatus(data){
			//console.log("data proses");
	try{
		
		if (data) {
			//console.log("masuk Proses");
			const status = {status : "Dibatalkan"}
			anterian
				.update(props.data.key, status)
				.then(() => {
					//setShow(false);
					
					console.log("berhasil");
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			//console.log("data Kosong");
		}
		
	}catch(e){
		console.log(e);
	}
	
	}
	function dataIn(data){
		//console.log("data In")
		try{
			if(data)
			return(
				<Modal 
				{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Body className='antrian-modal-main'>
				<Row>
					<h4>
						<strong>Konfirmasi Pembatalan</strong>
					</h4>
				</Row>
        <Row class="mt-4">
					<h6>
						User {data.nama} ingin membatalkan antrian dengan alasan
					</h6>
				</Row>
        <Row>
					<h6>
						{data.status}
					</h6>
				</Row>
				<Row class="mt-4">
					<Col>
						<Button variant='primary' id='antrian-modal-main-button' 
						onClick={()=>{
							updateStatus(data)
							return props.onHide();
						}}
						>
							Iya
						</Button>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
			);
		}catch(e){
			console.log(e);
		}
	}
	
	return (
		<div>	
			{dataIn(props.data)}
		</div>
		
	);
}

