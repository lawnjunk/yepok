'use strict';

var expect = require('chai').expect;
var yepok = require('../yepok.js');

describe('yepok.js', function(){
  it('it should console log some shit', function(){
    var argv = ['node', 'prgram.js', '-a', 'lulwat', '-a', 'what',  '-hxy', 'hey', 'that', 'is so sick'];
    yepok(argv.slice(2), {x: true});
  });
});
