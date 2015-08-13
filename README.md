yep ok
======
[![Build Status](https://travis-ci.org/slugbyte/yepok.svg?branch=master)](https://travis-ci.org/slugbyte/yepok)  

![alt tag](https://raw.githubusercontent.com/slugbyte/yepok/master/yepok.gif)  
a command line argument validation helper

* parse args with minimist
* validate args
 * success -> return [minimist](https://github.com/substack/minimist)
 * failure -> return '{arg-name: [err0, err1], arg-name: ...}'

----
# example

**program.js**    
``` js
var yepok = require('yepok');
var validators = require('./my-validators.js');

yepok(process.argv.slice(2), validators, function(err, minimist){
  if (err) {
    console.log("ERROR:")
    return console.log(err);
  }
  console.log("MINIMIST:");
  console.log(minimist)

});
```
  
**my-validators.js**  
``` js
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
```  
  
**RUN IT**    
``` sh
$ node program.js anythin goes -f ./my-validators.js --num 100 -c 42 -v
MINIMIST:
{ _: [ 'anythin', 'goes' ],
  f: './my-validators.js',
  num: 100,
  c: 42,
  v: true }
```

**BREAK IT**  
``` sh
$ node program.js anything --file /etc/lul.unicorn -c wat -n eight -n meow -v 'bad news bears'
ERROR:
{  file: ['file does not exist: /etc/lulwat.unicorn'],
  n: ['not a number: eight', 'not a number: meow'],
  c: ['not less than or equal to two characters: wat', 'not a number: wat'],
  v: ['flag must not be followed by any parameters: bad news bears'] }
```  

# install 
with [npm](https://npmjs.org) do:  
``` sh 
npm install yepok 
```  

# license
MIT  
