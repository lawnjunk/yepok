'use strict';

var minimist = require('minimist');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var yepokValidators = require('./lib/default-validators.js')(ee);

var yepok =  function(_argv, _validators, callback){
  var userValidators =  _validators || {};
  var verrs = {}; 

  // parse arguments with minimist
  var argv = minimist(_argv);

  // initialize yepok counters
  var paramCountDone = false;
  var numParams = 0;
  var numOK = 0;

  // called every time a paramiter has finished being validated
  ee.on('checkComplete', function(){
    numOK++;
    if (paramCountDone && numOK == numParams){
      ee.emit('finish');
    }
  });

  // called everytime there is an error
  ee.on('error', function(arg, err){
    if (!verrs[arg]) verrs[arg] = [];
    verrs[arg].push(err);
  });
  
  // called once all paramiters have been counted and finished validiation
  ee.on('finish', function(){
    if (paramCountDone && numOK == numParams){
      if (!_.isEmpty(verrs)) {
        return callback(verrs);
      }
      return callback(null, argv);
    }
  });

  // validate each flag and its paramiter
  _.forEach(argv, function(n, arg, array){
    var parameters = array[arg].toString().split(',');
    _.forEach(parameters, function(param){
      numParams++;
      yepokValidators.forEach(function(yepokValidator){
        yepokValidator(arg, userValidators[arg], param);
      });
    });
  });
  
  // mark that all paramiters have been acounted for
  paramCountDone = true;
  
  // finish will only envoke now callback if all validators were syncronious
  ee.emit('finish');
};


module.exports = yepok;
