export const formatDateString = (string: string): string => {
  return new Date(string).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
