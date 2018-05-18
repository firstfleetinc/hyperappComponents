import { Panel } from '../Layout/Layout.js'
import { Button } from '../Buttons/Buttons.js'
import { h } from "hyperapp"

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