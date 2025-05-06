import express from 'express';
import { getAllUsers, login } from '../controllers/auth.js';

const router = express.Router()

router.post('/login', login)
// router.get('/get', getAllUsers)

export default router