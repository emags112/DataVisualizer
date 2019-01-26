const   express     = require("express"),
        request = require("request"),
        bodyParser = require("body-parser"),
        router = express.Router(),
        apiKey = process.env.NPSKEY ,
        apiBaseURL = "https://developer.nps.gov/api/v1",
        googleKey = process.env.GOOGLEKEY,
        owmAPIKey = process.env.OWMKEY,
        owmAPIBase = "http://api.openweathermap.org/data/2.5/weather?";

router.get("/", function(req, res) {
  request(apiBaseURL + "/articles?limit=5&api_key=" + apiKey, function(
    error,
    response,
    body
  ) {
    if (error) {
      console.log(error);
    } else {
      articles = JSON.parse(body);
      res.render("home", { articles: articles });
    }
  });
});

router.post("/", function(req, res) {
  let dataString = req.body.searchString;
  let dataState = req.body.state;
  if (dataString === "") {
    search = "/_" + "/" + dataState;
  } else {
    search = "/" + dataString + "/" + dataState;
  }
  res.redirect(search);
});

module.exports = router;
