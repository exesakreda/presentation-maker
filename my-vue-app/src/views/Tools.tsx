import { dispatch } from '../services/editor'
import styles from './Tools.module.css'
import { selectTool } from '../services/editorFunctions'

let currentTool: 'cursor' | 'text' | 'image' | 'shape' = 'cursor'

function Tools() {

    function handleToolSelect(tool: 'cursor' | 'text' | 'image' | 'shape') {
      currentTool = tool;
      console.log(`Выбран инструмент: ${currentTool}`)
      dispatch(selectTool)
    }
    
    return (
        <div className={styles.tools}>
            <div className={`${styles.tools__item} ${currentTool === 'cursor' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('cursor')}>
                <img src="/src/assets/cursor.svg" alt="" className={styles.item__image}/>
            </div>

            <div className={`${styles.tools__item} ${currentTool === 'text' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('text')}>
                <img src="/src/assets/text.svg" alt="" className={styles.item__image}/>
            </div>
            
            <div className={`${styles.tools__item} ${currentTool === 'image' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('image')}>
                <img src="/src/assets/image.svg" alt="" className={styles.item__image}/>
            </div>

            <div className={`${styles.tools__item} ${currentTool === 'shape' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('shape')}>
                <img src="/src/assets/shape.svg" alt="" className={styles.item__image}/>
            </div>
        </div>
    )
}

export { Tools }