import { SlideList } from "../views/SlideList"

/**
 * @param {Editor} editor
 * @param {string} newTitle
 * @return {Editor}
 */

function setTitle(editor, newTitle) {
    return {
        ...editor,
        title: newTitle
    }
}

function addSlide(editor, newSlide) {
    return {
        ...editor,
        slideList: [
            SlideList, 
            newSlide
        ]
    }
}

/**
 * @param {Editor} editor
 * @param {{
 *   x: number,
 *   y: number,
 * }} payload
 * @return {Editor}
 */
function setPosition(editor, { x, y }) {
    return {
        ...editor,
        position: { x, y }
    }
}

export { setTitle, setPosition, addSlide }