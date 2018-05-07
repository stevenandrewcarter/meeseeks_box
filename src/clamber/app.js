const Api = require('kubernetes-client');
const MongoClient = require('mongodb').MongoClient;
/**
 * Check how many Pods are currently running and how well they are running. If the performance seems to be slipping,
 * then scale will attempt to fix the problem. It will also measure the impact and if the performance worsens it will
 * instead scale back the number of pods. The scaled back pods will be listed as less important and will be given a lower
 * priority instead.
 *
 * The selector given to the service is important to help determine which Pods should be measured and handled.
 */
// Create an instance of the client using the local kubernetes configuration
const core = new Api.Core(Api.config.fromKubeconfig());

function updateRecords(podName, cb) {
    // Get existing Pods
    const url = "mongodb://mongo:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("meeseeks");
        const query = {podName: podName};
        dbo.collection("pods").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

// Get a list of running pods, per deployment since the last run of the clamber
console.log('Running Clamber');
core.namespaces('default').pods.get((err, result) => {
    if (err) {
        console.error(err);
        return
    }
    console.log("Running pods", JSON.stringify(result, null, 2));
    // Store the Information into the database for future runs
    for (let pod in result.items) {
        updateRecords(pod, (err, result) => {
            // If performance is worsening then attempt to scale the pods accordingly. The scaling will be done in steps with
            // a configurable limit to how many times it will attempt to scale up
            // If the number of increments has been reacted it will start down scaling instead till it is back at one
        })
    }
});
