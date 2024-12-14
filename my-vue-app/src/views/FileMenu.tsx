import { EditorType } from "../services/EditorType";
import { useState, useRef } from "react"
import { dispatch } from "../services/editor";
import { setTitle, updateSlideList } from "../services/editorFunctions";
import styles from './FileMenu.module.css'

type FileMenuProps = {
    editor: EditorType
}

function FileMenu({editor}: FileMenuProps) {
    const [isMenuActive, setIsMenuActive] = useState(false)
    function handleClickOnMenu() {
        setIsMenuActive(!isMenuActive)
    }
    function savePresentationAsJSON() {
        const jsonData = {
            title: editor.title,
            slideList: editor.slideList
        }

        const jsonString = JSON.stringify(jsonData, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = editor.title + '_data.json'
        link.click()
        URL.revokeObjectURL(link.href)

    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const object = JSON.parse(reader.result as string)
                dispatch(setTitle, object.title)
                dispatch(updateSlideList, object.slideList)
            }
            reader.readAsText(file)
        }
    }

    return (
        <>
            <div
                className={styles.title__menu}
                onMouseDown={handleClickOnMenu}
                style={{
                    transform: isMenuActive ? 'rotate(180deg)' : 'rotate(0deg)',
                    opacity: isMenuActive ? '1' : '0.3'
                }}
            >
                <img src='src/assets/arrowdown.svg' className={styles.arrowdown} />
            </div>
            <div className={styles.menu} style={{
                opacity: isMenuActive ? '1' : '0',
                pointerEvents: isMenuActive ? 'all' : 'none'
            }}>
                <div className={styles.menu__item}>Новая презентация</div>
                <div className={styles.menu__item} onClick={handleFileUploadClick}>Открыть</div>
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    style={{
                        display: 'none'
                    }}
                    onChange={handleFileChange}
                />
                <div className={styles.menu__item} onMouseDown={savePresentationAsJSON}>Сохранить как JSON</div>
                <div className={styles.menu__item}>Экспорт в PDF</div>
            </div>

        </>
    )
}

export { FileMenu }