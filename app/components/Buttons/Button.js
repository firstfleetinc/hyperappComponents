import { h } from 'hyperapp'
import { mergeClass } from '../Util/cssUtils'

export const Button = ({type, color, size, text, onClick}, children) => {
    let baseClass = 'mui-btn'
    let classType = null
    let classColor = null
    let classSize = null

    switch(type) {
        case 'flat': {
            classType = 'mui-btn--flat'
            break
        }
        case 'raised': {
            classType = 'mui-btn--raised'
            break
        }
        case 'float': {
            classType = 'mui-btn--fab'
            break
        } default: {
            classType = ''
            break
        }
    }

    switch(color) {
        case 'primary': {
            classColor = 'mui-btn--primary'
            break
        }
        case 'danger': {
            classColor = 'mui-btn--danger'
            break
        }
        case 'accent': {
            classColor = 'mui-btn--accent'
            break
        }
    }

    switch(size) {
        case 'small': {
            classSize = 'mui-btn--small'
            break
        }
        case 'large': {
            classSize = 'mui-btn--large'
            break
        }
    }

    baseClass = mergeClass([baseClass, classType, classColor, classSize, 'btn'])

    return (
        <button class={baseClass} onclick={onClick}>{text}</button>
    )
}

export const PageFab = ({color, size, text, onClick, type}, children) => {

    return (
        <div class="mui-footer-fab" style={{zIndex: '1000'}}>
            <Button type={type} color={color} size={size} text={text} onClick={onClick}></Button>
        </div>
    )
}