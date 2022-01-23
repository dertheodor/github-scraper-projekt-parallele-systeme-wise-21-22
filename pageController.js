const config = require('./config');
const topicScraper = require('./topicScraper');
const fs = require('fs');
const { performance } = require('perf_hooks');

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

        // these category URLs will be scraped (respectively for ?l params of fortran, c and  c++)
        let toBeScrapedTopicURLs = config.toBeScrapedTopicURLs;

        // call the scraper for the URLs
        for (let i = 0; i < toBeScrapedTopicURLs.length; i++) {
            // the scrapedData object will be parsed to a JSON file
            let scrapedData = {};

            // startTime for calculating how long the scraper took for the topic
            var startTime = performance.now();

            // regex for getting the topic of the URL
            let topic = toBeScrapedTopicURLs[i].match(/\/topics\/(.*)/)[1];

            // scraper call for all three programming languages
            await topicScraper.scrapeTopics(browser, `${toBeScrapedTopicURLs[i]}?l=fortran`);
            await topicScraper.scrapeTopics(browser, `${toBeScrapedTopicURLs[i]}?l=c`);
            await topicScraper.scrapeTopics(browser, `${toBeScrapedTopicURLs[i]}?l=c%2B%2B`);
            // endTime after last language
            var endTime = performance.now()
            scrapedData['timeElapsedSeconds'] = (endTime - startTime) / 1000;
            await saveFile(scrapedData, topic);
        }

        /**
         * Saves each category to a JSON file with the category as its name.
         * @param data
         * @param topic
         */
        function saveFile(data, topic) {
            // write scraped content to JSON file
            fs.writeFile(`../results/base-results/${topic}.json`, JSON.stringify(data), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log(`The data has been scraped and saved successfully! View it at './${topic}.json`);
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
