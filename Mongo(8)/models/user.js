const mongodb = require('mongodb');
const { getDb } = require('../util/database');

// Point20: storing mongo object
const ObjectId = mongodb.ObjectId;

// Point16: Creating user object for our db
class User {
  // Point24: we also want cart object and id
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // { items:[] }
    this._id = id;
  }

  save() {
    const db = getDb();
    // Point17: Creating db operation
    return db.collection('users').insertOne(this);
  }

  // Point23: addtocart function
  addToCart(product) {
    // // Point24: function to find product and add if it doesnot exist in cart.
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    //Point30: to increase prod qty
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    // Point25: function to increase qty
    // const updatedCart = { items: [{ ...product, quantity: 1 }] };
    //Point29: only store productID.
    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  //Point31: add getCart function
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => i.productId);
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  //Point36: make deleteItemFromCart
  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  //Point39: addOrder function
  addOrder() {
    const db = getDb();
    //Point44:update getCartprodutc.
    return this.getCart()
      .then((product) => {
        //Point43:forgot to add userId for the order .
        const order = {
          items: product,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };

        return db.collection('orders').insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  //Point42: getOrders function.
  getOrders() {
    const db = getDb();
    return (
      db
        .collection('orders')
        //Point45: modified this find array
        .find({ 'user._id': new ObjectId(this._id) })
        .toArray()
    );
  }

  // Point18: Creating findby id function
  static findById(userId) {
    const db = getDb();
    // Point19: the userId will be string we have to convert it into mongo id
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}
module.exports = User;
