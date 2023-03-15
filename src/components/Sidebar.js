import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../common/Firebase/authContext";
import { Button } from "react-bootstrap";
import { auth } from "../common/Firebase/config";

const Sidebar = () => {
	const { currentUser } = useAuth();
	const [error, setError] = useState("");
	const history = useHistory();
	const [uid, setUid] = useState("");
	// const uid = currentUser.uid;

	useEffect(() => {
		try {
			if (currentUser != null) {
				setUid(currentUser.uid);
			}
		} catch(e) {
			console.log(e);
		}
	}, [])
	// debugger;
	async function handleLogout() {
		setError("");
		try {
			auth.signOut();
			history.push("/login");
		} catch (e) {
			setError("Failed to log out");
			console.log(e);
		}
	}

	return (
		<div className='sidebar-div2'>
			<div className='button-div4'>
				<img className='container-icon4' alt='' src='../container3.svg' />
				<div className='smartq-div5'>SMARTQ</div>
			</div>
			<div className='menu-div2'>
				<div className='frame-div51'>
					<div className='frame-div52'>
						<img
							className='essentional-icon18'
							alt=''
							src='../essentional11.svg'
						/>
						<div className='div'>Dashboard</div>
					</div>
				</div>
				<Link to={"/antrian/" + uid} className='antrian-div4'>
					<div className='frame-div52'>
						<img className='essentional-icon18' alt='' src='../user2.svg' />
						<div className='div-drawer'>Antrian</div>
					</div>
				</Link>
				<Link to={"/history/" + uid} className='antrian-div4'>
					<div className='frame-div52'>
						<img className='essentional-icon18' alt='' src='../clock1.svg' />
						<div className='div-drawer'>Riwayat</div>
					</div>
				</Link>
				<div className='antrian-div4'>
					<div className='frame-div52'>
						<img className='essentional-icon18' alt='' src='../setting.svg' />
						<div className='div-drawer'>Pengaturan</div>
					</div>
				</div>
				<Link to={"/profile/" + uid} className='antrian-div4 submenu'>
					<div className='frame-div52'>
						<div className='div-drawer'>-</div>
						<div className='div-drawer'>Data Profil</div>
					</div>
				</Link>
				<Link to={"/toko/" + uid} className='antrian-div4 submenu'>
					<div className='frame-div52'>
						<div className='div-drawer'>-</div>
						<div className='div-drawer'>Data Toko</div>
					</div>
				</Link>
			</div>
			<Button onClick={handleLogout} className='logout-div2'>
				<img className='search-icon2' alt='' src='../arrow27.svg' />
				<b className='keluar-b2'>Keluar</b>
			</Button>
		</div>
	);
};
export default Sidebar;
