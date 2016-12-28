/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(1);


const app = new __WEBPACK_IMPORTED_MODULE_0__app__["a" /* default */]({
  target: document.querySelector('#root')
});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_header__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_categories__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_counter__ = __webpack_require__(3);




var template = function () {
	return {
		data: () => ({
			count: 0
		}),

		methods: {
			count(payload) {
				// count can not go below 0
				const count = Math.max(0, this.get('count') + payload);
				this.set({ count });
			},

			resetCount() {
				this.set({ count: 0 });
			}
		},

		components: {
			Header: __WEBPACK_IMPORTED_MODULE_0__components_header__["a" /* default */],
			Counter: __WEBPACK_IMPORTED_MODULE_2__components_counter__["a" /* default */],
			Categories: __WEBPACK_IMPORTED_MODULE_1__components_categories__["a" /* default */]
		}
	};
}();

let addedCss = false;
function addCss() {
	var style = createElement('style');
	style.textContent = "\n  .app[svelte-831926070], [svelte-831926070] .app {\n    height: 100vh;\n    width: 100vw;\n    display: flex;\n    flex-direction: column;\n  }\n";
	appendNode(style, document.head);

	addedCss = true;
}

function renderMainFragment(root, component) {
	var div = createElement('div');
	div.setAttribute('svelte-831926070', '');
	div.className = "app";

	var header_initialData = {
		dude: "walt"
	};
	var header = new template.components.Header({
		target: div,
		_root: component._root || component,
		data: header_initialData
	});

	appendNode(createText("\n\n  "), div);

	var counter_initialData = {};

	if ('count' in root) counter_initialData.count = root.count;
	var counter = new template.components.Counter({
		target: div,
		_root: component._root || component,
		data: counter_initialData
	});

	var counter_updating = false;

	component._bindings.push(function () {
		counter.observe('count', function (value) {
			counter_updating = true;
			component.set({ count: value });
			counter_updating = false;
		});
	});

	counter.on('count', function (event) {
		component.count(event.payload);
	});

	counter.on('resetCount', function (event) {
		component.resetCount();
	});

	appendNode(createText("\n\n  "), div);

	var categories = new template.components.Categories({
		target: div,
		_root: component._root || component
	});

	return {
		mount: function (target, anchor) {
			insertNode(div, target, anchor);
		},

		update: function (changed, root) {
			if (!counter_updating && 'count' in changed) {
				counter.set({ count: root.count });
			}
		},

		teardown: function (detach) {
			header.teardown(false);
			counter.teardown(false);
			categories.teardown(false);

			if (detach) {
				detachNode(div);
			}
		}
	};
}

function SvelteComponent(options) {
	options = options || {};

	this._state = Object.assign(template.data(), options.data);

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root;
	this._yield = options._yield;

	if (!addedCss) addCss();
	this._renderHooks = [];

	this._bindings = [];
	this._fragment = renderMainFragment(this._state, this);
	if (options.target) this._fragment.mount(options.target, null);
	while (this._bindings.length) this._bindings.pop()();

	while (this._renderHooks.length) {
		var hook = this._renderHooks.pop();
		hook.fn.call(hook.context);
	}
}

SvelteComponent.prototype = template.methods;

SvelteComponent.prototype.get = function get(key) {
	return key ? this._state[key] : this._state;
};

SvelteComponent.prototype.fire = function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
};

SvelteComponent.prototype.observe = function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.pre : this._observers.post;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
};

SvelteComponent.prototype.on = function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
};

SvelteComponent.prototype.set = function set(newState) {
	var oldState = this._state;
	this._state = Object.assign({}, oldState, newState);

	dispatchObservers(this, this._observers.pre, newState, oldState);
	if (this._fragment) this._fragment.update(newState, this._state);
	dispatchObservers(this, this._observers.post, newState, oldState);

	while (this._bindings.length) this._bindings.pop()();

	while (this._renderHooks.length) {
		var hook = this._renderHooks.pop();
		hook.fn.call(hook.context);
	}
};

