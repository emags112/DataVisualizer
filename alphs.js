// this is a sandbox test file used to build the scripts used for the main app

const   express     =   require('express'),
        request     =   require('request'),
        bodyParser  =   require('body-parser'),
        app         =   express(),
        apiKey      =   '&api_key=Y2twmHii37VedsrgffYyooeLLobd4WOBPvEVW5zg',
        apiBaseURL  =   'https://api.nps.gov/api/v1',
        owmAPIKey   =   '',
        owmAPIBase  =   'http://api.openweathermap.org/data/2.5/weather?',
        lat         =   '32.20909636',
        long        =   '-110.7574974';

request(owmAPIBase + 'lat=' + lat + '&lon=' + long + '&cnt=10&APPID=f484f0da63efa805be72b9b2bae63cb7', function (error, response, body) {
    if(error){
        res.send(error);
    } else {
        let weather = JSON.parse(body);
        console.log(weather);
    }
})