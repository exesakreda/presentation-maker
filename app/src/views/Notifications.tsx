import styles from '../assets/styles/Notifications.module.css'
import { Notification } from "../../../types"
import { useEffect, useState } from 'react'

type NotificationProps = {
    notifications: Notification[],
    setNotifications: (notifications: Notification[]) => void
}

function Notifications({ notifications, setNotifications }: NotificationProps) {
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (timerId) {
            clearTimeout(timerId)
        }

        if (notifications.length > 0) {
            const newTimerId = setTimeout(() => {
                removeNotification(notifications[0].id)
            }, 10000) 

            setTimerId(newTimerId)

            return () => {
                clearTimeout(newTimerId)
            }
        }
    }, [notifications])

    const removeNotification = (id: string) => {
        setNotifications(notifications.filter(notification => notification.id !== id))
    }

    const notificationList = notifications.map(notification => (
        notification.type === 'error' ? (
            <div
                key={notification.id}
                id={notification.id}
                className={styles.notification}
                style={{ height: '54px' }}
                onClick={() => removeNotification(notification.id)}
            >
                <div className={styles.notification__text}>
                    <div className={styles.notification__message}>{notification.message}</div>
                    <div className={styles.notification__info}>{notification.info}</div>
                </div>
                <img src="/src/assets/images/alert.svg" alt="" />
            </div>
        ) : (
            <div
                key={notification.id}
                id={notification.id}
                className={styles.notification}
                style={{ height: '39px' }}
                onClick={() => removeNotification(notification.id)}
            >
                <div className={styles.notification__message}>{notification.message}</div>
                <img src="/src/assets/images/success.svg" className={styles.success_icon} alt="" />
            </div>
        )
    ))

    return (
        <div className={styles.notification_list}>
            {notificationList}
        </div>
    )
}

export { Notifications }
