const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

console.log(__dirname)
console.log(__filename)

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

//Define paths for Express config

const app = express()
app.use(express.static(publicDirectoryPath))

// Setup handle bars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Vimal Venugopal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Application',
        name: 'Vimal Venugopal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather Application',
        name: 'Vimal Venugopal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must not address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            console.log(latitude + " " +  longitude + location)
            if (error) {
                return res.send({error})
            }

            return res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })

    })



})

app.get("/products", (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }


    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage:'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage:'Page not found'
    })
})




// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})