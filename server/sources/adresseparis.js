const axios = require('axios');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */

const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list.grid.row .product-container .right-block')
    .map((i, element) => {
      const link = `https://www.adresse.paris/${$(element)
        .find('.cbp-spmenu')
        .attr('href')}`;
      return {
        link,
        'brand': 'adresseparis',
        'price': parseInt(
          $(element)
            .find('.content_price .price.product-price')
            .text()
            .replace("€","")
        ),
        'name': $(element)
          .find('.product-name-container.versionmob .product-name')
          .text()
          .trim()
          .replace(/\s/g, ' '),
        'photo': $(element)
          //.find('.product-image-container .product_img_link .replace-2x.img-responsive.lazy.img_0.img_1e')
          .find('.product-image-container .product_img_link img_0')
          .attr('src'),
        '_id': uuidv5(link, uuidv5.URL)
      }
      //const brand = $(element)
      //  .find('')
    })
    .get();
};


/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};
