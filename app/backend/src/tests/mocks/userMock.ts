import * as bcrypt from 'bcryptjs';

const userMock = {
  id: 1,
  email: 'test@example.com',
  password: bcrypt.hashSync('password123', 8),  
  role: 'admin',
}


export default userMock;