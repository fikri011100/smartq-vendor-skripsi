import React, { useState, useEffect, useRef } from "react";
import { Modal, Col, Row, Button, Form } from "react-bootstrap";
import anterian from "../../common/Firebase/anterian.service";
import toko from "../../common/Firebase/toko.service";
import { useParams } from "react-router-dom";
import { onValue, ref, update, set, push } from "firebase/database";
import { db } from "../../common/Firebase/config";

export default function TambahAntriModal(props) {
	let { id } = useParams();
	const [uidAntri, setUidAntri] = useState();
	const [antri, setAntri] = useState();
	const nomorRef = useRef();
	const namaRef = useRef();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log(id);
		onValue(ref(db, "toko/" + id), (snapshot) => {
			let data = snapshot.val();
			if (data.idAnterian) {
				setUidAntri(data.idAnterian);
				getNomor(data.idAnterian);
				console.log(data);
			} else {
				setAntri("0");
				setUidAntri("");
				console.log("data kosong");
			}
		});
	}, [id]);

	function handleSubmit(e) {
		e.preventDefault();
		let today = new Date();
		try {
			let data = {
				nama: namaRef.current.value,
				status: "Diterima",
				uid: id,
				urutan: antri + 1,
				noTelp: nomorRef.current.value,
				waktuDibuat: today.toLocaleString(),
			};
			setAntri((prevAntri) => prevAntri + 1);
			setMessage("");
			setError("");
			setLoading(true);
			let key = push(ref(db, "/anterian")).key;
			set(ref(db, "anterian/" + key), data);
			set(ref(db, "toko/" + id), { idAnterian: key });
		} catch (error) {
			console.log(error);
			setError(error);
			setLoading(false);
		}
		return props.onHide();
	}

	function getNomor(data) {
		if (data) {
			console.log(data);
			try {
				onValue(ref(db, "anterian/" + data), (snapshot) => {
					const data = snapshot.val();
					setAntri(parseInt(data.urutan));
					console.log(data.urutan);
				});
			} catch (e) {
				console.log(e);
				return e;
			}
		} else {
			console.log("Data Kosong");
			// return 0;
		}
		console.log("execute");
	}

	// function dataInDatabase(){
	//     //console.log(props.idAntri)
	//     try{
	//         let today = new Date()

	//             setAntri(antri + 1)
	//            // console.log("masuk : ",antri+1 )
	//             let data = {
	//                 nama : "Guest",
	//                 status : "Diterima",
	//                 uid : id,
	//                 urutan : antri+1,
	//                 waktuDibuat : today.toLocaleString()
	//             }

	//             let key = anterian.create().key
	//             anterian.setSpesifik(key, data).then(() => {
	//                 let changeKey = {idAnterian : key}
	//                 toko.update(id,changeKey).then(() =>{
	//                     //console.log("Berhasil")
	//                 }).catch((e)=>{
	//                     console.log(e)
	//                 })
	//             }).catch((e)=> {
	//                 console.log(e)
	//             })
	//             //console.log(data)
	//     }catch(e){
	//         console.log(e)
	//     }
	// }
	return (
		<>
			<Modal
				{...props}
				// show={this.props.show}
				// onHide={this.props.hide}
				size='lg'
				arialabelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Body className='antrian-modal-main'>
					<Row>
						<h4>
							<strong>Ada yang Mau Mengantri? </strong>
						</h4>
					</Row>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col>
								<Form.Group id='nama'>
									<Form.Label>Nama Pelanggan</Form.Label>
									<Form.Control type='text' ref={namaRef} required />
								</Form.Group>
							</Col>
							<Col>
								<Form.Group id='nomer'>
									<Form.Label>Nomer Telephone</Form.Label>
									<Form.Control type='text' ref={nomorRef} />
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Button
									variant='primary'
									id='antrian-modal-main-button'
									type='submit'
									onClick={handleSubmit}
								>
									Iya
								</Button>
							</Col>
							<Col>
								<Button
									variant='secondary'
									id='antrian-modal-main-button'
									onClick={props.onHide}
								>
									Batal
								</Button>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
