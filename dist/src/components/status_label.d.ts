import * as React from 'react';
import { ReactElement } from 'react';
export declare const STATUSES_CLASS_NAMES: {
    Новая: string;
    '\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u0437\u0430\u0435\u0437\u0434\u0430': string;
    Заехал: string;
    Выехал: string;
    Отменена: string;
    Незаезд: string;
};
interface StatusLabelProps {
    dummyStatus?: string;
    statusName?: string | ReactElement;
    color?: 'red' | 'orange' | 'blue' | 'green';
    className?: string;
    icon?: ReactElement;
    isBooking?: boolean;
}
export declare const StatusLabel: React.FC<StatusLabelProps>;
export {};
