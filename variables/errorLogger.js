const fs = require("fs");

/**
 * Logs the occurred error to a log file.
 * @param error
 * @param url
 */
function errorLogger(error, url) {
    let stringifiedError = String(error);

    if (stringifiedError.includes(url)) {
        fs.writeFile(`./logs/${new Date().getTime()}.log`, stringifiedError, 'utf8', () => {
            console.log(`Error logged`);
        });
    } else {
        fs.writeFile(`./logs/${new Date().getTime()}.log`, stringifiedError + ' at ' + url, 'utf8', () => {
            console.log(`Error logged`);
        });
    }
}

module.exports = errorLogger;
