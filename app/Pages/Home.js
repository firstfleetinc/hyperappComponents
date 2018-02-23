import { h } from "hyperapp"
import { Divider, Container, Panel } from '../components/Layout/Layout'
import { Button, PageFab } from '../components/Buttons/Button'
import { ActionCard } from '../components/Cards/Cards'
import { Form, InlineForm, TextInput, TextArea, CheckBox, Select } from '../components/Forms/Form'
import { LoadingSpinner } from '../components/Loading/Loading';

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

    return (
        <Container fluid={false}>


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
                    <p>Dropdown select</p>
                    <h4>Props for Select</h4>
                    <ul>
                        <li>items | array</li>
                        <li>type | checkbox || radio</li>
                    </ul>
                    <Select options={selectOptions}></Select>
                </Divider>
            </Panel>

        </Container >
    )
}