'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('sales_products', {
      saleId: {
        type: Sequelize.INTEGER,
        field: 'sale_id',
        references: {
          model: 'sales',
          key: 'id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
        
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });     
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('sales_products');
  
  }
};
