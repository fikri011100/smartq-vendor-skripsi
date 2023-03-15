import React, { useRef, useState,useEffect } from "react";
import {useAuth} from "../../common/Firebase/authContext"
import {Form, Button, Row, Col, Tabs, Tab, Alert} from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import toko from "../../common/Firebase/toko"
import dayConvert from "../../common/Converter/dayConvert";

function SetelanProfileUmum() {
	 
    const emailRef = useRef();
    const namaRef = useRef();
    const alamatRef = useRef();
    const nomerRef = useRef();
	const bukaRef = useRef();
    const tutupRef = useRef();
    const hariRef = useRef();
	const { currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const[data, setData] = useState([]);
	const [day, setDay] = useState(dayConvert.day());

	useEffect(()=>{
		toko.getToko(currentUser.uid).on("value",(snapshot)=>{
			setData(snapshot.val());
		})
	},[])
	
    // useEffect (()=>{
    //     data() 
	// 	console.log(data())
    // } )
    // const state = {
    //     nama : "",
    //     email:"",
    //     alamat:"",
    //     nomer:"",
    //     buka:"",
    //     tutup:"",
    //     hari:"",
    // }

    // var data = ()=> {
    // toko.getToko.on('value', function (snapshot) {
    //       setData(snapshot.val());
    //       setLoading(true);
          
    //    });
    // } 

    // function handleSubmit(e) {
	// 		e.preventDefault();

	// 		const promises = [];
	// 		setLoading(true);
	// 		setError("");

	// 		if (emailRef.current.value !== currentUser.email) {
	// 			promises.push(updateEmail(emailRef.current.value));
	// 		}

	// 		Promise.all(promises)
	// 			.then(() => {
	// 				history.push("/");
	// 			})
	// 			.catch(() => {
	// 				setError("Failed to update account");
	// 			})
	// 			.finally(() => {
	// 				setLoading(false);
	// 			});
	// 	}

    return (
			<div>
				<Form>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form.Group controlId='formNamaUsaha'>
						<Form.Label>Nama Usaha</Form.Label>
						<Form.Control
							type='text'
							placeholder='Nama Usaha'
							required
							required
							ref={namaRef}
							defaultValue={data.namaToko}
						/>
					</Form.Group>

					<Form.Group controlId='formAlamat'>
						<Form.Label>Alamat</Form.Label>
						<Form.Control
							type='text'
							placeholder='Alamat'
							ref={alamatRef}
							required
							defaultValue={data.alamat}
						/>
					</Form.Group>

					<Form.Group controlId='formAlamat'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Alamat'
							ref={emailRef}
							required
							defaultValue={currentUser.email}
						/>
					</Form.Group>

					<Form.Group controlId='formNomorTelepon'>
						<Form.Label>Nomor Telepon</Form.Label>
						<Form.Control
							type='text'
							placeholder='081xxxxxxxx'
							required
							ref={nomerRef}
							defaultValue={data.phone}
						/>
					</Form.Group>

					<Row>
						<Col>
							<Form.Group controlId='formJamBuka'>
								<Form.Label>Jam Buka</Form.Label>
								<Form.Control
									type='text'
									placeholder='hh:mm'
									ref={bukaRef}
									required
									defaultValue={data.jamBuka}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='formJamTutup'>
								<Form.Label>Jam Tutup</Form.Label>
								<Form.Control
									type='text'
									placeholder='hh:mm'
									ref={tutupRef}
									required
									defaultValue={data.jamTutup}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group controlId='formHariBuka'>
						<Form.Label>Hari Buka</Form.Label>
						
					</Form.Group>

					<Button
						variant='primary'
						type='submit'
						style={{ alignItem: "right" }}
						disabled={loading}
					>
						Simpan
					</Button>
				</Form>
			</div>
		);
}

export default SetelanProfileUmum
