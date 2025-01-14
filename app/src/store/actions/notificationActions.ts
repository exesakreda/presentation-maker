import { NotificationActionType } from "../types/notificationType"

export const addNotification = (type: 'error' | 'success', message: string, info?: string) => ({
    type: NotificationActionType.ADD_NOTIFICATION,
    payload: { type, message, info }
})

export const removeNotification = (id: string) => ({
    type: NotificationActionType.REMOVE_NOTIFICATION,
    payload: { id }
})

