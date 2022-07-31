const express = require('express');
const Docker = require('dockerode');

const routes = express.Router();
const docker = new Docker();

routes.route('/volumes').get(async function(_req, res) {
  try {
    const volumes = await docker.listVolumes();
    res.json(volumes);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = routes;
