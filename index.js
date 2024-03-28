
// Before the first day of Gregorian Calendar (05/10/1582)
const isJulian = jdn => jdn <= 2299160;

export default function jdnToDate(jdn) {
  if (typeof jdn !== 'number') {
    throw new TypeError(`Expected a number, got ${typeof jdn}`);
  }

  let b;
  let c;
  const jdint = Math.trunc(jdn + 0.5);
  if (isJulian(jdn)) {
    b = 0;
    c = jdint + 32082;
  } else {
    const a = jdint + 32044;
    b = Math.trunc((4 * a + 3) / 146097);
    c = a - Math.trunc((b * 146097) / 4);
  }

  const d = Math.trunc((4 * c + 3) / 1461);
  const e = c - Math.trunc((1461 * d) / 4);
  const m = Math.trunc((5 * e + 2) / 153);
  const day = e - Math.trunc((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.trunc(m / 10);
  const year = b * 100 + d - 4800 + Math.trunc(m / 10);

  return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00.000Z`);
}
