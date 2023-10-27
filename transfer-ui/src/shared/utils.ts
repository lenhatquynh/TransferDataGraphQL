export function customDate(value: Date): string {
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
