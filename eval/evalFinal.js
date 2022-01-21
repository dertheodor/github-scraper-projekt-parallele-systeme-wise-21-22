
//const resultsPath = 'C:\\Users\\theod\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\results'
const resultsPath = '/Users/janisru/intellij-workspace/wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen/results'

const fs = require('fs')
const openMPDirectives = require('../variables/openMPDirectives');
const shell = require('shelljs');
//initialize the evaluatedAllSciences object in which the details are saved in
var evaluatedAllSciences = {};

/**
 * Initializes the evaluating over all sciences into the final result and then saving the final result to a new final json file.
 */
function evaluateResults() {

    // CHANGE THEO: var evaluatedScienceResults = shell.ls(resultsPath + '\\evaluated-science-results');
    var evaluatedScienceResults = shell.ls(resultsPath + '/evaluated-science-results');

    // iterate over each science in the evaluated-science-results directory
    for (let i = 0; i < evaluatedScienceResults.length; i++) {

        if (typeof evaluatedScienceResults[i] === "string") {
            // CHANGE THEO: var evaluatedScienceFile = shell.ls(`${resultsPath}\\evaluated-science-results\\${evaluatedScienceResults[i]}`);
            var evaluatedScienceFile = shell.ls(`${resultsPath}/evaluated-science-results/${evaluatedScienceResults[i]}`);

            // evaluate each evaluated-science in the sciences directories of evaluated-science-results directory
            evaluateFinal(evaluatedScienceResults[i], evaluatedScienceFile);
        }
    }

    // write evaluatedAllSciences object contents to new json file
    fs.writeFile(`./results/final-results/final.json`, JSON.stringify(evaluatedAllSciences), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The Final Result has been successfully evaluated.`);
    });

    // clear the  evaluatedAllSciences object
    evaluatedAllSciences = {};
}

/**
 *Evaluate the final result with counting together each evaluated-science.
 *
 * @param science
 * @param jsonFileName
 */
function evaluateFinal(science, jsonFileName) {

    // get the content of a evaluated science
    var jsonContent = require(`../results/evaluated-science-results/${science}/${jsonFileName}`);

    // Count the content of the evaluated science into the evaluatedAllSciences object
    for (let [key, value] of Object.entries(jsonContent)) {

        if (!evaluatedAllSciences[key]) {
            evaluatedAllSciences[key] = 0;
        }
        evaluatedAllSciences[key] += value;
    }
}

// call the evaluation method
evaluateResults();
