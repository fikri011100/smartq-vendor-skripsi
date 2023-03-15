import React,{useState,useEffect,useRef} from "react";
import { Modal, Col, Row, Button, Form} from "react-bootstrap";
import toko from '../../common/Firebase/toko.service'
import anterian from "../../common/Firebase/anterian.service";
import { useParams } from "react-router-dom";
import { onValue, ref, update } from "firebase/database";
import { db } from "../../common/Firebase/config";


export default function MintaNomerModal(props) {
    let { id } = useParams();
	const [uidAntri, setUidAntri] = useState();
	const [antri, setAntri] = useState(0);
    const [datas, setDatas] = useState();
    const nomorRef = useRef();
    const waktuRef = useRef();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    
     useEffect(() => {
				onValue(ref(db, 'toko/' + id), (snapshot) => {
					let data = snapshot.val();
					setUidAntri(data.uid);
					getNomor(data.uid);
					console.log(data);
                    setDatas(data);
				});
			}, [uidAntri]);
  
    function getNomor(data) {
                try {
                    if (data) {
                        //console.log(data)
                        try {
                            console.log(data);
                            onValue(ref(db, 'anterian/' + data), (snapshot) => {
                                    const data = snapshot.val();
                                    setAntri(parseInt(data.urutan));
                                    console.log(antri)
                                });
                        } catch (e) {
                            console.log (e)
                            return e;
                        }
                    } else {
                        console.log("Data Kosong")
                        //return 0;
                    }
                } catch (e) {
                    console.log(e)
                    return e;
                }
                //console.log("execute")
            }    

    function  handleSubmit(e){
         e.preventDefault();
         try{
            setMessage("");
			setError("");
            const updateAntrian = {};
            const updateToko = {};
            
            updateAntrian['/anterian/' + props.data.key + '/urutan'] = nomorRef.current.value
            updateToko['/toko/' + id + '/idAnterian'] = props.data.key
            // anterian.update(props.data.key,dataUrutan).then(()=>{
            //     toko.update(id,dataToko).then(()=>{
            //       //  console.log("Berhasil")
            //          setLoading(false);
                     
            //     }).catch((error)=>{
            //        // console.log("Data Toko Tidak Bisa Masuk : ",error)
            //          setLoading(false);
            //     }
            //     )
            // }).catch((error) => {
            //         // console.log("Data Anterian Tidak Bisa Masuk : ", error);
            //          setLoading(false);
            // })
            update(ref(db), updateAntrian);
            update(ref(db), updateToko);
         }
         catch(error){
             setError(error)
         }
         return props.onHide()
    }


    function dataIn(status){

        //console.log(status)
        try{
        if(status){
            return (
            <Modal
                {...props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered>

                <Modal.Body className='antrian-modal-main'>
                    <Row className='card-no-mp'>
                        {/* User Photo Profile */}
                        <Col md='auto' className='card-no-mp'>
                            <img
                                className='user-photo'
                                src='https://img.icons8.com/color/48/000000/user-male-circle--v1.png'
                                alt='user photo profile'
                            />
                        </Col>

                        {/* User Description */}
                        <Col className='card-no-mp'>
                            <div className='card-body'>
                                {/* User Name */}
                                <p className='card-title'>
                                    <strong>{status.email}</strong>
                                </p>

                                {/* Additional Information */}
                                <Row className='card-no-mp'>
                                    {/* User Contact */}
                                    <Col md='auto' className='card-no-mp'>
                                        <p className='card-text'>{status.noTelp}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Form onSubmit={handleSubmit} >
                        <Row>
                            <Col>
                                <Form.Group id='nomor'>
                                    <Form.Label>Nomor</Form.Label>
                                    <Form.Control
                                        type='text'
                                        defaultValue={antri + 1}
                                        ref={nomorRef}
                                        required
                                    />
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
                                    Kirim Nomor
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant='secondary'
                                    id='antrian-modal-main-button'
                                    onClick={props.onHide}
                                >
                                    Kembali
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }catch(e){
        console.log(e)
    }
    }

        return (
        <div>
          {dataIn(props.data)}
        </div>
        );
    }
