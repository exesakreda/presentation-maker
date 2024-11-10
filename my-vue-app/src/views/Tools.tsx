import { dispatch } from '../services/editor'
import styles from './Tools.module.css'
import type { Tool } from '../../../types'
import { selectTool } from '../services/editorFunctions'

let tool:Tool  = 'cursor'

function getTool() {
    return tool
}

function handleToolSelect(newTool: Tool) {
    tool = newTool
    dispatch(selectTool)
}

function Tools() {
    return (
        <div className={styles.tools}>
            <div className={`${styles.tools__item} ${tool === 'cursor' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('cursor')}>
                <img src="/src/assets/cursor.svg" alt="" className={styles.item__image} />
            </div>

            <div className={`${styles.tools__item} ${tool === 'text' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('text')}>
                <img src="/src/assets/text.svg" alt="" className={styles.item__image} />
            </div>

            <div className={`${styles.tools__item} ${tool === 'image' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('image')}>
                <img src="/src/assets/image.svg" alt="" className={styles.item__image} />
            </div>

            {/* <div className={`${styles.tools__item} ${currentTool === 'shape' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('shape')}>
                <img src="/src/assets/shape.svg" alt="" className={styles.item__image} />
            </div> */}
        </div>
    )
}

export { Tools, getTool, handleToolSelect }