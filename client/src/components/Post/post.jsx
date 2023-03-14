import React, { Component, useState } from 'react';
import './post.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import FlagIcon from '@mui/icons-material/Flag';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Comments from '../../components/Comments/comments';
import '../../components/Comments/comments.scss';
import Axios from 'axios';
import moment from 'moment'

export default function Post({name, date, text, media, profilePic, isAnonymous, postID, numComments}) {
    if (isAnonymous) {
        name = "Anonymous"
        profilePic = "/defaultUser.jpg"
    }

    const [commentOpen, setCommentOpen] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);

    const loadComments = async (postID) => {
        await Axios.post('http://localhost:3003/comments', {postID: postID}).then((response) => {
            setCommentList(response.data)
            setCommentsLoaded(true)
        });
    }

    // const deletePost = async () => {
    //     await Axios.delete('http://localhost:3003/api/posts', {postID: postID}).then(() => {
    //         window.location.reload()
    //     });
    // }

    if (commentOpen && !commentsLoaded) {
        loadComments(postID)
    }

    var time;
    var timeUnit = "hours";

    if(moment().diff(date, 'hours') == 0){
        time = moment().diff(date, 'minutes')
        timeUnit = "minutes"
        if(moment().diff(date, 'minutes') == 1){
            timeUnit = "minute"
        }
    }else if(moment().diff(date, 'hours') == 1){
        time = moment().diff(date, 'hours')
        timeUnit = "hour"
    }else{
        time = moment().diff(date, 'hours')
        timeUnit = "hours"
    }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className='postProfileImg' src={"/uploads/upload/"+profilePic} alt="" />
                        <span className="postUsername">{name}</span>
                        <span className="postTime">{time} {timeUnit} ago</span>
                    </div>
                    {/* {currentUserID != 0 && <div className="postTopRight">
                        <EditIcon className='editIcon'/>
                        <DeleteIcon className='deleteIcon' onClick={deletePost} />
                    </div>} */}
                </div>
                <div className="postCenter">
                    <span className="postText">{text}</span>
                    <img className='postImg' src={"./uploads" + media} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ShareIcon className='postShareIcon'/>
                        <FlagIcon htmlColor='red' className='postFlagIcon'/>
                    </div>
                    <div className="postBottomRight" onClick={()=>setCommentOpen(!commentOpen)}>
                        <ModeCommentIcon className='postCommentIcon'/>
                        <span className="commentCount">{numComments}</span>
                    </div>
                </div>
                {commentOpen && <Comments id='comments' postID={postID} comments={commentList}/>}
            </div>
        
        </div>
    )
}
