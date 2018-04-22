//Q1: change page 1Legend

var Layer1
var map = L.map('map', {
  center: [37.8, -96],
  zoom: 4
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 3,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);



  //Hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML = '<h4>Information</h4>' +  (props ?
      '<b>' + props.Origin + '</b><br />' + props.S_lat + ', '+ props.S_lon +
      '</b><br />'+"Airport ID: "+ props.S_airport_ +
      '</b><br />'+"Destination: "+props.Dest +', '+ props.D_airport_ +
      '</b><br />'+ props.D_lat +',  '+ props.D_lon +
      '</b><br />'+"Flight Number: "+props.FlightNum +
      '</b><br />'+"Delayed Miutes: "+props.ArrDelayMi
    : 'Take a look');
    };

  info.addTo(map);

  //hover highlight
  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 3,
      color: '#f00',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    };
    info.update(layer.feature.properties);
  };

  function resetHighlight(e) {
    Layer1.resetStyle(e.target);
    info.update();
  };

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
    });
  }



  //Slide 1

//Slide 1: points, FlightNum
//var data1 = "https://raw.githubusercontent.com/zhaoanbei/practicum_data/master/pred419.json"

var data1 = "https://raw.githubusercontent.com/zhaoanbei/Flight-Counts-and-Delay-Mapping-with-Leaflet/master/allflight1_FeaturesToJSON.json"
function color1(d) {
      return d > 2265178 ? '#E65100' :
             d > 3424307  ? '#FB8C00' :
             d > 983006  ? '#FFB74D' :
             d > 418405  ? '#FFCC80' :
                        '#FFE0B2';
  }
function style1(feature) {
    return {
      fillColor: color1(feature.properties.FlightNum),
      weight: 2,
      opacity: 1,
      color: 'grey',
      dashArray: '1',
      fillOpacity: Math.log10(feature.properties.FlightNum)/7.86
    }
    }

    var Marker = {
      radius: 8,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    };
  function pointToLayer(feature,latlng) {
    return L.circleMarker(latlng, Marker);
  }

//Slide 2: points, ArrDelayMinutes
var data2 = "https://raw.githubusercontent.com/zhaoanbei/Flight-Counts-and-Delay-Mapping-with-Leaflet/master/alldelay1_FeaturesToJSON.json"
function color2(d) {
    return d > 13604 ? '#E65100' :
           d > 25752  ? '#FB8C00' :
           d > 3888  ? '#FFB74D' :
           d > 1436  ? '#FFCC80' :
                      '#FFE0B2';
}
function style2(feature) {
  return {
    fillColor: color2(feature.properties.ArrDelayMinutes),
    weight: 2,
    opacity: 1,
    color: 'grey',
    dashArray: '1',
    fillOpacity: Math.log10(feature.properties.ArrDelayMinutes)/5
  }
  }
//Slide 3: points, ArrDelayMinutes/FlightNum
var data3 = "https://raw.githubusercontent.com/zhaoanbei/Flight-Counts-and-Delay-Mapping-with-Leaflet/master/allflightrate.geojson"
function color3(d) {
    return d > 0.0079 ? '#E65100' :
           d > 0.0113  ? '#FB8C00' :
           d > 0.0051  ? '#FFB74D' :
           d > 0.0033  ? '#FFCC80' :
                      '#FFE0B2';
}
function style3(feature) {
  return {
    fillColor: color3(feature.properties.rate),
    weight: 2,
    opacity: 1,
    color: 'grey',
    dashArray: '1',
    fillOpacity: Math.log10(feature.properties.ArrDelayMinutes)/5
  }
  }

//Slide 4: polylines, FlightNum
var data4 = "https://raw.githubusercontent.com/zhaoanbei/Flight-Counts-and-Delay-Mapping-with-Leaflet/master/pa1_FeaturesToJSON.json"
function color4(d) {
    return d > 227763 ? '#E65100' :
           d > 177082  ? '#FB8C00' :
           d > 128154  ? '#FFB74D' :
           d > 63245  ? '#FFCC80' :
                      '#FFE0B2';
}
function style4(feature) {
  return {
    color: color4(feature.properties.FlightNum),
    weight: feature.properties.FlightNum/100000,
    opacity: 1,
    dashArray: '1',
    fillOpacity: 0.7
  }
  }

  //Slide 3
  //continue data2

