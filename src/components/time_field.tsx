import * as React from 'react';
import { TextField, TextFieldProps } from './text_field';

export const TimeField: React.FC<TextFieldProps> = (props) => {
  return <TextField mask={['9:99', '99:99']} uncontrolled={true} {...props} />;
};
