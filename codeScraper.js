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
        await page.waitForSelector('#repo-content-pjax-container');

        // TODO logic
        let repositoryCode = await page.$$eval('.blob-code-content .highlight tab-size js-file-line-container js-code-nav-container js-tagsearch-file > tbody > tr', (elements) => {
           console.log(elements);
            return elements.forEach();
        })

        // return data to repositoryScraper
        return data;
    }
}

module.exports = codeScraper;
