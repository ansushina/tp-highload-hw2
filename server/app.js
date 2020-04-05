
const express = require('express');
const client = require('prom-client');
const apiMetrics = require('prometheus-api-metrics');
const app = express();
const appMetrics = express();

// To make our backend slow enough
const RESPONSE_DELAY = 200;  // ms

const OK = 200;
const NOT_OK = 500;

// True - response with 200, false - response with 500
let serverResponseStatus = true;

// Counter for requests on /api/data
const metricsRequestCounter = new client.Counter({
    name: 'request_data_counter',
    help: 'Count requests on /api/data.',
});

const registry = new client.Registry();
registry.registerMetric(metricsRequestCounter);

appMetrics.use(apiMetrics());

// switch response status from 200 to 500 and vice versa
app.get('/api/switch', function(req, res, next) {
    serverResponseStatus = !serverResponseStatus;
    res.sendStatus(serverResponseStatus ? OK : NOT_OK);
});

// current response status from serverResponseStatus
app.get('/api/status', function(req, res, next) {
    res.sendStatus(serverResponseStatus ? OK : NOT_OK);
});

// delayed request to imitate slowness
app.get('/api/data', function(req, res, next) {
    setTimeout(() => {
        const data = {
            string: 'Response delay is ' + RESPONSE_DELAY + ' ms',
            status: serverResponseStatus ? OK : NOT_OK
        };
        if (serverResponseStatus) {
            metricsRequestCounter.inc(1);
        }
        res.send(JSON.stringify(data));
    }, RESPONSE_DELAY);
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8000, function () {
  console.log('Backend listening on port 8000!');
});

appMetrics.listen(8080, function() {
    console.log('Metrics listening on port 8080!')
});