import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import { db } from "../../common/Firebase/config";
import anterian from "../../common/Firebase/anterian.service";
import toko from "../../common/Firebase/toko.service";
import { Button, Form } from "react-bootstrap";
import "./Antrian.css";
import TambahAntriModal from "../../components/modal/TambahAntriModal";
import MintaNomerModal from "../../components/modal/MintaNomerModal";
import SelesaiAntriModal from "../../components/modal/SelesaiAntriModal";
import KonfirmasiBatalAntriModal from "../../components/modal/KonfirmasiBatalAntriModal";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import moment from "moment";
import { onValue } from "firebase/database";

export default function Antrian() {
	const [estimate, setEstimate] = useState();
	const [dataIn, setDataIn] = useState([]);
	const [dataOut, setDataOut] = useState([]);
	// const [show, setShow] = useState();
	const [keyData, setKeyData] = useState([]);
	const [limit, setLimit] = useState();
	// const [loading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [statusList, setStatusList] = useState("waitinglist");
	// const [currentData, setCurrentData] = useState();
	// const [currentIndex, setCurrentIndex] = useState();
	// const [currentTutorial, setCurrentTutorial] = useState();
	const [modalTambahAntriShow, setModalTambahAntriShow] = useState(false);
	const [modalSelesaiAntriShow, setModalSelesaiAntriShow] = useState(false);
	const [modalMintaNomorShow, setModalMintaNomorShow] = useState(false);
	const [modalKonfirmasiBatalShow, setModalKonfirmasiBatalShow] =
		useState(false);

	const dataLimit = Array.from({ length: 100 }, (d, index) => index);
	const id = this.props.match.params || null;

	// function handleModalShowHide() {
	// 	setShow(!show);
	// }

	useEffect(() => {
		try {
			onValue(anterian.getAntrian(id), (snapshot) => {
				onDataChangeIn(snapshot);
			});
		} catch (e) {
			console.log(e);
		}
		console.log(dataLimit);
	}, [dataLimit, id]);

	function changeLimitQueue(event) {
		db.ref(`toko/${id}`).on("value", (snapshot) => {
			// data = snapshot.child("limit").val();
			let update = {
				limit: event.target.value,
			};
			toko.update(id, update);
			setLimit(event.target.value);
		});
	}

	const updateEstimationQueue = (event) => {
		var name = "";
		if (event.key === "Enter") {
			db.ref(`toko/${id}`).on("value", (snapshot) => {
				name = snapshot.child("estimasi").val();
				let update = {
					estimasi: event.target.value,
				};
				toko.update(id, update);
			});
			setEstimate(name);
			setShowAlert(!showAlert);
		}
	};

	const handleClose = () => {
		setShowAlert(!showAlert);
	};

	function onDataChangeIn(items) {
		let dataIn,
			dataOut = [];

		db.ref(`toko/${id}`).on("value", (snapshot) => {
			setEstimate(snapshot.child("estimasi").val());
			setLimit(snapshot.child("limit").val());
		});
		items.forEach((item) => {
			let key = item.key;
			let data = item.val();
			//console.log(data);
			if (data.urutan == 0 && data.uid == id) {
				if (data.status != "Dibatalkan") {
					dataIn.push({
						key: key,
						nama: data.nama,
						email: data.email,
						namaToko: data.namaToko,
						status: data.status,
						noTelp: data.noTelp,
						uid: data.uid,
						urutan: data.urutan,
						waktuDipanngil: data.waktuDipanggil,
						waktuDibuat: data.waktuDibuat,
					});
				}
				if (data.status == "Diterima") {
					dataOut.push({
						key: key,
						email: data.email,
						nama: data.nama,
						namaToko: data.namaToko,
						status: data.status,
						uid: data.uid,
						noTelp: data.noTelp,
						urutan: data.urutan,
						waktuDipanngil: data.waktuDipanggil,
						waktuDibuat: data.waktuDibuat,
					});
				}
			}
		});
		setDataIn(dataIn);
		setDataOut(dataOut);
	}

	function whatshappIcon(data) {
		if (data) {
			let convert = data.slice(1);
			let nomor = "62" + convert;
			return (
				<a
					className='component-div3'
					href={
						"https://api.whatsapp.com/send/?phone=" +
						nomor +
						"/?text=Selamat%Pagi"
					}
					target='_blank'
				>
					<div className='text-div40'>Chat WA</div>
				</a>
			);
		} else {
			return <div></div>;
		}
	}
	// function userIcon(data) {
	// 	//console.log(data)
	// 	if (data === undefined) {
	// 		return (
	// 			<img
	// 				className='user-photo'
	// 				src='https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280-300x300.jpg'
	// 			/>
	// 		);
	// 	} else {
	// 		return (
	// 			<img
	// 				className='user-photo'
	// 				src='https://img.icons8.com/color/48/000000/user-male-circle--v1.png'
	// 			/>
	// 		);
	// 	}
	// }

	// function refreshList() {
	// 	setCurrentIndex(-1);
	// 	setCurrentTutorial(null);
	// }

	// function setData(data, index) {
	// 	setCurrentData(data);
	// 	setCurrentIndex(index);
	// }

	// // Data User
	// const [nama, setNama] = useState("Tanfirul Roy");
	// const [waktu, setWaktu] = useState("20:15");
	// const [status, setStatus] = useState("Menunggu Konfirmasi");
	// const [status2, setStatus2] = useState("Menunggu Giliran");
	// const [profil, setProfil] = useState("https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280-300x300.jpg")

	return (
		<div className='antrian-div6'>
			<div className='antrian-div7'>Antrian</div>
			{
				//waitinglist
				statusList === "waitinglist" ? (
					<div className='table-div1'>
						<div className='head-of-table1'>
							<div className='no-div3'>
								<div className='waktu-check-in'>No.</div>
							</div>
							<div className='nama-produk-div1'>
								<div className='waktu-check-in'>Nama Pengunjung</div>
							</div>
							<div className='kategori-div2'>
								<div className='waktu-check-in'>Waktu Check In</div>
							</div>
							<div className='harga-div1'>
								<div className='waktu-check-in'>Status</div>
							</div>
							<div className='harga-div2'>
								<div className='waktu-check-in'>Ingatkan</div>
							</div>
							<div className='aksi-div'>
								<div className='waktu-check-in'>Aksi</div>
							</div>
						</div>
						<div className='tabel-div2'>
							{dataIn &&
								dataIn.map((dataIn, index) => (
									<div className='isi-tabel-div4'>
										<div className='isi-tabel-div5'>
											<div className='no-div4'>
												<div className='didalam-antrian-b'>{index + 1}</div>
											</div>
											<div className='nama-div2'>
												<div className='naksu-dewi-ayu1'>{dataIn.nama}</div>
											</div>
											<div className='alamat-div10'>
												<div className='div17'>
													{moment(
														dataIn.waktuDibuat,
														"DD/MM/YYYY HH:mm"
													).format("HH:mm")}
												</div>
											</div>
											<div className='status-div4'>
												<b className='didalam-antrian-b'>Didalam Antrian</b>
											</div>
											{whatshappIcon(dataIn.noTelp)}
											{dataIn.status === "Menunggu Konfirmasi Batal" ? (
												<Button
													className='batal-div3'
													onClick={() => {
														setModalKonfirmasiBatalShow(
															!modalKonfirmasiBatalShow
														);
														setKeyData(dataIn);
													}}
												>
													<div className='text-div40'>
														Konfirmasi Pembatalan
													</div>
												</Button>
											) : (
												<Button
													className='konfirmasi-div3'
													onClick={() => {
														setModalMintaNomorShow(!modalMintaNomorShow);
														setKeyData(dataIn);
													}}
												>
													<div className='text-div40'>Konfirmasi</div>
												</Button>
											)}
										</div>
										<div className='dvidier-div2' />
									</div>
								))}
						</div>
					</div>
				) : (
					//queue
					<div className='table-div1'>
						<div className='head-of-table1'>
							<div className='no-div5'>
								<div className='no-antrian-div2'>No. Antrian</div>
							</div>
							<div className='nama-produk-div2'>
								<div className='no-antrian-div2'>Nama Pengunjung</div>
							</div>
							<div className='kategori-div3'>
								<div className='no-antrian-div2'>Waktu Check In</div>
							</div>
							<div className='harga-div3'>
								<div className='no-antrian-div2'>Status</div>
							</div>
							<div className='aksi-div3'>
								<div className='no-antrian-div2'>Aksi</div>
							</div>
						</div>
						<div className='tabel-div2'>
							{dataOut &&
								dataOut.map((dataOut, index) => (
									<div id={index} className='tabel-div3'>
										<div className='isi-tabel-div6'>
											<div className='isi-tabel-div7'>
												<div className='no-div6'>
													<div className='menunggu-konfirmasi-b'>
														{dataOut.urutan}.
													</div>
												</div>
												<div className='nama-div3'>
													<div className='naksu-dewi-ayu2'>{dataOut.nama}</div>
												</div>
												<div className='alamat-div11'>
													<div className='div24'>
														{moment(
															dataOut.waktuDibuat,
															"DD/MM/YYYY HH:mm"
														).format("HH:mm")}
													</div>
												</div>
												<div className='status-div6'>
													<b className='menunggu-konfirmasi-b'>
														{dataOut.status}
													</b>
												</div>
												<Button
													className='selesai-div3'
													onClick={() => {
														setModalSelesaiAntriShow(!modalSelesaiAntriShow);
														setKeyData(dataOut.key);
													}}
												>
													<div className='text-div40'>Selesai</div>
												</Button>
											</div>
											<div className='dvidier-div3' />
										</div>
									</div>
								))}
						</div>
					</div>
				)
			}
			{statusList === "waitinglist" ? (
				<div className='filter-div'>
					<button
						className='bulan-div1'
						onClick={() => setStatusList("waitinglist")}
					>
						<div className='detail-div'>Waiting List</div>
					</button>
					<button className='bulan-div' onClick={() => setStatusList("queue")}>
						<div className='detail-div'>Sedang Mengantri</div>
					</button>
				</div>
			) : (
				<div className='filter-div'>
					<button
						className='bulan-div'
						onClick={() => setStatusList("waitinglist")}
					>
						<div className='detail-div'>Waiting List</div>
					</button>
					<button className='bulan-div1' onClick={() => setStatusList("queue")}>
						<div className='detail-div'>Sedang Mengantri</div>
					</button>
				</div>
			)}
			<div className='footer-div3'>
				<div className='frame-div61'>
					<div className='made-with3'>{`Made With ❤ `}</div>
					<div className='smartq-div6'>SmartQ</div>
				</div>
			</div>
			<div className='set-items-div'>
				<div className='dropdown-limit-antri'>
					<div className='set-limit-antrian'>Set Limit Antrian</div>
					<div className='frame-div62'>
						<Form.Control
							as='select'
							defaultValue={limit}
							className='set-limit-antrian'
							onChange={changeLimitQueue}
						>
							{dataLimit?.map((d) => (
								<option value={d + 1}>{d + 1}</option>
							))}
						</Form.Control>
					</div>
				</div>
				<div className='dropdown-limit-antri'>
					<div className='set-limit-antrian'>Set Estimasi waktu (Menit)</div>
					<input
						className='frame-input'
						type='text'
						name='estimation'
						placeholder={estimate + " Menit"}
						onKeyDown={updateEstimationQueue}
					/>
				</div>
				<button
					className='componentbutton'
					onClick={() => setModalTambahAntriShow(!modalTambahAntriShow)}
				>
					<img
						className='essentional-icon21'
						alt=''
						src='../essentional21.svg'
					/>
					<div className='text-div41'>Tambah Antrian</div>
				</button>
			</div>
			<TambahAntriModal
				show={modalTambahAntriShow}
				onHide={() => setModalTambahAntriShow(!modalTambahAntriShow)}
				// idAntri={this.state.dataToko.idAnterian}
			/>
			<MintaNomerModal
				show={modalMintaNomorShow}
				onHide={() => setModalMintaNomorShow(!modalMintaNomorShow)}
				data={keyData}
				// idAntri={this.state.idAntrian}
			/>
			<KonfirmasiBatalAntriModal
				show={modalKonfirmasiBatalShow}
				onHide={() => setModalKonfirmasiBatalShow(!modalKonfirmasiBatalShow)}
				data={keyData}
			/>
			<SelesaiAntriModal
				show={modalSelesaiAntriShow}
				onHide={() => setModalSelesaiAntriShow(!modalSelesaiAntriShow)}
				data={keyData}
			/>
			<Dialog open={showAlert} onClose={handleClose}>
				<DialogTitle>Alert</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Berhasil Mengubah Estimasi Antrian!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary' autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
