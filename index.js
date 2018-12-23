const   express =   require('express'),
        request =   require('request'),
        app     =   express(),
        apiKey = '&api_key=Y2twmHii37VedsrgffYyooeLLobd4WOBPvEVW5zg';

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('home');
})

app.get('/:dataSet', function(req, res){
    let dataSet = req.params.dataSet;
    res.render('viewer', {dataSet: dataSet});
})

app.get('*', function(req, res){
    res.send("hello world!");
})

app.listen(3000, function(){
    console.log("view the world in a different way");
})