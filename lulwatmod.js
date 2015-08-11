var datemmitz = function(){
  console.log('am a mod');

  var self = this;
  this.yolo = function(){
    console.log('am trying emmit yolo');
    self.emit('wat');
  };

};
module.exports = datemmitz;
