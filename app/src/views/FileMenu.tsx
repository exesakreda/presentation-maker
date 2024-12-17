import { EditorType } from "../services/EditorType"
import { useState, useRef } from "react"
import { dispatch } from "../services/editor"
import { setTitle, updateSlideList } from "../services/editorFunctions"
import styles from '../assets/styles/FileMenu.module.css'
import Ajv from "ajv"
import { Notification } from "../../../types"

type FileMenuProps = {
    editor: EditorType,
    notifications: Notification[],
    setNotifications: (notifications: Notification[]) => void
}

const ajv = new Ajv()
const schema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        slideList: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    background: {
                        type: 'object',
                        properties: {
                            type: { type: 'string' },
                            value: { type: 'string' },
                            src: { type: 'string' }
                        },
                        required: ['type'],
                        oneOf: [
                            { required: ['value'] },
                            { required: ['src'] }
                        ],
                        additionalProperties: false
                    },
                    objects: { type: 'array' }
                },
                required: ['id', 'background', 'objects'],
                additionalProperties: false
            }
        }
    },
    required: ['title', 'slideList'],
    additionalProperties: false
}
const validate = ajv.compile(schema)

function FileMenu({ editor, notifications, setNotifications }: FileMenuProps) {
    const addNotification = (message: string,  type: 'error' | 'success' | 'info', info?: string) => {
        const id = 'notification_' + Math.random().toString(36).substring(2, 9)
        setNotifications([...notifications, { id, message, info, type }])
    }

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
        link.download = editor.title + '.json'
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
            reader.onloadend = async () => {
                const storedObject = reader.result as string
                let parsedObject
                try {
                    parsedObject = storedObject ? JSON.parse(storedObject) : null
                } catch (e) {
                    console.error('Invalid JSON in localStorage.', e)
                    parsedObject = null
                }
                const isValid = validate(parsedObject)
                if (parsedObject && isValid) {
                    await dispatch(setTitle, parsedObject.title)
                    await dispatch(updateSlideList, parsedObject.slideList)
                    addNotification('Презентация успешно загружена', 'success')
                } else {
                    addNotification('Не удалось загрузить презентацию', 'error', 'Неправильный формат JSON')
                    console.error('Invalid data format:', validate.errors)
                }
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
                <img src='src/assets/images/arrowdown.svg' className={styles.arrowdown} />
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