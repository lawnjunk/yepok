var yepok = require('./yepok.js');

var path = require('path');
var fs = require('fs');

var ok = function(param, callback){
  callback();
};

var dashAll = function(param, callback){
  var abspath = path.resolve(param);
  fs.exists(abspath, function(exists){
    if (!exists) return callback('file does not exists: ' + param);
    callback();
  });
};

console.log('process.argv', process.argv);
console.log('process.argv.splice(2)', process.argv.splice(2));
yepok(process.argv.splice(2), {_: ok, b: '*', a: dashAll , all: dashAll}, function(err, minimist){
 
  if (err) {
    console.log('ERROR:');
    return console.error(err);
  }
  console.log('MINIMIST:');
  console.log(minimist);
});
