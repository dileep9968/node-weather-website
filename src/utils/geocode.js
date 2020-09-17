const request = require('request')

const geocode=(address,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZGlsZWVwOTk2OCIsImEiOiJja2Y1NDFscWowZHp5MnFsY3ZzeGE3eXhjIn0.b1NQna3EzKXzvgMERTPsGQ"
    request({url:url,json: true},(error,response)=>{
        if(error){
            callback('Unable to connect with geo services!',undefined)
        } else if(response.body.features.length==0){
            callback('Please search anthor place! Try again',undefined)
        }else {
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode