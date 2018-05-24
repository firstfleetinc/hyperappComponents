import { h } from 'hyperapp';

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

export const ActionCard = ({ title, content, secondaryText, accentText, buttons }, children) => {

    let titleStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    let contentStyle = {}

    let footerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }

    let secondaryTextStyle = {
        color: '#757575'
    }

    let myButtons = buttons.map((item) => {
        return (<Button {...item}></Button>)
    })

    return (
        <Panel>
            <div style={titleStyle}>
                <h2>
                    {title}
                </h2>
                <span class='mui--text-dark-secondary' style={{textAlign: 'right'}}>
                    {accentText}
                </span>
            </div>
            <div class="mui--text-dark-secondary">
                <p>
                    {content}
                </p>
            </div>
            <div style={footerStyle}>
            <div>
                {myButtons}
            </div>
                <p class="mui--text-accent">{secondaryText}</p>
            </div>
        </Panel>
    )
}

export const Form = ({ title, buttonText, onSubmit }, children) => {

    return (
        <form class='mui-form' onsubmit={(e) => { e.preventDefault(); onSubmit() }}>
            <legend>{title}</legend>
            {children}
            <Button color='primary' text={buttonText}></Button>
        </form>
    )
}

export const InlineForm = ({ onSubmit, buttonText }, children) => {

    return (
        <div class="mui-form--inline">
            {children}
            <span style={{ paddingLeft: '16px' }}>
                <Button color='primary' text={buttonText} onClick={onSubmit}>
                </Button>
            </span>
        </div>
    )
}

export const TextInput = ({ type, placeholder, name, id, value, required, label, labelType, onChange, onKeyUp }, children) => {

    let inputItem
    let input = (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            required={required}
            onchange={onChange}
            onkeyup={onKeyUp}>
        </input>
    )

    switch (labelType) {
        case 'fixed': {
            inputItem = (
                <div class='mui-textfield'>
                    {input}
                    <label>{label}</label>
                </div>
            )
            break
        }
        case 'floating': {
            inputItem = (
                <div class='mui-textfield mui-textfield--float-label'>
                    {input}
                    <label>{label}</label>
                </div>
            )
            break
        }
        default: {
            inputItem = (
                <div class='mui-textfield'>
                    {input}
                </div>
            )
        }
    }

    return (
        inputItem
    )
}

export const TextArea = ({ placeholder, name, id, value, required, label, labelType, onKeyUp, onInput }, children) => {

    let inputItem
    let input = (
        <textarea
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            required={required}
            onkeyup={onKeyUp}
            oninput={onInput}>
        </textarea>
    )

    switch (labelType) {
        case 'fixed': {
            inputItem = (
                <div class='mui-textfield'>
                    {input}
                    <label>{label}</label>
                </div>
            )
            break
        }
        case 'floating': {
            inputItem = (
                <div class='mui-textfield mui-textfield--float-label'>
                    {input}
                    <label>{label}</label>
                </div>
            )
            break
        }
        default: {
            inputItem = (
                <div class='mui-textfield'>
                    {input}
                </div>
            )
        }
    }

    return (
        inputItem
    )
}

export const CheckBoxInput = ({ type, name, id, value, checked, disabled, required, label }, children) => {

    return (
        <label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                checked={checked}
                disabled={disabled}
                required={required}>
                {label}
            </input>
        </label>
    )
}

export const CheckBox = ({ type, items }) => {
    let checkBoxItems = items.map((item) => {
        return (<CheckBoxInput {...item}></CheckBoxInput>)
    })

    let boxType
    if (type === 'checkbox') {
        boxType = (
            <div class='mui-checkbox'>
                {checkBoxItems}
            </div>
        )
    } else if (type === 'radio') {
        boxType = (
            <div class='mui-radio'>
                {checkBoxItems}
            </div>
        )
    }

    return boxType
}

export const Select = ({ options, required, label, onChange }, children) => {

    let optionList = options.map((item) => {
        return <Option {...item}></Option>
    })

    return (
        <div class='mui-select'>
            <select
                required={required}
                onchange={onChange}>
                {optionList}
            </select>
            <label>{label}</label>
        </div>
    )
}

export const Option = ({ text, value, isSelected }) => {
    let retVal = ""
    if (isSelected) {
        retVal = <option value={value} selected>{text}</option>
    }
    else {
        retVal =  <option value={value}>{text}</option>
    }
    return retVal
}


export const Chips = ({ chips, style }, children) => {

    let chipItems = chips.map((item) => {
        return (<Chip {...item}></Chip>)
    })

    return (
        <div class='mui-chips' style={style}>
            {chipItems}
        </div>
    )
}

export const Chip = ({ remove, onRemove, text }, children) => {

    let chipItem

    if (remove) {
        chipItem = (
            <div class="mui-chip">
                <span>{text}</span>
                <button type="button" class="mui-chip-remove" onclick={onRemove}>
                </button>
            </div>
        )
    } else {
        chipItem = (
            <div class="mui-chip">
                {text}
            </div>
        )
    }

    return (
        chipItem
    )

}

export const Divider = ({ type }, children) => {

    let classType = 'mui-divider'
    let divType

    switch (type) {
        case 'top': {
            classType = 'mui--divider-top'
            divType = <div style={{paddingTop: '16px', paddingBottom: '16px'}} class={classType}>{children}</div>
            break
        }
        case 'bottom': {
            classType = 'mui--divider-bottom'
            divType = <div style={{paddingTop: '16px', paddingBottom: '16px'}} class={classType}>{children}</div>
            break
        }
        case 'left': {
            classType = 'mui--divider-left'
            divType = <span style={{paddingLeft: '16px', marginRight: '16px'}} class={classType}>{children}</span>
            break
        }
        case 'right': {
            classType = 'mui--divider-right'
            divType = <span style={{paddingRight: '16px', marginRight: '16px'}} class={classType}>{children}</span>
            break
        }
        default: {
            break
        }
    }

    return (
        divType
    )
}

export const Container = ({ fluid }, children) => {

    let isFluid = (
        <div style={{paddingTop: '18px'}}
            class='mui-container-fluid'>
            {children}
        </div>
    )
    let isNotFluid = (
        <div style={{paddingTop: '18px'}}
            class='mui-container'>
            {children}
        </div>
    )

    return (
        fluid ? isFluid : isNotFluid
    )
}

export const Panel = ({ style }, children) => {

    return (
        <div class="mui-panel" style={style}>
            {children}
        </div>
    )
}

export const LoadingSpinner = ({ }, children) => {

    return (
        <div class='mui-loading-spinner' style={{zIndex: '1000'}}>
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    )
}

export const mergeClass = (classes) => {
    return classes.join(' ')
}