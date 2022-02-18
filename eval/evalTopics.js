const resultsPath = 'C:\\Users\\theod\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\results'
// const resultsPath = '/Users/janisru/intellij-workspace/wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen/results'

const fs = require('fs')
const openMPDirectives = require('../variables/openMPDirectives');
const shell = require('shelljs');

/**
 * Initializes the evaluating of all topics.
 */
function evaluateResults() {

    var baseResults = shell.ls(resultsPath + '\\base-results');
    //CHANGE JANIS for Mac:  var baseResults = shell.ls(resultsPath + '/base-results');

    // Iterate over each Science in the base-results directory
    for (let i = 0; i < baseResults.length; i++) {
        if (typeof baseResults[i] === "string") {
            // CHANGE THEO: var topics = shell.ls(`${resultsPath}\\base-results\\${baseResults[i]}`);
            var topics = shell.ls(`${resultsPath}/base-results/${baseResults[i]}`);

            // Iterate over each topic in the sciences directories of base-results directory
            for (let j =0; j < topics.length; j++) {
                if (typeof topics[j] === "string") {
                    evaluateTopic(baseResults[i], topics[j]);
                }
            }
        }
    }
}

/**
 *Evaluate each topic and saving each topic to a new evaluated-topic json file.
 *
 * @param science the science, which the topic belongs to
 * @param jsonFileName the name of the topic
 */
function evaluateTopic(science, jsonFileName) {

    //initialize the object in which the details are saved in
    var evaluatedTopic = {};
    // get the web scraper output for that topic (base-result)
    var jsonContent = require(`../results/base-results/${science}/${jsonFileName}`);
    // the three languages for openMP directives
    var languages = ["fortran", "c", "c++"]


    // initializes the files and repositories entries for the counting
    var quantityOfFiles = 0;
    var quantityOfFilesWithOpenMP = 0;
    var quantityOfRepositories = 0;
    var quantityOfRelevantRepositories = 0;
    var quantityOfRelevantRepositoriesWithOpenMP = 0;

    //count the quantityOfFiles, quantityOfFilesWithOpenMP, quantityOfRepositories, quantityOfRelevantRepositories,
    //quantityOfRelevantRepositoriesWithOpenMP
    for (let i = 0; i < languages.length; i++) {
        for (let j = 0; j < jsonContent[languages[i]].length; j++) {
            // quantityOfFiles and quantityOfFilesWithOpenMP
            if (jsonContent[languages[i]][j]["quantityOfFiles"]) {
                quantityOfFiles += jsonContent[languages[i]][j]["quantityOfFiles"];
                quantityOfFilesWithOpenMP += jsonContent[languages[i]][j]["quantityOfFilesWithOpenMP"];
            }

            // quantityOfRepositories, quantityOfRelevantRepositories and quantityOfRelevantRepositoriesWithOpenMP
            if (jsonContent[languages[i]][j]["quantityOfRepositories"]) {
                quantityOfRepositories += jsonContent[languages[i]][j]["quantityOfRepositories"];
                quantityOfRelevantRepositories += jsonContent[languages[i]][j]["quantityOfRelevantRepositories"];
                quantityOfRelevantRepositoriesWithOpenMP += jsonContent[languages[i]][j]["quantityOfRelevantRepositoriesWithOpenMP"];
            }
        }
    }

    // Set the key+values in the object
    evaluatedTopic['quantityOfFiles'] = quantityOfFiles;
    evaluatedTopic['quantityOfFilesWithOpenMP'] = quantityOfFilesWithOpenMP;
    evaluatedTopic['quantityOfRepositories'] = quantityOfRepositories;
    evaluatedTopic['quantityOfRelevantRepositories'] = quantityOfRelevantRepositories;
    evaluatedTopic['quantityOfRelevantRepositoriesWithOpenMP'] = quantityOfRelevantRepositoriesWithOpenMP;

    // Get the Directives-Arrays
    var openMPDirectivesAll = openMPDirectives.openMPDirectivesAll;
    var openMPDirectivesC = openMPDirectives.openMPDirectivesCString;
    var openMPDirectivesFortran = openMPDirectives.openMPDirectivesFortranString;

    // Count the C/C++ and Fortran Directives
    for (let h = 0; h < openMPDirectivesAll.length; h++) {
        for (let i = 0; i < languages.length; i++) {
            for (let j = 0; j < jsonContent[languages[i]].length; j++) {
                // Check Directives Fortran
                if (languages[i] === 'fortran') {
                    if (jsonContent[languages[i]][j][openMPDirectivesFortran[h]]) {
                        if (typeof evaluatedTopic[openMPDirectivesAll[h]] === 'undefined') {
                            evaluatedTopic[openMPDirectivesAll[h]] = 0;
                        }
                        evaluatedTopic[openMPDirectivesAll[h]] += jsonContent[languages[i]][j][openMPDirectivesFortran[h]];
                    }
                }
                // Check Directives C/C++
                if (languages[i] === 'c' ||  languages[i] === 'c++') {
                    if (jsonContent[languages[i]][j][openMPDirectivesC[h]]) {
                        if (typeof evaluatedTopic[openMPDirectivesAll[h]] === 'undefined') {
                            evaluatedTopic[openMPDirectivesAll[h]] = 0;
                        }
                        evaluatedTopic[openMPDirectivesAll[h]] += jsonContent[languages[i]][j][openMPDirectivesC[h]];
                    }
                }

            }
        }
    }

    // write evaluated topic contents to new json file
    fs.writeFile(`./results/evaluated-topic-results/${science}/evaluated-topic-${jsonFileName}`, JSON.stringify(evaluatedTopic), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The topics has been successfully evaluated.`);
    });
}

// call the evaluation method
evaluateResults();
