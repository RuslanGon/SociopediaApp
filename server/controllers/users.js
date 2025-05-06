import UserModel from '../models/Users.js'


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
        
    } catch (error) {
        console.log(error);
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}