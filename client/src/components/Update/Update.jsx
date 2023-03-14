import './update.scss'
import {useState, useContext} from 'react'
import { makeRequest } from '../../axios'
import {AuthContext} from'../../context/authContext'
import Axios from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({setOpenUpdate}) => {

const [bio, setBio] = useState("")
const [profile, setProfile] = useState("")
const [banner, setBanner] = useState("")
const {currentUser} = useContext(AuthContext)

const uploadProfile = async () => {
    try{
        const formData = new FormData();
        formData.append("file", profile)
        const res = await makeRequest.post("/upload", formData)
        return res.data
    }catch(err){
        console.log(err)
    }
}

const uploadBanner = async () => {
    try{
        const formData = new FormData();
        formData.append("file", banner)
        const res = await makeRequest.post("/upload", formData)
        return res.data
    }catch(err){
        console.log(err)
    }
}


  const handleSubmit = async (e) => {
    e.preventDefault();

    let bannerURL
    let profileURL
    bannerURL = banner ? await uploadBanner(banner) : currentUser.bannerPic;
    profileURL = profile ? await uploadProfile(profile) : currentUser.profilePic;

    await Axios.put("http://localhost:3003/api/users", {userID: currentUser.userID, profilePic: profileURL, bannerPic: bannerURL, bio: bio})
    setOpenUpdate(false)
    setOpenUpdate(false)
}

  return (

    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/uploads/upload/" + currentUser.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}/>
            <label htmlFor="banner">
              <span>Banner Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    banner
                      ? URL.createObjectURL(banner)
                      : "/uploads/upload/" + currentUser.bannerPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="banner"
              style={{ display: "none" }}
              onChange={(e) => setBanner(e.target.files[0])}/>
          </div>
          <span>Biography</span>
          <input className='bio' type="text" defaultValue={currentUser.biography} onChange={(event) => {setBio(event.target.value)}}/>
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}

export default Update
