const express = require('express');
const Docker = require('dockerode');

const router = express.Router();
const docker = new Docker();

router.get('/', async (_req, res) => {
  try {
    const containers = await docker.listContainers({all: true});
    res.json(containers);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (_req, res) => {
  try {
    const container = await docker.createContainer({Image: 'alpine', Cmd: ['/bin/sh'], name: 'alpine-test'});
    const cid = await container.start();
    res.json(cid);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
