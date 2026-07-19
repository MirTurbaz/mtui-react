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
export declare const NotificationContext: import("react").Context<NOTIFICATION_CONTEXT>;
