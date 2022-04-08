/**
 * 
 * This programm scans the given folder and creates the catalog.json base on
 *    data.json wich lives in each folder
 *    and adds the picture section for all images found in that folder
 *   "pictures": [
        {
            "path": "",
            "date": ""
        }
    ]
 */

"use strict";
const yargs = require('yargs');
const fs = require('fs');
const { exec } = require("child_process");


const argv = yargs.option('directory', {
    alias: 'd',
    description: 'The directory to process - if not speified ~/mystellar will be used',
    type: 'string',
    default: "/Users/joachimfricker/mystellar",
    required: false
}).help()
    .alias('help', 'h')
    .argv;



let catalog = [];  // this holds our catalog which at the end will be written to disk as catalog.json


/**
 * build the catalog entry for the given directory
 * @param {} dir 
 * @param {} files 
 */
function procesDir(dir, files) {
    console.log("Folder:" + dir + " has content which will be processed");
    const jsonString = fs.readFileSync(dir + "/data.json", { encoding: 'utf8', flag: 'r' });
    const entry = JSON.parse(jsonString);
    const pictures = [];
    console.log("Name of the objectis:", entry.name);
    // now loop over the other files. If we find a directory we process it otherwise  we are only interested in the png
    files.forEach(function (file) {
        var fullPath = dir + "/" + file;
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else {
            if (file.endsWith("png")) {

                const stats = fs.statSync(fullPath);
                const birthDate = new Date(stats.birthtimeMs);
                console.log("we have a image file", fullPath, birthDate);
                const image = {};
                image.path = fullPath;
                image.date = birthDate;
                pictures.push(image);
            }

        }
        if (entry) {
//            console.log ("we have an entry and are pushing the picture",pictures);
            entry.pictures = pictures;
        }
    });
    catalog.push(entry);

}

/**
 * check if the directory contains data.json. If found process this folder.
 * Otherwise scan all sub folders
 * @param {*} dir 
 */
function scanDir(dir) {
    const files = fs.readdirSync(dir);
    // check whether we have data.json if so do we process this folde
    if (fs.existsSync(dir + "/data.json")) {
        procesDir(dir, files);
    } else {
        // process folders which might be there
        files.forEach(function (file) {
            var fullPath = dir + "/" + file;
            if (fs.statSync(fullPath).isDirectory()) {
                scanDir(fullPath);
            }
        });
    }
}

// --------------------------- start of the programm --------------------------

console.log('The folder is: ', argv.directory);
let start = argv.directory;

if (argv.files) {
    let file = argv.file;
}



// stat the directory
if (!fs.existsSync(start)) {
    console.log("## Grr we dont have access to the folder", start);
    process.exit(1);
}
// if we are we have valid file lets see whether it is directory
var stat = fs.statSync(start);
if (!stat.isDirectory()) {
    console.log("## Grr this is not a directory ", start);
}

scanDir(start)

/**
 * end of the programm
 */
//console.log("Our catalog is:", catalog)
let catalogJson = JSON.stringify(catalog);
fs.writeFileSync(start + "/catalog.json",catalogJson);


