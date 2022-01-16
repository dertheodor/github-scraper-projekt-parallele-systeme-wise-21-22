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

const fs = require('fs')
const openMPDirectives = require('../variables/openMPDirectives');
const shell = require('shelljs');

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
                // Check Directives C/C++
                if (jsonContent[languages[i]][j][openMPDirectivesC[h]]) {
                    if (typeof evaluatedTopic[openMPDirectivesAll[h]] === 'undefined') {
                        evaluatedTopic[openMPDirectivesAll[h]] = 0;
                    }
                    evaluatedTopic[openMPDirectivesAll[h]] += jsonContent[languages[i]][j][openMPDirectivesC[h]];
                }
                // Check Directives Fortran
                if (jsonContent[languages[i]][j][openMPDirectivesFortran[h]]) {
                    if (typeof evaluatedTopic[openMPDirectivesAll[h]] === 'undefined') {
                        evaluatedTopic[openMPDirectivesAll[h]] = 0;
                    }
                    evaluatedTopic[openMPDirectivesAll[h]] += jsonContent[languages[i]][j][openMPDirectivesFortran[h]];
                }
            }
        }
    }


    // write evaluated contents to new json
    fs.writeFile(`./results/evaluated-topic-results/${science}/evaluated-${jsonFileName}`, JSON.stringify(evaluatedTopic), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The data has been successfully evaluated.`);
    });
}


var sciences = shell.ls('C:\\Users\\Theo\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\results\\base-results');


for (let i = 0; i < sciences.length; i++) {
    if (typeof sciences[i] === "string") {
        var topics = shell.ls(`C:\\Users\\Theo\\IdeaProjects\\wise-21-22-projekt-parallele-systeme-verwendung-von-openmp-in-opensource-applikationen\\results\\base-results\\${sciences[i]}`);

        for (let j =0; j < topics.length; j++) {
            if (typeof topics[j] === "string") {
                evaluateTopic(sciences[i], topics[j]);
            }
        }
    }
}



//console.log(sciences.length)

//evaluateTopic('chemistry', 'chemistry');

