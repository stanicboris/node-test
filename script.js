"use strict";

var fs = require("fs");
var conf;
var input;
var temp;

// Reading input file & splitting attributes in an Array
input = fs.readFileSync(process.argv[3], "UTF-8").split('\n');
for (let i = 0; i < input.length; i++) {
    input[i] = input[i].match(/(?<=\").*?(?=\")/g);
    input[i].splice(1,1);
    input[i][0] = input[i][0].split('.');
}

// Reading conf file & parsing
conf = fs.readFileSync(process.argv[2]);
conf = JSON.parse(conf);

// virtual copy with ref
function returnObj(obj, param) {
    return obj[param];
}

// dirty loops
for (let i = 0; i < input.length; i++) {
    temp = returnObj(conf, input[i][0][0]);
    for (let j = 1; j < input[i][0].length; j++) {
        if (j == input[i][0].length-1) {
            temp[input[i][0][j]] = input[i][1];
        } else {
            temp = returnObj(temp, input[i][0][j]);
        }
    }
}

console.log(conf);

const confUp = JSON.stringify(conf);
fs.writeFileSync("conf-updated.json", confUp, "UTF-8");