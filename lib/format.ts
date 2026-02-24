export function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
