InfoWindowView = Backbone.View.extend({
  el: ".map-pin",
  events: {
    'click .show-directions': "showDirections"
  },
  initialize: function(){
    this.$el.append('<a class="show-directions" href="#">Get Directions</a>');
  },
  showDirections: function(){
    cosole.log("wants to show directions");
    this.trigger('show');
  }


});