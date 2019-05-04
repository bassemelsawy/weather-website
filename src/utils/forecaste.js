const request = require('request')

const forecast = (long,lati, callback)=>{

    const url = 'https://api.darksky.net/forecast/36d1683539c059b71808746054ad204c/'+long+','+lati+''

    request({url, json:true},(error, {body})=>{
           if(error){
              callback('Unable to connect to weather service',undefined)
           }else if(body.error){
             callback('Unable to find location',undefined)
           }else{
           const temp = body.currently.temperature
           const precip = body.currently.precipProbability
           const summaryy = body.daily.data[0].summary 
           const tempHigh = body.daily.data[0].temperatureHigh 
           const tempLow = body.daily.data[0].temperatureLow
           callback(undefined, summaryy+ ' It is currently ' + temp + ' degress out. This high today is ' + tempHigh + ' with a low of ' + tempLow + '. There is a ' + precip + '% chance of rain.')
           }
           
        })
}

module.exports = forecast