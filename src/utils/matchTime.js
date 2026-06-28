/**
 * Match time utilities — handles ET → UTC → user local timezone conversion
 * WC 2026 runs June–July 2026, all match times listed in EDT (UTC-4)
 */

const MONTHS = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};

/**
 * Convert match scheduled time (stored as ET) to a UTC Date object
 * e.g. "Jun 12" + "3:00 PM" → June 12 19:00 UTC (3 PM EDT = 7 PM UTC)
 */
export function matchToUTC(date, time) {
  const [mon, day] = date.split(' ');
  const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return new Date(Date.UTC(2026, MONTHS[mon], parseInt(day)));
  let [, h, min, ap] = m;
  h = parseInt(h); min = parseInt(min);
  if (ap.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ap.toUpperCase() === 'AM' && h === 12) h = 0;
  // EDT = UTC-4: add 4 hours to convert ET → UTC
  return new Date(Date.UTC(2026, MONTHS[mon], parseInt(day), h + 4, min));
}

/**
 * Is this match scheduled today in the USER's local timezone?
 * Works correctly for all timezones — India, USA, Europe, etc.
 */
export function isMatchLocalToday(date, time) {
  const matchUTC = matchToUTC(date, time);
  const now = new Date();
  // Start and end of today in local time, expressed as UTC
  const localToday    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const localTomorrow = new Date(localToday.getTime() + 86_400_000);
  return matchUTC >= localToday && matchUTC < localTomorrow;
}

/**
 * Sort key for chronological ordering
 */
export function matchSortKey(date, time) {
  return matchToUTC(date, time).getTime();
}

/**
 * Has enough time passed since kickoff that the match is certainly over,
 * even if our data source hasn't confirmed FT yet (e.g. delayed free-tier
 * score updates)? Used as a safety net so a finished match never gets
 * stuck showing "UPCOMING" indefinitely just because a status update was
 * missed or delayed. 150 minutes covers 90 + stoppage + half-time + a
 * reasonable margin for extra time in knockout matches.
 */
export function isCertainlyOver(date, time, marginMinutes = 150) {
  const kickoff = matchToUTC(date, time);
  return Date.now() - kickoff.getTime() > marginMinutes * 60_000;
}
