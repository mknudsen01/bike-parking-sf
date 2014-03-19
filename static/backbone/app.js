BikeParkingApp = function(){
  this.locations = new LocationCollection();
  this.mapView = new MapView({
    collection: this.locations
  });
  this.findParkingButton = new FindParkingButton({
    collection: this.locations
  });
};

$(document).ready(function(){
  app = new BikeParkingApp();
});