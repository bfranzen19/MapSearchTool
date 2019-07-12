/* initialize necessary variables */
let map, key;

/* initialize the map */
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
        mapTypeIds: ['hybrid', 'satellite', 'terrain', 'roadmap'],
        // mapTypeId: 'hybrid',
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        fullscreenControl: false,
        gestureHandling: 'greedy',
    });

    /* allows autocomplete */
    let input = document.getElementById('placeInput')
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
}  // z getMap()


/* initalizes the map, grabs the key, builds the script, builds the query from user input, and calls the vue method to send the request to the server */
$(document).ready(function() {
    // $('#searchAgain').hide();

    /* send the autocomplete data to vue */
    $('#searchBtn').on('click', function(event) {
        /* build the search query */
        let searchTerm = {
            /* for use */
            placeInput: $('#placeInput').val(),
            toDo: $('#toDo').val(),

            /* test location and activity */
            // placeInput: 'boulder, co',
            // toDo: 'bar',
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
        <div class="big-head card-header"><h4> {{index}}. {{ name }} </h4> <h6 class="card-title"> {{ address }} </h6> </div>
        <div class="card-body text-secondary">
            <p class="card-text"> rating: {{ rating }} / 5 </p>
            <p class="card-text"> total user ratings: {{ totalratings }} </p>
            <p class="card-text"> price level: {{ price }} / 4 </p>
            <p class="card-text"> open now: {{ open }} </p>
        </div>
    </div>
    `,
   props: ['index', 'id', 'name', 'rating', 'price', 'address', 'totalratings', 'open']
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
                        /* hides the search button after results are received */
                        $('#searchBtn').hide();

                        /* creates the reload button */
                        let reloadBtn = document.createElement('button');
                        reloadBtn.type = 'button';
                        reloadBtn.setAttribute('class', 'formData btn btn-outline-danger');
                        reloadBtn.setAttribute('id', 'searchAgain')
                        reloadBtn.innerHTML = 'reload';
                        $('#form').append(reloadBtn);

                        /* fires the page reload when clicked */
                        $('#searchAgain').show().on('click', function(event) {
                            location.reload();
                        })

                        /* push results from api call into array */
                        pinArr = dataFromServer.map((element, index) => {
                            /* sets the zoom and map center based on the 0th result from the server */
                            if(index === 0) {
                                map.setZoom(12);
                                map.setCenter(element.geometry.location);
                                map.setMapTypeId('hybrid');
                            }

                            /* creates a data array and pushes info for each result into each object */
                            let label = index + 1
                            let dataArr = [];

                            app.dataArr.push({
                                index: label,
                                id: element.id,
                                name: element.name,
                                rating: element.rating,
                                open: element.opening_hours.open_now,
                                address: element.formatted_address,
                                price: element.price_level,
                                totalRatings: element.user_ratings_total,
                            })

                            /* creates the marker and adds the label to the marker, starting at 1 instead of 0 */
                            let marker = new window.google.maps.Marker({
                                position: element.geometry.location,
                                label: {
                                    text: label.toString(),
                                    color: 'white',
                                },
                                map:map,
                            });

                            /* sets the content for the info window */
                            let contentStr = `
                                <div id="content">
                                    <h6>${app.dataArr[index].name.toString()}</h6>
                                </div>` +
                                `<p>
                                    rating: ${app.dataArr[index].rating.toString()} / 5
                                <br/>
                                    total ratings: ${app.dataArr[index].totalRatings.toString()}
                                </p>`

                            /* creates the info window with the content */
                            let infowindow = new google.maps.InfoWindow({
                                content: contentStr,
                            })

                            /* creates the listener for the map markers and opens the info window */
                            window.google.maps.event.addListener(marker, 'click', function(event) {
                                infowindow.open(map, marker);
                            })

                        })

                    } else {
                        alert('sorry, no locations were found in that area. please try searching a new location or new type of location.')
                    }
                })
            }
        },  // z sendTheReq()
    },  // z methods
}) // z vue
