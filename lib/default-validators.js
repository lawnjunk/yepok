'use strict';

var _ = require('lodash');

module.exports = function(ee){
  var isValidArg = function(arg, validator, param){
    if (!validator) {
      //if (!verrs[arg]) verrs[arg] = [];
      //verrs[arg].push('input not valid');
      var err = 'input not valid';
      ee.emit('error', arg, err);
      ee.emit('checkComplete');
    }
  };

  var argIsBoolean = function(arg, validator, param){
    if (validator == true){
      if ('true' == param){
        return ee.emit('checkComplete');
      }
      var err = 'flag must not be followed by any paramters: ' + param;
      ee.emit('error', arg, err);
      ee.emit('checkComplete');
    }
  };

  var argIsAstrix = function(arg, validator, param){
    if(validator === '*') {
      ee.emit('checkComplete'); 
    }
  };

  var argHasValidator = function(arg, validator, param){
    if (_.isFunction(validator)){
      validator(param, function(err){
        if (err) {
          //if (!verrs[arg]) verrs[arg] = [];
          //verrs[arg].push(err);
          ee.emit('error', arg, err);
        }
        ee.emit('checkComplete');
      });
    }
  }

  return  [
    isValidArg,
    argIsBoolean,
    argIsAstrix,
    argHasValidator
  ];
}
