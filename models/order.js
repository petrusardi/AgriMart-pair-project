'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Product, { foreignKey: "ProductId" })
      Order.belongsTo(models.Profile, { foreignKey: "CustomerId" })
    }

    static async getProd (Product, option) {
      try {
        let options = {
          include: Product,
          where: option
        }
        let data = await Order.findAll(options)
        return data
      } catch (error) {
        throw error
      }
    }
  }
  Order.init({
  
    CustomerId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Profiles"
        },
        key: "id"
      },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Products"
        },
        key: "id"
      }}}}, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

/*
Users -> Profiles (One to One)
Profiles -> Orders (One to Many)
Products -> Orders (One to Many)
Categories -> Products (One to Many)
*/