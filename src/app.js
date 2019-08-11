const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port = process.env.PORT

// define paths for express config
const publicdirectorypath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

// setup static directory to server
app.use(express.static(publicdirectorypath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sumit Kumar'
    })    
}) 

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name:'Sumit kumar'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        name:'Sumit Kumar'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Sumit Kumar',
        ErrorMessage:'Help Article not found'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude , longitude , (error,forecastdata) => {
          if(error){
            return res.send({error})   
        }
        res.send({
            forecast: forecastdata,
            location,
            address: req.query.address
        })
        
    })
})
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Sumit Kumar',
        ErrorMessage:'page not found'
    })
})


app.listen(port, function(){
   console.log("Server Has Started!!")
})

