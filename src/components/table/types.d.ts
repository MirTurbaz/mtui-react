import * as React from 'react';
export interface ITableProps<T> {
    dataSource: Array<T>;
    columns: Array<IColumnProps<T>>;
    className?: string;
    rowLink?: string | ((row: T) => string);
}
/**
 * Inspired by: [Ant design]{@link https://ant.design/components/table#column}
 */
export interface IColumnProps<T> {
    className?: string;
    dataIndex?: keyof T;
    render?: (text: string, record: T) => React.ReactNode;
    title: string;
    width: number | 'auto';
}
