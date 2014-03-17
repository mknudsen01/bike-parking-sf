MapPinView = Backbone.View.extend({

  el: $('.info'),

  events: {
    'click .show-directions': "showDirections"
  },

  initialize: function(config){
    var self = this
    this.config = config;
    //config needs collection, model, and map
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(config.spot.get('coordinates').latitude, config.spot.get('coordinates').longitude),
      map: self.config.map,
      title: self.config.spot.get('location_name')
    })

    var contentString = this.setContentString();
    this.infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    google.maps.event.addListener(this.marker, 'click', function() {
      self.trigger('showInfo')
    });

    self.listenTo(self, 'showInfo', self.showInfo)
  },

  showInfo: function(){
    this.infoWindow.open(this.marker.map, this.marker)
  },

  setContentString: function(){
    content = '<div class="info">' +
              '<h6>'+ this.config.spot.get('location_name') + '</h6>' +
              '<a class="show-directions" href="#">Get Directions</a>'+
              '</div>';
    return content
  },

  showDirections: function(){
    console.log("It  made it happen!")
  }
})