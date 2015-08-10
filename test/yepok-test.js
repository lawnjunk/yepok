'use strict';

var expect = require('chai').expect;
var yepok = require('../yepok.js');
var fs = require('fs');
var path = require('path');

var dashA = function(param, callback){
 
  var abspath = path.resolve(param);

  fs.readFile(path.toString(), function(err, data){
    if (err) callback(err);
    callback();
  });
};

describe('yepok.js', function(){
  it('it should console log some shit', function(){
    var argv = ['node', 'prgram.js', '-a', 'lulwat', '-a', 'what',  '-hxy', 'hey', 'that', 'is so sick'];
    yepok(argv.slice(2), {a: dashA ,x: true, y: true , _: true});
  });
});
