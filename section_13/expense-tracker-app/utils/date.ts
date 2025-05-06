export class DateUtils {
  static getFormattedDate = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  static getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
  };
}
