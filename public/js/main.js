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
    // let autocomplete = new google.maps.places.Autocomplete($('#place').val());
}




const app = new Vue({
    el: `#app`,
    data: {
        place: '',
        toDo: '',
    },  // z data

    methods: {
        sendTheReq: function() {
            if(!this.place) {
                alert('enter a place to search');
            } else if(!this.toDo) {
                alert('select something to do')
            } else {
                $.post('/searchIt', { place: this.place, toDo: this.toDo }, function(dataFromServer) {
                    console.log('dataFromServer -->> ', dataFromServer)
                })
            }
        },
        getKeyBuildScript: function() {
            $.post('/getIt', (data) => {
                key = data.key

                /* builds the script tag */
                let s = document.createElement('script');
                s.type = "text/javascript";
                s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=getMap`
                $('body').append(s);
            });
        },
        setAutoComplete: function() {
            let autocomplete = new google.maps.places.Autocomplete(document.getElementById('place'));
        },
    },  // z methods

    beforeMount() {
        this.getKeyBuildScript()  // runs the getMap() on load
    },  // z beforeMount()

}) // z vue
