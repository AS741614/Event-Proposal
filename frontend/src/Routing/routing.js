import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Components/Login/Home'
import Registration from '../Components/Registration/Registration'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//  import VendorDashboard from '../Components/Dashboard/VendorDashboard';
import UserDashboard from '../Components/Dashboard/UserDashboard';
import CreateProposal from '../Components/Proposals/CreateProposal';
import ProposalsDetails from '../Components/Proposals/ProposalsDetails';
import Upadateproposal from '../Components/Proposals/UpdateProposal';
import VendorDashboard from '../Components/Dashboard/VendorDashboard';


const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/UserLogin' element={<Home />} />
          <Route path="/user" element={<Registration />} />
          <Route path="/Vendor" element={<Registration />} />
          <Route path="/User_Dashboard" element={<UserDashboard />} />
          <Route path="/Vendor_Dashboard" element={<VendorDashboard />} />
          <Route path="/CreateProposal" element={<CreateProposal />} />
          <Route path="/editProposal/id" element={<Upadateproposal />} />
          <Route path="/proposalsDetails" element={< ProposalsDetails/>}/>

          

        </Routes>
        <ToastContainer theme="dark" autoClose={1000} position="bottom-right"/>
      </BrowserRouter>
      
    </div>
  )
}

export default Routing