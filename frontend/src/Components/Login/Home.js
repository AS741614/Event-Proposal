import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";
import { toast } from "react-toastify";
import party from "../../images/PartyImg.png";
 import logo from "../../images/logo.png";

const Home = () => {
  //vendorlogin data
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // userlogin data
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");

  //displaying success message
  const [Loginmessage, SetLoginmessage] = useState("");

  const navigate = useNavigate();

  //toast function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  //Vendorlogin
  const VendorLogin = async () => {
    const resp = await fetch("https://eventproposalapp.onrender.com/vendorsignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await resp.json();
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("Vendor", JSON.stringify(data.vendor));
    }
    if (!data.error) {
      notifyB("login successfull");
      navigate("/Vendor_Dashboard");
    } else {
      notifyA("Invalid Credentials");
    }
  };

  // userlogin
  const UserLogin = async () => {
    const response = await fetch("https://eventproposalapp.onrender.com/usersignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
    const datas = await response.json();
    if (datas.token) {
      localStorage.setItem("jwt", datas.token);
      localStorage.setItem("User", JSON.stringify(datas.user));
    }
    if (!datas.error) {
      notifyB("login successfull");
      navigate("/User_Dashboard");
    } else {
      notifyA("Invalid Credentials");
    }
  };

  const RegistrationPage = () => {
    navigate("/Vendor");
  };

  function RoutToUserLogin() {
    navigate("/UserLogin");
  }

  function RoutToVendor() {
    navigate("/");
  }

  return (
    <>
      <div
        className="bgimg"
        style={{
          backgroundImage: `url(${party})`,
          height: "100vh",
          width: "100vw",
          backgroundSize: "contain",
          fontWeight: "500",
          overflow: "hidden",
        }}
      >
        <h3 style={{ color: "white", marginLeft: "20px" }}>LOGO</h3>

        <div
          className="conatiner1"
          style={{
            lineHeight: "15px",
            display: "flex",
            float: "right",
            backgroundColor: "white",
            marginTop: "150px",
            marginRight: "200px",
            borderRadius: "5px",
            color: "black",
          }}
        >
          <div
            className="tab-content"
            style={{
              padding: "20px",
              justifyContent: "center",
              width: "382px",
            }}
          >
            {/* userbutton and vendor butoon */}

            <h2>{Loginmessage}</h2>

            {/* <ul
              className="nav nav-pills nav-justified mb-3"
              id="ex1"
              role="tablist"
            >
              <li className="nav-item" role="presentation"> */}
                <a
                  className="nav-link active"
                  id="tab-login"
                  data-mdb-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                  onClick={RoutToVendor}
                >
                  <button style={{backgroundColor:"DodgerBlue",color:"white",borderRadius:"5PX",width:"100px"}}>Vendor</button>
                </a>
              {/* </li>
              <li className="nav-item" role="presentation"> */}
                <a
                  className="nav-link"
                  id="tab-register"
                  data-mdb-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="false"
                  onClick={RoutToUserLogin}
                >
                 <button style={{backgroundColor:"DodgerBlue",color:"white",borderRadius:"5PX",width:"100px"}}>User</button>
                </a>
              {/* </li>
            </ul> */}

            {/* vendor sigin form */}

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                <div>
                  <p>Sign with Your Account</p>
                </div>
                <br></br>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="inputs"
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4" >
                  <input
                    style={{ height: "40px" }}
                    type="password"
                    placeholder="Password"
                    className="inputs"
                    name="password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center"></div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <a href="">Forgot password?</a>
                  </div>
                </div>
                <div className="row mb-4">
                  <button
                    onClick={RegistrationPage}
                    style={{
                      width: "40%",
                      height: "38px",
                      marginTop: "17px",
                      marginLeft: "15px",
                      backgroundColor: "#4caf50",
                      border: "none",
                      borderRadius: "3px",
                      fontWeight: "500",
                    }}
                  >
                    Create Account
                  </button>
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={() => {
                        VendorLogin();
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
              
 



{/* 
              <div
                className="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="tab-register"
              >
                <div>
                  <p>Sign with Your Account</p>
                </div>
                <br></br>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="inputs"
                    name="userEmail"
                    onChange={(e) => setuserEmail(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    style={{ height: "40px" }}
                    type="password"
                    placeholder="Password"
                    className="inputs"
                    name="userPassword"
                    onChange={(e) => setuserPassword(e.target.value)}
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center"></div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <a href="">Forgot password?</a>
                  </div>
                </div>

                <div className="row mb-4">
                  <button
                    onClick={RegistrationPage}
                    style={{
                      width: "40%",
                      height: "38px",
                      marginTop: "17px",
                      marginLeft: "15px",
                      backgroundColor: "#4caf50",
                      border: "none",
                      borderRadius: "3px",
                      fontWeight: "500",
                    }}
                  >
                    Create Account
                  </button>
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={() => {
                        UserLogin();
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;