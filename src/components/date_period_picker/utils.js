import { useState } from 'react';
export class DateFormatUtils {
    static useDatesState(defaultStartDate = null, defaultEndDate = null) {
        const [startDate, setStartDate] = useState(defaultStartDate);
        const [endDate, setEndDate] = useState(defaultEndDate);
        function updateDates(startDate, endDate) {
            setStartDate(startDate);
            setEndDate(endDate);
        }
        return [startDate, endDate, updateDates];
    }
}
DateFormatUtils.DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';
//# sourceMappingURL=date_period_picker.utils.js.map