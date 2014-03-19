var MapView = Backbone.View.extend({
  el: '#map-canvas',

  initialize: function(){
    var mapOptions = {
      center: new google.maps.LatLng(37.7577,-122.4376),
      zoom: 14
    };
    this.map = new google.maps.Map(this.el, mapOptions);

    this.pins = [];

    this.listenTo(this.collection, 'setCenter', this.setCenter);
    this.listenTo(this.collection, 'addPins', this.addPins);
  },

  setCenter: function(coordinates){
    var self = this;
    initialLocation = new google.maps.LatLng(coordinates[0], coordinates[1]);
    this.map.setCenter(initialLocation);
    this.addCenterMarker(initialLocation);
    self.zoomOnCenter();
  },

  zoomOnCenter: function(){
    this.map.setZoom(16);
  },

  addCenterMarker: function(location){
    var self = this;
    var pin = new google.maps.Marker({
      position: location,
      map: this.map
    });

    this.pushToPins(pin);
  },


  // Add a marker to the map and push to the array.
  addPin: function(location) {
    var self = this;
    var pin = new google.maps.Marker({
      position: new google.maps.LatLng(location.get('coordinates').latitude, location.get('coordinates').longitude),
      map: this.map
    });

    this.pushToPins(pin);
    this.createInfoWindow();
    this.addListenerForInfoWindow(pin);
  },


  pushToPins: function(pin){
    this.pins.push(pin);
  },

  createInfoWindow: function(){
    this.infoWindow = new google.maps.InfoWindow({
      content: this.setContentString()
    });
  },

  setContentString: function(){
    content = '<div class="map-pin">' +
              '<a class="show-directions" href="#">Get Directions</a>'+
              '</div>';
    return content;
  },

  addListenerForInfoWindow: function(pin){
    var self = this;
    google.maps.event.addListener(pin, 'click', function(){
      self.infoWindow.open(this.map, pin);
      self.addListenerForInfoWindowLink(pin);
    });
  },

  addListenerForInfoWindowLink: function(pin){
    var self = this;
    $('.show-directions').on('click', function(){
      self.showDirections(pin);
      self.clearPins();
    });
  },

  // Set the map of each marker in the array.
  setAllMap: function(map) {
    for (var i = 0; i < this.pins.length; i++) {
      this.pins[i].setMap(map);
    }
  },

  // Removes the markers from the map, but keeps them in the array.
  clearPins: function() {
    this.setAllMap(null);
  },

  addPins: function(spots){
    var self = this;
    this.findDistanceOfSpots(spots, this.map.center);

    sortedByDistance = this.collection.sortBy(function(model){
      return model.get("distance");
    });

    closestParking = this.takeClosestTen(sortedByDistance);

    _.each(closestParking, function(closeSpot){
      self.addPin(closeSpot);
    });
  },

  takeClosestTen: function(collection){
    var closestResults = [];
    for(i=0; i<10; i++){
      closestResults.push(collection[i]);
    }
    return closestResults;
  },

  showDirections: function(destination){
    this.directionsView = new DirectionsView({
      map: this.map,
      destination: destination
    });
  },

  findDistanceOfSpots: function(spots, center){
    //finds distance and sets a 'distance' attribute for each spot
    var self = this;
    var centerLatitude = center.k;
    var centerLongitude = center.A;
    _.each(spots, function(spot){
      var coordinates = spot.get('coordinates');
      var from = new google.maps.LatLng(centerLatitude, centerLongitude);
      var to   = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
      var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      spot.set('distance', distance);
    });
  }
});