require("dotenv").config();

var keys = require("./key.js");

//var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userInput = process.argv[3];

var axios = require("axios");

switch (command){
    case "concert-this":

axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
    function(response){
        console.log("-------------- GIG GUIDE: " + userInput + " --------------")
        console.log("\r\nGig One:")
        console.log(response.data[0].venue.name)
        console.log(response.data[0].venue.city + ", " + response.data[0].venue.country)
        console.log(response.data[0].datetime)
        console.log("\r\nGig Two:")
        console.log(response.data[1].venue.name)
        console.log(response.data[1].venue.city + ", " + response.data[1].venue.country)
        console.log(response.data[1].datetime)
        console.log("\r\nGig Three:")
        console.log(response.data[2].venue.name)
        console.log(response.data[2].venue.city + ", " + response.data[2].venue.country)
        console.log(response.data[2].datetime)
    }
);
    
}


