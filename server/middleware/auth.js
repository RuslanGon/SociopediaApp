import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).json({ message: 'Доступ запрещён. Токен не предоставлен.' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trim(); // убираем "Bearer "
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Ошибка проверки токена:', error);
    res.status(401).json({ message: 'Недействительный или просроченный токен.' });
  }
};
