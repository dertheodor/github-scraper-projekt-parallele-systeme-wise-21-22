/**
 * Topic URLs which will be scraped.
 * @type {string[]}
 */
const toBeScrapedTopicURLs = [
    'https://github.com/topics/chemistry'
]

/**
 * Time in milliseconds which the scraper wait before navigation to a new URL.
 * @type {number}
 */
const antiAbuseDetectionTimeout = 1000;
// TODO maybe change to less than 1000 as with 1000 we are not getting blocked anymore even after hours of scraping
// TODO perhaps use Math.random() * (1000 - 500) + 500; //random number between 500 and 1000 milliseconds
// TODO if we keep getting blocked build a method which checks for selectors only available on the error pages and build retry logic

/**
 * Minimum stars count of a repository.
 * @type {number}
 */
const repositoryStarsCount = 20;

/**
 * Minimum forks count of a repository.
 * @type {number}
 */
const repositoryForksCount = 1;

/**
 * Minimum latest commit date of a repository.
 * e.g.: '2021-10-14T13:27:45Z'
 * @type {string}
 */
const repositoryLatestCommitDate = "2021-01-01T00:00:00Z";

/**
 * Minimum commits count of a repository.
 * @type {number}
 */
const repositoryCommitsCount = 10;

/**
 * Minimum contributors count of a repository.
 * @type {number}
 */
const repositoryContributorsCount = 2;

// TODO add count of files checked, count together on different levels

module.exports = {
    toBeScrapedTopicURLs,
    antiAbuseDetectionTimeout,
    repositoryStarsCount,
    repositoryForksCount,
    repositoryLatestCommitDate,
    repositoryCommitsCount,
    repositoryContributorsCount
};
