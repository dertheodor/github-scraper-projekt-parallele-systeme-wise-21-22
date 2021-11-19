const scraperObject = {
    async scraper(browser, url) {
        // passed URL
        const currentURL = url;
        // new tab which opens
        let page = await browser.newPage();
        console.log(`Navigating to ${currentURL}...`);

        // Navigate to the selected page
        await page.goto(currentURL);

        // check if page is empty
        let pageHasNoRepositories = await page.$eval('.topic .color-fg-muted', (element) => {
            if (element.innerText.match("topic hasn't been used on any public repositories")) {
                return true;
            }
            return false;
        })
        if (pageHasNoRepositories) {
            return;
        }

        // press load more... button on the bottom of the page as long as its available
        // TODO retry pressing 'button.ajax-pagination-btn' until it can be found so all repos of a topic are on one site


        // build list of relevant repositories
        let repositoryList = await page.$$eval('#js-pjax-container div.col-md-8 > article > div.px-3 > div h3 > a.text-bold', (repositories) => {
            let hrefs = [];
            repositories.forEach(repository => hrefs.push(repository.href));
            return hrefs
        });

        console.log(repositoryList)
        /*
        let scrapedData = [];

        // Wait for the required DOM to be rendered
        async function scrapeCurrentPage() {
            await page.waitForSelector('.page_inner');
            // Get the link to all the required books
            let urls = await page.$$eval('section ol > li', links => {
                // Make sure the book to be scraped is in stock
                links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
                // Extract the links from the data
                links = links.map(el => el.querySelector('h3 > a').href)
                return links;
            });
            // Loop through each of those links, open a new page instance and get the relevant data from them
            let pagePromise = (link) => new Promise(async (resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);
                dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
                dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
                dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
                    // Strip new line and tab spaces
                    text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
                    // Get the number of stock available
                    let regexp = /^.*\((.*)\).*$/i;
                    let stockAvailable = regexp.exec(text)[1].split(' ')[0];
                    return stockAvailable;
                });
                dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
                dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
                dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
                resolve(dataObj);
                await newPage.close();
            });

            for (link in urls) {
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                // console.log(currentPageData);
            }
            // When all the data on this page is done, click the next button and start the scraping of the next page
            // You are going to check if this button exist first, so you know if there really is a next page.
            let nextButtonExist = false;
            try {
                const nextButton = await page.$eval('.next > a', a => a.textContent);
                nextButtonExist = true;
            } catch (err) {
                nextButtonExist = false;
            }
            if (nextButtonExist) {
                await page.click('.next > a');
                return scrapeCurrentPage(); // Call this function recursively
            }
            await page.close();
            return scrapedData;
        }

        let data = await scrapeCurrentPage();
        console.log(data);
        return data;
         */
    }
}

module.exports = scraperObject;
