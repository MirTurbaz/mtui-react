import { SelectOption } from '../';
import { MONTHS_NAMES } from '../../shared/constants/date';
import { dayjs } from '../../shared/lib/date';

export const WEEK_DAYS: Array<string> = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

/** Время анимации прокрутки календаря при смене месяца */
export const SLIDE_ANIMATION_DURATION: number = 500;

export const MONTHS_OPTIONS: SelectOption[] = MONTHS_NAMES.map(
  (monthName, monthIndex) =>
    ({
      value: monthIndex,
      label: monthName,
    }) as SelectOption
);

export const YEAR_OPTIONS: SelectOption[] = Array.from({ length: 100 }, (_, i) => {
  const year = dayjs().year() - i;
  return { value: year, label: String(year) };
});
