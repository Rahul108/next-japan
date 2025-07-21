import client from 'prom-client';

const register = new client.Registry();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
register.registerMetric(httpRequestCounter);

export default async function handler(req, res) {
  httpRequestCounter.inc();
  res.setHeader('Content-Type', register.contentType);
  res.status(200).send(await register.metrics());
}
