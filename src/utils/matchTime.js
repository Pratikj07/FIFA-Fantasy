const MONTHS = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};

export function matchToUTC(date, time) {
  const [mon, day] = date.split(' ');
  const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return new Date(Date.UTC(2026, MONTHS[mon], parseInt(day)));
  let [, h, min, ap] = m;
  h = parseInt(h); min = parseInt(min);
  if (ap.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ap.toUpperCase() === 'AM' && h === 12) h = 0;
  return new Date(Date.UTC(2026, MONTHS[mon], parseInt(day), h + 4, min));
}

export function isMatchLocalToday(date, time) {
  const matchUTC = matchToUTC(date, time);
  const now = new Date();
  const localToday    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const localTomorrow = new Date(localToday.getTime() + 86_400_000);
  return matchUTC >= localToday && matchUTC < localTomorrow;
}

export function matchSortKey(date, time) {
  return matchToUTC(date, time).getTime();
}
