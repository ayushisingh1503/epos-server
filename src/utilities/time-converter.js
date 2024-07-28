import { subDays, startOfDay, endOfDay } from "date-fns";

export const getDateTime = (timeSpan) => {
  const currentTime = new Date();

  switch (timeSpan) {
    case "today": {
      const todayStartDate = startOfDay(currentTime).getTime();
      const todayEndDate = endOfDay(currentTime).getTime();
      return {
        startDate: todayStartDate,
        endDate: todayEndDate,
      };
    }
    case "last_7": {
      const StartDate = startOfDay(subDays(currentTime, 7)).getTime();
      const todayEndDate = endOfDay(currentTime).getTime();
      return {
        startDate: StartDate,
        endDate: todayEndDate,
      };
    }
    case "last_30": {
      const StartDate = startOfDay(subDays(currentTime, 30)).getTime();
      const todayEndDate = endOfDay(currentTime).getTime();
      return {
        startDate: StartDate,
        endDate: todayEndDate,
      };
    }
  }
};
