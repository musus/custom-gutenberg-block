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
throw new Error("Cannot find module \"classnames\"");
/**
 * External Dependencies
 */


/**
 * WordPress Dependencies
 */
var __ = wp.i18n.__;
var addFilter = wp.hooks.addFilter;
var Fragment = wp.element.Fragment;
var InspectorAdvancedControls = wp.editor.InspectorAdvancedControls;
var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
var ToggleControl = wp.components.ToggleControl;

//restrict to specific block names

var allowedBlocks = ['core/paragraph', 'core/heading'];

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {

	//check if object exists for old Gutenberg version compatibility
	//add allowedBlocks restriction
	if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {

		settings.attributes = Object.assign(settings.attributes, {
			visibleOnMobile: {
				type: 'boolean',
				default: true
			}
		});
	}

	return settings;
}

/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
var withAdvancedControls = createHigherOrderComponent(function (BlockEdit) {
	return function (props) {
		var name = props.name,
		    attributes = props.attributes,
		    setAttributes = props.setAttributes,
		    isSelected = props.isSelected;
		var visibleOnMobile = attributes.visibleOnMobile;


		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(BlockEdit, props),
			'//add allowedBlocks restriction',
			isSelected && allowedBlocks.includes(name) && wp.element.createElement(
				InspectorAdvancedControls,
				null,
				wp.element.createElement(ToggleControl, {
					label: __('Mobile Devices Visibity'),
					checked: !!visibleOnMobile,
					onChange: function onChange() {
						return setAttributes({ visibleOnMobile: !visibleOnMobile });
					},
					help: !!visibleOnMobile ? __('Showing on mobile devices.') : __('Hidden on mobile devices.')
				})
			)
		);
	};
}, 'withAdvancedControls');

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function applyExtraClass(extraProps, blockType, attributes) {
	var visibleOnMobile = attributes.visibleOnMobile;

	//check if attribute exists for old Gutenberg version compatibility
	//add class only when visibleOnMobile = false
	//add allowedBlocks restriction

	if (typeof visibleOnMobile !== 'undefined' && !visibleOnMobile && allowedBlocks.includes(blockType.name)) {
		extraProps.className = __WEBPACK_IMPORTED_MODULE_0_classnames___default()(extraProps.className, 'mobile-hidden');
	}

	return extraProps;
}

//add filters

addFilter('blocks.registerBlockType', 'editorskit/custom-attributes', addAttributes);

addFilter('editor.BlockEdit', 'editorskit/custom-advanced-control', withAdvancedControls);

addFilter('blocks.getSaveContent.extraProps', 'editorskit/applyExtraClass', applyExtraClass);

/***/ })
/******/ ]);