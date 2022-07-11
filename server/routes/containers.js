const express = require('express');
const Docker = require('dockerode');

const containersRoutes = express.Router();
const docker = new Docker();

containersRoutes.route('/containers').get(async function(_req, res) {
  docker.listContainers((err, containers) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(containers);
    }
  });
});

module.exports = containersRoutes;
