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

export const Tabs = <T,>(props: TabsProps<T>) => {
  return (
    <div className={'tabs__wrapper'}>
      {props.items.map((item) => (
        <div
          className={`tabs__item ${item.key == props.value && 'tabs__item-current'}`}
          onClick={() => props.onChange(item.key)}
          key={item.key as string}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
