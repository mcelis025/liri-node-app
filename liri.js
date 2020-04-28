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
    song();
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
function concert(){
  var bandArtist = process.argv.slice(3).join(" ")
  var artist = process.argv.slice(3).join("+");

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
      var bit = response.data;
      console.log("-----------------" + bandArtist + " Upcoming Concerts" + "-----------------");
      for (i = 0; i < response.data.length; i++){
        var convertedTime = moment(bit[i].datetime).format("MM/DD/YYYY");
        console.log(
          "\nName of Venue: " + bit[i].venue.name + 
          "\nVenue Location: " + bit[i].venue.location + 
          "\nDate of Event: " + convertedTime + 
          "\n\n----------------------------------");
      };
    })
    .catch(function(error) {
      console.log(error);
    });
};

// node liri.js spotify-this-song <song name here>
    // search 
        // return
            // Artist(s)
            // the songs name
            // A preview link of the song from spotify
            // the album the song is from
      // blank search 
        // return 
            // The Sign by Ace of Base 
function song(){
  var songName = process.argv.slice(3).join(" ");
  console.log("-----------------Song Chosen: " + songName + "-----------------");
  spotify
  .search({ type: 'track', query: songName })
  .then(function(response) {
    var songInfo = response.tracks.items;
    
    if (songName === ""){        
      songName === "The Sign";
    }
      for (var i = 0; i < response.tracks.items.length; i++) {
        console.log(    
          "\nArtist(s): " + songInfo[i].artists[0].name + 
          "\nSong Name: " + songInfo[i].name +
          "\nAlbum Name: " + songInfo[i].album.name +
          "\nPreview Link: " + songInfo[i].preview_url +
          "\n\n----------------------------------");
        }  
      })
      .catch(function(err) {
        console.log(err);
      });
}; 

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
function movie(){
  
}

// node liri.js do-what-it-says 
    // should run info in txt file
        // spotify-this-song
            // i want it that way
            
// Bonus 
    // Output (create) data to txt file called log.txt
    // make data append to log.txt

