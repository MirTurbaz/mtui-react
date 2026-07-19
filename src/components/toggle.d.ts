import * as React from 'react';
import { ReactElement } from 'react';
export interface ToggleProps {
    labelOn: string | ReactElement;
    labelOff: string | ReactElement;
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
    size?: 'normal' | 'small';
}
export declare const Toggle: React.FC<ToggleProps>;
