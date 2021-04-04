require('dotenv').config();
require('dotenv');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { request } = require('express');

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


app.get('/', (request, response) => {
  response.send({'ack': true});
});


//f9360699-2c7d-5cec-8529-374d3e166f87
//60452e5edb264f983d2cc773




//limit - number of products to return (default: 12)
//brand - filter by brand (default: All brands)
//price - filter by price (default: All price)
//http://localhost:8092/products/search?limit=5&brand=loom&price=30

app.get('/products/search', async (request, response)=>{

  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  let brand = request.query.brand;
  let limit = request.query.limit;
  let price = request.query.price;
  let res;
  let meta;

  const collection = db.collection('products');
  const prod = await collection.find({brand: brand}, {price: ({$lte : price})}, {limit:limit}).toArray();

    //res = await db.findPage(parseInt(req.query.page),parseInt(req.query.size),brand = req.query.brand,price = parseInt(req.query.price),desc = (req.query.desc)?-1:1,sort = (req.query.sort)?'released':'price');
    //meta = await db.getMeta(parseInt(req.query.page),parseInt(req.query.size),brand = req.query.brand,price = parseInt(req.query.price));
    /*
    let products = {
      "success" : true,
      "data" : {
      "result" : prod,
      "meta": meta
        }}*/
    response.send(prod);
  });

app.get('/products/:id', async (request, response) => {
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');
  const id_prod = await collection.find({_id:MongoClient.ObjectId(request.params.id)}).toArray();
  //const id_prod = await collection.find({_id:request.params.id}).toArray();
  //console.log(request.params.id);
  //await client.close();
  //console.log(id_prod);
  response.send(id_prod);

});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);

