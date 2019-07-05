console.log('is this thing on?');

let map, key;

// let myLatlng = new google.maps.LatLng(-34.397, 150.644);


const sendIt = {
    place: "boulder, co",
    what: "bars"
}


// let mapOptions = {
//   zoom: 8,
//   center: new google.maps.LatLng(-34.397, 150.644),
//   mapTypeId: 'satellite'
// };


function getMap() {
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
    });
}


$(document).ready(function() {

    $.post('/getIt', sendIt, (data) => {
        // console.log('from the server --> ', data.key);
    });





})  // z $(document).ready()
