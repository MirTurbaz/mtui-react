import Inputmask from 'inputmask';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { TextFieldProps } from './types';
import { Clear } from '../icons/clear';

export const TextField: React.FC<TextFieldProps> = ({ ...props }) => {
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

  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    setValue('');
    props.onClear?.(event);
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
  if (props.borderless) classNames += ' text_field__wrapper--borderless';

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

  const showClearButton: boolean = Boolean(!props.uncontrolled && props.onClear && value.length);

  useEffect(() => {
    if (props.focus == null) return;

    if (props.focus != focus) setFocus(props.focus);
  }, [props.focus]);

  return (
    <div className={`text_field ${props.wrapperClassName ?? ''}`} style={props.wrapperStyle} ref={props.wrapperRef}>
      <div className={classNames}>
        {props.icon && <div className={'text_field__icon'}>{props.icon}</div>}
        <div className={'text_field__input_wrapper'}>
          <input
            ref={props.inputRef ?? inputRef}
            className={`text_field__input ${props.hideSpinButtons && 'text_field__input-hide_spin'}`}
            onFocus={() => {
              if (props.focus != null) return;

              setFocus(true);
              props.onFocus?.();
            }}
            onMouseDown={props.onClick}
            disabled={props.disabled}
            onBlur={handleBlur}
            onWheel={(event) => {
              if (props.type == 'number') {
                const target = event.target as HTMLElement;
                target.blur();
              }
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
            autoFocus={props.autofocus}
          />
          <div className={'text_field__placeholder'}>{props.placeholder}</div>
        </div>
        {showClearButton ? (
          <label className={'text_field__clear'}>
            <button type={'button'} hidden onClick={handleClear}></button>
            {props.clearIcon ?? <Clear />}
          </label>
        ) : (
          ''
        )}
      </div>
      {props.bottomLabel && <div className={'text_field__bottom_label'}>{props.bottomLabel}</div>}
      {typeof props.error !== 'boolean' && props.error && (
        <div className={'text_field__bottom_error'}>{props.error}</div>
      )}
    </div>
  );
};
