import { h } from 'hyperapp';
import { mergeClass } from 'cssUtils';
import { Panel } from 'Layout';
import { Button } from 'Button';

var Button$1 = function Button$$1(_ref, children) {
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

    return h(
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


    return h(
        'div',
        { 'class': 'mui-footer-fab', style: { zIndex: '1000' } },
        h(Button$1, { type: type, color: color, size: size, text: text, onClick: onClick })
    );
};

var ActionCard = function ActionCard(_ref, children) {
    var title = _ref.title,
        content = _ref.content,
        secondaryText = _ref.secondaryText,
        accentText = _ref.accentText,
        buttons = _ref.buttons;


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
        return h(Button, item);
    });

    return h(
        Panel,
        null,
        h(
            'div',
            { style: titleStyle },
            h(
                'h2',
                null,
                title
            ),
            h(
                'span',
                { 'class': 'mui--text-dark-secondary', style: { textAlign: 'right' } },
                accentText
            )
        ),
        h(
            'div',
            { 'class': 'mui--text-dark-secondary' },
            h(
                'p',
                null,
                content
            )
        ),
        h(
            'div',
            { style: footerStyle },
            h(
                'div',
                null,
                myButtons
            ),
            h(
                'p',
                { 'class': 'mui--text-accent' },
                secondaryText
            )
        )
    );
};

var Form = function Form(_ref, children) {
    var title = _ref.title,
        buttonText = _ref.buttonText,
        onSubmit = _ref.onSubmit;


    return h(
        'form',
        { 'class': 'mui-form', onsubmit: function onsubmit(e) {
                e.preventDefault();onSubmit();
            } },
        h(
            'legend',
            null,
            title
        ),
        children,
        h(Button, { color: 'primary', text: buttonText })
    );
};

var InlineForm = function InlineForm(_ref2, children) {
    var onSubmit = _ref2.onSubmit,
        buttonText = _ref2.buttonText;


    return h(
        'div',
        { 'class': 'mui-form--inline' },
        children,
        h(
            'span',
            { style: { paddingLeft: '16px' } },
            h(Button, { color: 'primary', text: buttonText, onClick: onSubmit })
        )
    );
};

