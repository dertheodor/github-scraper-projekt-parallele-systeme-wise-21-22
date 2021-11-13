const browserObject = require('./browser');
const pageControllerObject = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
pageControllerObject.scrapeAll(browserInstance)
