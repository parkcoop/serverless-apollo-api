(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/graphql/dataSources/character.js":
/*!**********************************************!*\
  !*** ./src/graphql/dataSources/character.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n // such kind of memoization is not good for production\n// use it like this only for demo purposes,\n// normally it is better to have something\n// like Redis here\n\nconst cache = {};\n\nconst extractId = url => {\n  const found = url.match(/(\\d+)\\/$/);\n\n  if (found.length) {\n    return found[1];\n  }\n\n  return null;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (async ids => {\n  if (!ids || !ids.length) {\n    return [];\n  }\n\n  const result = [];\n  const missing = [];\n  ids.forEach(id => {\n    // check what we already have in the cache\n    if (cache[id]) {\n      result.push(cache[id]);\n    } else {\n      missing.push(id);\n    }\n  });\n\n  if (missing.length) {\n    // still having cache miss? request then!\n    (await Promise.all(missing.map(id => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`https://swapi.dev/api/people/${id}/`).catch(() => null)))).forEach(res => {\n      // process the result as it does not\n      // have an appropriate format\n      if (res) {\n        const data = res.data;\n        const id = extractId(data.url);\n\n        if (id) {\n          const character = {\n            id,\n            fullName: data.name,\n            movies: data.films.map(filmURL => extractId(filmURL))\n          }; // put to the cache\n\n          cache[character.id] = character; // and to the result\n\n          result.push(character);\n        }\n      }\n    });\n  }\n\n  return result.filter(x => !!x);\n});\n\n//# sourceURL=webpack:///./src/graphql/dataSources/character.js?");

/***/ }),

/***/ "./src/graphql/dataSources/movie.js":
/*!******************************************!*\
  !*** ./src/graphql/dataSources/movie.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst movies = [{\n  id: '1',\n  title: 'A New Hope',\n  characters: [1, 2, 3, 4, 5]\n}, {\n  id: '2',\n  title: 'The Empire Strikes Back',\n  characters: [1, 2, 3]\n}, {\n  id: '3',\n  title: 'Return of the Jedi',\n  characters: [30, 31, 45]\n}];\n/* harmony default export */ __webpack_exports__[\"default\"] = (ids => {\n  if (ids === null) {\n    return movies;\n  }\n\n  return movies.filter(movie => ids.indexOf(movie.id) >= 0);\n});\n\n//# sourceURL=webpack:///./src/graphql/dataSources/movie.js?");

/***/ }),

/***/ "./src/graphql/resolvers/character.js":
/*!********************************************!*\
  !*** ./src/graphql/resolvers/character.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Character: {\n    movies: async (source, args, {\n      dataSources\n    }, state) => {\n      return dataSources.movieSource(source.movies);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/graphql/resolvers/character.js?");

/***/ }),

/***/ "./src/graphql/resolvers/index.js":
/*!****************************************!*\
  !*** ./src/graphql/resolvers/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! merge-graphql-schemas */ \"merge-graphql-schemas\");\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _movie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movie */ \"./src/graphql/resolvers/movie.js\");\n/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./character */ \"./src/graphql/resolvers/character.js\");\n\n\n\nconst resolvers = [_movie__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _character__WEBPACK_IMPORTED_MODULE_2__[\"default\"]];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__[\"mergeResolvers\"])(resolvers));\n\n//# sourceURL=webpack:///./src/graphql/resolvers/index.js?");

/***/ }),

/***/ "./src/graphql/resolvers/movie.js":
/*!****************************************!*\
  !*** ./src/graphql/resolvers/movie.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Query: {\n    movies: async (source, args, {\n      dataSources\n    }, state) => {\n      return dataSources.movieSource(null);\n    },\n    movie: async (source, args, {\n      dataSources\n    }, state) => {\n      // by using \"args\" argument we can get access\n      // to query arguments\n      const {\n        id\n      } = args;\n      const result = dataSources.movieSource([id]);\n\n      if (result && result[0]) {\n        return result[0];\n      }\n\n      return null;\n    }\n  },\n  Movie: {\n    characters: async (source, args, {\n      dataSources\n    }) => {\n      console.dir('Executing Movie.characters resolver');\n      return dataSources.characterSource(source.characters);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/graphql/resolvers/movie.js?");

/***/ }),

