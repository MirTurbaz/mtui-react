import * as React from 'react';
import { Add, Minus } from './icons';
import { Button } from './button';
import { InputGroup } from './input_group';
import { TextField } from './text_field';

export interface CountInputProps {
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

export const CountInput: React.FC<CountInputProps> = (props) => {
  const onChange = (value: number) => {
    if ((value <= props.max || props.max == null) && (value >= props.min || props.min == null) && !isNaN(value)) {
      props.onChange?.(value);
    }
  };

  return (
    <InputGroup className={`count_input__wrapper ${props.className}`}>
      <Button
        variant={'outline'}
        disabled={props.min != null && props.value <= props.min}
        onClick={() => onChange(props.value - 1)}
        icon={<Minus />}
      />
      <TextField
        size={'mini'}
        wrapperStyle={{ maxWidth: 44, width: 44 }}
        value={props.value?.toString()}
        onChange={(v) => onChange(parseInt(v))}
      />
      <Button
        variant={'outline'}
        disabled={props.max != null && props.value >= props.max}
        onClick={() => onChange(props.value + 1)}
        icon={<Add />}
      />
    </InputGroup>
  );
};
