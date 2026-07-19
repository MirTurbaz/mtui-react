var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from '../';
import { dayjs } from '../../shared/lib/date/dayjs';
import { CalendarPanel } from './calendar_panel';
export const ScrolledPanels = (_a) => {
    var { month, twoPanels, direction } = _a, props = __rest(_a, ["month", "twoPanels", "direction"]);
    return (_jsx(Flex, { gap: 32, className: `date-selector__scrolled-panels date-selector__scrolled-panels--slide-${direction}`, children: Array(twoPanels ? 3 : 2)
            .fill('')
            .map((_, i) => (_jsx(CalendarPanel, Object.assign({}, props, { onDateClick: () => null, month: dayjs(month).add(i + +(direction == 'right') - 1, 'months') }), i))) }));
};
//# sourceMappingURL=scrolled_panels.js.map