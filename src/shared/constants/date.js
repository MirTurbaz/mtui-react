import { dayjs } from '../lib/date/dayjs';
import { capitalize } from '../lib/string';
export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';
export const MONTHS_NAMES = dayjs.months().map((monthName) => capitalize(monthName));
//# sourceMappingURL=date.js.map