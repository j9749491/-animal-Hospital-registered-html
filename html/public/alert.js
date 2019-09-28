(function() {
  var epaAPI = "http://data.ntpc.gov.tw/od/data/api/DE4CFD62-E977-4C4F-822F-7D2AA65F6E4A?$format=json&callback=?";
  $.getJSON( epaAPI, function(){
    format: "json"
  }).done(function(data) {
      console.log(data);
    });
})();
