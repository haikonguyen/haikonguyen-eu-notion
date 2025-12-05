import dayjs from 'dayjs';

export const EuDateFormat = (date: string | undefined) =>
  dayjs(date).format('DD/MM/YYYY');

export const truncateText = (text: string, limit: number) => {
  if (text?.length <= limit) {
    return text;
  }
  return text?.slice(0, limit) + '...';
};
