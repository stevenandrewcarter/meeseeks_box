const express = require('express')
const yaml = require('js-yaml')
const Mustache = require('mustache')
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Api = require('kubernetes-client')
// Create an instance of the client using the local kubernetes configuration
const ext = new Api.Extensions(Api.config.fromKubeconfig())

app.get('/meeseeks', (req, res) => {
  console.log("Getting all of the Mister Meeseeks!")
  ext.namespaces('default').deployments.get((err, result) => {
    res.send(JSON.stringify(err || result, null, 2))
  })
})

app.post('/meeseeks', (req, res) => {
  console.log(req.body)
  fs.readFile(path.join(__dirname, './templates/deployment.yaml'), (err, data) => {
    if (err) {
      console.error(err)
    } else {
      let rendered = Mustache.render(data.toString(), req.body)
      let result = yaml.safeLoad(rendered)
      ext.namespaces('default').deployments.post({body: result}, (err, value) => {
        res.send(JSON.stringify(err || value, null, 2))
      })    
    }
  })
})

app.delete('/meeseeks/:id', (req, res) => {
  ext.namespaces('default').deployments.delete({
    name: req.params.id,
    body: {propagationPolicy: 'Foreground'}
  }, (err, value) => {
    res.send(JSON.stringify(err || value, null, 2))
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))