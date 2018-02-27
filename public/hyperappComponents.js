(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("Button.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PageFab = exports.Button = undefined;

var _hyperapp = require('hyperapp');

var _cssUtils = require('cssUtils');

var Button = exports.Button = function Button(_ref, children) {
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

    baseClass = (0, _cssUtils.mergeClass)([baseClass, classType, classColor, classSize, 'btn']);

    return (0, _hyperapp.h)(
        'button',
        { 'class': baseClass, onclick: onClick },
        text
    );
};

var PageFab = exports.PageFab = function PageFab(_ref2, children) {
    var color = _ref2.color,
        size = _ref2.size,
        text = _ref2.text,
        onClick = _ref2.onClick,
        type = _ref2.type;


    return (0, _hyperapp.h)(
        'div',
        { 'class': 'mui-footer-fab', style: { zIndex: '1000' } },
        (0, _hyperapp.h)(Button, { type: type, color: color, size: size, text: text, onClick: onClick })
    );
};
});

;require.register("Cards.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionCard = undefined;

var _Layout = require('Layout');

var _Button = require('Button');

var _hyperapp = require('hyperapp');

var ActionCard = exports.ActionCard = function ActionCard(_ref, children) {
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

    var contentStyle = {};

    var footerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    };

    var secondaryTextStyle = {
        color: '#757575'
    };

    var myButtons = buttons.map(function (item) {
        return (0, _hyperapp.h)(_Button.Button, item);
    });

    return (0, _hyperapp.h)(
        _Layout.Panel,
        null,
        (0, _hyperapp.h)(
            'div',
            { style: titleStyle },
            (0, _hyperapp.h)(
                'h2',
                null,
                title
            ),
            (0, _hyperapp.h)(
                'span',
                { 'class': 'mui--text-dark-secondary', style: { textAlign: 'right' } },
                accentText
            )
        ),
        (0, _hyperapp.h)(
            'div',
            { 'class': 'mui--text-dark-secondary' },
            (0, _hyperapp.h)(
                'p',
                null,
                content
            )
        ),
        (0, _hyperapp.h)(
            'div',
            { style: footerStyle },
            (0, _hyperapp.h)(
                'div',
                null,
                myButtons
            ),
            (0, _hyperapp.h)(
                'p',
                { 'class': 'mui--text-accent' },
                secondaryText
            )
        )
    );
};
});

