import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import validateJSON from "../services/validateJSON";
import { AppState, StoredPresentationState } from "../../../types";
import { uid } from "uid";

const storedState = localStorage['redux-store']
const parsedState = storedState ? JSON.parse(storedState) : null
const isStateValid = parsedState ? validateJSON(parsedState) : null

const defaultState: AppState = {
    presentation: {
        title: 'Новая презентация',
        slideList: [{
            id: '1',
            background: { type: 'color', value: '#ffffff' },
            objects: []
        }],
        selection: {
            slides: ['1'],
            objects: []
        },
        history: {
            undoable: [],
            redoable: []
        }
    },
    notifications: [],
    tool: { type: 'cursor' }
}

const defaultStateWithError: AppState = {
    ...defaultState,
    notifications: [{
        id: 'notification_' + uid(10),
        type: 'error',
        message: 'Ошибка загрузки данных.',
        info: 'Данные презентации повреждены или отсутствуют. Создана новая презентация для продолжения работы.'
    }]
}

let modifiedParsedState = defaultState
if (parsedState) {
    modifiedParsedState = {
        presentation: {
            title: parsedState.title,
            slideList: parsedState.slideList,
            selection: {
                slides: parsedState.selectedSlides,
                objects: []
            },
            history: parsedState.history
        },
        notifications: [],
        tool: { type: 'cursor' }
    }
} else {
   modifiedParsedState = defaultStateWithError
}

const inititalState = isStateValid ? modifiedParsedState : defaultStateWithError

const store = createStore(rootReducer, inititalState)

store.subscribe(() => {
    const currentState = store.getState()

    const stateForSave: StoredPresentationState = currentState ? {
        title: currentState.presentation.title,
        slideList: currentState.presentation.slideList,
        selectedSlides: currentState.presentation.selection.slides,
        history: currentState.presentation.history
    } : {
        title: '',
        slideList: [],
        selectedSlides: [],
        history: {
            undoable: [],
            redoable: []
        }
    }

    localStorage['redux-store'] = JSON.stringify(stateForSave)
})

export default store