import { useRef } from 'react'
import styles from './Tools.module.css'
import { Slide } from '../../../types'
import { createImage } from '../services/editorFunctions'
import { dispatch } from '../services/editor'

type ToolsProps = {
    currentTool: 'cursor' | 'text' | 'image',
    setTool: (tool: 'cursor' | 'text' | 'image') => void,
    currentSlide: Slide
}

function Tools({ currentTool, setTool, currentSlide }: ToolsProps) {
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
                dispatch(createImage,
                    {
                        slideId: currentSlide.id,
                        src: src,
                        height: dimensions.h,
                        width: dimensions.w,
                        aspectRatio: aspectRatio
                    })
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
                <img className={styles.fileUpload__icon} src='/src/assets/folder.svg' height='11px' width='11px' />
            </div>
            <input
                type="file"
                accept='.jpg, .png, .svg, .jpeg'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div className={styles.tools}>
                <div className={`${styles.tools__item} ${currentTool === 'cursor' ? styles.selectedTool : ''}`} onClick={() => setTool('cursor')}>
                    <img src="/src/assets/cursor.svg" alt="" className={styles.item__image} />
                </div>

                <div className={`${styles.tools__item} ${currentTool === 'text' ? styles.selectedTool : ''}`} onClick={() => setTool('text')}>
                    <img src="/src/assets/text.svg" alt="" className={styles.item__image} />
                </div>

                <div className={`${styles.tools__item} ${currentTool === 'image' ? styles.selectedTool : ''}`} onClick={() => setTool('image')}>
                    <img src="/src/assets/image.svg" alt="" className={styles.item__image} />
                </div>

                {/* <div className={`${styles.tools__item} ${currentTool === 'shape' ? styles.selectedTool : ''}`} onClick={() => handleToolSelect('shape')}>
                    <img src="/src/assets/shape.svg" alt="" className={styles.item__image} />
                </div> */}
            </div>
        </>
    )
}

export { Tools }