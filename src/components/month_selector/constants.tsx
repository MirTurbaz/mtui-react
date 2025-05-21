import { dayjs } from '../../shared/lib/date/dayjs';
import { capitalize } from '../../shared/lib/string';

export const MONTHS_SHORT_NAMES = dayjs.monthsShort().map((monthName) => capitalize(monthName));
