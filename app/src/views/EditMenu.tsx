import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../assets/styles/EditMenu.module.css'
import createDispatch from '../store/utils/createDispatch'
import store from '../store'
import { redo, undo } from '../store/actions/presentationActions'

function EditMenu() {
    const dispatch = createDispatch(store)
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

    const makeUndo = useCallback(() => {
        dispatch(undo())
    }, [dispatch])

    useEffect(() => {
        const handleUndoWithHotkeys = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'я')) {
                event.preventDefault()
                makeUndo()
            }
        }

        document.addEventListener('keydown', handleUndoWithHotkeys)
        return () => {
            document.removeEventListener('keydown', handleUndoWithHotkeys)
        }
    }, [makeUndo])

    const makeRedo = useCallback(() => {
        dispatch(redo())
    }, [dispatch])

    useEffect(() => {
        const handleRedoWithHotkeys = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === 'y' || event.key.toLowerCase() === 'н')) {
                event.preventDefault()
                makeRedo()
            }
        }

        document.addEventListener('keydown', handleRedoWithHotkeys)
        return () => {
            document.removeEventListener('keydown', handleRedoWithHotkeys)
        }
    }, [makeRedo])

    return (
        <>
            <div
                ref={menuRef}
                className={`${styles.menu__title} ${isMenuActive ? styles.active : ''}`}
                onMouseDown={handleClickOnMenu}
            >
                Правка
            </div>
            <div className={styles.menu} style={{
                opacity: isMenuActive ? '1' : '0',
                pointerEvents: isMenuActive ? 'all' : 'none'
            }}>
                <div className={styles.menu__item} onClick={makeUndo}>
                    <div className={styles.item__title}>Отменить</div>
                    <div className={styles.item__hotkeys}>CTRL + Z</div>
                </div>
                <div className={styles.menu__item} onClick={makeRedo}>
                    <div className={styles.item__title}>Повторить</div>
                    <div className={styles.item__hotkeys}>CTRL + Y</div>
                </div>

            </div>

        </>
    )
}

export { EditMenu } 