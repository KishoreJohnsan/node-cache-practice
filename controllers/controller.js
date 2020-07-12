const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const apiKey = process.env.SUPERHERO_API_KEY;
const baseURI = `https://superheroapi.com/api/`;

const renderOutput = async (response, template, hero, key, error) => {
  response.render(template, { superhero: hero, searchKey: key, error: error });
};

const searchCharacter = async (name) => {
  let url = encodeURI(baseURI + `${apiKey}/search/${name}`);
  let response = await axios.get(url);
  return response.data.results;
};

const getRandomCharacter = async (id) => {
  let url = encodeURI(baseURI + `${apiKey}/${id}`);
  let response = await axios.get(url);
  return response.data;
};

const getDetails = async (key) => {
  let url = encodeURI(baseURI + `${apiKey}/${key}`);
  let response = await axios.get(url);
  return response.data;
};

module.exports = {
  renderOutput,
  searchCharacter,
  getRandomCharacter,
  getDetails,
};
