const puppeteer = require('puppeteer');
//const $ = require('cheerio');
const CronJob = require('cron').CronJob;
//const nodemailer = require('nodemailer');

let job;

async function configureBrowser(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function checkPrice(page, url) {
    await page.reload();

    const [nameElement] = await page.$x('//*[@id="productTitle"]');
    const text = await nameElement.getProperty('textContent');
    const name = await text.jsonValue();
    const finalName = name.replace('\\n','').trim();

    const [priceElement] = await page.$x('//*[@id="priceblock_ourprice"]');
    const newPricetext = await priceElement.getProperty('textContent');
    const newPrice = await newPricetext.jsonValue();

    const [imageElement] = await page.$x('//*[@id="landingImage"]');
    const src = await imageElement.getProperty('src');
    const itemImageURL = await src.jsonValue();

    console.log({name: finalName, price: newPrice, img: itemImageURL});

    let currentPrice = Number(newPrice.replace(/[^0-9.-]+/g,""));

    if (currentPrice < 60000) {
        console.log("BUY!!!!");
        job.stop();
    } else {
        console.log('WAIT!!!');
    }
    console.log('Current Price:' + currentPrice);
}

async function trackPrice(url) {
    const page = await configureBrowser(url);

    let item = {};
  
    job = new CronJob('*/30 * * * * *', function() { //runs every 30 minutes in this config
      item = checkPrice(page, url);
    }, null, true, null, null, true);
    job.start();
}


module.exports = {
    trackPrice
}
