var EventEmitter = require('events').EventEmitter;
var util = require('util');
var lulmod = require('./lulwatmod.js');

var lulwat = function(){
  var self = this;

  var logBS = function(){
    self.emit('logBS');
  }();


  this.on('logBS', function(){
    console.log("WHAHAHAHAHA");
  });

  this.on('wat', function(){
    console.log("magix");
  });

  //lulwat.bind(lulmod);
  //lulmod.call(this)
  //mod.yolo();

  //var mod = new lulmod();
  //console.log('dat bind', mod);

  //mod.yolo();
};


util.inherits(lulmod, EventEmitter);
util.inherits(lulwat, EventEmitter);

module.exports = lulwat;

