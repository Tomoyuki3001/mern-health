const fromDateFix = (value) => {
  const isoFrom = value.timeFrom;
  const dateFrom = new Date(isoFrom);

  const formattedFrom = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(dateFrom);

  return formattedFrom;
};

const toDateFix = (value) => {
  const isoFrom = value.timeTo;
  const dateTo = new Date(isoFrom);

  const formattedTo = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(dateTo);

  return formattedTo;
};

const appointmentTime = (value) => {
  const dateTo = new Date(value);
  const formattedTo = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(dateTo);

  return formattedTo;
};

const appointmentDate = (value) => {
  const originalDate = new Date(value);
  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const year = originalDate.getFullYear();

  return `${month}-${day}-${year}`;
};

export { toDateFix, fromDateFix, appointmentTime, appointmentDate };
