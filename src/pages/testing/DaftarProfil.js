import "./DaftarProfil.css";

const DaftarProfil = () => {
  return (
    <div className="daftar-profil">
      <div className="deskripsi-parent">
        <div className="deskripsi1">
          <div className="daftar">{`Daftar `}</div>
          <div className="langkah-1">Langkah 1 : Isi data profil kamu</div>
        </div>
        <div className="frame-group">
          <div className="email-group">
            <div className="email1">Email</div>
            <input
              className="componentinput2"
              type="text"
              placeholder="Email"
            />
          </div>
          <input
            className="frame-child"
            type="text"
            defaultValue="No. Handphone"
            placeholder="No. Handphone"
          />
          <div className="password-group">
            <div className="konfirmasi-password">Password</div>
            <input
              className="componentinput3"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="password-group">
            <div className="konfirmasi-password">Konfirmasi Password</div>
            <input
              className="componentinput3"
              type="text"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="button1">
          <button className="component2">
            <img
              className="essentional-icon4"
              alt=""
              src="../essentional4.svg"
            />
            <div className="text5">Lanjutkan</div>
            <img
              className="essentional-icon4"
              alt=""
              src="../essentional4.svg"
            />
          </button>
          <div className="deskripsi2">
            <div className="sudah-memiliki-akun">Sudah memiliki akun?</div>
            <div className="component3">
              <img
                className="essentional-icon4"
                alt=""
                src="../essentional6.svg"
              />
              <div className="email1">Masuk</div>
              <img
                className="essentional-icon4"
                alt=""
                src="../essentional7.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="button2">
        <img className="container-icon1" alt="" src="../container1.svg" />
        <div className="daftar">SMARTQ</div>
      </div>
    </div>
  );
};

export default DaftarProfil;
