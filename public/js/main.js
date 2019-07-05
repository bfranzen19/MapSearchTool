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
// const sendIt = {
//     place: "boulder, co",
//     what: "bars"
// }


var app = new Vue({
    el: `#app`,
    data: {
        title: `let's get searchin'!`
    },

    methods: {
        getKeyBuildScript: function() {
            $.post('/getIt', (data) => {
                key = data.key

                /* builds the script tag */
                let s = document.createElement('script');
                s.type = "text/javascript";
                s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=getMap`
                $('body').append(s);
            });
        },
    },  // z methods

    beforeMount() {
        this.getKeyBuildScript()  // runs the getMap() on load
    },  // z beforeMount()

}) // z vue
