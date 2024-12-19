import styles from '../assets/styles/Notifications.module.css'
import { removeNotification } from '../store/actions/notificationActions'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/reducers/rootReducer'

function Notifications() {
    const notifications = useSelector((state: RootState) => state.notifications)
    const dispatch = useDispatch()

    const notificationList = notifications.map(notification => (
        notification.type === 'error' ? (
            <div
                key={notification.id}
                id={notification.id}
                className={styles.notification}
                style={{ height: '54px' }}
                onClick={() => dispatch(removeNotification(notification.id))}
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
                onClick={() => dispatch(removeNotification(notification.id))}
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
