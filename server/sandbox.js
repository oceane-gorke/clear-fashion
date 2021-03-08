/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseparis = require('./sources/adresseparis');
const mudjeans = require('./sources/mudjeans')
const fs = require('fs');

async function sandbox_dedicated () {
  let eshop = 'https://www.dedicatedbrand.com/en/men/news';
  try {
    //console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);
    console.log(products);

    let datascraped = JSON.stringify(products);
    fs.writeFileSync('database/dedicated_products.json', datascraped);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox_dedicated();

async function sandbox_adresse () {

  let eshop = 'https://adresse.paris/602-nouveautes';
  try {
    //console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adresseparis.scrape(eshop);
    console.log(products);

    let datascraped = JSON.stringify(products);
    fs.writeFileSync('database/adresseparis_products.json', datascraped);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//sandbox_adresse();

async function sandbox_mudjeans () {
  let eshop= "https://mudjeans.eu/collections/skinny";
  try {
    //console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await mudjeans.scrape(eshop);
    console.log(products);

    let datascraped = JSON.stringify(products);
    fs.writeFileSync('database/mudjeans_products.json', datascraped);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//sandbox_mudjeans();

const [,, eshop] = process.argv;




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