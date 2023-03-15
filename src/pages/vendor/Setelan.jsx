import React from "react";

import DrawerBar from "../../components/Drawer";
import SetelanProfileUmum from "./SetelanProfileUmum";
import SetelanProfileKhusus from "./SetelanProfileKhusus";

import { Tabs, Tab } from "react-bootstrap";

import "./Setelan.css";

function Setelan() {
	return (
		<div>
			<DrawerBar />
			<div>
				<ul className='setelan-navbar'>
					<li className='setelan-list'>
						<a class='active' href='#profil'>
							Profil
						</a>
					</li>
					<li className='setelan-list'>
						<a href='#privasi'>Kebijakan Privasi</a>
					</li>
				</ul>
			</div>

			{/* Setelan Profil */}
			<div className='setelan-main'>
				<Tabs defaultActiveKey='umum' id='tab-setelan-profil' className='mb-3'>
					<Tab eventKey='umum' title='Umum'>
						<SetelanProfileUmum />
					</Tab>
					<Tab eventKey='khusus' title='Khusus'>
						<SetelanProfileKhusus />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}

export default Setelan;
