DirectionsView = Backbone.View.extend({
  //needs start, end, map,
  initialize: function(config){
    this.map = config.map
    this.directionsService = new google.maps.DirectionsService();
    var origin = new google.maps.LatLng(config.map.center.lat(), config.map.center.lng());
    var destination = new google.maps.LatLng(config.destination.position.lat(), config.destination.position.lng());

    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(config.map);
    this.calculateRoute(origin, destination);
  },

  calculateRoute: function(origin, destination){
    var self = this;
    var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(result);
        self.listSteps(result);
        self.collection.trigger('removePins');
      }
    });
  },

  listSteps: function(directionsResult){
    var list = [];
    steps = directionsResult.routes[0].legs[0].steps;
    _.each(steps, function(step){
      list.push(step.instructions);
    });
    var stepsList = new DirectionsListView({list: list});
  }

});