require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

const axios = require('axios');

var moment = require('moment');
moment().format();

var fs = require("fs");

var userInput = process.argv;
var command = userInput[2];
var userKey = process.argv.slice(3).join(" ").toUpperCase();

  switch (command) {
    case "concert-this":
      concert(userKey);
      break;
    case "spotify-this-song":
      song(userKey);
      break;
    case "movie-this":
      movies(userKey);
      break;
    case "do-what-it-says":
      readText();
      break;
};

// node liri.js concert-this <artist/band>
// search "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// return 
// name of venue 
// venue location 
// date of the event (using moment format "MM/DD/YYYY")
// example should return  https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
function concert(userKey) {
  var bandArtist = userKey;
  artist = userKey.split(" ").join("+");

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response) {
      var bit = response.data;
      console.log("\n-----------------Upcoming Concerts: " + bandArtist + "-----------------");
      for (i = 0; i < response.data.length; i++) {
        var convertedTime = moment(bit[i].datetime).format("MM/DD/YYYY");
        console.log(
          "\nName of Venue: " + bit[i].venue.name +
          "\nVenue Location: " + bit[i].venue.location +
          "\nDate of Event: " + convertedTime +
          "\n\n-------------------------------------------------------------");
      };
    })
    .catch(function (error) {
      console.log(error);
    });
    log();
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
function song(userKey) {
  songName = userKey;
  
  if (songName === "") {
    songName = "The Sign";
  };

  console.log("\n-----------------Song Chosen: " + songName + "-----------------");

  spotify
    .search({ type: 'track', query: songName })
    .then(function (response) {
      var songInfo = response.tracks.items;
      for (var i = 0; i < response.tracks.items.length; i++) {
        console.log(
          "\nArtist(s): " + songInfo[i].artists[0].name +
          "\nSong Name: " + songInfo[i].name +
          "\nAlbum Name: " + songInfo[i].album.name +
          "\nPreview Link: " + songInfo[i].preview_url +
          "\n\n-------------------------------------------------------------");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
    log();
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
function movies(userKey) {
  var userMovie = userKey;
  var movie = userKey.split(" ").join("%20");

  if (movie === "") {
    movie = "Mr. Nobody";
  };

  axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie).then(
    function (response) {
      var ombd = response.data;
      console.log(
        "\n-----------------Movie Chosen: " + userMovie + "-----------------" +
        "\n\nTitle: " + ombd.Title +
        "\nYear: " + ombd.Year +
        "\nIMDB Rating: " + ombd.imdbRating +
        "\nRotten Tomatoes Rating: " + ombd.Ratings[1].Value +
        "\nCountry: " + ombd.Country +
        "\nLanguage: " + ombd.Language +
        "\nPlot: " + ombd.Plot +
        "\nActors: " + ombd.Actors +
        "\n\n-------------------------------------------------------------");
    })
    .catch(function (error) {
      console.log(error);
    });
    log();
};

// node liri.js do-what-it-says 
// should run info in txt file
// spotify-this-song
// i want it that way
function readText(){
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
  };

  var text = data.split(",");
  //console.log("\n" + data + "\n");

  var command = text[0];
  var value = text[1].split('"').join("");

  songName = value;
  //console.log("songName: " + songName);
  
  artist = value.split(" ").join("+");
  //console.log("artist: " + artist);

  movie = value.split(" ").join("%20");
  //console.log("movie: " + movie);

  // console.log("\nTitle: " + value);
  // console.log("command: " + command + "\n");

  if (command === "concert-this"){
    concert(artist);
  };
  if (command === "spotify-this-song"){
    song(songName);
  };
  if (command === "movie-this"){
    movies(movie);
  };

  });

};

// Bonus 
    // Output (create) data to txt file called log.txt
    // make data append to log.txt
function log(){
  fs.appendFile("log.txt", function (err) {
    if (err) {
        return console.log(err);
    }
});
};

