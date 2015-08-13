var fs = require('fs')
var path = require('path');

var fileExists = function(parameter, callback){
  var absolutePath = path.resolve(parameter);
  fs.exists(absolutePath, function(exists){
    if (exists) return callback();
    callback("file does not exits: " + parameter);
  });
}; 

var isNumber = function(parameter, callback){
  var num = Number(parameter);
  if (isNaN(num)) return callback('not a number: ' + parameter);
  callback();
};

var isLTEQ2Char = function(parameter, callback){
  if (parameter.length <= 2) return callback();
  callback("not less that or equal to two characters: " + parameter);
};

var validators = {
  _: '*',
  file: fileExists,
  f: fileExists,
  num: isNumber,
  n: isNumber,
  cool: [isLTEQ2Char, isNumber],
  c: [isLTEQ2Char, isNumber],
  verbose: true,
  v: true
};

module.exports = validators;
