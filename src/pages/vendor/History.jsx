import React from "react";
import "reactjs-popup/dist/index.css";
// import DrawerBar from "../../components/Drawer";
import toko from "../../common/Firebase/toko.service";
import anterian from "../../common/Firebase/anterian.service";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
// import { IoPersonAdd } from "react-icons/io5";
import "./History.css";
// import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import moment from "moment";
import Pagination from "../../components/Pagination";
import { onValue } from "firebase/database";
// import { dataPagination } from "../../common/paginationLogic/pagination";
//import toko from "../../common/Firebase/toko";

export default class Antrian extends React.PureComponent {
	constructor(props) {
		super(props);
		this.refreshList = this.refreshList.bind(this);
		this.setData = this.setData.bind(this);
		this.onDataChangeIn = this.onDataChangeIn.bind(this);

		this.state = {
			showHide: false,
			dataIn: [],
			loading: false,
			error: "",
			keyData: null,
			id: this.props.match.params,
			lists: [],
			newData: [],
			firstPage: 0,
			secondPage: 8,
			numberOfPage: 3,
			currentPage: 1,
		};
	}
	componentDidMount() {
		var { id } = this.props.match.params;
		this.setState({ id: id });
		try {
			onValue(anterian.getAntrian(id), this.onDataChangeIn);
		} catch (e) {
			console.log(e);
		}
	}

	componentWillUnmount() {
		var { id } = this.props.match.params;
		try {
			onValue(anterian.getAntrian(id), this.onDataChangeIn);
		} catch (e) {
			console.log(e);
		}
	}

	onDataChangeIn(items) {
		let dataIn = [];
		var { id } = this.props.match.params;
		items.forEach((item) => {
			let key = item.key;
			let data = item.val();
			// console.log(data);
			if (data.uid === id) {
				if (data.status === "Selesai" || data.status === "Dibatalkan") {
					dataIn.push({
						key: key,
						nama: data.nama,
						email: data.email,
						namaToko: data.namaToko,
						status: data.status,
						noTelp: data.noTelp,
						uid: data.uid,
						urutan: data.urutan,
						waktuDipanggil: data.waktuDipanggil,
						waktuDibuat: data.waktuDibuat,
					});
				}
			}
		});
		const { firstPage, secondPage } = this.state;
		const dataNew = this.slice(dataIn, firstPage, secondPage);
		// localStorage.setItem("dataPagination", JSON.stringify(dataNew));
		// localStorage.setItem("allData", JSON.stringify(dataIn));
		this.setState({
			dataIn: dataIn,
			newData: dataNew,
			numberOfPage: parseInt(Object.keys(dataIn).length / secondPage) + 1,
			currentPost: 1,
		});
	}

	changeData() {
		const { currentPage, dataIn, firstPage, secondPage, numberOfPage } =
			this.state;
		if (currentPage == currentPage) {
			console.log(currentPage);
			if (currentPage < numberOfPage) {
				this.setState({
					newData: this.slice(
						dataIn,
						firstPage + secondPage,
						secondPage + secondPage
					),
					currentPage: currentPage + 1,
				});
			} else {
				this.setState({
					newData: this.slice(
						dataIn,
						secondPage - secondPage,
						secondPage - firstPage
					),
					currentPage: currentPage - 1,
				});
			}
		}
	}

	slice(data, firstPage, secondPage) {
		return Object.entries(data)
			.slice(firstPage, secondPage)
			.map((entry) => entry[1]);
	}

	whatshappIcon(data) {
		if (data) {
			let convert = data.slice(1);
			let nomor = "62" + convert;
			return (
				<a
					className='contact-user'
					href={
						"https://api.whatsapp.com/send/?phone=" +
						nomor +
						"/?text=Selamat%Pagi"
					}
					target='_blank'
					rel='noreferrer'
				>
					<IoLogoWhatsapp className='contact-icon' />
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

	render() {
		const { currentPage, numberOfPage, newData } = this.state;
		return (
			<Container>
				<Row>
					<Col>
						<div className='riwayat-div4'>
							<div className='riwayat-div5'>Riwayat</div>
							<div className='search-bar-div2'>
								<div className='componentinput-div20'>
									<img className='search-icon2' alt='' src='../search1.svg' />
									<div className='search-div2'>Search</div>
								</div>
								<div className='componentbutton-div4'>
									<img
										className='essentional-icon17'
										alt=''
										src='../essentional10.svg'
									/>
									<div className='text-div39'>Tambah Pegawai</div>
								</div>
							</div>
							<div className='table-div'>
								<div className='head-of-table'>
									<div className='no-div'>
										<div className='no-antrian-div'>No. </div>
									</div>
									<div className='nama-produk-div'>
										<div className='no-antrian-div'>Nama Pengunjung</div>
									</div>
									<div className='kategori-div'>
										<div className='no-antrian-div'>Tanggal</div>
									</div>
									<div className='kategori-div'>
										<div className='no-antrian-div'>Waktu</div>
									</div>
									<div className='harga-div'>
										<div className='no-antrian-div'>Status</div>
									</div>
								</div>
								<div className='frame-div50'>
									{newData &&
										newData.map((dataIn, index) => (
											<div className='tabel-div' id={index} key={dataIn.key}>
												<div className='isi-tabel-div'>
													<div className='isi-tabel-div1'>
														<div className='no-div1'>
															<div className='selesai-b'>{index + 1}</div>
														</div>
														<div className='nama-div'>
															<div className='naksu-dewi-ayu'>
																{dataIn.nama}
															</div>
														</div>
														<div className='alamat-div6'>
															<div className='selesai-b'>
																{moment(
																	dataIn.waktuDibuat,
																	"DD/MM/YYYY HH:mm"
																).format("DD/MM/YYYY")}
															</div>
															{/* <div className="selesai-b">{dataIn.waktuDibuat}</div> */}
														</div>
														<div className='alamat-div7'>
															<div className='selesai-b'>
																{moment(
																	dataIn.waktuDibuat,
																	"DD/MM/YYYY HH:mm"
																).format("HH:mm")}
															</div>
														</div>
														{dataIn.status === "Selesai" ? (
															<div className='status-div1'>
																<b className='selesai-b'>{dataIn.status}</b>
															</div>
														) : (
															<div className='status-div1-red'>
																<b className='selesai-b'>{dataIn.status}</b>
															</div>
														)}
													</div>
													<div className='dvidier-div' />
												</div>
											</div>
										))}
								</div>
							</div>
							<div></div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div >
							<Pagination
								totalPage={numberOfPage}
								pageNow={currentPage}
								className='paginate'
								changePage={() => {
									this.changeData();
									console.log("masuk");
								}}
							/>
							{/* <div className='pagination'>
							<button className='active'>1</button>
						</div> */}
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}
