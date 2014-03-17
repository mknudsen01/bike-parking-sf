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
    self = this
    this.fetch()
    .success(function(response){
      console.log("It was a success")
      self.addPins();
    })
  },

  findUserCoordinates: function(){
    var self = this
    navigator.geolocation.getCurrentPosition(function(position){
      currentLocation = [position.coords.latitude, position.coords.longitude];
      console.log(currentLocation);
      self.sendCoordinates(currentLocation);
    })
  },

  sendCoordinates: function(coordinates){
    this.trigger('setCenter', coordinates)
  },

  addPins: function(){
    this.trigger('addPins', this.models)
    console.log("IT DID THE THINGS AND PRINTED THIS")
  }


})