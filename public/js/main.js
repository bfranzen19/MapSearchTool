console.log('is this thing on?');


$(document).ready(function() {
    $.get('/test', data => {
        console.log(data)
    })





})  // z $(document).ready()
