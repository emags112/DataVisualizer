const   express     =   require('express'),
        request     =   require('request'),
        bodyParser  =   require('body-parser'),
        app         =   express(),
        apiKey      =   '&api_key=Y2twmHii37VedsrgffYyooeLLobd4WOBPvEVW5zg',
        apiBaseURL  =   'https://api.nps.gov/api/v1';
        

let data = false,
    alerts,
    articles;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', function(req, res){
    request(apiBaseURL + '/articles?limit=5' + apiKey, function (error, response, body) {
        if(error){
            res.send(error);
        } else {
            articles = JSON.parse(body);
        }
    });
    request(apiBaseURL + '/alerts?limit=5' + apiKey, function (error, response, body) {
        if(error){
            res.send(error);
        } else {
            alerts = JSON.parse(body);
        }
    });
    res.render('home', {articles: articles, alerts: alerts, data: data});
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
            let data = JSON.parse(body);
            res.render('list', {data: data});
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

app.listen(3000, function(){
    console.log("view the world in a different way");
})