'use strict';

var minimist = require('minimist');
var _ = require('lodash');

// verrs = { arg: [err, err], ...}


module.exports = function(_argv, validators, callback){
  // parse argv
  // for each arg split up diff params and validate
  // once all paramiters for all args have been validated call callback

  var argv = minimist(_argv);
  var verrs = {};

  for (var arg in argv){
    console.log(arg + ' of argv: ' + argv[arg]); 
    var params = argv[arg].toString().split(',');
    for (var i=0; i<params.length; i++){
      console.log( arg + ' params[' + i + ']: ' + params[i]);
    }

  }
   
};
