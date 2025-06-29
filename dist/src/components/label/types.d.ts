import { ReactElement, ReactNode } from 'react';
export interface ILabelProps {
    color?: 'red' | 'orange' | 'blue' | 'green';
    children: ReactNode;
    icon?: ReactElement;
    className?: string;
}
