import * as React from 'react';
import { createPortal } from 'react-dom';
import { Notification } from '../contexts/notification_context';
import { Close } from '../icons';
import CheckCircle from '../icons/check_circle';
import Error from '../icons/error';
import Info from '../icons/info';
import Warning from '../icons/warning';
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
          <Button height={'small'} onClick={() => props.deleteNotification(notification.id)}>
            <Close />
          </Button>
        </div>
      ))}
    </div>,
    document.body
  );
};
