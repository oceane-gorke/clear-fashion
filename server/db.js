const user = process.env.user;
const password = process.env.password;

const cluster_url = "https://cloud.mongodb.com/v2/603d17a388becd74172c876e#metrics/host/5d05194ddfdf5ea83bf83e5dd1569af7/status"

var MongoClient = require('mongodb');
const MONGODB_URI = `mongodb+srv://${user}:${password}@${cluster_url}?retryWrites=true&writeConcern=majority`;
const MONGODB_DB_NAME = 'WebAppClearFashionGO';

async function run(){
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);
    const products = [];
    const collection = db.collection('products');
    const result = collection.insertMany(products);

    console.log(result);
}
run();





