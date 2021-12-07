const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=56c246b0a8f276e61aba8ee8b11f25a9&query=21.1458,79.0882'

// request( {url : url, json: true} , (error, response) =>{
//     if(error){
//         console.log("unable to connect to service!")
//     } else if(response.body.error){
//         console.log("incorrect input provided!")
//     }
//     else{
//         console.log("The temperature is " + response.body.current.temperature + " and humidity is " + response.body.current.humidity + ".")
//     }
// })

const weather_forecast = (data, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=56c246b0a8f276e61aba8ee8b11f25a9&query=' + data.longitude + ',' + data.latitude

    request({ url : url, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to service', undefined)
        } else if(response.body.error){
            callback('Unable to find Location', undefined)
        } else{
            callback(undefined, {
                temperature : response.body.current.temperature,
                humidity : response.body.current.humidity
            })
        }
    })
}

module.exports = weather_forecast


