import { useEffect, useState } from 'react'
import styles from '../assets/styles/UnsplashUploadMenu.module.css'
import { createApi } from 'unsplash-js'
import createDispatch from '../store/utils/createDispatch'
import store from '../store'
import { createImage } from '../store/actions/presentationActions'

type UnsplashUploadMenuProps = {
    currentSlideId: string,
    setUnsplashUploadActive: (unsplashUploadActive: boolean) => void
}

function UnsplashUploadMenu({ currentSlideId, setUnsplashUploadActive }: UnsplashUploadMenuProps) {
    const unsplash = createApi({
        accessKey: '1CSqNwAQxDKudTlgrVGW49J-PzOmMdCRsIzpPpU9oOY'
    })

    useEffect(() => {
        function handleClose(event: KeyboardEvent){
            if(event.key === 'Escape') {
                setUnsplashUploadActive(false)
            }
        }

        document.addEventListener('keydown', handleClose)

        return () => {
            document.removeEventListener('keydown', handleClose)
        }
    }, [])

    const getImageDimensions = (src: string): Promise<{ h: number, w: number }> => {
        return new Promise((resolve) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                resolve({ w: img.width / 2, h: img.height / 2 })
            }
        })
    }

    const handleCreateImage = async (src: string) => {
        const dimensions = await getImageDimensions(src)
        const aspectRatio = dimensions.w / dimensions.h
        const pos = { x: dimensions.w / 2, y: dimensions.h / 2 }
                
        dispatch(createImage(currentSlideId, src, {height: dimensions.h, width: dimensions.w, aspectRatio: aspectRatio}, pos))
        setUnsplashUploadActive(false)
    }

    const dispatch = createDispatch(store)
    const [photos, setPhotos] = useState<any[]>([])

    const imagesFromUnsplash = (query: string) => {
        unsplash.search.getPhotos({
            query: query,
            page: 1,
            perPage: 10
        })
            .then(result => {
                if (result.type === 'success') {
                    setPhotos(result.response.results)
                    // const photos = result.response.results
                    // console.log(photos)
                }
            })
    }

    return (
        <div className={styles.unsplashUpload}>
            <div className={styles.menu}>
                <div className={styles.menu__search}>
                    <input
                        type='text'
                        placeholder='Введите запрос'
                        className={styles.search__input}
                        onBlur={(event) => imagesFromUnsplash(event.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.currentTarget.blur()
                            }
                        }}
                    />
                    <div className={styles.search__divider} />
                </div>

                <div className={styles.menu__images}>
                    <div className={styles.imageGrid}>
                        {photos.map(photo => (
                            <div className={styles.imageItem} onClick={() => handleCreateImage(photo.urls.full)}>
                                <img src={photo.urls.small} alt="" className={styles.image} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { UnsplashUploadMenu }