LocationCollection = Backbone.Collection.extend({
  model: LocationFinder,
  initialLocation: null,


  initialize: function(){
    this.listenTo(this, 'findUserCoordinates', this.findUserCoordinates);
  },

  findUserCoordinates: function(){
    var self = this
    navigator.geolocation.getCurrentPosition(function(position){
      initialLocation = [position.coords.latitude, position.coords.longitude];
      console.log(initialLocation);
      self.sendCoordinates(initialLocation);
    })
  },

  sendCoordinates: function(coordinates){
    this.trigger('setCenter', coordinates)
  }
})