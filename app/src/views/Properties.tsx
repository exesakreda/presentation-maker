import styles from '../assets/styles/Properties.module.css'
import { Background } from '../../../types'
import { useEffect, useRef, useState } from 'react'

import { RootState } from '../store/reducers/rootReducer'
import { useSelector } from 'react-redux'
import createDispatch from '../store/utils/createDispatch'
import { changeBackground, setFontFamily, setFontWeight, setFontSize, setFontColor } from '../store/actions/presentationActions'
import store from '../store'

function SlideSelected() {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const selectedSlides = useSelector((state: RootState) => state.presentation.selection.slides)
    const dispatch = createDispatch(store)
    const currentSlide = slideList.find(slide => slide.id == selectedSlides[selectedSlides.length - 1])
    const currentSlideId = currentSlide ? currentSlide.id : '0'
    const currentSlideIndex = currentSlide ? slideList.indexOf(currentSlide) : 1

    const [colorValue, setColorValue] = useState('')
    const [bgType, setBgType] = useState<'color' | 'image'>('color')
    const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (currentSlide) {
            const backgroundValue = currentSlide?.background.type === 'color' && currentSlide.background.value
                ? currentSlide.background.value.slice(1)
                : ''

            setColorValue(backgroundValue.toUpperCase())
            setBgType(currentSlide.background.type)
            setIsImageUploaded(currentSlide.background.type === 'image')
        }
    }, [currentSlide])

    if (!currentSlide) return null

    function isValidColor(value: string) {
        const pattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        return pattern.test(value)
    }

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setColorValue(newValue.slice(1).toUpperCase())
    }

    const onColorBlur = () => {
        const newBackground: Background = { type: 'color', value: `#${colorValue}` }
        dispatch(changeBackground(currentSlideId, newBackground))
    }

    const onColorTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.toUpperCase()
        setColorValue(newValue)
    }

    const onColorTextBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toUpperCase()
        const newValue = '#' + inputValue
        if (isValidColor(newValue)) {
            const newBackground: Background = { type: 'color', value: newValue }
            dispatch(changeBackground(currentSlideId, newBackground))
        }
    }

    const renderColorField = () => {
        return (
            <div className={styles.backgroudSettings__colorField}>
                <div className={styles.color__container}>
                    <input
                        type='color'
                        className={styles.currentColor}
                        onChange={onColorChange}
                        onBlur={onColorBlur}
                        value={`#${colorValue}`}
                    />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    className={styles.currentColorText}
                    value={colorValue}
                    placeholder='FFFFFF'
                    onBlur={onColorTextBlur}
                    onChange={onColorTextChange}
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value.toUpperCase()
                        setColorValue(newValue)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.currentTarget.blur()
                        }
                    }}
                    maxLength={6}
                />
            </div>
        )
    }

    const handleFileInputClick = () => {
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
                dispatch(changeBackground(currentSlideId, { type: 'image', src: src }))
            }
            reader.readAsDataURL(file)
        }

    }

    const handleBgImageDelete = () => {
        dispatch(changeBackground(currentSlideId, { type: 'color', value: '#FFFFFF' }))
        setIsImageUploaded(false)
    }

    const renderImageField = () => {
        const renderUploadButton = () => {
            return (
                <>
                    <div className={styles.imageField__uploadButton} onClick={handleFileInputClick}>
                        <div className={styles.uploadButton__text}>Выбрать файл</div>
                        <img className={styles.uploadButton__image} src='/src/assets/images/folder.svg' />
                    </div>

                    <input
                        type="file"
                        accept='.jpg, .png, .svg, .jpeg'
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </>
            )
        }

        const renderImageUploaded = () => {
            return (
                <div className={styles.imageField__imageUploaded}>
                    <div className={styles.imageUploaded__imageActions}>
                        <div className={styles.imageActions__replace} onClick={handleFileInputClick}>
                            Изменить
                        </div>
                        <input
                            type="file"
                            accept='.jpg, .png, .svg, .jpeg'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        <div className={styles.imageActions__delete} onClick={handleBgImageDelete}>
                            Удалить
                        </div>

                        <div className={styles.imageActions__overlay} />
                    </div>

                    <div
                        className={styles.imageUploaded__image}
                        style={{
                            backgroundImage: `url(${currentSlide.background.type == 'image' ? currentSlide.background.src : 'none'})`,
                        }}
                    />

                </div >
            )
        }

        return (
            <div className={styles.backgroudSettings__imageField}>
                {
                    isImageUploaded
                        ? renderImageUploaded()
                        : renderUploadButton()
                }
            </div>
        )
    }

    return (
        <div className={styles.properties} id="properties">
            <div className={styles.slideid}>
                <p>Слайд {currentSlideIndex + 1} (id: {currentSlideId})</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.backgroudSettings}>
                <div className={styles.backgroudSettings__title}>Фон</div>
                <div className={styles.backgroudSettings__bgType}>
                    <div className={`${styles.bgType__item} ${bgType == 'color' ? '' : styles.bgType__item_inactive}`} onClick={() => {
                        if (bgType !== 'color') {
                            setBgType('color')
                        }
                    }}>
                        Цвет
                    </div>
                    <div className={`${styles.bgType__item} ${bgType == 'image' ? '' : styles.bgType__item_inactive}`} onClick={() => {
                        if (bgType !== 'image') {
                            setBgType('image')
                        }
                    }}>
                        Изображение
                    </div>
                    <div
                        className={styles.bgType__active}
                        style={{
                            right: bgType == 'color' ? '107px' : '13px'
                        }}
                    ></div>
                </div>

                {
                    bgType == 'color'
                        ? renderColorField()
                        : renderImageField()
                }


            </div>
        </div>
    )
}


