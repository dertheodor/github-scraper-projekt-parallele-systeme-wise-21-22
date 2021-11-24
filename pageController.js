const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        // the scrapedData object will be parsed to a JSON file
        let scrapedData = {};

        // these category URLs will be scraped (respectively for ?l params of fortran, c and  c++)
        let toBeScrapedURLs = [
            'https://github.com/topics/science'
        ];

        // call the scraper for the URLs
        for (let i = 0; i < toBeScrapedURLs.length; i++) {
            // regex for getting the topic of the URL
            let category = toBeScrapedURLs[i].match(/\/topics\/(.*)/)[1];

            // scraper call for all three programming languages
            const fortranArray = await pageScraper.scrape(browser, `${toBeScrapedURLs[i]}?l=fortran`);
            //TODO comment in const cArray = await pageScraper.scrape(browser, `${toBeScrapedURLs[i]}?l=c`);
            //TODO comment in const cPlusPlusArray = await pageScraper.scrape(browser, `${toBeScrapedURLs[i]}?l=c%2B%2B`);

            if (typeof fortranArray != "undefined" && typeof cArray != "undefined" && typeof cPlusPlusArray!= "undefined") {
                // concat all arrays
                scrapedData[`${category}`] = fortranArray.concat(cArray, cPlusPlusArray)
            }
        }

        // close browser
        await browser.close();

        // write scraped content to JSON file
        fs.writeFile("data.json", JSON.stringify(scrapedData), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The data has been scraped and saved successfully! View it at './data.json'");
        });
    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = {
    scrapeAll
}
