import * as React from 'react';
import { ReactNode } from 'react';
export interface IEmptyDataProps {
    title: string | ReactNode;
    description?: string | ReactNode;
    icon: ReactNode;
    actions?: ReactNode | ReactNode[];
    className?: string;
}
export declare const EmptyData: React.FC<IEmptyDataProps>;
