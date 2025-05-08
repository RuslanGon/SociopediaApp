import PostModel from '../models/Post.js';
import UserModel from '../models/Users.js';

export const createPost = async (req, res) => {
    try {
      const { userId, description, location, picturePath } = req.body;
      console.log('Received location:', location);  // Лог для проверки
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      const newPost = new PostModel({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location,  // Проверить, что location — это строка
        description,
        picturePath,
        userPicturePath: user.picturePath,
        likes: new Map(),
        comments: []
      });
  
      await newPost.save();
  
      const posts = await PostModel.find();
      res.status(201).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при создании поста' });
    }
  };

export const getFeedPost = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

export const getUserPosts = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

export const patchPost = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}