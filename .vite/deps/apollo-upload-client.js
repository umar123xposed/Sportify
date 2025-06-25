import {
  core_exports,
  http_exports,
  init_core,
  init_http
} from "./chunk-C5B4W33F.js";
import "./chunk-J73DCMPX.js";
import "./chunk-2NLV3Q7R.js";
import {
  __commonJS,
  __toCommonJS,
  __toESM
} from "./chunk-2GTGKKMZ.js";

// node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "node_modules/@babel/runtime/helpers/extends.js"(exports, module) {
    function _extends() {
      return module.exports = _extends = Object.assign ? Object.assign.bind() : function(n) {
        for (var e = 1; e < arguments.length; e++) {
          var t = arguments[e];
          for (var r in t)
            ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends.apply(null, arguments);
    }
    module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/extract-files/public/ReactNativeFile.js
var require_ReactNativeFile = __commonJS({
  "node_modules/extract-files/public/ReactNativeFile.js"(exports, module) {
    "use strict";
    module.exports = function ReactNativeFile(_ref) {
      var uri = _ref.uri, name = _ref.name, type = _ref.type;
      this.uri = uri;
      this.name = name;
      this.type = type;
    };
  }
});

// node_modules/extract-files/public/isExtractableFile.js
var require_isExtractableFile = __commonJS({
  "node_modules/extract-files/public/isExtractableFile.js"(exports, module) {
    "use strict";
    var ReactNativeFile = require_ReactNativeFile();
    module.exports = function isExtractableFile(value) {
      return typeof File !== "undefined" && value instanceof File || typeof Blob !== "undefined" && value instanceof Blob || value instanceof ReactNativeFile;
    };
  }
});

// node_modules/extract-files/public/extractFiles.js
var require_extractFiles = __commonJS({
  "node_modules/extract-files/public/extractFiles.js"(exports, module) {
    "use strict";
    var defaultIsExtractableFile = require_isExtractableFile();
    module.exports = function extractFiles(value, path, isExtractableFile) {
      if (path === void 0) {
        path = "";
      }
      if (isExtractableFile === void 0) {
        isExtractableFile = defaultIsExtractableFile;
      }
      var clone;
      var files = /* @__PURE__ */ new Map();
      function addFile(paths, file) {
        var storedPaths = files.get(file);
        if (storedPaths)
          storedPaths.push.apply(storedPaths, paths);
        else
          files.set(file, paths);
      }
      if (isExtractableFile(value)) {
        clone = null;
        addFile([path], value);
      } else {
        var prefix = path ? path + "." : "";
        if (typeof FileList !== "undefined" && value instanceof FileList)
          clone = Array.prototype.map.call(value, function(file, i2) {
            addFile(["" + prefix + i2], file);
            return null;
          });
        else if (Array.isArray(value))
          clone = value.map(function(child, i2) {
            var result2 = extractFiles(child, "" + prefix + i2, isExtractableFile);
            result2.files.forEach(addFile);
            return result2.clone;
          });
        else if (value && value.constructor === Object) {
          clone = {};
          for (var i in value) {
            var result = extractFiles(value[i], "" + prefix + i, isExtractableFile);
            result.files.forEach(addFile);
            clone[i] = result.clone;
          }
        } else
          clone = value;
      }
      return {
        clone,
        files
      };
    };
  }
});

// node_modules/apollo-upload-client/public/formDataAppendFile.js
var require_formDataAppendFile = __commonJS({
  "node_modules/apollo-upload-client/public/formDataAppendFile.js"(exports, module) {
    "use strict";
    module.exports = function formDataAppendFile(formData, fieldName, file) {
      formData.append(fieldName, file, file.name);
    };
  }
});

// node_modules/apollo-upload-client/public/isExtractableFile.js
var require_isExtractableFile2 = __commonJS({
  "node_modules/apollo-upload-client/public/isExtractableFile.js"(exports, module) {
    "use strict";
    module.exports = require_isExtractableFile();
  }
});

// node_modules/apollo-upload-client/public/createUploadLink.js
var require_createUploadLink = __commonJS({
  "node_modules/apollo-upload-client/public/createUploadLink.js"(exports, module) {
    "use strict";
    var _extends = require_extends();
    var _require = (init_core(), __toCommonJS(core_exports));
    var ApolloLink = _require.ApolloLink;
    var Observable = _require.Observable;
    var _require2 = (init_http(), __toCommonJS(http_exports));
    var createSignalIfSupported = _require2.createSignalIfSupported;
    var fallbackHttpConfig = _require2.fallbackHttpConfig;
    var parseAndCheckHttpResponse = _require2.parseAndCheckHttpResponse;
    var rewriteURIForGET = _require2.rewriteURIForGET;
    var selectHttpOptionsAndBody = _require2.selectHttpOptionsAndBody;
    var selectURI = _require2.selectURI;
    var serializeFetchParameter = _require2.serializeFetchParameter;
    var extractFiles = require_extractFiles();
    var formDataAppendFile = require_formDataAppendFile();
    var isExtractableFile = require_isExtractableFile2();
    module.exports = function createUploadLink(_temp) {
      var _ref = _temp === void 0 ? {} : _temp, _ref$uri = _ref.uri, fetchUri = _ref$uri === void 0 ? "/graphql" : _ref$uri, useGETForQueries = _ref.useGETForQueries, _ref$isExtractableFil = _ref.isExtractableFile, customIsExtractableFile = _ref$isExtractableFil === void 0 ? isExtractableFile : _ref$isExtractableFil, CustomFormData = _ref.FormData, _ref$formDataAppendFi = _ref.formDataAppendFile, customFormDataAppendFile = _ref$formDataAppendFi === void 0 ? formDataAppendFile : _ref$formDataAppendFi, customFetch = _ref.fetch, fetchOptions = _ref.fetchOptions, credentials = _ref.credentials, headers = _ref.headers, includeExtensions = _ref.includeExtensions;
      var linkConfig = {
        http: {
          includeExtensions
        },
        options: fetchOptions,
        credentials,
        headers
      };
      return new ApolloLink(function(operation) {
        var context = operation.getContext();
        var _context$clientAwaren = context.clientAwareness;
        _context$clientAwaren = _context$clientAwaren === void 0 ? {} : _context$clientAwaren;
        var name = _context$clientAwaren.name, version = _context$clientAwaren.version, headers2 = context.headers;
        var contextConfig = {
          http: context.http,
          options: context.fetchOptions,
          credentials: context.credentials,
          headers: _extends(
            {},
            name && {
              "apollographql-client-name": name
            },
            version && {
              "apollographql-client-version": version
            },
            headers2
          )
        };
        var _selectHttpOptionsAnd = selectHttpOptionsAndBody(
          operation,
          fallbackHttpConfig,
          linkConfig,
          contextConfig
        ), options = _selectHttpOptionsAnd.options, body = _selectHttpOptionsAnd.body;
        var _extractFiles = extractFiles(body, "", customIsExtractableFile), clone = _extractFiles.clone, files = _extractFiles.files;
        var uri = selectURI(operation, fetchUri);
        if (files.size) {
          delete options.headers["content-type"];
          var RuntimeFormData = CustomFormData || FormData;
          var form = new RuntimeFormData();
          form.append("operations", serializeFetchParameter(clone, "Payload"));
          var map = {};
          var i = 0;
          files.forEach(function(paths) {
            map[++i] = paths;
          });
          form.append("map", JSON.stringify(map));
          i = 0;
          files.forEach(function(paths, file) {
            customFormDataAppendFile(form, ++i, file);
          });
          options.body = form;
        } else {
          if (useGETForQueries && !operation.query.definitions.some(function(definition) {
            return definition.kind === "OperationDefinition" && definition.operation === "mutation";
          }))
            options.method = "GET";
          if (options.method === "GET") {
            var _rewriteURIForGET = rewriteURIForGET(uri, body), newURI = _rewriteURIForGET.newURI, parseError = _rewriteURIForGET.parseError;
            if (parseError)
              return new Observable(function(observer) {
                observer.error(parseError);
              });
            uri = newURI;
          } else
            options.body = serializeFetchParameter(clone, "Payload");
        }
        var _createSignalIfSuppor = createSignalIfSupported(), controller = _createSignalIfSuppor.controller;
        if (controller) {
          if (options.signal)
            options.signal.addEventListener("abort", function() {
              controller.abort();
            });
          options.signal = controller.signal;
        }
        var runtimeFetch = customFetch || fetch;
        return new Observable(function(observer) {
          var cleaningUp;
          runtimeFetch(uri, options).then(function(response) {
            operation.setContext({
              response
            });
            return response;
          }).then(parseAndCheckHttpResponse(operation)).then(function(result) {
            observer.next(result);
            observer.complete();
          }).catch(function(error) {
            if (!cleaningUp) {
              if (error.result && error.result.errors && error.result.data)
                observer.next(error.result);
              observer.error(error);
            }
          });
          return function() {
            cleaningUp = true;
            if (controller)
              controller.abort();
          };
        });
      });
    };
  }
});

// node_modules/apollo-upload-client/public/ReactNativeFile.js
var require_ReactNativeFile2 = __commonJS({
  "node_modules/apollo-upload-client/public/ReactNativeFile.js"(exports, module) {
    "use strict";
    module.exports = require_ReactNativeFile();
  }
});

// node_modules/apollo-upload-client/public/index.mjs
var import_createUploadLink = __toESM(require_createUploadLink(), 1);
var import_formDataAppendFile = __toESM(require_formDataAppendFile(), 1);
var import_isExtractableFile = __toESM(require_isExtractableFile2(), 1);
var import_ReactNativeFile = __toESM(require_ReactNativeFile2(), 1);
var export_ReactNativeFile = import_ReactNativeFile.default;
var export_createUploadLink = import_createUploadLink.default;
var export_formDataAppendFile = import_formDataAppendFile.default;
var export_isExtractableFile = import_isExtractableFile.default;
export {
  export_ReactNativeFile as ReactNativeFile,
  export_createUploadLink as createUploadLink,
  export_formDataAppendFile as formDataAppendFile,
  export_isExtractableFile as isExtractableFile
};
//# sourceMappingURL=apollo-upload-client.js.map
