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

require.register("@hyperapp/logger/dist/logger.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@hyperapp/logger");
  (function() {
    !function(o,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd||(o.logger=n())}(this,function(){"use strict";function o(o,n,t){console.group("%c action","color: gray; font-weight: lighter;",n.name),console.log("%c prev state","color: #9E9E9E; font-weight: bold;",o),console.log("%c data","color: #03A9F4; font-weight: bold;",n.data),console.log("%c next state","color: #4CAF50; font-weight: bold;",t),console.groupEnd()}return function(n){return n=n||{},n.log="function"==typeof n.log?n.log:o,function(o){return function(t,e,r,c){function u(o,t){var e=t?t+".":"";return Object.keys(o||{}).reduce(function(t,r){var c=e+r,f=o[r];return t[r]="function"==typeof f?function(o){return function(t,e){var r=f(o);return r="function"==typeof r?r(t,e):r,n.log(t,{name:c,data:o},r),r}}:u(f,c),t},{})}var f=u(e);return o(t,f,r,c)}}}});
//# sourceMappingURL=logger.js.map
  })();
});

require.register("@hyperapp/router/dist/router.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "@hyperapp/router");
  (function() {
    !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("hyperapp")):"function"==typeof define&&define.amd||e(t.router={},t.hyperapp)}(this,function(t,e){"use strict";function n(t,e,n,o){return{isExact:t,path:e,url:n,params:o}}function o(t){for(var e=t.length;"/"===t[--e];);return t.slice(0,e+1)}var i={state:{pathname:window.location.pathname,previous:window.location.pathname},actions:{go:function(t){history.pushState(null,"",t)},set:function(t){return t}},subscribe:function(t){function e(e){t.set({pathname:window.location.pathname,previous:e.detail?window.location.previous=e.detail:window.location.previous})}var n=function(t){return t.reduce(function(t,e){var n=history[e];return history[e]=function(t,e,o){n.call(this,t,e,o),dispatchEvent(new CustomEvent("pushstate",{detail:t}))},function(){history[e]=n,t&&t()}},null)}(["pushState","replaceState"]);return addEventListener("pushstate",e),addEventListener("popstate",e),function(){removeEventListener("pushstate",e),removeEventListener("popstate",e),n()}}};t.Link=function(t,n){var o=t.to,i=t.location||window.location;return t.href=o,t.onclick=function(e){0!==e.button||e.altKey||e.metaKey||e.ctrlKey||e.shiftKey||"_blank"===t.target||e.currentTarget.origin!==i.origin||(e.preventDefault(),o!==i.pathname&&history.pushState(i.pathname,"",o))},e.h("a",t,n)},t.Route=function(t){var e=t.location||window.location,i=function(t,e,i){if(t===e||!t)return n(t===e,t,e);var a=i&&i.exact,r=o(t).split("/"),c=o(e).split("/");if(!(r.length>c.length||a&&r.length<c.length)){var u=0,s={},p=r.length;for(e="";u<p;u++){if(":"===r[u][0])try{s[r[u].slice(1)]=c[u]=decodeURI(c[u])}catch(t){continue}else if(r[u]!==c[u])return;e+=c[u]+"/"}return n(!1,t,e.slice(0,-1),s)}}(t.path,e.pathname,{exact:!t.parent});return i&&t.render({match:i,location:e})},t.Switch=function(t,e){return e[0]},t.Redirect=function(t){var e=t.location||window.location;history.replaceState(t.from||e.pathname,"",t.to)},t.location=i});
//# sourceMappingURL=router.js.map
  })();
});

