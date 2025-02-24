import * as React from 'react';
import { Notification } from '../../contexts/notification_context';
export interface NotificationsProps {
    notifications: Notification[];
    deleteNotification: (id: string) => void;
}
export declare const Notifications: React.FC<NotificationsProps>;
