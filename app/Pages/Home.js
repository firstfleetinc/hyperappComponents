import { h } from "hyperapp"
import { Divider, Container, Panel } from '../components/Layout/Layout'
import { Button, PageFab } from '../components/Buttons/Button'
import { ActionCard } from '../components/Cards/Cards'
import { Form, InlineForm, TextInput, Select } from '../components/Forms/Form'
import { LoadingSpinner } from '../components/Loading/Loading';

export const Home = (state, actions) => props => {

   

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
                    onSubmit={() => {console.log('submitted form')}}>
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
                    onSubmit={() => {console.log('submitted inline form')}}
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
                    <p></p>
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
                        onChange={() => {console.log('onChange fired')}}
                        onKeyUp={() => console.log('onKeyUp Fired')}
                    ></TextInput>
                    </Divider>
                </Panel>
            
        </Container>
    )
}