import express from 'express'
import {addComment} from  '../controllers/comment.js'

const router = express.Router();

router.post("/", addComment)

export default router;