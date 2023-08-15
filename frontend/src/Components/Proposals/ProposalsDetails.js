import React from "react";
import logo from "../../images/logo.png";
import { useEffect, useState } from "react";
import profile_image from "../../images/profile_image.png";
 import { GrLogout } from "react-icons/gr";
import "./ProposalsDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProposalsDetails = () => {
  const [name, setName] = useState("");

  const userName = localStorage.getItem("User");
  const U = JSON.parse(userName);
  useEffect(() => {
    setName(U.name);
  }, []);

  const location = useLocation();

  const navigate=useNavigate();
  const sendDataToLocal=()=>{
    localStorage.setItem("SelectedDetails", JSON.stringify(location.state.e))
    navigate("/User_Dashboard")

  }


  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <img className="logo-image" src={logo} alt="" style={{ width: "90px", height: "80px", marginLeft: "10px" }}
        />
        <div className="form-inline">
          <p id="user-name">{name}</p>
          <img
            src={profile_image}
            alt=""
            style={{
              width: "50px",
              height: "30px",
              borderRadius: "50px",
              marginRight: "20px",
            }}
          />
        </div>
      </nav>

      
      <div className="container2">
        <div className="card1" id="card1">
            <h6> PROPOSALS - John Contract</h6>
            <img src={location.state.e.albums[0]} alt="" style={{width:"250px",height:"80px"}}/>
            <p style={{marginTop:"15px"}}><span>NAME:</span>{location.state.e.postedBy.name}</p>
            <p><span>EMAIL:</span>{location.state.e.postedBy.email}</p>
            <p><span>START DATE:</span>{location.state.e.date_from}</p>
            <p><span>END DATE:</span>{location.state.e.date_to}</p>
            <p><span>EVENT TYPE:</span>{location.state.e.eventType}</p>
      </div>

       
        <div className="card1" id="card2">
            <h6>VENUE AND ARRANGEMENTS</h6>
            <p className="para1">{location.state.e.description}</p>
            </div>


        <div className="card1" id="card3">
            <h6>FOOD PREFERENCES</h6>
            <p className="para1">{location.state.e.food}</p>
            </div>
            <button className="btn" onClick={sendDataToLocal}>select</button>
           

        <div className="card1" id="card4">
            <h6>MY ALBUMS</h6>
            {
              location.state.e.albums.map((img)=>{
                return (
                  <img  className="album" src={img} alt="" style={{width:"60px",height:"60px"}}/>
                )
              })
            }
            </div>

        <div className="card1" id="card5">
            <h6 id="h6">Contacts | 12</h6>
            <p>Contact1<br/>+917865487654</p>
            <p>Contact1<br/>+917865487654</p>
            </div>

        <div className="card1" id="card6">
            <h6>EVENTS</h6>
            <p className="para1">{location.state.e.events}</p>
            </div>
        </div>
   
      
    </>
  );
};

export default ProposalsDetails;