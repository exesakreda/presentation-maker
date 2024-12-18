import { useState, useRef } from "react"
import styles from '../assets/styles/FileMenu.module.css'

import { Notification } from "../../../types"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/reducers/rootReducer"
import { setTitle, updateSlideList } from "../store/actions/presentationActions"
import { setSelectedSlides } from "../store/actions/selectionActions"
import validateJSON from "../services/validateJSON"

type FileMenuProps = {
    notifications: Notification[],
    setNotifications: (notifications: Notification[]) => void
}



function FileMenu({ notifications, setNotifications }: FileMenuProps) {
    const dispatch = useDispatch()
    const presentation = useSelector((state: RootState) => state.presentation)

    const addNotification = (message: string, type: 'error' | 'success' | 'info', info?: string) => {
        const id = 'notification_' + Math.random().toString(36).substring(2, 9)
        setNotifications([...notifications, { id, message, info, type }])
    }

    const [isMenuActive, setIsMenuActive] = useState(false)
    function handleClickOnMenu() {
        setIsMenuActive(!isMenuActive)
    }
    function savePresentationAsJSON() {
        const jsonData = {
            title: presentation.title,
            slideList: presentation.slideList
        }

        const jsonString = JSON.stringify(jsonData, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = presentation.title + '.json'
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
                } catch {
                    parsedObject = null
                }
                const isValid = validateJSON(parsedObject)
                if (parsedObject && isValid) {
                    await dispatch(setTitle(parsedObject.title))
                    await dispatch(updateSlideList(parsedObject.slideList))
                    // addNotification('Презентация успешно загружена', 'success')
                } else {
                    addNotification('Не удалось загрузить презентацию', 'error', 'Неправильный формат JSON')
                }
            }
            reader.readAsText(file)
        }
    }

    function createNewPresentation() {
        dispatch(setTitle('Новая презентация'))
        dispatch(updateSlideList([{
            id: '1',
            background: {type: 'color', value: '#ffffff'},
            objects: []
        }]))
        dispatch(setSelectedSlides(['1']))
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
                <div className={styles.menu__item} onClick={createNewPresentation}>Новая презентация</div>
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