require('dotenv').config();
const fs = require('fs');
const path  =  require('path');
const user = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;

const cluster_url = "webappclearfashiongo.e3xyn.mongodb.net";

var MongoClient = require('mongodb');
const MONGODB_URI = `mongodb+srv://${user}:${password}@${cluster_url}/myFirstDatabase?retryWrites=true&w=majority`;
console.log("MONGO", MONGODB_URI);
const MONGODB_DB_NAME = 'WebAppClearFashionGO';


//only the dedicated products are stored for now
//do verification the product is not yet in the database
async function insert (mongodb_uri, mongodb_db_name){
    //connection
    const client = await MongoClient.connect(mongodb_uri, {'useNewUrlParser': true});
    const db =  client.db(mongodb_db_name);
    const collection = db.collection('products');

    //insert 
    //JSON.parse(fs.readFileSync(path.join(process.cwd(), SHOPIFY_FILE)))
    return fs.readFileSync(path.join(process.cwd(), "./server/database/products.json"), (error,jsonString)=>{
        if (error){
            console.log(error);
            console.log("Error");
            return 
        }
            const products=JSON.parse(jsonString);
            collection.insertMany(products)
            .then(
                res => console.log(`${res.result.n} products inserted`),
                error => console.error(error)
            );
            client.close();
    });    
}

async function whichBrand (brand) {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');

    const products = await collection.find({brand}).toArray();
    await client.close();

    console.log(products);
    return products;
}

async function lessThan (price_wanted) {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');

    const products = await collection.find({price : {$lt : price_wanted}}).toArray();
    await client.close();

    console.log(products);
    return products;
}

async function sortedByPrice () {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');

    const products = await collection.find({}).sort({price:1}).toArray();
    await client.close();

    console.log(products);
    return products;
}



insert(MONGODB_URI, MONGODB_DB_NAME);
//lessThan(50);
//sortedByPrice();

