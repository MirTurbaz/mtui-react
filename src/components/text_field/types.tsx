import * as React from 'react';
import { HTMLInputTypeAttribute, ReactElement } from 'react';

interface ITextFieldFocusProps {
  focus?: boolean;
  autofocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface TextFieldProps extends ITextFieldFocusProps {
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
  key?: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  mask?: string | string[];
  error?: string | boolean;
  wrapperClassName?: string;
  hideSpinButtons?: boolean;
  required?: boolean;
  uncontrolled?: boolean;
  borderless?: boolean;
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  clearIcon?: ReactElement;
}
