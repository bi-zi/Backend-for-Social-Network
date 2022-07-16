import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional(),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

export const aboutValidation = [
  body('livesIn', 'Укажите город вашего проживания').isLength({ min: 2 }),
  body('from', 'Укажите из какой вы страны').isLength({ min: 2 }),
  body('bornOn', 'Укажите где вы родились').isLength({ min: 2 }),
  body('profession', 'Укажите вашу профессию').isLength({ min: 2 }),
  body('relations', 'Укажите с кем вы в отношениях').isLength({ min:2 }),
  body('studentAt', 'Укажите где вы учитесь').isLength({ min: 2 }),
];
