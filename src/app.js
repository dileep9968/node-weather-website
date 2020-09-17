const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app=express()

// Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlers engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather App',
        name:'Dileep'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Dileep'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Dileep'
    })
})
app.get('',(req,res)=>{
    res.send('<h1>Hello express</h1>')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provides address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(({error}))
        }

        forecast(latitude, longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Dileep',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Dileep',
        errorMessage:'Page not found'
    })
})


//app.com
//app.com/help
//app.com/about
app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})