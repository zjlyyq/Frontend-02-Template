/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./framwork.js":
/*!*********************!*\
  !*** ./framwork.js ***!
  \*********************/
/*! exports provided: creatElement, Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"creatElement\", function() { return creatElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction creatElement(type, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  console.log(arguments);\n  var dom;\n  if (typeof type === 'string') dom = new ElementWrapper(type);else dom = new type();\n\n  for (var attr in attributes) {\n    dom.setAttribute(attr, attributes[attr]);\n  }\n\n  if (children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (typeof child === 'string') {\n          var textNode = new TextWrapper(child);\n          textNode.mountTo(dom);\n        } else {\n          child.mountTo(dom);\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  }\n\n  return dom;\n}\nvar Component = /*#__PURE__*/function () {\n  function Component() {\n    _classCallCheck(this, Component);\n\n    console.log('Component constructor called'); // this.root = this.render()\n  }\n\n  _createClass(Component, [{\n    key: \"render\",\n    value: function render() {\n      return document.createElement('div');\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(attr, val) {\n      this.root.setAttribute(attr, val);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(node) {\n      this.root.appendChild(node);\n    }\n  }]);\n\n  return Component;\n}();\n\nvar TextWrapper = /*#__PURE__*/function (_Component) {\n  _inherits(TextWrapper, _Component);\n\n  var _super = _createSuper(TextWrapper);\n\n  function TextWrapper(content) {\n    var _this;\n\n    _classCallCheck(this, TextWrapper);\n\n    console.log('TextWrapper constructor called');\n    _this = _super.call(this); // 将当前this赋值给父类的this\n\n    _this.root = document.createTextNode(content);\n    return _this;\n  }\n\n  return TextWrapper;\n}(Component);\n\nvar ElementWrapper = /*#__PURE__*/function (_Component2) {\n  _inherits(ElementWrapper, _Component2);\n\n  var _super2 = _createSuper(ElementWrapper);\n\n  function ElementWrapper(type) {\n    var _this2;\n\n    _classCallCheck(this, ElementWrapper);\n\n    console.log('ElementWrapper constructor called');\n    _this2 = _super2.call(this); // why\n\n    _this2.root = document.createElement(type);\n    return _this2;\n  }\n\n  return ElementWrapper;\n}(Component);\n\n//# sourceURL=webpack:///./framwork.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _framwork_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framwork.js */ \"./framwork.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar Div = /*#__PURE__*/function (_Component) {\n  _inherits(Div, _Component);\n\n  var _super = _createSuper(Div);\n\n  function Div() {\n    var _this;\n\n    _classCallCheck(this, Div);\n\n    _this = _super.call(this);\n    _this.root = document.createElement('div');\n    return _this;\n  }\n\n  _createClass(Div, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(attr, val) {\n      this.root.setAttribute(attr, val);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(node) {\n      this.root.appendChild(this.render());\n    }\n  }]);\n\n  return Div;\n}(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar Carousel = /*#__PURE__*/function (_Component2) {\n  _inherits(Carousel, _Component2);\n\n  var _super2 = _createSuper(Carousel);\n\n  function Carousel() {\n    var _this2;\n\n    _classCallCheck(this, Carousel);\n\n    _this2 = _super2.call(this);\n    _this2.attributes = Object.create(null);\n    return _this2;\n  }\n\n  _createClass(Carousel, [{\n    key: \"render\",\n    value: function render() {\n      var _this3 = this;\n\n      this.root = document.createElement('div');\n      this.root.classList.add('carousel');\n      this.attributes.src.forEach(function (url) {\n        var img = document.createElement('div');\n        img.style.backgroundImage = \"url('\".concat(url, \"')\");\n\n        _this3.root.appendChild(img);\n      });\n      return this.root;\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.attributes[name] = value;\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      console.log(this.attributes.src);\n      parent.appendChild(this.render());\n    }\n  }]);\n\n  return Carousel;\n}(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar catImgs = ['https://static001.geekbang.org/resource/image/d8/32/d846f329e073d0f7c8143da32a3ca832.jpg', 'https://static001.geekbang.org/resource/image/b4/26/b4ff997b68f16f882c255aef8c833626.jpg', 'https://static001.geekbang.org/resource/image/51/c0/5196d9fb7fcbbfb43450624045ae81c0.jpg', 'https://static001.geekbang.org/resource/image/97/bf/97fbdb46b8ad6550dcdb4aa4a062f0bf.jpg'];\nvar a = Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(Div, {\n  \"class\": \"a\",\n  id: \"app\"\n}, Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(\"p\", null, \"p1\"), Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(\"p\", null, \"p2\"), Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(Div, {\n  style: \"color: green;\"\n}, Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(\"strong\", null, \"DIV\"), \"DIV\"), Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(\"p\", {\n  style: \"color: red;\"\n}, \"p3 \", Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(\"span\", null, \"span\"), \" \"), Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(\"img\", {\n  src: \"https://static001.geekbang.org/resource/image/51/c0/5196d9fb7fcbbfb43450624045ae81c0.jpg\"\n}));\nvar carousel = Object(_framwork_js__WEBPACK_IMPORTED_MODULE_0__[\"creatElement\"])(Carousel, {\n  src: catImgs\n});\nconsole.log(a); // document.body.appendChild(a);\n// a.mountTo(document.body);\n\ncarousel.mountTo(document.body);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });