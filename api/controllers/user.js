import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
    const userID = req.body.userID;
    console.log()
    const q = "UPDATE Users SET `profilePic`=?, `bannerPic`=?, `biography`=? WHERE userID=? ";

    db.query(q,[
      req.body.profilePic, 
      req.body.bannerPic,
      req.body.bio,
      userID
    ],
      (err, data) => {
        if (err) console.log(err);
      }
    );
  };