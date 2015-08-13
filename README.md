yep ok
======
[![Build Status](https://travis-ci.org/slugbyte/yepok.svg?branch=master)](https://travis-ci.org/slugbyte/yepok)  

![alt tag](https://raw.githubusercontent.com/slugbyte/yepok/master/yepok.gif)  
a command line argument validation helper

* parse args with minimist
* validate args
 * success -> return minimist
 * failure -> return '{arg-name: [err0, err1], arg-name: ...}'

----
#### example

```
var fs = require('fs');
var path = require('path');

var yepok = require('yepok');

var dashA = function(param, callback){
  var abspath = path.resolve(param);
  fs.exists(abspath, function(err, data){
    if (err) return callback('file: [' + param + '] does not exist');
    callback();
  });
};

var dashJS = functino(param, callback){
  if (/*.js/.test(param){
    callback()
  }
  callback('paramiter did not end in .js');
  
};

var validators = {
  a: dashA,
  add: dashA,
  js: dashJS
};

yepok(process.argv.slice(2), validators, function(err, minimist){
  if (err) return console.log(err);
  console.log("HURRAY!!!!!");
  console.log(minimist);
});
```
