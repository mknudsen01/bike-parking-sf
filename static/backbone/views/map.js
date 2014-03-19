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
    this.listenTo(this.collection, 'removePins', this.clearMarkers);
  },

  setCenter: function(coordinates){
    var self = this;
    initialLocation = new google.maps.LatLng(coordinates[0], coordinates[1]);
    this.map.setCenter(initialLocation);
    self.zoomOnCenter();
  },

  zoomOnCenter: function(){
    this.map.setZoom(19);
  },


  // Add a marker to the map and push to the array.
  addMarker: function(location) {
    var self = this;
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.get('coordinates').latitude, location.get('coordinates').longitude),
      map: this.map
    });
    this.pins.push(marker);

    var contentString = this.setContentString();
    this.infoWindow = new google.maps.InfoWindow({
      content: contentString

    });


    google.maps.event.addListener(marker, 'click', function() {
      self.infoWindow.open(this.map, marker);
      $('.show-directions').on('click', function(){
        self.showDirections(marker);
        self.clearMarkers();
      });
    });
  },

  setContentString: function(){
    content = '<div class="map-pin">' +
              '<a class="show-directions" href="#">Get Directions</a>'+
              '</div>';
    return content;
  },

  // Sets the map on all markers in the array.
  setAllMap: function(map) {
    for (var i = 0; i < this.pins.length; i++) {
      this.pins[i].setMap(map);
    }
  },

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers: function() {
    console.log("Got the call, homes");
    this.setAllMap(null);
  },

  // Shows any markers currently in the array.
  showMarkers: function() {
    this.setAllMap(map);
  },

  // Deletes all markers in the array by removing references to them.
  deleteMarkers: function() {
    this.clearMarkers();
    this.pins = [];
  },

  addPins: function(spots){
    var self = this;
    this.findDistanceOfSpots(spots, this.map.center);
    sorted = this.collection.sortBy(function(model){
      return model.get("distance");
    });

    var closestParking = [];
    for(i=0; i<10; i++){
        if(sorted[i].get("location_name")){
        closestParking.push(sorted[i]);
      }
    }

    _.each(closestParking, function(closeSpot){
      self.addMarker(closeSpot);
    });
  },

  showDirections: function(destination){
    this.directionsView = new DirectionsView({
      map: this.map,
      destination: destination
    });
  },

  findDistanceOfSpots: function(spots, center){
    var self = this;
    var centerCoords = [center.k, center.A];
    _.each(spots, function(spot){
      var coordinates = spot.get('coordinates');
      var from = new google.maps.LatLng(centerCoords[0], centerCoords[1]);
      var to   = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
      var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      spot.set('distance', distance);
    });
  },

  removePin: function(){
    setAllMap(null);
  }

});