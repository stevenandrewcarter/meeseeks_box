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
    await container.start();
    res.json(container);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:containerId', async (req, res) => {
  try {
    const {containerId} = req.params;
    const container = docker.getContainer(containerId);
    console.log(container);
    // await container.stop();
    console.log(await container.remove());
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
