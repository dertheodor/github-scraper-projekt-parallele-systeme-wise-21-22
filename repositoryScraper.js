const config = require('./config');
const codeScraper = require('./codeScraper');
const allowedFileExtensions = require('./variables/allowedFileExtensions');
const openMPDirectives = require('./variables/openMPDirectives');

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

        // data which will be passed back to topicScraper
        let data = {};

        // fileData which will be further processed before saving it to data
        let fileData = {};

        // new tab which opens
        let page = await browser.newPage();

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

            // beautify directives
            await buildBeautifiedData();
        }
        // return if checkIfRepositoryIsRelevant is false
        else {
            // close tab
            await page.close();
            return data;
        }

        /**
         * Triggers a navigation for the next deeper level of a repository.
         * @param url
         * @returns {Promise<void>}
         */
        async function navigate(url) {
            // Wait
            await page.waitForTimeout(config.antiAbuseDetectionTimeout);

            // Navigate to the selected page
            await page.goto(url);

            // Wait for the required DOM to be rendered
            await page.waitForSelector('div.application-main');
        }

        /**
         * Checks if a given repository is relevant by filtering it out based on predefined criteria such as:
         * stars-count, forks-count, latest-commit-date, commits-count, contributors-count.
         * These thresholds can be edited inside of the function.
         * @returns {Promise<boolean>}
         */
        async function checkIfRepositoryIsRelevant() {
            // Wait as sometimes not all the needed information is inside the HTML
            await page.waitForTimeout(config.antiAbuseDetectionTimeout);

            let repositoryStarsCount = await page.$eval('#repo-stars-counter-star', (element) => {
                return Number(element.attributes["aria-label"].value.match(/\d+/)[0]);
            })

            let repositoryForksCount = await page.$eval('#repo-network-counter', (elements) => {
                return Number(elements.attributes["title"].value.replace(',', ''));
            })

            let repositoryLatestCommitDate = await page.$eval('.Layout-main relative-time[datetime]', (element) => {
                return element.attributes.datetime.value;
            })

            let repositoryCommitsCount = await page.$eval('.repository-content .Box-header .ml-0.ml-md-3 span > strong', (element) => {
                return Number(element.innerText.replace(',', ''));
            })

            let repositoryContributorsCount = await page.$$eval('.repository-content .h4.mb-3 > a', (elements) => {
                for (let i = 0; i < elements.length; i++) {
                    // check for correct element
                    if (elements[i].href.indexOf('contributors') > -1) {
                        return Number(elements[i].children[0].attributes["title"].value.replace(',', ''));
                    }
                }
            })

            if (repositoryStarsCount >= config.repositoryStarsCount &&
                repositoryForksCount >= config.repositoryForksCount &&
                repositoryLatestCommitDate >= config.repositoryLatestCommitDate &&
                repositoryCommitsCount >= config.repositoryCommitsCount &&
                repositoryContributorsCount >= config.repositoryContributorsCount) {
                // TODO add relevance related infos to data[]
                return true
            }
            return false;
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
         * Gets the type of the data inside the repository.
         * @returns {Promise<*>}
         */
        async function getInnerURLRepositoriesType() {
            return await page.$$eval('.repository-content  .js-navigation-container [role=gridcell] [aria-label]', (arialabels) => {
                let types = [];
                arialabels.forEach(arialabel => types.push(arialabel.attributes["aria-label"].value));
                return types;
            });
        }

        /**
         * Gets the hrefs of the data inside the repository.
         * @returns {Promise<*>}
         */
        async function getInnerURLRepositoriesHrefs() {
            // build list of repository contents
            return await page.$$eval('.repository-content  .js-navigation-container .js-navigation-item div[role=rowheader] > span a[href]', (primarylinks) => {
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
                            if (hrefs[i].substr(18).match(allowedFileExtensions[j])) {
                                relevantFileURLs.push(hrefs[i]);
                            }
                        }
                    }
                }
            } else {
                console.log("Error: unequal-length repo types and hrefs.")
                return;
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
            // close tab
            await page.close();
            // iterate over all relevant file URLs
            for (let i = 0; i < relevantFileURLs.length; i++) {
                fileData[`file-${i}`] = await codeScraper.scrapeCode(browser, relevantFileURLs[i]);
            }
        }

        /**
         *Check the Used File Language to count the Directives for that Language
         *
         * @returns {Promise<void>}
         */
        async function buildBeautifiedData() {
            let JSONContents = JSON.stringify(fileData);

            // fortran code
            if (JSONContents.match(/!\\\\\$omp/i)) {
                await countDirectives(openMPDirectives.openMPDirectivesFortran);
            }

            // c/c++ code
            if (JSONContents.match(/#pragma omp/i)) {
                await countDirectives(openMPDirectives.openMPDirectivesC);
            }
        }


        /**
         * Count the used Compiler Directives from different files in a Repository together
         *
         * @param languageDirectivesArray
         * @returns {Promise<void>}
         */
        async function countDirectives(languageDirectivesArray) {
            // iterate over all directives
            for (let i = 0; i < languageDirectivesArray.length; i++) {
                // iterate over every JSON entry (file)
                for (let j = 0; j < Object.keys(fileData).length; j++) {
                    if (fileData[`file-${j}`][languageDirectivesArray[i]]) {
                        // number has not been initialized yet
                        if (typeof data[languageDirectivesArray[i].source.replace('\\','')] === 'undefined') {
                            data[languageDirectivesArray[i].source.replace('\\','')] = 0;
                        }
                        data[languageDirectivesArray[i].source.replace('\\','')] += fileData[`file-${j}`][languageDirectivesArray[i]]
                    }
                }
            }
        }

        // return data to topicScraper
        return data;
    }
}

module.exports = repositoryScraper;
