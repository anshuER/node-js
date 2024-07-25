const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Point32: make the schema for  order
const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, require: true },
      quantity: { type: Number, require: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
});

module.exports = mongoose.model('Order', orderSchema);

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Order = sequelize.define('order', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   }
// });

// module.exports = Order;
