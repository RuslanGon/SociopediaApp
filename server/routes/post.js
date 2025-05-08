import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getFeedPost, getUserPosts, patchPost } from '../controllers/posts.js';

const router = express.Router()

router.get('/', verifyToken, getFeedPost),
router.get('/:userId/posts', verifyToken, getUserPosts)
router.patch('/:id/like', verifyToken, patchPost)


export default router