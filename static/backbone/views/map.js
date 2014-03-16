var MapView = Backbone.View.extend({
  el: '#map-canvas',

  initialize: function(){

    var mapOptions = {
      center: new google.maps.LatLng(37.7577,-122.4376),
      zoom: 14
    }

    this.map = new google.maps.Map(this.el, mapOptions)
    this.listenTo(this.collection, 'setCenter', this.setCenter)
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
  }

})