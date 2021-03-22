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

  return $('.site-nav')
    .map((i, element) => {
      const link = `https://www.loom.fr/collections/${$(element)
        .find('.product-title')
        .attr('href')}`;

        return{
          link,
          'brand' : 'dedicated',
          'price' : parseInt(
            $(element)
              .find('.price .money')
              .text()
            //  .replace("€","")
          ),
          'name' : $(element)
            .find('.product-title')
            .text()
            .trim(),
          'photo': $(element)
            .find('.product-grid-image .product_card__image-wrapper img')
            .attr('src'),
          '_id': uuidv5(link, uuidv5.URL)

        };
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