;require.register("Form.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chip = exports.Chips = exports.Option = exports.Select = exports.CheckBox = exports.CheckBoxInput = exports.TextArea = exports.TextInput = exports.InlineForm = exports.Form = undefined;

var _hyperapp = require('hyperapp');

var _Button = require('Button');

var Form = exports.Form = function Form(_ref, children) {
    var title = _ref.title,
        buttonText = _ref.buttonText,
        onSubmit = _ref.onSubmit;


    return (0, _hyperapp.h)(
        'form',
        { 'class': 'mui-form', onsubmit: function onsubmit(e) {
                e.preventDefault();onSubmit();
            } },
        (0, _hyperapp.h)(
            'legend',
            null,
            title
        ),
        children,
        (0, _hyperapp.h)(_Button.Button, { color: 'primary', text: buttonText })
    );
};

var InlineForm = exports.InlineForm = function InlineForm(_ref2, children) {
    var onSubmit = _ref2.onSubmit,
        buttonText = _ref2.buttonText;


    return (0, _hyperapp.h)(
        'div',
        { 'class': 'mui-form--inline' },
        children,
        (0, _hyperapp.h)(
            'span',
            { style: { paddingLeft: '16px' } },
            (0, _hyperapp.h)(_Button.Button, { color: 'primary', text: buttonText, onClick: onSubmit })
        )
    );
};

var TextInput = exports.TextInput = function TextInput(_ref3, children) {
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
    var input = (0, _hyperapp.h)('input', {
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
                inputItem = (0, _hyperapp.h)(
                    'div',
                    { 'class': 'mui-textfield' },
                    input,
                    (0, _hyperapp.h)(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        case 'floating':
            {
                inputItem = (0, _hyperapp.h)(
                    'div',
                    { 'class': 'mui-textfield mui-textfield--float-label' },
                    input,
                    (0, _hyperapp.h)(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        default:
            {
                inputItem = (0, _hyperapp.h)(
                    'div',
                    { 'class': 'mui-textfield' },
                    input
                );
            }
    }

    return inputItem;
};

var TextArea = exports.TextArea = function TextArea(_ref4, children) {
    var placeholder = _ref4.placeholder,
        name = _ref4.name,
        id = _ref4.id,
        value = _ref4.value,
        required = _ref4.required,
        label = _ref4.label,
        labelType = _ref4.labelType,
        onKeyUp = _ref4.onKeyUp;


    var inputItem = void 0;
    var input = (0, _hyperapp.h)('textarea', {
        placeholder: placeholder,
        name: name,
        id: id,
        value: value,
        required: required,
        onkeyup: onKeyUp });

    switch (labelType) {
        case 'fixed':
            {
                inputItem = (0, _hyperapp.h)(
                    'div',
                    { 'class': 'mui-textfield' },
                    input,
                    (0, _hyperapp.h)(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        case 'floating':
            {
                inputItem = (0, _hyperapp.h)(
                    'div',
                    { 'class': 'mui-textfield mui-textfield--float-label' },
                    input,
                    (0, _hyperapp.h)(
                        'label',
                        null,
                        label
                    )
                );
                break;
            }
        default:
            {
                inputItem = (0, _hyperapp.h)(
                    'div',
                    { 'class': 'mui-textfield' },
                    input
                );
            }
    }

    return inputItem;
};

var CheckBoxInput = exports.CheckBoxInput = function CheckBoxInput(_ref5, children) {
    var type = _ref5.type,
        name = _ref5.name,
        id = _ref5.id,
        value = _ref5.value,
        checked = _ref5.checked,
        disabled = _ref5.disabled,
        required = _ref5.required,
        label = _ref5.label;


    return (0, _hyperapp.h)(
        'label',
        null,
        (0, _hyperapp.h)(
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

var CheckBox = exports.CheckBox = function CheckBox(_ref6) {
    var type = _ref6.type,
        items = _ref6.items;

    var checkBoxItems = items.map(function (item) {
        return (0, _hyperapp.h)(CheckBoxInput, item);
    });

    var boxType = void 0;
    if (type === 'checkbox') {
        boxType = (0, _hyperapp.h)(
            'div',
            { 'class': 'mui-checkbox' },
            checkBoxItems
        );
    } else if (type === 'radio') {
        boxType = (0, _hyperapp.h)(
            'div',
            { 'class': 'mui-radio' },
            checkBoxItems
        );
    }

    return boxType;
};

var Select = exports.Select = function Select(_ref7, children) {
    var options = _ref7.options,
        required = _ref7.required,
        label = _ref7.label,
        onChange = _ref7.onChange;


    var optionList = options.map(function (item) {
        return (0, _hyperapp.h)(Option, item);
    });

    return (0, _hyperapp.h)(
        'div',
        { 'class': 'mui-select' },
        (0, _hyperapp.h)(
            'select',
            {
                required: required,
                onchange: onChange },
            optionList
        ),
        (0, _hyperapp.h)(
            'label',
            null,
            label
        )
    );
};

var Option = exports.Option = function Option(_ref8) {
    var text = _ref8.text,
        value = _ref8.value;


    return (0, _hyperapp.h)(
        'option',
        { value: value },
        text
    );
};

var Chips = exports.Chips = function Chips(_ref9, children) {
    var chips = _ref9.chips,
        style = _ref9.style;


    var chipItems = chips.map(function (item) {
        return (0, _hyperapp.h)(Chip, item);
    });

    return (0, _hyperapp.h)(
        'div',
        { 'class': 'mui-chips', style: style },
        chipItems
    );
};

var Chip = exports.Chip = function Chip(_ref10, children) {
    var remove = _ref10.remove,
        onRemove = _ref10.onRemove,
        text = _ref10.text;


    var chipItem = void 0;

    if (remove) {
        chipItem = (0, _hyperapp.h)(
            'div',
            { 'class': 'mui-chip' },
            (0, _hyperapp.h)(
                'span',
                null,
                text
            ),
            (0, _hyperapp.h)('button', { type: 'button', 'class': 'mui-chip-remove', onclick: onRemove })
        );
    } else {
        chipItem = (0, _hyperapp.h)(
            'div',
            { 'class': 'mui-chip' },
            text
        );
    }

    return chipItem;
};
});

;require.register("Layout.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Panel = exports.Container = exports.Divider = undefined;

var _hyperapp = require('hyperapp');

var Divider = exports.Divider = function Divider(_ref, children) {
    var type = _ref.type;


    var classType = 'mui-divider';
    var divType = void 0;

    switch (type) {
        case 'top':
            {
                classType = 'mui--divider-top';
                divType = (0, _hyperapp.h)(
                    'div',
                    { style: { paddingTop: '16px', paddingBottom: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'bottom':
            {
                classType = 'mui--divider-bottom';
                divType = (0, _hyperapp.h)(
                    'div',
                    { style: { paddingTop: '16px', paddingBottom: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'left':
            {
                classType = 'mui--divider-left';
                divType = (0, _hyperapp.h)(
                    'span',
                    { style: { paddingLeft: '16px', marginRight: '16px' }, 'class': classType },
                    children
                );
                break;
            }
        case 'right':
            {
                classType = 'mui--divider-right';
                divType = (0, _hyperapp.h)(
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

var Container = exports.Container = function Container(_ref2, children) {
    var fluid = _ref2.fluid;


    var isFluid = (0, _hyperapp.h)(
        'div',
        { style: { paddingTop: '18px' },
            'class': 'mui-container-fluid' },
        children
    );
    var isNotFluid = (0, _hyperapp.h)(
        'div',
        { style: { paddingTop: '18px' },
            'class': 'mui-container' },
        children
    );

    return fluid ? isFluid : isNotFluid;
};

var Panel = exports.Panel = function Panel(_ref3, children) {
    var style = _ref3.style;


    return (0, _hyperapp.h)(
        'div',
        { 'class': 'mui-panel', style: style },
        children
    );
};
});

;require.register("Loading.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingSpinner = undefined;

var _hyperapp = require('hyperapp');

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var LoadingSpinner = exports.LoadingSpinner = function LoadingSpinner(_ref, children) {
    _objectDestructuringEmpty(_ref);

    return (0, _hyperapp.h)(
        'div',
        { 'class': 'mui-loading-spinner', style: { zIndex: '1000' } },
        (0, _hyperapp.h)(
            'svg',
            { 'class': 'spinner', width: '65px', height: '65px', viewBox: '0 0 66 66', xmlns: 'http://www.w3.org/2000/svg' },
            (0, _hyperapp.h)('circle', { 'class': 'path', fill: 'none', 'stroke-width': '6', 'stroke-linecap': 'round', cx: '33', cy: '33', r: '30' })
        )
    );
};
});

;require.register("cssUtils.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mergeClass = exports.mergeClass = function mergeClass(classes) {
    return classes.join(' ');
};
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=hyperappComponents.js.map