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
function evaluateScienceResults() {

    // eval Sciences
    //var evaluatedTopicResults = shell.ls(resultsPath + '\\evaluated-topic-results');
    var evaluatedTopicResults = shell.ls(resultsPath + '/evaluated-topic-results');

    for (let i = 0; i < evaluatedTopicResults.length; i++) {

        if (typeof evaluatedTopicResults[i] === "string") {
        //    var evaluatedTopics = shell.ls(`${resultsPath}\\evaluated-topic-results\\${evaluatedTopicResults[i]}`);
            var evaluatedTopics = shell.ls(`${resultsPath}/evaluated-topic-results/${evaluatedTopicResults[i]}`);

            for (let j =0; j < evaluatedTopics.length; j++) {
                if (typeof evaluatedTopics[j] === "string") {
                  evaluateScience(evaluatedTopicResults[i], evaluatedTopics[j]);

                }
            }

        }
    }

}

/**
 *
 * @param science
 * @param jsonFileName
 */
function evaluateScience(science, jsonFileName) {
    var jsonContent = require(`../results/evaluated-topic-results/${science}/${jsonFileName}`);


    for (let [key, value] of Object.entries(jsonContent)) {
        var evaluatedScience = require(`../results/evaluated-science-results/${science}/${science}`);
         console.log(evaluatedScience);

        if (!evaluatedScience[key]) {
            evaluatedScience[key] = 0;
        }
        evaluatedScience[key] += value;
        saveFile(science, evaluatedScience);
    }


}

/**
 *
 * @param science
 * @param data
 */
function saveFile(science, data) {
    // write evaluated contents to new json
    fs.writeFile(`./results/evaluated-science-results/${science}/${science}.json`, JSON.stringify(data), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The science has been successfully evaluated.`);
    });
}


evaluateScienceResults();
