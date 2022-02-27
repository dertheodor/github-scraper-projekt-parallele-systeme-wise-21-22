# WiSe 21-22 Projekt Parallele Systeme - Verwendung von OpenMP in OpenSource Applikationen

In diesem Repository soll das Projekt entstehen welches uns die Ausführung des Surveys "Verwendung von OpenMP in OpenSource Applikationen (Github)", ermöglichen soll. 
Dieses findet im Rahmen des Bachelor Projektes Parallele Systeme der UHH statt.

## How-to Scrape

[Node.js](https://nodejs.org/) is required to run the Web Scraper.

Install the dependencies.

```sh
npm install
```

Configure the Scraper:
- Open the top level file config.js
| variable | purpose |
| ------ | ------ |
| toBeScrapedTopicURLs | topic URLs which will be scraped |
| antiAbuseDetectionTimeout | timeout used before every navigation (to prevent abuse detection) |
| repositoryStarsCount | minimum stars a repository needs to have to be classified as relevant |
| repositoryForksCount | minimum forks a repository needs to have to be classified as relevant |
| repositoryLatestCommitDate | latest commit date a repository needs to have to be classified as relevant |
| repositoryCommitsCount | minimum commits a repository needs to have to be classified as relevant |
| repositoryContributorsCount | minimum contributors a repository needs to have to be classified as relevant |

- Open the variables folder
| file | purpose |
| ------ | ------ |
| ```allowedFileExtensions.js``` | an array of regular expressions, only files matching the regexes are scraped |
| ```openMPDirectives.js``` | an array strings/regular expressions, the regular expressions are used as search terms inside of the code which is scraped, the strings are are used for evaluation |

Start the Scraper.

```sh
npm run scrape
```

The base results will be saved in the repository subfolder "base-results".

## How-to Evaluate

- Inside of every file in the eval folder, the path used in the beginning of the files needs to be edited, this depends on your username and the system your are using 

| command | purpose |
| ------ | ------ |
| ```npm run evaltopics``` | evaluate the topics |
| ```npm run evalsciences``` | evaluate the sciences |
| ```npm run evalfinal``` | evaluate the final results |