import { useRef } from 'react'
import styles from '../assets/styles/Tools.module.css'
import { RootState } from '../store/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createImage } from '../store/actions/presentationActions'
import { setTool } from '../store/actions/toolActions'

function Tools() {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const selectedSlides = useSelector((state: RootState) => state.selection.slides)
    const currentTool = useSelector((state: RootState) => state.tool)
    const dispatch = useDispatch()

    const currentSlide = slideList.find(slide => slide.id == selectedSlides[selectedSlides.length - 1])

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
                const src = reader.result as string
                const dimensions = await getImageDimensions(src)
                const aspectRatio = dimensions.w / dimensions.h
                const pos = { x: dimensions.w / 2, y: dimensions.h / 2}
                if (currentSlide) dispatch(createImage(currentSlide?.id, src, { height: dimensions.h, width: dimensions.w, aspectRatio }, pos))
            }
            reader.readAsDataURL(file)
        }
    }

    const getImageDimensions = (src: string): Promise<{ h: number, w: number }> => {
        return new Promise((resolve) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                resolve({ w: img.width / 2, h: img.height / 2 })
            }
        })
    }

    return (
        <>
            <div
                className={styles.fileUpload}
                style={{
                    bottom: currentTool == 'image' ? '60px' : '8px'
                }}
                onClick={handleFileUploadClick}
            >
                <div className={styles.fileUpload__text}>Выбрать файл</div>
                <img className={styles.fileUpload__icon} src='/src/assets/images/folder.svg' height='11px' width='11px' />
            </div>
            <input
                type="file"
                accept='.jpg, .png, .svg, .jpeg'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div className={styles.tools}>
                <div className={`${styles.tools__item} ${currentTool === 'cursor' ? styles.selectedTool : ''}`} onClick={() => dispatch(setTool('cursor'))}>
                    <img src="/src/assets/images/cursor.svg" alt="" className={styles.item__image} />
                </div>

                <div className={`${styles.tools__item} ${currentTool === 'text' ? styles.selectedTool : ''}`} onClick={() => dispatch(setTool('text'))}>
                    <img src="/src/assets/images/text.svg" alt="" className={styles.item__image} />
                </div>

                <div className={`${styles.tools__item} ${currentTool === 'image' ? styles.selectedTool : ''}`} onClick={() => dispatch(setTool('image'))}>
                    <img src="/src/assets/images/image.svg" alt="" className={styles.item__image} />
                </div>

                {/* <div className={`${styles.tools__item} ${currentTool === 'shape' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('shape')}>
                    <img src="/src/assets/shape.svg" alt="" className={styles.item__image} />
                </div> */}
            </div>
        </>
    )
}

export { Tools }