import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Corosel from "../../components/Corosel";
import { useAuth } from "../../common/Firebase/authContext";

import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";

import "./Login.css";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			await history.push("/antrian/" + currentUser.uid);
		} catch (e) {
			console.log(e);
			setError("Failed to log in");
		}

		setLoading(false);
	}

	return (
    <div className="login-div">
      <div className="masuk-div">
        <img className="container-icon1" alt="" src="../container.svg" />
        <div className="deskripsi-div1">
          <div className="masuk-div1">Masuk</div>
          <div className="pastikan-gunakan-akun-yang-tel">
            Pastikan gunakan akun yang telah terdaftar
          </div>
        </div>
				{error && <Alert variant='danger'>{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<div className="form-input-div">
						<div className="frame-div3">
							<div className="frame-div4">
								<div className="email-div">Email</div>
								<Form.Group controlId='formBasicEmail' className="componentinput-div9">
									<img
										className="directbox-default-2-icon"
										alt=""
										src="../directboxdefault2.svg"
									/>
									<Form.Control
										type='email'
										ref={emailRef}
										placeholder='Email'
										className="text-div11"
									/>
								</Form.Group>
							</div>
							<div className="frame-div4">
								<div className="email-div">Password</div>
								<Form.Group controlId='formBasicPassword' className="componentinput-div9">
									<img
										className="directbox-default-2-icon"
										alt=""
										src="../key.svg"
									/>
									<Form.Control
										type='password'
										ref={passwordRef}
										placeholder='Password'
										className="text-div11"
									/>
								</Form.Group>
							</div>
						</div>
						<div className="lupa-password-div">Lupa Password?</div>
					</div>
					<div className="button-div">
						<Button
							variant='primary'
							className='component-div1'
							type='submit'
							disabled={loading}>
							Masuk
						</Button>
						<div className="text-div14">
							<div className="line-div" />
							<div className="atau-daftarkan-bisnis-anda">
								Atau Daftarkan Bisnis Anda
							</div>
							<div className="line-div" />
						</div>
						<Link to={'/register'}>
							<div className="component-div2">
								<div className="email-div">Daftar</div>
							</div>
						</Link>
					</div>
				</Form>
      </div>
      <div className="illustration-div">
        <div className="rectangle-div" />
        <img className="vector-icon" alt="" src="../vector-1.svg" />
        <img className="vector-icon1" alt="" src="../vector-2.svg" />
        <div className="frame-div6">
          <img
            className="finish-linerafiki-icon"
            alt=""
            src="../finishlinerafiki.svg"
          />
          <div className="frame-div7">
            <div className="menuju-tak-terbatas-dan-melamp">
              Menuju tak terbatas dan Melampauinya
            </div>
            <div className="dengan-bergabung-sama-kami-kam">
              Dengan bergabung sama kami kamu gak perlu khawatir urus antrian
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
