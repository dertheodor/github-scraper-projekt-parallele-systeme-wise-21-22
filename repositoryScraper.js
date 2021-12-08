const codeScraper = require('./codeScraper');
const allowedFileExtensions = require('./variables/allowedFileExtensions');

const repositoryScraper = {
    /**
     * Third top most level logic of the scraper.
     * Responsible for creating a list of only relevant files which will then be passed to the codeScraper for examining
     * the code.
     *
     * @param browser
     * @param url
     * @returns {Promise<{}>}
     */
    async scrapeRepository(browser, url) {
        // new tab which opens
        let page = await browser.newPage();

        // data which will be passed back to topicScraper
        let data = {};

        // navigate initially to repo
        await navigate(url);

        // Arrays used for folders and files lists
        var relevantDirectoryURLs = [];
        var relevantFileURLs = [];

        // do actual scraping if repository fulfills requirements
        if (await checkIfRepositoryIsRelevant() === true) {
            await filterRepoURLs();

            if (relevantDirectoryURLs[0]) {
                // go level deeper and open next directory
                await scrapeRepositorySubPage();
            }

            // call codeScraper
            await callCodeScraper();
        }
        // return if checkIfRepositoryIsRelevant is false
        else {
            return data;
        }

        /**
         * Called when a level of a repo is checked to filter out folders and relevant files.
         * @returns {Promise<void>}
         */
        async function filterRepoURLs() {
            let urlTypes = await getInnerURLRepositoriesType();
            let urlHrefs = await getInnerURLRepositoriesHrefs();
            await getRelevantURLs(urlTypes, urlHrefs);
        }

        /**
         * Triggers a navigation for the next deeper level of a repository.
         * @param url
         * @returns {Promise<void>}
         */
        async function navigate(url) {
            // Navigate to the selected page
            await page.goto(url);

            // Wait for the required DOM to be rendered
            await page.waitForSelector('div.repository-content');
        }

        /**
         * Checks if a given repository is relevant by filtering it out based on predefined criteria such as:
         * stars-count, forks-count, latest-commit-date, commits-count, contributors-count.
         * These thresholds can be edited inside of the function.
         * @returns {Promise<boolean>}
         */
        async function checkIfRepositoryIsRelevant() {
            let repositoryStarsCount = await page.$$eval('.social-count', (elements) => {
                return Number(elements[0].innerText);
            })

            let repositoryForksCount = await page.$$eval('.social-count', (elements) => {
                return Number(elements[1].innerText);
            })

            let repositoryLatestCommitDate = await page.$eval('relative-time[datetime]', (element) => {
                return element.attributes.datetime.value;
            })

            let repositoryCommitsCount = await page.$eval('.repository-content .Box-header .ml-0.ml-md-3 span > strong', (element) => {
                return Number(element.innerText)
            })

            let repositoryContributorsCount = await page.$$eval('.repository-content .h4.mb-3 > a', (elements) => {
                for (let i = 0; i < elements.length; i++) {
                    // check for correct element
                    if (elements[i].href.indexOf('contributors') > -1) {
                        return Number(elements[i].children[0].innerText);
                    }
                }
            })

            // TODO modify here to filter irrelevant repositories
            if (repositoryStarsCount > 0 && repositoryForksCount > 0 && repositoryLatestCommitDate > "0"
                && repositoryCommitsCount > 0 && repositoryContributorsCount > 0) {
                return true
            }
            return false;
        }

        /**
         * Gets the type of the data inside the repository.
         * @returns {Promise<*>}
         */
        async function getInnerURLRepositoriesType() {
            return await page.$$eval('.repository-content  .js-navigation-container [role="gridcell"] [aria-label]', (arialabels) => {
                let types = [];
                arialabels.forEach(arialabel => types.push(arialabel.attributes[0].value));
                return types;
            });
        }

        /**
         * Gets the hrefs of the data inside the repository.
         * @returns {Promise<*>}
         */
        async function getInnerURLRepositoriesHrefs() {
            // build list of repository contents
            return await page.$$eval('.repository-content  .js-navigation-container .Link--primary[href]', (primarylinks) => {
                let hrefs = [];
                primarylinks.forEach(primarylink => hrefs.push(primarylink.href));
                return hrefs;
            });
        }

        /**
         * Determines based on the hrefs and types from a repository which hrefs are relevant for further processing.
         * @param urlTypes
         * @param urlHrefs
         * @returns {Promise<*[]>}
         */
        async function getRelevantURLs(urlTypes, urlHrefs) {
            let types = urlTypes;
            let hrefs = urlHrefs;

            if (types.length === hrefs.length) {
                // iterate over all links and check their relevance
                for (let i = 0; i < types.length; i++) {
                    // directories are directly added to the hrefs list
                    if (types[i] === 'Directory') {
                        relevantDirectoryURLs.push(hrefs[i]);
                    }
                    // files are checked for relevance and added if relevant
                    if (types[i] === 'File') {
                        // iterate over allowedDataTypes array and check if file is relevant
                        for (let j = 0; j < allowedFileExtensions.length; j++) {
                            //TODO(evaluation needed if unnecessary code is checked through this decision) toLowerCase() href so less allowedFileExtensions need to be checked
                            if (hrefs[i].substr(18).toLowerCase().match(allowedFileExtensions[j])) {
                                relevantFileURLs.push(hrefs[i]);
                            }
                        }
                    }
                }
            } else {
                throw new Error("repository-inner-hrefs-and-types-count-mismatch")
            }
        }

        /**
         * Recursively scrapes all repository pages and adds relevant files to the globals lists.
         * Terminates when all folders have been checked.
         * @returns {Promise<void>}
         */
        async function scrapeRepositorySubPage() {
            let currentURL = relevantDirectoryURLs[0];

            // Navigate to subfolder
            await navigate(currentURL);

            await filterRepoURLs();

            // remove first URL (pop from stack)
            relevantDirectoryURLs.shift();

            // termination condition for recursive call
            if (!relevantDirectoryURLs[0]) {
                return;
            }

            // recursion
            await scrapeRepositorySubPage();
        }

        /**
         * Calls codeScraper with every relevant file to check its contents for directives.
         * @returns {Promise<void>}
         */
        async function callCodeScraper() {
            // iterate over all relevant file URLs
            // TODO change loop length back to repositoryList.length
            for (let i = 0; i < 1; i++) {
                data = await codeScraper.scrapeCode(browser, relevantFileURLs[i]);
            }
        }

        // return data to topicScraper
        return data;
    }
}

module.exports = repositoryScraper;
