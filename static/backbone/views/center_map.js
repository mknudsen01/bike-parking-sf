CenterMapView = Backbone.View.extend({
  el: '.find-parking',

  events: {
    'click ' : 'centerMap'
  },

  centerMap: function(e){
    e.preventDefault();
    this.collection.trigger('findUserCoordinates')
  }
})