export default function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ ok: true, service: 'Citadel Fitness Hub', time: new Date().toISOString() });
}
