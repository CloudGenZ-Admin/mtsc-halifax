import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Prayer = sequelize.define('Prayer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prayerRequest: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, 
  },
}, {
  timestamps: true,
});

export default Prayer;