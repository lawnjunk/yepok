'use strict';

var expect = require('chai').expect;
var yepok = require('../yepok.js');
var fs = require('fs');
var path = require('path');
var minimistLib = require('minimist');

var dashIsNum = function(parameter, callback){
  var test = Number(parameter);
  if (isNaN(test)) return callback("not a number: " + parameter);
  callback();
};

var dashlteqTwoChar = function(parameter, callback){
  if (parameter.length <= 2) return callback();
  callback("not less than or equal to two characters: " + parameter);
};

var dashSync = function(parameter, callback){
  var abspath = path.resolve(parameter);
  var exists = fs.existsSync(abspath);
  if (exists) return callback();
  callback('the file does not exist: ' + abspath);
};

var dashASync = function(parameter, callback){
  var abspath = path.resolve(parameter);
  fs.exists(abspath, function(exists){
    if (exists) return callback();
    callback('the file does not exist: ' + abspath);
  });
};

describe('yepok.js', function(){
  describe('with no arguments and no validators', function(){
    var error;
    var minimist;
    before(function(done){
      var argv = ['node', 'program.js'];
      yepok(argv.slice(2), {}, function(err, data){
        error = err;
        minimist = data;
        done();
      });
    });

    it('should return an error', function(){
      expect(!!error).to.eql(true);
    });

    it('should not return minimist', function(){
      expect(minimist).to.eql(undefined);
    });

    it('err._ should equal array of length 1', function(){
      expect(error._.length).to.eql(1);
    });

    it('err._[0] should equal "input not valid"', function(){
      expect(error._[0]).to.eql('input not valid');
    });
  });


  describe('with boolean argument', function(){
    describe('with vailid usage', function(){
      var error;
      var minimist;
      var argv = ['node', 'program.js', '-t', '--test', '-xy'];
      before(function(done){
        yepok(argv.slice(2), {_:'*', t: true, test: true, x:true, y: true}, function(err, data){
          error = err;
          minimist = data;
          done();
        });
      });

      it('should return minimist', function(){
        expect(!!minimist).to.eql(true);
      });

      it('should not return an error', function(){
        expect(error).to.eql(null);
      });

      it('should return what minmist would return', function(){
        var minimistTest = minimistLib(argv.slice(2));
        expect(minimist).to.eql(minimistTest);
      });
    });

    describe('with invailid usage', function(){
      var error;
      var minimist;
      var argv = ['node', 'program.js', '-t', 'bad', '--test', 'alsobad', '-xy'];
      before(function(done){
        yepok(argv.slice(2), {_:'*', t: true, test: true, x:true, y: true}, function(err, data){
          error = err;
          minimist = data;
          done();
        });
      });

      it('should return an error', function(){
        expect(!!error).to.eql(true);
      });

      it('should not return minimist', function(){
        expect(minimist).to.eql(undefined);
      });

      it('err.t[0] should equal "flag must not be followed by any paramters: bad"', function(){
        expect(error.t[0]).to.eql("flag must not be followed by any paramters: bad");
      });

      it('err.test[0] should equal "flag must not be followed by any paramters: alsobad"', function(){
        expect(error.test[0]).to.eql("flag must not be followed by any paramters: alsobad");
      });

    });
  });

  describe('with astrix validator', function(){
      var error;
      var minimist;
      var argv = ['node', 'program.js', '-t', 'bad', '--test', 'alsobad', '-xy'];
      before(function(done){
        yepok(argv.slice(2), {_:'*', t: "*", test: "*", x:"*", y: "*"}, function(err, data){
          error = err;
          minimist = data;
          done();
        });
      });

      it('should not return an error', function(){
        expect(!!error).to.eql(false);
      });

      it('should return what minimist would return', function(){
        expect(minimist).to.eql(minimistLib(argv.slice(2)));
      });

  });

  describe('with sync validator', function(){
    var error;
    var minimist;
    var argv = ['node', 'program.js', '-a', './'];
    before(function(done){
      yepok(argv.slice(2), {_: '*', a: dashSync}, function(err, data){
        error = err;
        minimist = data;
        done();
      });
    });
      it('should not return an error', function(){
        expect(!!error).to.eql(false);
      });

      it('should not return minimist', function(){
        expect(minimist).to.eql(minimistLib(argv.slice(2)));
      });

  });

  describe('with async validator', function(){
    var error;
    var minimist;
    var argv = ['node', 'program.js', '-a', './'];
    before(function(done){
      yepok(argv.slice(2), {_: '*', a: dashASync}, function(err, data){
        error = err;
        minimist = data;
        done();
      });
    });
      it('should not return an error', function(){
        expect(!!error).to.eql(false);
      });

      it('should not return minimist', function(){
        expect(minimist).to.eql(minimistLib(argv.slice(2)));
      });

  });

  describe('with array of validators', function(){
    describe('with vailid usage', function(){
      var error;
      var minimist;
      var argv = ['node', 'program.js', '-n', '11'];
      before(function(done){
        yepok(argv.slice(2), {_: '*', n: [dashIsNum, dashlteqTwoChar]}, function(err, data){
          error = err;
          minimist = data;
          done();
        });
      });
    
      it('should return what minimist would return', function(){
        expect(minimist).to.eql(minimistLib(argv.slice(2)));
      });

      it('should not return an error', function(){
        expect(error).to.eql(null);
      });
    });

    describe('with invalide validator in first index of validator array', function(){
      var error;
      var minimist;
      var argv = ['node', 'program.js', '-n', 'x1'];
      before(function(done){
        yepok(argv.slice(2), {_: '*', n: [dashIsNum, dashlteqTwoChar]}, function(err, data){
          error = err;
          minimist = data;
          done();
        });
      });

      it('should return an error', function(){
        expect(!!error).to.equal(true);
      });
    
      it('should not return minimist', function(){
        expect(minimist).to.eql(undefined);
      });

      it('err.n shoud be an array of length 1', function(){
        expect(error.n.length).to.eql(1);
      });

      it('err.n[0] should equal "not a number: x1"', function(){
        expect(error.n[0]).to.eql('not a number: x1');
      });

    });

    describe('with invalide validator in second index of validator array', function(){
      var error;
      var minimist;
      var argv = ['node', 'program.js', '-n', '111'];
      before(function(done){
        yepok(argv.slice(2), {_: '*', n: [dashIsNum, dashlteqTwoChar]}, function(err, data){
          error = err;
          minimist = data;
          done();
        });
      });

      it('should return an error', function(){
        expect(!!error).to.equal(true);
      });
    
      it('should not return minimist', function(){
        expect(minimist).to.eql(undefined);
      });

      it('err.n shoud be an array of length 1', function(){
        expect(error.n.length).to.eql(1);
      });

      it('err.n[0] should equal "not less than or equal to two characters: 111"', function(){
        expect(error.n[0]).to.eql('not less than or equal to two characters: 111');
      });
    });

    describe('with invalide validators at index 0 and 1 of validator array', function(){
      var error;
      var minimist;
      var argv = ['node', 'program.js', '-n', 'x11'];
      before(function(done){
        yepok(argv.slice(2), {_: '*', n: [dashIsNum, dashlteqTwoChar]}, function(err, data){
          error = err;
          minimist = data;
          done();
        });
      });

      it('should return an error', function(){
        expect(!!error).to.equal(true);
      });
    
      it('should not return minimist', function(){
        expect(minimist).to.eql(undefined);
      });

      it('err.n shoud be an array of length 2', function(){
        expect(error.n.length).to.eql(2);
      });

      it('err.n[0] should equal "not a number: x11"', function(){
        expect(error.n[0]).to.eql('not a number: x11');
      });

      it('err.n[1] should equal "not less than or equal to two characters: x11"', function(){
        expect(error.n[1]).to.eql('not less than or equal to two characters: x11');
      });
    });
  });

});



