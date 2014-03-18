DirectionsView = Backbone.View.extend({
  //needs start, end, map,
  initialize: function(config){
    this.directionsService = new google.maps.DirectionsService();
    var origin = new google.maps.LatLng(config.map.center.lat(), config.map.center.lng());
    var destination = new google.maps.LatLng(config.destination.position.lat(), config.destination.position.lng());

    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(config.map);

    this.calculateRoute(origin, destination);
  },

  calculateRoute: function(origin, destination){
    self = this
    var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.BICYCLING
    };
    this.directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setDirections(result);
      }
    });
  }
});