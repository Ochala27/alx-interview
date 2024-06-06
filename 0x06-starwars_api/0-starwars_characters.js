#!/usr/bin/node
const axios = require('axios');

function getMovieCharacters (movieId) {
  axios.get(`https://swapi.dev/api/films/${movieId}/`)
    .then(response => {
      const characters = response.data.characters;
      characters.forEach(characterUrl => {
        axios.get(characterUrl)
          .then(characterResponse => {
            console.log(characterResponse.data.name);
          })
          .catch(error => {
            console.log(`Error fetching character: ${error}`);
          });
      });
    })
    .catch(error => {
      console.log(`Error fetching movie: ${error}`);
    });
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.log('Usage: node script.js <movie_id>');
  process.exit(1);
}

const movieId = args[0];
getMovieCharacters(movieId);
