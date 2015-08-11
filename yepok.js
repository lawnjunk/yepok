'use strict';

var minimist = require('minimist');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var initialValidators = require('./lib/default-validators.js')(ee);;
var util = require('util');

var yepok =  function(_argv, _validators, callback){
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

  // called everytime there is an error
  ee.on('error', function(arg, err){
    if (!verrs[arg]) verrs[arg] = [];
    verrs[arg].push(err);
  });

  for (var arg in argv){
    var params = argv[arg].toString().split(',');
    for (var i=0; i<params.length; i++){
      numParams++;
      initialValidators.forEach(function(initialValidator){
        util.inherits(ee, initialValidator);
        initialValidator(arg, validators[arg], params[i]);
      });
    }
  }

  paramCountDone = true;
  
  // finish will only envoke now callback if all validators were syncronious
  ee.emit('finish');
  
  console.log('total numParams', numParams);
};

util.inherits(yepok, EventEmitter);

module.exports = yepok;
