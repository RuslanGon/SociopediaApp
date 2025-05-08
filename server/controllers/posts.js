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
        res.status(500).json({ 
          message: 'Ошибка при создании поста',
          error: error.message  // ← добавь это
        });
      }
    }

export const getFeedPost = async (req, res) => {
        try {

          const { userId } = req;   
          const posts = await PostModel.find(); 
          
          if (!posts) {
            return res.status(404).json({ message: "Посты не найдены" });
          }
      
          const postsWithUserInfo = await Promise.all(posts.map(async (post) => {
            const user = await UserModel.findById(post.userId);
            return {
              ...post._doc,  
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                userPicturePath: user.picturePath,
              },
            };
          }));
      
          res.status(200).json(postsWithUserInfo);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Ошибка при получении постов", error: error.message });
        }
      };

export const getUserPosts = async (req, res) => {
        try {
          const { userId } = req.params;  
          const posts = await PostModel.find({ userId });
          
          if (posts.length === 0) {
            return res.status(404).json({ message: "Посты для этого пользователя не найдены" });
          }
      
          const postsWithUserInfo = await Promise.all(posts.map(async (post) => {
            const user = await UserModel.findById(post.userId);
            return {
              ...post._doc,  
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                userPicturePath: user.picturePath,
              },
            };
          }));
      
          res.status(200).json(postsWithUserInfo);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Ошибка при получении постов пользователя", error: error.message });
        }
      };

      export const patchPost = async (req, res) => {
        try {
          const { id } = req.params;  // Получаем ID из URL
          const post = await PostModel.findById(id);  // Ищем пост по ID
          
          if (!post) {
            return res.status(404).json({ message: "Пост не найден" });
          }
          
          post.description = req.body.description || post.description;
          post.location = req.body.location || post.location;
          
          await post.save();
          
          res.status(200).json(post);  
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Ошибка при обновлении поста', error: error.message });
        }
      };