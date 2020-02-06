export function parseTime(e: any): string {
  return Date.parse(e.format().split('T')[0]).toString()
}
