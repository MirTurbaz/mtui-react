import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

export interface TextAreaProps {
  className?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClick?: (e) => void;
  readonly?: boolean;
  bottomLabel?: string;
  onBlur?: () => void;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(props.value ?? '');
  const ref = useRef(null);

  useEffect(() => {
    setValue(props.value ?? '');
  }, [props.value]);

  let classNames = `text_area__wrapper ${props.className}`;
  if (focus) classNames += ' text_area-focus';
  if (value?.length > 0) classNames += ' text_area-filled';
  if (props.disabled) classNames += ' text_area-disabled';
  if (props.placeholder?.length == 0 || !props.placeholder) classNames += ' text_area-no_placeholder';

  const updateHeight = () => {
    if (!ref.current) return;
    ref.current.style.height = '0px';
    const scrollHeight = ref.current.scrollHeight + 20;
    ref.current.style.height = Math.max(scrollHeight, 96) + 'px';
  };

  useEffect(() => {
    updateHeight();
  }, []);

  return (
    <div className={'text_area'} style={props.wrapperStyle}>
      <div className={classNames}>
        <div className={'text_area__input_wrapper'}>
          <textarea
            className={'text_area__input'}
            onFocus={() => setFocus(true)}
            onClick={props.onClick}
            disabled={props.disabled}
            onBlur={() => {
              props.onBlur?.();
              setFocus(false);
            }}
            ref={ref}
            rows={3}
            style={props.style}
            readOnly={props.readonly}
            value={value}
            onChange={(e) => {
              updateHeight();
              setValue(e.target.value);
              props.onChange?.(e.target.value);
            }}
          />
          {props.placeholder && <div className={'text_area__placeholder'}>{props.placeholder}</div>}
        </div>
      </div>
      {props.bottomLabel && <div className={'text_area__bottom_label'}>{props.bottomLabel}</div>}
    </div>
  );
};
