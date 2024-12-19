import { useState, useRef, useEffect } from "react"
import styles from '../assets/styles/FileMenu.module.css'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/reducers/rootReducer"
import { setTitle, updateSlideList } from "../store/actions/presentationActions"
import { setSelectedSlides } from "../store/actions/selectionActions"
import validateJSON from "../services/validateJSON"
import { addNotification, removeNotification } from "../store/actions/notificationActions"
import { Root } from "react-dom/client"

function FileMenu() {
    const dispatch = useDispatch()
    const storeState = useSelector((state: Root) => state)
    const notifications = useSelector((state: RootState) => state.notifications)
    useEffect(() => {
        notifications.forEach((notification) => {
            const timer = setTimeout(() => {
                dispatch(removeNotification(notification.id))
            }, 10000)

            return () => clearTimeout(timer)
        })
    }, [notifications, dispatch])
    const presentation = useSelector((state: RootState) => state.presentation)

    const [isMenuActive, setIsMenuActive] = useState(false)
    function handleClickOnMenu() {
        setIsMenuActive(!isMenuActive)
    }
    function savePresentationAsJSON() {
        const jsonData = storeState

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
            reader.onloadend = () => {
                const storedObject = reader.result as string
                let parsedObject
                try {
                    parsedObject = storedObject ? JSON.parse(storedObject) : null
                } catch {
                    parsedObject = null
                }
                const isValid = validateJSON(parsedObject)
                if (parsedObject && isValid) {
                    dispatch(setTitle(parsedObject.presentation.title))
                    dispatch(updateSlideList(parsedObject.presentation.slideList))
                    dispatch(setSelectedSlides([parsedObject.presentation.slideList[0].id]))
                    dispatch(addNotification('Презентация успешно загружена', 'success'))
                } else {
                    dispatch(addNotification('Не удалось загрузить презентацию', 'error', 'Неправильный формат JSON'))
                }
            }
            reader.readAsText(file)
        }
        event.target.value = ''
    }

    function createNewPresentation() {
        dispatch(setTitle('Новая презентация'))
        dispatch(updateSlideList([{
            id: '1',
            background: { type: 'color', value: '#ffffff' },
            objects: []
        }]))
        dispatch(setSelectedSlides(['1']))
        dispatch(addNotification('Создана новая презентация.', 'success'))
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