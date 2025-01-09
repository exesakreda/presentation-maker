import { AppState, Background, Slide } from "../../../../types";
import { PresentationActionType, } from "../types/presentationType";

export const setTitle = (newTitle: string) => ({
    type: PresentationActionType.PRESENTATION_SET_TITLE,
    payload: { newTitle }
})

export const addSlide = (newSlide: Slide) => ({
    type: PresentationActionType.PRESENTATION_ADD_SLIDE,
    payload: { newSlide }
})

export const removeSlides = (slidesIdToRemove: string[]) => ({
    type: PresentationActionType.PRESENTATION_REMOVE_SLIDE,
    payload: { slidesIdToRemove }
})

export const updateSlideList = (newSlideList: Slide[]) => ({
    type: PresentationActionType.PRESENTATION_UPDATE_SLIDELIST,
    payload: { newSlideList }
})

export const changeBackground = (slideId: string, newBackground: Background) => ({
    type: PresentationActionType.SLIDE_CHANGE_BACKGROUND,
    payload: { slideId, newBackground }
})

export const createTextarea = (slideId: string, position: { x: number, y: number }) => ({
    type: PresentationActionType.SLIDE_CREATE_TEXTAREA,
    payload: { slideId, position }
})

export const setFontFamily = (slideId: string, objectId: string, newFontFamily: string) => ({
    type: PresentationActionType.TEXTAREA_SET_FONTFAMILY,
    payload: { slideId, objectId, newFontFamily }
})

export const setFontSize = (slideId: string, objectId: string, newTextSize: number) => ({
    type: PresentationActionType.TEXTAREA_SET_FONTSIZE,
    payload: { slideId, objectId, newTextSize }
})

export const setFontWeight = (slideId: string, objectId: string, newTextWeight: number) => ({
    type: PresentationActionType.TEXTAREA_SET_FONTWEIGHT,
    payload: { slideId, objectId, newTextWeight }
})

export const setFontColor = (slideId: string, objectId: string, newFontColor: string) => ({
    type: PresentationActionType.TEXTAREA_SET_TEXTCOLOR,
    payload: { slideId, objectId, newFontColor }
})

export const deleteObjects = (slideId: string, objectsId: string[]) => ({
    type: PresentationActionType.SLIDE_DELETE_OBJECTS,
    payload: { slideId, objectsId }
})

export const createImage = (slideId: string, src: string, dimensions: { height: number, width: number, aspectRatio: number }, position: { x: number, y: number }) => ({
    type: PresentationActionType.SLIDE_CREATE_IMAGE,
    payload: { slideId, src, dimensions, position }
})

export const createShape = (slideId: string, size: { h: number, w: number }, pos: { x: number, y: number }, shapeType: string) => ({
    type: PresentationActionType.SLIDE_CREATE_SHAPE,
    payload: { slideId, size, pos, shapeType }
})

export const setTextAreaValue = (slideId: string, textareaId: string, newValue: string) => ({
    type: PresentationActionType.TEXTAREA_SET_VALUE,
    payload: { slideId, textareaId, newValue }
})

export const setObjectPosition = (slideId: string, objectId: string, newPosition: { x: number, y: number }) => ({
    type: PresentationActionType.SLIDEOBJECT_SET_POSITION,
    payload: { slideId, objectId, newPosition }
})

export const setObjectSize = (slideId: string, objectId: string, newSize: { w: number, h: number }) => ({
    type: PresentationActionType.SLIDEOBJECT_SET_SIZE,
    payload: { slideId, objectId, newSize }
})

export const undo = () => ({
    type: PresentationActionType.UNDO
})

export const redo = () => ({
    type: PresentationActionType.REDO
})

export const addNewAction = (newState: AppState) => ({
    type: PresentationActionType.NEW_ACTION,
    payload: {
        title: newState.presentation.title,
        slideList: newState.presentation.slideList,
        selection: newState.presentation.selection
    }
})

export const setSelectedSlides = (newSelectedSlides: string[]) => ({
    type: PresentationActionType.SLIDES_SET_SELECTION,
    payload: { newSelectedSlides }
})

export const setSelectedObjects = (newSelectedObjects: string[]) => ({
    type: PresentationActionType.OBJECTS_SET_SELECTION,
    payload: { newSelectedObjects }
})

export const resetHistory = () => ({
    type: PresentationActionType.RESET_HISTORY
})