SvelteComponent.prototype.teardown = function teardown(detach) {
	this.fire('teardown');

	this._fragment.teardown(detach !== false);
	this._fragment = null;

	this._state = {};
};

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (newValue === oldValue && typeof newValue !== 'object') continue;

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function createElement(name) {
	return document.createElement(name);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

/* harmony default export */ exports["a"] = SvelteComponent;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var template = function () {
	return {
		data: () => ({
			category: 'none',
			categories: ['animal', 'vegetable', 'mineral']
		}),

		methods: {
			select(category) {
				const categories = this.get('categories');

				if (categories.indexOf(category) > -1) {
					this.set({ category });
				}
			}
		}
	};
}();

function renderMainFragment(root, component) {
	var p = createElement('p');

	appendNode(createText("Select a category:"), p);
	var text1 = createText("\n\n");

	var ul = createElement('ul');

	var eachBlock_anchor = createComment("#each categories");
	appendNode(eachBlock_anchor, ul);
	var eachBlock_value = root.categories;
	var eachBlock_iterations = [];

	for (var i = 0; i < eachBlock_value.length; i += 1) {
		eachBlock_iterations[i] = renderEachBlock(root, eachBlock_value, eachBlock_value[i], i, component);
		eachBlock_iterations[i].mount(eachBlock_anchor.parentNode, eachBlock_anchor);
	}

	var text2 = createText("\n\n");

	var p1 = createElement('p');

	appendNode(createText("selected Category: "), p1);
	var text4 = createText(root.category);
	appendNode(text4, p1);

	return {
		mount: function (target, anchor) {
			insertNode(p, target, anchor);
			insertNode(text1, target, anchor);
			insertNode(ul, target, anchor);
			insertNode(text2, target, anchor);
			insertNode(p1, target, anchor);
		},

		update: function (changed, root) {
			var eachBlock_value = root.categories;

			for (var i = 0; i < eachBlock_value.length; i += 1) {
				if (!eachBlock_iterations[i]) {
					eachBlock_iterations[i] = renderEachBlock(root, eachBlock_value, eachBlock_value[i], i, component);
					eachBlock_iterations[i].mount(eachBlock_anchor.parentNode, eachBlock_anchor);
				} else {
					eachBlock_iterations[i].update(changed, root, eachBlock_value, eachBlock_value[i], i);
				}
			}

			for (var i = eachBlock_value.length; i < eachBlock_iterations.length; i += 1) {
				eachBlock_iterations[i].teardown(true);
			}

			eachBlock_iterations.length = eachBlock_value.length;

			text4.data = root.category;
		},

		teardown: function (detach) {
			for (var i = 0; i < eachBlock_iterations.length; i += 1) {
				eachBlock_iterations[i].teardown(false);
			}

			if (detach) {
				detachNode(p);
				detachNode(text1);
				detachNode(ul);
				detachNode(text2);
				detachNode(p1);
			}
		}
	};
}

function renderEachBlock(root, eachBlock_value, category, category__index, component) {
	var li = createElement('li');

	var button = createElement('button');

	function clickHandler(event) {
		var eachBlock_value = this.__svelte.eachBlock_value,
		    category__index = this.__svelte.category__index,
		    category = eachBlock_value[category__index];

		component.select(category);
	}

	button.addEventListener('click', clickHandler, false);

	button.__svelte = {
		eachBlock_value: eachBlock_value,
		category__index: category__index
	};

	appendNode(button, li);
	appendNode(createText("select "), button);
	var text1 = createText(category);
	appendNode(text1, button);

	return {
		mount: function (target, anchor) {
			insertNode(li, target, anchor);
		},

		update: function (changed, root, eachBlock_value, category, category__index) {
			var category = eachBlock_value[category__index];

			button.__svelte.eachBlock_value = eachBlock_value;
			button.__svelte.category__index = category__index;

			text1.data = category;
		},

		teardown: function (detach) {
			button.removeEventListener('click', clickHandler, false);

			if (detach) {
				detachNode(li);
			}
		}
	};
}

function SvelteComponent(options) {
	options = options || {};

	this._state = Object.assign(template.data(), options.data);

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root;
	this._yield = options._yield;

	this._fragment = renderMainFragment(this._state, this);
	if (options.target) this._fragment.mount(options.target, null);
}

SvelteComponent.prototype = template.methods;

SvelteComponent.prototype.get = function get(key) {
	return key ? this._state[key] : this._state;
};

SvelteComponent.prototype.fire = function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
};

