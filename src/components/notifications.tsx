import * as React from 'react';
import { createPortal } from 'react-dom';
import { Notification } from '../contexts';
import { CheckCircle, Close, Error, Info, Warning } from './icons';
import { Button } from './button';
import { Flex } from './flex';

export interface NotificationsProps {
  notifications: Notification[];
  deleteNotification: (id: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = (props) => {
  const icon = (type: 'info' | 'success' | 'warning' | 'danger') => {
    if (type == 'info') {
      return <Info />;
    } else if (type == 'success') {
      return <CheckCircle />;
    } else if (type == 'warning') {
      return <Warning />;
    } else if (type == 'danger') {
      return <Error />;
    }
  };

  return createPortal(
    <div className={`notifications`}>
      {props.notifications.map((notification, index) => (
        <div className={`notifications__item notifications__item-${notification.type}`} key={index}>
          <div className={'notifications__item_icon'}>{icon(notification.type)}</div>
          <Flex vertical gap={'small'}>
            <div className={`notifications__item_title ${!notification.message && 'margin-top-5'}`}>
              {notification.title}
            </div>
            {notification.message && <div className={'notifications__item_message'}>{notification.message}</div>}
          </Flex>
          <Button size={'small'} onClick={() => props.deleteNotification(notification.id)} icon={<Close />} />
        </div>
      ))}
    </div>,
    document.body
  );
};
