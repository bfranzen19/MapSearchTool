// console.log('is thiss thing on?');

/* initializes variables */
let map, key;

/* initializes the map */
function getMap() {
    /* if the user allows location data to be accessed, it will zoom in on the approximate location */
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            thisLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(thisLoc);
            map.setZoom(9);
        })
    }

    /* if the user doesn't allow location data to be accessed, the map will zoom out and center on the entire US */
    map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(39.2660537, -97.7499592),
          zoom: 4,
          mapTypeId: 'terrain'
    });

    /* allows autocomplete */
    let input = document.getElementById('placeInput')
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
}

/* initalizes the map */
$(document).ready(function() {
    /* send the autocomplete data to vue */
    $('#searchBtn').on('click', function(event) {
        event.preventDefault();

        /* build the search query */
        let searchTerm = {
            placeInput: $('#placeInput').val(),
            toDo: $('#toDo').val(),
        }

        /* send the searchTerm to the vue method to make the API call */
        app.sendTheReq(searchTerm);
    })

    /* gets the API key and builds the script */
    $.post('/getIt', (data) => {
        key = data.key

        /* builds the script tag */
        let s = document.createElement('script');
        s.type = "text/javascript";
        s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=getMap`
        $('body').append(s);
    });
});



/* vue instance */
const app = new Vue({
    el: `#app`,
    data: {
        placeInput: placeInput,
        toDo: toDo,
    },  // z data

    methods: {
        /* sends the request from the client to the server where the server makes the API call to google and then returns the reuslts */
        sendTheReq: function(searchTerm) {
            if(!this.placeInput > 0) {
                alert('enter a place to search');
            } else if(!this.toDo) {
                alert('select something to do')
            } else {
                $.post('/searchIt', searchTerm, function(dataFromServer) {
                    /* error handling for the event that no locations are returned */
                    if(dataFromServer.length > 0) {
                    /* push results from api call into array */
                        let resultsArr = dataFromServer.map((element, index) => {
                            /* sets the zoom and map center based on the 0th result from the server */
                            if(index === 0) {
                                map.setZoom(12);
                                map.setCenter(element.geometry.location);
                            }

                            /* adds the markers for the results */
                            return (new google.maps.Marker({
                                position: element.geometry.location,
                                map: map
                            }));
                        })
                    } else {
                        alert('sorry, no locations were found in that area. please try searching a new location or new type of location.')
                    }

                    // console.log('dataFromServer -->> ', dataFromServer)
                })
            }
        },

    },  // z methods


}) // z vue
