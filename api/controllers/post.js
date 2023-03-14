import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;

    const q = "INSERT INTO Posts(`postMedia`, `postText`, `postUserID`, `postDate`, `isAnonymous`) VALUES (?)";
    const values = [
      req.body.postMedia,
      req.body.postText,  
      req.body.userPostID,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.isAnonymous
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  };


export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `postID`=?";

    db.query(q, [req.body.postID], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};