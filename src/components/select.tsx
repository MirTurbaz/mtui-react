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
  const [optionsRef, setOptionsRef] = useState<HTMLDivElement>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleToggleOpen = () => {
    if (!open) return setOpen(true);
    handleCloseOptions();
  };

  const handleCloseOptions = () => {
    optionsRef.classList.add('select__options-wrapper--hidden');

    setTimeout(() => {
      setOpen(false);
      optionsRef.classList.remove('select__options-wrapper--hidden');
    }, 200);
  };

  useEffect(() => {
    if (!open) return;

    const handleOutsideCLick = (event: MouseEvent | TouchEvent) => {
      if (ref && !ref.contains(event.target as Node)) handleCloseOptions();
    };

    document.body.addEventListener('click', handleOutsideCLick);

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
      <div onClick={handleToggleOpen} className={classNames} ref={setRef} style={props.style}>
        <div className={'select__left'}>
          {props.icon && <div className={'text_field__icon'}>{props.icon}</div>}
          <div className={'select__input'}>
            {props.size != 'mini' && <div className={'select__label'}>{props.label}</div>}
            {(props.size == 'mini' || value) && valueElement}
          </div>
        </div>
        <Expand rotated={open} />
        <div className={'select__options-wrapper'} ref={setOptionsRef}>
          <div className={'select__options-container'}>
            {props.options
              ?.filter((option) => option.label.toString().toLowerCase().includes(search.toLowerCase()))
              ?.map((option) => (
                <div
                  className={'select__option'}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (props.onChange) {
                      props.onChange(option);
                    } else {
                      setValue(option);
                    }
                    handleCloseOptions();
                  }}
                  key={option.value}
                >
                  {option.label}
                </div>
              ))}
          </div>
        </div>
      </div>
      {typeof props.error !== 'boolean' && props.error && (
        <div className={'text_field__bottom_error'}>{props.error}</div>
      )}
    </div>
  );
};
