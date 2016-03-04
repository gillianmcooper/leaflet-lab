/* Example from Leaflet Quick Start Guide*/


//setting the intial map view, ([posistion], zoom)
// var map = L.map('map').setView([51.505, -0.09], 9);

// //calling the arcgis tile layers from online, adding them to the map div using the call .addTo(map);
//  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
// 	maxZoom: 16
// }).addTo(map);


// //adding a point marker to the map using the lat/lon of the point
// var marker = L.marker([51.5, -0.09]).addTo(map);

// //adding a circle to the map at a specified lat/lon point, and defining the size of the circle
// var circle = L.circle([51.508, -0.11], 500, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(map);


// //adding a triangular polygon to the map
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);


// //using leaflet shortcuts too add popups using the .bindpopup need the .openPopup(); to open the popup
// //the open on tab allows the popup to close open popups automatically when a new popup is opened
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.").openPopup();
// polygon.bindPopup("I am a polygon.").openPopup();


// //creating a popup not attached to a point or polygon, just attached to a coordinate point
// var popup = L.popup()
//     .setLatLng([51.5, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(map);

// //built in click function with parameter e, .latlng is a built in leaflet function
// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }

// map.on('click', onMapClick);

// var popup = L.popup();


// //this builds a function that gives a pop up instead of an alert, the '.' functions being built in functions
// //.openOn sets based on which object loading the function is called
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);

//the links to the alternate map tile and attribution
var streets =    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}),
night = L.tileLayer('http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	maxZoom: 19
});

//function to instantiate the Leaflet map
function createMap(){
    //create the map, and adding the layer options
    var map = L.map('map', {
        center: [44, 14],
        zoom: 5,
        layer:[night]
    });

    //defining the other base maps to switch too
    var baseMaps = {
        "Night": night,
        "Streets": streets
    };
L.control.layers(baseMaps).addTo(map);
//setting the initial base map
L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	maxZoom: 19
}).addTo(map);
    //call getData function
    getData(map);
};
//create Sequence control buttons and range slider function, takes the values map and attributes
function createSequenceControls(map, attributes){
  // creates the variable sequence control layer
  var SequenceControl = L.Control.extend({
//creating the dive container for the sequence contol buttons on the map and adding it to the map
    onAdd: function(map){
      var container = L.DomUtil.create('div', 'sequence-control-container');
      $(container).append('<input class="range-slider" type="range">');

//add skip buttons both forward and reverse- styling is in the css
$(container).append('<button class="skip" id="reverse" title="Reverse">Reverse</button>');
$(container).append('<button class="skip" id="forward" title="Forward">Skip</button>');

return container;
    }
  });
//defining the range control on the slider bar for the number of years to scroll through
map.addControl(new SequenceControl());
 $('.range-slider').attr({
   max: 11,
   min: 0,
   value: 0,
   step: 1
 });



 $('.skip').click(function(){
    var index = $('.range-slider').val();
    if($(this).attr('id')=='forward'){
      index++;
      index = index > 11 ? 0 : index;
    } else if ($(this).attr('id') == 'reverse'){
      index--;
      index = index < 0 ? 11 : index;
    };

  $('.range-slider').val(index);
 updatePropSymbols(map, attributes[index]);
  console.log(attributes[index]);
});

  $('.range-slider').on('input', function(){
    var index = $(this).val();
  updatePropSymbols(map, attributes[index]);
  });
};



//setting the marker to a circle marker, defining as a universal varible to be pulled into the getdata function
function pointToLayer(feature, latlng, attributes){
//selecting the attribute data year to display
  var attribute = attributes[0];
  var geojsonMarkerOptions = {
      radius: 9,
      fillColor: "#ff00bf",
      color: "#662441",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };
//this selects the attribute from the feature by year
  var attValue = Number(feature.properties[attribute]);

//this pulls in the geojsonMarkerOptions eg. circle size ect. using the assigned attribute value
  geojsonMarkerOptions.radius = calcPropRadius(attValue);

  //logging to the console the features and attributes
       console.log(feature.properties, attValue);

// this creates the layer with the proportional symbols- places them with the lat and lon
  var layer = L.circleMarker(latlng, geojsonMarkerOptions);

//this defines the popup content
  var panelContent = "<p><b>Country: </b>" + feature.properties.Country + "</p>";

//putting the content for the mouse over function
  var popupContent = feature.properties.Country + ", ("+ feature.properties.Code+")";

// this attaches the popup to the layer
  layer.bindPopup(popupContent,{
    offset: new L.Point(0, -geojsonMarkerOptions.radius),
    closeButton: false
  });

  layer.on({
    mouseover:function(){
      this.openPopup();
    },
    mouseout: function(){
      this.closePopup();
    },
    click: function(){
      $("#popup-info").html(panelContent);
    }
  });

  return layer;
};
//updating the proportional symbols with the slider bar based on what year it is
function updatePropSymbols(map, attribute){
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            var props = layer.feature.properties;
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);
//setting the popup content for each country, updating as the year scrolls through
            var popupContent = "<p><b>Country: " + props.Country + "</p>";
            var year = attribute.split("_")[1];
            popupContent += "</p><p><b>Women in Government "+ attribute + ":</b> " + props[attribute] + " %  </p>";
            layer.bindPopup(popupContent,{
              offset: new L.Point(0, -radius)
            })

        };
    });
};


//scaling each circle marker as a proportional symbol
function calcPropRadius(attValue) {
  //the factor to scale each symbol by
  var scaleFactor = 90;
  var area = attValue * scaleFactor;
  var radius = Math.sqrt(area/Math.PI);

  return radius;
};
// calling through each year of the geojson data
function processData(data){
  var attributes=[];
  var properties=data.features[0].properties;
  for (var attribute in properties){

    if (attribute.indexOf ("Per") > -1){
      attributes.push(attribute);
    };
  };
  return attributes;
};

//defining the proportional symbols to express the data- will be manipulated above by year
function createPropSymbols(data, map, attributes){
//creating a geojson layer too add the proportional symbols to the Map
  L.geoJson(data, {
    pointToLayer: function(feature, latlng){
      return pointToLayer(feature, latlng, attributes);
    }
  }).addTo(map);
};

//Retrieving the data from the geojson and adding the data to the map once it is successfully retrieved
function getData(map){
    //load the data through ajax when it is successfully read peforming the annoymous function response
    $.ajax("data/women_in_power.geojson", {
        dataType: "json",
        success: function(response){
          var attributes = processData(response);
//calling the createProportional symbol function
          createPropSymbols(response, map, attributes);
//calling the create sequence control           
          createSequenceControls(map, attributes);
        }
    })
};


$(document).ready(createMap);
