import { h } from "hyperapp"
import { Divider, Container, Panel } from 'Layout'
import { Button, PageFab } from 'Button'
import { ActionCard } from 'Cards'
import { Form, InlineForm, TextInput, TextArea, CheckBox, Select, Chips } from 'Form'
import { LoadingSpinner } from 'Loading';

export const Home = (state, actions) => props => {

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
        </Container >
    )
}