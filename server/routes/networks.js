const express = require('express');
const Docker = require('dockerode');

const routes = express.Router();
const docker = new Docker();

routes.route('/networks').get(async function(_req, res) {
  try {
    const networks = await docker.listNetworks();
    res.json(networks);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = routes;
