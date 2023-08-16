import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import profile_image from "../../images/profile_image.png";
import { GrLogout } from "react-icons/gr";
import { BsFillFunnelFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import axios from 'axios';

import "./vendor_Dashboard.css"


const VendorDashboard = () => {
  const [name, setName] = useState("");
  const [vendordetails, setvendordetails]=useState([])

  const navigate = useNavigate();
  const CreateNewProposal = () => {
    navigate("/CreateProposal");
  };

  const Upadateproposal=(e, updatedetails)=>{
    navigate("/editProposal/id",  {state:{updatedetails}})
  }

  const vendorName = localStorage.getItem("Vendor");
  const V = JSON.parse(vendorName);

  useEffect(() => {
    setName(V.name);
  }, []);


  useEffect(() => {
    fetch("https://eventproposalapp.onrender.com/allProposal", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(res => res.json())
        .then(result => {
          setvendordetails(result.posts)
        })
}, [])

const handleClick = (event, id) => {
  axios.delete(`https://eventproposalapp.onrender.com/delete/${id}`)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
  window.location.reload(false);
};





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
            alt="no img found"
            style={{
              width: "50px",
              height: "30px",
              borderRadius: "50px",
              marginRight: "20px",
              position:"relative",
              left:"1400px",bottom:"90px"
            }}
          />
          <GrLogout
            style={{
              marginRight: "15px", width: "30px", height: "30px",position:"relative",
              left:"1400px",bottom:"90px"
            }}
            onClick={() => {
              navigate("/")
            }}
          />
        </div>
      </nav>

      <div className="maincontainer">
        <div className="navbar navbar-light bg-light">
          <div id="aa" className="form-inline">
            <p className="pro" style={{fontFamily:"fantasy"}}>PROPOSALS</p>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ marginLeft: "20px" }}
            />
            <button
              id="aaa"
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </div>

          <div className="form-inline">
            <BsFillFunnelFill style={{ marginRight: "15px" }} />
            <button
            
              type="button"
              className="btn btn-primary"
              style={{ marginRight: "15px",position:"relative",left:"700px",backgroundColor:"greenyellow" ,width:"140px",borderRadius:"5px"}}
              onClick={CreateNewProposal}
              
            >
              Create
            </button>
          </div>
        </div>


        {
          vendordetails.map((details, key) => {
            return (
              <div className="detailscard" key={key} style={{ marginTop: "50px", borderRadius: "5px", fontWeight: "600", fontFamily: "monospace" ,border:"3px solid black "}}>
                <h4 style={{ textDecoration: "underline", color: "darkgreen" }}>{details.eventName}</h4>
                <p style={{ textDecoration: "underline", color: "green" }}>{details.description}</p>
                <div className="row">
                  <div className="col" style={{ display: "flex" }}>
                    <p style={{fontStyle:"normal",color:"blue"}}>Event_Type:</p>
                    <div style={{ position: "relative", left: "40px", top: "15px" }}>{details.eventType}</div></div>
                  <div className="col" style={{ display: "flex" }}>
                    <p  style={{fontStyle:"normal",color:"blue"}}>Proposal_Type:</p>
                    <div style={{ position: "relative", left: "40px", top: "15px" }} >{details.proposalType}</div></div>
                  <div className="col" style={{ display: "flex" }}>
                    <p  style={{fontStyle:"normal",color:"blue"}}>Date_From:</p>
                    <div style={{ position: "relative", left: "40px", top: "15px" }} >{details.date_from}</div> </div>
                  <div className="col" style={{ display: "flex" }}>
                    <p  style={{fontStyle:"normal",color:"blue"}}>Date_To:</p>
                    <div style={{ position: "relative", left: "40px", top: "15px" }} >{details.date_to}</div>
                  </div>
                  <div className="col" style={{ display: "flex" }}>
                    <p  style={{fontStyle:"normal",color:"blue"}}>Budget:</p>
                    <div style={{ position: "relative", left: "40px", top: "15px" }} >{details.budget}</div>
                  </div>
                  <div className="col" style={{ display: "flex" }}>

                    <div style={{ float: "right", marginRight: "30px", }}><MdEdit style={{ height: "25px", width: "25px",position:"relative" ,left:"1100px",color:"blue" }} onClick={event => Upadateproposal(event, details)} /></div>
                    <div style={{ float: "right", marginRight: "30px",position:"relative" }}><RiDeleteBin6Fill style={{ height: "25px", width: "25px",position:"relative" ,left:"1100px",color:"red" }} onClick={event => handleClick(event, details._id)} /> </div>

                  </div>
                </div>
              </div>
            )

          })
        }
      </div>

    </>
  );
};

export default VendorDashboard;