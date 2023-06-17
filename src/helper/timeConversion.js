export const TimeConversion = (timeStamp) => {
  const dateObj = new Date(timeStamp); // Convert seconds to milliseconds

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
};
