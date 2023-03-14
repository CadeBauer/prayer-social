import "./comments.scss";
import {AuthContext} from'../../context/authContext'
import Axios from 'axios';
import { useState, useContext } from 'react';

export default function Comments({postID, comments}) {

  const {currentUser} = useContext(AuthContext)

  const [commentText, setCommentText] = useState("")

  const shareComment = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:3003/api/comments", {commentText: commentText, postID: postID, userID: currentUser.userID})
    window.location.reload();
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={"/uploads/upload/"+currentUser.profilePic} alt="" />
        <input type="text" onChange={(event) => {
            setCommentText(event.target.value)
          }} placeholder="Write a comment" name="commentText" required />
        <button onClick={shareComment}>Send</button>
      </div>
      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          <img src={"/uploads/upload/"+comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.firstName + " " + comment.lastName}</span>
            <p>{comment.commentText}</p>
          </div>
          {/* <span className="date">{comment.date}</span> */}
        </div>
      ))}
    </div>
  );
}
