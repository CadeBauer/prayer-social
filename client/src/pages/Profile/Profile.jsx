import {React, useState} from 'react'
import './profile.css'
import Feed from '../../components/Feed/feed';
import {useContext} from 'react'
import {AuthContext} from'../../context/authContext'
import { makeRequest } from "../../axios";
import Axios from 'axios';
import Update from '../../components/Update/Update'


export default function Profile() {

const {currentUser} = useContext(AuthContext)
const [profilePic, setProfilePic] = useState("null");
const [openUpdate, setOpenUpdate] = useState(false);

const upload = async (e) => {
    console.log("in upload")
    try{
        const formData = new FormData();
        formData.append("file", profilePic)
        const res = await makeRequest.post("/uploadProfileUpdate", formData)
        return res.data
    }catch(err){
        console.log(err)
    }
}

const updateProfilePic = async (e) => {
    e.preventDefault();
    let imgURL = ""
    imgURL = await upload()
    await Axios.post("http://localhost:3003/api/users/updateProfilePic", {profilePic: imgURL, userID: currentUser.userID})
}

console.log(currentUser.biography)


  return (
    <>
            <div className="profile">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={"./uploads/upload/"+currentUser.bannerPic} alt="" />
                            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setProfilePic(e.target.files[0])}/>
                            <label htmlFor="file">
                                <img className='profileUserImg' src={"./uploads/upload/"+currentUser.profilePic} alt="" />
                            </label>
                        </div>
                        <div className="profileInfo">
                            <h4 onClick={updateProfilePic} className='profileInfoName'>{currentUser.firstName} {currentUser.lastName}</h4>
                            <h4 className='profileInfoDesc'>{currentUser.biography}</h4>
                            <button onClick={()=>setOpenUpdate(true)} className='updateButton'>Update Profile</button>
                        </div>
                    </div>
                    <div className="profileBottom">
                        <Feed className='feed' userID={currentUser.userID} />
                    </div>
                </div>
                {openUpdate && <Update setOpenUpdate={setOpenUpdate}/>}
            </div>
        </>
  )
}
