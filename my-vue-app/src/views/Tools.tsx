import React from "react"

import styles from './Tools.module.css'

function Tools() {
    return (
        <div className={styles.tools}>
            <div className={styles.tools__item}>
                <img src="/src/assets/cursor.svg" alt="" className={styles.item__image}/>
            </div>

            <div className={styles.tools__item}>
                <img src="/src/assets/text.svg" alt="" className={styles.item__image}/>
            </div>
            
            <div className={styles.tools__item}>
                <img src="/src/assets/image.svg" alt="" className={styles.item__image}/>
            </div>

            <div className={styles.tools__item}>
                <img src="/src/assets/shape.svg" alt="" className={styles.item__image}/>
            </div>
        </div>
    )
}

export { Tools }