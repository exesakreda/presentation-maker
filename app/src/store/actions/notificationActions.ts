import { NotificationActionType } from "../types/notificationType"

export const addNotification = (message: string, type: 'error' | 'success' | 'info', info?: string) => ({
    type: NotificationActionType.ADD_NOTIFICATION,
    payload: { message, type, info }
})

export const removeNotification = (id: string) => ({
    type: NotificationActionType.REMOVE_NOTIFICATION,
    payload: { id }
})