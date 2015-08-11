var yepok = require('./yepok.js');

var path = require('path');
var fs = require('fs');

var ok = function(param, callback){
  callback();
}

var dashAll = function(param, callback){
  console.log("hit dashAll");
  console.log('param in dashall', param);

  var abspath = path.resolve(param);
  console.log('abspath', abspath);
  fs.exists(abspath, function(exists){
    if (!exists) return callback('file does not exists');
    callback();
    console.log('soup slug');
  });
} 

yepok(process.argv.splice(2), {_: ok, a: dashAll , all: dashAll}, function(err, minimist){
 
  if (err) {
    console.log('return the err');
    console.error(err)
  }
  console.log('return the minimist');
  console.log(minimist);
});
