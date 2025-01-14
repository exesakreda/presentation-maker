import styles from '../assets/styles/Loader.module.css'

function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
            {/* <div className={styles.text}>Загрузка...</div> */}
        </div>
    )
}

export { Loader }