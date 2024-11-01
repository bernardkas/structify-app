export const filterDataByTimeRange = (data: any[], range: string, dateField: string) => {
    const now = new Date();
    const pastDate = new Date();

    switch (range) {
        case '1':
            pastDate.setMonth(now.getMonth() - 1);
            break;
        case '3':
            pastDate.setMonth(now.getMonth() - 3);
            break;
        case '6':
            pastDate.setMonth(now.getMonth() - 6);
            break;
        case '12':
            pastDate.setFullYear(now.getFullYear() - 1);
            break;
        case 'all':
            return data; 
        default:
            return data; 
    }

    return data.filter(item => new Date(item[dateField]) >= pastDate);
};
