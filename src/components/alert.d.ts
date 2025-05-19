import * as React from 'react';
import { ReactElement } from 'react';
interface IAlertProps {
    message: string | ReactElement;
    /** @default default */
    status?: 'default' | 'success' | 'info' | 'warning' | 'danger';
    /** @default middle */
    size?: 'small' | 'middle' | 'large';
    /** @default default */
    type?: 'default' | 'text';
    className?: string;
    icon?: ReactElement | false;
}
export declare const Alert: React.FC<IAlertProps>;
export {};
