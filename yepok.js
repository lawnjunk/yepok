'use strict';

var minimist = require('minimist');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var yepok =  function(_argv, _validators, callback){
  // parse argv
  // for each arg split up diff params and validate
  // once all paramiters for all args have been validated call callback
 
  // by default no arguments are allowed
  var validators =  _validators || {};

  // parse arguments with minimist
  var argv = minimist(_argv);
  var verrs = {}; // verrs = { arg: [err, err], ...}

  // initialize counters
  var paramCountDone = false;
  var numParams = 0;
  var numOK = 0;

  // called every time a paramiter has finished being validated
  ee.on('checkComplete', function(){
    numOK++;
    if (paramCountDone && numOK == numParams){
      ee.emit('finish');
    };
  });

  // called once all paramiters have been counted and finished validiation
  ee.on('finish', function(){
    if (paramCountDone && numOK == numParams){
      if (!_.isEmpty(verrs)) {
        return callback(verrs);
      }
      return callback(null, argv);
    };
  });

  var isValidArg = function(){
    if (!validators[arg]) {
      if (!verrs[arg]) verrs[arg] = [];
      verrs[arg].push('input not valid');
      ee.emit('checkComplete');
    }
  };

  var argIsBoolean = function(){
    if (validators[arg] == true){
      console.log('is boolean test');
      if (argv[arg] != true){
        if (!verrs[arg]) verrs[arg] = [];
        verrs[arg].push('flag must not be folowed by any arguments: ' + params[i]);
      }
      ee.emit('checkComplete');
    }
  };

  var argHasValidator = function(){
    validators[arg](params[i], function(err){
      if (err) {
        if (!verrs[arg]) verrs[arg] = [];
        verrs[arg].push(err);
      }
      ee.emit('checkComplete');
    });
  }

  for (var arg in argv){
    var params = argv[arg].toString().split(',');
    for (var i=0; i<params.length; i++){
      numParams++;
      isValidArg();
      argIsBoolean();
      argHasValidator();
    }
  }
  paramCountDone = true;
};

module.exports = yepok;
