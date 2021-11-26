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

        // Navigate to the selected page
        await page.goto(url);

        // Wait for the required DOM to be rendered
        await page.waitForSelector('div.repository-content');

        // do actual scraping if repository fulfills requirements
        if (await checkIfRepositoryIsRelevant() === true) {
            // TODO logic scraping until relevant code is reached -> call codeScraper() then
            let urlTypes = await getInnerURLRepositoriesType();
            let urlHrefs = await getInnerURLRepositoriesHrefs();
            let relevantURLs = await getRelevantURLs(urlTypes, urlHrefs);

            await scrapeRepositorySubPage();
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
            let filteredHrefs = [];

            let types = urlTypes;
            let hrefs = urlHrefs;

            if (types.length === hrefs.length) {
                // iterate over all links and check their relevance
                for (let i = 0; i < types.length; i++) {
                    // directories are directly added to the hrefs list
                    if (types[i] === 'Directory') {
                        filteredHrefs.push(hrefs[i]);
                    }
                    // files are checked for relevance and added if relevant
                    if (types[i] === 'File') {
                        // iterate over allowedDataTypes array and check if file is relevant
                        for (let j = 0; j < allowedFileExtensions.length; j++) {
                            //TODO(evaluation needed if unnecessary code is checked through this decision) toLowerCase() href so less allowedFileExtensions need to be checked
                            if (hrefs[i].toLowerCase().indexOf(allowedFileExtensions[j]) > -1) {
                                filteredHrefs.push(hrefs[i]);
                            }
                        }
                    }
                }
            } else {
                throw new Error("repository-inner-hrefs-and-types-count-mismatch")
            }
            return filteredHrefs;
        }

        //TODO
        async function scrapeRepositorySubPage() {

        }

        // return data to topicScraper
        return data;
    }
}

module.exports = repositoryScraper;
