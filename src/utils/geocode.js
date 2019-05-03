const request = require('request')

const geocode = (address,callback)=>{

   const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYmFzc2VtZWxzYXd5IiwiYSI6ImNqdXRkbjZpeTA0bDI0OXF0aWpueHdscnUifQ.QZL2AInPG0KxECBhFNZnmg'

   request({url , json:true}, (error,{body})=>{
         if(error){
            callback('Unable to connect to geo service',undefined)
         }else if(body.features.length==0){
            callback('Unable to find location, Try something else',undefined)
         }else{

            const latitude = body.features[0].center[1]
           const longitude = body.features[0].center[0]
           const location = body.features[0].place_name

           callback(undefined, {
              Latitude:latitude,
              Longitude:longitude,
              Location:location
         })  
      }
   })
}

module.exports = geocode