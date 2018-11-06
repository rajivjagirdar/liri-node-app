# liri-node-app

## Requirements

Make a Node.js app that depends on user input from the command line
Integrate Bands In Town, Spotify, and OMDb APIs via the appropriate NPM modules
Use API calls and parse through returned JSON objects, outputting them in a specified format
Read commands and queries from file

## Technologies Used

Node.js
JavaScript
Bands In Town API (via request npm module)
Spotify API (via spotify npm module)
OMDb API (via request npm module)

## Code Explanation

Authentication keys for Spotify are stored in "keys.js", and we are exporting its contents to the main "liri.js" file
What our app does depends on what the user types, and there are 4 main functions: 
(1) checks concerts for a certain artist, 
(2) Spotify lookup for a song, 
(3) OMDb lookup for a movie, and 
(4) read command and query from another file
The program makes a request to the Bands In Town API based on an artist entered and it gives name of venue, location, and date.
The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)
The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back a JSON object that includes everything we need (title, year, IMDb rating, language, etc.)
The program also reads from a file called "random.text" and executes the command and query found there using string and array methods

 
