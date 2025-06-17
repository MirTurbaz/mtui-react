import * as React from 'react';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Expand } from './icons';

export interface SelectProps {
  className?: string;
  style?: React.CSSProperties;
  value?: SelectOption;
  label?: string;
  size?: 'default' | 'mini';
  options: SelectOption[];
  disabled?: boolean;
  onChange?: (value: SelectOption) => void;
  forcePositionBottom?: boolean;
  placeholder?: string;
  error?: string | boolean;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
  icon?: ReactElement | string;
  withSearch?: boolean;
}

export interface SelectOption {
  value: string | number;
  label: string | ReactElement;
}

export const Select: React.FC<SelectProps> = (props) => {
  const [value, setValue] = useState(props.value);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleOutsideCLick = (event: MouseEvent | TouchEvent) => {
    if (ref.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) document.body.addEventListener('click', handleOutsideCLick);

    return () => document.body.removeEventListener('click', handleOutsideCLick);
  }, [open]);

  const isSelectFilled = value && value.value != null && value.value !== '';
  let classNames = `select__wrapper ${props.className} select-size_${props.size ?? 'default'}`;
  if (open) classNames += ' select-opened';
  if (isSelectFilled) classNames += ' select-filled';
  if (props.disabled) classNames += ' select-disabled';
  if (window.innerHeight - ref?.getBoundingClientRect().bottom < 350 && !props.forcePositionBottom) {
    classNames += ' select-open_top';
  }
  if (props.error) classNames += ' select-error';

  const valueElement = props.withSearch ? (
    <input
      value={open ? search : isSelectFilled ? (value.label as string) : props.placeholder}
      onChange={(e) => setSearch(e.target.value)}
      className={'select__search'}
    />
  ) : (
    <div className={'select__value'}>{isSelectFilled ? value.label : props.placeholder}</div>
  );

  return (
    <div style={props.wrapperStyle} className={props.wrapperClassName}>
      <div onClick={() => setOpen(!open)} className={classNames} ref={setRef} style={props.style}>
        <div className={'select__left'}>
          {props.icon && <div className={'text_field__icon'}>{props.icon}</div>}
          <div className={'select__input'}>
            {props.size != 'mini' && <div className={'select__label'}>{props.label}</div>}
            {(props.size == 'mini' || value) && valueElement}
          </div>
        </div>
        <Expand rotated={open} />
        <div className={'select__options'}>
          {props.options
            ?.filter((option) => option.label.toString().toLowerCase().includes(search.toLowerCase()))
            ?.map((option, index) => (
              <div
                className={'select__option'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (props.onChange) {
                    props.onChange(option);
                  } else {
                    setValue(option);
                  }
                  setOpen(false);
                }}
                key={index}
              >
                {option.label}
              </div>
            ))}
        </div>
      </div>
      {typeof props.error !== 'boolean' && props.error && (
        <div className={'text_field__bottom_error'}>{props.error}</div>
      )}
    </div>
  );
};
