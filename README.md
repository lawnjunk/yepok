yep ok
======

a command line argument validation helper

* parse args with minimist
* validate args
 * success -> return minimist
 * failure -> return '{arg0: [err, err], arg2 : ...}'

----
#### example

```
var yepok = require('yepok');

var dashA = function(param, callback){
};

var dashH = functino(param, callback){
};

var validators = {
  a: dashA,
  add: dashA,
  h: dashH,
  help: dashH
};

yepok(validators, function(err, minimist){
  if (err) return console.log(err);
  console.log("HURRAY!!!!!");
  console.log(minimist);
});
```
