LocationCollection = Backbone.Collection.extend({
  model: LocationFinder,
  currentLocation: null,
  url: '/spots',

  finder : new LocationFinder(),
  initialize: function(){
    this.fetchLocations();
    this.listenTo(this, 'findUserCoordinates', this.findUserCoordinates);
  },

  fetchLocations: function(){
    self = this;
    this.fetch()
    .success(function(response){
      console.log("Fetched successfully");
    });
  },

  findUserCoordinates: function(){
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position){
      currentLocation = [position.coords.latitude, position.coords.longitude];
      self.sendCoordinates(currentLocation);
      self.addPins();
    });
  },

  sendCoordinates: function(coordinates){
    this.trigger('setCenter', coordinates);
  },

  addPins: function(){
    this.trigger('addPins', this.models);
  }


})