SvelteComponent.prototype.observe = function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.pre : this._observers.post;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
};

SvelteComponent.prototype.on = function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
};

SvelteComponent.prototype.set = function set(newState) {
	var oldState = this._state;
	this._state = Object.assign({}, oldState, newState);

	dispatchObservers(this, this._observers.pre, newState, oldState);
	if (this._fragment) this._fragment.update(newState, this._state);
	dispatchObservers(this, this._observers.post, newState, oldState);
};

SvelteComponent.prototype.teardown = function teardown(detach) {
	this.fire('teardown');

	this._fragment.teardown(detach !== false);
	this._fragment = null;

	this._state = {};
};

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (newValue === oldValue && typeof newValue !== 'object') continue;

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function createElement(name) {
	return document.createElement(name);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment(data) {
	return document.createComment(data);
}

/* harmony default export */ exports["a"] = SvelteComponent;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
let addedCss = false;
function addCss() {
	var style = createElement('style');
	style.textContent = "\n  .counter[svelte-1205425083], [svelte-1205425083] .counter {\n    display: flex;\n    flex-direction: column;\n  }\n";
	appendNode(style, document.head);

	addedCss = true;
}

function renderMainFragment(root, component) {
	var div = createElement('div');
	div.setAttribute('svelte-1205425083', '');
	div.className = "counter";

	var p = createElement('p');
	p.setAttribute('svelte-1205425083', '');

	appendNode(p, div);
	appendNode(createText("Count: "), p);
	var text1 = createText(root.count);
	appendNode(text1, p);
	appendNode(createText("\n  "), div);

	var p1 = createElement('p');
	p1.setAttribute('svelte-1205425083', '');

	appendNode(p1, div);

	var button = createElement('button');
	button.setAttribute('svelte-1205425083', '');

	function clickHandler(event) {
		component.fire("count", { payload: 1 });
	}

	button.addEventListener('click', clickHandler, false);

	appendNode(button, p1);
	appendNode(createText("+1"), button);
	appendNode(createText("\n    "), p1);

	var button1 = createElement('button');
	button1.setAttribute('svelte-1205425083', '');

	function clickHandler1(event) {
		component.fire("count", { payload: -1 });
	}

	button1.addEventListener('click', clickHandler1, false);

	appendNode(button1, p1);
	appendNode(createText("-1"), button1);
	appendNode(createText("\n\n  "), div);

	var p2 = createElement('p');
	p2.setAttribute('svelte-1205425083', '');

	appendNode(p2, div);

	var button2 = createElement('button');
	button2.setAttribute('svelte-1205425083', '');
	button2.id = "reset-counter";

	function clickHandler2(event) {
		component.fire("resetCount");
	}

	button2.addEventListener('click', clickHandler2, false);

	appendNode(button2, p2);
	appendNode(createText("Reset Counter"), button2);

	return {
		mount: function (target, anchor) {
			insertNode(div, target, anchor);
		},

		update: function (changed, root) {
			text1.data = root.count;
		},

		teardown: function (detach) {
			button.removeEventListener('click', clickHandler, false);
			button1.removeEventListener('click', clickHandler1, false);
			button2.removeEventListener('click', clickHandler2, false);

			if (detach) {
				detachNode(div);
			}
		}
	};
}

function SvelteComponent(options) {
	options = options || {};

	this._state = options.data || {};

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root;
	this._yield = options._yield;

	if (!addedCss) addCss();

	this._fragment = renderMainFragment(this._state, this);
	if (options.target) this._fragment.mount(options.target, null);
}

SvelteComponent.prototype.get = function get(key) {
	return key ? this._state[key] : this._state;
};

SvelteComponent.prototype.fire = function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
};

SvelteComponent.prototype.observe = function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.pre : this._observers.post;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
};

SvelteComponent.prototype.on = function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
};

SvelteComponent.prototype.set = function set(newState) {
	var oldState = this._state;
	this._state = Object.assign({}, oldState, newState);

	dispatchObservers(this, this._observers.pre, newState, oldState);
	if (this._fragment) this._fragment.update(newState, this._state);
	dispatchObservers(this, this._observers.post, newState, oldState);
};

