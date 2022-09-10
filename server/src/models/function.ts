import {Logger} from '../utils/logger';
import {Sequelize, DataTypes, Model} from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:', {
  logging: (msg) => Logger.debug(msg),
});

/** */
class Function extends Model {}

Function.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Function',
});

export default Function;
