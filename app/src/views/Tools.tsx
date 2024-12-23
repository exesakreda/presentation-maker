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
                const pos = { x: dimensions.w / 2, y: dimensions.h / 2 }
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
                className={`${styles.additionalMenu} ${styles.fileUpload}`}
                style={{
                    bottom: currentTool.type == 'image' ? '60px' : '8px'
                }}
                onClick={handleFileUploadClick}
            >
                <div className={styles.fileUpload__text}>Выбрать файл</div>
                <img className={styles.fileUpload__icon} src='/src/assets/images/folder.svg' />
            </div>

            <div
                className={`${styles.additionalMenu} ${styles.shapeSelect}`}
                style={{
                    bottom: currentTool.type == 'shape' ? '60px' : '8px'
                }}
            >
                <div className={`${styles.shapeSelect__item} ${currentTool.type === 'shape' && currentTool.shape === 'circle' ? styles.selectedShape : ''}`} onClick={() => dispatch(setTool({ type: 'shape', shape: 'circle' }))}>
                    <img src="/src/assets/images/circle.svg" alt="" />
                </div>

                <div className={`${styles.shapeSelect__item} ${currentTool.type === 'shape' && currentTool.shape === 'rectangle' ? styles.selectedShape : ''}`} onClick={() => dispatch(setTool({ type: 'shape', shape: 'rectangle' }))}>
                    <img src="/src/assets/images/rectangle.svg" alt="" />
                </div>

                <div className={`${styles.shapeSelect__item} ${currentTool.type === 'shape' && currentTool.shape === 'triangle' ? styles.selectedShape : ''}`} onClick={() => dispatch(setTool({ type: 'shape', shape: 'triangle' }))}>
                    <img src="/src/assets/images/triangle.svg" alt="" />
                </div>
            </div>

            <input
                type="file"
                accept='.jpg, .png, .svg, .jpeg'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div className={styles.tools}>
                <div className={`${styles.tools__item} ${currentTool.type === 'cursor' ? styles.selectedTool : ''}`} onClick={() => dispatch(setTool({ type: 'cursor' }))}>
                    <img src="/src/assets/images/cursor.svg" alt="" className={styles.item__image} />
                </div>

                <div className={`${styles.tools__item} ${currentTool.type === 'text' ? styles.selectedTool : ''}`} onClick={() => dispatch(setTool({ type: 'text' }))}>
                    <img src="/src/assets/images/text.svg" alt="" className={styles.item__image} />
                </div>

                <div className={`${styles.tools__item} ${currentTool.type === 'image' ? styles.selectedTool : ''}`} onClick={() => dispatch(setTool({ type: 'image' }))}>
                    <img src="/src/assets/images/image.svg" alt="" className={styles.item__image} />
                </div>

                <div className={`${styles.tools__item} ${currentTool.type === 'shape' ? styles.selectedTool : ''}`} onClick={() => dispatch(setTool({ type: 'shape', shape: null }))}>
                    <img src="/src/assets/images/shape.svg" alt="" className={styles.item__image} />
                </div>
            </div>
        </>
    )
}

export { Tools }