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
    console.log("sup, DUDE")
  },

  zoomOnCenter: function(){
    this.map.setZoom(19);
  },

  addPins: function(spots){

    self = this
    console.log("Got the trigger")
    _.each(spots, function(location){
      var coordinates = location.get('coordinates')
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
        map: self.map,
        title: 'hello'
      })
    })
  }

})