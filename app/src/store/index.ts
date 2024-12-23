import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import validateJSON from "../services/validateJSON";
const defaultState = {
    presentation: {
        title: 'Новая презентация',
        slideList: [{
            id: '1',
            background: { type: 'color', value: '#ffffff' },
            objects: []
        }]
    },
    selection: {
        objects: [],
        slides: ['1']
    },
    tool: { type: 'cursor' },
    notifications: [],
    // history: {
    //     past: [],
    //     future: []
    // }
}

const storedState = localStorage['redux-store']
    ? JSON.parse(localStorage['redux-store'])
    : null

let initialState
if (storedState && validateJSON(storedState)) {
    initialState = {
        ...storedState,
        notifications: []
    }
} else {
    initialState = {
        ...defaultState,
        notifications: [{
            type: 'error',
            message: 'Ошибка загрузки данных.',
            info: 'Данные презентации повреждены или отсутствуют. Создана новая презентация для продолжения работы.'
        }]
    }
}

const modifiedState = {
    ...initialState,
    selection: {
        objects: [],
        slides: [...initialState.selection.slides]
    },
    tool: { type: 'cursor' }
}

const store = createStore(rootReducer, modifiedState)

store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState())
})

export default store