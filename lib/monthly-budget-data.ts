export const getMonthlyBudgetAndHoursData = (
  data: any[],
  dateKey: string,
  budgetKey: string,
  hoursKey: string,
  minutesKey: string
) => {
  const monthlyData = Array.from({ length: 12 }, (_, index) => ({
    name: new Date(0, index).toLocaleString('default', { month: 'short' }),
    totalBudget: 0,
    totalHours: 0,
  }));

  data.forEach((project: any) => {
    // Accumulate budget
    const projectMonth = new Date(project[dateKey]).getMonth();
    if (project[budgetKey]) {
      monthlyData[projectMonth].totalBudget += project[budgetKey];
    }

    // Accumulate hours
    if (Array.isArray(project.projectHours)) {
      project.projectHours.forEach((hourEntry: any) => {
        const entryMonth = new Date(hourEntry[dateKey]).getMonth();
        const totalMinutes =
          (hourEntry[hoursKey] || 0) * 60 + (hourEntry[minutesKey] || 0);
        const totalHours = totalMinutes / 60;
        monthlyData[entryMonth].totalHours += totalHours;
      });
    }
  });

  return monthlyData;
};
