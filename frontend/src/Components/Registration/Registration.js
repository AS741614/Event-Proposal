import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import party from "../../images/PartyImg.png";
import "../style/registration.css";

const Registration = () => {
  const navigate = useNavigate();
  // vendor registration usestate.
  const [VendorsData, SetVendorsData] = useState({});

  // User registration usestate.
  const [UsersData, SetUsersData] = useState({});

  //toast function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const VenderRegister = (e) => {
    const Name = e.target.name;
    const InputVal = e.target.value;
    SetVendorsData({ ...VendorsData, [Name]: InputVal });
  };

  const UsersRegister = (e) => {
    const Name = e.target.name;
    const InputVal = e.target.value;
    SetUsersData({ ...UsersData, [Name]: InputVal });
  };

  const formdata1 = new FormData();
  formdata1.append("name", UsersData.name);
  formdata1.append("email", UsersData.email);
  formdata1.append("contact", UsersData.contact);
  formdata1.append("password", UsersData.password);

  const UserRegFom = () => {
    if (UsersData.password !== UsersData.ConfirmPassword) {
      notifyA("Password does not match");
    } else
      axios
        .post("https://eventproposalapp.onrender.com/usersignup", formdata1, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata1),
        })
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            notifyB("Registered Successfull");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const formdata = new FormData();
  formdata.append("name", VendorsData.name);
  formdata.append("email", VendorsData.email);
  formdata.append("contact", VendorsData.contact);
  formdata.append("password", VendorsData.password);

  const VendorRegFom = () => {
    if (VendorsData.password !== VendorsData.ConfirmPassword) {
      notifyA("Password doesnot match");
    } else
      axios
        .post("https://eventproposalapp.onrender.com/vendorsignup", formdata, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        })
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            notifyB("Registered Successfull");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const backTologin = () => {
    navigate("/");
  };

  function RoutToUser() {
    navigate("/user");
  }
  function RoutToVendor() {
    navigate("/Vendor");
  }

  return (
    <div>
      <div
        className="bgimg"
        style={{
          backgroundImage: `url(${party})`,
          height: "100vh",
          width: "100vw",
          backgroundSize: "contain",
          overflow: "hidden",
          fontWeight: "500",
        }}
      >
        <h3 style={{ color: "white", marginLeft: "20px" }}>LOGO</h3>
        <div
          className="conatiner1"
          style={{
            display: "flex",
            float: "right",
            backgroundColor: "white",
            marginTop: "45px",
            marginRight: "200px",
            color: "black",
            borderRadius: "5px",
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
                  <button style={{backgroundColor:"DodgerBlue",color:"white",borderRadius:"5PX",width:"100px"}}>VENDER</button>
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
                  onClick={RoutToUser}
                >
                 <button style={{backgroundColor:"DodgerBlue",color:"white",borderRadius:"5PX",width:"100px"}}>USER</button> 
                </a>
              {/* </li>
            </ul> */}

            {/* vendor Registration form */}
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                <div>
                  <p>Register In Your Account</p>
                </div>
                <br></br>

                <div className="form-outline mb-4">
                  <input
                  
                   style={{height:"30px",marginBottom:"1px"}}
                    type="text"
                    placeholder="Name"
                    className="inputs"
                    name="name"
                    onChange={VenderRegister}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="Email"
                    placeholder="Email"
                    className="inputs"
                    name="email"
                    onChange={VenderRegister}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="number"
                    placeholder="Contact"
                    className="inputs"
                    name="contact"
                    onChange={VenderRegister}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="inputs"
                    name="password"
                    onChange={VenderRegister}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    placeholder="ConfirmPassword"
                    className="inputs"
                    name="ConfirmPassword"
                    onChange={VenderRegister}
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={backTologin}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={() => {
                        VendorRegFom();
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>

              {/* user Registration form */}
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;