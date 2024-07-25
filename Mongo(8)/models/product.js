const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  // Point8 : adding extra id param for edit

  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    // Point15: this is created by mongo db we are checking here for editing id for new we have to pass null
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    // Point10 : defining ldop
    let dbOp;
    if (this._id) {
      // Point9 : editing if the id is present
      // Point11 : giving logic
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Point1: To find single product from the database
  static findById(prodId) {
    const db = getDb();
    return (
      db
        .collection('products')
        // Point4 : in mongodb we cannot just check by normal id we have ti create mongodb object to access id
        .find({ _id: new mongodb.ObjectId(prodId) })
        .next()
        .then((product) => {
          console.log(product);
          return product;
        })
        .catch((err) => console.log(err))
    );
  }

  // Point15: deleting object
  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((product) => {
        console.log('Deleted');
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
