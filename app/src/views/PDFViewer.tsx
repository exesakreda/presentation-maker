import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import styles from '../assets/styles/PDFViewer.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

type PDFViewerProps = {
    pdfBlob: Blob;
    onClose: () => void;
    name: string
}

function downloadPDF(blob: Blob, fileName: string) {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}



function PDFViewer({ pdfBlob, onClose, name }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>()
    const [pageNumber, setPageNumber] = useState<number>(1)

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose()
        }
    })

    const url = URL.createObjectURL(pdfBlob)

    return (
        <div className={styles.pdfViewer}>
            <div className={styles.pdfViewer__content} ref={contentRef}>
                <div className={styles.documentWrapper}>
                    <Document
                        file={url}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={1}
                            width={1440}
                            height={810}
                            renderTextLayer={false} // Отключение текстового слоя
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>

                <div className={styles.pageControls}>
                    <div className={styles.pageControls__previous} onClick={() => setPageNumber(page => Math.max(1, page - 1))}>
                        <img src="/src/assets/images/chevron-left.svg" alt="" />
                    </div>

                    <div className={styles.pageControls__pagenumbers}>
                        <div className={styles.currentPage}>{pageNumber}</div>
                        <div className={styles.divider}>/</div>
                        <div className={styles.totalPages}>{numPages}</div>
                    </div>

                    <div className={styles.pageControls__next} onClick={() => setPageNumber(page => Math.min(numPages || 1, page + 1))}>
                        <img src="/src/assets/images/chevron-right.svg" alt="" />
                    </div>
                </div>

                <div className={styles.actionMenu}>
                    <div className={styles.save} onClick={() => downloadPDF(pdfBlob, name)}>Скачать</div>
                    <div className={styles.close} onClick={onClose}>
                        <img src='/src/assets/images/plus-02.svg' alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { PDFViewer }