//Slide 5: polylines,ArrDelayMi
function color5(d) {
      return d > 2000 ? '#E65100' :
             d > 1600  ? '#FB8C00' :
             d > 1400  ? '#FFB74D' :
             d > 1000  ? '#FFCC80' :
                        '#FFE0B2';
  }
var style5 = function(feature) {
    return {
      color: color5(feature.properties.ArrDelayMi),
      weight: feature.properties.ArrDelayMi/1300,
      opacity: 1,
      dashArray: '1',
      fillOpacity: 0.7
    }
  }



var remove_all = function(data){
  _.each(data._layers,function(object){
        map.removeLayer(object);
      });
  };

//Change slide
      function change_1() {
        remove_all(Layer1)
        $.ajax(data1).done(function(data) {
          var parsedData = JSON.parse(data);
          Layer1 = L.geoJson(parsedData, {
            pointToLayer:pointToLayer,
            style: style1,
            onEachFeature: onEachFeature
          }).addTo(map);
        })
      }
      function change_2() {
        remove_all(Layer1)
        $.ajax(data2).done(function(data) {
          var parsedData = JSON.parse(data);
          Layer1 = L.geoJson(parsedData, {
            pointToLayer:pointToLayer,
            style: style2,
            onEachFeature: onEachFeature
          }).addTo(map);
        })
      }

      function change_3() {
        remove_all(Layer1);
        $.ajax(data3).done(function(data) {
          var parsedData = JSON.parse(data);
          Layer1 = L.geoJson(parsedData, {
            pointToLayer:pointToLayer,
            style: style3,
            onEachFeature: onEachFeature
          }).addTo(map);
        })
          }
          function change_4() {
            remove_all(Layer1);
            $.ajax(data4).done(function(data) {
              var parsedData = JSON.parse(data);
              Layer1 = L.geoJson(parsedData, {
                style: style4,
                onEachFeature: onEachFeature
              }).addTo(map);
            })
              }
              function change_5() {
                remove_all(Layer1);
                $.ajax(data4).done(function(data) {
                  var parsedData = JSON.parse(data);
                  Layer1 = L.geoJson(parsedData, {
                    style: style5,
                    onEachFeature: onEachFeature
                  }).addTo(map);
                })
                  }

      function change_text(num){
      var text = '#intro'+(num).toString();
      $(".title").not(text).hide();
      $(text).show();
    };


      var Count = 1;

      var operations = function(count){
        switch (count){
          case 1:
          $('.previous').hide();
          $('.next').show();
          change_text(Count);
          change_1();
          break;
          case 2:
          $('.previous').show();
          $('.next').show();
          change_text(Count);
          change_2();
          break;
          case 3:
          $('.next').show();
          $('.previous').show();
          change_text(Count);
          change_3();
          break;
          case 4:
          $('.next').show();
          $('.previous').show();
          change_text(Count);
          change_4();
          break;
          case 5:
          $('.next').hide();
          $('.previous').show();
          change_text(Count);
          change_5();
          break;
        }
      };

      $(document).ready(function() {

        $.ajax(data1).done(function(data) {
          var parsedData = JSON.parse(data);
          Layer1 = L.geoJson(parsedData, {
            pointToLayer:pointToLayer,
            style: style1,
            onEachFeature: onEachFeature
            }).addTo(map);
          })
        $(".title").not('#intro1').hide();
        $('.previous').hide();
      })

      $(".next").click(function() {
        Count += 1;
        if(Count > 5){
          Count = 1;
        }
        operations(Count);
        ;//.addTo(map)
      })

      $(".previous").click(function() {
        Count -= 1;
        if(Count < 1){
          Count = 5;
        }
        operations(Count);
      })
