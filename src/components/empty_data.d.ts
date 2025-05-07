import * as React from 'react';
import { ReactNode } from 'react';
export interface IEmptyDataProps {
    title: string;
    description?: string | ReactNode;
    icon: React.ReactNode;
    actions?: React.ReactNode | React.ReactNode[];
}
export declare const EmptyData: React.FC<IEmptyDataProps>;