function TextSelected({ textId }: { textId: string }) {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const selectedSlides = useSelector((state: RootState) => state.presentation.selection.slides)
    const dispatch = createDispatch(store)
    const currentSlide = slideList.find(slide => slide.id == selectedSlides[selectedSlides.length - 1])
    const currentSlideId = currentSlide ? currentSlide.id : '0'

    const [isFontSelectionActive, setIsFontSelectionActive] = useState(false)
    const [isWeightSelectionActive, setIsWeightSelectionActive] = useState(false)
    const [isSizeSelectionActive, setIsSizeSelectionActive] = useState(false)
    const [textSize, setTextSize] = useState(0)
    const [colorValue, setColorValue] = useState('')
    useEffect(() => {
        if (!currentSlide) return
        const selectedText = currentSlide.objects.find(obj => obj.id === textId)
        if (selectedText?.type === 'text') {
            setColorValue(selectedText.font.color.toUpperCase())
        }
    }, [currentSlide, textId])

    const fontSelectionRef = useRef<HTMLDivElement>(null)
    const fontSelectionMenuRef = useRef<HTMLDivElement>(null)
    const weightSelectionRef = useRef<HTMLDivElement>(null)
    const weightSelectionMenuRef = useRef<HTMLDivElement>(null)
    const sizeSelectionRef = useRef<HTMLDivElement>(null)
    const sizeSelectionMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutsideFontSelection(event: MouseEvent) {
            if (fontSelectionMenuRef.current &&
                !fontSelectionMenuRef.current.contains(event.target as Node) &&
                !fontSelectionRef.current?.contains(event.target as Node)) {
                setIsFontSelectionActive(false)
            }
        }

        if (isFontSelectionActive) {
            document.addEventListener('mousedown', handleClickOutsideFontSelection)
        }

        function handleClickOutsideWeightSelection(event: MouseEvent) {
            if (weightSelectionMenuRef.current &&
                !weightSelectionMenuRef.current.contains(event.target as Node) &&
                !weightSelectionRef.current?.contains(event.target as Node)) {
                setIsWeightSelectionActive(false)
            }
        }

        if (isWeightSelectionActive) {
            document.addEventListener('mousedown', handleClickOutsideWeightSelection)
        }

        function handleClickOutsideSizeSelection(event: MouseEvent) {
            if (sizeSelectionMenuRef.current &&
                !sizeSelectionMenuRef.current.contains(event.target as Node) &&
                !sizeSelectionRef.current?.contains(event.target as Node)) {
                setIsSizeSelectionActive(false)
            }
        }

        if (isSizeSelectionActive) {
            document.addEventListener('mousedown', handleClickOutsideSizeSelection)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideFontSelection)
            document.removeEventListener('mousedown', handleClickOutsideWeightSelection)
            document.removeEventListener('mousedown', handleClickOutsideSizeSelection)
        }
    }, [isFontSelectionActive, isWeightSelectionActive, isSizeSelectionActive])

    useEffect(() => {
        if (!currentSlide) return
        const selectedText = currentSlide.objects.find(obj => obj.id === textId)
        if (selectedText?.type === 'text') {
            setTextSize(selectedText.font.size)
            setColorValue(selectedText.font.color.slice(1).toUpperCase())
        }
    }, [currentSlide, textId])

    if (!currentSlide) return null
    const selectedText = currentSlide.objects.find(obj => obj.id === textId)
    if (!selectedText || selectedText.type !== 'text') return null

    function handleClickOnFontSelection() {
        setIsFontSelectionActive(!isFontSelectionActive)
    }

    function handleClickOnWeightSelection() {
        setIsWeightSelectionActive(!isWeightSelectionActive)
    }

    function handleClickOnSizeSelection() {
        setIsSizeSelectionActive(!isSizeSelectionActive)
    }

    const getSelectedFontIndicatorTop = (fontFamily: string) => {
        const fonts = ['Inter', 'Geologica', 'JetBrains Mono', 'Montserrat', 'Open Sans', 'Roboto Flex', 'Alumni Sans', 'Unbounded', 'Tilda Sans']
        const fontIndex = fonts.findIndex(font => font == fontFamily)
        return fontIndex*28 + 43
    }

    const getSelectedWeightIndicatorTop = (weight: number) => {
        switch (weight) {
            case 100:
                return 8
            case 200:
                return 32
            case 300:
                return 56
            case 400:
                return 80
            case 500:
                return 104
            case 600:
                return 128
            case 700:
                return 152
            case 800:
                return 176
            case 900:
                return 200
            default:
                return 8
        }
    }

    const getSelectedSizeIndicatorTop = (size: number) => {
        switch (size) {
            case 10:
                return 8
            case 12:
                return 32
            case 14:
                return 56
            case 16:
                return 80
            case 20:
                return 104
            case 24:
                return 128
            case 32:
                return 152
            case 36:
                return 176
            case 40:
                return 200
            case 48:
                return 224
            case 64:
                return 248
            case 96:
                return 272
            case 128:
                return 296

            default:
                return -1
        }
    }

    const handleChangeFontFamily = (fontFamily: string) => {
        if (selectedText.font.fontFamily !== fontFamily) {
            dispatch(setFontFamily(currentSlideId, selectedText.id, fontFamily))
        }
        setIsFontSelectionActive(false)
    }

    const getWeightAsWord = (weight: number) => {
        switch (weight) {
            case 100:
                return 'Thin'
            case 200:
                return 'Extra Light'
            case 300:
                return 'Light'
            case 400:
                return 'Regular'
            case 500:
                return 'Medium'
            case 600:
                return 'Semi Bold'
            case 700:
                return 'Bold'
            case 800:
                return 'Extra Bold'
            case 900:
                return 'Black'
        }
    }

    const handleChangeFontWeight = (fontWeight: number) => {
        if (selectedText.font.weight !== fontWeight) {
            dispatch(setFontWeight(currentSlideId, selectedText.id, fontWeight))
        }
        setIsWeightSelectionActive(false)
    }

    const handleChangeFontSize = (fontSize: number) => {
        if (selectedText.font.size !== fontSize) {
            dispatch(setFontSize(currentSlideId, selectedText.id, fontSize))
        }
        setIsSizeSelectionActive(false)
    }

    const handleChangeFontSizeInInputOnBlur = () => {
        let newSize = Number(textSize)

        if (isNaN(newSize) || newSize < 1) {
            newSize = 1
        } else if (newSize > 999) {
            newSize = 999
        }

        setTextSize(newSize)
        if (newSize !== selectedText.font.size) {
            dispatch(setFontSize(currentSlideId, selectedText.id, newSize))
        }
    }

    const handleChangeFontSizeInInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, '')
        setTextSize(Number(value))
    }

    function isValidColor(value: string) {
        const pattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        return pattern.test(value)
    }

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setColorValue(newValue.slice(1).toUpperCase())
    }

    const onColorBlur = () => {
        const newColor = `#${colorValue}`
        if (isValidColor(newColor)) {
            dispatch(setFontColor(currentSlideId, selectedText.id, newColor))
        }
    }

    const onColorTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.toUpperCase()
        setColorValue(newValue)
    }

    const onColorTextBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toUpperCase()
        const newValue = '#' + inputValue
        if (isValidColor(newValue)) {
            dispatch(setFontColor(currentSlideId, selectedText.id, newValue))
        }
    }
    return (
        <div className={styles.properties} id="properties">
            <div className={styles.properties__title}>Текст</div>
            <div className={styles.divider} />

            <div className={styles.fontSettings}>
                <div
                    className={styles.fontSettings__font_family}
                    ref={fontSelectionRef}
                    onMouseDown={handleClickOnFontSelection}
                >
                    <div className={styles.font_family__title}>Шрифт</div>
                    <div
                        className={`${styles.font_family__selection} ${isFontSelectionActive ? styles.font_family__menu_active : ''}`}
                    >
                        <div className={styles.ffselection__title}>{selectedText.font.fontFamily}</div>
                        <img className={styles.ffselection__icon} src='./src/assets/images/arrowdown.svg' />
                    </div>

                </div>

                <div
                    className={styles.fontSettings__font_weight}
                    ref={weightSelectionRef}
                    onMouseDown={handleClickOnWeightSelection}
                >
                    <div className={styles.font_weight__title}>Начертание</div>
                    <div
                        className={`${styles.font_weight__selection} ${isWeightSelectionActive ? styles.font_weight__menu_active : ''}`}
                    >
                        <div className={styles.fwselection__title}>{getWeightAsWord(selectedText.font.weight)}</div>
                        <img className={styles.fwselection__icon} src='./src/assets/images/arrowdown.svg' />
                    </div>

                </div>

                <div className={styles.fontSettings__font_size} >
                    <div className={styles.font_size__title}>Размер</div>
                    <div
                        className={`${styles.font_size__selection}`}
                    >
                        <div className={styles.font_size__selection__input}>
                            <input
                                className={styles.fsselection__title} type="text"
                                value={textSize}
                                onBlur={() => handleChangeFontSizeInInputOnBlur()}
                                onChange={(event) => handleChangeFontSizeInInput(event)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.currentTarget.blur()
                                    }
                                }}
                            />
                        </div>


                        <div
                            className={`${styles.font_size__selection__openmenu} ${isSizeSelectionActive ? styles.font_size__menu_active : ''}`}
                            ref={sizeSelectionRef}
                            onMouseDown={handleClickOnSizeSelection}
                        >
                            <img className={styles.fsselection__icon} src='./src/assets/images/arrowdown.svg' />
                        </div>
                    </div>
                </div>


                <div className={styles.color__title}>Цвет</div>
                <div className={styles.backgroudSettings__colorField}>
                    <div className={styles.color__container}>
                        <input
                            type='color'
                            className={styles.currentColor}
                            onChange={onColorChange}
                            onBlur={onColorBlur}
                            value={`#${colorValue}`}
                        />
                    </div>

                    <input
                        type="text"
                        className={styles.currentColorText}
                        value={colorValue}
                        placeholder='FFFFFF'
                        onBlur={onColorTextBlur}
                        onChange={onColorTextChange}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const newValue = event.target.value.toUpperCase()
                            setColorValue(newValue)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.currentTarget.blur()
                            }
                        }}
                        maxLength={6}
                    />
                </div>
            </div>

            <div
                className={styles.fontSelection_menu}
                ref={fontSelectionMenuRef}
                style={{
                    opacity: isFontSelectionActive ? '1' : '0',
                    pointerEvents: isFontSelectionActive ? 'all' : 'none'
                }}
            >
                <div className={styles.font_selection_menu__title}>Шрифты</div>
                <div className={styles.font_selection_menu__list}>
                    <div
                        className={`${styles.font_selection__element} ${styles.font_inter} ${selectedText.font.fontFamily === 'Inter' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Inter')}
                    >
                        Inter
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_geologica} ${selectedText.font.fontFamily === 'Geologica' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Geologica')}
                    >
                        Geologica
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_jetbrains} ${selectedText.font.fontFamily === 'JetBrains Mono' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('JetBrains Mono')}
                    >
                        JetBrains Mono
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_montserrat} ${selectedText.font.fontFamily === 'Montserrat' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Montserrat')}
                    >
                        Montserrat
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_opensans} ${selectedText.font.fontFamily === 'Open Sans' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Open Sans')}
                    >
                        Open Sans
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_robotoflex} ${selectedText.font.fontFamily === 'Roboto Flex' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Roboto Flex')}
                    >
                        Roboto Flex
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_alumnisans} ${selectedText.font.fontFamily === 'Alumni Sans' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Alumni Sans')}
                    >
                        Alumni Sans
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_unbounded} ${selectedText.font.fontFamily === 'Unbounded' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Unbounded')}
                    >
                        Unbounded
                    </div>

                    <div
                        className={`${styles.font_selection__element} ${styles.font_tildasans} ${selectedText.font.fontFamily === 'Tilda Sans' ? styles.font_selection__element_selected : ''}`}
                        onClick={() => handleChangeFontFamily('Tilda Sans')}
                    >
                        Tilda Sans
                    </div>

                    <div
                        className={styles.font_selection__selectionIndicator}
                        style={{
                            top: getSelectedFontIndicatorTop(selectedText.font.fontFamily)
                        }}
                    >
                        <img src='/src/assets/images/tick.svg' alt="" />
                    </div>
                </div>
            </div>

            <div
                className={styles.weightSelection_menu}
                ref={weightSelectionMenuRef}
                style={{
                    opacity: isWeightSelectionActive ? '1' : '0',
                    pointerEvents: isWeightSelectionActive ? 'all' : 'none'
                }}
            >
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(100)}>Thin</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(200)}>Extra Light</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(300)}>Light</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(400)}>Regular</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(500)}>Medium</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(600)}>Semi Bold</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(700)}>Bold</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(800)}>Extra Bold</div>
                <div className={styles.weight_selection__element} onClick={() => handleChangeFontWeight(900)}>Black</div>

                <div
                    className={styles.weightSelection__selectionIndicator}
                    style={{
                        top: getSelectedWeightIndicatorTop(selectedText.font.weight)
                    }}
                >
                    <img src='/src/assets/images/tick.svg' alt="" />
                </div>
            </div>

            <div
                className={styles.sizeSelection_menu}
                ref={sizeSelectionMenuRef}
                style={{
                    opacity: isSizeSelectionActive ? '1' : '0',
                    pointerEvents: isSizeSelectionActive ? 'all' : 'none'
                }}
            >
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(10)}>10</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(12)}>12</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(14)}>14</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(16)}>16</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(20)}>20</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(24)}>24</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(32)}>32</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(36)}>36</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(40)}>40</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(48)}>48</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(64)}>64</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(96)}>96</div>
                <div className={styles.size_selection__element} onClick={() => handleChangeFontSize(128)}>128</div>

                <div
                    className={styles.sizeSelection__selectionIndicator}
                    style={{
                        top: getSelectedSizeIndicatorTop(selectedText.font.size),
                        display: getSelectedSizeIndicatorTop(selectedText.font.size) == -1 ? 'none' : 'block'
                    }}
                >
                    <img src='/src/assets/images/tick.svg' alt="" />
                </div>
            </div>
        </div>
    )
}


function Properties() {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const selectedSlides = useSelector((state: RootState) => state.presentation.selection.slides)
    const currentSlide = slideList.find(slide => slide.id == selectedSlides[selectedSlides.length - 1])
    const selectedObjectId = useSelector((state: RootState) => state.presentation.selection.objects[0])

    if (currentSlide && selectedObjectId) {
        return (
            <TextSelected textId={selectedObjectId} />
        )
    } else {
        return (
            <SlideSelected />
        )
    }

}


export { Properties } 