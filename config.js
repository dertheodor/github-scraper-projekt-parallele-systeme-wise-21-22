/**
 * Topic URLs which will be scraped.
 * @type {string[]}
 */
const toBeScrapedTopicURLs = [
    'https://github.com/topics/biology',
    'https://github.com/topics/astrophysics',
    'https://github.com/topics/geography'
]

/**
 * Time in milliseconds which the scraper wait before navigation to a new URL.
 * @type {number}
 */
const antiAbuseDetectionTimeout = Math.random() * (1000 - 500) + 500;

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
const repositoryLatestCommitDate = "2018-01-01T00:00:00Z";

/**
 * Minimum commits count of a repository.
 * @type {number}
 */
const repositoryCommitsCount = 6;

/**
 * Minimum contributors count of a repository.
 * @type {number}
 */
const repositoryContributorsCount = 3;

module.exports = {
    toBeScrapedTopicURLs,
    antiAbuseDetectionTimeout,
    repositoryStarsCount,
    repositoryForksCount,
    repositoryLatestCommitDate,
    repositoryCommitsCount,
    repositoryContributorsCount
};
