import * as React from 'react';
import { ReactElement } from 'react';
interface IPopConfirmProps {
    /** The text of the Cancel button (default: 'Нет') */
    cancelText?: string;
    /** The text of the Confirm button (default: 'Да') */
    okText?: string;
    title: string;
    open?: boolean;
    description?: string | ReactElement;
    onCancel?: (e: any) => void;
    onConfirm: (e: any) => void;
    children?: ReactElement;
    withoutCancel?: boolean;
}
export declare const PopConfirm: React.FC<IPopConfirmProps>;
export {};
