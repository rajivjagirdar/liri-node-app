require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var action = process.argv[2];

var nodeArgs = process.argv;

var value = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        value = value + "+" + nodeArgs[i];
    } else {
        value = value + nodeArgs[i];
    }
}

switch (action) {
    case 'concert-this':
        bands();
        break;

    case 'spotify-this-song':
        spotify();
        break;

    case 'movie-this':
        imdb();
        break;

    case 'do-what-it-says':
        dwis();
        break;
}

function bands() {
    var request = require('request');
    var bandurl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"

    request(bandurl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("======================================================================");
            console.log("The venue is: " + JSON.parse(body).venuedata.name);
            console.log("");
            console.log("The venue location is: " + JSON.parse(body).venuedata.city + ", " + JSON.parse(body).venuedata.region);
            console.log("");
            console.log("The date of event is: " + JSON.parse(body).date);
            console.log("");
        } else {

            var request = require('request');

            request("https://rest.bandsintown.com/artists/drake/events?app_id=codingbootcamp", function(error, response, body) {

                console.log("======================================================================");
                console.log("The venue is: " + JSON.parse(body).Venue);
                console.log("");
                console.log("The venue location is: " + JSON.parse(body).location);
                console.log("");
                console.log("The date of event is: " + moment.format('MM/DD/YY')(body).date);
                console.log("");
            });
        }
    });
}

function spotify() {

    if (value != false) {
        var spotify = new Spotify(keys.spotify);

        spotify.search({
            type: 'track',
            query: value + '&limit=1&'
        }, function(error, data) {
            if (error) {
                console.log('Error occurred: ' + error);
                return;
            }
            console.log("---------------------------------------------------");
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log(" ");
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log(" ");
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log(" ");
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log(" ");
            console.log("---------------------------------------------------");
        });
    } else {
        {
            var spotify = new Spotify(keys.spotify);

            spotify.search({
                type: 'track',
                query: 'ace+of+base+sign' + '&limit=1&'
            }, function(error, data) {
                if (error) {
                    console.log('Error occurred: ' + error);
                    return;
                }
                console.log("---------------------------------------------------");
                console.log(" ");
                console.log("Since you didnt enter a song here is the following: ");
                console.log(" ");
                console.log("Track Title: " + data.tracks.items[0].name);
                console.log(" ");
                console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                console.log(" ");
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log(" ");
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log(" ");
                console.log("---------------------------------------------------");
            });
        }

    }
}

function imdb() {

    var request = require('request');

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("======================================================================");
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("");
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("");
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("");
            console.log("This movie was produced in the: " + JSON.parse(body).Country);
            console.log("");
            console.log("The language for this movie is in: " + JSON.parse(body).Language);
            console.log("");
            console.log("The movie's Plot: " + JSON.parse(body).Plot);
            console.log("");
            console.log("The movie's Actor's: " + JSON.parse(body).Actors);
            console.log("");
        } else {

            var request = require('request');

            request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {

                console.log("======================================================================");
                console.log("The movie's name is: " + JSON.parse(body).Title);
                console.log("");
                console.log("The movie was released in: " + JSON.parse(body).Year);
                console.log("");
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("");
                console.log("This movie was produced in the: " + JSON.parse(body).Country);
                console.log("");
                console.log("The language for this movie is in: " + JSON.parse(body).Language);
                console.log("");
                console.log("The movie's Plot: " + JSON.parse(body).Plot);
                console.log("");
                console.log("The movie's Actor's: " + JSON.parse(body).Actors);
                console.log("");
            });
        }
    });
}

function dwis() {

    var fs = require('fs');

    fs.readFile("random.txt", "utf8", function(error, data) {

        data = data.split(',');

        var command;
        var parameter;

        if (data.length == 2) {
            command = data[0];
            parameter = data[1];
        }
        parameter = parameter.replace('"', '');
        parameter = parameter.replace('"', '');

        switch (command) {
            case 'concert-this':
                value = parameter;
                twitter();
                break;

            case 'spotify-this-song':
                value = parameter;
                spotify();
                break;

            case 'movie-this':
                value = parameter;
                imdb();
                break;
        }

    });
}