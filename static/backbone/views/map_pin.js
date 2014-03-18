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

    var contentString = this.setContentString();
    this.infoWindow = new google.maps.InfoWindow({
      content: contentString
    });


    google.maps.event.addListener(this.marker, 'click', function() {
      self.trigger('showInfo');
    });

    self.listenTo(self, 'showInfo', self.showInfo);
  },

  showInfo: function(){
    this.infoWindow.open(this.marker.map, this.marker);

    this.infoView = new InfoWindowView({config: this.config});
    this.listenTo(this.infoView, 'stuff', this.showDirections);
  },

  setContentString: function(){
    content = '<div class="map-pin">' +
              '</div>';
    return content;
  },

  showDirections: function(){
    console.log("It  made it happen!");
  }
});