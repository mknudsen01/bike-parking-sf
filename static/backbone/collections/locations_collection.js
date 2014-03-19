LocationCollection = Backbone.Collection.extend({
  model: ParkingSpot,
  currentLocation: null,
  url: '/spots',

  parkingSpot : new ParkingSpot(),
  initialize: function(){
    this.fetchLocations();
    this.listenTo(this, 'findUserCoordinates', this.findUserCoordinates);
  },

  fetchLocations: function(){
    self = this;
    this.fetch();
  },

  findUserCoordinates: function(){
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position){
      currentLocation = [position.coords.latitude, position.coords.longitude];
      self.setCenterLocation(currentLocation);
      self.addPins();
    });
  },

  setCenterLocation: function(coordinates){
    this.trigger('setCenter', coordinates);
  },

  addPins: function(){
    this.trigger('addPins', this.models);
  }
});