export const getMonthlyBudgetData = (
    data: any[],
    dateKey: string,
    budgetKey: string
  ) => {
    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
      name: new Date(0, index).toLocaleString('default', { month: 'short' }),
      total: 0,
    }));
  
    data.forEach((item: any) => {
      const projectMonth = new Date(item[dateKey]).getMonth();
      if (item[budgetKey]) {
        monthlyData[projectMonth].total += item[budgetKey];
      }
    });
  
    return monthlyData;
  };
  