import * as React from 'react';
import { ReactElement } from 'react';
interface IAlertProps {
    message: string;
    status?: 'default' | 'success' | 'info' | 'warning' | 'danger';
    size?: 'small' | 'middle' | 'large';
    type?: 'default' | 'text';
    className?: string;
    icon?: ReactElement | false;
}
export declare const Alert: React.FC<IAlertProps>;
export {};
