var yepok = require('./yepok.js');

var path = require('path');
var fs = require('fs');

var ok = function(param, callback){
  callback();
}

var dashAll = function(param, callback){
  var abspath = path.resolve(param);
  fs.exists(abspath, function(exists){
    if (!exists) return callback('file does not exists');
    callback();
  });
} 

console.log('wtf');

yepok(process.argv.splice(2), {_: ok, b: '*', a: dashAll , all: dashAll}, function(err, minimist){
  console.log('wat');
 
  if (err) {
    console.log('ERROR:');
    return console.error(err)
  }
  console.log('MINIMIST:');
  console.log(minimist);
});
