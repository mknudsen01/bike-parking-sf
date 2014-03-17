var MapView = Backbone.View.extend({
  el: '#map-canvas',

  initialize: function(){

    var mapOptions = {
      center: new google.maps.LatLng(37.7577,-122.4376),
      zoom: 14
    }

    this.map = new google.maps.Map(this.el, mapOptions)
    this.pins = [];
    this.listenTo(this.collection, 'setCenter', this.setCenter)
    this.listenTo(this.collection, 'addPins', this.addPins)
  },

  setCenter: function(coordinates){
    self = this
    initialLocation = new google.maps.LatLng(coordinates[0], coordinates[1])
    this.map.setCenter(initialLocation);
    self.zoomOnCenter();
  },

  zoomOnCenter: function(){
    this.map.setZoom(19);
  },

  addPins: function(spots){
    self = this
    this.findDistanceOfSpots(spots, this.map.center);
    sorted = this.collection.sortBy(function(model){
      return model.get("distance")
    })

    var closestParking = []
    for(i=0; i<10; i++){
        if(sorted[i].get("location_name")){
        closestParking.push(sorted[i]);
      }
    }

    _.each(closestParking, function(closeSpot){
      console.log("I did a thing")
      var marker = new MapPinView({
        collection: self.collection,
        spot: closeSpot,
        map: self.map
      })
    })
  },

  findDistanceOfSpots: function(spots, center){
    self = this
    var centerCoords = [center.k, center.A]
    _.each(spots, function(spot){
      var coordinates = spot.get('coordinates')
      var from = new google.maps.LatLng(centerCoords[0], centerCoords[1])
      var to   = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
      var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      spot.set('distance', distance)
    })
  }

})