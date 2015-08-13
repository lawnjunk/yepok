var yepok = require('../yepok');
var validators = require('./my-validators.js');

yepok(process.argv.slice(2), validators, function(err, minimist){
  if (err) {
    console.log("ERROR:")
    return console.log(err);
  }
  console.log("MINIMIST:");
  console.log(minimist)

});
