import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
// import DrawerBar from "../../components/Drawer";
import riwayat from "../../common/Firebase/riwayat.service";
// import { Button, Card, Row, Col } from "react-bootstrap";
// import { IoPersonAdd } from "react-icons/io5";
import "./History.css";
// import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import moment from "moment";
import Pagination from "../../components/Pagination";
// import { dataPagination } from "../../common/paginationLogic/pagination";
//import toko from "../../common/Firebase/toko";
import { onValue } from "firebase/database";

export default function Antrian(props) {
	const [showHide, setShowHide] = useState(false);
	const [dataIn, setdataIn] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [keyData, setKeyData] = useState(null);
	const [lists, setLists] = useState([]);
	const [newData, setNewData] = useState([]);
	const [firstPage, setFirstPage] = useState(0);
	const [secondPage, setSecondPage] = useState(8);
	const [numberOfPage, setNumberOfPage] = useState(3);
	const [currentPage, setCurrentPage] = useState(0);
	var { id } = this.props.match.params;

	useEffect(() => {
		try {
			onValue(riwayat.getAntrian(id, (snapshot) => onDataChangeIn(snapshot)));
		} catch (e) {
			console.log(e);
		}
	}, []);

	function onDataChangeIn(items) {
		items.forEach((item) => {
			let key = item.key;
			let data = item.val();
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
		const dataNew = slice(dataIn, firstPage, secondPage);
		// localStorage.setItem("dataPagination", JSON.stringify(dataNew));
		// localStorage.setItem("allData", JSON.stringify(dataIn));

		setdataIn(dataIn);
		setNewData(dataNew);
		setNumberOfPage(parseInt(Object.keys(dataIn).length / secondPage));
		setCurrentPage(1);
	}

	function changeData() {
		console.log("jalan");
		if (currentPage < numberOfPage) {
			setNewData(
				slice(dataIn, firstPage + secondPage, secondPage + secondPage)
			);
			setCurrentPage(currentPage + 1);
		} else {
			setNewData(
				slice(dataIn, firstPage - secondPage, secondPage - secondPage)
			);
			setCurrentPage(currentPage - 1);
		}
	}

	function slice(data, firstPage, secondPage) {
		return Object.entries(data)
			.slice(firstPage, secondPage)
			.map((entry) => entry[1]);
	}

	function whatshappIcon(data) {
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
	function userIcon(data) {
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

	// function refreshList() {
	// 		currentTutorial: null,
	// 		currentIndex: -1,
	// }

	// function setData(data, index) {
	// 		setCurrentData(data)
	// 		setCurrentIndex(index)
	// }

	return (
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
											<div className='naksu-dewi-ayu'>{dataIn.nama}</div>
										</div>
										<div className='alamat-div6'>
											<div className='selesai-b'>
												{moment(dataIn.waktuDibuat, "DD/MM/YYYY HH:mm").format(
													"DD/MM/YYYY"
												)}
											</div>
											{/* <div className="selesai-b">{dataIn.waktuDibuat}</div> */}
										</div>
										<div className='alamat-div7'>
											<div className='selesai-b'>
												{moment(dataIn.waktuDibuat, "DD/MM/YYYY HH:mm").format(
													"HH:mm"
												)}
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
			<div>
				<div className='container'>
					<Pagination
						totalPage={numberOfPage}
						pageNow={currentPage}
						changePage={() => {
							changeData();
							console.log("masuk");
						}}
					/>
					{/* <div className='pagination'>
							<button className='active'>1</button>
						</div> */}
				</div>
			</div>
		</div>
	);
}
