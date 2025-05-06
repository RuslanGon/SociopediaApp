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
      if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(friendsId)) {
        return res.status(400).json({ message: 'Некорректный ID пользователя или друга' });
      }
  
      const user = await UserModel.findById(id);
      const friend = await UserModel.findById(friendsId);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'Пользователь или друг не найден' });
      }
  
      const isFriend = user.friends.includes(friendsId);
  
      if (isFriend) {
        // Удаляем друга у обоих
        user.friends = user.friends.filter(fId => fId.toString() !== friendsId);
        friend.friends = friend.friends.filter(fId => fId.toString() !== id);
      } else {
        // Добавляем друга обоим
        user.friends.push(friendsId);
        friend.friends.push(id);
      }
  
      await user.save();
      await friend.save();
  
      // Получаем список друзей с их данными
      const friends = await UserModel.find({ _id: { $in: user.friends } });
  
      res.status(200).json(friends);
  
    } catch (error) {
      console.error('Ошибка добавления/удаления друга:', error.message);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };