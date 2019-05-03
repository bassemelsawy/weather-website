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
        callback(undefined,body.daily.data[0].summary+' Its currently ' + temp +' degrees out. There is a ' + precip+'% chance to rain.' )
           }
           
        })
}

module.exports = forecast