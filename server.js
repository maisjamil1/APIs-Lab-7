// 'use strict';
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');

// const PORT = process.env.PORT || 4000;
// const app = express();
// app.use(cors());


// app.get('/location', (request, response) => {
//   try {
//     const geoData = require('./data/geo.json');
//     const city = request.query.city;
//     const locationData = new Location(city, geoData);
//     response.status(200).json(locationData);
//   } catch (error) {
//     errorHandler(error, request, response);
//   }
// });


// function Location(city, geoData) {
//   this.search_query = city;
//   this.formatted_query = geoData[0].display_name;
//   this.latitude = geoData[0].lat;
//   this.longitude = geoData[0].lon;
// }

// //____________________




// app.get('/weather', (request, response) => {
//   try {
    
//     const weatherDateData = require('./data/darksky.json');
//     let DateWeatherArr=[];
//     // const city$ = request.query.city;
//     for(let i=0;i<weatherDateData.data.length;i++){
//       // const dateAndWeatherObj$$ = new weather(city$,weatherDateData);
//       let dateAndWeatherObj$$ = new weather(weatherDateData,i);
//       DateWeatherArr.push(dateAndWeatherObj$$);
//   }
//   response.send(DateWeatherArr);
//   } catch (error) {
//     errorHandler(error, request, response);
//   }
// });


// // function weather(city$,fileDarkSky) {
  
//   function weather(fileDarkSky,indexx) {
//     // this.search_query = city$;
//     this.time =new Date(fileDarkSky.data[indexx].valid_date).toDateString();
//     // this.time = new Date(fileDarkSky.data[indexx].valid_date);
//     this.forecast = fileDarkSky.data[indexx].weather.description;
//     weather.all.push(this);
  
//   }
//   weather.all=[];

  







// //______________________________________________
// app.use('*', notFoundHandler);

// function notFoundHandler(request, response) {
//   response.status(500).send('Sorry, something went wrong');
// }

// app.listen(PORT);