// console.log('is thiss thing on?');

/* initializes variables */
let map, key;


function getMap() {
    map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: 'satellite'
    });

    /* autocomplete */
    let input = document.getElementById('placeInput')
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
}

/* initalizes the map */
$(document).ready(function() {
    // function getMap() {
    //     map = new google.maps.Map(document.getElementById('map'), {
    //           center: new google.maps.LatLng(-34.397, 150.644),
    //           zoom: 8,
    //           mapTypeId: 'satellite'
    //     });
    //
    //     /* autocomplete */
    //     let input = document.getElementById('placeInput')
    //     var autocomplete = new google.maps.places.Autocomplete(input);
    //     autocomplete.bindTo('bounds', map);
    // }

    /* send the autocomplete data to vue */
    $('#searchBtn').on('click', function(event) {
        event.preventDefault();

        // const placeInput = $('#placeInput').val();
        // const toDo = $('#toDo').val();
        // app.$data.placeInput = $('#placeInput').val();
        // app.$data.toDo = $('#toDo').val();

        let searchTerm = {
            placeInput: $('#placeInput').val(),
            toDo: $('#toDo').val(),
        }

        console.log('-->>> ', app.$data, '\n searchTerm  ', searchTerm)

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




const app = new Vue({
    el: `#app`,
    data: {
        placeInput: placeInput,
        toDo: toDo,
    },  // z data

    methods: {
        // getKeyBuildScript: function() {
        //     $.post('/getIt', (data) => {
        //         key = data.key
        //
        //         /* builds the script tag */
        //         let s = document.createElement('script');
        //         s.type = "text/javascript";
        //         s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=getMap`
        //         $('body').append(s);
        //     });
        // },

        sendTheReq: function(searchTerm) {
            // event.preventDefault();
            console.log('searchTerm --> ', searchTerm)

            if(!this.placeInput > 0) {
                alert('enter a place to search');
            } else if(!this.toDo) {
                alert('select something to do')
            } else {
                $.post('/searchIt', searchTerm, function(dataFromServer) {


                    console.log('dataFromServer -->> ', dataFromServer)
                })
            }
        },

    },  // z methods


}) // z vue
