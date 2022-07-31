const express = require('express');
const Docker = require('dockerode');

const imagesRoutes = express.Router();
const docker = new Docker();

imagesRoutes.route('/images').get(async function(_req, res) {
  try {
    const images = await docker.listImages();
    res.json(images);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = imagesRoutes;
