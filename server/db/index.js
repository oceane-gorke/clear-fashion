require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const user = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const cluster_url = "webappclearfashiongo.e3xyn.mongodb.net";

const MONGODB_URI = `mongodb+srv://${user}:${password}@${cluster_url}/myFirstDatabase?retryWrites=true&w=majority`;
console.log("MONGO", MONGODB_URI);
const MONGODB_DB_NAME = 'WebAppClearFashionGO';
const MONGODB_COLLECTION = 'products';
const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = process.env.MONGODB_URI;

let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, {'ordered': false});

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};


module.exports.getMeta = async(page, size,brand=null,price=null ) => {
  const db = await getDB();
  const collection = db.collection(MONGODB_COLLECTION);
  let query;
  let count;
  if(brand && price){
    query={$and : [ {'brand':brand},{ price: { $lt: price }}]};
  } else if(brand){
    query={'brand':brand};
  } else if(price){
    query = { price: { $lt: price }}
  } else {
    query={};
  }
  count = await collection.find(query).count();
  const pageCount = parseInt(count/size);
  return {"currentPage" : page,"pageCount":pageCount,"pageSize":size,"count":count} 
}
/*
module.exports.findPage = async (page,size,brand=null,price=null,desc=-1,sort='price') => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const offset = page ? page * size : 0;
    let result;
    let query;
    let sortquery;
    if(brand && price){
      query={$and : [ {'brand':brand},{ price: { $lt: price }}]};
    } else if(brand){
      query={'brand':brand};
    } else if(price){
      query = { price: { $lt: price }}
    } else {
      query={};
    }
    if(sort == 'price'){
      sortquery={'price':desc};
    }else{
      sortquery={'released':desc};
    }
    //.sort({'price': desc})
    result = await collection.find(query).sort(sortquery).skip(offset)
                  .limit(size).toArray(); 
    
    return result;
  } catch (error) {
    console.error('🚨 collection.findPage...', error);
    return null;
  }
};*/

/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};
