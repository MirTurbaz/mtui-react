import * as React from 'react';
interface TabsProps<T> {
    className?: string;
    items: ItemType<T>[];
    value: T;
    onChange: (value: T) => void;
}
export type ItemType<T> = {
    key: T;
    label: string;
    onClick?: (key: T) => void;
};
export declare const Tabs: <T>(props: TabsProps<T>) => React.JSX.Element;
export {};
