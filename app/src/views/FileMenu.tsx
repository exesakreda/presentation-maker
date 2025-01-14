import { useState, useRef, useEffect, useCallback } from "react"
import styles from '../assets/styles/FileMenu.module.css'
import { useSelector } from "react-redux"
import createDispatch from "../store/utils/createDispatch"
import { RootState } from "../store/reducers/rootReducer"
import { resetHistory, setTitle, updateSlideList } from "../store/actions/presentationActions"
import { setSelectedSlides } from "../store/actions/presentationActions"
import validateJSON from "../services/validateJSON"
import { addNotification, removeNotification } from "../store/actions/notificationActions"
import store from "../store"
import { generatePDF } from "../services/generatePDF"
import { PDFViewer } from "./PDFViewer"

function FileMenu() {
    const dispatch = createDispatch(store)
    const currentState = store.getState()
    const notificationsState = currentState.notifications
    const title = useSelector((state: RootState) => state.presentation.title)
    const slideList = useSelector((state: RootState) => state.presentation.slideList)

    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

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

    const savePresentationAsJSON = useCallback(() => {
        const jsonData = {
            title: currentState.presentation.title,
            slideList: currentState.presentation.slideList,
            selectedSlides: currentState.presentation.selection.slides,
            history: currentState.presentation.history
        }

        const jsonString = JSON.stringify(jsonData, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = presentation.title + '.json'
        link.click()
        URL.revokeObjectURL(link.href)
    }, [currentState.presentation.history, currentState.presentation.selection.slides, currentState.presentation.slideList, currentState.presentation.title, presentation.title])

    useEffect(() => {
        const handleSaveWithHotkeys = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === 's' || event.key.toLowerCase() === 'ы')) {
                event.preventDefault()
                savePresentationAsJSON()
            }
        }
        document.addEventListener('keydown', handleSaveWithHotkeys)
        return () => {
            document.removeEventListener('keydown', handleSaveWithHotkeys)
        }
    }, [savePresentationAsJSON])

    const createNewPresentation = useCallback(() => {
        dispatch(setTitle('Новая презентация'))
        dispatch(updateSlideList([{
            id: '1',
            background: { type: 'color', value: '#ffffff' },
            objects: []
        }]))
        dispatch(setSelectedSlides(['1']))
        dispatch(addNotification('success', 'Создана новая презентация.'))
        dispatch(resetHistory())
    }, [dispatch])

    useEffect(() => {
        const handleCreateNewPresentationWithHotkeys = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.altKey && (event.key.toLowerCase() === 'n' || event.key.toLowerCase() === 'т')) {
                event.preventDefault()
                event.stopPropagation()
                createNewPresentation()
            }
        }
        document.addEventListener('keydown', handleCreateNewPresentationWithHotkeys)
        return () => {
            document.removeEventListener('keydown', handleCreateNewPresentationWithHotkeys)
        }
    }, [createNewPresentation])

    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    const openPresentationFromFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
                    dispatch(setTitle(parsedObject.title))
                    dispatch(updateSlideList(parsedObject.slideList))
                    dispatch(setSelectedSlides([parsedObject.slideList[0].id]))
                    dispatch(addNotification('success', 'Презентация успешно загружена!'))
                } else {
                    dispatch(addNotification('error', 'Не удалось загрузить презентацию.', 'Неправильный формат JSON'))
                }
            }
            reader.readAsText(file)
        }
        event.target.value = ''
    }, [dispatch])

    useEffect(() => {
        const handleOpenPresentationWithHotkeys = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === 'o' || event.key.toLowerCase() === 'щ')) {
                event.preventDefault()
                event.stopPropagation()
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }
            }
        }
        document.addEventListener('keydown', handleOpenPresentationWithHotkeys)
        return () => {
            document.removeEventListener('keydown', handleOpenPresentationWithHotkeys)
        }
    }, [openPresentationFromFile])


    const exportPresentationToPDF = useCallback(async () => {
        try {
            const blob = await generatePDF(slideList, title)
            setPdfBlob(blob)
        } catch (error) {
            console.error('Ошибка при экспорте в PDF:', error);
            dispatch(addNotification('error', 'Ошибка', 'Не удалось создать PDF'));
        }
    }, [dispatch, slideList, title])

    useEffect(() => {
        const handleExportPresentationWithHotkeys = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && (event.altKey) && (event.key.toLowerCase() === 'e' || event.key.toLocaleLowerCase() === 'у')) {
                exportPresentationToPDF()
            }
        }

        document.addEventListener('keydown', handleExportPresentationWithHotkeys)
        return () => {
            document.removeEventListener('keydown', handleExportPresentationWithHotkeys)
        }
    }, [exportPresentationToPDF])

    return (
        <>
            <div
                ref={menuRef}
                className={`${styles.menu__title} ${isMenuActive ? styles.active : ''}`}
                onMouseDown={handleClickOnMenu}
            >
                Файл
            </div>
            <div
                className={styles.menu}
                style={{
                    opacity: isMenuActive ? '1' : '0',
                    pointerEvents: isMenuActive ? 'all' : 'none'
                }}
            >
                <div className={styles.menu__item} onClick={createNewPresentation}>
                    <div className={styles.item__title}>Новая презентация</div>
                    <div className={styles.item__hotkeys}>CTRL + ALT + N</div>
                </div>
                <div className={styles.menu__item} onClick={handleFileUploadClick}>
                    <div className={styles.item__title}>Открыть</div>
                    <div className={styles.item__hotkeys}>CTRL + O</div>
                </div>
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    style={{
                        display: 'none'
                    }}
                    onChange={openPresentationFromFile}
                />
                <div className={styles.menu__item} onMouseDown={savePresentationAsJSON}>
                    <div className={styles.item__title}>Сохранить</div>
                    <div className={styles.item__hotkeys}>CTRL + S</div>
                </div>
                <div className={styles.menu__item} onClick={exportPresentationToPDF}>
                    <div className={styles.item__title}>Экспорт в PDF</div>
                    <div className={styles.item__hotkeys}>CTRL + ALT + E</div>
                </div>
            </div>

            {pdfBlob && (
                <PDFViewer
                    pdfBlob={pdfBlob}
                    onClose={() => setPdfBlob(null)}
                    name={title}
                />
            )}
        </>
    )
}

export { FileMenu }