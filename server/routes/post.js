import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

router.get('/', verifyToken, getFeedPost),
router.get('/:userId/posts', verifyToken, getUserPosts)


export default router