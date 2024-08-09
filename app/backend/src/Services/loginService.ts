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
    status: 401,
    data: { message: 'Invalid email or password' },
  };
};

const loginPost = async (email: string, password: string): Promise<IServiceResponse<IUsers>> => {
  const userData = await UserModel.findOne({ where: { email } });
  if (!userData) {
    return {
      status: 401,
      data: { message: 'Invalid email or password' },
    };
  }
  const result = validLogin(password, userData.dataValues);
  return result;
};

const tokenVerify = (token: string): string => {
  const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
  const { id } = decoded;
  return id;
};

const loginRole = async (token: string): Promise<IServiceResponse<IUsers>> => {
  const id = tokenVerify(token);
  const userData = await UserModel.findByPk(id);
  if (!userData) {
    return {
      status: 404,
      data: { message: 'User not found' },
    };
  }
  return {
    status: 200,
    data: { role: userData.dataValues.role },
  };
};

export default {
  loginPost,
  loginRole,
};
