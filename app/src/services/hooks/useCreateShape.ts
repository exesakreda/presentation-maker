// import { MouseEvent, useCallback } from "react"
// import { useDispatch, useSelector } from "react-redux"

// type useCreateShapeProps = {
//     slideId: string,
//     scale: number,
//     setPos: (pos: { x: number, y: number }) => void
// }

// function useCreateShape({ slideId, scale, setPos }: useCreateShapeProps) {
//     const dispatch = useDispatch()
//     const slideArea = document.getElementById('slideArea')

//     const onMouseDown = useCallback((e: MouseEvent) => {
//         e.preventDefault()

//         const startPos = { x: e.pageX, y: e.pageY }
//         const initialPos = {
//             x: slideArea?.offsetLeft,
//             y: slideArea?.offsetTop
//         }
//         let newPos = { x: initialPos.x, y: initialPos.y }

//         const onMouseMove = (e: MouseEvent) => {
//             const delta = {
//                 x: (e.pageX - startPos.x) / scale,
//                 y: (e.pageY - startPos.y) / scale,
//             }
//             newPos = {
//                 x: delta.x - startPos.x,
//                 y: delta.y - startPos.y
//             }
//             setPos(newPos)
//         }
//     }, [])
// }