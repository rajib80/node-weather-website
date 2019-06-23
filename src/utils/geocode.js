const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWRzemFtYW5yYWppYiIsImEiOiJjangzaGo0eXEwYzNxM3lvYWxmNG0xYjhiIn0.6yMBkCixeYvTWq2MaZwcHw&limit=1'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect with location service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Cannot find location. Try different search.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode