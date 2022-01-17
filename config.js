/**
 * Topic URLs which will be scraped.
 * @type {string[]}
 */
const toBeScrapedTopicURLs = [
    'https://github.com/topics/astro',
    'https://github.com/topics/astrology',
    'https://github.com/topics/cosmology',
    'https://github.com/topics/biophysics',
    'https://github.com/topics/genetics',
    'https://github.com/topics/ecology',
    'https://github.com/topics/microbiology',
    'https://github.com/topics/geographical-information-system',
    'https://github.com/topics/geology',
    'https://github.com/topics/geoscience',
    'https://github.com/topics/geophysics',
    'https://github.com/topics/hydrology',
    'https://github.com/topics/meteorology',
    'https://github.com/topics/mathematical-modelling',
    'https://github.com/topics/mathematical-programming',
    'https://github.com/topics/mathematical-expressions',
    'https://github.com/topics/math',
    'https://github.com/topics/maths',
    'https://github.com/topics/math-library',
    'https://github.com/topics/geometry',
    'https://github.com/topics/stochastic',
    'https://github.com/topics/stochastic-processes',
    'https://github.com/topics/linear-algebra',
    'https://github.com/topics/algebra',
    'https://github.com/topics/topology',
    'https://github.com/topics/space'
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
