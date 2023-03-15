import React,{useState} from 'react'
import { useAuth } from '../../common/Firebase/authContext'
import { Link, useHistory } from "react-router-dom";
import {Form, Button, Row, Col,Alert} from 'react-bootstrap'
import {auth} from '../../common/Firebase/config'

function SetelanProfileKhusus() {
    const { currentUser, logout } = useAuth;
    const [error, setError] = useState("");
     const history = useHistory();

     async function handleLogout() {
				setError("");
				try {
					auth.signOut()
					history.push("/login");
				} catch(e) {
					setError("Failed to log out");
                    console.log(e)
				}
			}
    return (
			<div>
				{error && <Alert variant='danger'>{error}</Alert>}
				{/* Form Email Baru */}
				<Form>
					<Form.Group controlId='formEmailBaru'>
						<Form.Label>Email Baru</Form.Label>
						<Form.Control 
                        type='email' 
                        />
                        
					</Form.Group>
					<Button variant='primary' type='submit'>
						Simpan
					</Button>
				</Form>

				<div style={{ marginTop: 64 }}>
					<Row>
						<Col>
							<Button className='btn-primary' style={{ width: 200 }}>
								Ganti Password
							</Button>
						</Col>
						<Col>
							<Button onClick={handleLogout} variant='danger'>
								Logout
							</Button>
						</Col>
					</Row>
				</div>
			</div>
		);
}

export default SetelanProfileKhusus
