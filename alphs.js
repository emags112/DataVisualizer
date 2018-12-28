const   request     =   require('request'),
        apiKey      =   '&api_key=Y2twmHii37VedsrgffYyooeLLobd4WOBPvEVW5zg',
        apiBaseURL  =   'https://api.nps.gov/api/v1';

request(apiBaseURL + '/visitorcenters?parkCode=acad&fields=name,operatingHours,addresses,contacts' + apiKey, function (error, response, body) {
    if(error){
        res.send(error);
    } else {
        let visitorCenter = JSON.parse(body);
        visitorCenter['data'].forEach(function(center){
            center['operatingHours'].forEach(function(hours){
                hours['exceptions'].forEach(function(exception){
                    console.log(exception['name']);
                })
                
            })
        })
    }
})