export function parseTime(time: string) {
  const [h, m, s] = time.split(':').map(Number);
  return h * 3600 + m * 60 + (s || 0);
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`;
}
