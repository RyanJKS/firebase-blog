export const CurrentTimeStamp = () => {
  const todayDate = new Date();
  const formattedDate = todayDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
  return formattedDate;
};
