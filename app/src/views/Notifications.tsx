import styles from '../assets/styles/Notifications.module.css'
import { removeNotification } from '../store/actions/notificationActions'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/reducers/rootReducer'
import { motion, AnimatePresence } from 'motion/react'
import { Notification } from '../../../types'

function Notifications() {
    const notifications = useSelector((state: RootState) => state.notifications)
    const dispatch = useDispatch()

    const renderNotification = (notification: Notification) => (
        notification.type === 'error' ? (
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, y: 100 }}
                key={notification.id}
                id={notification.id}
                className={styles.notification}
                onClick={() => dispatch(removeNotification(notification.id))}
            >
                <div className={styles.notification__text}>
                    <div className={styles.notification__message}>{notification.message}</div>
                    <div className={styles.notification__info}>{notification.info}</div>
                </div>
                <img className={styles.notification__image} src="/src/assets/images/alert_2.svg" alt="" />
            </motion.div>
        ) : (
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, y: 100 }}
                key={notification.id}
                id={notification.id}
                className={styles.notification}
                onClick={() => dispatch(removeNotification(notification.id))}
            >
                <div className={styles.notification__message}>{notification.message}</div>
                <img className={styles.notification__image} src="/src/assets/images/success.svg" alt="" />
            </motion.div>
        )
    )

    return (
        <div className={styles.notification_list}>
            <AnimatePresence>
                {notifications.map(renderNotification)}
            </AnimatePresence >
        </div>
    )
}

export { Notifications }
