require("dotenv").config();

var command = process.argv[2];
var userInput = process.argv[3];

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");

var fs = require("fs");
var sendToLog;

if (command == null){
    return console.log("Enter a command & search term to try again")
}


if (command == "do-what-it-says"){
        fs.readFile("random.txt", "utf8", function(error, data){
            if (error){
                return console.log(error);
            }
            var dataArr = data.split(",");
            command = dataArr[0];
            userInput = dataArr[1]
            runCommand(command)
        })
}else{
    runCommand(command)
}

function runCommand(command){
    switch (command){
        case "concert-this":
            if (userInput == null){
                return console.log("Enter a search term to try again")
            }

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
                    
                    sendToLog = "-------------- GIG GUIDE: " + userInput + " --------------\r\n"+
                    "\r\nGig " + j + ": " + "\r\nDate: " + moment(response.data[i].datetime).format("DD MM YYYY") + "\r\n" + 
                    response.data[i].venue.name + "\r\n" + 
                    response.data[i].venue.city + ", " + response.data[i].venue.country + "\r\n" +
                    "\r\n------------------------------------\r\n";

                logData(sendToLog);
                
                }
            }
            );
    break;
    
    case "spotify-this-song":
            if (userInput == null){
                return console.log("Enter a search term to try again")
            }
                
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

                    sendToLog = "-------------- SONG GUIDE: " + userInput + " --------------\r\n"+
                    data.tracks.items[i].artists[0].name + "\r\n" + 
                    data.tracks.items[i].name + "\r\n" +
                    data.tracks.items[i].external_urls.spotify + "\r\n" +
                    data.tracks.items[i].album.name + " \r\n" + 
                    "\r\n------------------------------------\r\n";

                logData(sendToLog);
                }
                
                });
        break;

        case "movie-this":
            if (userInput == null){
                return console.log("Enter a search term to try again")
            }
            axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
                function(response) {
                    console.log("-------------- MOVIE GUIDE: " + userInput + " --------------\r\n") 
                    console.log(response.data.Title);
                    console.log("Released: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log(response.data.Ratings[1].Source + " Rating: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Starring: " + response.data.Actors); 
                    console.log("\r\n------------------------------------\r\n");
                    
                    sendToLog = "-------------- MOVIE GUIDE: " + userInput + " --------------\r\n"+
                        response.data.Title + "\r\nReleased: " + response.data.Year +
                        "\r\nIMDB Rating: " + response.data.imdbRating + "\r\n" +
                        response.data.Ratings[1].Source + " Rating: " + response.data.Ratings[1].Value + 
                        "\r\nCountry: " + response.data.Country + "\r\nLanguage: " + response.data.Language + 
                        "\r\nPlot: " + response.data.Plot + "\r\nStarring: " + response.data.Actors + 
                        "\r\n------------------------------------\r\n";

                    logData(sendToLog);
                })
        break;              

        default:
            console.log("Unknown command, try again")
        
    }
}

function logData(sendToLog){
fs.appendFile("log.txt", sendToLog, function(error){
    if(error){
        console.log(error)
    }else{
        console.log("This data was added to the log file")
    }

})
}
