const request = require('request')


// const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/nagpur.json?access_token=pk.eyJ1Ijoic2Fua2FscC1jaGFuZWthciIsImEiOiJja3ZkaDMybng2eXR3MzBzN3BocW54ZzFmIn0.V1DJ1CZL4g9Y0mReUJpdrQ&limit=1'

// request( {url: geocodeurl, json: true}, (error, response) =>{
//     if(error){
//         console.log("unable to connect to service!")
//     } else if(response.body.features.length === 0) {
//         console.log("incorrect input provided!")
//     } else{
//        console.log("Latitude: " + response.body.features[0].center[0] + " longitude: " + response.body.features[0].center[1])
//     }
// })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Fua2FscC1jaGFuZWthciIsImEiOiJja3ZkaDMybng2eXR3MzBzN3BocW54ZzFmIn0.V1DJ1CZL4g9Y0mReUJpdrQ&limit=1'

    request({ url : url, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to service.', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location, try another search.', undefined)
        } else{
            callback(undefined, {
                Latitude : response.body.features[0].center[0],
                Longitude : response.body.features[0].center[1],
                Location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
