LocationFinder = Backbone.Model.extend({
  urlRoot: '/spots',

  initialize: function(){
    console.log("I am a location finder model")
    // this.fetchStuff();

  },

  // fetchStuff: function(){
  //   this.fetch()
  //   .success(function(response){
  //     console.log("It was a success")
  //     this.collection.doStuff(response);
  //   })
  // },

  defaults: {
    hello: "hi"
  }
});

