const   express     =   require('express'),
        request     =   require('request'),
        bodyParser  =   require('body-parser'),
        app         =   express(),
        apiKey      =   '&api_key=Y2twmHii37VedsrgffYyooeLLobd4WOBPvEVW5zg',
        apiBaseURL  =   'https://api.nps.gov/api/v1';
        googleKey   =   '&key=AIzaSyAa3dAZiSJoun0zZ4kFmd-LkmqjmRCLFn8'
        owmAPIKey   =   '3d85baf9ef44e792b29549e4b607e8c7'
        owmAPIBase  =   'http://api.openweathermap.org/data/2.5/weather?'
        

let data = false,
    alerts,
    articles,
    park,
    visitorCenter,
    randImage;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', function(req, res){
    request(apiBaseURL + '/articles?limit=5' + apiKey, function (error, response, body) {
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            articles = JSON.parse(body);
        }
    });
    res.render('home', {articles: articles});
})

app.post('/', function(req, res){
    let dataSet = req.body.searchData;
    let search = '/' + dataSet;
    res.redirect(search);
})

app.get("/list", function(req, res){
    request(apiBaseURL + '/parks?limit=600' + apiKey, function (error, response, body) {
        if(error){
            res.send(error);
        } else {
            let parks = JSON.parse(body);
            res.render('list', {parks: parks});
        }
    });
})

app.get('/:dataSet', function(req, res){
    let dataSet = req.params.dataSet;
    request(apiBaseURL + '/parks?q=' + dataSet + '&fields=images' + apiKey, function (error, response, body) {
        if(error){
            res.send(error);
        } else {
            let data = JSON.parse(body);
            res.render('viewer', {data: data});
        }
    });
})

app.get('/park/:parkCode', function(req, res){
    let parkCode = req.params.parkCode;
    // search for park
    request(apiBaseURL + '/parks?parkCode=' + parkCode + '&fields=images' + apiKey, function (error, response, body) {
        if(error){
            res.send(error);
        } else {
            let parks = JSON.parse(body);
            let rand = Math.floor(Math.random()*(parks['data'][0]['images'].length)),
                randImage = parks['data'][0]['images'][rand]['url'],
                lat = parseFloat(parks['data'][0]['latLong'].slice(4, 10)),
                long = parseFloat(parks['data'][0]['latLong'].slice(21, 30));
            console.log(parks['data'][0]['latLong']);
            // search for visitor centers
            request(apiBaseURL + '/visitorcenters?parkCode=' + parkCode + '&fields=name,operatingHours,addresses,contacts' + apiKey, function (error, response, body) {
                if(error){
                    res.send(error);
                } else {
                    let visitorCenter = JSON.parse(body);
                    // get alerts
                    request(apiBaseURL + '/alerts?parkCode=' + parkCode + apiKey, function (error, response, body) {
                        if(error){
                            res.send(error);
                        } else {
                            let alerts = JSON.parse(body);
                            // get weather info
                            request(owmAPIBase + 'lat=' + lat + '&lon=' + long + '&units=imperial&appid=' + owmAPIKey, function (error, response, body) {
                                if(error){
                                    res.send(error);
                                } else {
                                    let weather = JSON.parse(body);
                                    console.log(weather);
                                    res.render('park', {parks: parks, randImage: randImage, visitorCenter: visitorCenter, alerts: alerts, weather: weather, googleKey: googleKey});
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

app.listen(3000, function(){
    console.log("view the world in a different way");
})