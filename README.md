# liri-node-app

## Liri Bot
Liri bot uses node.js, fs module, moment.js, dotenv, Spotify API and Axios to respond to commands for information. The information sourced will then save to a log.txt file.

## Usage
Enter the following commands:
```bash
concert-this bandname
```
To receive a listing of upcoming gigs for that band. Inputs with multiple words need to be contained within "".

```bash
spotify-this-song "song title"
```
To receive track information for songs with that title. Inputs with multiple words need to be contained within "".

```bash
movie-this "movie title"
```
To receive information for the movie search. Inputs with multiple words need to be contained within "".

```bash
do-what-it-says
```
Computer's choice

## Validations
The bot will prompt when the inputs are missing and will not run. Where the search term is unfound, it will advise of no results found.
