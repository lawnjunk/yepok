'use strict';

var expect = require('chai').expect;
var yepok = require('../yepok.js');
var fs = require('fs');
var path = require('path');
var minimistLib = require('minimist');

var dashA = function(parameter, callback){
  var abspath = path.resolve(param);
  fs.readFile(path.toString(), function(err, data){
    if (err) callback('file does not exist: ' + parameter);
    callback();
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

  describe('with sync validator', function(){
  });

  describe('with async validator', function(){
  });
});



