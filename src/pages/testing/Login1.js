import "./Login1.css";

const Login1 = () => {
  return (
    <div className="login1">
      <div className="deskripsi-group">
        <div className="deskripsi3">
          <div className="masuk2">Masuk</div>
          <div className="pastikan-gunakan-akun1">
            Pastikan gunakan akun yang telah terdaftar
          </div>
        </div>
        <form className="form-input1">
          <div className="frame-container">
            <div className="email-container">
              <div className="email2">Email</div>
              <input
                className="componentinput5"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="email-container">
              <div className="email2">Password</div>
              <input
                className="componentinput5"
                type="text"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="lupa-password1">Lupa Password?</div>
        </form>
        <div className="button3">
          <button className="component4">
            <img
              className="essentional-icon8"
              alt=""
              src="../essentional8.svg"
            />
            <div className="text7">Masuk</div>
            <img
              className="essentional-icon8"
              alt=""
              src="../essentional8.svg"
            />
          </button>
          <div className="text8">
            <div className="text-inner" />
            <div className="atau-daftarkan-bisnis1">
              Atau Daftarkan Bisnis Anda
            </div>
            <div className="text-inner" />
          </div>
          <div className="component5">
            <img
              className="essentional-icon8"
              alt=""
              src="../essentional10.svg"
            />
            <div className="text9">Daftar</div>
            <img
              className="essentional-icon8"
              alt=""
              src="../essentional8.svg"
            />
          </div>
        </div>
      </div>
      <div className="button4">
        <img className="container-icon2" alt="" src="../container1.svg" />
        <div className="masuk2">SMARTQ</div>
      </div>
    </div>
  );
};

export default Login1;
