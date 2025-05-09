import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from './models/Users.js'
import PostModel from './models/Post.js';
import { users, posts } from './data/index.js'

dotenv.config();

const startServer = async (app) => {
  try {
    const { DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;
    const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lc6ql.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');

    // Вставка данных до запуска сервера
    const existingUsers = await UserModel.find();
    if (existingUsers.length === 0) {
      await UserModel.insertMany(users);
      await PostModel.insertMany(posts);
      console.log('📦 Test data inserted');
    }

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default startServer;
