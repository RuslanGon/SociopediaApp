import UserModel from '../models/Users.js'
import mongoose from 'mongoose';

export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Ошибка получения пользователя:', error.message);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
  

  export const getUserFriends = async (req, res) => {
    try {
      const { id } = req.params; 
  
      const user = await UserModel.findById(id); 
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      const friends = user.friends; 
      res.status(200).json(friends); 
  
    } catch (error) {
      console.error('Ошибка получения друзей:', error.message);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };

  export const addRemoveFriend = async (req, res) => {
    try {
      const { id, friendsId } = req.params;
  
      // Проверка на валидный ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Некорректный ID пользователя' });
      }
  
      const user = await UserModel.findById(id);
      const friend = await UserModel.findOne({ email: friendsId }); // Ищем друга по email
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'Пользователь или друг не найден' });
      }
  
      const isFriend = user.friends.includes(friend.email);
  
      if (isFriend) {
        // Удаляем друга у обоих
        user.friends = user.friends.filter(email => email !== friendsId);
        friend.friends = friend.friends.filter(email => email !== user.email);
      } else {
        // Добавляем друга обоим
        user.friends.push(friendsId);
        friend.friends.push(user.email);
      }
  
      await user.save();
      await friend.save();
  
      res.status(200).json({ message: 'Друзья обновлены' });
  
    } catch (error) {
      console.error('Ошибка добавления/удаления друга:', error.message);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };