const express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  router = express.Router(),
  apiKey = process.env.NPSKEY,
  apiBaseURL = "https://api.nps.gov/api/v1",
  googleKey = process.env.GOOGLEKEY,
  owmAPIKey = process.env.OWMKEY,
  owmAPIBase = "http://api.openweathermap.org/data/2.5/weather?";

router.get("/list/abc", function(req, res) {
  request(apiBaseURL + "/parks?limit=600" + apiKey, function(
    error,
    response,
    body
  ) {
    if (error) {
      res.send(error);
    } else {
      let parks = JSON.parse(body);
      res.render("list", { parks: parks });
    }
  });
});

router.get("/park/:parkCode", function(req, res) {
  let parkCode = req.params.parkCode;
  // search for park
  request(
    apiBaseURL + "/parks?parkCode=" + parkCode + "&fields=images" + apiKey,
    function(error, response, body) {
      if (error) {
        res.send(error);
      } else {
        let parks = JSON.parse(body);
        let rand = Math.floor(
            Math.random() * parks["data"][0]["images"].length
          ),
          randImage = parks["data"][0]["images"][rand]["url"],
          lat = parseFloat(parks["data"][0]["latLong"].slice(4, 10)),
          long = parseFloat(parks["data"][0]["latLong"].slice(21, 30));
        // search for visitor centers
        request(
          apiBaseURL +
            "/visitorcenters?parkCode=" +
            parkCode +
            "&fields=name,operatingHours,addresses,contacts" +
            apiKey,
          function(error, response, body) {
            if (error) {
              res.send(error);
            } else {
              let visitorCenter = JSON.parse(body);
              // get alerts
              request(
                apiBaseURL + "/alerts?parkCode=" + parkCode + apiKey,
                function(error, response, body) {
                  if (error) {
                    res.send(error);
                  } else {
                    let alerts = JSON.parse(body);
                    // get weather info
                    request(
                      owmAPIBase +
                        "lat=" +
                        lat +
                        "&lon=" +
                        long +
                        "&units=imperial&appid=" +
                        owmAPIKey,
                      function(error, response, body) {
                        if (error) {
                          res.send(error);
                        } else {
                          let weather = JSON.parse(body);
                          res.render("park", {
                            parks: parks,
                            randImage: randImage,
                            visitorCenter: visitorCenter,
                            alerts: alerts,
                            weather: weather,
                            googleKey: googleKey
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.get("/:dataSet/:state", function(req, res) {
  let dataSet = req.params.dataSet;
  let state = req.params.state;
  if (state === "any") {
    request(
      apiBaseURL + "/parks?q=" + dataSet + "&fields=images" + apiKey,
      function(error, response, body) {
        if (error) {
          res.send(error);
        } else {
          let data = JSON.parse(body);
          res.render("viewer", { data: data });
        }
      }
    );
  } else if (state !== "any") {
    request(
      apiBaseURL +
        "/parks?q=" +
        dataSet +
        "&stateCode=" +
        state +
        "&fields=images" +
        apiKey,
      function(error, response, body) {
        if (error) {
          res.send(error);
        } else {
          let data = JSON.parse(body);
          res.render("viewer", { data: data });
        }
      }
    );
  } else if (dataSet === "_") {
    request(
      apiBaseURL + "/parks?stateCode=" + state + "&fields=images" + apiKey,
      function(error, response, body) {
        if (error) {
          res.send(error);
        } else {
          let data = JSON.parse(body);
          res.render("viewer", { data: data });
        }
      }
    );
  }
});

module.exports = router;