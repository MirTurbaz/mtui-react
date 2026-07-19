import { MONTHS_NAMES } from '../../shared/constants/date';
import { dayjs } from '../../shared/lib/date';
export const WEEK_DAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
/** Время анимации прокрутки календаря при смене месяца */
export const SLIDE_ANIMATION_DURATION = 500;
export const MONTHS_OPTIONS = MONTHS_NAMES.map((monthName, monthIndex) => ({
    value: monthIndex,
    label: monthName,
}));
export const YEAR_OPTIONS = Array.from({ length: 100 }, (_, i) => {
    const year = dayjs().year() - i;
    return { value: year, label: String(year) };
});
//# sourceMappingURL=constants.js.map