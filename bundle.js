'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hyperapp = require('hyperapp');

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Button = function Button(_ref, children) {
    var type = _ref.type,
        color = _ref.color,
        size = _ref.size,
        text = _ref.text,
        onClick = _ref.onClick,
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === undefined ? false : _ref$disabled;

    var baseClass = 'mui-btn';
    var classType = null;
    var classColor = null;
    var classSize = null;

    switch (type) {
        case 'flat':
            {
                classType = 'mui-btn--flat';
                break;
            }
        case 'raised':
            {
                classType = 'mui-btn--raised';
                break;
            }
        case 'float':
            {
                classType = 'mui-btn--fab';
                break;
            }default:
            {
                classType = '';
                break;
            }
    }

    switch (color) {
        case 'primary':
            {
                classColor = 'mui-btn--primary';
                break;
            }
        case 'danger':
            {
                classColor = 'mui-btn--danger';
                break;
            }
        case 'accent':
            {
                classColor = 'mui-btn--accent';
                break;
            }
    }

    switch (size) {
        case 'small':
            {
                classSize = 'mui-btn--small';
                break;
            }
        case 'large':
            {
                classSize = 'mui-btn--large';
                break;
            }
    }

    baseClass = mergeClass([baseClass, classType, classColor, classSize, 'btn']);

    return hyperapp.h(
        'button',
        { 'class': baseClass, onclick: onClick, disabled: disabled },
        text
    );
};

var PageFab = function PageFab(_ref2, children) {
    var color = _ref2.color,
        size = _ref2.size,
        text = _ref2.text,
        onClick = _ref2.onClick,
        type = _ref2.type;


    return hyperapp.h(
        'div',
        { 'class': 'mui-footer-fab', style: { zIndex: '1000' } },
        hyperapp.h(Button, { type: type, color: color, size: size, text: text, onClick: onClick, disabled: disabled })
    );
};

var ActionCard = function ActionCard(_ref3, children) {
    var title = _ref3.title,
        content = _ref3.content,
        secondaryText = _ref3.secondaryText,
        accentText = _ref3.accentText,
        buttons = _ref3.buttons;


    var titleStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    var footerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    };

    var myButtons = buttons.map(function (item) {
        return hyperapp.h(Button, item);
    });

    return hyperapp.h(
        Panel,
        null,
        hyperapp.h(
            'div',
            { style: titleStyle },
            hyperapp.h(
                'h2',
                null,
                title
            ),
            hyperapp.h(
                'span',
                { 'class': 'mui--text-dark-secondary', style: { textAlign: 'right' } },
                accentText
            )
        ),
        hyperapp.h(
            'div',
            { 'class': 'mui--text-dark-secondary' },
            hyperapp.h(
                'p',
                null,
                content
            )
        ),
        hyperapp.h(
            'div',
            { style: footerStyle },
            hyperapp.h(
                'div',
                null,
                myButtons
            ),
            hyperapp.h(
                'p',
                { 'class': 'mui--text-accent' },
                secondaryText
            )
        )
    );
};

var Form = function Form(_ref4, children) {
    var title = _ref4.title,
        buttonText = _ref4.buttonText,
        onSubmit = _ref4.onSubmit,
        _ref4$showSubmit = _ref4.showSubmit,
        showSubmit = _ref4$showSubmit === undefined ? true : _ref4$showSubmit;

    var submit = showSubmit ? hyperapp.h(Button, { color: 'primary', text: buttonText }) : null;
    return hyperapp.h(
        'form',
        { 'class': 'mui-form', onsubmit: function onsubmit(e) {
                e.preventDefault();onSubmit();
            } },
        hyperapp.h(
            'legend',
            null,
            title
        ),
        children,
        submit
    );
};

var InlineForm = function InlineForm(_ref5, children) {
    var onSubmit = _ref5.onSubmit,
        buttonText = _ref5.buttonText;


    return hyperapp.h(
        'div',
        { 'class': 'mui-form--inline' },
        children,
        hyperapp.h(
            'span',
            { style: { paddingLeft: '16px' } },
            hyperapp.h(Button, { color: 'primary', text: buttonText, onClick: onSubmit })
        )
    );
};

