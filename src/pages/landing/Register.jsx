import React, { useRef, useState } from "react";
import "./RegisterToko.css";
import { Link, useHistory } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { Card, Button, Form } from "react-bootstrap";

import { useAuth } from "../../common/Firebase/authContext";
import tokoService from "../../common/Firebase/toko.service";
import { getDownloadURL, ref as ref_storage, uploadBytes } from "firebase/storage";
import { ref as ref_db} from "firebase/database";


// import { storage } from "../../common/Firebase/config";
import {
	ref as Reverensi,
	getStorage,
	uploadBytesResumable as uploud,
} from "firebase/storage";
import firebaseConfig, { db } from "../../common/Firebase/config";
import { set } from "firebase/database";

const storage = getStorage(firebaseConfig);

export default function Register() {
	const nameTokoRef = useRef();
	const alamatRef = useRef();
	const [pertama, setPertama] = useState();
	const [akhirRef, setAkhir] = useState();
	const awal = useRef();
	const akhir = useRef();
	const jamBukaRef = useRef()
	const jamTutupRef = useRef();
	const descRef = useRef();
	const noWaRef = useRef();
	const [gambarLogo, setGambarLogo] = useState(null);
	const [gambarToko, setGambarToko] = useState("");
	const [kategories, setKategori] = useState();
	const [logo, setLogo] = useState("");
	const [logoToko, setLogoToko] = useState("");
	const kategoriRef = useRef();
	const kotaRef = useRef();
	const igRef = useRef();
	const facebookRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { currentUser } = useAuth();
	const [images, setImages] = useState([]);
	const [imagesBangunan, setImagesBangunan] = useState([]);
	const [percent, setPercent] = useState(0);
	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB


	const day = [
		{ id: 1, value: "Senin" },
		{ id: 2, value: "Selasa" },
		{ id: 3, value: "Rabu" },
		{ id: 4, value: "Kamis" },
		{ id: 5, value: "Jumat" },
		{ id: 6, value: "Sabtu" },
		{ id: 7, value: "Minggu" },
	];

	const category = [
		{ id: 1, value: "Kesehatan" },
		{ id: 2, value: "Makanan" },
		{ id: 3, value: "Otomotif" },
		{ id: 4, value: "Lifestyle" }
	];

	const handleChange = (e) => {
		e.preventDefault();
		let uuid = window.self.crypto.randomUUID();
		const ProductImg = [e.target.files[0]];
		const images = ProductImg.map((image) => URL.createObjectURL(image));
		// console.log("images", e.target.files[0]);
		setImages(images);
		setGambarLogo(e.target.files[0]);

		const fileName = uuid + "-" + e.target.files[0].name;
		const storageRef = ref_storage(storage, `/images/${fileName}`);

		uploadBytes(storageRef, e.target.files[0]).then((snapshot)=> {
			console.log(snapshot.ref.name);
			getDownloadURL(snapshot.ref).then((downloadUrl) => {
				setLogo(downloadUrl)
			})
		})
	};
	const handleChangeToko = (e) => {
		e.preventDefault();
		let uuid = window.self.crypto.randomUUID();
		const ProductImg = [e.target.files[0]];
		const images = ProductImg.map((image) => URL.createObjectURL(image));
		// console.log("images", images);
		setImagesBangunan(images);
		setGambarToko(e.target.files[0]);

		const fileNameToko = uuid + "-" + e.target.files[0].name;
		const storageRefToko = ref_storage(storage, `/images/${fileNameToko}`);

		uploadBytes(storageRefToko, e.target.files[0]).then((snapshot)=> {
			getDownloadURL(snapshot.ref).then((downloadUrl) => {
				setLogoToko(downloadUrl)
			})
		})
	};
	
	const onBack = (e) => {

		history.push('/register')
	}

	const handleUpload = (e) => {
		// Check if a file has been selected
		e.preventDefault();
		let uuid = window.self.crypto.randomUUID();
		// if (!gambarLogo) {
		// 	console.error("No file selected.");
		// 	return;
		// }

		// // Check if the file is too large
		// if (gambarLogo.size > MAX_FILE_SIZE) {
		// 	console.error("The file size exceeds the limit.");
		// 	return;
		// }

		awal.current = pertama;
		akhir.current = akhirRef;
		kategoriRef.current = kategories
		const buka = awal.current + " - " + akhir.current;
		const jam = jamBukaRef.current.value + " - " + jamTutupRef.current.value;
		console.log(awal.current)

		let data = {
			alamat: alamatRef.current.value,
			desc: descRef.current.value,
			gambar: logo,
			gambarToko: logoToko,
			hariAktif: buka,
			kategori: kategoriRef.current,
			kota: "Malang",
			namaToko: nameTokoRef.current.value,
			phone: noWaRef.current.value,
			waktuBuka: jam,
			instagram: igRef.current.value,
			facebook: facebookRef.current.value,
			idAnterian: "",
			limit: "",
			estimasi: "0"
		};
		set(ref_db(db, 'toko/' + currentUser.uid), data)
		history.push("/antrian/" + currentUser.uid)
		setLoading(false);
	};

	return (
		<Form  className='daftar-toko'>
			<div className='component-12'>
				<button className="buttonBack" onClick={onBack}>
					<img
						className='akar-iconsarrow-left2'
						alt=''
						src='../akariconsarrowleft.svg'
					/>
				</button>
				<b className='notes' >Kembali</b>
			</div>
			<div className='form-daftar'>
				<div className='auto-layout-horizontal'>
					<div className='upload-logo-toko'>
						<div className='logo-toko'>Logo Toko</div>
						<div className='media'>
							<div className='auto-layout-vertical'>
								{images.length == 0 && (
									<div>
										<img
											className='message-icon'
											alt=''
											src='../property-1linear-property-2directsend.svg'
										/>
										<div className='upload-foto'>Upload Foto</div>
									</div>
								)}
								<input
									type='file'
									id='file'
									className='media'
									onChange={handleChange}
									accept='image/png, image/jpg, image/jpeg'
									multiple
								/>
								<div className=''>
									{images.length > 0 && (
										<div>
											{images.map((image, index) => (
												<p key={index}>
													<img className='imagelogo' src={image} alt='' />
												</p>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='nama-toko'>
						<div className='logo-toko'>Nama Toko</div>
						<div className='nametext-statedefault-icon'>
							<Form.Control
								type='text'
								placeholder='Nama Toko'
								className='text11'
								ref={nameTokoRef}
							/>
						</div>
					</div>
				</div>
				<div className='alamat'>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Alamat</div>
						<div className='nametext-statedefault-icon'>
							<Form.Control
								type='text'
								placeholder='Alamat'
								className='text11'
								ref={alamatRef}
							/>
						</div>
					</div>
				</div>
				<div className='hari-operasional'>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Kategori Toko</div>
						<div className='componentinput7'>
							<Form.Control
								as='select'
								value={kategories}
								className='text11'
								onChange={(e) => {
									setKategori(e.target.value);
								}}>
								{category.map((d) => (
									<option value={d.value}>{d.value}</option>
								))}
							</Form.Control>
						</div>
					</div>
				</div>
				<div className='hari-operasional'>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Hari Awal Buka</div>
						<div className='componentinput7'>
							<img
								className='essentional-icon8'
								alt=''
								src='../essentional8.svg'
							/>
							<Form.Control
								as='select'
								value={pertama}
								className='text11'
								onChange={(e) => {
									setPertama(e.target.value);
								}}
							>
								{day.map((d) => (
									<option value={d.value}>{d.value}</option>
								))}
							</Form.Control>
						</div>
					</div>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Hari Terakhir Buka</div>
						<div className='componentinput7'>
							<img
								className='essentional-icon8'
								alt=''
								src='../essentional9.svg'
							/>
							<Form.Control
								as='select'
								value={akhirRef}
								className='text11'
								onChange={(e) => {
									setAkhir(e.target.value);
								}}
							>
								{day.map((d) => (
									<option value={d.value}>{d.value}</option>
								))}
							</Form.Control>
						</div>
					</div>
				</div>
				<div className='hari-operasional'>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Jam Buka</div>
						<div className='componentinput7'>
							<Form.Control
								type='time'
								placeholder='Jam Buka'
								className='text11'
								ref={jamBukaRef}
							/>
						</div>
					</div>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Jam Tutup</div>
						<div className='componentinput7'>
							<Form.Control
								type='time'
								placeholder='Jam Tutup'
								className='text11'
								ref={jamTutupRef}
							/>
						</div>
					</div>
				</div>
				<div className='deskripsi3'>
					<div className='logo-toko'>Deskripsi Toko</div>
					<div className='componentinput11'>
						<Form.Control
							type='text'
							placeholder='Deskripsi Toko'
							className='text17'
							ref={descRef}
						/>
					</div>
				</div>
				<div className='hari-operasional'>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Whatsapp</div>
						<div className='nametext-statedefault-icon'>
							<Form.Control
								type='text'
								placeholder='Nomor Whatsapp'
								className='text11'
								ref={noWaRef}
							/>
						</div>
					</div>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Instagram</div>
						<div className='nametext-statedefault-icon'>
							<Form.Control
								type='text'
								placeholder='Username Instagram'
								className='text11'
								ref={igRef}
							/>
						</div>
					</div>
					<div className='hari-awal-buka'>
						<div className='logo-toko'>Facebook</div>
						<div className='nametext-statedefault-icon'>
							<Form.Control
								type='text'
								placeholder='Link Profile FB'
								className='text11'
								ref={facebookRef}
							/>
						</div>
					</div>
				</div>
				<div >
					<Button
						variant='primary'
						className='component4'
						onClick={handleUpload}
					>
						Daftarkan
					</Button>
				</div>
			</div>
			<img className='container-icon2' alt='' src='../container.svg' />
			<div className='paragraph-container'>
				<div className='daftar1'>Daftar</div>
				<div className='langkah-2-isi-data-toko-deng'>
					Langkah 2 : Isi data toko dengan benar
				</div>
			</div>
			<div className='foto-bangungan'>
				<div className='upload-foto-toko'>
					<div className='thumbnail'>
						<div className='foto-bangunan-toko'>Foto Bangunan Toko</div>
						<div className='foto-toko'>
							<div className='auto-layout-vertical'>
								{imagesBangunan.length == 0 && (
									<div>
										<img className='message-icon' alt='' src='../message.svg' />
										<div className='upload-foto'>Upload Foto</div>
									</div>
								)}
								<input
									type='file'
									id='filebangunan'
									className='foto-toko'
									onChange={handleChangeToko}
									accept='image/png, image/jpg, image/jpeg'
									multiple
								/>
								<div className=''>
									{imagesBangunan.length > 0 && (
										<div>
											{imagesBangunan.map((imagesBangunan, index) => (
												<p key={index}>
													<img
														className='imagetoko'
														src={imagesBangunan}
														alt=''
													/>
												</p>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='paragraph-container1'>
					<b className='notes'>Notes :</b>
					<div className='foto-harus-jelas-tidak-boleh-b'>
						<ol className='foto-harus-jelas-tidak-boleh-b1'>
							<li className='foto-harus-jelas'>
								Foto harus jelas tidak boleh buram
							</li>
							<li>Ukuruan foto harus sesuai</li>
						</ol>
					</div>
				</div>
			</div>
		</Form>
	);
}