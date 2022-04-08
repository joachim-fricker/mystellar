var express = require('express');
var app = express();
const yargs = require('yargs');

const argv = yargs.option('directory', {
    alias: 'd',
    description: 'The directory where files should served- if not speified ~/mystellar will be used',
    type: 'string',
    default: "/Users/joachimfricker/mystellar",
    required: false
}).help()
    .alias('help', 'h')
    .argv;


console.log('webserver root is: ', argv.directory);
let start = argv.directory;


// data folder
app.use(express.static(start)); 

// app folder
app.use(express.static("./")); 
var server = app.listen(8080);