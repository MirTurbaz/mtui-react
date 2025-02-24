import { createContext } from 'react';

export interface NOTIFICATION_CONTEXT {
  addNotification: (notification: Notification, clearBeforeAdd?: boolean) => string;
  deleteNotification: (id: string) => void;
}

export type Notification = {
  id?: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  message?: string;
};

export const NotificationContext = createContext<NOTIFICATION_CONTEXT>({
  addNotification: (notification: Notification) => '',
  deleteNotification: (id: string) => {},
});
