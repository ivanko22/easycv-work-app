const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  
export const formatMonth = (month) => {
    return months[month];
  };
  
export const dateFormatation = (date) => {
    const startDate = new Date(date[0]);
    const endDate = new Date(date[1]);

    const period = `
      ${formatMonth(startDate.getMonth())} 
      ${startDate.getFullYear()} - 
      ${formatMonth(endDate.getMonth())} 
      ${endDate.getFullYear()}
    `;

return period;
};