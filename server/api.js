require('dotenv').config();
require('dotenv');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { request, response } = require('express');

//const db = require("./db");
const PORT = 8092;


const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

//connection 
const user = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
console.log(process.env.MONGOPASSWORD);
console.log(process.env.MONGOUSER);
const cluster_url = "webappclearfashiongo.e3xyn.mongodb.net";
var MongoClient = require('mongodb');
const MONGODB_URI = `mongodb+srv://${user}:${password}@${cluster_url}/myFirstDatabase?retryWrites=true&w=majority`;
console.log("MONGO", MONGODB_URI);
const MONGODB_DB_NAME = 'WebAppClearFashionGO';


//app.get('/hey', (request, response) => {
  //response.send("hey");
  /*
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  let page = parseInt(request.query.page);
  let size = parseInt(request.query.size);
  

  const collection = db.collection('products');

  //const query = {$and: [{brand: brand}, {price: {$lte : price}}]};
  const query= await collection.find({}).toArray();
  const whichpage= page!=0 ? page*size : 0
  //page commence à 0 avec le skip
  const prod = await collection.find({}).skip(whichpage).limit(size).toArray();

    
  let meta = await getMetaData(page,size, query);
    
    let products = {
      "success" : true,
      "data" : {
      "result" : prod,
      "meta": meta
        }}
  response.send(products);*/
//});


//f9360699-2c7d-5cec-8529-374d3e166f87
//60452e5edb264f983d2cc773




//limit - number of products to return (default: 12)
//brand - filter by brand (default: All brands)
//price - filter by price (default: All price)
//http://localhost:8092/products/search?limit=5&brand=loom&price=30



const getMetaData = async (page, size, q) => {
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');
  const nb = q.length;
  //onst nb=4;
  const pageCount = parseInt(nb/size);
  return {"currentPage" : page,"pageCount":pageCount,"pageSize":size,"count":nb} 
}

app.get('/', async(request, response) => {
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  let page = parseInt(request.query.page);
  let size = parseInt(request.query.size);
  let brand = request.query.brand;
  let price = parseInt(request.query.price);
  const collection = db.collection('products');
  const whichpage= page!=0 ? page*size : 0
  if (brand==null && price==null)
  {
  let query= await collection.find({}).toArray();
  let q = await collection.find({}).skip(whichpage).limit(size).toArray();

  let meta = await getMetaData(page,size, query);
    
    let products = {
      "success" : true,
      "data" : {
      "result" : q,
      "meta": meta
        }}
  response.send(products);
      }
  if(brand!=null && price!=null)
  {
  

  //const query = {$and: [{brand: brand}, {price: {$lte : price}}]};
  const query= await collection.find({$and : [ {'brand':brand},{ price: { $lte: price }}]}).toArray();
  const whichpage= page!=0 ? page*size : 0
  //page commence à 0 avec le skip
  const prod = await collection.find({$and : [ {'brand':brand},{ price: { $lte: price }}]}).skip(whichpage).limit(size).toArray();

    
  let meta = await getMetaData(page,size, query);
    
    let products = {
      "success" : true,
      "data" : {
      "result" : prod,
      "meta": meta
        }}
  response.send(products);
      }
  else if (brand==null && price!=null)
  {
    const query= await collection.find({ price: { $lte: price }}).toArray();
    const whichpage= page!=0 ? page*size : 0
    //page commence à 0 avec le skip
    const prod = await collection.find({ price: { $lte: price }}).skip(whichpage).limit(size).toArray();
  
      
    let meta = await getMetaData(page,size, query);
      
      let products = {
        "success" : true,
        "data" : {
        "result" : prod,
        "meta": meta
          }}
    response.send(products);
  }
  else if (brand!=null && price==null)
  {
    const query= await collection.find({ brand:brand}).toArray();
    const whichpage= page!=0 ? page*size : 0
    //page commence à 0 avec le skip
    const prod = await collection.find({ brand: brand}).skip(whichpage).limit(size).toArray();
  
      
    let meta = await getMetaData(page,size, query);
      
      let products = {
        "success" : true,
        "data" : {
        "result" : prod,
        "meta": meta
          }}
    response.send(products);
  }
})


app.get('/products/search', async (request, response)=>{

  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  let brand = request.query.brand;
  let price = parseInt(request.query.price);
  let page = parseInt(request.query.page);
  let size = parseInt(request.query.size);
  const collection = db.collection('products');
  
  if(brand!=null && price!=null)
  {
  

  //const query = {$and: [{brand: brand}, {price: {$lte : price}}]};
  const query= await collection.find({$and : [ {'brand':brand},{ price: { $lte: price }}]}).toArray();
  const whichpage= page!=0 ? page*size : 0
  //page commence à 0 avec le skip
  const prod = await collection.find({$and : [ {'brand':brand},{ price: { $lte: price }}]}).skip(whichpage).limit(size).toArray();

    
  let meta = await getMetaData(page,size, query);
    
    let products = {
      "success" : true,
      "data" : {
      "result" : prod,
      "meta": meta
        }}
  response.send(products);
      }
  else if (brand==null && price!=null)
  {
    const query= await collection.find({ price: { $lte: price }}).toArray();
    const whichpage= page!=0 ? page*size : 0
    //page commence à 0 avec le skip
    const prod = await collection.find({ price: { $lte: price }}).skip(whichpage).limit(size).toArray();
  
      
    let meta = await getMetaData(page,size, query);
      
      let products = {
        "success" : true,
        "data" : {
        "result" : prod,
        "meta": meta
          }}
    response.send(products);
  }
  else if (brand!=null && price==null)
  {
    const query= await collection.find({ brand:brand}).toArray();
    const whichpage= page!=0 ? page*size : 0
    //page commence à 0 avec le skip
    const prod = await collection.find({ brand: brand}).skip(whichpage).limit(size).toArray();
  
      
    let meta = await getMetaData(page,size, query);
      
      let products = {
        "success" : true,
        "data" : {
        "result" : prod,
        "meta": meta
          }}
    response.send(products);
  }
  });

app.get('/products/:id', async (request, response) => {
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');
  const id_prod = await collection.find({_id:MongoClient.ObjectId(request.params.id)}).toArray();

  let meta = await getMetaData(1,1, id_prod);
    
    let ids = {
      "success" : true,
      "data" : {
      "result" : id_prod,
      "meta": meta
        }}

  response.send(ids);

});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);

