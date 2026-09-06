/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styles/globals.scss */ \"./styles/globals.scss\");\n/* harmony import */ var styles_globals_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    // https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting\n    //determines if the user has a set theme\n    function detectColorScheme() {\n        let theme = \"light\"; //default to light\n        //local storage is used to override OS theme settings\n        if (localStorage.getItem(\"theme\")) {\n            if (localStorage.getItem(\"theme\") == \"dark\") {\n                theme = \"dark\";\n            }\n        } else if (!window.matchMedia) {\n            //matchMedia method not supported\n            return false;\n        } else if (window.matchMedia(\"(prefers-color-scheme: dark)\").matches) {\n            //OS theme setting detected as dark\n            theme = \"dark\";\n        }\n        //dark theme preferred, set document with a `data-theme` attribute\n        document.documentElement.setAttribute(\"data-theme\", theme);\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        detectColorScheme();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/workspace/pages/_app.tsx\",\n        lineNumber: 32,\n        columnNumber: 10\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE2QjtBQUVLO0FBRWxDLFNBQVNDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDL0MsZ0dBQWdHO0lBQ2hHLHdDQUF3QztJQUN4QyxTQUFTQztRQUNQLElBQUlDLFFBQVEsU0FBUyxrQkFBa0I7UUFFdkMscURBQXFEO1FBQ3JELElBQUlDLGFBQWFDLE9BQU8sQ0FBQyxVQUFVO1lBQ2pDLElBQUlELGFBQWFDLE9BQU8sQ0FBQyxZQUFZLFFBQVE7Z0JBQzNDRixRQUFRO1lBQ1Y7UUFDRixPQUFPLElBQUksQ0FBQ0csT0FBT0MsVUFBVSxFQUFFO1lBQzdCLGlDQUFpQztZQUNqQyxPQUFPO1FBQ1QsT0FBTyxJQUFJRCxPQUFPQyxVQUFVLENBQUMsZ0NBQWdDQyxPQUFPLEVBQUU7WUFDcEUsbUNBQW1DO1lBQ25DTCxRQUFRO1FBQ1Y7UUFFQSxrRUFBa0U7UUFFbEVNLFNBQVNDLGVBQWUsQ0FBQ0MsWUFBWSxDQUFDLGNBQWNSO0lBQ3REO0lBQ0FMLGdEQUFTQSxDQUFDO1FBQ1JJO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQU8sOERBQUNGO1FBQVcsR0FBR0MsU0FBUzs7Ozs7O0FBQ2pDO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZXJkaXVtLXdlYnNpdGUvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInN0eWxlcy9nbG9iYWxzLnNjc3NcIjtcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MzAwMTMyL2hvdy10by1vdmVycmlkZS1jc3MtcHJlZmVycy1jb2xvci1zY2hlbWUtc2V0dGluZ1xuICAvL2RldGVybWluZXMgaWYgdGhlIHVzZXIgaGFzIGEgc2V0IHRoZW1lXG4gIGZ1bmN0aW9uIGRldGVjdENvbG9yU2NoZW1lKCkge1xuICAgIGxldCB0aGVtZSA9IFwibGlnaHRcIjsgLy9kZWZhdWx0IHRvIGxpZ2h0XG5cbiAgICAvL2xvY2FsIHN0b3JhZ2UgaXMgdXNlZCB0byBvdmVycmlkZSBPUyB0aGVtZSBzZXR0aW5nc1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRoZW1lXCIpKSB7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0aGVtZVwiKSA9PSBcImRhcmtcIikge1xuICAgICAgICB0aGVtZSA9IFwiZGFya1wiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXdpbmRvdy5tYXRjaE1lZGlhKSB7XG4gICAgICAvL21hdGNoTWVkaWEgbWV0aG9kIG5vdCBzdXBwb3J0ZWRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzKSB7XG4gICAgICAvL09TIHRoZW1lIHNldHRpbmcgZGV0ZWN0ZWQgYXMgZGFya1xuICAgICAgdGhlbWUgPSBcImRhcmtcIjtcbiAgICB9XG5cbiAgICAvL2RhcmsgdGhlbWUgcHJlZmVycmVkLCBzZXQgZG9jdW1lbnQgd2l0aCBhIGBkYXRhLXRoZW1lYCBhdHRyaWJ1dGVcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRoZW1lXCIsIHRoZW1lKTtcbiAgfVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRldGVjdENvbG9yU2NoZW1lKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJkZXRlY3RDb2xvclNjaGVtZSIsInRoZW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.scss":
/*!*****************************!*\
  !*** ./styles/globals.scss ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();