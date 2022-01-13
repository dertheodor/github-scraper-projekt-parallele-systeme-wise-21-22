const config = require('./config');
const repositoryScraper = require('./repositoryScraper');
const errorLogger = require("./variables/errorLogger");
const shell = require('shelljs')

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
        let data =[];

        // new tab which opens
        let page = await browser.newPage();
        console.log(`Navigating to ${url}...`);

        // Wait
        await page.waitForTimeout(config.antiAbuseDetectionTimeout);

        try {
            // Navigate to the selected page
            await page.goto(url, {timeout:0, waitUntil: 'domcontentloaded'});
        } catch (error) {
            // write error to logs folder
            errorLogger(error, url);
            return data;
        }

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
            // close tab
            await page.close();
            return data;
        }

        // press load more... button on the bottom of the page as long as it's available
        await retryButtonPress();

        // build list of relevant repositories
        let repositoryList = [];
        repositoryList = await page.$$eval('#js-pjax-container div.col-md-8 > article > div.px-3 > div h3 > a.text-bold', (repositories) => {
            let hrefs = [];
            repositories.forEach(repository => hrefs.push(repository.href));
            return hrefs
        });

        // close tab
        await page.close();

        // TODO different logic for git cloning all repos and the searching with grep locally
        const path  = 'C:\\Users\\Theo\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\test';
        shell.cd(path);
        // loop over all found repositories
        // TODO change back to repositoryList.length
        for (let i = 0; i < 1; i++) {

            shell.exec(`git clone https://github.com/nwchemgit/nwchem`);
            //shell.chmod('744', 'C:\\Users\\Theo\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\test\\atomsk');
            //shell.grep('!$omp critical', 'C:\\Users\\Theo\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\test\\atomsk')
            //data.push(await repositoryScraper.scrapeRepository(browser, repositoryList[i]));
        }

        /**
         * Retries pressing the Load more... button until it's not available anymore.
         * @returns {Promise<void>}
         */
        async function retryButtonPress() {
            if ((await page.$('button.ajax-pagination-btn')) !== null) {
                await page.$eval('button.ajax-pagination-btn', button => button.click());
                // TODO potentially use waitForResponse as we can detect when a request is finished instead of 10sec rule
                await page.waitForTimeout(10000);
                await retryButtonPress();
            } else {
                return;
            }
        }

        let metrics = {}

        // memorize overall count of repositories per language
        metrics['quantityOfRepositories'] = repositoryList.length;

        // memorize overall count of relevant repos
        metrics['quantityOfRelevantRepositories'] = 0;

        // memorize overall count of repositories per language containing OpenMP directives
        metrics['quantityOfRelevantRepositoriesWithOpenMP'] = 0;

        for (let i = 0; i < data.length; i++) {
            if (Object.keys(data[i]).length >= 3) {
                metrics['quantityOfRelevantRepositories'] ++;
            }
        }

        for (let i = 0; i < data.length; i++) {
            if (Object.keys(data[i]).length >= 4) {
                metrics['quantityOfRelevantRepositoriesWithOpenMP'] ++;
            }
        }

        // add metrics to language array as object at the end
        data.push(metrics);

        // return data to pageController
        return data;
    }
}

module.exports = scraperObject;
