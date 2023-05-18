'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("sales", {
     id : {
      allowNull : false,
      autoIncrement : true,
      primaryKey : true,
      type: Sequelize.INTEGER,
     },
     userId : {
      type: Sequelize.INTEGER,
      allowNull : false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: true,
      field: 'user_id',
    },
    sellerId: {
      type: Sequelize.INTEGER,
      allowNull : false,
      references: {
        model: "users",
        key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: true,
    field: 'seller_id',
  },

  totalPrice: {
    type: Sequelize.DECIMAL(9,2),
    field: 'total_price'
  },

  deliveryAddress: {
    type: Sequelize.STRING,
    field: 'delivery_address'
  },

  deliveryNumber: {
    type: Sequelize.STRING,
    field: 'delivery_number'
  },

  saleDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
    field: 'sale_date'
  },

  status: {
    type: Sequelize.STRING,
  },

 });
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales')
  }
};
