import { AXIOS_OPEN } from '@api/axios';

const publicHolidayRequest = {
  fetchHoliday: async (year: string, month: string) => {
    try {
      const response = await AXIOS_OPEN.get('', {
        params: {
          solYear: year,
          solMonth: month,
          _type: 'json',
        },
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  },
} as const;

export default publicHolidayRequest;
