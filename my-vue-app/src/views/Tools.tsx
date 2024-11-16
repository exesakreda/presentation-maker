import styles from './Tools.module.css'

type ToolsProps = {
    currentTool: 'cursor' | 'text' | 'image',
    onToolSelect: (tool: 'cursor' | 'text' | 'image') => void
}

function Tools({ currentTool, onToolSelect }: ToolsProps) {

    return (
        <div className={styles.tools}>
            <div className={`${styles.tools__item} ${currentTool === 'cursor' ? styles.selectedTool : ''}`} onClick={() => onToolSelect('cursor')}>
                <img src="/src/assets/cursor.svg" alt="" className={styles.item__image} />
            </div>

            <div className={`${styles.tools__item} ${currentTool === 'text' ? styles.selectedTool : ''}`} onClick={() => onToolSelect('text')}>
                <img src="/src/assets/text.svg" alt="" className={styles.item__image} />
            </div>

            <div className={`${styles.tools__item} ${currentTool === 'image' ? styles.selectedTool : ''}`} onClick={() => onToolSelect('image')}>
                <img src="/src/assets/image.svg" alt="" className={styles.item__image} />
            </div>

            {/* <div className={`${styles.tools__item} ${currentTool === 'shape' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('shape')}>
                <img src="/src/assets/shape.svg" alt="" className={styles.item__image} />
            </div> */}
        </div>
    )
}

export { Tools }