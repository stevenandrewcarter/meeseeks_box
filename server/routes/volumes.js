const express = require('express');
const Docker = require('dockerode');

const routes = express.Router();
const docker = new Docker();

routes.route('/volumes').get(async function(_req, res) {
  docker.listVolumes((err, volumes) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(volumes);
    }
  });
});

module.exports = routes;
