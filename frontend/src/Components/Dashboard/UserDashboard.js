import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import profile_image from "../../images/profile_image.png";
import userImage from "../../images/userImage.jpg";
// import card_1 from "../../image/card_1.jpg";
import { GrLogout } from "react-icons/gr";
import "./UserDashboard.css";
import { useNavigate } from 'react-router-dom'
import axiox from "axios"



const UserDeshboard = () => {
  const navigate=useNavigate();
   
  const [allevents, setallevents]=useState([]);
  const [name, setName] = useState("");
  const userName = localStorage.getItem("User");
  const U = JSON.parse(userName);
  useEffect(() => {
    setName(U.name);
  }, []);

  const vendorName = localStorage.getItem("SelectedDetails");
  const selectedEvents = JSON.parse(vendorName);


const imageClick=(e)=>{
  navigate("/proposalsDetails",{state:{e}})
}
 
  useEffect(()=>{
    axiox.get("https://eventproposalapp.onrender.com/findAllProposal").then((res)=>{
    setallevents(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])




  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <img
          className="logo-image"
          src={logo}
          alt=""
          style={{ width: "90px", height: "80px", marginLeft: "10px" }}
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
          <GrLogout
            style={{ marginRight: "15px", width: "20px", height: "20px" }}
            onClick={()=>{
              navigate("/")
            }}
          />
        </div>
      </nav>
      <div>
        <img
          src={userImage}
          alt=""
          style={{ width: "100%", height: "150px" }}
        />
      </div>


  
  <h4 style={{marginLeft:"150px",marginTop:"10px",textDecoration:"underline"}}>Selected Proposal</h4>
    <div className="card" style={{marginLeft:"150px", marginTop:"20px"}} >
    <img src={selectedEvents.albums[0]} className="card-img-top" alt=""  style={{height:"180px",width:"192px"}}/>
    <div className="card-body">
      <p className="card-title">{selectedEvents.eventName}</p>
      <p className="price">Rs. {selectedEvents.budget}</p>
      <p className="place">{selectedEvents.place}</p>
    </div>
  </div>

  <br/>




      <p id="proposals-title">PROPOSALS</p>
      <div className="card-container" style={{padding:"20px"}} >
     {
      allevents.map((allval, key)=>{
         return (
          <div className="card" key={key} style={{marginLeft:"30px", marginTop:"20px"}}  onClick={(e) => { imageClick(allval) }} >
          <img src={allval.albums[0]} className="card-img-top" alt=""  style={{height:"180px",width:"192px"}} />
          <div className="card-body">
            <p className="card-title">{allval.eventName}</p>
            <p className="price">Rs. {allval.budget}</p>
            <p className="place">{allval.place}</p>
          </div>
        </div>
         )
      })
     }
     

        
        
      </div>
    </>
  );
};

export default UserDeshboard;