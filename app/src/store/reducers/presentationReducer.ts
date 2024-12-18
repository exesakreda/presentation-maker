import { PresentationActionType } from "../types/presentationTypes";
import { Presentation } from "../../../../types";
import { uid } from 'uid';

const initialState: Presentation = {
    title: '',
    slideList: []
}

const presentationReducer = (state = initialState, action: any): Presentation => {
    switch (action.type) {
        case PresentationActionType.PRESENTATION_SET_TITLE:
            return {
                ...state,
                title: action.payload.newTitle
            }

        case PresentationActionType.PRESENTATION_ADD_SLIDE:
            return {
                ...state,
                slideList: [...state.slideList, action.payload.newSlide]
            }

        case PresentationActionType.PRESENTATION_REMOVE_SLIDE:
            return {
                ...state,
                slideList: state.slideList.filter(slide => !action.payload.slidesIdToRemove.includes(slide.id))
            }

        case PresentationActionType.PRESENTATION_UPDATE_SLIDELIST:
            return {
                ...state,
                slideList: action.payload.newSlideList
            }

        case PresentationActionType.SLIDE_CHANGE_BACKGROUND:
            return {
                ...state,
                slideList: state.slideList.map(slide =>
                    slide.id == action.payload.slideId
                        ? {
                            ...slide,
                            background: action.payload.newBackground
                        }
                        : slide
                )
            }

        case PresentationActionType.SLIDE_CREATE_TEXTAREA:
            return {
                ...state,
                slideList: state.slideList.map(slide =>
                    slide.id == action.payload.slideId
                        ? {
                            ...slide,
                            objects: [
                                ...slide.objects,
                                {
                                    id: 'textarea_' + uid(10),
                                    type: 'text',
                                    position: action.payload.position,
                                    size: { h: 35, w: 80 },
                                    value: 'Текст',
                                    fontFamily: 'Inter',
                                    fontWeight: 800,
                                    textSize: 24,

                                }
                            ]
                        }
                        : slide
                )
            }

        case PresentationActionType.SLIDE_DELETE_OBJECTS:
            return {
                ...state,
                slideList: state.slideList.map(slide =>
                    slide.id == action.payload.slideId
                        ? {
                            ...slide,
                            objects: slide.objects.filter(object => !action.payload.objectsId.includes(object.id))
                        }
                        : slide
                )
            }

        case PresentationActionType.SLIDE_CREATE_IMAGE:
            return {
                ...state,
                slideList: state.slideList.map(slide =>
                    slide.id == action.payload.slideId
                        ? {
                            ...slide,
                            objects: [
                                ...slide.objects,
                                {
                                    id: 'image_' + uid(10),
                                    type: 'image',
                                    position: action.payload.position,
                                    size: { w: action.payload.dimensions.width, h: action.payload.dimensions.height },
                                    aspectRatio: action.payload.dimensions.aspectRatio,
                                    src: action.payload.src
                                }
                            ]
                        }
                        : slide
                )
            }

        case PresentationActionType.TEXTAREA_SET_VALUE:
            return {
                ...state,
                slideList: state.slideList.map(slide =>
                    slide.id == action.payload.slideId
                        ? {
                            ...slide,
                            objects: slide.objects.map(object =>
                                object.id == action.payload.textareaId && object.type == 'text'
                                    ? {
                                        ...object,
                                        value: action.payload.newValue
                                    }
                                    : object
                            )
                        }
                        : slide
                )
            }

        case PresentationActionType.SLIDEOBJECT_SET_POSITION:
            return {
                ...state,
                slideList: state.slideList.map(slide =>
                    slide.id == action.payload.slideId
                        ? {
                            ...slide,
                            objects: slide.objects.map(object =>
                                object.id == action.payload.objectId
                                    ? {
                                        ...object,
                                        position: action.payload.newPosition
                                    }
                                    : object
                            )
                        }
                        : slide
                )
            }

        case PresentationActionType.SLIDEOBJECT_SET_SIZE:
            return {
                ...state,
                slideList: state.slideList.map(slide =>
                    slide.id == action.payload.slideId
                        ? {
                            ...slide,
                            objects: slide.objects.map(object =>
                                object.id == action.payload.objectId
                                    ? {
                                        ...object,
                                        size: action.payload.newSize
                                    }
                                    : object
                            )
                        }
                        : slide
                )
            }

        default:
            return state
    }
}

export default presentationReducer