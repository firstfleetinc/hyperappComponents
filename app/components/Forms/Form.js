import { h } from 'hyperapp'
import { Button } from '../Buttons/Buttons.js'

export const Form = ({ title, buttonText, onSubmit, showSubmit = true }, children) => {

    let submit = showSubmit ? <Button color='primary' text={buttonText}></Button> : null;

    return (
        <form class='mui-form' onsubmit={(e) => { e.preventDefault(); onSubmit() }}>
            <legend>{title}</legend>
            {children}
            {submit}
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

export const TextInput = ({ type, placeholder, name, id, value, required, label, labelType, onChange, onKeyUp, onCreate, disabled }, children) => {

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
            onkeyup={onKeyUp}
            oncreate={onCreate}
            disabled={disabled}
            >
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

export const TextArea = ({ placeholder, name, id, value, required, label, labelType, onKeyUp, onCreate, onChange, disabled }, children) => {

    let inputItem
    let input = (
        <textarea
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            required={required}
            onchange={onChange}
            onkeyup={onKeyUp}
            onchange={onChange}
            disabled={disabled}>
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

export const CheckBoxInput = ({ type, name, id, value, checked, disabled, required, label, onChange }, children) => {

    return (
        <label style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                checked={checked}
                disabled={disabled}
                required={required}
                onchange={onChange} />
                {label}
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

export const Select = ({ options, required, label, onChange, name, disabled, value }, children) => {

    let optionList = options.map((item) => {
        return <Option {...item}></Option>
    })

    return (
        <div class='mui-select'>
            <select
                name = {name}    
                required={required}
                onchange={onChange}
                value={value}
                disabled={disabled}
                >
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