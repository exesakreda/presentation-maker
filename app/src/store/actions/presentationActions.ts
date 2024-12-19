import { Background, Slide } from "../../../../types";
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

export const deleteObjects = (slideId: string, objectsId: string[]) => ({
    type: PresentationActionType.SLIDE_DELETE_OBJECTS,
    payload: { slideId, objectsId }
})

export const createImage = (slideId: string, src: string, dimensions: { height: number, width: number, aspectRatio: number }, position: { x: number, y: number }) => ({
    type: PresentationActionType.SLIDE_CREATE_IMAGE,
    payload: { slideId, src, dimensions, position }
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