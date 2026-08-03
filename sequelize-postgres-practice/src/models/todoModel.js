import { DataTypes } from 'sequelize';

import sequelize from '../utils/dbHelper.js';

const Todo = sequelize.define(
  'Todo',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
      // allowNull defaults to true
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    // Other model options go here
    tableName: 'todo',
    createdAt: false,
    updatedAt: false
  }
);

export default Todo;
