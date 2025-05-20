const currentDate = new Date();

export function formatDate(date: string | Date) {
  // Eğer date bir Date objesi ise stringe çevir
  if (date instanceof Date) {
    date = date.toISOString();
  }
  if (typeof date === "string" && !date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
