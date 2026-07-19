import { CalendarDates } from '../../icons';
import { DEFAULT_DATE_FORMAT } from '../../../shared/constants/date';
import { capitalize } from '../../../shared/lib/string';
import { TypePickerVariant } from '../../../shared/types/date_picker';
import { IDatePickerConfig } from './types';

export const DATE_PICKER_CONFIG: Record<TypePickerVariant, IDatePickerConfig> = {
  date: {
    defaultIcon: <CalendarDates />,
    getValue: (date) => {
      if (date) {
        return date.format(DEFAULT_DATE_FORMAT);
      } else {
        return '';
      }
    },
  },
  month: {
    defaultIcon: '',
    getValue: (date) => {
      if (date) {
        return capitalize(date.format('MMMM YYYY'));
      } else {
        return '';
      }
    },
  },
};
