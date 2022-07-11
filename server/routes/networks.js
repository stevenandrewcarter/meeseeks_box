const express = require('express');
const Docker = require('dockerode');

const routes = express.Router();
const docker = new Docker();

routes.route('/networks').get(async function(_req, res) {
  docker.listNetworks((err, networks) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(networks);
    }
  });
});

module.exports = routes;
