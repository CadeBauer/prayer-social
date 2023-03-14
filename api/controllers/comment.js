import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  /*if (token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");*/

    const q = "INSERT INTO Comments(`commentText`, `userID`, `date`, `postID`) VALUES (?)";
    console.log
    const values = [
      req.body.commentText,
      req.body.userID,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.postID
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  };

