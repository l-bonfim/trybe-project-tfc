import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import IServiceResponse from '../Interfaces/ServiceResponse';
import UserModel from '../database/models/UserModel';
import IUsers from '../Interfaces/Users';

const secret = process.env.JWT_SECRET || 'secret';

const validLogin = (password: string, userData: IUsers): IServiceResponse<IUsers> => {
  const { email, id } = userData;
  const validate = bcrypt.compareSync(password, userData.password);
  if (validate) {
    const token = jwt.sign({ id, email }, secret);
    return {
      status: 200,
      data: { token },
    };
  }
  return {
    status: 404,
    data: { message: 'User not found' },
  };
};

const loginPost = async (email: string, password: string): Promise<IServiceResponse<IUsers>> => {
  if (!email || !password) {
    return {
      status: 400,
      data: { message: 'All fields must be filled' },
    };
  }
  const userData = await UserModel.findOne({ where: { email } });
  if (!userData) {
    return {
      status: 404,
      data: { message: 'User not found' },
    };
  }
  const result = validLogin(password, userData.dataValues);
  return result;
};

export default {
  loginPost,
};
