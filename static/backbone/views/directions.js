DirectionsView = Backbone.View.extend({
  // config contains map and destination
  // initialize renders the line route between origin and destination
  initialize: function(config){
    this.map = config.map;

    // Google Maps API--
    // https://developers.google.com/maps/documentation/javascript/directions#DisplayingResults
    this.directionsService = new google.maps.DirectionsService();

    var origin = new google.maps.LatLng(config.map.center.lat(), config.map.center.lng());
    var destination = new google.maps.LatLng(config.destination.position.lat(), config.destination.position.lng());

    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(config.map);

    // Displays the route and obtains the steps
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
      }
    });
  },

  listSteps: function(directionsResult){
    var directionsList = [];
    steps = directionsResult.routes[0].legs[0].steps;
    _.each(steps, function(step){
      directionsList.push(step.instructions);
    });
    var stepsList = new DirectionsListView({list: directionsList});
  }

});