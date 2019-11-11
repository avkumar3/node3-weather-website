const request = require('request')

const geocode = (address, callback) => {
    console.log(address)
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYXZrdW1hcjMiLCJhIjoiY2sydG9zczJ1MHdiZjNtbnhwZHdjZHZ3dCJ9.zSgt5NupCH0mL9UJW0TlkQ&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            console.log(body)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            // console.log(body)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode