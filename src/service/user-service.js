import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import mailService from './mail-service.js'
import tokenService from './token-service.js'
import { UserDto, UserDtoLogin } from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js';
import { male, woman } from '../images/images.js'




class UserService {


  async registration(login, firstName, lastName, gender, birdayDate, email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const image = gender === 'male' ? male : woman

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await UserModel.create({
      login,
      firstName,
      lastName,
      gender,
      birdayDate,
      friends: [],
      subscribers: [],
      avatar: { image: image, sizeUpTo: '0', sizeAfter: '0' },
      email,
      password: hashPassword,
      activationLink, wasOnline: new Date(),
      online: false,
    })
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });


    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return { ...tokens, user: userDto }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации')
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData._id);
    const userDto = new UserDto(user);


    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto }
  }

  async getMainUser() {
    const users = await UserModel.findOne();
    return users;
  }
}


export default new UserService()
