import React from 'react';
import './topbar.css';
import SearchIcon from '@mui/icons-material/Search';
import {Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react'
import {AuthContext} from '../../context/authContext'
import axios from 'axios';
import Admin from '../Admin/Admin'

function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.topbarImg')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


export default function TopBar() {

    const [err, setErr] = useState(null);
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    const [admin, setAdmin] = useState(true)

    if (currentUser.isAdmin=="Admin"){
      ("div.anonymous").show();
     }

    const checkAdmin = () =>{
      if(currentUser.isAdmin == "Admin"){
        setAdmin(true)
      }else(
        setAdmin(false)
      )
    }

    const handleLogout = async (e) => {
        e.preventDefault();
    
        try{
          await axios.post("http://localhost:3003/api/auth/logout");
          localStorage.clear("user")
          navigate("/login")
        }catch(err){
          setErr(err.response)
        }
      }


    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link className='link' to='/'>
                    <span className="logo">Prayer Social</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <SearchIcon className='searchIcon'/>
                    <input placeholder="Search" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="adminLink">Admin Portal</div>
                <div className="topbarInformation">
                  <div className="topbarProfile">
                    <img src={"./uploads/upload/"+currentUser.profilePic} alt="" className="topbarImg" onClick={dropdownMenu} />
                    <div id="myDropdown" className="dropdown-content">
                        <Link className='menuItem' to='/profile/lane'>
                            <span className="menuText">Profile</span>
                        </Link>
                        <Link className='menuItem' to='/profile/lane'>
                            <span className="menuText">Options</span>
                        </Link>
                        <Link className='menuItem' to='/' onClick={handleLogout}>
                            <span className="menuText">Logout</span>
                        </Link>
                    </div>
                </div>
                <span className='name' onClick={dropdownMenu}>{currentUser. firstName} {currentUser. lastName}</span>
            </div>
                </div>
        </div>
    )
}