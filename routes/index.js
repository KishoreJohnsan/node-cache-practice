const express = require("express");
const router = express.Router();
const services = require("../controllers/controller");
const NodeCache = require("node-cache");
const cache = new NodeCache();

router.get("/", (req, res) => {
  services.renderOutput(res, "index", null, null, null);
});

router.get("/home", (req, res) => {
  services.renderOutput(res, "index", null, null, null);
});

router.get("/maintenance", (req, res) => {
  services.renderOutput(res, "maintenance", null, null, null);
});

router.get("/error", (req, res) => {
  services.renderOutput(res, "error", null, null, null);
});

router.post("/search", async (req, res) => {
  let name = req.body.searchKey;
  let errorString = "";
  let superhero = null;

  let data = cache.get(name);
  if (data === null || data === undefined) {
    superhero = await services.searchCharacter(name);
    if (superhero === undefined) {
      errorString = "Error, please try again";
      superhero = null;
    } else {
      cache.set(name, JSON.stringify(superhero), 1800);
    }
  } else {
    superhero = JSON.parse(data);
  }
  services.renderOutput(res, "search", superhero, name, errorString);
});

router.post("/viewDetails", async (req, res) => {
  let viewKey = req.body.viewDetails;
  let searchKey = req.body.searchKey;
  let errorString = "";
  let superhero = null;

  let data = cache.get(viewKey);
  if (data === null || data === undefined) {
    superhero = await services.getDetails(viewKey);
    if (superhero.id === undefined) {
      errorString = "Error, please try again";
      superhero = null;
    } else {
      cache.set(viewKey, JSON.stringify(superhero), 1800);
    }
  } else {
    superhero = JSON.parse(data);
  }
  services.renderOutput(res, "view", superhero, searchKey, errorString);
});

router.get("/random", async (req, res) => {
  let id = Math.floor(Math.random() * 730) + 1;
  let errorString = "";
  let superhero = null;
  let data = cache.get(id);

  if (data === null || data === undefined) {
    superhero = await services.getRandomCharacter(id);

    if (superhero.id === undefined) {
      errorString = "Error, please try again";
    } else {
      cache.set(id, JSON.stringify(superhero), 1800);
    }
  } else {
    superhero = JSON.parse(data);
  }

  services.renderOutput(res, "random", superhero, null, errorString);
});

module.exports = router;
