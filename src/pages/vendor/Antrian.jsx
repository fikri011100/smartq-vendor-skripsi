import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import DrawerBar from "../../components/Drawer";
import { db } from "../../common/Firebase/config";
import anterian from "../../common/Firebase/anterian.service";
import toko from "../../common/Firebase/toko.service";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { IoPersonAdd } from "react-icons/io5";
import "./Antrian.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
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
import { onValue, ref, update } from "firebase/database";

export default class Antrian extends React.PureComponent {
	constructor(props) {
		super(props);
		this.refreshList = this.refreshList.bind(this);
		this.setData = this.setData.bind(this);
		this.onDataChangeIn = this.onDataChangeIn.bind(this);
		this.onDataChangeOut = this.onDataChangeOut.bind(this);
		this.updateEstimationQueue = this.updateEstimationQueue.bind(this);
		this.changeLimitQueue = this.changeLimitQueue.bind(this);

		this.state = {
			showHide: false,
			dataIn: [],
			loading: false,
			error: "",
			modalTambahAntriShow: false,
			modalMintaNomorShow: false,
			modalSelesaiAntriShow: false,
			modalKonfirmasiBatalShow: false,
			statusList: "waitinglist",
			keyData: null,
			id: this.props.match.params,
			estimate: "0",
			limit: null,
			dataLimit: Array.from({ length: 100 }, (d, index) => index),
			showAlert: false,
		};
	}

	handleModalShowHide() {
		this.setState({ showHide: !this.state.showHide });
	}
	componentDidMount() {
		var { id } = this.props.match.params;
		//console.log(id);
		// console.log(toko.getToko(id));
		try {
			onValue(anterian.getAntrian(id), this.onDataChangeIn);
			onValue(anterian.getAntrian(id), this.onDataChangeOut);
			onValue(ref(db, "toko/" + id), (snapshot) => {
				if (snapshot.child("estimasi").val() != null) {
					let data = snapshot.val();
					this.setState({
						dataToko: data,
						estimate: snapshot.child("estimasi").val(),
						limit: snapshot.child("limit").val(),
					});
				}
			});
		} catch (e) {
			console.log(e);
		}
		// console.log(this.state.dataLimit);
	}

	changeLimitQueue(event) {
		var { id } = this.props.match.params;
		// var data = "";

		onValue(toko.getToko(id), (snapshot) => {
			// data = snapshot.child("limit").val();
			console.log(snapshot.child("limit").val());

			const updates = {};
			updates["/toko/" + id + "/limit"] = event.target.value;

			update(ref(db), updates);
			// toko.update(id, update);
			this.setState({
				limit: event.target.value,
			});
		});
	}

	componentWillUnmount() {
		var { id } = this.props.match.params;
		try {
			onValue(anterian.getAntrian(id), this.onDataChangeIn);
			onValue(anterian.getAntrian(id), this.onDataChangeOut);
			onValue(ref(db, "toko/" + id), (snapshot) => {
				let data = snapshot.val();
				this.setState({
					dataToko: data,
					estimate: snapshot.child("estimasi").val(),
					limit: snapshot.child("limit").val(),
				});
			});
		} catch (e) {
			console.log(e);
		}
	}

	updateEstimationQueue = (event) => {
		var { id } = this.props.match.params;
		var name = "";
		if (event.key === "Enter") {
			onValue(ref(db, "toko/" + id), (snapshot) => {
				name = snapshot.child("estimasi").val();
				const updates = {};
				updates["/toko/" + id + "/estimasi"] = event.target.value;

				update(ref(db), updates);
			});
			this.setState({
				estimate: name,
				showAlert: true,
			});
		}
	};

	handleClose = () => {
		this.setState({
			showAlert: false,
		});
	};

