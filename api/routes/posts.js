import express from 'express'
import {addPost, deletePost} from  '../controllers/post.js'

const router = express.Router();

router.post("/", addPost)
router.delete("/", deletePost)

export default router;