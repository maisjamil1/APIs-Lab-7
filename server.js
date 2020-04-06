'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();
const superagent= require('superagent')
app.use(cors());

app.get('/location', locationHandler);
app.get('/weather', weatherHandler);




function locationHandler(request, response) {

  const city = request.query.city; // query string (what we will enter in the front end)
  superagent(
    `https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`
  )
    .then((res) => {
      console.log('zzzz' , res);
      
      const geoData = res.body;
      console.log("whats this ? :",geoData);
      
      const locationData = new Location(city, geoData);
      response.status(200).json(locationData);
    })
    .catch((errT)=> errorHandler(errT, request, response));
}


function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

//____________________

  function weatherHandler(request, response) {
    superagent(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.search_query}&key=${process.env.WEATHER_API_KEY}`
    )
      .then((weatherRes) => {
        console.log(weatherRes);
        const weatherSummaries = weatherRes.body.data.map((day) => {
          return new Weather(day);
        });
        response.status(200).json(weatherSummaries);
      })
      .catch((errT)=> errorHandler(errT, request, response));
  }
  
  
  function Weather(day) {
    this.forecast = day.weather.description;
    this.time = new Date(day.valid_date).toString().slice(0, 15);
  }







//______________________________________________
app.use('*', notFoundHandler);

function notFoundHandler(request, response) {
  response.status(404).send('page Not Found');
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}



app.listen(PORT,() => console.log('host :' , PORT))