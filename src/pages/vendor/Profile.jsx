import "./Profile.css";
import React, {useState, useEffect, useRef} from "react";
import toko from "../../common/Firebase/toko.service";
import "../../common/Firebase/config";
// import { initializeApp } from "firebase-admin/app";
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../common/Firebase/authContext";
import { onValue, ref } from "firebase/database";
import { db } from "../../common/Firebase/config";

export default function Profil()  {

  const email = useRef();
  const noHp = useRef();
  const password = useRef();
  const {currentUser} = useAuth();
  const [tokos, setToko] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    onValue( ref(db, 'toko/' + currentUser.uid), (snapshot)=>{
      setToko(snapshot.val()); 
    })
  }

  return (
    <div className="data-profil2">
      <div className="search-bar1">
        <div className="componentinput16">
          <img className="search-icon1" alt="" src="../search1.svg" />
          <div className="search1">Search</div>
        </div>
        <div className="componentbutton1">
          <img
            className="essentional-icon16"
            alt=""
            src="../essentional14.svg"
          />
          <div className="text35">Tambah Pegawai</div>
        </div>
      </div>
      <div className="form1">
        <div className="data-profil3">Data Profil</div>
        <div className="input-form">
          <div className="no-hp">
            <div className="pass">
              <div className="nomor-handphone">Nomor Handphone</div>
              <div className="componentinput17">
                <Form.Control 
                  disabled
                  type='text'
                  ref={noHp}
                  placeholder='No Hp'
                  className="text-div11"
                  defaultValue={tokos.phone}
                />
              </div>
            </div>
          </div>
          <div className="email-dan-pass">
            <div className="pass">
              <div className="nomor-handphone">Email</div>
              <div className="componentinput17">
                <Form.Control 
                  disabled
                  type='text'
                  ref={email}
                  placeholder='Email'
                  className="text36"
                  defaultValue={currentUser.email}
                />
              </div>
            </div>
            <div className="pass">
              <div className="nomor-handphone">Password</div>
              <div className="componentinput19">
                <Form.Control 
                  type='password'
                  placeholder='Password'
                  className="text36"
                  ref={password}
                />
              </div>
            </div>
          </div>
          <div className="button4">
            <div className="componentbutton2">
              <img className="search-icon1" alt="" src="../essentional17.svg" />
              <div className="text35">Batal</div>
            </div>
            <div className="componentbutton3">
              <img className="search-icon1" alt="" src="../essentional18.svg" />
              <div className="text35">Simpan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
