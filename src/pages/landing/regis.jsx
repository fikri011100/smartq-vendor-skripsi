import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Row } from "react-bootstrap";
import { useAuth } from "../../common/Firebase/authContext";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const {signup, currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/registertoko");
		} catch(err) {
			 setError("Failed to create an account");
             console.log(err)
		}

		setLoading(false);
	}

	return (
    <div className="login-div">
      <div className="masuk-div">
        <img className="container-icon1" alt="" src="../container.svg" />
        <div className="deskripsi-div1">
          <div className="masuk-div1">Daftar</div>
          <div className="pastikan-gunakan-akun-yang-tel">
            Langkah 1 : isi data profil kamu
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
              <div className="frame-div4">
								<div className="email-div">Konfirmasi Password</div>
								<Form.Group controlId='formBasicConfirmPassword' className="componentinput-div9">
									<img
										className="directbox-default-2-icon"
										alt=""
										src="../key.svg"
									/>
									<Form.Control
										type='password'
										ref={passwordConfirmRef}
										placeholder='Password'
										className="text-div11"
									/>
								</Form.Group>
							</div>
						</div>
					</div>
					<div className="button-div">
						<Button
							variant='primary'
							className='component-div1'
							type='submit'
							disabled={loading}>
							Lanjutkan
						</Button>
            <div className="text-div14">
              <div className="atau-daftarkan-bisnis-anda">
                Sudah memiliki akun? 
              </div>
              <Link to={'/login'}>
                <div className="login-btn">
                  Masuk 
                </div>
              </Link>
            </div>
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
            src="../shoppingrafiki.svg"
          />
          <div className="frame-div7">
            <div className="menuju-tak-terbatas-dan-melamp">
              Jadikan tokomu lebih efisien
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