SvelteComponent.prototype.teardown = function teardown(detach) {
	this.fire('teardown');

	this._fragment.teardown(detach !== false);
	this._fragment = null;

	this._state = {};
};

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (newValue === oldValue && typeof newValue !== 'object') continue;

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function createElement(name) {
	return document.createElement(name);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

/* harmony default export */ exports["a"] = SvelteComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_menu_html__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(7);



function applyComputations(state, newState, oldState) {
	if ('dude' in newState && typeof state.dude === 'object' || state.dude !== oldState.dude) {
		state.salutation = newState.salutation = template.computed.salutation(state.dude);
	}
}

var template = function () {
	return {
		data() {
			return {
				dude: 'Unknown',
				count: 0
			};
		},

		computed: {
			salutation: dude => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* hello */])(dude)
		},

		components: {
			Menu: __WEBPACK_IMPORTED_MODULE_0__menu_menu_html__["a" /* default */]
		}
	};
}();

function renderMainFragment(root, component) {
	var h1 = createElement('h1');

	appendNode(createText("Logo"), h1);
	var text1 = createText("\n\n");

	var h3 = createElement('h3');

	var text2 = createText(root.salutation);
	appendNode(text2, h3);
	var text3 = createText("\n\n");

	var menu = new template.components.Menu({
		target: null,
		_root: component._root || component
	});

	return {
		mount: function (target, anchor) {
			insertNode(h1, target, anchor);
			insertNode(text1, target, anchor);
			insertNode(h3, target, anchor);
			insertNode(text3, target, anchor);
			menu._fragment.mount(target, anchor);
		},

		update: function (changed, root) {
			text2.data = root.salutation;
		},

		teardown: function (detach) {
			menu.teardown(detach);

			if (detach) {
				detachNode(h1);
				detachNode(text1);
				detachNode(h3);
				detachNode(text3);
			}
		}
	};
}

function SvelteComponent(options) {
	options = options || {};

	this._state = Object.assign(template.data(), options.data);
	applyComputations(this._state, this._state, {});

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root;
	this._yield = options._yield;

	this._renderHooks = [];

	this._fragment = renderMainFragment(this._state, this);
	if (options.target) this._fragment.mount(options.target, null);

	while (this._renderHooks.length) {
		var hook = this._renderHooks.pop();
		hook.fn.call(hook.context);
	}
}

SvelteComponent.prototype.get = function get(key) {
	return key ? this._state[key] : this._state;
};

SvelteComponent.prototype.fire = function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
};

SvelteComponent.prototype.observe = function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.pre : this._observers.post;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
};

SvelteComponent.prototype.on = function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
};

SvelteComponent.prototype.set = function set(newState) {
	var oldState = this._state;
	this._state = Object.assign({}, oldState, newState);
	applyComputations(this._state, newState, oldState);

	dispatchObservers(this, this._observers.pre, newState, oldState);
	if (this._fragment) this._fragment.update(newState, this._state);
	dispatchObservers(this, this._observers.post, newState, oldState);

	while (this._renderHooks.length) {
		var hook = this._renderHooks.pop();
		hook.fn.call(hook.context);
	}
};

SvelteComponent.prototype.teardown = function teardown(detach) {
	this.fire('teardown');

	this._fragment.teardown(detach !== false);
	this._fragment = null;

	this._state = {};
};

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (newValue === oldValue && typeof newValue !== 'object') continue;

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function createElement(name) {
	return document.createElement(name);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

/* harmony default export */ exports["a"] = SvelteComponent;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function renderMainFragment(root, component) {
	var li = createElement('li');

	var a = createElement('a');

	function clickHandler(event) {
		component.fire("navigate", { event });
	}

	a.addEventListener('click', clickHandler, false);

	a.href = root.href;

	appendNode(a, li);
	var text = createText(root.text);
	appendNode(text, a);

	return {
		mount: function (target, anchor) {
			insertNode(li, target, anchor);
		},

		update: function (changed, root) {
			a.href = root.href;

			text.data = root.text;
		},

		teardown: function (detach) {
			a.removeEventListener('click', clickHandler, false);

			if (detach) {
				detachNode(li);
			}
		}
	};
}

function SvelteComponent(options) {
	options = options || {};

	this._state = options.data || {};

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root;
	this._yield = options._yield;

	this._fragment = renderMainFragment(this._state, this);
	if (options.target) this._fragment.mount(options.target, null);
}

SvelteComponent.prototype.get = function get(key) {
	return key ? this._state[key] : this._state;
};

SvelteComponent.prototype.fire = function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
};

