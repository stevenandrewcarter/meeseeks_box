const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const Api = require('kubernetes-client')
// Create an instance of the client using the local kubernetes configuration
const ext = new Api.Extensions(Api.config.fromKubeconfig())

app.get('/meeseeks', function (req, res) {
    console.log("Getting all of the Mister Meeseeks!")
    ext.namespaces('default').deployments.get((err, result) => {
        console.log("Mister Meeseeks: ", result, err)
        res.send(JSON.stringify(err || result, null, 2))
    })
})

app.post('/meeseeks', (req, res) => {
    console.log(req.body)
    fs.readFile(path.join(__dirname, './templates/deployment.yml'), (err, data) => {
        if (err) {
            console.error(err)
        } else {
            let rendered = Mustache.render(data.toString(), req.body)
            let result = yaml.safeLoad(rendered)
            ext.namespaces('default').deployments.post({ body: result }, (err, value) => {
                res.send(JSON.stringify(err || value, null, 2))
            })
        }
    })
})

app.delete('/meeseeks/:id', (req, res) => {
    ext.namespaces('default').deployments.delete({
        name: req.params.id,
        body: { propagationPolicy: 'Foreground' }
    }, (err, value) => {
        res.send(JSON.stringify(err || value, null, 2))
    })
})

console.log('Starting server on', process.env.PORT || 3000)
app.listen(process.env.PORT || 3000);