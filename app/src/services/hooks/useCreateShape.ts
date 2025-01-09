// import { RefObject, useCallback } from "react"
// import createDispatch from "../../store/utils/createDispatch"
// import store from "../../store"
// import { setObjectPosition, setObjectSize } from "../../store/actions/presentationActions"

// type useCreateShapeProps = {
//     ref: RefObject<HTMLDivElement>,
//     slideId: string,
//     objId: string,
//     scale: number,
//     setSize: (size: { w: number, h: number }) => void,
//     setPos: (pos: { x: number, y: number }) => void,
// }

// function useCreateShape({ ref, slideId, objId, scale, setSize, setPos }: useCreateShapeProps) {
//     const element = ref.current
//     if (!element) return

//     const dispatch = createDispatch(store)

//     const onMouseDown = useCallback((e: MouseEvent) => {
//         e.preventDefault()

//         const startPos = { x: e.pageX, y: e.pageY }
//         let newPos = startPos
//         let newSize = { w: startPos.x, h: startPos.y }

//         const onMouseMove = (e: MouseEvent) => {
//             const deltaSize = {
//                 x: - ((e.pageX - startPos.x) / scale),
//                 y: - ((e.pageY - startPos.y) / scale)
//             }
//             newSize = {
//                 w: Math.max(deltaSize.x, 10),
//                 h: Math.max(deltaSize.y, 10)
//             }
//             newPos = {
//                 x: deltaSize.x / 2,
//                 y: deltaSize.y / 2,
//             }
//             setSize(newSize)
//             setPos(newPos)
//         }

//         const onMouseUp = () => {
//             dispatch(setObjectSize(slideId, objId, newSize))
//             dispatch(setObjectPosition(slideId, objId, newPos))
//             element.removeEventListener('mousemove', onMouseMove)
//             element.removeEventListener('mouseup', onMouseUp)
//         }

//         element.addEventListener('mousemove', onMouseMove)
//         element.addEventListener('mouseup', onMouseUp)
//     }, [scale, setSize, dispatch, element, objId, setPos, slideId])

//     element.addEventListener('mousedown', onMouseDown)
// }

// export { useCreateShape }