SvelteComponent.prototype.observe = function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.pre : this._observers.post;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
};

SvelteComponent.prototype.on = function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
};

SvelteComponent.prototype.set = function set(newState) {
	var oldState = this._state;
	this._state = Object.assign({}, oldState, newState);

	dispatchObservers(this, this._observers.pre, newState, oldState);
	if (this._fragment) this._fragment.update(newState, this._state);
	dispatchObservers(this, this._observers.post, newState, oldState);
};

SvelteComponent.prototype.teardown = function teardown(detach) {
	this.fire('teardown');

	this._fragment.teardown(detach !== false);
	this._fragment = null;

	this._state = {};
};

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (newValue === oldValue && typeof newValue !== 'object') continue;

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function createElement(name) {
	return document.createElement(name);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

/* harmony default export */ exports["a"] = SvelteComponent;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link__ = __webpack_require__(5);


var template = function () {
	return {
		methods: {
			navigate(event) {
				console.log(event);
				event.preventDefault();

				return false;
			}
		},
		components: {
			Link: __WEBPACK_IMPORTED_MODULE_0__link__["a" /* default */]
		}
	};
}();

let addedCss = false;
function addCss() {
	var style = createElement('style');
	style.textContent = "\n  .menu[svelte-3906408552], [svelte-3906408552] .menu {\n    list-style: none;\n    display: flex;\n  }\n";
	appendNode(style, document.head);

	addedCss = true;
}

function renderMainFragment(root, component) {
	var ul = createElement('ul');
	ul.setAttribute('svelte-3906408552', '');
	ul.className = "menu";

	var link_initialData = {
		href: "/",
		text: "meds"
	};
	var link = new template.components.Link({
		target: ul,
		_root: component._root || component,
		data: link_initialData
	});

	link.on('navigate', function (event) {
		component.navigate(event);
	});

	appendNode(createText("\n  "), ul);

	var link1_initialData = {
		href: "/add-med",
		text: "add med"
	};
	var link1 = new template.components.Link({
		target: ul,
		_root: component._root || component,
		data: link1_initialData
	});

	link1.on('navigate', function (event) {
		component.navigate(event);
	});

	return {
		mount: function (target, anchor) {
			insertNode(ul, target, anchor);
		},

		update: noop,

		teardown: function (detach) {
			link.teardown(false);
			link1.teardown(false);

			if (detach) {
				detachNode(ul);
			}
		}
	};
}

function SvelteComponent(options) {
	options = options || {};

	this._state = options.data || {};

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root;
	this._yield = options._yield;

	if (!addedCss) addCss();
	this._renderHooks = [];

	this._fragment = renderMainFragment(this._state, this);
	if (options.target) this._fragment.mount(options.target, null);

	while (this._renderHooks.length) {
		var hook = this._renderHooks.pop();
		hook.fn.call(hook.context);
	}
}

SvelteComponent.prototype = template.methods;

SvelteComponent.prototype.get = function get(key) {
	return key ? this._state[key] : this._state;
};

SvelteComponent.prototype.fire = function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
};

SvelteComponent.prototype.observe = function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.pre : this._observers.post;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
};

SvelteComponent.prototype.on = function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
};

SvelteComponent.prototype.set = function set(newState) {
	var oldState = this._state;
	this._state = Object.assign({}, oldState, newState);

	dispatchObservers(this, this._observers.pre, newState, oldState);
	if (this._fragment) this._fragment.update(newState, this._state);
	dispatchObservers(this, this._observers.post, newState, oldState);

	while (this._renderHooks.length) {
		var hook = this._renderHooks.pop();
		hook.fn.call(hook.context);
	}
};

