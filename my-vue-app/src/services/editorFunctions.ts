

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

export { setTitle, setPosition }