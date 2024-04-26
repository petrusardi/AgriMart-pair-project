'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Order, { foreignKey: "ProductId" })
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.belongsTo(models.User, { foreignKey: "UserId" });
    }

    static async getCategory (Category, option) {
      try {
        let options = {
          include: Category,
          where:option
        }
        let data = await Product.findAll(options)
        return data
      } catch (error) {
        throw error
      }
    }

  }

  Product.init({

    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Categories"
        },
        key: "id"
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};

/*
Users -> Profiles (One to One)
Profiles -> Orders (One to Many)
Products -> Orders (One to Many)
Categories -> Products (One to Many)
*/