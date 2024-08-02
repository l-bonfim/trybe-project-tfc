import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class UserModel extends Model<InferAttributes<UserModel>,
InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare username: CreationOptional<string>;
  declare role: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(UserModel, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(UserModel, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// UserModel.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// UserModel.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default UserModel;
