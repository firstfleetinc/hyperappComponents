'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hyperapp = require('hyperapp');

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var Button = function Button(_ref, children) {
    var type = _ref.type,
        color = _ref.color,
        size = _ref.size,
        text = _ref.text,
        onClick = _ref.onClick;

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
        { 'class': baseClass, onclick: onClick },
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
        hyperapp.h(Button, { type: type, color: color, size: size, text: text, onClick: onClick })
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
        onSubmit = _ref4.onSubmit;


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
        hyperapp.h(Button, { color: 'primary', text: buttonText })
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
        onKeyUp = _ref6.onKeyUp;


    var inputItem = void 0;
    var input = hyperapp.h('input', {
        type: type,
        placeholder: placeholder,
        name: name,
        id: id,
        value: value,
        required: required,
        onchange: onChange,
        onkeyup: onKeyUp });

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
    var placeholder = _ref7.placeholder,
        name = _ref7.name,
        id = _ref7.id,
        value = _ref7.value,
        required = _ref7.required,
        label = _ref7.label,
        labelType = _ref7.labelType,
        onKeyUp = _ref7.onKeyUp;


    var inputItem = void 0;
    var input = hyperapp.h('textarea', {
        placeholder: placeholder,
        name: name,
        id: id,
        value: value,
        required: required,
        onkeyup: onKeyUp });

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
        label = _ref8.label;


    return hyperapp.h(
        'label',
        null,
        hyperapp.h(
            'input',
            {
                type: type,
                name: name,
                id: id,
                value: value,
                checked: checked,
                disabled: disabled,
                required: required },
            label
        )
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
        onChange = _ref10.onChange;


    var optionList = options.map(function (item) {
        return hyperapp.h(Option, item);
    });

    return hyperapp.h(
        'div',
        { 'class': 'mui-select' },
        hyperapp.h(
            'select',
            {
                required: required,
                onchange: onChange },
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
        value = _ref11.value;


    return hyperapp.h(
        'option',
        { value: value },
        text
    );
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
