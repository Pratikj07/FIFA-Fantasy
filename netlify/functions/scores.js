exports.handler = async () => {
  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'FOOTBALL_API_KEY not set in environment' }) };
  }
  try {
    const res  = await fetch('https://api.football-data.org/v4/competitions/WC/matches?season=2026', {
      headers: { 'X-Auth-Token': apiKey },
    });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
