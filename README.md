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

yepok(process.argv(slice(2), validators, function(err, minimist){
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
  var absolutePath = resoleve(parameter);
  fs.exists(absolutePath, function(exists){
    if (exists) return callback();
    callback("file does not exits: " + paramiter);
  });
}; 

var isNumber = function(parameter, callback){
  var num = Number(parameter);
  if (isNaN(num) return callback('not a number: ' + parameter');
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
```  
  
**RUN IT**    
``` sh
$ node program.js anythin goes -f ./my-validators.js --num 100 -v
MINIMIST:
{ _: [ 'anythin', 'goes' ],
  f: './my-validators.js',
  num: 100,
  v: true }
```

**BREAK IT**  
``` sh
$ node program.js anythin goes --file /etc/lulwat.unicorn -n eight -n meow -v 'bad news bears'
ERROR:
{  f: ['file does not exist: /etc/lulwat.unicorn'],
  num: ['not a number: eight', 'not a number: meow'],
  v: ['flag must not be followed by any parameters: bad news bears'] }
```
