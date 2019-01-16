const express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  app = express(),
  apiKey = process.env.NPSKEY,
  apiBaseURL = "https://api.nps.gov/api/v1",
  googleKey = process.env.GOOGLEKEY,
  owmAPIKey = process.env.OWMKEY,
  owmAPIBase = "http://api.openweathermap.org/data/2.5/weather?";

const parkRoutes   = require('./routes/parks'),
  indexRoutes   = require('./routes/index');
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(indexRoutes);
app.use(parkRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log("view the world in a different way");
});
