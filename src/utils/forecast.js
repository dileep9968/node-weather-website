const request = require('request')

const forecast = (latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a93ce0bd2c067abe158d827e6f5d287c&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({url: url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(response.body.error){
            callback('Unable to find the weather of location',undefined)
        }else{
            callback(undefined,{
                temperature:response.body.current.temperature,
                feelslike:response.body.current.feelslike
            })
        }
    })
}

module.exports=forecast