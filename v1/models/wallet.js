"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Expense);
    }
  }
  Wallet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 20],
          isAlpha: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          max: 200,
        },
      },
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
