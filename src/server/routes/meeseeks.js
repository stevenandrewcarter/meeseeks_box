var express = require('express');
var router = express.Router();
const Api = require('kubernetes-client')
// Create an instance of the client using the local kubernetes configuration
const ext = new Api.Extensions(Api.config.fromKubeconfig())

/* GET meeseek listings listing. */
router.get('/', function (req, res, next) {
    console.log("Getting all of the Mister Meeseeks!")
    ext.namespaces('default').deployments.get((err, result) => {
        res.send(JSON.stringify(err || result, null, 2))
    })
})

router.post('/', (req, res, next) => {
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

app.delete('/:id', (req, res, next) => {
    ext.namespaces('default').deployments.delete({
        name: req.params.id,
        body: { propagationPolicy: 'Foreground' }
    }, (err, value) => {
        res.send(JSON.stringify(err || value, null, 2))
    })
})

module.exports = router;
