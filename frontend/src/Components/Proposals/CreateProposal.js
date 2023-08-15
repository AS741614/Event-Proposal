import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../../images/logo.png"
import { GiCancel } from "react-icons/gi";
import "./CreateProposal.css";

const CreateProposal = () => {
  const hiddenInputFile = useRef(null);
  const [image, setImage] = useState([]);
  const [eventName, setEventName] = useState("");
  const [place, setPlace] = useState("");
  const [proposalType, setProposalType] = useState("");
  const [eventType, setEventType] = useState("");
  const [budget, setBudget] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [description, setDescription] = useState("");
  const [food, setFood] = useState("");
  const [events, setEvents] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (url) {
      fetch("https://eventproposalapp.onrender.com/createProposal", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          eventName: eventName,
          place: place,
          proposalType: proposalType,
          eventType: eventType,
          budget: budget,
          date_from: dateFrom,
          date_to: dateTo,
          description: description,
          albums: url,
          food: food,
          events: events,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("post saved");
            navigate("/Vendor_Dashboard");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url]);
  const postImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Event-Proposal");
    data.append("cloud_name", "dfqxuq3qn");
    fetch("https://api.cloudinary.com/v1_1/dfqxuq3qn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    var imgs = output.files.length;
    for (let i = 0; i < imgs; i++) {
      var urls = URL.createObjectURL(event.target.files[i]);
      document.getElementById("galeria").innerHTML +=
        '<img src="' + urls + '">';
    }
  };
  const handleclick = () => {
    hiddenInputFile.current.click();
  };

  const backToVendorDasboard = () => {
    navigate("/Vendor_Dashboard");
  };

  return (
    <>
      <div className="C-proposal_container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <h2>Create Proposal</h2>
          </div>
          <div className="col-4">
            <GiCancel className="cancelBtn" onClick={backToVendorDasboard} />
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-5">
            <div className="row" style={{ marginLeft: "20px" }}>
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                required
              />
            </div>

            <div className="row" style={{ marginLeft: "20px" }}>
              <div className="col-6">
                <label htmlFor="">Place Of Event</label>
                <br />
                <select
                  id="code-select"
                  onChange={(e) => {
                    setPlace(e.target.value);
                  }}
                  value={place}
                >
                  <option value="Select">Select</option>
                  <option value="Patna">Kanpur</option>
                  <option value="Ranchi">Lucknow</option>
                  <option value="Banglore">Agra</option>
                </select>
              </div>
              <div className="col-1"></div>
              <div className="col-5">
                <label htmlFor="">Proposal Type</label>

                <select
                  id="code-select"
                  onChange={(e) => {
                    setProposalType(e.target.value);
                  }}
                  value={proposalType}
                >
                  <option value="Select">Select</option>
                  <option value="Venue">Venue</option>
                </select>
              </div>
            </div>

            <div className="row" style={{ marginLeft: "20px" }}>
              <div className="col-6">
                <label htmlFor="dateFrom">Date From</label>
                <input
                  type="date"
                  id="dateFrom"
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                  required
                />
              </div>
              <div className="col-1"></div>

              <div className="col-3">
                <label htmlFor="budget">Budget</label>
                <input
                  type="number"
                  placeholder="00000"
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  value={budget}
                  style={{ width: "120px" }}
                />
              </div>
            </div>

            <div className="row" style={{ marginLeft: "20px" }}>
              <div className="col-6">
                <label htmlFor="dateTo">Date To</label>
                <input
                  type="date"
                  id="dateTo"
                  value={dateTo}
                  onChange={(event) => setDateTo(event.target.value)}
                  required
                />
              </div>

              <div className="col-1"></div>
              <div className="col-4">
                <label htmlFor="eventType">Event Type</label>
                <select
                  id="code-select"
                  onChange={(e) => {
                    setEventType(e.target.value);
                  }}
                  value={eventType}
                >
                  <option value="Select">Select</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Engagement">Engagement</option>
                </select>
              </div>
            </div>

            <div className="row" style={{ marginLeft: "20px" }}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="col-1"></div>

          <div class="col-5">
            <div className="row">
              <label htmlFor="albums" onClick={handleclick}>
                Add Image
              </label>
              <input
                id="output"
                className="fileinp"
                multiple
                type="file"
                accept="image/*"
                onChange={(e) => {
                  loadfile(e);
                  setImage(e.target.files[0]);
                }}
                ref={hiddenInputFile}
                style={{ display: "none" }}
              />
            </div>
            <div class="imgcontainer">
              <div id="galeria" style={{ width: "50px", height: "50px" }}>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={require("../../images/logo.png")}
                  alt=""
                ></img>
              </div>
            </div>

            <div className="row">
              <label htmlFor="food">Food</label>
              <textarea
                className="textares"
                id="description"
                value={food}
                onChange={(event) => setFood(event.target.value)}
              ></textarea>
            </div>

            <div className="row">
              <label htmlFor="events">Events</label>
              <textarea
                className="textares"
                id="description"
                value={events}
                onChange={(event) => setEvents(event.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <button
              type="submit"
              style={{ marginLeft: "40%" }}
              onClick={() => postImage()}
            >
              Post
            </button>
          </div>
          <div className="col-4"></div>
        </div>
        <br></br>
      </div>
    </>
  );
};

export default CreateProposal;