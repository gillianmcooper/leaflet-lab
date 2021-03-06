// /* Example from Leaflet Quick Start Guide*/
//
//
// //setting the intial map view, ([posistion], zoom)
// // var map = L.map('map').setView([51.505, -0.09], 9);
//
// // //calling the arcgis tile layers from online, adding them to the map div using the call .addTo(map);
// //  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
// // 	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
// // 	maxZoom: 16
// // }).addTo(map);
//
//
// // //adding a point marker to the map using the lat/lon of the point
// // var marker = L.marker([51.5, -0.09]).addTo(map);
//
// // //adding a circle to the map at a specified lat/lon point, and defining the size of the circle
// // var circle = L.circle([51.508, -0.11], 500, {
// //     color: 'red',
// //     fillColor: '#f03',
// //     fillOpacity: 0.5
// // }).addTo(map);
//
//
// // //adding a triangular polygon to the map
// // var polygon = L.polygon([
// //     [51.509, -0.08],
// //     [51.503, -0.06],
// //     [51.51, -0.047]
// // ]).addTo(map);
//
//
// // //using leaflet shortcuts too add popups using the .bindpopup need the .openPopup(); to open the popup
// // //the open on tab allows the popup to close open popups automatically when a new popup is opened
// // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// // circle.bindPopup("I am a circle.").openPopup();
// // polygon.bindPopup("I am a polygon.").openPopup();
//
//
// // //creating a popup not attached to a point or polygon, just attached to a coordinate point
// // var popup = L.popup()
// //     .setLatLng([51.5, -0.09])
// //     .setContent("I am a standalone popup.")
// //     .openOn(map);
//
// // //built in click function with parameter e, .latlng is a built in leaflet function
// // function onMapClick(e) {
// //     alert("You clicked the map at " + e.latlng);
// // }
//
// // map.on('click', onMapClick);
//
// // var popup = L.popup();
//
//
// // //this builds a function that gives a pop up instead of an alert, the '.' functions being built in functions
// // //.openOn sets based on which object loading the function is called
// // function onMapClick(e) {
// //     popup
// //         .setLatLng(e.latlng)
// //         .setContent("You clicked the map at " + e.latlng.toString())
// //         .openOn(map);
// // }
//
// // map.on('click', onMapClick);
//
//
//
// //function to instantiate the Leaflet map
// function createMap(){
//     //create the map
//     var map = L.map('map', {
//         center: [20, 0],
//         zoom: 2
//     });
//
//     //pulling in the map box tile layer and setting the max zoom
//     L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
// 	maxZoom: 16
// 	}).addTo(map);
//
//     //call getData function
//     getData(map);
// };
//
// //setting the marker to a circle marker, defining as a universal varible to be pulled into the getdata function
// var geojsonMarkerOptions = {
//     radius: 9,
//     fillColor: "#662441",
//     color: "#662441",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };
// //Retrieving the data from the geojson and adding the data to the map once it is successfully retrieved
// function getData(map){
//     //load the data through ajax when it is successfully read peforming the annoymous function response
//     $.ajax("data/MegaCities.geojson", {
//         dataType: "json",
//         success: function(response){
//             //
//             // //create a Leaflet GeoJSON layer and add it to the map
//             L.geoJson(response, {
//                 pointToLayer: function (feature, latln) {
//                   //calling the geojson options to make the marker a circle at each lat/lon's specified in the geojson called through response
//                     return L.circleMarker(latln, geojsonMarkerOptions);
//                 }
//             }).addTo(map);
//         }
//     });
// };
//
//
// $(document).ready(createMap);
