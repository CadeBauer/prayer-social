import express from 'express'
const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser'
const saltRounds = 10;
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js"
import { db } from "../api/connect.js"
import multer from 'multer'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials : true
}));

//POST IMG

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads/upload')
    cb(null, '../client/public/profile/uploads/upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req,res)=>{
  const file = req.file;
  res.status(200).json(file.filename)
})

app.use(cookieParser())
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)


app.get('/', (req,res) =>{
  res.send("This is the root")
})

app.listen(3003, () => {
  console.log("Server is up and listening on port 3003")
})

app.post('/posts', (req, res) =>{
  const id = req.body.id
  if (id == 0) {
    db.query("SELECT Posts.postID, Posts.postMedia, Posts.postText, Posts.postUserID, Posts.postDate, Posts.isAnonymous, Users.firstName, Users.lastName, Users.profilePic, NumberComments.commentCount FROM Posts LEFT JOIN Users ON Posts.postUserID = Users.userID LEFT JOIN (SELECT COUNT(Comments.postID) AS commentCount, Comments.postID FROM Comments GROUP BY Comments.postID) AS NumberComments ON Posts.postID = NumberComments.postID ORDER BY Posts.postDate DESC;", (err, result) => {
      if(err){
        console.log(err)
      } else {
        res.send(result)
      }
    })
  } else {
    db.query("SELECT Posts.postID, Posts.postMedia, Posts.postText, Posts.postUserID, Posts.postDate, Posts.isAnonymous, Users.firstName, Users.lastName, Users.profilePic, NumberComments.commentCount FROM Posts LEFT JOIN Users ON Posts.postUserID = Users.userID LEFT JOIN (SELECT COUNT(Comments.postID) AS commentCount, Comments.postID FROM Comments GROUP BY Comments.postID) AS NumberComments ON Posts.postID = NumberComments.postID WHERE Posts.postUserID = ? ORDER BY Posts.postDate DESC;", [id], (err, result) => {
      if(err){
        console.log(err)
      } else {
        res.send(result)
      }
    })
  }
})

app.post('/comments', (req, res) =>{
  const postID = req.body.postID
  db.query("SELECT * FROM Comments LEFT JOIN Users ON Users.userID = Comments.userID WHERE Comments.postID = ? ORDER BY Comments.date DESC;", [postID], (err, result) => {
    if(err){
      console.log(err)
    } else {
      res.send(result)
    }
  })
})