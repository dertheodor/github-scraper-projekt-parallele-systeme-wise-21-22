const openMPDirectives = require('./variables/openMPDirectives');

const codeScraper = {
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

        // TODO logic
        let fileCode = await page.$eval('.blob-code-content .highlight.tab-size > tbody', (element) => {
            return element.innerText.replaceAll('\n', '').replaceAll('\t', '');
        })

        // iterate over all directives and search for them in fileCode
        for (let i = 0; i < openMPDirectives.length; i++) {
            // TODO
        }

        // return data to repositoryScraper
        return data;
    }
}

module.exports = codeScraper;
