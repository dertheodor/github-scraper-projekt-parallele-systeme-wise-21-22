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
function evaluateResults() {
    // eval topics
    //var baseResults = shell.ls(resultsPath + '\\base-results');
    var baseResults = shell.ls(resultsPath + 'XXXX/base-results');

    for (let i = 0; i < baseResults.length; i++) {
        if (typeof baseResults[i] === "string") {
           // var topics = shell.ls(`${resultsPath}\\base-results\\${baseResults[i]}`);
           var topics = shell.ls(`${resultsPath}/base-results/${baseResults[i]}`);

            for (let j =0; j < topics.length; j++) {
                if (typeof topics[j] === "string") {
                    evaluateTopic(baseResults[i], topics[j]);
                }
            }
        }
    }


    // eval Sciences
    //var evaluatedTopicResults = shell.ls(resultsPath + '\\evaluated-topic-results');
    var evaluatedTopicResults = shell.ls(resultsPath + 'XXXX/evaluated-topic-results');

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

    // eval Final Results
    //var evaluatedScienceResults = shell.ls(resultsPath + '\\evaluated-science-results');
    var evaluatedScienceResults = shell.ls(resultsPath + '/evaluated-science-results');

    for (let i = 0; i < evaluatedScienceResults.length; i++) {

        if (typeof evaluatedScienceResults[i] === "string") {
            //    var evaluatedTopics = shell.ls(`${resultsPath}\\evaluated-science-results\\${evaluatedScienceResults[i]}`);
            var evaluatedScience = shell.ls(`${resultsPath}/evaluated-science-results/${evaluatedScienceResults[i]}`);

                evaluateFinal(evaluatedScienceResults[i], evaluatedScience);
            }
    }
    console.log(`The Final Result has been successfully evaluated.`);

}

/**
 *
 * @param science
 * @param jsonFileName
 */
function evaluateTopic(science, jsonFileName) {
    var evaluatedTopic = {};
    var jsonContent = require(`../results/base-results/${science}/${jsonFileName}`);
    var languages = ["fortran", "c", "c++"]


    // Count files and Repositories
    var quantityOfFiles = 0;
    var quantityOfFilesWithOpenMP = 0;
    var quantityOfRepositories = 0;
    var quantityOfRelevantRepositories = 0;
    var quantityOfRelevantRepositoriesWithOpenMP = 0;

    for (let i = 0; i < languages.length; i++) {
        for (let j = 0; j < jsonContent[languages[i]].length; j++) {
            // quantityOfFiles and quantityOfFilesWithOpenMP
            if (jsonContent[languages[i]][j]["quantityOfFilesWithOpenMP"]) {
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

    evaluatedTopic['quantityOfFiles'] = quantityOfFiles;
    evaluatedTopic['quantityOfFilesWithOpenMP'] = quantityOfFilesWithOpenMP;
    evaluatedTopic['quantityOfRepositories'] = quantityOfRepositories;
    evaluatedTopic['quantityOfRelevantRepositories'] = quantityOfRelevantRepositories;
    evaluatedTopic['quantityOfRelevantRepositoriesWithOpenMP'] = quantityOfRelevantRepositoriesWithOpenMP;

    // Count Directives
    var openMPDirectivesAll = openMPDirectives.openMPDirectivesAll;
    var openMPDirectivesC = openMPDirectives.openMPDirectivesCString;
    var openMPDirectivesFortran = openMPDirectives.openMPDirectivesFortranString;

    for (let h = 0; h < openMPDirectivesAll.length; h++) {
        for (let i = 0; i < languages.length; i++) {
            for (let j = 0; j < jsonContent[languages[i]].length; j++) {
                // Check Directives Fortran
                // Zusätzliche if abfrage für sprache
                if (languages[i] === 'fortran') {
                    if (jsonContent[languages[i]][j][openMPDirectivesFortran[h]]) {
                        if (typeof evaluatedTopic[openMPDirectivesAll[h]] === 'undefined') {
                            evaluatedTopic[openMPDirectivesAll[h]] = 0;
                        }
                        evaluatedTopic[openMPDirectivesAll[h]] += jsonContent[languages[i]][j][openMPDirectivesFortran[h]];
                    }
                }
                // Check Directives C/C++
                // Object.keys(jsonContent[languages[i]][j]).includes(openMPDirectivesAll[h])-> Regex in klammern
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


    // write evaluated contents to new json
    fs.writeFile(`./results/evaluated-topic-results/${science}/evaluated-${jsonFileName}`, JSON.stringify(evaluatedTopic), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The topics has been successfully evaluated.`);
    });
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
 * @param jsonFileName
 */
function evaluateFinal(science, jsonFileName) {
    var jsonContent = require(`../results/evaluated-science-results/${science}/${jsonFileName}`);

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

function saveFile(science, data) {
    // write evaluated contents to new json
    fs.writeFile(`./results/evaluated-science-results/${science}/${science}.json`, JSON.stringify(data), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The science has been successfully evaluated.`);
    });
}

evaluateResults();
