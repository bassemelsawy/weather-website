const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecaste')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const ViewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',ViewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Bassem El-Sawy'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Bassem El-Sawy'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'help me bitch',
        name:'Bassem El-Sawy'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error: 'You must provide and Address'
        })
    }

    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{

        if(error){
           return res.send({
               error
           })
        }
        forecast(Latitude,Longitude,(error, forecastdata) => {
           
        if(error){
            return res.send({
                error
            })
        }
            res.send({
                Forecast: forecastdata,
                Location :Location,
                Address:req.query.address
            })
         })
     
     })
})

app.get('/product',(req,res)=>{
    res.send({
        product: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        ErrorMessage:'Help article not found!!',
        name:'Bassem El-Sawy'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        ErrorMessage:'Page not found!!',
        name:'Bassem El-Sawy'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})