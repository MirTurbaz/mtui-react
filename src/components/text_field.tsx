import Inputmask from 'inputmask';
import * as React from 'react';
import { HTMLInputTypeAttribute, ReactElement, useEffect, useRef, useState } from 'react';

export interface TextFieldProps {
  className?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  icon?: ReactElement | string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: 'default' | 'mini';
  onChange?: (value: string) => void;
  onClick?: (e) => void;
  readonly?: boolean;
  wrapperRef?: any;
  inputRef?: any;
  type?: HTMLInputTypeAttribute;
  bottomLabel?: string;
  min?: number;
  max?: number;
  onBlur?: () => void;
  onFocus?: () => void;
  key?: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  mask?: string | string[];
  error?: string | boolean;
  wrapperClassName?: string;
  hideSpinButtons?: boolean;
  required?: boolean;
  uncontrolled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(props.value ?? '');
  const inputRef = useRef(null);

  function handleChange({ target: { value: newValue } }) {
    setValue(newValue);
    if (props.mask) {
      props.onChange?.(newValue?.replaceAll('_', ''));
    } else {
      props.onChange?.(newValue);
    }
  }

  function handleBlur(e) {
    props.onBlur?.();
    setFocus(false);
    if (props.uncontrolled) {
      handleChange(e);
    }
  }

  useEffect(() => {
    if (props.value !== value) {
      if (props.uncontrolled) {
        (props.inputRef?.current ?? inputRef.current).value = props.value ?? '';
        if (props.value?.length > 0 != value?.length > 0) {
          setValue(props.value ?? '');
        }
      } else {
        setValue(props.value ?? '');
      }
    }
  }, [props.value]);

  let classNames = `text_field__wrapper ${props.className} text_field-size_${props.size ?? 'default'}`;
  if (focus) classNames += ' text_field-focus';
  if (value?.length > 0) classNames += ' text_field-filled';
  if (props.disabled) classNames += ' text_field-disabled';
  if (props.error) classNames += ' text_field-error';

  useEffect(() => {
    if (!props.mask) return;
    if (props.mask != 'Hh:Mm') {
      new Inputmask(props.mask as string, { showMaskOnHover: false }).mask(props.inputRef?.current ?? inputRef.current);
      return;
    }

    new Inputmask(props.mask, {
      definitions: {
        H: {
          validator: '[0-2]',
          cardinality: 1,
        },
        h: {
          validator: function (ch, maskset, pos, strict, opts) {
            const firstDigit = maskset.buffer[0];
            if (firstDigit === '2') {
              return /^[0-3]$/.test(ch);
            }
            return /^[0-9]$/.test(ch);
          },
          cardinality: 1,
        },
        M: {
          validator: '[0-5]',
          cardinality: 1,
        },
        m: {
          validator: '[0-9]',
          cardinality: 1,
        },
      },
    }).mask(inputRef?.current ?? props.inputRef?.current);
  }, [props.mask]);

  const controlProps = props.uncontrolled ? {} : { value: value, onChange: handleChange };

  return (
    <div className={`text_field ${props.wrapperClassName}`} style={props.wrapperStyle} ref={props.wrapperRef}>
      <div className={classNames}>
        {props.icon && <div className={'text_field__icon'}>{props.icon}</div>}
        <div className={'text_field__input_wrapper'}>
          <input
            ref={props.inputRef ?? inputRef}
            className={`text_field__input ${props.hideSpinButtons && 'text_field__input-hide_spin'}`}
            onFocus={() => {
              setFocus(true);
              props.onFocus?.();
            }}
            onClick={props.onClick}
            disabled={props.disabled}
            onBlur={handleBlur}
            onWheel={(e) => {
              if (props.type == 'number') e.target.blur();
            }}
            type={props.type}
            required={props.required}
            style={props.style}
            readOnly={props.readonly}
            min={props.min}
            max={props.max}
            {...controlProps}
            onKeyDown={(e) => {
              if (e.key === 'Enter') props.onEnter?.();
              props.onKeyDown?.(e);
            }}
          />
          <div className={'text_field__placeholder'}>{props.placeholder}</div>
        </div>
      </div>
      {props.bottomLabel && <div className={'text_field__bottom_label'}>{props.bottomLabel}</div>}
      {typeof props.error !== 'boolean' && props.error && (
        <div className={'text_field__bottom_error'}>{props.error}</div>
      )}
    </div>
  );
};
