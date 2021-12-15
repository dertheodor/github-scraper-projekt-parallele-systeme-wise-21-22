const openMPDirectives = require('./variables/openMPDirectives');

const codeScraper = {
    /**
     * Scrapes the code of a single file and returns openMP directive matches.
     * @param browser
     * @param url
     * @returns {Promise<{}>}
     */
    async scrapeCode(browser, url) {

        // data which will be passed back to pageController
        let data = {};

        // new tab which opens
        let page = await browser.newPage();
        console.log(`Navigating to ${url}...`);

        // Navigate to the selected page
        await page.goto(url);

        // Wait for the required DOM to be rendered
        await page.waitForSelector('.Box-body[itemprop="text"]');

        if ((await page.$('.blob-code-content .highlight.tab-size > tbody')) !== null) {
            var fileCode = await page.$eval('.blob-code-content .highlight.tab-size > tbody', (element) => {
                return element.innerText.replaceAll('\n', '').replaceAll('\t', '');
            })
        }

        if (fileCode) {
            // fortran code
            if (fileCode.match(/!\$omp/i)) {
                await analyzeCode(openMPDirectives.openMPDirectivesFortran)
            }

            // c/c++ code
            if (fileCode.match(/#pragma omp/i)) {
                await analyzeCode(openMPDirectives.openMPDirectivesC)
            }
        }
        // if there is no code return
        else {
            return data;
        }

        /**
         * Analyses the code and memorizes the found directives and its occurrences.
         * @param languageDirectivesArray
         * @returns {Promise<void>}
         */
        async function analyzeCode(languageDirectivesArray) {
            // iterate over all directives and search for them in fileCode
            for (let i = 0; i < languageDirectivesArray.length; i++) {
                if (fileCode.match(languageDirectivesArray[i])) {
                    data[languageDirectivesArray[i]] = fileCode.match(languageDirectivesArray[i]).length;
                }
            }
        }

        // close tab
        await page.close();

        // return data to repositoryScraper
        return data;
    }
}

module.exports = codeScraper;
