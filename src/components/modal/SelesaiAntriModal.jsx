import React,{useState} from "react";
import { Modal, Col, Row, Button } from "react-bootstrap";
import anterian from "../../common/Firebase/anterian.service"
import { onValue, ref, update } from "firebase/database";
import { useParams } from "react-router-dom";
import { db } from "../../common/Firebase/config";

export default function SelesaiAntriModal(props) {

	let { id } = useParams();
	const [tokoLatest, setTokoLatest] = useState([]);

	function updateStatus(data){
		try{
			
			if (data) {
				onValue(ref(db, 'anterian/'), (snapshot) => {
					const fetchedTasks = [];
					snapshot.forEach((item) => {
						const dats = item.val();	
						if (dats.urutan != 0 && dats.uid == id && dats.status == "Diterima") {
								const key = item.key; //using await here doesn't work. Return 'await is a reserved word error'
                const data = item.val(); //using await here doesn't work. Return 'await is a reserved word error'
								// console.log(key);
                fetchedTasks.push({ id: key, ...data });
						}
					});
					setTokoLatest(fetchedTasks);
				});
				console.log(tokoLatest[0].id);
				if (data == tokoLatest[0].id) {
					const updateAntrian = {};
					updateAntrian['/anterian/' + data + '/status'] = "Selesai"
					update(ref(db), updateAntrian);
					const updateToko = {};
					updateToko['/toko/' + tokoLatest[0].uid + '/uid'] = data;
					update(ref(db), updateToko);
				} else {
						tokoLatest.forEach((item) => {
							if(item.id == data) {
								const updateAntrian = {};
								updateAntrian['/anterian/' + data + '/status'] = "Selesai"
								update(ref(db), updateAntrian);
							} else {
								const fetchedTasks = [];
								onValue(ref(db, 'anterian/' + data), (snapshot) => {
									// setUrutanLatest(snapshot.val());
									// console.log(snapshot.val())
									fetchedTasks.push(snapshot.val())
									// console.log(item.id)
								}); 
								// setUrutanLatest(fetchedTasks)
								if (item.urutan < fetchedTasks[0].urutan) {
									const updateAntrian = {};
									updateAntrian['/anterian/' + item.id + '/status'] = "Dibatalkan"
									update(ref(db), updateAntrian);
								}
							}
						})
				}
			} else {
				//console.log("data Kosong");
			}
			
		}catch(e){
			console.log(e);
		}
	}

	function dataIn(data){
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
						<strong>Sudah Mengantri?</strong>
					</h4>
				</Row>
				<Row>
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

