const config = require('./config');
const topicScraper = require('./topicScraper');
const fs = require('fs');

/**
 * Top most level logic of scraper.
 * Responsible for initiating the scraping of the different topics.
 * @param browserInstance
 * @returns {Promise<void>}
 */
async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        // the scrapedData object will be parsed to a JSON file
        let scrapedData = {};

        // these category URLs will be scraped (respectively for ?l params of fortran, c and  c++)
        let toBeScrapedTopicURLs = config.toBeScrapedTopicURLs;

        // call the scraper for the URLs
        for (let i = 0; i < toBeScrapedTopicURLs.length; i++) {
            // regex for getting the topic of the URL
            let category = toBeScrapedTopicURLs[i].match(/\/topics\/(.*)/)[1];

            // scraper call for all three programming languages
            scrapedData['fortran'] = await topicScraper.scrapeTopics(browser, `${toBeScrapedTopicURLs[i]}?l=fortran`);
            await saveFile(scrapedData, category);

            scrapedData['c'] = await topicScraper.scrapeTopics(browser, `${toBeScrapedTopicURLs[i]}?l=c`);
            await saveFile(scrapedData, category);

            scrapedData['c++'] = await topicScraper.scrapeTopics(browser, `${toBeScrapedTopicURLs[i]}?l=c%2B%2B`);
            await saveFile(scrapedData, category);

            scrapedData = {};
        }

        /**
         * Saves each category to a JSON file with the category as its name.
         * @param data
         * @param category
         */
        function saveFile(data, category) {
            // write scraped content to JSON file
            fs.writeFile(`./results/${category}.json`, JSON.stringify(data), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log(`The data has been scraped and saved successfully! View it at './${category}.json`);
            });
        }

        // close browser
        await browser.close();
    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = {
    scrapeAll
}
