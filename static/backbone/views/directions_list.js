DirectionsListView = Backbone.View.extend({
  el: '#list-steps',

  initialize: function(steps){
    self = this;
    _.each(steps.list, function(step){
      self.$el.append('<p>'+step+'</p></br>');
    });
    self.$el.toggleClass('hidden');
  }
});