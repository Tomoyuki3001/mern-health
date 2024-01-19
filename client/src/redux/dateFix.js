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

export { toDateFix, fromDateFix };
