/**
* @param context {WebtaskContext}
*/
require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = function(context, req, reply) {
  var name = context.query.name || 'Andrea';
  var city = context.query.city || 'Rome';
  var today = new Date();
  var meteoData;

  getMeteoData(today, city)
    .then(function(data) {
      meteoData = data[0];
      var message = composeMessage({ hello: name, date: today, meteo: meteoData })
      reply(null, { hello: name, date: today, meteo: meteoData });
    });
};

function getMeteoData(date, city) {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  
  return fetch("https://www.metaweather.com/api/location/search/?query=" + city)
    .then(function(response) {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then(function(data) {
      return fetch("https://www.metaweather.com/api/location/" + data[0].woeid + "/" + year + "/" + month + "/" + day)
          .then(function(response) {
            if (response.status == 200) {
              return response.json();
            }
          });
    });
}

function getDayOfWeek(date) {
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return weekday[date.getDay()];
}

function composeMessage() {
   res.writeHead(200, { 'Content-Type': 'text/html '});
  res.end('<h1>Hello, world!</h1>');
}