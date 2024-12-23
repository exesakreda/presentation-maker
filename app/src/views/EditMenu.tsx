import { useEffect, useRef, useState } from 'react'
import styles from '../assets/styles/EditMenu.module.css'

function EditMenu() {
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
                <div className={styles.menu__item} >
                    <div className={styles.item__title}>Отменить</div>
                    <div className={styles.item__hotkeys}>CTRL+Z</div>
                </div>
                <div className={styles.menu__item} >
                    <div className={styles.item__title}>Повторить</div>
                    <div className={styles.item__hotkeys}>CTRL+Y</div>
                </div>

            </div>

        </>
    )
}

export { EditMenu } 