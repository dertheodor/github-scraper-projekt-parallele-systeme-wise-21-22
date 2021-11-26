const codeScraper = require('./codeScraper');

const repositoryScraper = {
    async scrapeRepository(browser, url) {
        // new tab which opens
        let page = await browser.newPage();

        // Navigate to the selected page
        await page.goto(url);

        // list of allowed data types which we want to further inspect
        const allowedDataTypes = [
            '.sh'
        ]

        // Wait for the required DOM to be rendered
        await page.waitForSelector('div.repository-content');

        // do actual scraping if repository fulfills requirements
        if (await checkIfRepositoryIsRelevant() === true) {
            // TODO logic scraping until relevant code is reached -> call codeScraper() then

            let urlTypes = await getInnerURLRepositoriesType();

            let relevantURLs = await getRelevantURLs(urlTypes);
            console.log(relevantURLs)
        }

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

        async function getInnerURLRepositoriesType() {
            let innerRepositoryURLsType = await page.$$eval('.repository-content  .js-navigation-container [role="gridcell"] [aria-label]', (arialabels) => {
                let types = [];
                arialabels.forEach(arialabel => types.push(arialabel.attributes[0].value));
                return types;
            });
            return innerRepositoryURLsType;
        }


        async function getRelevantURLs(urlTypes) {
            var types = urlTypes;
            console.log(typeof types)

            // build list of repository contents
            let relevantInnerRepositoryURLsList = await page.$$eval('.repository-content  .js-navigation-container .Link--primary[href]', (primarylinks) => {
                let hrefs = [];

                // iterate over all links and check their relevance
                for (let i = 0; i < primarylinks.length; i++) {
                    // directories are directly added to the hrefs list
                    if (types[i] === 'Directory') {
                        hrefs.push(primarylinks[i].href);
                    }
                    // files are checked for relevance and added if relevant
                    if (types[i] === 'File') {
                        // TODO filter primarylinks[i].href file ending for relevance and push into hrefs array if relevant
                    }
                }
                return hrefs
            });
            return relevantInnerRepositoryURLsList;
        }


    }
}

module.exports = repositoryScraper;
