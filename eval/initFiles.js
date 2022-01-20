/*
// 1. Zusammenrechnen für jede Topic pro Sprache(Fortran, C, C++):
 // Beispiel für C mit einem Objekt im Array wo alles drin steht (keine Ahnung was besser ist)
{
  "c": [
    {
      "#pragma omp parallel": X,
      "#pragma omp for ": X,
      "#pragma omp parallel for": X,
      "quantityOfFiles": X,
      "quantityOfFilesWithOpenMP": X
      "quantityOfRepositories": X,
      "quantityOfRelevantRepositories": X,
      "quantityOfRelevantRepositoriesWithOpenMP": X
    }
  ]
}

//2. Zusammenrechnen für jede Wissenschaft(besteht aus mehreren Topics) pro Sprache
// Dateiname z.B.: chemistryLanguageAggregation.json
// Gleicher Inhalt wie oben, auch aufgeteilt auf die drei Sprachen


//3. Zusammenrechnen für jede Wissenschaft
// Dateiname z.B.: chemistryAggregation.json
// Gleicher Inhalt wie oben, nun aber nicht mehr aufgeteilt auf Sprachen, sondern über alle Sprachen hinweg zusammengerechnet
 */
//const resultsPath = 'C:\\Users\\theod\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\results'
const resultsPath = '/Users/janisru/intellij-workspace/wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen/results'

const fs = require('fs')
const openMPDirectives = require('../variables/openMPDirectives');
const shell = require('shelljs');

/**
 *
 */
function initFiles() {

    var evaluatedTopicResults = shell.ls(resultsPath + '/evaluated-topic-results');
    var data = {};

    for (let i = 0; i < evaluatedTopicResults.length; i++) {

        fs.writeFile(`./results/evaluated-science-results/${evaluatedTopicResults[i]}/${evaluatedTopicResults[i]}.json`, JSON.stringify(data), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`The science files has been successfully initialized.`);
        });

    }
/**
    fs.writeFile(`./results/final-results/final.json`, JSON.stringify(data), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The final file has been successfully initialized.`);
    });
*/
}


initFiles();




