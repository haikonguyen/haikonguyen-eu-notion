import dayjs from 'dayjs';

export const euDateFormat = (date: string | undefined): string =>
  date && dayjs(date).isValid() ? dayjs(date).format('DD/MM/YYYY') : '';
