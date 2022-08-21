const express = require('express');
const Docker = require('dockerode');

const routes = express.Router();
const docker = new Docker();

routes.get('/', async (_req, res) => {
  try {
    const images = await docker.listImages();
    res.json(images);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = routes;
