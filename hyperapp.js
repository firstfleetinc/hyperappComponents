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

export const Select = ({ options, required, label, onChange, disabled, value }, children) => {

    let optionList = options.map((item) => {
        return <Option {...item}></Option>
    })

    return (
        <div class='mui-select'>
            <select
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

export const Modal = ({style}, children) => {

    return (
        <div class='customModal' id='modal'>
            <div class='modal-content'>
                {children}
            </div>
        </div>     
    )
}

export const Docs = (state, actions) => props => {

    let modal = state.showModal ? (<Modal ><Button onClick={() => {actions.hideModal()}} text='Hide Modal' color='danger'></Button></Modal>) : null;

    let checkBoxItems = [
        {
            type: 'checkbox',
            name: 'checkbox',
            value: '1',
            checked: true
        },
        {
            type: 'checkbox',
            name: 'checkbox',
            value: '1'
        },
        {
            type: 'checkbox',
            name: 'checkbox',
            value: '1'
        }
    ]

    let raidoItems = [
        {
            type: 'radio',
            value: '1',
            label: 'options 1',
            name: 'group1',
            checked: true
        },
        {
            type: 'radio',
            value: '2',
            name: 'group1',
            label: 'options 2'
        },
        {
            type: 'radio',
            value: '3',
            name: 'group1',
            label: 'options 3'
        }
    ]

    let selectOptions = [
        {
            text: 'option 1',
            value: '1'
        },
        {
            text: 'option 1',
            value: '2'
        },
        {
            text: 'option 3',
            value: '3'
        }
    ]

    let chipItems = [
        {
            remove: true,
            onRemove: () => { console.log('remove clicked') },
            text: 'chip 1'
        },
        {
            text: 'chip 2'
        },
        {
            text: 'chip 3'
        },
    ]

    let actionCardButtons = [
        {
            text: 'Button 1',
            type: 'raised',
            color: 'primary'
        },
        {
            text: 'Button 2',
            type: 'flat',
            color: 'danger'
        },
        {
            text: '3',
            type: 'float',
            size: 'large',
            color: 'accent'
        }
    ]
    return (
        <Container fluid={false}>
            <Divider type="bottom"><h1>Important Links</h1></Divider>
            <ul>
                <li><a href="https://www.muicss.com/">CSS Library</a></li>
                <li><a href="https://github.com/firstfleetinc/hyperappComponents">Github</a></li>
            </ul>
            <Divider type="bottom"><h1>Layout Components</h1></Divider>
            <Panel>
                <Divider type="bottom">
                    <h3>Container</h3>
                    <p>A page wrapper</p>
                    <h4>Props</h4>
                    <ul>
                        <li>fluid | boolean</li>
                    </ul>
                </Divider>
                <Divider type="bottom">
                    <h3>Divider</h3>
                    <p>A line divider with padding, wrap component</p>
                    <h4>Props</h4>
                    <ul>
                        <li>type | [top, bottom, left, right]</li>
                    </ul>
                    <Divider type="top">top</Divider>
                    <Divider type="bottom">bottom</Divider>
                    <div style={{ height: '16px' }}></div>
                    <Divider type="left">left</Divider>
                    <Divider type="right">right</Divider>
                </Divider>
                <Divider type="bottom">
                    <h3>Panel</h3>
                    <p>Used for making cards / raised content areas</p>
                    <h4>Props</h4>
                    <ul>
                        <li>style | style object</li>
                    </ul>
                    <Panel>PANEL</Panel>
                </Divider>
            </Panel>
            <Divider type="bottom"><h1>Form Components</h1></Divider>

            <Panel>
                <h3>Form</h3>
                <p>Can take inputs as children</p>
                <h4>Props</h4>
                <ul>
                    <li>title | string</li>
                    <li>buttonText | string</li>
                    <li>onSubmit | function</li>
                </ul>
                <Divider type="bottom">
                    <Form
                        title='Form'
                        buttonText='Button Text'
                        onSubmit={() => { console.log('submitted form') }}>
                    </Form>
                </Divider>
                <h3>Inline Form</h3>
                <p>Takes an input as a child</p>
                <h4>Props</h4>
                <ul>
                    <li>buttonText | string</li>
                    <li>onSubmit | function</li>
                </ul>
                <Divider type="bottom">
                    <InlineForm
                        onSubmit={() => { console.log('submitted inline form') }}
                        buttonText='Button Text'>
                        <TextInput
                            type='text'
                            name='InlineFormInput'
                            id='InlineFormID'
                            required={false}
                            label='Inline Form'
                            labelType='floating'
                            value=''
                            onKeyUp={(e) => console.log(e.target.value)}
                        >
                        </TextInput>
                    </InlineForm>
                </Divider>
                <Divider type="bottom">
                    <h3>Text Input</h3>
                    <p>should be usable for any html input type</p>
                    <h4>Props</h4>
                    <ul>
                        <li>type | any html 5 input type</li>
                        <li>placeholder | string</li>
                        <li>name | string</li>
                        <li>id | string</li>
                        <li>value | value for input</li>
                        <li>required | boolean, type effects form validation</li>
                        <li>label | string</li>
                        <li>labelType | fixed, floating, none</li>
                        <li>onChange | function</li>
                        <li>onKeyUp | function</li>
                    </ul>
                    <TextInput
                        type='text'
                        label='text input'
                        labelType='fixed'
                        onChange={() => { console.log('onChange fired') }}
                        onKeyUp={() => console.log('onKeyUp Fired')}
                    ></TextInput>
                </Divider>
                <Divider
                    type='bottom'>
                    <h3>TextArea</h3>
                    <p>html text area</p>
                    <h4>Props</h4>
                    <ul>
                        <li>placeholder | string</li>
                        <li>name | string</li>
                        <li>id | string</li>
                        <li>value | value for input</li>
                        <li>required | boolean, type effects form validation</li>
                        <li>label | string</li>
                        <li>labelType | fixed, floating, none</li>
                        <li>onKeyUp | function</li>
                    </ul>
                    <TextArea
                        placeholder='placeholder'
                        label='text-area'
                        labelType='fixed'
                        onKeyUp={() => console.log('on key up fired')}></TextArea>
                </Divider>
                <Divider type='bottom'>
                    <h3>Check Box / Radio Input</h3>
                    <p>Both use the CheckBox component. You make an array of meta data for items. </p>
                    <h4>Props for CheckBox</h4>
                    <ul>
                        <li>items | array</li>
                        <li>type | checkbox || radio</li>
                    </ul>
                    <h4>Props for items</h4>
                    <ul>
                        <li>type | radio for radio || checkbox for checkbox</li>
                        <li> name | string : all radios in a group should have same name</li>
                        <li>id | string</li>
                        <li>value | input value</li>
                        <li>checked | boolean</li>
                        <li>disabled | boolean</li>
                        <li>required | boolean</li>
                        <li>label | string</li>
                    </ul>

                    <form>
                        <CheckBox type='checkbox' items={checkBoxItems}>

                        </CheckBox>
                    </form>
                    <form>
                        <CheckBox type='radio' items={raidoItems}></CheckBox>
                    </form>
                </Divider>
                <Divider type='bottom'>
                    <h3>Select</h3>
                    <p>Dropdown select, items are an array of meta data for items</p>
                    <h4>Props for Select</h4>
                    <ul>
                        <li>items | array</li>
                        <li>type | checkbox || radio</li>
                    </ul>
                    <h4>Props for items</h4>
                    <ul>
                        <li>text | string</li>
                        <li>value | value for input</li>
                        <li>isSelected | boolean</li>
                    </ul>
                    <Select options={selectOptions}></Select>
                </Divider>
                <Divider type='bottom'>
                    <h3>Chips</h3>
                    <p>Tagging element, chips is an array of meta data for chip</p>
                    <h4>Props for Chips</h4>
                    <ul>
                        <li>chips | array</li>
                        <li>style | style object</li>
                    </ul>
                    <h4>Props for chip</h4>
                    <ul>
                        <li>remove | boolean, controls whether they have a remove button or not</li>
                        <li>onRemove | function</li>
                        <li>text | string</li>
                    </ul>
                    <Chips chips={chipItems}></Chips>
                </Divider>
            </Panel>
            <Divider type="bottom"><h1>Buttons</h1></Divider>
            <Panel>
                <Divider type='bottom'>
                    <h3>Button</h3>
                    <p>A Button</p>
                    <h4>Props</h4>
                    <ul>
                        <li>type | [null, flat, raised, float]</li>
                        <li>color | [null, primary, accent, danger]</li>
                        <li>size | [null, small, large]</li>
                        <li>text | string</li>
                        <li>onClick | function</li>
                    </ul>
                    <Button
                        color='primary'
                        size='large'
                        text='Button'>
                    </Button>
                    <Button
                        type='flat'
                        color='primary'
                        text='Button flat primary'>
                    </Button>
                    <Button
                        type='raised'
                        color='accent'
                        text='Button raised accent'>
                    </Button>
                    <Button
                        type='float'
                        color='danger'
                        size='large'
                        text='+'>
                    </Button>
                </Divider>
                <Divider type='bottom'>
                    <h3>PageFab</h3>
                    <p>A page set floating button, sets a button in the lower right hand corner above other page content</p>
                    <h4>Props</h4>
                    <ul>
                        <li>type | [null, flat, raised, float]</li>
                        <li>color | [null, primary, accent, danger]</li>
                        <li>size | [null, small, large]</li>
                        <li>text | string</li>
                        <li>onClick | function</li>
                    </ul>
                    <PageFab
                        type='raised'
                        color='primary'
                        text='PageFab'
                        size='large'></PageFab>
                </Divider>
            </Panel>
            <Divider type="bottom"><h1>Cards</h1></Divider>
            <Panel>
                <h3>ActionCard</h3>
                <p>A card that can take a row of buttons</p>
                <h4>Props</h4>
                <ul>
                    <li>title | string</li>
                    <li>content | string</li>
                    <li>secondaryText | string</li>
                    <li>accentText | string</li>
                    <li>buttons | array of button metatdata</li>
                </ul>
                <ActionCard 
                buttons={actionCardButtons}
                title='Action Card'
                content='This is card content'
                accentText='accenting'
                secondaryText='secondary'></ActionCard>
            </Panel>
            <Divider type="bottom"><h1>Modal</h1></Divider>
            <Panel>
                <h3>Modal</h3>
                <p>Renders children content in a modal</p>
                <h4>Props</h4>
                <ul>
                    <li>children | string</li>
                </ul>
                <Button 
                onClick={() => {actions.showModal()}} 
                text='Show Modal'
                color='primary'
                ></Button>
                {modal}
            </Panel>
        </Container >
    )
}