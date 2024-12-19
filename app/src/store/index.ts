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
    tool: 'cursor'
}

const storedState = localStorage['redux-store']
    ? JSON.parse(localStorage['redux-store'])
    : null

const initialState = storedState && validateJSON(storedState)
    ? storedState
    : defaultState

const modifiedState = {
    ...initialState,
    selection: {
        objects: [],
        slides: [...initialState.selection.slides]
    },
    tool: 'cursor'
}

const store = createStore(rootReducer, modifiedState)

store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState())
})

export default store