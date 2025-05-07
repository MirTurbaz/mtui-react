import * as React from 'react';
import { ReactElement } from 'react';
import { AlertCircle } from './icons';

interface IAlertProps {
  message: string;
  status?: 'default' | 'success' | 'info' | 'warning' | 'danger';
  size?: 'small' | 'middle' | 'large';
  type?: 'default' | 'text';
  className?: string;
  icon?: ReactElement | false;
}

export const Alert: React.FC<IAlertProps> = ({ status = 'default', size = 'middle', type = 'default', ...props }) => {
  return (
    <div className={`${props.className ?? ''} alert alert_status_${status} alert_size_${size} alert_type_${type}`}>
      {props.icon}
      {props.icon !== false && !props.icon && <AlertCircle />}
      <span>{props.message}</span>
    </div>
  );
};
