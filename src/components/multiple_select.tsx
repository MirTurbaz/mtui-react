import * as React from 'react';
import { ReactElement, useState } from 'react';
import { Done, Expand } from './icons';
import { Popup } from './popup';
import { SelectOption } from './select';

export interface SelectProps {
  className?: string;
  style?: React.CSSProperties;
  value?: (string | number)[];
  label?: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange?: (value: (string | number)[]) => void;
  forcePositionBottom?: boolean;
  placeholder?: string;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
  renderOption?: (option: SelectOption, selected: boolean) => ReactElement | string;
  icon?: ReactElement | string;
  size?: 'default' | 'mini';
}

export const MultipleSelect: React.FC<SelectProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [ref, setRef] = useState<HTMLElement>(null);

  return (
    <div style={props.wrapperStyle} className={props.wrapperClassName}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={`multiple_select__wrapper ${open && 'multiple_select__wrapper-open'} multiple_select-size_${props.size ?? 'default'}`}
        style={props.style}
        ref={setRef}
      >
        {props.icon && <div className={'text_field__icon'}>{props.icon}</div>}
        <div className={'multiple_select__input'}>
          {!props.value?.length && <div className={'multiple_select__label'}>{props.label}</div>}
          {props.value?.map((v, i) => {
            let option = props.options.find((o) => o.value == v);
            if (props.renderOption) {
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(props.value.filter((v) => v != option.value));
                  }}
                >
                  {props.renderOption(option, true)}
                </div>
              );
            } else {
              return (
                <div>
                  {option.label}
                  {i + 1 != props.value?.length && ', '}
                </div>
              );
            }
          })}
        </div>
        <Expand rotated={open} />
      </div>
      <Popup open={open} anchor={ref} onClose={() => setOpen(false)} id={'multiselect_popup'}>
        <div className={'multiple_select__options'}>
          {props.options?.map((option, index) => (
            <div
              className={`multiple_select__option ${props.value?.includes(option.value) && 'multiple_select__option-selected'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (props.value?.includes(option.value)) {
                  props.onChange(props.value.filter((v) => v != option.value));
                } else {
                  props.onChange([...(props.value ?? []), option.value]);
                }
                setOpen(false);
              }}
              key={index}
            >
              {props.renderOption ? props.renderOption(option, false) : option.label}
              {props.value?.includes(option.value) && <Done color={'#000000CC'} />}
            </div>
          ))}
        </div>
      </Popup>
    </div>
  );
};
