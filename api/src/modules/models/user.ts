import { Model, DataTypes } from "sequelize";

import sequelize from "../../loaders/database";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    freezeTableName: true,
    timestamps: true,
    indexes: [{ unique: true, fields: ["id"] }],
  }
);

export default User;
