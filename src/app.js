const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mike'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mike'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }


    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error)
            return res.send({ error })
        
        forecast(latitude, longitude, (error, forecastData) => {
        
            if (error)
                return res.send({ error })
            
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })

    })
})




app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helping message',
        title: 'Help',
        name: 'Mike'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Mike'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Mike'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})