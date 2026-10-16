export default async function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const response = await fetch(`${protocol}://${host}/`, { headers: { 'user-agent': 'Citadel-Fitness-Hub-internal-app-route' } });
  const html = await response.text();
  res.setHeader('Cache-Control', 'public, max-age=0');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(response.status).send(html);
}
