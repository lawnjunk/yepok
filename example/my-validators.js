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

var validators = {
  _: '*',
  file: fileExists,
  f: fileExists,
  num: isNumber,
  n: isNumber,
  verbose: true,
  v: true
};

module.exports = validators;
