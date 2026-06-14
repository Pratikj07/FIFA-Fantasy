export default async function handler(req, res) {
  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'FOOTBALL_API_KEY not set' });
  try {
    const r    = await fetch('https://api.football-data.org/v4/competitions/WC/matches?season=2026', {
      headers: { 'X-Auth-Token': apiKey },
    });
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
