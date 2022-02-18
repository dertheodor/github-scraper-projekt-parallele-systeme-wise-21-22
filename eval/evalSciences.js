const resultsPath = 'C:\\Users\\theod\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\results'
// const resultsPath = '/Users/janisru/intellij-workspace/wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen/results'

const fs = require('fs')
const openMPDirectives = require('../variables/openMPDirectives');
const shell = require('shelljs');

//initialize the evaluatedScience object in which the details are saved in
var evaluatedScience = {};

/**
 * Initializes the evaluating of all Sciences and then saving each science to a new evaluated-science json file.
 */
function evaluateResults() {

    var evaluatedTopicResults = shell.ls(resultsPath + '\\evaluated-topic-results');
    // CHANGE JANIS for Mac: var evaluatedTopicResults = shell.ls(resultsPath + '/evaluated-topic-results');

    // iterate over each science in the evaluated-topics-results directory
    for (let i = 0; i < evaluatedTopicResults.length; i++) {

        if (typeof evaluatedTopicResults[i] === "string") {
            // CHANGE THEO: var evaluatedTopics = shell.ls(`${resultsPath}\\evaluated-topic-results\\${evaluatedTopicResults[i]}`);
            var evaluatedTopics = shell.ls(`${resultsPath}/evaluated-topic-results/${evaluatedTopicResults[i]}`);

            // iterate over each evaluated-topic in the sciences directories of evaluated-topic-results directory
            for (let j =0; j < evaluatedTopics.length; j++) {
                if (typeof evaluatedTopics[j] === "string") {
                    evaluateScience(evaluatedTopicResults[i], evaluatedTopics[j]);
                }
            }
        }

        // write evaluatedScience object contents to new json file
        fs.writeFile(`./results/evaluated-science-results/${evaluatedTopicResults[i]}/evaluated-science-${evaluatedTopicResults[i]}.json`,
            JSON.stringify(evaluatedScience), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`The science has been successfully evaluated.`);
        });

        // clear the  evaluatedScience object
        evaluatedScience = {};
    }
}

/**
 * Evaluate each science with counting together each evaluated-topic.
 *
 * @param science
 * @param jsonFileName
 */
function evaluateScience(science, jsonFileName) {

    // get the content of a evaluated topic
    var jsonContent = require(`../results/evaluated-topic-results/${science}/${jsonFileName}`);

    // Count the content of the evaluated topic into the evaluatedScience object
    for (let [key, value] of Object.entries(jsonContent)) {

        if (!evaluatedScience[key]) {
            evaluatedScience[key] = 0;
        }
        evaluatedScience[key] += value;
    }
}

// call the evaluation method
evaluateResults();
