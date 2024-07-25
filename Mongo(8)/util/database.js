const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  try {
    const client = new MongoClient(
      'mongodb+srv://anshupatel710:anshu710@nodelearning.qft5fdn.mongodb.net/?retryWrites=true&w=majority'
    );
    _db = client.db();
    callback();
    console.log('conected');
  } catch (err) {
    console.log('---------------', err);
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
