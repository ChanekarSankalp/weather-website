const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')
const geocode = require('./utils/geocode')
const weather_forecast = require('./utils/weather_forecast')


//Define paths for express config
const publicDirPath = path.join(__dirname , '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine (view/template engine) and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather app',
        Name : 'Sankalp'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        Name : 'Sankalp Chanekar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        Name : 'Sankalp Chanekar',
        helpText : 'This is your example help text.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'The address is not found.'
        })
    }

    geocode( req.query.address, (error, data) => {
        if(error){
            return res.send({error : error})
        }

        weather_forecast({latitude : data.Latitude, longitude : data.Longitude, location : data.Location}, (error, forecastdata) => {
            if(error){
                return res.send({error : error})
            }

            res.send({
                location : data.Location,
                temperature : forecastdata.temperature
            })
        })
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title : 'Sankalp Industries',
        Name : 'Sankalp Chanekar',
        errorMessage : 'Page not found.'
    })
})

app.listen(3000, ()=>{
    console.log('Server is set up on port number 3000.')
})