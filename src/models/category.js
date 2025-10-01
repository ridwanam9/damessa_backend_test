const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: "categories",
  timestamps: true,
  paranoid: true, // soft delete
});

module.exports = Category;
