/*
todo:
    - click listener / pin popup
    - further style map / markers

done:
    - sorts by rating
    - sorts by number of ratings
    - map loads correctly
    - map loads in correct location (whether or not location data is
        accessible)
    - zooms to new area with search
    - initial styling
    - vue is up and running
    - api key is stored elsewhere but available for API call
    - autocomplete hooked up and working
    - jquery used to grab user input and pass to vue
    - makes api call and returns results
    - handles for errors in no results found
    - handles for blank input from the user into the searchTerm
*/


/* initializes variables */
let map, key;

/* initializes the map */
function getMap() {
    /* if the user allows location data to be accessed, it will zoom in on the approximate location */
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            thisLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(thisLoc);
            map.setZoom(10);
        })
    }

    /* if the user doesn't allow location data to be accessed, the map will zoom out and center on the entire US */
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(39.2660537, -97.7499592),
        zoom: 4,
        mapTypeIds: ['terrain', 'satellite', 'roadmap'],
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        fullscreenControl: false,

    });

    /* allows autocomplete */
    let input = document.getElementById('placeInput')
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);


    /* click event listener */





}  // z getMap()




/* initalizes the map, grabs the key, builds the script, builds the query from user input, and calls the vue method to send the request to the server */
$(document).ready(function() {
    /* send the autocomplete data to vue */
    $('#searchBtn').on('click', function(event) {
        event.preventDefault();

        /* build the search query */
        let searchTerm = {
            /* for use */
            // placeInput: $('#placeInput').val(),
            // toDo: $('#toDo').val(),

            /* for testing */
            placeInput: 'boulder, co',
            toDo: 'bar',
        }

        /* send the searchTerm to the vue method to make the API call */
        app.sendTheReq(searchTerm);
    })

    /* gets the API key and builds the script to initialize the map */
    $.post('/getIt', (data) => {
        key = data.key

        /* builds the script tag */
        let s = document.createElement('script');
        s.type = "text/javascript";
        s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=getMap`
        $('body').append(s);
    });
});


/* vue component for the search results */
Vue.component('search-results', {
    template:`
    <div class="card border-secondary mb-3">
        <div class="big-head card-header"> <h4>{{ name }}</h4> <h6 class="card-title"> {{ address }} </h6> </div>
        <div class="card-body text-secondary">
            <p class="card-text"> rating: {{ rating }} / 5 </p>
            <p class="card-text"> total user ratings: {{ totalratings }} </p>
            <p class="card-text"> price level: {{ price }} / 4 </p>
            <p class="card-text"> open now: {{ open }} </p>
        </div>
    </div>
    `,
   props: ['id', 'name', 'rating', 'price', 'address', 'totalratings', 'open']
})


/* vue instance */
const app = new Vue({
    el: `#app`,
    data: {
        placeInput: placeInput,
        toDo: toDo,
        pinArr: [],
        dataArr:[],
    },  // z data

    methods: {
        /* sends the request from the client to the server where the server makes the API call to google and then returns the reuslts */
        sendTheReq: function(searchTerm) {
            if(!searchTerm.placeInput > 0) {
                alert('enter a place to search');
            } else if(searchTerm.toDo === 'select one' || searchTerm.toDo === '' || searchTerm.toDo === null) {
                alert('select something to do')
            } else {
                $.post('/searchIt', searchTerm, function(dataFromServer) {
                    /* error handling for the event that no locations are returned */
                    if(dataFromServer.length > 0) {
                    /* push results from api call into array */
                        pinArr = dataFromServer.map((element, index) => {
                            /* sets the zoom and map center based on the 0th result from the server */
                            if(index === 0) {
                                map.setZoom(12);
                                map.setCenter(element.geometry.location);
                            }

                            /* adds the markers for the results */
                            // return (new google.maps.Marker({
                            //     position: element.geometry.location,
                            //     map: map
                            // }));

                            let marker = new window.google.maps.Marker({
                                position: element.geometry.location,
                                label: index.toString(),
                                map:map,
                            });

                            window.google.maps.event.addListener(marker, 'click', function() {
                                window.location.href = marker;
                            })
                        })

                        let dataArr = [];

                        for(let item of dataFromServer) {
                            app.dataArr.push({
                                id: item.id,
                                name: item.name,
                                rating: item.rating,
                                open: item.opening_hours.open_now,
                                address: item.formatted_address,
                                price: item.price_level,
                                totalRatings: item.user_ratings_total,
                            })
                        }
                    } else {
                        alert('sorry, no locations were found in that area. please try searching a new location or new type of location.')
                    }

                    // console.log('dataFromServer -->> ', dataFromServer)
                })
            }
        },

    },  // z methods


}) // z vue
