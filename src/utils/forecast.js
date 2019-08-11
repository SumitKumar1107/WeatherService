const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/1582f5b950e4d8c00105118c00193af6/' +latitude + ',' + longitude 
    
    request({url,json:true},(error,{body}) => {
        if(error)
        {
            callback('unable to connect to weather service',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location',undefined)
        }
        else
        {
             callback(undefined, body.daily.data[0].summary + ' It is currently ' + (body.currently.temperature-32)*5/9 + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports = forecast