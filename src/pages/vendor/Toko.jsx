import React, {useState, useEffect, useRef} from "react";
import "./Toko.css";
import "reactjs-popup/dist/index.css";
import firebaseConfig, { db } from "../../common/Firebase/config";
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import toko from "../../common/Firebase/toko.service";
import { useAuth } from '../../common/Firebase/authContext';
import { ref as ref_storage, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { onValue, ref, set } from "firebase/database";

const storage = getStorage(firebaseConfig);

export default function Toko() {
  const namaToko = useRef();
  const alamat = useRef();
  const buka = useRef();
  const tutup = useRef();
  const jamBuka = useRef();
  const jamTutup = useRef();
  const deskripsi = useRef();
  const instagram = useRef();
  const facebook = useRef();
  const phone = useRef();
  const gambar = useRef();
  // const gambarToko = useRef();
  const kategori = useRef();
  const kota = useRef();
  const {currentUser} = useAuth();
  const [awal, setAwal] = useState();
	const [akhir, setAkhir] = useState();
  const [gambarLogo, setGambarLogo] = useState(null);
	const [gambarToko, setGambarToko] = useState(null);
  const [logo, setLogo] = useState("");
	const [logoToko, setLogoToko] = useState("");
  const [images, setImages] = useState([]);
	const [imagesBangunan, setImagesBangunan] = useState([]);
  const [kategories, setKategori] = useState("");
	const kategoriRef = useRef();
  const [tokos, setToko] = useState([]);
  const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
  const [hari, setHari] = useState("");
  const [jam, setJam] = useState("");
  const [idAnterian, setIdAnterian] = useState("");
  const [limit, setLimit] = useState("");
  const [estimasi, setEstimasi] = useState("");
  const day = [
		{ id: 1, value: "Senin" },
		{ id: 2, value: "Selasa" },
		{ id: 3, value: "Rabu" },
		{ id: 4, value: "Kamis" },
		{ id: 5, value: "Jumat" },
		{ id: 6, value: "Sabtu" },
		{ id: 7, value: "Minggu" },
	];
  const category = [
		{ id: 1, value: "Kesehatan" },
		{ id: 2, value: "Makanan" },
		{ id: 3, value: "Otomotif" },
		{ id: 4, value: "Lifestyle" }
	];

  useEffect( () => {
    try {
      setLoading(true);
      // if(!hari && !jam) {
        fetchData();
      // }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    
    // console.log(tokos.waktuBuka);
  }, []);

  const fetchData = () => {
    onValue(ref(db, 'toko/' + currentUser.uid),(snapshot)=>{
      setToko(snapshot.val()); 
      setHari(String(snapshot.val().hariAktif).split(" "));
      setJam(String(snapshot.val().waktuBuka).split(" "));
      setLogo(snapshot.val().gambar);
      setLogoToko(snapshot.val().gambarToko);
      setKategori(snapshot.val().kategori);
      setEstimasi(snapshot.val().estimasi);
      setLimit(snapshot.val().limit);
      setIdAnterian(snapshot.val().idAnterian);
      console.log(tokos);
    })
  }

 const handleSubmit = (e) => {
    e.preventDefault();

    let uuid = window.self.crypto.randomUUID();

    try {
      setError("");
			setLoading(true);
      var hariBuka = buka.current.value.concat(" - ", tutup.current.value);
      var waktuBuka = jamBuka.current.value.concat(" - ", jamTutup.current.value);

      kategoriRef.current = kategories
      let data =  {
        alamat: alamat.current.value,
        desc: deskripsi.current.value,
        gambar: logo,
        gambarToko: logoToko,
        hariAktif: hariBuka,
        kategori: kategoriRef.current,
        kota: "Malang",
        namaToko: namaToko.current.value,
        phone: phone.current.value,
        waktuBuka: waktuBuka,
        instagram: instagram.current.value,
        facebook: facebook.current.value,
        idAnterian: idAnterian
      }

      set(ref(db, 'toko/' + currentUser.uid), data)

    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
		e.preventDefault();
    const ProductImg = [e.target.files[0]];
    let uuid = window.self.crypto.randomUUID();
		const images = ProductImg.map((image) => window.URL.createObjectURL(image));
		console.log("images", images);
		setImages(images);
		setGambarLogo(e.target.files[0]);
    const fileName = uuid + "-" + e.target.files[0].name;
    const storageRef = ref_storage(storage, `/images/${fileName}`);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot)=> {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        setLogo(downloadUrl);
      })
    }) 
	};
	const handleChangeToko = (e) => {
		e.preventDefault();
    const ProductImg = [e.target.files[0]];
    let uuid = window.self.crypto.randomUUID();
		const images = ProductImg.map((image) => window.URL.createObjectURL(image));
		// console.log("images", images);
		setImagesBangunan(images);
		setGambarToko(e.target.files[0]);
    const fileNameToko = uuid + "-" + e.target.files[0].name;
    const storageRefToko = ref_storage(storage, `/images/${fileNameToko}`);
    
    uploadBytes(storageRefToko, e.target.files[0]).then((snapshot)=> {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        setLogoToko(downloadUrl)
      })
    })
	};
  
  return (
    <div className="data-toko">
      <div className="data-toko1">Data Toko</div>
        <div className="frame-div17">
          <div className="form">
            <div className="nama-toko2">
              <div className="terakhir-buka">
                <div className="text-semibold">Nama Toko</div>
                <div className="nametext-statefilled-icon">
                  <Form.Control 
                    type='text'
                    ref={namaToko}
                    placeholder='Nama Toko'
                    className="text23"
                    defaultValue={tokos.namaToko}
                  />
                </div>
              </div>
            </div>
            <div className="nama-toko2">
              <div className="terakhir-buka">
                <div className="text-semibold">Alamat</div>
                <div className="nametext-statefilled-icon">
                  <Form.Control 
                    type='text'
                    ref={alamat}
                    placeholder='Alamat'
                    className="text23"
                    defaultValue={tokos.alamat}
                  />
                </div>
              </div>
            </div>
            <div className="nama-toko2">
              <div className="terakhir-buka">
                <div className="text-semibold">Kategori Toko</div>
                <div className="nametext-statefilled-icon">
                  <Form.Control 
                    as='select'
                    value={kategories}
                    placeholder='Kategori'
                    className="text23"
                    defaultValue={tokos.kategori}
                    onChange={(e) => {
                      setKategori(e.target.value);
                    }}>
                    {category.map((d) => (
                      <option value={d.value}>{d.value}</option>
                    ))}
                  </Form.Control>
                </div>
              </div>
            </div>
            <div className="social-media">
              <div className="terakhir-buka">
                <div className="text-semibold">Hari Awal Buka</div>
                <div className="nametext-statefilled-icon2">
                  <img
                    className="property-1linear-property-21"
                    alt=""
                    src="../property-1linear-property-2emojihappy1-property-31.svg"
                  />
                  <Form.Control 
                    as='select'
                    ref={buka}
                    placeholder='Hari Awal Buka'
                    className="text23"
                    value={hari[0]}
                  >
                    {day.map((d) => (
                      <option value={d.value}>{d.value}</option>
                    ))}
                  </Form.Control>
                </div>
              </div>
              <div className="terakhir-buka">
                <div className="text-semibold">Hari Terakhir Buka</div>
                <div className="nametext-statefilled-icon2">
                  <img
                    className="property-1linear-property-21"
                    alt=""
                    src="../property-1linear-property-2emojihappy1-property-31.svg"
                  />
                  <Form.Control 
                    as='select'
                    ref={tutup}
                    placeholder='Hari Terakhir Buka'
                    className="text23"
                    value={hari[2]}
                  >
                    {day.map((d) => (
                      <option value={d.value}>{d.value}</option>
                    ))}
                  </Form.Control>
                </div>
              </div>
            </div>
            <div className="social-media">
              <div className="terakhir-buka">
                <div className="text-semibold">Jam Buka</div>
                <div className="nametext-statefilled-icon2">
                  <img
                    className="property-1linear-property-21"
                    alt=""
                    src="../property-1linear-property-2emojihappy1-property-31.svg"
                  />
                  <Form.Control 
                    type='time'
                    ref={jamBuka}
                    placeholder='Jam Buka'
                    className="text23"
                    defaultValue={jam[0]}
                  />
                </div>
              </div>
              <div className="terakhir-buka">
                <div className="text-semibold">Jam Tutup</div>
                <div className="nametext-statefilled-icon2">
                  <img
                    className="property-1linear-property-21"
                    alt=""
                    src="../property-1linear-property-2emojihappy1-property-31.svg"
                  />
                  <Form.Control 
                    type='time'
                    ref={jamTutup}
                    placeholder='Jam Tutup'
                    className="text23"
                    defaultValue={jam[2]}
                  />
                </div>
              </div>
            </div>
            <div className="deskripsi-toko1">
              <div className="text-semibold">Deskripsi Toko</div>
              <div className="nametextarea-statefilled-i">
                  <Form.Control 
                    type='text'
                    ref={deskripsi}
                    placeholder='Hari Terakhir Buka'
                    className="text29"
                    defaultValue={tokos.desc}
                  />
              </div>
            </div>
            <div className="social-media">
              <div className="terakhir-buka">
                <div className="text-semibold">Whatsapp</div>
                <div className="nametext-statefilled-icon">
                  <Form.Control 
                    type='text'
                    ref={phone}
                    placeholder='Whatsapp'
                    className="text23"
                    defaultValue={tokos .phone}
                  />
                </div>
              </div>
              <div className="terakhir-buka">
                <div className="text-semibold">Instagram</div>
                <div className="nametext-statefilled-icon">
                  <Form.Control 
                    type='text'
                    ref={instagram}
                    placeholder='Instagram'
                    className="text23"
                    defaultValue={tokos.instagram}
                  />
                </div>
              </div>
              <div className="terakhir-buka">
                <div className="text-semibold">Facebook</div>
                <div className="nametext-statefilled-icon">
                  <Form.Control 
                    type='text'
                    ref={facebook}
                    placeholder='Facebook'
                    className="text23"
                    defaultValue={tokos.facebook}
                  />
                </div>
              </div>
            </div>
            <div 
              className="button2">
              <Button 
                className="typeprimary-texttrue-icon"
                onClick={handleSubmit}>
                <img
                  className="search-icon"
                  alt=""
                  src="../property-1linear-property-2send2.svg"
                />
                <div className="text22">Simpan</div>
              </Button>
            </div>
          </div>
          <div className="foto">
            <div className="logo">
              <div className="text-semibold">Logo Toko</div>
              <div className='group-icon'>
                <div className='auto-layout-vertical'>
                  <div className=''>
                    {images.length == 0 ? (
                      <img className="group-icon" alt="" src={logo} />
                    ) : (
                      images.length > 0 && (
                        <div>
                          {images.map((image, index) => (
                            <p key={index}>
                              <img className='group-icon' src={image} alt='' />
                            </p>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                  <input
                    type='file'
                    id='file'
                    className='group-icon'
                    onChange={handleChange}
                    accept='image/png, image/jpg, image/jpeg'
                    multiple
                  />
                </div>
              </div>
            </div>
            <div className="bangunan">
              <div className="text-semibold">Foto Bangunan Toko</div>
              <div className='group-icon'>
                <div className='auto-layout-vertical'>
                  <div className=''>
                    {imagesBangunan.length == 0 ? (
                      <img className="group-icon" alt="" src={logoToko} />
                    ) : (
                      imagesBangunan.length > 0 && (
                        <div>
                          {imagesBangunan.map((image, index) => (
                            <p key={index}>
                              <img className='group-icon' src={image} alt='' />
                            </p>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                  <input
                    type='file'
                    id='file'
                    className='group-icon'
                    onChange={handleChangeToko}
                    accept='image/png, image/jpg, image/jpeg'
                    multiple
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
