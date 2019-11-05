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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBlockControl", function() { return addBlockControl; });
/* harmony export (immutable) */ __webpack_exports__["addAttribute"] = addAttribute;
/* harmony export (immutable) */ __webpack_exports__["addSaveProps"] = addSaveProps;
var _lodash = lodash,
    assign = _lodash.assign;
var __ = wp.i18n.__;
var Fragment = wp.element.Fragment;
var addFilter = wp.hooks.addFilter;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    RadioControl = _wp$components.RadioControl;
var InspectorControls = window.wp.editor.InspectorControls;
var createHigherOrderComponent = wp.compose.createHigherOrderComponent;


var isValidBlockType = function isValidBlockType(name) {
  var validBlockTypes = ['core/paragraph', // 段落
  'core/list', // リスト
  'core/image' // イメージ
  ];
  return validBlockTypes.includes(name);
};

var addBlockControl = createHigherOrderComponent(function (BlockEdit) {
  var selectOption = '';

  return function (props) {
    // isValidBlockType で指定したブロックが選択されたら表示
    if (isValidBlockType(props.name) && props.isSelected) {
      // すでにオプション選択されていたら
      if (props.attributes.marginSetting) {
        selectOption = props.attributes.marginSetting;
      }
      return wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(BlockEdit, props),
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: '\u30DE\u30FC\u30B8\u30F3\u8A2D\u5B9A', initialOpen: false, className: 'margin-controle' },
            wp.element.createElement(RadioControl, {
              selected: selectOption,
              options: [{ label: 'なし', value: '' }, { label: '小', value: 'mb-sm' }, { label: '中', value: 'mb-md' }, { label: '大', value: 'mb-lg' }],
              onChange: function onChange(changeOption) {
                var newClassName = changeOption;
                // 高度な設定で入力している場合は追加する
                if (props.attributes.className) {
                  // 付与されているclassを取り出す
                  var inputClassName = props.attributes.className;
                  // スペース区切りを配列に
                  inputClassName = inputClassName.split(' ');
                  // 選択されていたオプションの値を削除
                  var filterClassName = inputClassName.filter(function (name) {
                    return name !== selectOption;
                  });
                  // 新しく選択したオプションを追加
                  filterClassName.push(changeOption);
                  // 配列を文字列に
                  newClassName = filterClassName.join(' ');
                }

                selectOption = changeOption;
                props.setAttributes({
                  className: newClassName,
                  marginSetting: changeOption
                });
              }
            })
          )
        )
      );
    }
    return wp.element.createElement(BlockEdit, props);
  };
}, 'addMyCustomBlockControls');
addFilter('editor.BlockEdit', 'myblock/block-control', addBlockControl);

function addAttribute(settings) {
  if (isValidBlockType(settings.name)) {
    settings.attributes = assign(settings.attributes, {
      marginSetting: {
        type: 'string'
      }
    });
  }
  return settings;
}
addFilter('blocks.registerBlockType', 'myblock/add-attr', addAttribute);

function addSaveProps(extraProps, blockType, attributes) {
  if (isValidBlockType(blockType.name)) {
    // なしを選択した場合はmarginSetting削除
    if (attributes.marginSetting === '') {
      delete attributes.marginSetting;
    }
  }
  return extraProps;
}
addFilter('blocks.getSaveContent.extraProps', 'myblock/add-props', addSaveProps);

/***/ })
/******/ ]);