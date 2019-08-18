const polyline = require('polyline');

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
        let routes = response.json.routes;
        let path = "";
        if (routes.length > 0){
            let pathLine = routes[0].overview_polyline.points;
            //path is an array of arrays of coordinates
            //after path is computed, send it to the map component on the front-end and create a PathLayer based on these coordinates
            //(note that path returns coordinates in order [latitude, longitude], while PathLayer accepts coordinates in order [longitude, latitude])
            path = polyline.decode(pathLine);
            return path;
        }
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = getUserRoute;