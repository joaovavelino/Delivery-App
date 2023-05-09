module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING
    },
      {
        underscored: true,
        tableName: 'sales',
        timestamps: false,
      });
     
      Sale.associate = (models) => {
        Sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller' }),
        Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };
  
    return Sale;
  };