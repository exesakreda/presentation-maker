import { ChangesActionType } from "../types/changesTypes";

const historyMiddleware = (store: any) => (next: any) => (action: any) => {
    const state = store.getState()

    if (action.type !== ChangesActionType.UNDO || action.type !== ChangesActionType.REDO) {
        const { history, restState } = state

        store.getState().history.past.push(restState)
        store.getState().history.future = []
    }
    return next(action)
}

export default historyMiddleware