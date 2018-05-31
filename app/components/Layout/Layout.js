import { h } from 'hyperapp'

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

export const Modal = ({style}, children) => {

    return (
        <div class='customModal' id='modal'>
            <div class='modal-content'>
                {children}
            </div>
        </div>     
    )
}