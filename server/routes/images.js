const express = require('express');
const Docker = require('dockerode');

const imagesRoutes = express.Router();
const docker = new Docker();

imagesRoutes.route('/images').get(async function(_req, res) {
  docker.listImages((err, images) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(images);
    }
  });
});

module.exports = imagesRoutes;
