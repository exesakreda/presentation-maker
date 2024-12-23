import { useState, useRef, useEffect } from "react"
import styles from '../assets/styles/FileMenu.module.css'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/reducers/rootReducer"
import { setTitle, updateSlideList } from "../store/actions/presentationActions"
import { setSelectedSlides } from "../store/actions/selectionActions"
import validateJSON from "../services/validateJSON"
import { addNotification, removeNotification } from "../store/actions/notificationActions"

function FileMenu() {
    const dispatch = useDispatch()
    const presentationState = useSelector((state: RootState) => state.presentation)
    const selectionState = useSelector((state: RootState) => state.selection)
    const notificationsState = useSelector((state: RootState) => state.notifications)
    const toolState = useSelector((state: RootState) => state.tool)
    useEffect(() => {
        notificationsState.forEach((notification) => {
            const timer = setTimeout(() => {
                dispatch(removeNotification(notification.id))
            }, 10000)

            return () => clearTimeout(timer)
        })
    }, [notificationsState, dispatch])
    const presentation = useSelector((state: RootState) => state.presentation)

    const menuRef = useRef<HTMLDivElement>(null)
    const [isMenuActive, setIsMenuActive] = useState(false)
    function handleClickOnMenu() {
        setIsMenuActive(!isMenuActive)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuActive(false);
            }
        }

        if (isMenuActive) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuActive])

    function savePresentationAsJSON() {
        const jsonData = {
            notifications: notificationsState,
            presentation: presentationState,
            selection: selectionState,
            tool: toolState
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
                    dispatch(addNotification('success', 'Презентация успешно загружена!'))
                } else {
                    dispatch(addNotification('error', 'Не удалось загрузить презентацию.', 'Неправильный формат JSON'))
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
        dispatch(addNotification('success', 'Создана новая презентация.'))
    }

    return (
        <>
            <div
                ref={menuRef}
                className={`${styles.menu__title} ${isMenuActive ? styles.active : ''}`}
                onMouseDown={handleClickOnMenu}
            >
                Файл
            </div>
            <div className={styles.menu} style={{
                opacity: isMenuActive ? '1' : '0',
                pointerEvents: isMenuActive ? 'all' : 'none'
            }}>
                <div className={styles.menu__item} onClick={createNewPresentation}>
                    <div className={styles.item__title}>Новая презентация</div>
                    <div className={styles.item__hotkeys}>CTRL+N</div>
                </div>
                <div className={styles.menu__item} onClick={handleFileUploadClick}>
                    <div className={styles.item__title}>Открыть</div>
                    <div className={styles.item__hotkeys}>CTRL+O</div>
                </div>
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    style={{
                        display: 'none'
                    }}
                    onChange={handleFileChange}
                />
                <div className={styles.menu__item} onMouseDown={savePresentationAsJSON}>
                    <div className={styles.item__title}>Сохранить</div>
                    <div className={styles.item__hotkeys}>CTRL+S</div>
                </div>
                <div className={styles.menu__item}>
                    <div className={styles.item__title}>Экспорт в PDF</div>
                    <div className={styles.item__hotkeys}>CTRL+E</div>
                </div>
            </div>

        </>
    )
}

export { FileMenu }