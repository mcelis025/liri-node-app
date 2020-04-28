require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

const axios = require('axios');

var moment = require('moment');
moment().format();

var userInput = process.argv;
var command = userInput[2];

switch(command) {
  case "concert-this":
    concert();
  break;
  case "spotify-this-song":
    // song();
  break;
  case "movie-this":
    // movie();
  break;
  case "do-what-it-says":
    // readFile();
  break;  
  }

// node liri.js concert-this <artist/band>
  // search "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // return 
        // name of venue 
        // venue location 
        // date of the event (using moment format "MM/DD/YYYY")
          // example should return  https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
function concert(itemName){
  var itemName = userInput[3];

  axios.get("https://rest.bandsintown.com/artists/" + itemName + "/events?app_id=codingbootcamp").then(
    function(response) {
        var bit = response.data;
      for (i = 0; i < response.data.length; i++){
        console.log("Name of Venue: " + bit[i].venue.name);
        console.log("Venue Location: " + bit[i].venue.location);
        console.log("Date of Event: " + bit[i].datetime); // (using moment format "MM/DD/YYYY")
        console.log("----------------------------------");
      };
    })
    .catch(function(error) {
      console.log(error);
    });
}
// node liri.js spotify-this-song <song name here>
    // search 
        // return
            // Artist(s)
            // the songs name
            // A preview link of the song from spotify
            // the album the song is from
/*                 spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
                  if (err) {
                    return console.log('Error occurred: ' + err);
                  }
                 
                console.log(data); 
                }); */

        // blank search 
            // return 
                // The Sign by Ace of Base 

// node liri.js movie-this <movie name here>
    // search
        // return 
            // title of movie
            // year 
            // IMBD rating 
            // rotten tomatoes rating
            // country
            // language
            // plot
            // actors
        // blank search 
            // return
                // Mr. Nobody

// node liri.js do-what-it-says 
    // should run info in txt file
        // spotify-this-song
            // i want it that way
            
// Bonus 
    // Output (create) data to txt file called log.txt
    // make data append to log.txt

