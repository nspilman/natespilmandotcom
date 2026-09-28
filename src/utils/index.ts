export const formatDateString = (string: string): string => {
  return new Date(string).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // Posts are dated by calendar day (stored as UTC midnight); show that day
    // no matter where this runs.
    timeZone: "UTC",
  });
};
