/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseparis = require('./sources/adresseparis');
const mudjeans = require('')

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //const products = await dedicatedbrand.scrape(eshop);
    const products = await adresseparis.scrape(eshop);
    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

//in the terminal do : 
//node sandbox.js -> log the products from eshop defined above 
//or if you want another link : node sandbox.js "https://www.dedicatedbrand.com/en/men/t-shirts" 


/*
const mudjeans = require('./sources/mudjeans');
//Mud Jeans
echop2='https://mudjeans.eu';

const [,, eshop2] = process.argv;

sandbox(eshop2);


const adresseparis = require('./sources/adresse.paris');
//Adresse Paris
echop3='https://adresse.paris';
const [,, eshop3] = process.argv;

sandbox(eshop3);
*/