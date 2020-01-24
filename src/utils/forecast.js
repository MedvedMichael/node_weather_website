const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/fdb4ae0dd55ce1f91e0296269d5eebd4/' + latitude + ',' + longitude + '?units=si'

    request({url, json:true}, (error,{body}={}) => {
        const {error:forecastError,daily,currently} = body
        
        if(error){
            callback('There is no Internet connection')
        }
        else if(forecastError)
        {
            callback('Unable to find location')
        }
        else{
            callback(undefined, daily.data[0].summary + " It is currently " + currently.temperature + " degrees out. There is " + currently.precipProbability + "% chance to rain")
        }
    })
}

module.exports = forecast