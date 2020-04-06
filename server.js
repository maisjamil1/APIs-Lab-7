'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();
const superagent= require('superagent')
app.use(cors());

app.get('/location', locationHandler);
//app.get('/weather', weatherHandler);




function locationHandler(request, response) {
// app.get('/location', (request, response) => {
  // try {
  //   const geoData = require('./data/geo.json');
  //   const city = request.query.city;
  //   const locationData = new Location(city, geoData);
  //   response.status(200).json(locationData);
  // } catch (error) {
  //   errorHandler(error, request, response);
  // }});
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
    
}


function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

//____________________




// app.get('/weather', (request, response) => {
  // try {
    
  //   const weatherDateData = require('./data/darksky.json');
  //   let DateWeatherArr=[];
  //   for(let i=0;i<weatherDateData.data.length;i++){
  //     let dateAndWeatherObj$$ = new weather(weatherDateData,i);
  //     DateWeatherArr.push(dateAndWeatherObj$$);
  // }
  // response.send(DateWeatherArr);
  // } catch (error) {
  //   errorHandler(error, request, response);
  // }});

  // commented 2
  // superagent(
  //   `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.search_query}&key=${process.env.WEATHER_API_KEY}`
  // )
  //   .then((weatherRes) => {
  //     console.log(weatherRes);
  //     const weatherSummaries = weatherRes.body.data.map((day) => {
  //       return new Weather(day);
  //     });
  //     response.status(200).json(weatherSummaries);
  //   })
  //   .catch((err) => errorHandler(err, request, response))





//commented 3   
  // function weather(fileDarkSky,indexx) {
  //   this.time =new Date(fileDarkSky.data[indexx].valid_date).toDateString();
  //   this.forecast = fileDarkSky.data[indexx].weather.description;
  //   weather.all.push(this);
  
  // }
  // weather.all=[];

  







//______________________________________________
app.use('*', notFoundHandler);

function notFoundHandler(request, response) {
  response.status(500).send('Sorry, something went wrong');
}

app.listen(PORT,() => console.log('host :' , PORT))