// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select-');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
//const selectDateAsc = document.querySelector('#recentlyreleased');
const selectReasPrice = document.querySelector('#reasprice');
const selectFavs = document.querySelector('#favs');
//const addFav = document.querySelector('#favadded');
const selectSort = document.querySelector('#sort-select');

const spanNbProductstotal = document.querySelector('#nbProductstotal');
const spanPrice50 = document.querySelector('#price50');
const spanPrice90 = document.querySelector('#price90');
const spanPrice95 = document.querySelector('#price95');
const spanDate = document.querySelector('#date');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({ result, meta }) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12, brand="ALL") => {
  
  try {
    if (brand=="ALL")
    {
    console.log("hey")
    const response = await fetch(
      //`https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
      `https://clear-fashion-ashen.vercel.app/?page=${page}&size=${size}`
      //`https://clear-fashion-5w3vcun1k-oceane-gorke.vercel.app/?page=${page}&size=${size}`
      );
    const body = await response.json();
    
    if (body.success !== true) {
      console.error(body);
      return { currentProducts, currentPagination };
    }

    return body.data;
  }
  else {
    const response = await fetch(
      
      `https://clear-fashion-ashen.vercel.app/?page=${page}&size=${size}&brand=${brand}`
      );
    const body = await response.json();
    console.log(body);
    console.log("success", body);
    if (body.success !== true) {
      console.error(body);
      return { currentProducts, currentPagination };
    }
    console.log(body.data);
    return body.data;
    
  }
  } catch (error) {
    console.error(error);
    return { currentProducts, currentPagination };
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div  id=${product.uuid}>
        <a href="${product.link} target="_blank">
        <image image.fit img src=${product.photo}>
              </a>
        <span><i>${product.brand}</i></span>
        <a href="${product.link}"><b>${product.name}</b></a>
        <span>${product.price}€&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
        <input type="checkbox" id="favadded" name="favadded">
          <label for= "favadded">Add to Fav ⭐️&nbsp&nbsp</span>
        </div>
      </div>
      <br>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>• Products •</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */

function renderPagination(pagination) {
  const nbPage = pagination.pageCount;
  let options = '';

  for (var index = 0; index < nbPage; index++) {
    options += '<option value ="' + (index + 1) + '">' + (index + 1) + '</option>';
  }

  selectPage.innerHTML = options;
}



/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const { count } = pagination;

 // spanNbProducts.innerHTML = count;
  spanNbProducts.innerHTML = currentProducts.length;
  spanNbProductstotal.innerHTML = 97;
  //spanNbProductsnew.innerHTML = 4;
  spanPrice50.innerHTML = p_50(currentProducts);
  spanPrice90.innerHTML = p_90(currentProducts);
  spanPrice95.innerHTML= p_95(currentProducts);
  //spanDate.innerHTML=sortRecent(currentProducts)[0].released;
}



const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  //const brand = ListBrand(currentProducts);
  //renderBrand(brand);
  //renderRecent(products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), selectShow.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
})

selectBrand.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage,selectShow.value,event.target.value)
    .then(setCurrentProducts)
    .then(() => renderProducts(currentProducts, currentPagination))
    console.log("pagination", currentPagination.currentPage)
    console.log("show?", selectShow.value);
    console.log(event.target.value);

  
})



selectReasPrice.addEventListener('click', event => {
  if (selectReasPrice.checked == true) {
    renderProducts(sortReasPrice(currentProducts));
  }
  else {
    renderProducts(currentProducts);
  }
})

selectFavs.addEventListener('click', event => {
  if(selectFavs.checked==true){
    renderProducts(fav_prod);
  }
  renderProducts(currentProducts);

})


document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

/* 
*Feature 1:
Browse available pages
*/
//2e version
/*
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});
*/

/*
* Feature 2:
Filter by brands
*/
const sortbrand = (products, brand) => {
  const sort_product = [];
  for (var i = 0; i < products.length; i++) {
    if (products[i]["brand"] == brand) {
      sort_product.push(products[i]);
    }
  }
  renderProducts(sort_product);
}


const ListBrand = products => {
  const name_brand = [];
  for (var i = 0; i < products.length; i++) {
    if (name_brand.includes(products[i]["brand"]) == false) {
      name_brand.push(products[i]["brand"]);
    }
  }
  return name_brand;
}
const renderBrand = brand => {
  const options = Array.from(
    { 'length': brand.length },
    (value, index) => `<option value="${brand[index]}">${brand[index]}</option>`
  ).join('');

  selectBrand.innerHTML = options;
}

/*
* Feature 3:
Filter by recent products
*/
//Math.trunc((Date.now() - Date.parse(x.released)) / (1000 * 3600 * 24)) < 2*7

Date.prototype.minusDays = function (days) {
  //this.setDate(this.getDate() - parseInt(days));
  this.setDate(this.getDate() - days);
  return this;
};

const sortRecent = products => {
  //let produceDate = new Date(products.released);
  let currentTime = Date.now();
  //var twoWeeksAgo = currentTime.minusDays(15);
  const sort_product = [];

  for (var i = 0; i < products.length; i++) {
    let d = new Date.parse(products[i].released);
    let time = (currentTime - d) / (1000 * 3600 * 24);
    if (time > 2 * 7) {
      sort_product.push(products[i]);
    }
  }
  return sort_product;
}



/*
* Feature 4:
Filter by reasonable price
*/

const sortReasPrice = products => {
  const sort_product = [];

  for (var i = 0; i < products.length; i++) {

    if (products[i].price < 50) {
      sort_product.push(products[i]);
    }
  }
  return sort_product;
}

/*
* Feature 5/6:
Sort by price/date
*/
function sort_price(a, b, order) {
  return (a.price > b.price) ? order : ((b.price > a.price) ? -order : 0);
}

function sort_date(a, b, order) {
  a = Date.parse(a.released);
  b = Date.parse(b.released);
  return (a > b) ? order : ((b > a) ? -order : 0);
}

selectSort.addEventListener('change', event => {

  switch (event.target.value) {
    case 'price-desc':
      currentProducts = [...currentProducts].sort((a, b) => sort_price(a, b, -1));
      break;
    case 'price-asc':
      currentProducts = [...currentProducts].sort((a, b) => sort_price(a, b, 1));
      break;
    case 'date-desc':
      currentProducts = [...currentProducts].sort((a, b) => sort_date(a, b, 1));
      break;
    case 'date-asc':
      currentProducts = [...currentProducts].sort((a, b) => sort_date(a, b, -1));
      break;
  }
  render(currentProducts, currentPagination);
});

/*
* Feature 10:
Number of price value indicator
*/
function p_90 (currentProducts) {
  let tab = [...currentProducts].sort((a, b) => sort_price(a, b, 1));
  let index = Math.round(90 / 100 * tab.length);
  return tab[index].price;
}

function p_50 (currentProducts){
  let tab = [...currentProducts].sort((a, b) => sort_price(a, b, 1));
  let index = Math.round(50 / 100 * tab.length);
  return tab[index].price;
}

function p_95 (currentProducts) {
  let tab = [...currentProducts].sort((a, b) => sort_price(a, b, 1));
  let index = Math.round(95 / 100 * tab.length);
  return tab[index].price;
}



// Feature : FAVORITES
let fav_prod = [];

function addToFavorite(product){
  if (fav_prod.includes(product)==false)
  {
    fav_prod.push(product)
  }
};

/*
addFav.addEventListener('click', event => {
  if(addFav.checked==true){
    addToFavorite(product);
  }
  renderProducts(currentProducts);

})*/