/**
 * Topic URLs which will be scraped.
 * @type {string[]}
 */
const toBeScrapedTopicURLs = [
    'https://github.com/topics/science'
]

/**
 * Time in milliseconds which the scraper wait before navigation to a new URL.
 * @type {number}
 */
const antiAbuseDetectionTimeout = 1000;

/**
 * Minimum stars count of a repository.
 * @type {number}
 */
const repositoryStarsCount = 0;

/**
 * Minimum forks count of a repository.
 * @type {number}
 */
const repositoryForksCount = 0;

/**
 * Minimum latest commit date of a repository.
 * e.g.: '2021-10-14T13:27:45Z'
 * @type {string}
 */
const repositoryLatestCommitDate = "0";

/**
 * Minimum commits count of a repository.
 * @type {number}
 */
const repositoryCommitsCount = 0;

/**
 * Minimum contributors count of a repository.
 * @type {number}
 */
const repositoryContributorsCount = 1;

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
