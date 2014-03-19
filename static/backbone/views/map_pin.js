MapPinView = Backbone.View.extend({
  infoView: null,

  initialize: function(config){
    var self = this;
    this.config = config;
    //config needs collection, model, and map
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(config.spot.get('coordinates').latitude, config.spot.get('coordinates').longitude),
      map: self.config.map,
      title: self.config.spot.get('location_name')
    });
  },

  setContentString: function(){
    content = '<div class="map-pin">' +
              '</div>';
    return content;
  },

  presentDirections: function(){
    this.removePins();
    this.showDirections();
  },

  removePins: function(){
    setAllMap(null);
  },

  showDirections: function(){
    this.directionsView = new DirectionsView({
      map: this.config.map,
      destination: this.marker,
    });
  }
});