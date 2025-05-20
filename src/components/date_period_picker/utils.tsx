import * as moment from 'moment';
import { useState } from 'react';

export class DateFormatUtils {
  public static DEFAULT_DATE_FORMAT: string = 'DD.MM.YYYY';

  static useDatesState(
    defaultStartDate: moment.Moment = null,
    defaultEndDate: moment.Moment = null
  ): [moment.Moment, moment.Moment, (startDate: moment.Moment, endDate: moment.Moment) => void] {
    const [startDate, setStartDate] = useState<moment.Moment>(defaultStartDate);
    const [endDate, setEndDate] = useState<moment.Moment>(defaultEndDate);

    function updateDates(startDate: moment.Moment, endDate: moment.Moment) {
      setStartDate(startDate);
      setEndDate(endDate);
    }

    return [startDate, endDate, updateDates];
  }
}
