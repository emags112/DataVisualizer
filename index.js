const   express     =   require('express'),
        request     =   require('request'),
        bodyParser  =   require('body-parser'),
        app         =   express(),
        apiKey      =   '&api_key=Y2twmHii37VedsrgffYyooeLLobd4WOBPvEVW5zg',
        apiBaseURL  =   'https://api.nps.gov/api/v1';
        

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
    // request(apiBaseURL + '/alerts?limit=5' + apiKey, function (error, response, body) {
    //     if(error){
    //         res.send(error);
    //     } else {
    //         alerts = JSON.parse(body);
    //     }
    // });
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
    request(apiBaseURL + '/parks?parkCode=' + parkCode + '&fields=images' + apiKey, function (error, response, body) {
        if(error){
            res.send(error);
        } else {
            let parks = JSON.parse(body);
            let rand = Math.floor(Math.random()*(parks['data'][0]['images'].length)),
                randImage = parks['data'][0]['images'][rand]['url'];
            request(apiBaseURL + '/visitorcenters?parkCode=' + parkCode + '&fields=name,operatingHours,addresses,contacts' + apiKey, function (error, response, body) {
                if(error){
                    res.send(error);
                } else {
                    let visitorCenter = JSON.parse(body);
                    request(apiBaseURL + '/alerts?parkCode=' + parkCode + '&fields=' + apiKey, function (error, response, body) {
                        if(error){
                            res.send(error);
                        } else {
                            let alerts = JSON.parse(body);
                            res.render('park', {parks: parks, randImage: randImage, visitorCenter: visitorCenter, alerts: alerts});
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