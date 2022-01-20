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
 * Initializes the counting of all topics.
 */
function evaluateFinalResult() {

    // eval Final Results
    //var evaluatedScienceResults = shell.ls(resultsPath + '\\evaluated-science-results');
    var evaluatedScienceResults = shell.ls(resultsPath + '/evaluated-science-results');

    for (let i = 0; i < evaluatedScienceResults.length; i++) {

        if (typeof evaluatedScienceResults[i] === "string") {

                evaluateFinal(evaluatedScienceResults[i]);
            }
    }
    console.log(`The Final Result has been successfully evaluated.`);

}

/**
 *
 * @param science
 * @param jsonFileName
 */
function evaluateFinal(science) {
    var jsonContent = require(`../results/evaluated-science-results/${science}/${science}`);

    for (let [key, value] of Object.entries(jsonContent)) {
        var evaluatedAllSciences = require(`../results/final-results/final`);

        if (!evaluatedAllSciences[key]) {
            evaluatedAllSciences[key] = 0;
        }
        evaluatedAllSciences[key] += value;

        fs.writeFile(`./results/final-results/final.json`, JSON.stringify(evaluatedAllSciences), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}



evaluateFinalResult();
