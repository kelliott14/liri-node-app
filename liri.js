require("dotenv").config();

var command = process.argv[2];
var userInput = process.argv[3];

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment")

switch (command){
    case "concert-this":

        axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
            function(response){
                console.log("-------------- GIG GUIDE: " + userInput + " --------------")
               
                for (var i = 0; i <  response.data.length; i++){
                    var j = i + 1
                console.log("\r\nGig " + j + ": ")
                console.log("Date: " + moment(response.data[i].datetime).format("DD MM YYYY"))
                console.log(response.data[i].venue.name)
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.country)
                console.log("\r\n------------------------------------")
                j++
            }
        }
        );
  break;
  
  case "spotify-this-song":

            
spotify.search({ type: 'track', query: userInput }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("-------------- SONG GUIDE: " + userInput + " --------------\r\n")

    for (var i = 0; i <  data.tracks.items.length; i++){
        console.log(data.tracks.items[i].artists[0].name); 
        console.log(data.tracks.items[i].name); 
        console.log(data.tracks.items[i].external_urls.spotify); 
        console.log(data.tracks.items[i].album.name); 
        console.log("\r\n------------------------------------\r\n")
    }
    
    });

}


