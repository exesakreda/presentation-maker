import { useEffect, useRef, useState } from 'react'
import styles from '../assets/styles/SlideShowMenu.module.css'
import { Link } from 'react-router-dom'

function SlideShowMenu() {
    const menuRef = useRef<HTMLDivElement>(null)
    const [isMenuActive, setIsMenuActive] = useState(false)

    function handleClickOnMenu() {
        setIsMenuActive(!isMenuActive)
    }
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuActive(false)
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
                Слайдшоу
            </div>
            <div className={styles.menu} style={{
                opacity: isMenuActive ? '1' : '0',
                pointerEvents: isMenuActive ? 'all' : 'none'
            }}>
                <div className={styles.menu__item}>
                    <div className={styles.item__title}>
                        <Link to='/slideshow' onClick={() => {
                            const element = document.documentElement
                            element.requestFullscreen()
                                .catch(err => console.error('Error entering full screen:', err))
                        }}>Начать слайдшоу</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export { SlideShowMenu } 