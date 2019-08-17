const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDoRlTwsYiTo7jhQsFb0UWYOTqXrdHnPHM',
    Promise: Promise
});

function getUserRoute(formData){ // object full of user and destination properties only
    const {user, latitude, longitude} = formData;
    let request = {
        origin: {
            latitude: user.lat,
            longitude: user.long
        },
        destination: {
            latitude: latitude,
            longitude: longitude
        },
        mode: 'transit',
        transit_mode: 'subway' //check docs for other potentially useful optional parameters
    }
    googleMapsClient.directions(request).asPromise()
    .then(response => {
        //console.log(response);
        //console.log(response.json);
        console.log(response.json.routes);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = getUserRoute;