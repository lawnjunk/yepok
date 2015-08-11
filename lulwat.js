var EventEmitter = require('events').EventEmitter;
var util = require('util');


var lulwat = function(){
  var self = this;

  var logBS = function(){
    self.emit('logBS');
  }();


  this.on('logBS', function(){
    console.log("WHAHAHAHAHA");
  });
};


util.inherits(lulwat, EventEmitter);

module.exports = lulwat;
