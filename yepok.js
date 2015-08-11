'use strict';

var minimist = require('minimist');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var yepok =  function(_argv, _validators, callback){
  // parse argv
  // for each arg split up diff params and validate
  // once all paramiters for all args have been validated call callback
  
  var validators =  _validators || {};
  console.log('validators', validators);
  var argv = minimist(_argv);
  var verrs = {}; // verrs = { arg: [err, err], ...}
  var numParams = 0;
  var numOK = 0;
  var forDone = false;

  ee.on('checkComplete', function(){
    numOK++;
    console.log('numok:', numOK);
    if (forDone && numOK == numParams){
      console.log('wat');
      ee.emit('finish');
    };
  });

  ee.on('finish', function(){
    if (forDone && numOK == numParams){
      console.log('grr lul slug');
      if (!_.isEmpty(verrs)) {
        return callback(verrs);
      }
      return callback(null, argv);
    };
  });

  for (var arg in argv){
    console.log(arg + ' of argv: ' + argv[arg]); 
    // parse params for each arg
    var params = argv[arg].toString().split(',');
    for (var i=0; i<params.length; i++){
      numParams++;
      console.log( arg + ' params[' + i + ']: ' + params[i]);
      // validate each param
      //   check if allowd
      //   check if should be bool
      //   check reun validator 
      
      if (!validators[arg]) {
        // if hasnt failed yet make empty array
        if (!verrs[arg]) verrs[arg] = [];
        verrs[arg].push('input not valid');
        ee.emit('checkComplete');
      } else if (validators[arg] == true){
        console.log('is boolean test');
        if (argv[arg] != true){
          if (!verrs[arg]) verrs[arg] = [];
          verrs[arg].push('flag must not be folowed by any arguments: ' + params[i]);
        }
        ee.emit('checkComplete');
      } else {
        validators[arg](params[i], function(err){
          if (err) {
            if (!verrs[arg]) verrs[arg] = [];
            verrs[arg].push(err);
          }
            ee.emit('checkComplete');

        });
      }

    }
  }
  forDone = true;
    console.log('verrs\n', verrs);
    console.log('num params', numParams);
};


module.exports = yepok;
