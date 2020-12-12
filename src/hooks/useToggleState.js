const { useState } = require("react")

/**
 * @description exposes a boolean state variable and a method to toggle its value
 * @param {boolean} initial initial state of the toggler (true or false). Will be forcefully converted to a boolean
 * @returns {[boolean, () => void ]} the boolean state and the function to toggle it
 */
export const useToggleState = (initial) => {
    const [togglerState, setState] = useState(!!initial)

    const toggle = () => {
        setState(!togglerState)
    }

    return [togglerState, toggle]
}