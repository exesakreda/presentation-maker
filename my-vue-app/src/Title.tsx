import React from "react"

import styles from './Title.module.css'

import { minPresentation } from "./App"
import { maxPresentation } from "./App"
import { isMax } from "./App"

function Title() {
    if (isMax) {
        return(
            <div className={styles.title}>{maxPresentation.title}</div>
        )
    }
    return(
        <div className={styles.title}>{minPresentation.title}</div>
    )
}

export { Title }