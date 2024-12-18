import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

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

const initialState = localStorage['redux-store']
    ? JSON.parse(localStorage['redux-store'])
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