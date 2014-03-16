var MapView = Backbone.View.extend({
  el: '#map-canvas',

  initialize: function(){
    var mapOptions = {
      center: new google.maps.LatLng(37.7577,-122.4376),
      zoom: 14
    }

    this.map = new google.maps.Map(this.el, mapOptions)
  }
})