var TextInput = function TextInput(_ref6, children) {
    var type = _ref6.type,
        placeholder = _ref6.placeholder,
        name = _ref6.name,
        id = _ref6.id,
        value = _ref6.value,
        required = _ref6.required,
        label = _ref6.label,
        labelType = _ref6.labelType,
        onChange = _ref6.onChange,
        onKeyUp = _ref6.onKeyUp,
        onCreate = _ref6.onCreate,
        disabled = _ref6.disabled;


    var inputItem = void 0;
    var input = hyperapp.h('input', {
        type: type,
        placeholder: placeholder,
        name: name,
        id: id,
        value: value,
        required: required,
        onchange: onChange,
        onkeyup: onKeyUp,
        oncreate: onCreate,
        disabled: disabled
    });

    switch (labelType) {
        case 'fixed':
            {
                inputItem = hyperapp.h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input,
                    hyperapp.h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        case 'floating':
            {
                inputItem = hyperapp.h(
                    'div',
                    { 'class': 'mui-textfield mui-textfield--float-label' },
                    input,
                    hyperapp.h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        default:
            {
                inputItem = hyperapp.h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input
                );
            }
    }

    return inputItem;
};

var TextArea = function TextArea(_ref7, children) {
    var _h;

    var placeholder = _ref7.placeholder,
        name = _ref7.name,
        id = _ref7.id,
        value = _ref7.value,
        required = _ref7.required,
        label = _ref7.label,
        labelType = _ref7.labelType,
        onKeyUp = _ref7.onKeyUp,
        onCreate = _ref7.onCreate,
        onChange = _ref7.onChange,
        disabled = _ref7.disabled;


    var inputItem = void 0;
    var input = hyperapp.h('textarea', (_h = {
        placeholder: placeholder,
        name: name,
        id: id,
        value: value,
        required: required,
        onchange: onChange,
        onkeyup: onKeyUp
    }, _defineProperty(_h, 'onchange', onChange), _defineProperty(_h, 'disabled', disabled), _h));

    switch (labelType) {
        case 'fixed':
            {
                inputItem = hyperapp.h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input,
                    hyperapp.h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        case 'floating':
            {
                inputItem = hyperapp.h(
                    'div',
                    { 'class': 'mui-textfield mui-textfield--float-label' },
                    input,
                    hyperapp.h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        default:
            {
                inputItem = hyperapp.h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input
                );
            }
    }

    return inputItem;
};

var CheckBoxInput = function CheckBoxInput(_ref8, children) {
    var type = _ref8.type,
        name = _ref8.name,
        id = _ref8.id,
        value = _ref8.value,
        checked = _ref8.checked,
        disabled = _ref8.disabled,
        required = _ref8.required,
        label = _ref8.label,
        onChange = _ref8.onChange;


    return hyperapp.h(
        'label',
        { style: {
                display: 'flex',
                alignItems: 'center'
            } },
        hyperapp.h('input', {
            type: type,
            name: name,
            id: id,
            value: value,
            checked: checked,
            disabled: disabled,
            required: required,
            onchange: onChange }),
        label
    );
};

var CheckBox = function CheckBox(_ref9) {
    var type = _ref9.type,
        items = _ref9.items;

    var checkBoxItems = items.map(function (item) {
        return hyperapp.h(CheckBoxInput, item);
    });

    var boxType = void 0;
    if (type === 'checkbox') {
        boxType = hyperapp.h(
            'div',
            { 'class': 'mui-checkbox' },
            checkBoxItems
        );
    } else if (type === 'radio') {
        boxType = hyperapp.h(
            'div',
            { 'class': 'mui-radio' },
            checkBoxItems
        );
    }

    return boxType;
};

var Select = function Select(_ref10, children) {
    var options = _ref10.options,
        required = _ref10.required,
        label = _ref10.label,
        onChange = _ref10.onChange,
        disabled = _ref10.disabled,
        value = _ref10.value;

    var optionList = options.map(function (item) {
        return hyperapp.h(Option, item);
    });

    return hyperapp.h(
        'div',
        { 'class': 'mui-select' },
        hyperapp.h(
            'select',
            {
                name: name,
                required: required,
                onchange: onChange,
                value: value,
                disabled: disabled
            },
            optionList
        ),
        hyperapp.h(
            'label',
            null,
            label
        )
    );
};

var Option = function Option(_ref11) {
    var text = _ref11.text,
        value = _ref11.value,
        isSelected = _ref11.isSelected;

    var retVal = "";
    if (isSelected) {
        retVal = hyperapp.h(
            'option',
            { value: value, selected: true },
            text
        );
    } else {
        retVal = hyperapp.h(
            'option',
            { value: value },
            text
        );
    }
    return retVal;
};

var Chips = function Chips(_ref12, children) {
    var chips = _ref12.chips,
        style = _ref12.style;


    var chipItems = chips.map(function (item) {
        return hyperapp.h(Chip, item);
    });

    return hyperapp.h(
        'div',
        { 'class': 'mui-chips', style: style },
        chipItems
    );
};

var Chip = function Chip(_ref13, children) {
    var remove = _ref13.remove,
        onRemove = _ref13.onRemove,
        text = _ref13.text;


    var chipItem = void 0;

    if (remove) {
        chipItem = hyperapp.h(
            'div',
            { 'class': 'mui-chip' },
            hyperapp.h(
                'span',
                null,
                text
            ),
            hyperapp.h('button', { type: 'button', 'class': 'mui-chip-remove', onclick: onRemove })
        );
    } else {
        chipItem = hyperapp.h(
            'div',
            { 'class': 'mui-chip' },
            text
        );
    }

    return chipItem;
};

var Divider = function Divider(_ref14, children) {
    var type = _ref14.type;


    var classType = 'mui-divider';
    var divType = void 0;

    switch (type) {
        case 'top':
            {
                classType = 'mui--divider-top';
                divType = hyperapp.h(
                    'div',
                    { style: { paddingTop: '16px', paddingBottom: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'bottom':
            {
                classType = 'mui--divider-bottom';
                divType = hyperapp.h(
                    'div',
                    { style: { paddingTop: '16px', paddingBottom: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'left':
            {
                classType = 'mui--divider-left';
                divType = hyperapp.h(
                    'span',
                    { style: { paddingLeft: '16px', marginRight: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'right':
            {
                classType = 'mui--divider-right';
                divType = hyperapp.h(
                    'span',
                    { style: { paddingRight: '16px', marginRight: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        default:
            {
                break;
            }
    }

    return divType;
};

var Container = function Container(_ref15, children) {
    var fluid = _ref15.fluid;


    var isFluid = hyperapp.h(
        'div',
        { style: { paddingTop: '18px' },
            'class': 'mui-container-fluid' },
        children
    );
    var isNotFluid = hyperapp.h(
        'div',
        { style: { paddingTop: '18px' },
            'class': 'mui-container' },
        children
    );

    return fluid ? isFluid : isNotFluid;
};

var Panel = function Panel(_ref16, children) {
    var style = _ref16.style;


    return hyperapp.h(
        'div',
        { 'class': 'mui-panel', style: style },
        children
    );
};

var LoadingSpinner = function LoadingSpinner(_ref17, children) {
    _objectDestructuringEmpty(_ref17);

    return hyperapp.h(
        'div',
        { 'class': 'mui-loading-spinner', style: { zIndex: '1000' } },
        hyperapp.h(
            'svg',
            { 'class': 'spinner', width: '65px', height: '65px', viewBox: '0 0 66 66', xmlns: 'http://www.w3.org/2000/svg' },
            hyperapp.h('circle', { 'class': 'path', fill: 'none', 'stroke-width': '6', 'stroke-linecap': 'round', cx: '33', cy: '33', r: '30' })
        )
    );
};

var mergeClass = function mergeClass(classes) {
    return classes.join(' ');
};

var Modal = function Modal(_ref18, children) {
    var style = _ref18.style;


    return hyperapp.h(
        'div',
        { 'class': 'customModal', id: 'modal' },
        hyperapp.h(
            'div',
            { 'class': 'modal-content' },
            children
        )
    );
};

var Docs = function Docs(state, actions) {
    return function (props) {

        var modal = state.showModal ? hyperapp.h(
            Modal,
            null,
            hyperapp.h(Button, { onClick: function onClick() {
                    actions.hideModal();
                }, text: 'Hide Modal', color: 'danger' })
        ) : null;

        var checkBoxItems = [{
            type: 'checkbox',
            name: 'checkbox',
            value: '1',
            checked: true
        }, {
            type: 'checkbox',
            name: 'checkbox',
            value: '1'
        }, {
            type: 'checkbox',
            name: 'checkbox',
            value: '1'
        }];

        var raidoItems = [{
            type: 'radio',
            value: '1',
            label: 'options 1',
            name: 'group1',
            checked: true
        }, {
            type: 'radio',
            value: '2',
            name: 'group1',
            label: 'options 2'
        }, {
            type: 'radio',
            value: '3',
            name: 'group1',
            label: 'options 3'
        }];

        var selectOptions = [{
            text: 'option 1',
            value: '1'
        }, {
            text: 'option 1',
            value: '2'
        }, {
            text: 'option 3',
            value: '3'
        }];

        var chipItems = [{
            remove: true,
            onRemove: function onRemove() {
                console.log('remove clicked');
            },
            text: 'chip 1'
        }, {
            text: 'chip 2'
        }, {
            text: 'chip 3'
        }];

        var actionCardButtons = [{
            text: 'Button 1',
            type: 'raised',
            color: 'primary'
        }, {
            text: 'Button 2',
            type: 'flat',
            color: 'danger'
        }, {
            text: '3',
            type: 'float',
            size: 'large',
            color: 'accent'
        }];
        return hyperapp.h(
            Container,
            { fluid: false },
            hyperapp.h(
                Divider,
                { type: 'bottom' },
                hyperapp.h(
                    'h1',
                    null,
                    'Important Links'
                )
            ),
            hyperapp.h(
                'ul',
                null,
                hyperapp.h(
                    'li',
                    null,
                    hyperapp.h(
                        'a',
                        { href: 'https://www.muicss.com/' },
                        'CSS Library'
                    )
                ),
                hyperapp.h(
                    'li',
                    null,
                    hyperapp.h(
                        'a',
                        { href: 'https://github.com/firstfleetinc/hyperappComponents' },
                        'Github'
                    )
                )
            ),
            hyperapp.h(
                Divider,
                { type: 'bottom' },
                hyperapp.h(
                    'h1',
                    null,
                    'Layout Components'
                )
            ),
            hyperapp.h(
                Panel,
                null,
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Container'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'A page wrapper'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'fluid | boolean'
                        )
                    )
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Divider'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'A line divider with padding, wrap component'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'type | [top, bottom, left, right]'
                        )
                    ),
                    hyperapp.h(
                        Divider,
                        { type: 'top' },
                        'top'
                    ),
                    hyperapp.h(
                        Divider,
                        { type: 'bottom' },
                        'bottom'
                    ),
                    hyperapp.h('div', { style: { height: '16px' } }),
                    hyperapp.h(
                        Divider,
                        { type: 'left' },
                        'left'
                    ),
                    hyperapp.h(
                        Divider,
                        { type: 'right' },
                        'right'
                    )
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Panel'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'Used for making cards / raised content areas'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'style | style object'
                        )
                    ),
                    hyperapp.h(
                        Panel,
                        null,
                        'PANEL'
                    )
                )
            ),
            hyperapp.h(
                Divider,
                { type: 'bottom' },
                hyperapp.h(
                    'h1',
                    null,
                    'Form Components'
                )
            ),
            hyperapp.h(
                Panel,
                null,
                hyperapp.h(
                    'h3',
                    null,
                    'Form'
                ),
                hyperapp.h(
                    'p',
                    null,
                    'Can take inputs as children'
                ),
                hyperapp.h(
                    'h4',
                    null,
                    'Props'
                ),
                hyperapp.h(
                    'ul',
                    null,
                    hyperapp.h(
                        'li',
                        null,
                        'title | string'
                    ),
                    hyperapp.h(
                        'li',
                        null,
                        'buttonText | string'
                    ),
                    hyperapp.h(
                        'li',
                        null,
                        'onSubmit | function'
                    )
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(Form, {
                        title: 'Form',
                        buttonText: 'Button Text',
                        onSubmit: function onSubmit() {
                            console.log('submitted form');
                        } })
                ),
                hyperapp.h(
                    'h3',
                    null,
                    'Inline Form'
                ),
                hyperapp.h(
                    'p',
                    null,
                    'Takes an input as a child'
                ),
                hyperapp.h(
                    'h4',
                    null,
                    'Props'
                ),
                hyperapp.h(
                    'ul',
                    null,
                    hyperapp.h(
                        'li',
                        null,
                        'buttonText | string'
                    ),
                    hyperapp.h(
                        'li',
                        null,
                        'onSubmit | function'
                    )
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        InlineForm,
                        {
                            onSubmit: function onSubmit() {
                                console.log('submitted inline form');
                            },
                            buttonText: 'Button Text' },
                        hyperapp.h(TextInput, {
                            type: 'text',
                            name: 'InlineFormInput',
                            id: 'InlineFormID',
                            required: false,
                            label: 'Inline Form',
                            labelType: 'floating',
                            value: '',
                            onKeyUp: function onKeyUp(e) {
                                return console.log(e.target.value);
                            }
                        })
                    )
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Text Input'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'should be usable for any html input type'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'type | any html 5 input type'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'placeholder | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'name | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'id | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'value | value for input'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'required | boolean, type effects form validation'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'label | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'labelType | fixed, floating, none'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'onChange | function'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'onKeyUp | function'
                        )
                    ),
                    hyperapp.h(TextInput, {
                        type: 'text',
                        label: 'text input',
                        labelType: 'fixed',
                        onChange: function onChange() {
                            console.log('onChange fired');
                        },
                        onKeyUp: function onKeyUp() {
                            return console.log('onKeyUp Fired');
                        }
                    })
                ),
                hyperapp.h(
                    Divider,
                    {
                        type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'TextArea'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'html text area'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'placeholder | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'name | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'id | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'value | value for input'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'required | boolean, type effects form validation'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'label | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'labelType | fixed, floating, none'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'onKeyUp | function'
                        )
                    ),
                    hyperapp.h(TextArea, {
                        placeholder: 'placeholder',
                        label: 'text-area',
                        labelType: 'fixed',
                        onKeyUp: function onKeyUp() {
                            return console.log('on key up fired');
                        } })
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Check Box / Radio Input'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'Both use the CheckBox component. You make an array of meta data for items. '
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props for CheckBox'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'items | array'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'type | checkbox || radio'
                        )
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props for items'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'type | radio for radio || checkbox for checkbox'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            ' name | string : all radios in a group should have same name'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'id | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'value | input value'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'checked | boolean'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'disabled | boolean'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'required | boolean'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'label | string'
                        )
                    ),
                    hyperapp.h(
                        'form',
                        null,
                        hyperapp.h(CheckBox, { type: 'checkbox', items: checkBoxItems })
                    ),
                    hyperapp.h(
                        'form',
                        null,
                        hyperapp.h(CheckBox, { type: 'radio', items: raidoItems })
                    )
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Select'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'Dropdown select, items are an array of meta data for items'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props for Select'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'items | array'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'type | checkbox || radio'
                        )
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props for items'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'text | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'value | value for input'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'isSelected | boolean'
                        )
                    ),
                    hyperapp.h(Select, { options: selectOptions })
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Chips'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'Tagging element, chips is an array of meta data for chip'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props for Chips'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'chips | array'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'style | style object'
                        )
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props for chip'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'remove | boolean, controls whether they have a remove button or not'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'onRemove | function'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'text | string'
                        )
                    ),
                    hyperapp.h(Chips, { chips: chipItems })
                )
            ),
            hyperapp.h(
                Divider,
                { type: 'bottom' },
                hyperapp.h(
                    'h1',
                    null,
                    'Buttons'
                )
            ),
            hyperapp.h(
                Panel,
                null,
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'Button'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'A Button'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'type | [null, flat, raised, float]'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'color | [null, primary, accent, danger]'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'size | [null, small, large]'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'text | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'onClick | function'
                        )
                    ),
                    hyperapp.h(Button, {
                        color: 'primary',
                        size: 'large',
                        text: 'Button' }),
                    hyperapp.h(Button, {
                        type: 'flat',
                        color: 'primary',
                        text: 'Button flat primary' }),
                    hyperapp.h(Button, {
                        type: 'raised',
                        color: 'accent',
                        text: 'Button raised accent' }),
                    hyperapp.h(Button, {
                        type: 'float',
                        color: 'danger',
                        size: 'large',
                        text: '+' })
                ),
                hyperapp.h(
                    Divider,
                    { type: 'bottom' },
                    hyperapp.h(
                        'h3',
                        null,
                        'PageFab'
                    ),
                    hyperapp.h(
                        'p',
                        null,
                        'A page set floating button, sets a button in the lower right hand corner above other page content'
                    ),
                    hyperapp.h(
                        'h4',
                        null,
                        'Props'
                    ),
                    hyperapp.h(
                        'ul',
                        null,
                        hyperapp.h(
                            'li',
                            null,
                            'type | [null, flat, raised, float]'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'color | [null, primary, accent, danger]'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'size | [null, small, large]'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'text | string'
                        ),
                        hyperapp.h(
                            'li',
                            null,
                            'onClick | function'
                        )
                    ),
                    hyperapp.h(PageFab, {
                        type: 'raised',
                        color: 'primary',
                        text: 'PageFab',
                        size: 'large' })
                )
            ),
            hyperapp.h(
                Divider,
                { type: 'bottom' },
                hyperapp.h(
                    'h1',
                    null,
                    'Cards'
                )
            ),
            hyperapp.h(
                Panel,
                null,
                hyperapp.h(
                    'h3',
                    null,
                    'ActionCard'
                ),
                hyperapp.h(
                    'p',
                    null,
                    'A card that can take a row of buttons'
                ),
                hyperapp.h(
                    'h4',
                    null,
                    'Props'
                ),
                hyperapp.h(
                    'ul',
                    null,
                    hyperapp.h(
                        'li',
                        null,
                        'title | string'
                    ),
                    hyperapp.h(
                        'li',
                        null,
                        'content | string'
                    ),
                    hyperapp.h(
                        'li',
                        null,
                        'secondaryText | string'
                    ),
                    hyperapp.h(
                        'li',
                        null,
                        'accentText | string'
                    ),
                    hyperapp.h(
                        'li',
                        null,
                        'buttons | array of button metatdata'
                    )
                ),
                hyperapp.h(ActionCard, {
                    buttons: actionCardButtons,
                    title: 'Action Card',
                    content: 'This is card content',
                    accentText: 'accenting',
                    secondaryText: 'secondary' })
            ),
            hyperapp.h(
                Divider,
                { type: 'bottom' },
                hyperapp.h(
                    'h1',
                    null,
                    'Modal'
                )
            ),
            hyperapp.h(
                Panel,
                null,
                hyperapp.h(
                    'h3',
                    null,
                    'Modal'
                ),
                hyperapp.h(
                    'p',
                    null,
                    'Renders children content in a modal'
                ),
                hyperapp.h(
                    'h4',
                    null,
                    'Props'
                ),
                hyperapp.h(
                    'ul',
                    null,
                    hyperapp.h(
                        'li',
                        null,
                        'children | string'
                    )
                ),
                hyperapp.h(Button, {
                    onClick: function onClick() {
                        actions.showModal();
                    },
                    text: 'Show Modal',
                    color: 'primary'
                }),
                modal
            )
        );
    };
};

exports.Button = Button;
exports.PageFab = PageFab;
exports.ActionCard = ActionCard;
exports.Form = Form;
exports.InlineForm = InlineForm;
exports.TextInput = TextInput;
exports.TextArea = TextArea;
exports.CheckBoxInput = CheckBoxInput;
exports.CheckBox = CheckBox;
exports.Select = Select;
exports.Option = Option;
exports.Chips = Chips;
exports.Chip = Chip;
exports.Divider = Divider;
exports.Container = Container;
exports.Panel = Panel;
exports.LoadingSpinner = LoadingSpinner;
exports.mergeClass = mergeClass;
exports.Modal = Modal;
exports.Docs = Docs;
