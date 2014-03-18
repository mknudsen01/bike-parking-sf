InfoWindowView = Backbone.View.extend({
  el: ".map-pin",
  events: {
    'click .show-directions': "showDirections"
  },
  initialize: function(config){
    this.$el.append('<h6>'+ config.config.spot.get('location_name') + '</h6>' +
              '<a class="show-directions" href="#">Get Directions</a>');
  },
  showDirections: function(){
    this.trigger('stuff');
  }


});