var TextInput = function TextInput(_ref3, children) {
    var type = _ref3.type,
        placeholder = _ref3.placeholder,
        name = _ref3.name,
        id = _ref3.id,
        value = _ref3.value,
        required = _ref3.required,
        label = _ref3.label,
        labelType = _ref3.labelType,
        onChange = _ref3.onChange,
        onKeyUp = _ref3.onKeyUp;


    var inputItem = void 0;
    var input = h('input', {
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
                inputItem = h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input,
                    h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        case 'floating':
            {
                inputItem = h(
                    'div',
                    { 'class': 'mui-textfield mui-textfield--float-label' },
                    input,
                    h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        default:
            {
                inputItem = h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input
                );
            }
    }

    return inputItem;
};

var TextArea = function TextArea(_ref4, children) {
    var placeholder = _ref4.placeholder,
        name = _ref4.name,
        id = _ref4.id,
        value = _ref4.value,
        required = _ref4.required,
        label = _ref4.label,
        labelType = _ref4.labelType,
        onKeyUp = _ref4.onKeyUp;


    var inputItem = void 0;
    var input = h('textarea', {
        placeholder: placeholder,
        name: name,
        id: id,
        value: value,
        required: required,
        onkeyup: onKeyUp });

    switch (labelType) {
        case 'fixed':
            {
                inputItem = h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input,
                    h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        case 'floating':
            {
                inputItem = h(
                    'div',
                    { 'class': 'mui-textfield mui-textfield--float-label' },
                    input,
                    h(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        default:
            {
                inputItem = h(
                    'div',
                    { 'class': 'mui-textfield' },
                    input
                );
            }
    }

    return inputItem;
};

var CheckBoxInput = function CheckBoxInput(_ref5, children) {
    var type = _ref5.type,
        name = _ref5.name,
        id = _ref5.id,
        value = _ref5.value,
        checked = _ref5.checked,
        disabled = _ref5.disabled,
        required = _ref5.required,
        label = _ref5.label;


    return h(
        'label',
        null,
        h(
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

var CheckBox = function CheckBox(_ref6) {
    var type = _ref6.type,
        items = _ref6.items;

    var checkBoxItems = items.map(function (item) {
        return h(CheckBoxInput, item);
    });

    var boxType = void 0;
    if (type === 'checkbox') {
        boxType = h(
            'div',
            { 'class': 'mui-checkbox' },
            checkBoxItems
        );
    } else if (type === 'radio') {
        boxType = h(
            'div',
            { 'class': 'mui-radio' },
            checkBoxItems
        );
    }

    return boxType;
};

var Select = function Select(_ref7, children) {
    var options = _ref7.options,
        required = _ref7.required,
        label = _ref7.label,
        onChange = _ref7.onChange;


    var optionList = options.map(function (item) {
        return h(Option, item);
    });

    return h(
        'div',
        { 'class': 'mui-select' },
        h(
            'select',
            {
                required: required,
                onchange: onChange },
            optionList
        ),
        h(
            'label',
            null,
            label
        )
    );
};

var Option = function Option(_ref8) {
    var text = _ref8.text,
        value = _ref8.value;


    return h(
        'option',
        { value: value },
        text
    );
};

var Chips = function Chips(_ref9, children) {
    var chips = _ref9.chips,
        style = _ref9.style;


    var chipItems = chips.map(function (item) {
        return h(Chip, item);
    });

    return h(
        'div',
        { 'class': 'mui-chips', style: style },
        chipItems
    );
};

var Chip = function Chip(_ref10, children) {
    var remove = _ref10.remove,
        onRemove = _ref10.onRemove,
        text = _ref10.text;


    var chipItem = void 0;

    if (remove) {
        chipItem = h(
            'div',
            { 'class': 'mui-chip' },
            h(
                'span',
                null,
                text
            ),
            h('button', { type: 'button', 'class': 'mui-chip-remove', onclick: onRemove })
        );
    } else {
        chipItem = h(
            'div',
            { 'class': 'mui-chip' },
            text
        );
    }

    return chipItem;
};

var Divider = function Divider(_ref, children) {
    var type = _ref.type;


    var classType = 'mui-divider';
    var divType = void 0;

    switch (type) {
        case 'top':
            {
                classType = 'mui--divider-top';
                divType = h(
                    'div',
                    { style: { paddingTop: '16px', paddingBottom: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'bottom':
            {
                classType = 'mui--divider-bottom';
                divType = h(
                    'div',
                    { style: { paddingTop: '16px', paddingBottom: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'left':
            {
                classType = 'mui--divider-left';
                divType = h(
                    'span',
                    { style: { paddingLeft: '16px', marginRight: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'right':
            {
                classType = 'mui--divider-right';
                divType = h(
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

var Container = function Container(_ref2, children) {
    var fluid = _ref2.fluid;


    var isFluid = h(
        'div',
        { style: { paddingTop: '18px' },
            'class': 'mui-container-fluid' },
        children
    );
    var isNotFluid = h(
        'div',
        { style: { paddingTop: '18px' },
            'class': 'mui-container' },
        children
    );

    return fluid ? isFluid : isNotFluid;
};

var Panel$1 = function Panel$$1(_ref3, children) {
    var style = _ref3.style;


    return h(
        'div',
        { 'class': 'mui-panel', style: style },
        children
    );
};

var objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

var LoadingSpinner = function LoadingSpinner(_ref, children) {
    objectDestructuringEmpty(_ref);


    return h(
        'div',
        { 'class': 'mui-loading-spinner', style: { zIndex: '1000' } },
        h(
            'svg',
            { 'class': 'spinner', width: '65px', height: '65px', viewBox: '0 0 66 66', xmlns: 'http://www.w3.org/2000/svg' },
            h('circle', { 'class': 'path', fill: 'none', 'stroke-width': '6', 'stroke-linecap': 'round', cx: '33', cy: '33', r: '30' })
        )
    );
};

var mergeClass$1 = function mergeClass$$1(classes) {
    return classes.join(' ');
};

export { Button$1 as Button, PageFab, ActionCard, Form, InlineForm, TextInput, TextArea, CheckBoxInput, CheckBox, Select, Option, Chips, Chip, Divider, Container, Panel$1 as Panel, LoadingSpinner, mergeClass$1 as mergeClass };
