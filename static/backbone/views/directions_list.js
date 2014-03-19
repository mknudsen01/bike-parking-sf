DirectionsListView = Backbone.View.extend({
  el: '#list-steps',

  initialize: function(steps){
    this.mapContainer = '#map-container';

    this.formatList(steps);
    this.showDirectionsList();
    this.moveMapToRight(this.mapContainer);
  },

  formatList: function(steps){
    var self = this;
    _.each(steps.list, function(step){
      self.$el.append('<p>'+step+'</p></br>');
    });
  },

  showDirectionsList: function(){
    this.$el.toggleClass('hidden');
  },

  moveMapToRight: function(map){
    $(map).css('width', '70%');
    $(map).css('float', 'right');
  }
});