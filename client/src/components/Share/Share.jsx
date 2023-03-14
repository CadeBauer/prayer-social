import React from 'react'
import './share.css'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ShieldIcon from '@mui/icons-material/Shield';
import {useState, useContext} from 'react'
import {AuthContext} from'../../context/authContext'
import Axios from 'axios';
import { makeRequest } from "../../axios";

export default function Share() {

    const {currentUser} = useContext(AuthContext)
    const [postMedia, setPostMedia] = useState("");

    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append("file", postMedia)
            const res = await makeRequest.post("/upload", formData)
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    const sharePost = async (e) => {
        e.preventDefault();
        let imgURL = ""
        if(postMedia != "null" ){
            imgURL = await upload()
            await Axios.post("http://localhost:3003/api/posts", {postText: postText, postMedia: imgURL, isAnonymous: isAnonymous, userPostID: currentUser.userID})
        }else{
            await Axios.post("http://localhost:3003/api/posts", {postText: postText, postMedia: postMedia, isAnonymous: isAnonymous, userPostID: currentUser.userID})
        }
        window.location.reload();
    }

    const [postText, setPostText] = useState("");
    const [isAnonymousText, setIsAnonymousText] = useState("Public");
    const [isAnonymous, setIsAnonymous] = useState(false);

    const changeAnonymous = () => {
        if(isAnonymousText == "Anonymous"){
            setIsAnonymousText("Public")
            setIsAnonymous(false)
        }if(isAnonymousText == "Public"){
            setIsAnonymousText("Anonymous")
            setIsAnonymous(true)
        }
    }

    /*const sharePost = async (e) => {
        e.preventDefault()
    }*/

    console.log(postMedia)

  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg' src={"/uploads/upload/"+currentUser.profilePic} alt="" />
                <input onChange={(event) => {
                    setPostText(event.target.value)
                }} name="postText" placeholder='What do you need prayer for?' className='shareInput' required type="text" />
            </div>
            <div className="shareMedia">
                {postMedia && (<img className="file" alt="" src={URL.createObjectURL(postMedia)} />)}
            </div>            
            <hr className='shareLine'></hr>
            <div className="shareBottom">
                <div className="shareOptions">
                <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setPostMedia(e.target.files[0])}/>
                <label htmlFor="file">
                    <div className="option">
                        <InsertPhotoIcon className='optionIcon'/>
                        <span className="optionText">Media</span>
                    </div>
                </label>
                    <div className="option"  onClick={changeAnonymous}>
                        <ShieldIcon htmlColor='lightblue' className='optionIcon'/>
                        <span className="optionText">{isAnonymousText}</span>
                    </div>
                </div>
                <button onClick={sharePost} className='shareButton'>Share</button>
            </div>
        </div>
    </div>
  )
}