require.register("es6-promise/dist/es6-promise.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {"vertx":false}, "es6-promise");
  (function() {
    /*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map
  })();
});

require.register("hyperapp/dist/hyperapp.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "hyperapp");
  (function() {
    !function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var u=t.pop();if(u&&u.pop)for(o=u.length;o--;)t.push(u[o]);else null!=u&&!0!==u&&!1!==u&&r.push(u)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}},e.app=function(e,n,t,r){var o,u=[].map,i=r&&r.children[0]||null,l=i&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:u.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n)})}}(i),f=[],a=!0,c=p(e),s=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var u=o(e);return"function"==typeof u&&(u=u(y(n,c),r)),u&&u!==(t=y(n,c))&&!u.then&&h(c=m(n,p(t,u),c)),u}}(o,r[o]):e(n.concat(o),t[o]=p(t[o]),r[o]=p(r[o]));return r}([],c,p(n));return h(),s;function d(e){return"function"==typeof e?d(e(c,s)):null!=e?e:""}function v(){o=!o;var e=d(t);for(r&&!o&&(i=function e(n,t,r,o,u){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var i=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName),o=n.attributes;if(o){o.oncreate&&f.push(function(){o.oncreate(r)});for(var u=0;u<n.children.length;u++)r.appendChild(e(n.children[u]=d(n.children[u]),t));for(var i in o)b(r,i,o[i],null,t)}return r}(o,u);n.insertBefore(i,t),null!=r&&k(n,t,r),t=i}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in p(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var u=a?t.oncreate:t.onupdate;u&&f.push(function(){u(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var l={},c={},s=[],v=r.children,h=o.children,m=0;m<v.length;m++){s[m]=t.childNodes[m];var y=g(v[m]);null!=y&&(l[y]=[s[m],v[m]])}for(var m=0,N=0;N<h.length;){var y=g(v[m]),w=g(h[N]=d(h[N]));if(c[y])m++;else if(null==w||a)null==y&&(e(t,s[m],v[m],h[N],u),N++),m++;else{var x=l[w]||[];y===w?(e(t,x[0],x[1],h[N],u),m++):x[0]?e(t,t.insertBefore(x[0],s[m]),x[1],h[N],u):e(t,s[m],null,h[N],u),c[w]=h[N],N++}}for(;m<v.length;)null==g(v[m])&&k(t,s[m],v[m]),m++;for(var m in l)c[m]||k(t,l[m][0],l[m][1])}return t}(r,i,l,l=e)),a=!1;f.length;)f.pop()()}function h(){o||(o=!0,setTimeout(v))}function p(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function m(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?m(e.slice(1),n,t[e[0]]):n,p(t,r)):n}function y(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function g(e){return e?e.key:null}function N(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)for(var u in p(r,t)){var i=null==t||null==t[u]?"":t[u];"-"===u[0]?e[n].setProperty(u,i):e[n][u]=i}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,N):e.removeEventListener(n,N)):n in e&&"list"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}});
//# sourceMappingURL=hyperapp.js.map
  })();
});

require.register("process/browser.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "process");
  (function() {
    // shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };
  })();
});

require.register("whatwg-fetch/fetch.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "whatwg-fetch");
  (function() {
    (function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);
  })();
});
require.register("Pages/Home.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Home = undefined;

var _hyperapp = require('hyperapp');

var _Layout = require('../components/Layout/Layout.js');

var _Buttons = require('../components/Buttons/Buttons.js');

var _Cards = require('../components/Cards/Cards.js');

var _Form = require('../components/Forms/Form.js');

var _Loading = require('../components/Loading/Loading.js');

var Home = exports.Home = function Home(state, actions) {
    return function (props) {

        var modal = state.showModal ? (0, _hyperapp.h)(
            _Layout.Modal,
            null,
            (0, _hyperapp.h)(_Buttons.Button, { onClick: function onClick() {
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
        return (0, _hyperapp.h)(
            _Layout.Container,
            { fluid: false },
            (0, _hyperapp.h)(
                _Layout.Divider,
                { type: 'bottom' },
                (0, _hyperapp.h)(
                    'h1',
                    null,
                    'Important Links'
                )
            ),
            (0, _hyperapp.h)(
                'ul',
                null,
                (0, _hyperapp.h)(
                    'li',
                    null,
                    (0, _hyperapp.h)(
                        'a',
                        { href: 'https://www.muicss.com/' },
                        'CSS Library'
                    )
                ),
                (0, _hyperapp.h)(
                    'li',
                    null,
                    (0, _hyperapp.h)(
                        'a',
                        { href: 'https://github.com/firstfleetinc/hyperappComponents' },
                        'Github'
                    )
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Divider,
                { type: 'bottom' },
                (0, _hyperapp.h)(
                    'h1',
                    null,
                    'Layout Components'
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Panel,
                null,
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Container'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'A page wrapper'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'fluid | boolean'
                        )
                    )
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Divider'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'A line divider with padding, wrap component'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'type | [top, bottom, left, right]'
                        )
                    ),
                    (0, _hyperapp.h)(
                        _Layout.Divider,
                        { type: 'top' },
                        'top'
                    ),
                    (0, _hyperapp.h)(
                        _Layout.Divider,
                        { type: 'bottom' },
                        'bottom'
                    ),
                    (0, _hyperapp.h)('div', { style: { height: '16px' } }),
                    (0, _hyperapp.h)(
                        _Layout.Divider,
                        { type: 'left' },
                        'left'
                    ),
                    (0, _hyperapp.h)(
                        _Layout.Divider,
                        { type: 'right' },
                        'right'
                    )
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Panel'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'Used for making cards / raised content areas'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'style | style object'
                        )
                    ),
                    (0, _hyperapp.h)(
                        _Layout.Panel,
                        null,
                        'PANEL'
                    )
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Divider,
                { type: 'bottom' },
                (0, _hyperapp.h)(
                    'h1',
                    null,
                    'Form Components'
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Panel,
                null,
                (0, _hyperapp.h)(
                    'h3',
                    null,
                    'Form'
                ),
                (0, _hyperapp.h)(
                    'p',
                    null,
                    'Can take inputs as children'
                ),
                (0, _hyperapp.h)(
                    'h4',
                    null,
                    'Props'
                ),
                (0, _hyperapp.h)(
                    'ul',
                    null,
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'title | string'
                    ),
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'buttonText | string'
                    ),
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'onSubmit | function'
                    )
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(_Form.Form, {
                        title: 'Form',
                        buttonText: 'Button Text',
                        onSubmit: function onSubmit() {
                            console.log('submitted form');
                        } })
                ),
                (0, _hyperapp.h)(
                    'h3',
                    null,
                    'Inline Form'
                ),
                (0, _hyperapp.h)(
                    'p',
                    null,
                    'Takes an input as a child'
                ),
                (0, _hyperapp.h)(
                    'h4',
                    null,
                    'Props'
                ),
                (0, _hyperapp.h)(
                    'ul',
                    null,
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'buttonText | string'
                    ),
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'onSubmit | function'
                    )
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        _Form.InlineForm,
                        {
                            onSubmit: function onSubmit() {
                                console.log('submitted inline form');
                            },
                            buttonText: 'Button Text' },
                        (0, _hyperapp.h)(_Form.TextInput, {
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
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Text Input'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'should be usable for any html input type'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'type | any html 5 input type'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'placeholder | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'name | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'id | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'value | value for input'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'required | boolean, type effects form validation'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'label | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'labelType | fixed, floating, none'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'onChange | function'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'onKeyUp | function'
                        )
                    ),
                    (0, _hyperapp.h)(_Form.TextInput, {
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
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    {
                        type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'TextArea'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'html text area'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'placeholder | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'name | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'id | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'value | value for input'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'required | boolean, type effects form validation'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'label | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'labelType | fixed, floating, none'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'onKeyUp | function'
                        )
                    ),
                    (0, _hyperapp.h)(_Form.TextArea, {
                        placeholder: 'placeholder',
                        label: 'text-area',
                        labelType: 'fixed',
                        onKeyUp: function onKeyUp() {
                            return console.log('on key up fired');
                        } })
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Check Box / Radio Input'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'Both use the CheckBox component. You make an array of meta data for items. '
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props for CheckBox'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'items | array'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'type | checkbox || radio'
                        )
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props for items'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'type | radio for radio || checkbox for checkbox'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            ' name | string : all radios in a group should have same name'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'id | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'value | input value'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'checked | boolean'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'disabled | boolean'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'required | boolean'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'label | string'
                        )
                    ),
                    (0, _hyperapp.h)(
                        'form',
                        null,
                        (0, _hyperapp.h)(_Form.CheckBox, { type: 'checkbox', items: checkBoxItems })
                    ),
                    (0, _hyperapp.h)(
                        'form',
                        null,
                        (0, _hyperapp.h)(_Form.CheckBox, { type: 'radio', items: raidoItems })
                    )
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Select'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'Dropdown select, items are an array of meta data for items'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props for Select'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'items | array'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'type | checkbox || radio'
                        )
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props for items'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'text | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'value | value for input'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'isSelected | boolean'
                        )
                    ),
                    (0, _hyperapp.h)(_Form.Select, { options: selectOptions })
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Chips'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'Tagging element, chips is an array of meta data for chip'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props for Chips'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'chips | array'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'style | style object'
                        )
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props for chip'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'remove | boolean, controls whether they have a remove button or not'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'onRemove | function'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'text | string'
                        )
                    ),
                    (0, _hyperapp.h)(_Form.Chips, { chips: chipItems })
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Divider,
                { type: 'bottom' },
                (0, _hyperapp.h)(
                    'h1',
                    null,
                    'Buttons'
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Panel,
                null,
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'Button'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'A Button'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'type | [null, flat, raised, float]'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'color | [null, primary, accent, danger]'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'size | [null, small, large]'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'text | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'onClick | function'
                        )
                    ),
                    (0, _hyperapp.h)(_Buttons.Button, {
                        color: 'primary',
                        size: 'large',
                        text: 'Button' }),
                    (0, _hyperapp.h)(_Buttons.Button, {
                        type: 'flat',
                        color: 'primary',
                        text: 'Button flat primary' }),
                    (0, _hyperapp.h)(_Buttons.Button, {
                        type: 'raised',
                        color: 'accent',
                        text: 'Button raised accent' }),
                    (0, _hyperapp.h)(_Buttons.Button, {
                        type: 'float',
                        color: 'danger',
                        size: 'large',
                        text: '+' })
                ),
                (0, _hyperapp.h)(
                    _Layout.Divider,
                    { type: 'bottom' },
                    (0, _hyperapp.h)(
                        'h3',
                        null,
                        'PageFab'
                    ),
                    (0, _hyperapp.h)(
                        'p',
                        null,
                        'A page set floating button, sets a button in the lower right hand corner above other page content'
                    ),
                    (0, _hyperapp.h)(
                        'h4',
                        null,
                        'Props'
                    ),
                    (0, _hyperapp.h)(
                        'ul',
                        null,
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'type | [null, flat, raised, float]'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'color | [null, primary, accent, danger]'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'size | [null, small, large]'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'text | string'
                        ),
                        (0, _hyperapp.h)(
                            'li',
                            null,
                            'onClick | function'
                        )
                    ),
                    (0, _hyperapp.h)(_Buttons.PageFab, {
                        type: 'raised',
                        color: 'primary',
                        text: 'PageFab',
                        size: 'large' })
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Divider,
                { type: 'bottom' },
                (0, _hyperapp.h)(
                    'h1',
                    null,
                    'Cards'
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Panel,
                null,
                (0, _hyperapp.h)(
                    'h3',
                    null,
                    'ActionCard'
                ),
                (0, _hyperapp.h)(
                    'p',
                    null,
                    'A card that can take a row of buttons'
                ),
                (0, _hyperapp.h)(
                    'h4',
                    null,
                    'Props'
                ),
                (0, _hyperapp.h)(
                    'ul',
                    null,
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'title | string'
                    ),
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'content | string'
                    ),
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'secondaryText | string'
                    ),
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'accentText | string'
                    ),
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'buttons | array of button metatdata'
                    )
                ),
                (0, _hyperapp.h)(_Cards.ActionCard, {
                    buttons: actionCardButtons,
                    title: 'Action Card',
                    content: 'This is card content',
                    accentText: 'accenting',
                    secondaryText: 'secondary' })
            ),
            (0, _hyperapp.h)(
                _Layout.Divider,
                { type: 'bottom' },
                (0, _hyperapp.h)(
                    'h1',
                    null,
                    'Modal'
                )
            ),
            (0, _hyperapp.h)(
                _Layout.Panel,
                null,
                (0, _hyperapp.h)(
                    'h3',
                    null,
                    'Modal'
                ),
                (0, _hyperapp.h)(
                    'p',
                    null,
                    'Renders children content in a modal'
                ),
                (0, _hyperapp.h)(
                    'h4',
                    null,
                    'Props'
                ),
                (0, _hyperapp.h)(
                    'ul',
                    null,
                    (0, _hyperapp.h)(
                        'li',
                        null,
                        'children | string'
                    )
                ),
                (0, _hyperapp.h)(_Buttons.Button, {
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
});

;require.register("actions.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _router = require("@hyperapp/router");

var actions = exports.actions = {
  location: _router.location.actions,
  showModal: function showModal(value) {
    return function (state, actions) {
      return { showModal: true };
    };
  },
  hideModal: function hideModal(value) {
    return function (state, actions) {
      return { showModal: false };
    };
  }
};
});

;require.register("components/Buttons/Buttons.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PageFab = exports.Button = undefined;

var _hyperapp = require('hyperapp');

var _cssUtils = require('../Util/cssUtils.js');

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

;require.register("components/Cards/Cards.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionCard = undefined;

var _Layout = require('../Layout/Layout.js');

var _Buttons = require('../Buttons/Buttons.js');

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
        return (0, _hyperapp.h)(_Buttons.Button, item);
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

;require.register("components/Forms/Form.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chip = exports.Chips = exports.Option = exports.Select = exports.CheckBox = exports.CheckBoxInput = exports.TextArea = exports.TextInput = exports.InlineForm = exports.Form = undefined;

var _hyperapp = require('hyperapp');

var _Buttons = require('../Buttons/Buttons.js');

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
        (0, _hyperapp.h)(_Buttons.Button, { color: 'primary', text: buttonText })
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
            (0, _hyperapp.h)(_Buttons.Button, { color: 'primary', text: buttonText, onClick: onSubmit })
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
        value = _ref8.value,
        isSelected = _ref8.isSelected;

    var retVal = "";
    if (isSelected) {
        retVal = (0, _hyperapp.h)(
            'option',
            { value: value, selected: true },
            text
        );
    } else {
        retVal = (0, _hyperapp.h)(
            'option',
            { value: value },
            text
        );
    }
    return retVal;
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

;require.register("components/Layout/Layout.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Modal = exports.Panel = exports.Container = exports.Divider = undefined;

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

var Modal = exports.Modal = function Modal(_ref4, children) {
    var style = _ref4.style;


    return (0, _hyperapp.h)(
        'div',
        { 'class': 'customModal', id: 'modal' },
        (0, _hyperapp.h)(
            'div',
            { 'class': 'modal-content' },
            children
        )
    );
};
});

;require.register("components/Loading/Loading.js", function(exports, require, module) {
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

;require.register("components/Util/cssUtils.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mergeClass = exports.mergeClass = function mergeClass(classes) {
    return classes.join(' ');
};
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _hyperapp = require("hyperapp");

var _logger = require("@hyperapp/logger");

var _logger2 = _interopRequireDefault(_logger);

var _actions = require("./actions");

var _state = require("./state");

var _view = require("./view");

var _router = require("@hyperapp/router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function (event) {

  var main = (0, _logger2.default)({
    log: function log(prevState, action, nextState) {
      console.log(prevState);
      console.log(action);
      console.log(nextState);
    }
  })(_hyperapp.app)(_state.state, _actions.actions, _view.view, document.getElementById('main'));

  var unsubscribe = _router.location.subscribe(main.location);
});
});

require.register("logic.js", function(exports, require, module) {
"use strict";
});

;require.register("state.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.state = undefined;

var _router = require("@hyperapp/router");

var state = exports.state = {
    location: _router.location.state,
    showModal: false
};
});

;require.register("view.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.view = undefined;

require('whatwg-fetch');

var _hyperapp = require('hyperapp');

var _actions = require('./actions');

var _router = require('@hyperapp/router');

var _Home = require('./Pages/Home.js');

require('es6-promise').polyfill();
var view = exports.view = function view(state, actions) {

  return (0, _hyperapp.h)(
    'div',
    null,
    (0, _hyperapp.h)(_router.Route, { path: '/', render: (0, _Home.Home)(state, actions) })
  );
};
});

;require.alias("@hyperapp/logger/dist/logger.js", "@hyperapp/logger");
require.alias("@hyperapp/router/dist/router.js", "@hyperapp/router");
require.alias("es6-promise/dist/es6-promise.js", "es6-promise");
require.alias("hyperapp/dist/hyperapp.js", "hyperapp");
require.alias("process/browser.js", "process");
require.alias("whatwg-fetch/fetch.js", "whatwg-fetch");require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

'use strict';

/* jshint ignore:start */
(function () {
  var WebSocket = window.WebSocket || window.MozWebSocket;
  var br = window.brunch = window.brunch || {};
  var ar = br['auto-reload'] = br['auto-reload'] || {};
  if (!WebSocket || ar.disabled) return;
  if (window._ar) return;
  window._ar = true;

  var cacheBuster = function cacheBuster(url) {
    var date = Math.round(Date.now() / 1000).toString();
    url = url.replace(/(\&|\\?)cacheBuster=\d*/, '');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'cacheBuster=' + date;
  };

  var browser = navigator.userAgent.toLowerCase();
  var forceRepaint = ar.forceRepaint || browser.indexOf('chrome') > -1;

  var reloaders = {
    page: function page() {
      window.location.reload(true);
    },

    stylesheet: function stylesheet() {
      [].slice.call(document.querySelectorAll('link[rel=stylesheet]')).filter(function (link) {
        var val = link.getAttribute('data-autoreload');
        return link.href && val != 'false';
      }).forEach(function (link) {
        link.href = cacheBuster(link.href);
      });

      // Hack to force page repaint after 25ms.
      if (forceRepaint) setTimeout(function () {
        document.body.offsetHeight;
      }, 25);
    },

    javascript: function javascript() {
      var scripts = [].slice.call(document.querySelectorAll('script'));
      var textScripts = scripts.map(function (script) {
        return script.text;
      }).filter(function (text) {
        return text.length > 0;
      });
      var srcScripts = scripts.filter(function (script) {
        return script.src;
      });

      var loaded = 0;
      var all = srcScripts.length;
      var onLoad = function onLoad() {
        loaded = loaded + 1;
        if (loaded === all) {
          textScripts.forEach(function (script) {
            eval(script);
          });
        }
      };

      srcScripts.forEach(function (script) {
        var src = script.src;
        script.remove();
        var newScript = document.createElement('script');
        newScript.src = cacheBuster(src);
        newScript.async = true;
        newScript.onload = onLoad;
        document.head.appendChild(newScript);
      });
    }
  };
  var port = ar.port || 9485;
  var host = br.server || window.location.hostname || 'localhost';

  var connect = function connect() {
    var connection = new WebSocket('ws://' + host + ':' + port);
    connection.onmessage = function (event) {
      if (ar.disabled) return;
      var message = event.data;
      var reloader = reloaders[message] || reloaders.page;
      reloader();
    };
    connection.onerror = function () {
      if (connection.readyState) connection.close();
    };
    connection.onclose = function () {
      window.setTimeout(connect, 1000);
    };
  };
  connect();
})();
/* jshint ignore:end */
;
//# sourceMappingURL=app.js.map