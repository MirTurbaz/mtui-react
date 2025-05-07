import * as React from 'react';
import { Close } from './icons';

export interface ChipsProps {
  className?: string;
  chips: ChipType[];
  style?: React.CSSProperties;
  onDelete?: (value: any, label: string) => void;
}

export interface ChipType {
  label: string;
  value: any;
}

export const Chips: React.FC<ChipsProps> = (props) => {
  if (props.chips.length == 0) return null;

  return (
    <div style={props.style} className={`chips__wrapper ${props.className}`}>
      {props.chips.map((chip) => (
        <div className={'chip__wrapper'} onClick={() => props.onDelete(chip.value, chip.label)}>
          {chip.label}
          <Close size={16} color={'#417ee1cc'} />
        </div>
      ))}
    </div>
  );
};
