  export const getStartDate = (range: any) => { 
    const date = new Date();
    if (range === "1") {
      date.setMonth(date.getMonth() - 1);
    } else if (range === "3") {
      date.setMonth(date.getMonth() - 3);
    } else if (range === "6") {
      date.setMonth(date.getMonth() - 6);
    } else if (range === "12") {
      date.setFullYear(date.getFullYear() - 1);
    } else {
      return null; // All time
    }
    return date;
  };
  
  