/***/ "./src/graphql/types/character.graphql":
/*!*********************************************!*\
  !*** ./src/graphql/types/character.graphql ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Character\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fullName\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"movies\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Movie\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Query\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"character\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Character\"}}},\"directives\":[]}]}],\"loc\":{\"start\":0,\"end\":132}};\n    doc.loc.source = {\"body\":\"type Character {\\n    id: String!\\n    fullName: String!\\n    movies: [Movie]!\\n}\\n\\ntype Query {\\n    character(id: String!): Character!\\n}\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n\n\n//# sourceURL=webpack:///./src/graphql/types/character.graphql?");

/***/ }),

/***/ "./src/graphql/types/index.js":
/*!************************************!*\
  !*** ./src/graphql/types/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! merge-graphql-schemas */ \"merge-graphql-schemas\");\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _movie_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movie.graphql */ \"./src/graphql/types/movie.graphql\");\n/* harmony import */ var _movie_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_movie_graphql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _character_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./character.graphql */ \"./src/graphql/types/character.graphql\");\n/* harmony import */ var _character_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_character_graphql__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__[\"mergeTypes\"])([_movie_graphql__WEBPACK_IMPORTED_MODULE_1___default.a, _character_graphql__WEBPACK_IMPORTED_MODULE_2___default.a], {\n  all: true\n}));\n\n//# sourceURL=webpack:///./src/graphql/types/index.js?");

/***/ }),

/***/ "./src/graphql/types/movie.graphql":
/*!*****************************************!*\
  !*** ./src/graphql/types/movie.graphql ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Movie\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"characters\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Character\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Query\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"movies\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Movie\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"movie\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Movie\"}}},\"directives\":[]}]}],\"loc\":{\"start\":0,\"end\":135}};\n    doc.loc.source = {\"body\":\"type Movie {\\n  id: String!\\n  title: String!\\n  characters: [Character]!\\n}\\n\\ntype Query {\\n  movies: [Movie]\\n  movie(id: String!): Movie!\\n}\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n\n\n//# sourceURL=webpack:///./src/graphql/types/movie.graphql?");

/***/ }),

/***/ "./src/handler.js":
/*!************************!*\
  !*** ./src/handler.js ***!
  \************************/
/*! exports provided: main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"main\", function() { return _index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./src/handler.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql/resolvers */ \"./src/graphql/resolvers/index.js\");\n/* harmony import */ var _graphql_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphql/types */ \"./src/graphql/types/index.js\");\n/* harmony import */ var _graphql_dataSources_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphql/dataSources/character */ \"./src/graphql/dataSources/character.js\");\n/* harmony import */ var _graphql_dataSources_movie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphql/dataSources/movie */ \"./src/graphql/dataSources/movie.js\");\n\n\n\n\n // creating the server\n\nconst server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"ApolloServer\"]({\n  // passing types and resolvers to the server\n  typeDefs: _graphql_types__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  resolvers: _graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  // initial context state, will be available in resolvers\n  context: () => ({}),\n  // an object that goes to the \"context\" argument\n  // when executing resolvers\n  dataSources: () => {\n    return {\n      characterSource: _graphql_dataSources_character__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n      movieSource: _graphql_dataSources_movie__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    };\n  }\n});\n\nconst handler = (event, context, callback) => {\n  const handler = server.createHandler(); // tell AWS lambda we do not want to wait for NodeJS event loop\n  // to be empty in order to send the response\n\n  context.callbackWaitsForEmptyEventLoop = false; // process the request\n\n  return handler(event, context, callback);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-lambda\");\n\n//# sourceURL=webpack:///external_%22apollo-server-lambda%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "merge-graphql-schemas":
/*!****************************************!*\
  !*** external "merge-graphql-schemas" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"merge-graphql-schemas\");\n\n//# sourceURL=webpack:///external_%22merge-graphql-schemas%22?");

/***/ })

/******/ })));