SvelteComponent.prototype.teardown = function teardown(detach) {
	this.fire('teardown');

	this._fragment.teardown(detach !== false);
	this._fragment = null;

	this._state = {};
};

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (newValue === oldValue && typeof newValue !== 'object') continue;

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function createElement(name) {
	return document.createElement(name);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

function noop() {}

/* harmony default export */ exports["a"] = SvelteComponent;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

const hello = name => `Hello ${ name }`;
/* harmony export (immutable) */ exports["a"] = hello;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDg2NjNiOThiYzAwZDEwZDYxYWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jYXRlZ29yaWVzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY291bnRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lbnUvbGluay5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21lbnUvbWVudS5odG1sIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImFwcCIsInRhcmdldCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhlbGxvIiwibmFtZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDOURBOztBQUVBLE1BQU1BLE1BQU0sSUFBSSxxREFBSixDQUFRO0FBQ2xCQyxVQUFRQyxTQUFTQyxhQUFULENBQXVCLE9BQXZCO0FBRFUsQ0FBUixDQUFaLEM7Ozs7Ozs7Ozs7Ozs7OzJC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QUNHLFlBQU0sT0FBRTtBQUNQLFlBQUksSUFBTztBQUNiLFVBQWlCOztBQUV0QixXQUFZO0FBRWY7QUFQUTtBQVFDO0FBSWQ7QUFKZ0I7QUFUQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVBZLFNBQU87Ozs7Ozs7Ozs7Ozs7Ozs7WUFDUCxTQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0Q3QixNQUFNQyxRQUNWQyxJQUFELElBQ0csVUFBUUEsSUFBSyxHQUZYLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9yeSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb3J5IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDg2NjNiOThiYzAwZDEwZDYxYWMiLCJpbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKHtcbiAgdGFyZ2V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpLFxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIjxkaXYgY2xhc3M9J2FwcCc+XG4gIDxIZWFkZXIgZHVkZT0nd2FsdCcgLz5cblxuICA8Q291bnRlclxuICAgIGJpbmQ6Y291bnRcbiAgICBvbjpjb3VudD0nY291bnQoIGV2ZW50LnBheWxvYWQgKSdcbiAgICBvbjpyZXNldENvdW50PSdyZXNldENvdW50KCknXG4gIC8+XG5cbiAgPENhdGVnb3JpZXMgLz5cbjwvZGl2PlxuXG48c3R5bGU+XG4gIC5hcHAge1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyJ1xuICBpbXBvcnQgQ2F0ZWdvcmllcyBmcm9tICcuL2NvbXBvbmVudHMvY2F0ZWdvcmllcydcbiAgaW1wb3J0IENvdW50ZXIgZnJvbSAnLi9jb21wb25lbnRzL2NvdW50ZXInXG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6XG4gICAgICAoKSA9PiAoe1xuICAgICAgICBjb3VudDogMCxcbiAgICAgIH0pLFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgY291bnQocGF5bG9hZCkge1xuICAgICAgICAvLyBjb3VudCBjYW4gbm90IGdvIGJlbG93IDBcbiAgICAgICAgY29uc3QgY291bnQgPSBNYXRoLm1heCgwLCB0aGlzLmdldCgnY291bnQnKSArIHBheWxvYWQpXG4gICAgICAgIHRoaXMuc2V0KHsgY291bnQgfSlcbiAgICAgIH0sXG5cbiAgICAgIHJlc2V0Q291bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0KHsgY291bnQ6IDAgfSlcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgIEhlYWRlcixcbiAgICAgIENvdW50ZXIsXG4gICAgICBDYXRlZ29yaWVzLFxuICAgIH0sXG4gIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC5odG1sIiwiPHA+U2VsZWN0IGEgY2F0ZWdvcnk6PC9wPlxuXG48dWw+XG57eyNlYWNoIGNhdGVnb3JpZXMgYXMgY2F0ZWdvcnl9fVxuICA8bGk+XG4gICAgPGJ1dHRvbiBvbjpjbGljaz0nc2VsZWN0KGNhdGVnb3J5KSc+XG4gICAgICBzZWxlY3Qge3sgY2F0ZWdvcnkgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9saT5cbnt7L2VhY2h9fVxuPC91bD5cblxuPHA+XG4gIHNlbGVjdGVkIENhdGVnb3J5OiB7eyBjYXRlZ29yeSB9fVxuPC9wPlxuXG48c2NyaXB0PlxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTpcbiAgICAgICgpID0+ICh7XG4gICAgICAgIGNhdGVnb3J5OiAnbm9uZScsXG4gICAgICAgIGNhdGVnb3JpZXM6IFtcbiAgICAgICAgICAnYW5pbWFsJyxcbiAgICAgICAgICAndmVnZXRhYmxlJyxcbiAgICAgICAgICAnbWluZXJhbCcsXG4gICAgICAgIF0sXG4gICAgICB9KSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHNlbGVjdChjYXRlZ29yeSkge1xuICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gdGhpcy5nZXQoJ2NhdGVnb3JpZXMnKVxuXG4gICAgICAgIGlmIChjYXRlZ29yaWVzLmluZGV4T2YoY2F0ZWdvcnkpID4gLTEpIHtcbiAgICAgICAgICB0aGlzLnNldCh7IGNhdGVnb3J5IH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvY2F0ZWdvcmllcy5odG1sIiwiPGRpdiBjbGFzcz0nY291bnRlcic+XG4gIDxwPkNvdW50OiB7e2NvdW50fX08L3A+XG4gIDxwPlxuICAgIDxidXR0b24gb246Y2xpY2s9J2ZpcmUoXCJjb3VudFwiLCB7IHBheWxvYWQ6IDEgfSknPisxPC9idXR0b24+XG4gICAgPGJ1dHRvbiBvbjpjbGljaz0nZmlyZShcImNvdW50XCIsIHsgcGF5bG9hZDogLTEgfSknPi0xPC9idXR0b24+XG4gIDwvcD5cblxuICA8cD5cbiAgICA8YnV0dG9uIGlkPVwicmVzZXQtY291bnRlclwiIG9uOmNsaWNrPSdmaXJlKFwicmVzZXRDb3VudFwiKSc+UmVzZXQgQ291bnRlcjwvYnV0dG9uPlxuICA8L3A+XG48L2Rpdj5cblxuPHN0eWxlPlxuICAuY291bnRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvY291bnRlci5odG1sIiwiPGgxPkxvZ288L2gxPlxuXG48aDM+e3sgc2FsdXRhdGlvbiB9fTwvaDM+XG5cbjxNZW51IC8+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCBNZW51IGZyb20gJy4vbWVudS9tZW51Lmh0bWwnXG5cbiAgaW1wb3J0IHsgaGVsbG8gfSBmcm9tICcuLi9oZWxwZXJzJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZHVkZTogJ1Vua25vd24nLFxuICAgICAgICBjb3VudDogMFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuICAgICAgc2FsdXRhdGlvbjpcbiAgICAgICAgZHVkZSA9PlxuICAgICAgICAgIGhlbGxvKGR1ZGUpLFxuICAgIH0sXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICBNZW51LFxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9oZWFkZXIuaHRtbCIsIjxsaT5cbiAgPGFcbiAgICBvbjpjbGljaz0nZmlyZShcIm5hdmlnYXRlXCIsIHsgZXZlbnQgfSknXG4gICAgaHJlZj0ne3sgaHJlZiB9fSdcbiAgPlxuICAgIHt7IHRleHQgfX1cbiAgPC9hPlxuPC9saT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL21lbnUvbGluay5odG1sIiwiPHVsIGNsYXNzPSdtZW51Jz5cbiAgPExpbmsgb246bmF2aWdhdGU9J25hdmlnYXRlKGV2ZW50KScgaHJlZj0nLycgdGV4dD0nbWVkcycgLz5cbiAgPExpbmsgb246bmF2aWdhdGU9J25hdmlnYXRlKGV2ZW50KScgaHJlZj0nL2FkZC1tZWQnIHRleHQ9J2FkZCBtZWQnIC8+XG48L3VsPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgTGluayBmcm9tICcuL2xpbmsnXG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgIG5hdmlnYXRlKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICBMaW5rLFxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+XG5cblxuPHN0eWxlPlxuICAubWVudSB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbWVudS9tZW51Lmh0bWwiLCJcbmV4cG9ydCBjb25zdCBoZWxsbyA9XG4gIChuYW1lKSA9PlxuICAgIGBIZWxsbyAke25hbWV9YFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMuanMiXSwic291cmNlUm9vdCI6IiJ9