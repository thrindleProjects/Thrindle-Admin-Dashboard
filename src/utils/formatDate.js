const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = date.slice(0, 4);
  let day = date.slice(8, 10);
  let month = date.slice(5, 7);
  return `${months[month - 1]} ${day}, ${year}`;
};

export default formatDate;
