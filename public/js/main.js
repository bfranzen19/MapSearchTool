// console.log('is thiss thing on?');

/* initializes variables */
let map, key;

/* initalizes the map */
function getMap() {
    map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: 'satellite'
    });
}


/* query to send to the api */
const sendIt = {
    place: "boulder, co",
    what: "bars"
}


$(document).ready(function() {
    /* grabs the api key */
    $.post('/getIt', sendIt, (data) => {
        key = data.key

        /* builds the script tag */
        let s = document.createElement('script');
        s.type = "text/javascript";
        s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=getMap`
        $('body').append(s);
    });


})  // z $(document).ready()
