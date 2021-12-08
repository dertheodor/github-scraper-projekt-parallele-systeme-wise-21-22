const repositoryScraper = require('./repositoryScraper');

const scraperObject = {
    /**
     * Second top most level logic of the scraper.
     * Responsible for creating a list of relevant repositories which are then passed to the repositoryScraper.
     * @param browser
     * @param url
     * @returns {Promise<{}>}
     */
    async scrapeTopics(browser, url) {

        // data which will be passed back to pageController
        let data = {};

        // new tab which opens
        let page = await browser.newPage();
        console.log(`Navigating to ${url}...`);

        // Navigate to the selected page
        await page.goto(url);

        // Wait for the required DOM to be rendered
        await page.waitForSelector('#js-pjax-container');

        // check if page is empty
        let pageHasNoRepositories = await page.$eval('.topic .color-fg-muted', (element) => {
            if (element.innerText.match("topic hasn't been used on any public repositories")) {
                return true;
            }
            return false;
        })
        if (pageHasNoRepositories) {
            return data;
        }

        // press load more... button on the bottom of the page as long as its available
        // TODO retry pressing 'button.ajax-pagination-btn' until it can be found so all repos of a topic are on one site


        // build list of relevant repositories
        let repositoryList = [];
        repositoryList = await page.$$eval('#js-pjax-container div.col-md-8 > article > div.px-3 > div h3 > a.text-bold', (repositories) => {
            let hrefs = [];
            repositories.forEach(repository => hrefs.push(repository.href));
            return hrefs
        });

        // loop over all found repositories
        // TODO change loop length back to repositoryList.length
        for (let i = 0; i < 1; i++) {
            // TODO maybe use repo-1, repo-2 ... instead of hrefs for key name
            data[`${repositoryList[i]}`] = await repositoryScraper.scrapeRepository(browser, repositoryList[i]);
        }

        // return data to pageController
        return data;
    }
}

module.exports = scraperObject;
