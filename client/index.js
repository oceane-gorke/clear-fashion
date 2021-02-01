// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}]

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);





/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const link = 'https://www.loom.fr/collections/tous-les-vetements/products/le-t-shirt'
console.log(link)



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable
const nb = marketplace.length
console.log(nb)

//correction
/*
let nbproducts = 0;
marketplace.forEach(function(item){
  nbproducts++;
});
console.log(nbproducts);*/

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
const brand_names = [];
marketplace.forEach(e => { brand_names.push(e.brand)});
let uniquebrand = [...new Set(brand_names)]
console.log(uniquebrand)
console.log("there are " + uniquebrand.length + " brands.")


//correction
/*
let brand_names=[];
marketplace.forEach(function(item)
{
  if (brands.includes(item.brand)== false)
  {
    brands.push(item.brand);
  }
});
console.log(brands);
console.log("We have "+brand_names.length+" brands.");

*/
//notes
/*
const brandsList = marketplace.map(function (product)
{
  return product.brand;
})

const brandsList = [];

marketplace.forEach(function (product)
{
  brandsList.push(product.brand);
})
for (var index =0; index <numberOfProducts; index++){
  brandsList.push(marketplace[index]['brand']);
}
for (var product of marketplace){
  brandsList.push(product.brand);
}
for (var index in marketplace){
  brandsList.push(product.brand);
}
*/

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
/*function sorting(a,b)
{
  if (a.price < b.price)
    return -1;
  if (a.price > b.price)
    return 1;
  return 0;
}
const prices = [];
marketplace.forEach(e => { prices.push(e.price)});
let sortedprice = [...new Set(prices)]
sortedprice.sort((a,b) =>  a - b );
console.log(sortedprice)*/

function sortMarketByPrice(a,b){
  if (a.price < b.price){
    return -1;
  }
  if (a.price> b.price){
    return 1;
  }
  return 0;
}
const marketPlaceSortedPrice = marketplace;
marketPlaceSortedPrice.sort(sortMarketByPrice);
console.log("Sorted by price", marketPlaceSortedPrice);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

/*function sort_date(o1,o2){
  if (sort_o1_before_o2)    return -1;
  else if(sort_o1_after_o2) return  1;
  else                      return  0;
}
function sort_date(o1,o2){
  //return new Date(b.date) - new Date(a.date);
  return o2-o1;
}*/
const dates = [];
marketplace.forEach(e => { const d= new Date(e.date); dates.push(d)});
//marketplace.forEach(e => { dates.push(e.date)});
let sorted_dates = [...new Set(dates)]
sorted_dates.sort((a,b) => b-a);
console.log(sorted_dates)



// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
function filterp(p)
{
  return p>=50 & p<=100;
}
let filter_price = marketPlaceSortedPrice.filter(filterp)
console.log(filter_price)



// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average
function average(data)
{
  var sum = 0; 
    for(var i = 0; i < data.length; i++){
        sum += parseInt(data[i], 10); //don't forget to add the base 
    }

    var avg = sum/data.length;

    return avg;
}
const avg = average(marketPlaceSortedPrice);
console.log("average basket : " + avg)

function Find_averagePrice(list)
{
  var sum=0;
  list.forEach(element => {
    sum+= element.price;
  });
  return sum/list.length;
}
//const avg_price = Find_averagePrice(marketplace);
//console.log(avg_price);


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
//var brands = new Object();
/*
var brands =[];
var i ="";
for (i in brand_names)
{
  brands.push({name:i, product: []})
}
*/

//using reduce function
//console.log(brands);

const brands = marketplace.reduce((brands, p) => {
  const brand = (brands[p.brand] || []);
  brand.push(p);
  brands[p.brand] = brand;
  return brands;
}, {});
console.log(brands);

//2e méthode
/*
const brands = {};
marketplace.forEach(function(e1){
  brands[e1.brand] = marketplace.filter(k => k.brand == e1.brand);
});
console.log("Dict of brand/products");
console.log(brands);
*/
// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

for (let i in brands){
  brands[i].sort((a,b) => a.price - b.price)
}
console.log(brands);

//2e méthode
/*
for (const [key, value] of Object.entries(brands)){
  value.sort((a,b) => (a.price > b.price) ? -1 : 1);
};

console.log("Dict of brands/products by price");
console.log(brands);
*/

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

for (let i in brands)
{
  brands[i].sort((a,b) => a.date < b.price ? -1 : 1)
}
console.log(brands)

//2e méthode
/*
for (const [key, value] of Object.defineProperties(brands)){
  value.sort((a,b) => (a.date > b.date) ? 1 : -1);
};
console.log("Dict of brands/products by date");
console.log(brands);
*/

/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products





/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
let now = new Date().now;
let two_weeks = new Date();
two_weeks.setDate(now.getDate() - 14);
let new_prod = false;
for (let d in COTELE_PARIS){
  if (d.realeased > two_weeks){
    new_prod = true;
  }
}
console.log("is there new products ? " +new_prod); 

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
let products_price=[]
for (let price in COTELE_PARIS){
  products_price.push(price)
}

let reasonable_price = false;
for (let i in products_price){
  if (i>100){
    reasonable_price=true;
  }
}
console.log("Is Cotele paris a reasonable price shop ?" + reasonable_price)

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

for (let c in COTELE_PARIS){
  if (c.uuid=='b56c6d88-749a-5b4c-b571-e5b5c6483131'){
    console.log("Le produit avec le uuid b56c6d88-749a-5b4c-b571-e5b5c6483131 est : " + c.name);
  }
}


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product



// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket.favorite=true;
console.log(blueJacket)



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
localStorage.setItem("file", MY_FAVORITE_BRANDS);
console.log(localStorage);