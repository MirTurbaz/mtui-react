import * as React from 'react';
import { HTMLInputTypeAttribute, ReactElement } from 'react';

interface ITextFieldFocusProps {
  focus?: boolean;
  autofocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface ITextFieldValueProps {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Игнорируется, если не задано `TextField[onClear]` */
  clearIcon?: ReactElement;
}

export interface TextFieldProps extends ITextFieldFocusProps, ITextFieldValueProps {
  className?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  icon?: ReactElement | string;
  disabled?: boolean;
  placeholder?: string;
  size?: 'default' | 'mini';
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
}
