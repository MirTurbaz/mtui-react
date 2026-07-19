import { jsx as _jsx } from "react/jsx-runtime";
import { CalendarDates } from '../../icons';
import { DEFAULT_DATE_FORMAT } from '../../../shared/constants/date';
import { capitalize } from '../../../shared/lib/string';
export const DATE_PICKER_CONFIG = {
    date: {
        defaultIcon: _jsx(CalendarDates, {}),
        getValue: (date) => {
            if (date) {
                return date.format(DEFAULT_DATE_FORMAT);
            }
            else {
                return '';
            }
        },
    },
    month: {
        defaultIcon: '',
        getValue: (date) => {
            if (date) {
                return capitalize(date.format('MMMM YYYY'));
            }
            else {
                return '';
            }
        },
    },
};
//# sourceMappingURL=config.js.map