	onDataChangeIn(items) {
		let dataIn = [];
		let name = "";
		let limit = "";
		var { id } = this.props.match.params;
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
			}
		});

		this.setState({
			dataIn: dataIn,
		});
	}

	whatshappIcon(data) {
		if (data) {
			let convert = data.slice(1);
			let nomor = "62" + convert;
			return (
				<a
					className='component-div3'
					href={
						"https://web.whatsapp.com/send?phone=" +
						nomor + 
						"&text=" + encodeURI("Hi,\n\nKami ingin mengingatkan bahwa antrian Anda akan segera tiba. Mohon untuk berada di sekitar lokasi agar tidak melewatkan giliran Anda.\n\nTerima kasih telah bersabar menunggu.")
						 + "&app_absent=0"
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
	userIcon(data) {
		//console.log(data)
		if (data === undefined) {
			return (
				<img
					className='user-photo'
					src='https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280-300x300.jpg'
				/>
			);
		} else {
			return (
				<img
					className='user-photo'
					src='https://img.icons8.com/color/48/000000/user-male-circle--v1.png'
				/>
			);
		}
	}

	onDataChangeOut(items) {
		let dataOut = [];
		var { id } = this.props.match.params;
		items.forEach((item) => {
			let key = item.key;
			let data = item.val();
			if (data.urutan != 0 && data.status == "Diterima" && data.uid == id) {
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
		});
		this.setState(
			{
				dataOut: dataOut,
			}
			//console.log(dataOut)
		);
	}

	refreshList() {
		this.setState({
			currentTutorial: null,
			currentIndex: -1,
		});
	}

	setData(data, index) {
		this.setState({
			currentData: data,
			currentIndex: index,
		});
	}

	// // Data User
	// const [nama, setNama] = useState("Tanfirul Roy");
	// const [waktu, setWaktu] = useState("20:15");
	// const [status, setStatus] = useState("Menunggu Konfirmasi");
	// const [status2, setStatus2] = useState("Menunggu Giliran");
	// const [profil, setProfil] = useState("https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280-300x300.jpg")

	render() {
		const { dataIn, dataOut, showAlert } = this.state;
		// console.log(this.state.dataToko)
		return (
			<div className='antrian-div6'>
				<div className='antrian-div7'>Antrian</div>
				{
					//waitinglist
					this.state.statusList === "waitinglist" ? (
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
												{this.whatshappIcon(dataIn.noTelp)}
												{dataIn.status === "Menunggu Konfirmasi Batal" ? (
													<Button
														className='batal-div3'
														onClick={() =>
															this.setState({
																modalKonfirmasiBatalShow: true,
																keyData: dataIn,
															})
														}
													>
														<div className='text-div40'>
															Konfirmasi Pembatalan
														</div>
													</Button>
												) : (
													<Button
														className='konfirmasi-div3'
														onClick={() =>
															this.setState({
																modalMintaNomorShow: true,
																keyData: dataIn,
															})
														}
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
								<div className='harga-div2'>
									<div className='waktu-check-in'>Ingatkan</div>
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
															{index + 1}.
														</div>
													</div>
													<div className='nama-div3'>
														<div className='naksu-dewi-ayu2'>
															{dataOut.nama}
														</div>
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
													{this.whatshappIcon(dataOut.noTelp)}
													<Button
														className='selesai-div3'
														onClick={() =>
															this.setState({
																modalSelesaiAntriShow: true,
																keyData: dataOut.key,
															})
														}
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
				{this.state.statusList === "waitinglist" ? (
					<div className='filter-div'>
						<button
							className='bulan-div1'
							onClick={() =>
								this.setState({
									statusList: "waitinglist",
								})
							}
						>
							<div className='detail-div'>Waiting List</div>
						</button>
						<button
							className='bulan-div'
							onClick={() =>
								this.setState({
									statusList: "queue",
								})
							}
						>
							<div className='detail-div'>Sedang Mengantri</div>
						</button>
					</div>
				) : (
					<div className='filter-div'>
						<button
							className='bulan-div'
							onClick={() =>
								this.setState({
									statusList: "waitinglist",
								})
							}
						>
							<div className='detail-div'>Waiting List</div>
						</button>
						<button
							className='bulan-div1'
							onClick={() =>
								this.setState({
									statusList: "queue",
								})
							}
						>
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
								value={this.state.limit}
								className='set-limit-antrian'
								onChange={this.changeLimitQueue}
							>
								{this.state.dataLimit?.map((d) => (
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
							placeholder={this.state.estimate + " Menit"}
							onKeyDown={this.updateEstimationQueue}
						/>
					</div>
					<button
						className='componentbutton'
						onClick={() =>
							this.setState({
								modalTambahAntriShow: true,
							})
						}
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
					show={this.state.modalTambahAntriShow}
					onHide={() =>
						this.setState({
							modalTambahAntriShow: !this.state.modalTambahAntriShow,
						})
					}
					// idAntri={this.state.dataToko.idAnterian}
				/>
				<MintaNomerModal
					show={this.state.modalMintaNomorShow}
					onHide={() =>
						this.setState({
							modalMintaNomorShow: !this.state.modalMintaNomorShow,
						})
					}
					data={this.state.keyData}
					// idAntri={this.state.idAntrian}
				/>
				<KonfirmasiBatalAntriModal
					show={this.state.modalKonfirmasiBatalShow}
					onHide={() =>
						this.setState({
							modalKonfirmasiBatalShow: !this.state.modalKonfirmasiBatalShow,
						})
					}
					data={this.state.keyData}
				/>
				<SelesaiAntriModal
					show={this.state.modalSelesaiAntriShow}
					onHide={() =>
						this.setState({
							modalSelesaiAntriShow: !this.state.modalSelesaiAntriShow,
						})
					}
					data={this.state.keyData}
				/>
				<Dialog open={showAlert} onClose={this.handleClose}>
					<DialogTitle>Alert</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Berhasil Mengubah Estimasi Antrian!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color='primary' autoFocus>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
