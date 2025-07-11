import {
  __assign,
  __extends,
  __spreadArray,
  init_tslib_es6
} from "./chunk-2NLV3Q7R.js";
import {
  __esm
} from "./chunk-2GTGKKMZ.js";

// node_modules/ts-invariant/lib/invariant.js
function invariant(condition, message) {
  if (!condition) {
    throw new InvariantError(message);
  }
}
function wrapConsoleMethod(name) {
  return function() {
    if (verbosityLevels.indexOf(name) >= verbosityLevel) {
      var method = console[name] || console.log;
      return method.apply(console, arguments);
    }
  };
}
function setVerbosity(level) {
  var old = verbosityLevels[verbosityLevel];
  verbosityLevel = Math.max(0, verbosityLevels.indexOf(level));
  return old;
}
var genericMessage, _a, setPrototypeOf, InvariantError, verbosityLevels, verbosityLevel;
var init_invariant = __esm({
  "node_modules/ts-invariant/lib/invariant.js"() {
    init_tslib_es6();
    genericMessage = "Invariant Violation";
    _a = Object.setPrototypeOf;
    setPrototypeOf = _a === void 0 ? function(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    } : _a;
    InvariantError = /** @class */
    function(_super) {
      __extends(InvariantError2, _super);
      function InvariantError2(message) {
        if (message === void 0) {
          message = genericMessage;
        }
        var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError2.prototype);
        return _this;
      }
      return InvariantError2;
    }(Error);
    verbosityLevels = ["debug", "log", "warn", "error", "silent"];
    verbosityLevel = verbosityLevels.indexOf("log");
    (function(invariant5) {
      invariant5.debug = wrapConsoleMethod("debug");
      invariant5.log = wrapConsoleMethod("log");
      invariant5.warn = wrapConsoleMethod("warn");
      invariant5.error = wrapConsoleMethod("error");
    })(invariant || (invariant = {}));
  }
});

// node_modules/@apollo/client/version.js
var version;
var init_version = __esm({
  "node_modules/@apollo/client/version.js"() {
    version = "3.13.4";
  }
});

// node_modules/@apollo/client/utilities/globals/maybe.js
function maybe(thunk) {
  try {
    return thunk();
  } catch (_a2) {
  }
}
var init_maybe = __esm({
  "node_modules/@apollo/client/utilities/globals/maybe.js"() {
  }
});

// node_modules/@apollo/client/utilities/globals/global.js
var global_default;
var init_global = __esm({
  "node_modules/@apollo/client/utilities/globals/global.js"() {
    init_maybe();
    global_default = maybe(function() {
      return globalThis;
    }) || maybe(function() {
      return window;
    }) || maybe(function() {
      return self;
    }) || maybe(function() {
      return global;
    }) || // We don't expect the Function constructor ever to be invoked at runtime, as
    // long as at least one of globalThis, window, self, or global is defined, so
    // we are under no obligation to make it easy for static analysis tools to
    // detect syntactic usage of the Function constructor. If you think you can
    // improve your static analysis to detect this obfuscation, think again. This
    // is an arms race you cannot win, at least not in JavaScript.
    maybe(function() {
      return maybe.constructor("return this")();
    });
  }
});

// node_modules/@apollo/client/utilities/common/makeUniqueId.js
function makeUniqueId(prefix) {
  var count = prefixCounts.get(prefix) || 1;
  prefixCounts.set(prefix, count + 1);
  return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
}
var prefixCounts;
var init_makeUniqueId = __esm({
  "node_modules/@apollo/client/utilities/common/makeUniqueId.js"() {
    prefixCounts = /* @__PURE__ */ new Map();
  }
});

// node_modules/@apollo/client/utilities/common/stringifyForDisplay.js
function stringifyForDisplay(value, space) {
  if (space === void 0) {
    space = 0;
  }
  var undefId = makeUniqueId("stringifyForDisplay");
  return JSON.stringify(value, function(key, value2) {
    return value2 === void 0 ? undefId : value2;
  }, space).split(JSON.stringify(undefId)).join("<undefined>");
}
var init_stringifyForDisplay = __esm({
  "node_modules/@apollo/client/utilities/common/stringifyForDisplay.js"() {
    init_makeUniqueId();
  }
});

// node_modules/@apollo/client/utilities/globals/invariantWrappers.js
function wrap(fn) {
  return function(message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (typeof message === "number") {
      var arg0 = message;
      message = getHandledErrorMsg(arg0);
      if (!message) {
        message = getFallbackErrorMsg(arg0, args);
        args = [];
      }
    }
    fn.apply(void 0, [message].concat(args));
  };
}
function newInvariantError(message) {
  var optionalParams = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    optionalParams[_i - 1] = arguments[_i];
  }
  return new InvariantError(getHandledErrorMsg(message, optionalParams) || getFallbackErrorMsg(message, optionalParams));
}
function stringify(arg) {
  if (typeof arg == "string") {
    return arg;
  }
  try {
    return stringifyForDisplay(arg, 2).slice(0, 1e3);
  } catch (_a2) {
    return "<non-serializable>";
  }
}
function getHandledErrorMsg(message, messageArgs) {
  if (messageArgs === void 0) {
    messageArgs = [];
  }
  if (!message)
    return;
  return global_default[ApolloErrorMessageHandler] && global_default[ApolloErrorMessageHandler](message, messageArgs.map(stringify));
}
function getFallbackErrorMsg(message, messageArgs) {
  if (messageArgs === void 0) {
    messageArgs = [];
  }
  if (!message)
    return;
  return "An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#".concat(encodeURIComponent(JSON.stringify({
    version,
    message,
    args: messageArgs.map(stringify)
  })));
}
var invariant2, ApolloErrorMessageHandler;
var init_invariantWrappers = __esm({
  "node_modules/@apollo/client/utilities/globals/invariantWrappers.js"() {
    init_invariant();
    init_version();
    init_global();
    init_stringifyForDisplay();
    invariant2 = Object.assign(function invariant3(condition, message) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (!condition) {
        invariant(condition, getHandledErrorMsg(message, args) || getFallbackErrorMsg(message, args));
      }
    }, {
      debug: wrap(invariant.debug),
      log: wrap(invariant.log),
      warn: wrap(invariant.warn),
      error: wrap(invariant.error)
    });
    ApolloErrorMessageHandler = Symbol.for("ApolloErrorMessageHandler_" + version);
  }
});

// node_modules/@apollo/client/utilities/globals/index.js
var DEV;
var init_globals = __esm({
  "node_modules/@apollo/client/utilities/globals/index.js"() {
    init_invariantWrappers();
    init_maybe();
    init_global();
    DEV = globalThis.__DEV__ !== false;
  }
});

// node_modules/@apollo/client/utilities/common/objects.js
function isNonNullObject(obj) {
  return obj !== null && typeof obj === "object";
}
var init_objects = __esm({
  "node_modules/@apollo/client/utilities/common/objects.js"() {
  }
});

// node_modules/graphql/version.mjs
var versionInfo;
var init_version2 = __esm({
  "node_modules/graphql/version.mjs"() {
    versionInfo = Object.freeze({
      major: 16,
      minor: 10,
      patch: 0,
      preReleaseTag: null
    });
  }
});

// node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}
var init_devAssert = __esm({
  "node_modules/graphql/jsutils/devAssert.mjs"() {
  }
});

// node_modules/graphql/jsutils/isPromise.mjs
var init_isPromise = __esm({
  "node_modules/graphql/jsutils/isPromise.mjs"() {
  }
});

// node_modules/graphql/jsutils/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}
var init_isObjectLike = __esm({
  "node_modules/graphql/jsutils/isObjectLike.mjs"() {
  }
});

// node_modules/graphql/jsutils/invariant.mjs
function invariant4(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(
      message != null ? message : "Unexpected invariant triggered."
    );
  }
}
var init_invariant2 = __esm({
  "node_modules/graphql/jsutils/invariant.mjs"() {
  }
});

// node_modules/graphql/language/location.mjs
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;
  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === "number" || invariant4(false);
    if (match.index >= position) {
      break;
    }
    lastLineStart = match.index + match[0].length;
    line += 1;
  }
  return {
    line,
    column: position + 1 - lastLineStart
  };
}
var LineRegExp;
var init_location = __esm({
  "node_modules/graphql/language/location.mjs"() {
    init_invariant2();
    LineRegExp = /\r\n|[\n\r]/g;
  }
});

// node_modules/graphql/language/printLocation.mjs
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start)
  );
}
function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = "".padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];
    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([
      [`${lineNum} |`, subLines[0]],
      ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
      ["|", "^".padStart(subLineColumnNum)],
      ["|", subLines[subLineIndex + 1]]
    ]);
  }
  return locationStr + printPrefixedLines([
    // Lines specified like this: ["prefix", "string"],
    [`${lineNum - 1} |`, lines[lineIndex - 1]],
    [`${lineNum} |`, locationLine],
    ["|", "^".padStart(columnNum)],
    [`${lineNum + 1} |`, lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== void 0);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join("\n");
}
var init_printLocation = __esm({
  "node_modules/graphql/language/printLocation.mjs"() {
    init_location();
  }
});

// node_modules/graphql/error/GraphQLError.mjs
function toNormalizedOptions(args) {
  const firstArg = args[0];
  if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }
  return firstArg;
}
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}
var GraphQLError;
var init_GraphQLError = __esm({
  "node_modules/graphql/error/GraphQLError.mjs"() {
    init_isObjectLike();
    init_location();
    init_printLocation();
    GraphQLError = class _GraphQLError extends Error {
      /**
       * An array of `{ line, column }` locations within the source GraphQL document
       * which correspond to this error.
       *
       * Errors during validation often contain multiple locations, for example to
       * point out two things with the same name. Errors during execution include a
       * single location, the field which produced the error.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */
      /**
       * An array describing the JSON-path into the execution response which
       * corresponds to this error. Only included for errors during execution.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */
      /**
       * An array of GraphQL AST Nodes corresponding to this error.
       */
      /**
       * The source GraphQL document for the first location of this error.
       *
       * Note that if this Error represents more than one node, the source may not
       * represent nodes after the first node.
       */
      /**
       * An array of character offsets within the source GraphQL document
       * which correspond to this error.
       */
      /**
       * The original error thrown from a field resolver during execution.
       */
      /**
       * Extension fields to add to the formatted error.
       */
      /**
       * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
       */
      constructor(message, ...rawArgs) {
        var _this$nodes, _nodeLocations$, _ref;
        const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions(rawArgs);
        super(message);
        this.name = "GraphQLError";
        this.path = path !== null && path !== void 0 ? path : void 0;
        this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
        this.nodes = undefinedIfEmpty(
          Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0
        );
        const nodeLocations = undefinedIfEmpty(
          (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node) => node.loc).filter((loc) => loc != null)
        );
        this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
        this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => loc.start);
        this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
        const originalExtensions = isObjectLike(
          originalError === null || originalError === void 0 ? void 0 : originalError.extensions
        ) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : void 0;
        this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : /* @__PURE__ */ Object.create(null);
        Object.defineProperties(this, {
          message: {
            writable: true,
            enumerable: true
          },
          name: {
            enumerable: false
          },
          nodes: {
            enumerable: false
          },
          source: {
            enumerable: false
          },
          positions: {
            enumerable: false
          },
          originalError: {
            enumerable: false
          }
        });
        if (originalError !== null && originalError !== void 0 && originalError.stack) {
          Object.defineProperty(this, "stack", {
            value: originalError.stack,
            writable: true,
            configurable: true
          });
        } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _GraphQLError);
        } else {
          Object.defineProperty(this, "stack", {
            value: Error().stack,
            writable: true,
            configurable: true
          });
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLError";
      }
      toString() {
        let output = this.message;
        if (this.nodes) {
          for (const node of this.nodes) {
            if (node.loc) {
              output += "\n\n" + printLocation(node.loc);
            }
          }
        } else if (this.source && this.locations) {
          for (const location of this.locations) {
            output += "\n\n" + printSourceLocation(this.source, location);
          }
        }
        return output;
      }
      toJSON() {
        const formattedError = {
          message: this.message
        };
        if (this.locations != null) {
          formattedError.locations = this.locations;
        }
        if (this.path != null) {
          formattedError.path = this.path;
        }
        if (this.extensions != null && Object.keys(this.extensions).length > 0) {
          formattedError.extensions = this.extensions;
        }
        return formattedError;
      }
    };
  }
});

// node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position]
  });
}
var init_syntaxError = __esm({
  "node_modules/graphql/error/syntaxError.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/language/ast.mjs
function isNode(maybeNode) {
  const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === "string" && kindValues.has(maybeKind);
}
var Location, Token, QueryDocumentKeys, kindValues, OperationTypeNode;
var init_ast = __esm({
  "node_modules/graphql/language/ast.mjs"() {
    Location = class {
      /**
       * The character offset at which this Node begins.
       */
      /**
       * The character offset at which this Node ends.
       */
      /**
       * The Token at which this Node begins.
       */
      /**
       * The Token at which this Node ends.
       */
      /**
       * The Source document the AST represents.
       */
      constructor(startToken, endToken, source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
      }
      get [Symbol.toStringTag]() {
        return "Location";
      }
      toJSON() {
        return {
          start: this.start,
          end: this.end
        };
      }
    };
    Token = class {
      /**
       * The kind of Token.
       */
      /**
       * The character offset at which this Node begins.
       */
      /**
       * The character offset at which this Node ends.
       */
      /**
       * The 1-indexed line number on which this Token appears.
       */
      /**
       * The 1-indexed column number at which this Token begins.
       */
      /**
       * For non-punctuation tokens, represents the interpreted value of the token.
       *
       * Note: is undefined for punctuation tokens, but typed as string for
       * convenience in the parser.
       */
      /**
       * Tokens exist as nodes in a double-linked-list amongst all tokens
       * including ignored tokens. <SOF> is always the first node and <EOF>
       * the last.
       */
      constructor(kind, start, end, line, column, value) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column;
        this.value = value;
        this.prev = null;
        this.next = null;
      }
      get [Symbol.toStringTag]() {
        return "Token";
      }
      toJSON() {
        return {
          kind: this.kind,
          value: this.value,
          line: this.line,
          column: this.column
        };
      }
    };
    QueryDocumentKeys = {
      Name: [],
      Document: ["definitions"],
      OperationDefinition: [
        "name",
        "variableDefinitions",
        "directives",
        "selectionSet"
      ],
      VariableDefinition: ["variable", "type", "defaultValue", "directives"],
      Variable: ["name"],
      SelectionSet: ["selections"],
      Field: ["alias", "name", "arguments", "directives", "selectionSet"],
      Argument: ["name", "value"],
      FragmentSpread: ["name", "directives"],
      InlineFragment: ["typeCondition", "directives", "selectionSet"],
      FragmentDefinition: [
        "name",
        // Note: fragment variable definitions are deprecated and will removed in v17.0.0
        "variableDefinitions",
        "typeCondition",
        "directives",
        "selectionSet"
      ],
      IntValue: [],
      FloatValue: [],
      StringValue: [],
      BooleanValue: [],
      NullValue: [],
      EnumValue: [],
      ListValue: ["values"],
      ObjectValue: ["fields"],
      ObjectField: ["name", "value"],
      Directive: ["name", "arguments"],
      NamedType: ["name"],
      ListType: ["type"],
      NonNullType: ["type"],
      SchemaDefinition: ["description", "directives", "operationTypes"],
      OperationTypeDefinition: ["type"],
      ScalarTypeDefinition: ["description", "name", "directives"],
      ObjectTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields"
      ],
      FieldDefinition: ["description", "name", "arguments", "type", "directives"],
      InputValueDefinition: [
        "description",
        "name",
        "type",
        "defaultValue",
        "directives"
      ],
      InterfaceTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields"
      ],
      UnionTypeDefinition: ["description", "name", "directives", "types"],
      EnumTypeDefinition: ["description", "name", "directives", "values"],
      EnumValueDefinition: ["description", "name", "directives"],
      InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
      DirectiveDefinition: ["description", "name", "arguments", "locations"],
      SchemaExtension: ["directives", "operationTypes"],
      ScalarTypeExtension: ["name", "directives"],
      ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
      InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
      UnionTypeExtension: ["name", "directives", "types"],
      EnumTypeExtension: ["name", "directives", "values"],
      InputObjectTypeExtension: ["name", "directives", "fields"]
    };
    kindValues = new Set(Object.keys(QueryDocumentKeys));
    (function(OperationTypeNode2) {
      OperationTypeNode2["QUERY"] = "query";
      OperationTypeNode2["MUTATION"] = "mutation";
      OperationTypeNode2["SUBSCRIPTION"] = "subscription";
    })(OperationTypeNode || (OperationTypeNode = {}));
  }
});

// node_modules/graphql/language/directiveLocation.mjs
var DirectiveLocation;
var init_directiveLocation = __esm({
  "node_modules/graphql/language/directiveLocation.mjs"() {
    (function(DirectiveLocation2) {
      DirectiveLocation2["QUERY"] = "QUERY";
      DirectiveLocation2["MUTATION"] = "MUTATION";
      DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
      DirectiveLocation2["FIELD"] = "FIELD";
      DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
      DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
      DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
      DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
      DirectiveLocation2["SCHEMA"] = "SCHEMA";
      DirectiveLocation2["SCALAR"] = "SCALAR";
      DirectiveLocation2["OBJECT"] = "OBJECT";
      DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
      DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
      DirectiveLocation2["INTERFACE"] = "INTERFACE";
      DirectiveLocation2["UNION"] = "UNION";
      DirectiveLocation2["ENUM"] = "ENUM";
      DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
      DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
      DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
    })(DirectiveLocation || (DirectiveLocation = {}));
  }
});

// node_modules/graphql/language/kinds.mjs
var Kind;
var init_kinds = __esm({
  "node_modules/graphql/language/kinds.mjs"() {
    (function(Kind2) {
      Kind2["NAME"] = "Name";
      Kind2["DOCUMENT"] = "Document";
      Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
      Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
      Kind2["SELECTION_SET"] = "SelectionSet";
      Kind2["FIELD"] = "Field";
      Kind2["ARGUMENT"] = "Argument";
      Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
      Kind2["INLINE_FRAGMENT"] = "InlineFragment";
      Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
      Kind2["VARIABLE"] = "Variable";
      Kind2["INT"] = "IntValue";
      Kind2["FLOAT"] = "FloatValue";
      Kind2["STRING"] = "StringValue";
      Kind2["BOOLEAN"] = "BooleanValue";
      Kind2["NULL"] = "NullValue";
      Kind2["ENUM"] = "EnumValue";
      Kind2["LIST"] = "ListValue";
      Kind2["OBJECT"] = "ObjectValue";
      Kind2["OBJECT_FIELD"] = "ObjectField";
      Kind2["DIRECTIVE"] = "Directive";
      Kind2["NAMED_TYPE"] = "NamedType";
      Kind2["LIST_TYPE"] = "ListType";
      Kind2["NON_NULL_TYPE"] = "NonNullType";
      Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
      Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
      Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
      Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
      Kind2["FIELD_DEFINITION"] = "FieldDefinition";
      Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
      Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
      Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
      Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
      Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
      Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
      Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
      Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
      Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
      Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
      Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
      Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
      Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
      Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
    })(Kind || (Kind = {}));
  }
});

// node_modules/graphql/language/characterClasses.mjs
function isWhiteSpace(code) {
  return code === 9 || code === 32;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}
function isLetter(code) {
  return code >= 97 && code <= 122 || // A-Z
  code >= 65 && code <= 90;
}
function isNameStart(code) {
  return isLetter(code) || code === 95;
}
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 95;
}
var init_characterClasses = __esm({
  "node_modules/graphql/language/characterClasses.mjs"() {
  }
});

// node_modules/graphql/language/blockString.mjs
function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;
  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;
  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;
    const line = lines[i];
    const indent2 = leadingWhitespace(line);
    if (indent2 === line.length) {
      continue;
    }
    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;
    if (i !== 0 && indent2 < commonIndent) {
      commonIndent = indent2;
    }
  }
  return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice(
    (_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0,
    lastNonEmptyLine + 1
  );
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }
  return i;
}
function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""');
  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1;
  const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0)));
  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith("\\");
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
  (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
  let result2 = "";
  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));
  if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
    result2 += "\n";
  }
  result2 += escapedValue;
  if (printAsMultipleLines || forceTrailingNewline) {
    result2 += "\n";
  }
  return '"""' + result2 + '"""';
}
var init_blockString = __esm({
  "node_modules/graphql/language/blockString.mjs"() {
    init_characterClasses();
  }
});

// node_modules/graphql/language/tokenKind.mjs
var TokenKind;
var init_tokenKind = __esm({
  "node_modules/graphql/language/tokenKind.mjs"() {
    (function(TokenKind2) {
      TokenKind2["SOF"] = "<SOF>";
      TokenKind2["EOF"] = "<EOF>";
      TokenKind2["BANG"] = "!";
      TokenKind2["DOLLAR"] = "$";
      TokenKind2["AMP"] = "&";
      TokenKind2["PAREN_L"] = "(";
      TokenKind2["PAREN_R"] = ")";
      TokenKind2["SPREAD"] = "...";
      TokenKind2["COLON"] = ":";
      TokenKind2["EQUALS"] = "=";
      TokenKind2["AT"] = "@";
      TokenKind2["BRACKET_L"] = "[";
      TokenKind2["BRACKET_R"] = "]";
      TokenKind2["BRACE_L"] = "{";
      TokenKind2["PIPE"] = "|";
      TokenKind2["BRACE_R"] = "}";
      TokenKind2["NAME"] = "Name";
      TokenKind2["INT"] = "Int";
      TokenKind2["FLOAT"] = "Float";
      TokenKind2["STRING"] = "String";
      TokenKind2["BLOCK_STRING"] = "BlockString";
      TokenKind2["COMMENT"] = "Comment";
    })(TokenKind || (TokenKind = {}));
  }
});

// node_modules/graphql/language/lexer.mjs
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function isUnicodeScalarValue(code) {
  return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
}
function isSupplementaryCodePoint(body, location) {
  return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}
function isLeadingSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailingSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);
  if (code === void 0) {
    return TokenKind.EOF;
  } else if (code >= 32 && code <= 126) {
    const char = String.fromCodePoint(code);
    return char === '"' ? `'"'` : `"${char}"`;
  }
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++position;
        continue;
      case 10:
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 13:
        if (body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 35:
        return readComment(lexer, position);
      case 33:
        return createToken(lexer, TokenKind.BANG, position, position + 1);
      case 36:
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);
      case 38:
        return createToken(lexer, TokenKind.AMP, position, position + 1);
      case 40:
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
      case 41:
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
      case 46:
        if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }
        break;
      case 58:
        return createToken(lexer, TokenKind.COLON, position, position + 1);
      case 61:
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);
      case 64:
        return createToken(lexer, TokenKind.AT, position, position + 1);
      case 91:
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);
      case 93:
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);
      case 123:
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);
      case 124:
        return createToken(lexer, TokenKind.PIPE, position, position + 1);
      case 125:
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      case 34:
        if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
          return readBlockString(lexer, position);
        }
        return readString(lexer, position);
    }
    if (isDigit(code) || code === 45) {
      return readNumber(lexer, position, code);
    }
    if (isNameStart(code)) {
      return readName(lexer, position);
    }
    throw syntaxError(
      lexer.source,
      position,
      code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`
    );
  }
  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position)
  );
}
function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (isDigit(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position
      )}.`
    );
  }
  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position)
  );
}
function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start
      )}.`
    );
  }
  const body = lexer.source.body;
  let position = start + 1;
  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }
  return position;
}
function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = "";
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    }
    if (code === 92) {
      value += body.slice(chunkStart, position);
      const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    }
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3;
  while (size < 12) {
    const code = body.charCodeAt(position + size++);
    if (code === 125) {
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }
      return {
        value: String.fromCodePoint(point),
        size
      };
    }
    point = point << 4 | readHexDigit(code);
    if (point < 0) {
      break;
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size
    )}".`
  );
}
function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);
  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  }
  if (isLeadingSurrogate(code)) {
    if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
      const trailingCode = read16BitHexCode(body, position + 8);
      if (isTrailingSurrogate(trailingCode)) {
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`
  );
}
function read16BitHexCode(body, position) {
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
function readHexDigit(code) {
  return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
}
function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);
  switch (code) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: "\n",
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2
    )}".`
  );
}
function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = "";
  const blockLines = [];
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3,
        // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join("\n")
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    }
    if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1;
      position += 4;
      continue;
    }
    if (code === 10 || code === 13) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      if (code === 13 && body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      currentLine = "";
      chunkStart = position;
      lineStart = position;
      continue;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position)
  );
}
var Lexer;
var init_lexer = __esm({
  "node_modules/graphql/language/lexer.mjs"() {
    init_syntaxError();
    init_ast();
    init_blockString();
    init_characterClasses();
    init_tokenKind();
    Lexer = class {
      /**
       * The previously focused non-ignored token.
       */
      /**
       * The currently focused non-ignored token.
       */
      /**
       * The (1-indexed) line containing the current token.
       */
      /**
       * The character offset at which the current line begins.
       */
      constructor(source) {
        const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
        this.source = source;
        this.lastToken = startOfFileToken;
        this.token = startOfFileToken;
        this.line = 1;
        this.lineStart = 0;
      }
      get [Symbol.toStringTag]() {
        return "Lexer";
      }
      /**
       * Advances the token stream to the next non-ignored token.
       */
      advance() {
        this.lastToken = this.token;
        const token = this.token = this.lookahead();
        return token;
      }
      /**
       * Looks ahead and returns the next non-ignored token, but does not change
       * the state of Lexer.
       */
      lookahead() {
        let token = this.token;
        if (token.kind !== TokenKind.EOF) {
          do {
            if (token.next) {
              token = token.next;
            } else {
              const nextToken = readNextToken(this, token.end);
              token.next = nextToken;
              nextToken.prev = token;
              token = nextToken;
            }
          } while (token.kind === TokenKind.COMMENT);
        }
        return token;
      }
    };
  }
});

// node_modules/graphql/jsutils/inspect.mjs
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  const properties = entries.map(
    ([key, value]) => key + ": " + formatValue(value, seenValues)
  );
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}
var MAX_ARRAY_LENGTH, MAX_RECURSIVE_DEPTH;
var init_inspect = __esm({
  "node_modules/graphql/jsutils/inspect.mjs"() {
    MAX_ARRAY_LENGTH = 10;
    MAX_RECURSIVE_DEPTH = 2;
  }
});

// node_modules/graphql/jsutils/instanceOf.mjs
var isProduction, instanceOf;
var init_instanceOf = __esm({
  "node_modules/graphql/jsutils/instanceOf.mjs"() {
    init_inspect();
    isProduction = globalThis.process && // eslint-disable-next-line no-undef
    false;
    instanceOf = /* c8 ignore next 6 */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317
    isProduction ? function instanceOf2(value, constructor) {
      return value instanceof constructor;
    } : function instanceOf3(value, constructor) {
      if (value instanceof constructor) {
        return true;
      }
      if (typeof value === "object" && value !== null) {
        var _value$constructor;
        const className = constructor.prototype[Symbol.toStringTag];
        const valueClassName = (
          // We still need to support constructor's name to detect conflicts with older versions of this library.
          Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name
        );
        if (className === valueClassName) {
          const stringifiedValue = inspect(value);
          throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
        }
      }
      return false;
    };
  }
});

// node_modules/graphql/language/source.mjs
function isSource(source) {
  return instanceOf(source, Source);
}
var Source;
var init_source = __esm({
  "node_modules/graphql/language/source.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    Source = class {
      constructor(body, name = "GraphQL request", locationOffset = {
        line: 1,
        column: 1
      }) {
        typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
        this.body = body;
        this.name = name;
        this.locationOffset = locationOffset;
        this.locationOffset.line > 0 || devAssert(
          false,
          "line in locationOffset is 1-indexed and must be positive."
        );
        this.locationOffset.column > 0 || devAssert(
          false,
          "column in locationOffset is 1-indexed and must be positive."
        );
      }
      get [Symbol.toStringTag]() {
        return "Source";
      }
    };
  }
});

// node_modules/graphql/language/parser.mjs
function parse(source, options) {
  const parser = new Parser(source, options);
  const document = parser.parseDocument();
  Object.defineProperty(document, "tokenCount", {
    enumerable: false,
    value: parser.tokenCount
  });
  return document;
}
function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}
var Parser;
var init_parser = __esm({
  "node_modules/graphql/language/parser.mjs"() {
    init_syntaxError();
    init_ast();
    init_directiveLocation();
    init_kinds();
    init_lexer();
    init_source();
    init_tokenKind();
    Parser = class {
      constructor(source, options = {}) {
        const sourceObj = isSource(source) ? source : new Source(source);
        this._lexer = new Lexer(sourceObj);
        this._options = options;
        this._tokenCounter = 0;
      }
      get tokenCount() {
        return this._tokenCounter;
      }
      /**
       * Converts a name lex token into a name parse node.
       */
      parseName() {
        const token = this.expectToken(TokenKind.NAME);
        return this.node(token, {
          kind: Kind.NAME,
          value: token.value
        });
      }
      // Implements the parsing rules in the Document section.
      /**
       * Document : Definition+
       */
      parseDocument() {
        return this.node(this._lexer.token, {
          kind: Kind.DOCUMENT,
          definitions: this.many(
            TokenKind.SOF,
            this.parseDefinition,
            TokenKind.EOF
          )
        });
      }
      /**
       * Definition :
       *   - ExecutableDefinition
       *   - TypeSystemDefinition
       *   - TypeSystemExtension
       *
       * ExecutableDefinition :
       *   - OperationDefinition
       *   - FragmentDefinition
       *
       * TypeSystemDefinition :
       *   - SchemaDefinition
       *   - TypeDefinition
       *   - DirectiveDefinition
       *
       * TypeDefinition :
       *   - ScalarTypeDefinition
       *   - ObjectTypeDefinition
       *   - InterfaceTypeDefinition
       *   - UnionTypeDefinition
       *   - EnumTypeDefinition
       *   - InputObjectTypeDefinition
       */
      parseDefinition() {
        if (this.peek(TokenKind.BRACE_L)) {
          return this.parseOperationDefinition();
        }
        const hasDescription = this.peekDescription();
        const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case "schema":
              return this.parseSchemaDefinition();
            case "scalar":
              return this.parseScalarTypeDefinition();
            case "type":
              return this.parseObjectTypeDefinition();
            case "interface":
              return this.parseInterfaceTypeDefinition();
            case "union":
              return this.parseUnionTypeDefinition();
            case "enum":
              return this.parseEnumTypeDefinition();
            case "input":
              return this.parseInputObjectTypeDefinition();
            case "directive":
              return this.parseDirectiveDefinition();
          }
          if (hasDescription) {
            throw syntaxError(
              this._lexer.source,
              this._lexer.token.start,
              "Unexpected description, descriptions are supported only on type definitions."
            );
          }
          switch (keywordToken.value) {
            case "query":
            case "mutation":
            case "subscription":
              return this.parseOperationDefinition();
            case "fragment":
              return this.parseFragmentDefinition();
            case "extend":
              return this.parseTypeSystemExtension();
          }
        }
        throw this.unexpected(keywordToken);
      }
      // Implements the parsing rules in the Operations section.
      /**
       * OperationDefinition :
       *  - SelectionSet
       *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
       */
      parseOperationDefinition() {
        const start = this._lexer.token;
        if (this.peek(TokenKind.BRACE_L)) {
          return this.node(start, {
            kind: Kind.OPERATION_DEFINITION,
            operation: OperationTypeNode.QUERY,
            name: void 0,
            variableDefinitions: [],
            directives: [],
            selectionSet: this.parseSelectionSet()
          });
        }
        const operation = this.parseOperationType();
        let name;
        if (this.peek(TokenKind.NAME)) {
          name = this.parseName();
        }
        return this.node(start, {
          kind: Kind.OPERATION_DEFINITION,
          operation,
          name,
          variableDefinitions: this.parseVariableDefinitions(),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * OperationType : one of query mutation subscription
       */
      parseOperationType() {
        const operationToken = this.expectToken(TokenKind.NAME);
        switch (operationToken.value) {
          case "query":
            return OperationTypeNode.QUERY;
          case "mutation":
            return OperationTypeNode.MUTATION;
          case "subscription":
            return OperationTypeNode.SUBSCRIPTION;
        }
        throw this.unexpected(operationToken);
      }
      /**
       * VariableDefinitions : ( VariableDefinition+ )
       */
      parseVariableDefinitions() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseVariableDefinition,
          TokenKind.PAREN_R
        );
      }
      /**
       * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
       */
      parseVariableDefinition() {
        return this.node(this._lexer.token, {
          kind: Kind.VARIABLE_DEFINITION,
          variable: this.parseVariable(),
          type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
          defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
          directives: this.parseConstDirectives()
        });
      }
      /**
       * Variable : $ Name
       */
      parseVariable() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.DOLLAR);
        return this.node(start, {
          kind: Kind.VARIABLE,
          name: this.parseName()
        });
      }
      /**
       * ```
       * SelectionSet : { Selection+ }
       * ```
       */
      parseSelectionSet() {
        return this.node(this._lexer.token, {
          kind: Kind.SELECTION_SET,
          selections: this.many(
            TokenKind.BRACE_L,
            this.parseSelection,
            TokenKind.BRACE_R
          )
        });
      }
      /**
       * Selection :
       *   - Field
       *   - FragmentSpread
       *   - InlineFragment
       */
      parseSelection() {
        return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
      }
      /**
       * Field : Alias? Name Arguments? Directives? SelectionSet?
       *
       * Alias : Name :
       */
      parseField() {
        const start = this._lexer.token;
        const nameOrAlias = this.parseName();
        let alias;
        let name;
        if (this.expectOptionalToken(TokenKind.COLON)) {
          alias = nameOrAlias;
          name = this.parseName();
        } else {
          name = nameOrAlias;
        }
        return this.node(start, {
          kind: Kind.FIELD,
          alias,
          name,
          arguments: this.parseArguments(false),
          directives: this.parseDirectives(false),
          selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
        });
      }
      /**
       * Arguments[Const] : ( Argument[?Const]+ )
       */
      parseArguments(isConst) {
        const item = isConst ? this.parseConstArgument : this.parseArgument;
        return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
      }
      /**
       * Argument[Const] : Name : Value[?Const]
       */
      parseArgument(isConst = false) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.ARGUMENT,
          name,
          value: this.parseValueLiteral(isConst)
        });
      }
      parseConstArgument() {
        return this.parseArgument(true);
      }
      // Implements the parsing rules in the Fragments section.
      /**
       * Corresponds to both FragmentSpread and InlineFragment in the spec.
       *
       * FragmentSpread : ... FragmentName Directives?
       *
       * InlineFragment : ... TypeCondition? Directives? SelectionSet
       */
      parseFragment() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.SPREAD);
        const hasTypeCondition = this.expectOptionalKeyword("on");
        if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
          return this.node(start, {
            kind: Kind.FRAGMENT_SPREAD,
            name: this.parseFragmentName(),
            directives: this.parseDirectives(false)
          });
        }
        return this.node(start, {
          kind: Kind.INLINE_FRAGMENT,
          typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * FragmentDefinition :
       *   - fragment FragmentName on TypeCondition Directives? SelectionSet
       *
       * TypeCondition : NamedType
       */
      parseFragmentDefinition() {
        const start = this._lexer.token;
        this.expectKeyword("fragment");
        if (this._options.allowLegacyFragmentVariables === true) {
          return this.node(start, {
            kind: Kind.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet()
          });
        }
        return this.node(start, {
          kind: Kind.FRAGMENT_DEFINITION,
          name: this.parseFragmentName(),
          typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * FragmentName : Name but not `on`
       */
      parseFragmentName() {
        if (this._lexer.token.value === "on") {
          throw this.unexpected();
        }
        return this.parseName();
      }
      // Implements the parsing rules in the Values section.
      /**
       * Value[Const] :
       *   - [~Const] Variable
       *   - IntValue
       *   - FloatValue
       *   - StringValue
       *   - BooleanValue
       *   - NullValue
       *   - EnumValue
       *   - ListValue[?Const]
       *   - ObjectValue[?Const]
       *
       * BooleanValue : one of `true` `false`
       *
       * NullValue : `null`
       *
       * EnumValue : Name but not `true`, `false` or `null`
       */
      parseValueLiteral(isConst) {
        const token = this._lexer.token;
        switch (token.kind) {
          case TokenKind.BRACKET_L:
            return this.parseList(isConst);
          case TokenKind.BRACE_L:
            return this.parseObject(isConst);
          case TokenKind.INT:
            this.advanceLexer();
            return this.node(token, {
              kind: Kind.INT,
              value: token.value
            });
          case TokenKind.FLOAT:
            this.advanceLexer();
            return this.node(token, {
              kind: Kind.FLOAT,
              value: token.value
            });
          case TokenKind.STRING:
          case TokenKind.BLOCK_STRING:
            return this.parseStringLiteral();
          case TokenKind.NAME:
            this.advanceLexer();
            switch (token.value) {
              case "true":
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: true
                });
              case "false":
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: false
                });
              case "null":
                return this.node(token, {
                  kind: Kind.NULL
                });
              default:
                return this.node(token, {
                  kind: Kind.ENUM,
                  value: token.value
                });
            }
          case TokenKind.DOLLAR:
            if (isConst) {
              this.expectToken(TokenKind.DOLLAR);
              if (this._lexer.token.kind === TokenKind.NAME) {
                const varName = this._lexer.token.value;
                throw syntaxError(
                  this._lexer.source,
                  token.start,
                  `Unexpected variable "$${varName}" in constant value.`
                );
              } else {
                throw this.unexpected(token);
              }
            }
            return this.parseVariable();
          default:
            throw this.unexpected();
        }
      }
      parseConstValueLiteral() {
        return this.parseValueLiteral(true);
      }
      parseStringLiteral() {
        const token = this._lexer.token;
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.STRING,
          value: token.value,
          block: token.kind === TokenKind.BLOCK_STRING
        });
      }
      /**
       * ListValue[Const] :
       *   - [ ]
       *   - [ Value[?Const]+ ]
       */
      parseList(isConst) {
        const item = () => this.parseValueLiteral(isConst);
        return this.node(this._lexer.token, {
          kind: Kind.LIST,
          values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
        });
      }
      /**
       * ```
       * ObjectValue[Const] :
       *   - { }
       *   - { ObjectField[?Const]+ }
       * ```
       */
      parseObject(isConst) {
        const item = () => this.parseObjectField(isConst);
        return this.node(this._lexer.token, {
          kind: Kind.OBJECT,
          fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
        });
      }
      /**
       * ObjectField[Const] : Name : Value[?Const]
       */
      parseObjectField(isConst) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.OBJECT_FIELD,
          name,
          value: this.parseValueLiteral(isConst)
        });
      }
      // Implements the parsing rules in the Directives section.
      /**
       * Directives[Const] : Directive[?Const]+
       */
      parseDirectives(isConst) {
        const directives = [];
        while (this.peek(TokenKind.AT)) {
          directives.push(this.parseDirective(isConst));
        }
        return directives;
      }
      parseConstDirectives() {
        return this.parseDirectives(true);
      }
      /**
       * ```
       * Directive[Const] : @ Name Arguments[?Const]?
       * ```
       */
      parseDirective(isConst) {
        const start = this._lexer.token;
        this.expectToken(TokenKind.AT);
        return this.node(start, {
          kind: Kind.DIRECTIVE,
          name: this.parseName(),
          arguments: this.parseArguments(isConst)
        });
      }
      // Implements the parsing rules in the Types section.
      /**
       * Type :
       *   - NamedType
       *   - ListType
       *   - NonNullType
       */
      parseTypeReference() {
        const start = this._lexer.token;
        let type;
        if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
          const innerType = this.parseTypeReference();
          this.expectToken(TokenKind.BRACKET_R);
          type = this.node(start, {
            kind: Kind.LIST_TYPE,
            type: innerType
          });
        } else {
          type = this.parseNamedType();
        }
        if (this.expectOptionalToken(TokenKind.BANG)) {
          return this.node(start, {
            kind: Kind.NON_NULL_TYPE,
            type
          });
        }
        return type;
      }
      /**
       * NamedType : Name
       */
      parseNamedType() {
        return this.node(this._lexer.token, {
          kind: Kind.NAMED_TYPE,
          name: this.parseName()
        });
      }
      // Implements the parsing rules in the Type Definition section.
      peekDescription() {
        return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
      }
      /**
       * Description : StringValue
       */
      parseDescription() {
        if (this.peekDescription()) {
          return this.parseStringLiteral();
        }
      }
      /**
       * ```
       * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
       * ```
       */
      parseSchemaDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("schema");
        const directives = this.parseConstDirectives();
        const operationTypes = this.many(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R
        );
        return this.node(start, {
          kind: Kind.SCHEMA_DEFINITION,
          description,
          directives,
          operationTypes
        });
      }
      /**
       * OperationTypeDefinition : OperationType : NamedType
       */
      parseOperationTypeDefinition() {
        const start = this._lexer.token;
        const operation = this.parseOperationType();
        this.expectToken(TokenKind.COLON);
        const type = this.parseNamedType();
        return this.node(start, {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation,
          type
        });
      }
      /**
       * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
       */
      parseScalarTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("scalar");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.SCALAR_TYPE_DEFINITION,
          description,
          name,
          directives
        });
      }
      /**
       * ObjectTypeDefinition :
       *   Description?
       *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
       */
      parseObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("type");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.OBJECT_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * ImplementsInterfaces :
       *   - implements `&`? NamedType
       *   - ImplementsInterfaces & NamedType
       */
      parseImplementsInterfaces() {
        return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
      }
      /**
       * ```
       * FieldsDefinition : { FieldDefinition+ }
       * ```
       */
      parseFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseFieldDefinition,
          TokenKind.BRACE_R
        );
      }
      /**
       * FieldDefinition :
       *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
       */
      parseFieldDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.FIELD_DEFINITION,
          description,
          name,
          arguments: args,
          type,
          directives
        });
      }
      /**
       * ArgumentsDefinition : ( InputValueDefinition+ )
       */
      parseArgumentDefs() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseInputValueDef,
          TokenKind.PAREN_R
        );
      }
      /**
       * InputValueDefinition :
       *   - Description? Name : Type DefaultValue? Directives[Const]?
       */
      parseInputValueDef() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        let defaultValue;
        if (this.expectOptionalToken(TokenKind.EQUALS)) {
          defaultValue = this.parseConstValueLiteral();
        }
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.INPUT_VALUE_DEFINITION,
          description,
          name,
          type,
          defaultValue,
          directives
        });
      }
      /**
       * InterfaceTypeDefinition :
       *   - Description? interface Name Directives[Const]? FieldsDefinition?
       */
      parseInterfaceTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("interface");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * UnionTypeDefinition :
       *   - Description? union Name Directives[Const]? UnionMemberTypes?
       */
      parseUnionTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("union");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        return this.node(start, {
          kind: Kind.UNION_TYPE_DEFINITION,
          description,
          name,
          directives,
          types
        });
      }
      /**
       * UnionMemberTypes :
       *   - = `|`? NamedType
       *   - UnionMemberTypes | NamedType
       */
      parseUnionMemberTypes() {
        return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
      }
      /**
       * EnumTypeDefinition :
       *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
       */
      parseEnumTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("enum");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        return this.node(start, {
          kind: Kind.ENUM_TYPE_DEFINITION,
          description,
          name,
          directives,
          values
        });
      }
      /**
       * ```
       * EnumValuesDefinition : { EnumValueDefinition+ }
       * ```
       */
      parseEnumValuesDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseEnumValueDefinition,
          TokenKind.BRACE_R
        );
      }
      /**
       * EnumValueDefinition : Description? EnumValue Directives[Const]?
       */
      parseEnumValueDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseEnumValueName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description,
          name,
          directives
        });
      }
      /**
       * EnumValue : Name but not `true`, `false` or `null`
       */
      parseEnumValueName() {
        if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
          throw syntaxError(
            this._lexer.source,
            this._lexer.token.start,
            `${getTokenDesc(
              this._lexer.token
            )} is reserved and cannot be used for an enum value.`
          );
        }
        return this.parseName();
      }
      /**
       * InputObjectTypeDefinition :
       *   - Description? input Name Directives[Const]? InputFieldsDefinition?
       */
      parseInputObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("input");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
          description,
          name,
          directives,
          fields
        });
      }
      /**
       * ```
       * InputFieldsDefinition : { InputValueDefinition+ }
       * ```
       */
      parseInputFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseInputValueDef,
          TokenKind.BRACE_R
        );
      }
      /**
       * TypeSystemExtension :
       *   - SchemaExtension
       *   - TypeExtension
       *
       * TypeExtension :
       *   - ScalarTypeExtension
       *   - ObjectTypeExtension
       *   - InterfaceTypeExtension
       *   - UnionTypeExtension
       *   - EnumTypeExtension
       *   - InputObjectTypeDefinition
       */
      parseTypeSystemExtension() {
        const keywordToken = this._lexer.lookahead();
        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case "schema":
              return this.parseSchemaExtension();
            case "scalar":
              return this.parseScalarTypeExtension();
            case "type":
              return this.parseObjectTypeExtension();
            case "interface":
              return this.parseInterfaceTypeExtension();
            case "union":
              return this.parseUnionTypeExtension();
            case "enum":
              return this.parseEnumTypeExtension();
            case "input":
              return this.parseInputObjectTypeExtension();
          }
        }
        throw this.unexpected(keywordToken);
      }
      /**
       * ```
       * SchemaExtension :
       *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
       *  - extend schema Directives[Const]
       * ```
       */
      parseSchemaExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("schema");
        const directives = this.parseConstDirectives();
        const operationTypes = this.optionalMany(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R
        );
        if (directives.length === 0 && operationTypes.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.SCHEMA_EXTENSION,
          directives,
          operationTypes
        });
      }
      /**
       * ScalarTypeExtension :
       *   - extend scalar Name Directives[Const]
       */
      parseScalarTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("scalar");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        if (directives.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.SCALAR_TYPE_EXTENSION,
          name,
          directives
        });
      }
      /**
       * ObjectTypeExtension :
       *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend type Name ImplementsInterfaces? Directives[Const]
       *  - extend type Name ImplementsInterfaces
       */
      parseObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("type");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.OBJECT_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * InterfaceTypeExtension :
       *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend interface Name ImplementsInterfaces? Directives[Const]
       *  - extend interface Name ImplementsInterfaces
       */
      parseInterfaceTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("interface");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * UnionTypeExtension :
       *   - extend union Name Directives[Const]? UnionMemberTypes
       *   - extend union Name Directives[Const]
       */
      parseUnionTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("union");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        if (directives.length === 0 && types.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.UNION_TYPE_EXTENSION,
          name,
          directives,
          types
        });
      }
      /**
       * EnumTypeExtension :
       *   - extend enum Name Directives[Const]? EnumValuesDefinition
       *   - extend enum Name Directives[Const]
       */
      parseEnumTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("enum");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        if (directives.length === 0 && values.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.ENUM_TYPE_EXTENSION,
          name,
          directives,
          values
        });
      }
      /**
       * InputObjectTypeExtension :
       *   - extend input Name Directives[Const]? InputFieldsDefinition
       *   - extend input Name Directives[Const]
       */
      parseInputObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("input");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        if (directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
          name,
          directives,
          fields
        });
      }
      /**
       * ```
       * DirectiveDefinition :
       *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
       * ```
       */
      parseDirectiveDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("directive");
        this.expectToken(TokenKind.AT);
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        const repeatable = this.expectOptionalKeyword("repeatable");
        this.expectKeyword("on");
        const locations = this.parseDirectiveLocations();
        return this.node(start, {
          kind: Kind.DIRECTIVE_DEFINITION,
          description,
          name,
          arguments: args,
          repeatable,
          locations
        });
      }
      /**
       * DirectiveLocations :
       *   - `|`? DirectiveLocation
       *   - DirectiveLocations | DirectiveLocation
       */
      parseDirectiveLocations() {
        return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
      }
      /*
       * DirectiveLocation :
       *   - ExecutableDirectiveLocation
       *   - TypeSystemDirectiveLocation
       *
       * ExecutableDirectiveLocation : one of
       *   `QUERY`
       *   `MUTATION`
       *   `SUBSCRIPTION`
       *   `FIELD`
       *   `FRAGMENT_DEFINITION`
       *   `FRAGMENT_SPREAD`
       *   `INLINE_FRAGMENT`
       *
       * TypeSystemDirectiveLocation : one of
       *   `SCHEMA`
       *   `SCALAR`
       *   `OBJECT`
       *   `FIELD_DEFINITION`
       *   `ARGUMENT_DEFINITION`
       *   `INTERFACE`
       *   `UNION`
       *   `ENUM`
       *   `ENUM_VALUE`
       *   `INPUT_OBJECT`
       *   `INPUT_FIELD_DEFINITION`
       */
      parseDirectiveLocation() {
        const start = this._lexer.token;
        const name = this.parseName();
        if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
          return name;
        }
        throw this.unexpected(start);
      }
      // Core parsing utility functions
      /**
       * Returns a node that, if configured to do so, sets a "loc" field as a
       * location object, used to identify the place in the source that created a
       * given parsed object.
       */
      node(startToken, node) {
        if (this._options.noLocation !== true) {
          node.loc = new Location(
            startToken,
            this._lexer.lastToken,
            this._lexer.source
          );
        }
        return node;
      }
      /**
       * Determines if the next token is of a given kind
       */
      peek(kind) {
        return this._lexer.token.kind === kind;
      }
      /**
       * If the next token is of the given kind, return that token after advancing the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */
      expectToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
          this.advanceLexer();
          return token;
        }
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`
        );
      }
      /**
       * If the next token is of the given kind, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */
      expectOptionalToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
          this.advanceLexer();
          return true;
        }
        return false;
      }
      /**
       * If the next token is a given keyword, advance the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */
      expectKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === TokenKind.NAME && token.value === value) {
          this.advanceLexer();
        } else {
          throw syntaxError(
            this._lexer.source,
            token.start,
            `Expected "${value}", found ${getTokenDesc(token)}.`
          );
        }
      }
      /**
       * If the next token is a given keyword, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */
      expectOptionalKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === TokenKind.NAME && token.value === value) {
          this.advanceLexer();
          return true;
        }
        return false;
      }
      /**
       * Helper function for creating an error when an unexpected lexed token is encountered.
       */
      unexpected(atToken) {
        const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
        return syntaxError(
          this._lexer.source,
          token.start,
          `Unexpected ${getTokenDesc(token)}.`
        );
      }
      /**
       * Returns a possibly empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      any(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        while (!this.expectOptionalToken(closeKind)) {
          nodes.push(parseFn.call(this));
        }
        return nodes;
      }
      /**
       * Returns a list of parse nodes, determined by the parseFn.
       * It can be empty only if open token is missing otherwise it will always return non-empty list
       * that begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      optionalMany(openKind, parseFn, closeKind) {
        if (this.expectOptionalToken(openKind)) {
          const nodes = [];
          do {
            nodes.push(parseFn.call(this));
          } while (!this.expectOptionalToken(closeKind));
          return nodes;
        }
        return [];
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      many(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (!this.expectOptionalToken(closeKind));
        return nodes;
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
       * Advances the parser to the next lex token after last item in the list.
       */
      delimitedMany(delimiterKind, parseFn) {
        this.expectOptionalToken(delimiterKind);
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (this.expectOptionalToken(delimiterKind));
        return nodes;
      }
      advanceLexer() {
        const { maxTokens } = this._options;
        const token = this._lexer.advance();
        if (token.kind !== TokenKind.EOF) {
          ++this._tokenCounter;
          if (maxTokens !== void 0 && this._tokenCounter > maxTokens) {
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Document contains more that ${maxTokens} tokens. Parsing aborted.`
            );
          }
        }
      }
    };
  }
});

// node_modules/graphql/jsutils/didYouMean.mjs
function didYouMean(firstArg, secondArg) {
  const [subMessage, suggestionsArg] = secondArg ? [firstArg, secondArg] : [void 0, firstArg];
  let message = " Did you mean ";
  if (subMessage) {
    message += subMessage + " ";
  }
  const suggestions = suggestionsArg.map((x) => `"${x}"`);
  switch (suggestions.length) {
    case 0:
      return "";
    case 1:
      return message + suggestions[0] + "?";
    case 2:
      return message + suggestions[0] + " or " + suggestions[1] + "?";
  }
  const selected = suggestions.slice(0, MAX_SUGGESTIONS);
  const lastItem = selected.pop();
  return message + selected.join(", ") + ", or " + lastItem + "?";
}
var MAX_SUGGESTIONS;
var init_didYouMean = __esm({
  "node_modules/graphql/jsutils/didYouMean.mjs"() {
    MAX_SUGGESTIONS = 5;
  }
});

// node_modules/graphql/jsutils/identityFunc.mjs
function identityFunc(x) {
  return x;
}
var init_identityFunc = __esm({
  "node_modules/graphql/jsutils/identityFunc.mjs"() {
  }
});

// node_modules/graphql/jsutils/keyMap.mjs
function keyMap(list, keyFn) {
  const result2 = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result2[keyFn(item)] = item;
  }
  return result2;
}
var init_keyMap = __esm({
  "node_modules/graphql/jsutils/keyMap.mjs"() {
  }
});

// node_modules/graphql/jsutils/keyValMap.mjs
function keyValMap(list, keyFn, valFn) {
  const result2 = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result2[keyFn(item)] = valFn(item);
  }
  return result2;
}
var init_keyValMap = __esm({
  "node_modules/graphql/jsutils/keyValMap.mjs"() {
  }
});

// node_modules/graphql/jsutils/mapValue.mjs
function mapValue(map, fn) {
  const result2 = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(map)) {
    result2[key] = fn(map[key], key);
  }
  return result2;
}
var init_mapValue = __esm({
  "node_modules/graphql/jsutils/mapValue.mjs"() {
  }
});

// node_modules/graphql/jsutils/naturalCompare.mjs
function naturalCompare(aStr, bStr) {
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < aStr.length && bIndex < bStr.length) {
    let aChar = aStr.charCodeAt(aIndex);
    let bChar = bStr.charCodeAt(bIndex);
    if (isDigit2(aChar) && isDigit2(bChar)) {
      let aNum = 0;
      do {
        ++aIndex;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIndex);
      } while (isDigit2(aChar) && aNum > 0);
      let bNum = 0;
      do {
        ++bIndex;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIndex);
      } while (isDigit2(bChar) && bNum > 0);
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }
      if (aChar > bChar) {
        return 1;
      }
      ++aIndex;
      ++bIndex;
    }
  }
  return aStr.length - bStr.length;
}
function isDigit2(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}
var DIGIT_0, DIGIT_9;
var init_naturalCompare = __esm({
  "node_modules/graphql/jsutils/naturalCompare.mjs"() {
    DIGIT_0 = 48;
    DIGIT_9 = 57;
  }
});

// node_modules/graphql/jsutils/suggestionList.mjs
function suggestionList(input, options) {
  const optionsByDistance = /* @__PURE__ */ Object.create(null);
  const lexicalDistance = new LexicalDistance(input);
  const threshold = Math.floor(input.length * 0.4) + 1;
  for (const option of options) {
    const distance = lexicalDistance.measure(option, threshold);
    if (distance !== void 0) {
      optionsByDistance[option] = distance;
    }
  }
  return Object.keys(optionsByDistance).sort((a, b) => {
    const distanceDiff = optionsByDistance[a] - optionsByDistance[b];
    return distanceDiff !== 0 ? distanceDiff : naturalCompare(a, b);
  });
}
function stringToArray(str) {
  const strLength = str.length;
  const array = new Array(strLength);
  for (let i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}
var LexicalDistance;
var init_suggestionList = __esm({
  "node_modules/graphql/jsutils/suggestionList.mjs"() {
    init_naturalCompare();
    LexicalDistance = class {
      constructor(input) {
        this._input = input;
        this._inputLowerCase = input.toLowerCase();
        this._inputArray = stringToArray(this._inputLowerCase);
        this._rows = [
          new Array(input.length + 1).fill(0),
          new Array(input.length + 1).fill(0),
          new Array(input.length + 1).fill(0)
        ];
      }
      measure(option, threshold) {
        if (this._input === option) {
          return 0;
        }
        const optionLowerCase = option.toLowerCase();
        if (this._inputLowerCase === optionLowerCase) {
          return 1;
        }
        let a = stringToArray(optionLowerCase);
        let b = this._inputArray;
        if (a.length < b.length) {
          const tmp = a;
          a = b;
          b = tmp;
        }
        const aLength = a.length;
        const bLength = b.length;
        if (aLength - bLength > threshold) {
          return void 0;
        }
        const rows = this._rows;
        for (let j = 0; j <= bLength; j++) {
          rows[0][j] = j;
        }
        for (let i = 1; i <= aLength; i++) {
          const upRow = rows[(i - 1) % 3];
          const currentRow = rows[i % 3];
          let smallestCell = currentRow[0] = i;
          for (let j = 1; j <= bLength; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            let currentCell = Math.min(
              upRow[j] + 1,
              // delete
              currentRow[j - 1] + 1,
              // insert
              upRow[j - 1] + cost
              // substitute
            );
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
              const doubleDiagonalCell = rows[(i - 2) % 3][j - 2];
              currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
            }
            if (currentCell < smallestCell) {
              smallestCell = currentCell;
            }
            currentRow[j] = currentCell;
          }
          if (smallestCell > threshold) {
            return void 0;
          }
        }
        const distance = rows[aLength % 3][bLength];
        return distance <= threshold ? distance : void 0;
      }
    };
  }
});

// node_modules/graphql/jsutils/toObjMap.mjs
function toObjMap(obj) {
  if (obj == null) {
    return /* @__PURE__ */ Object.create(null);
  }
  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }
  const map = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of Object.entries(obj)) {
    map[key] = value;
  }
  return map;
}
var init_toObjMap = __esm({
  "node_modules/graphql/jsutils/toObjMap.mjs"() {
  }
});

// node_modules/graphql/language/printString.mjs
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
}
function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
}
var escapedRegExp, escapeSequences;
var init_printString = __esm({
  "node_modules/graphql/language/printString.mjs"() {
    escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
    escapeSequences = [
      "\\u0000",
      "\\u0001",
      "\\u0002",
      "\\u0003",
      "\\u0004",
      "\\u0005",
      "\\u0006",
      "\\u0007",
      "\\b",
      "\\t",
      "\\n",
      "\\u000B",
      "\\f",
      "\\r",
      "\\u000E",
      "\\u000F",
      "\\u0010",
      "\\u0011",
      "\\u0012",
      "\\u0013",
      "\\u0014",
      "\\u0015",
      "\\u0016",
      "\\u0017",
      "\\u0018",
      "\\u0019",
      "\\u001A",
      "\\u001B",
      "\\u001C",
      "\\u001D",
      "\\u001E",
      "\\u001F",
      "",
      "",
      '\\"',
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 2F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 3F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 4F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\\\",
      "",
      "",
      "",
      // 5F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 6F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\u007F",
      "\\u0080",
      "\\u0081",
      "\\u0082",
      "\\u0083",
      "\\u0084",
      "\\u0085",
      "\\u0086",
      "\\u0087",
      "\\u0088",
      "\\u0089",
      "\\u008A",
      "\\u008B",
      "\\u008C",
      "\\u008D",
      "\\u008E",
      "\\u008F",
      "\\u0090",
      "\\u0091",
      "\\u0092",
      "\\u0093",
      "\\u0094",
      "\\u0095",
      "\\u0096",
      "\\u0097",
      "\\u0098",
      "\\u0099",
      "\\u009A",
      "\\u009B",
      "\\u009C",
      "\\u009D",
      "\\u009E",
      "\\u009F"
    ];
  }
});

// node_modules/graphql/language/visitor.mjs
function visit(root2, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = /* @__PURE__ */ new Map();
  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  let stack = void 0;
  let inArray = Array.isArray(root2);
  let keys = [root2];
  let index = -1;
  let edits = [];
  let node = root2;
  let key = void 0;
  let parent = void 0;
  const path = [];
  const ancestors = [];
  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;
          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;
            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(node)
          );
          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];
      if (node === null || node === void 0) {
        continue;
      }
      path.push(key);
    }
    let result2;
    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;
      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
      const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
      result2 = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path, ancestors);
      if (result2 === BREAK) {
        break;
      }
      if (result2 === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result2 !== void 0) {
        edits.push([key, result2]);
        if (!isLeaving) {
          if (isNode(result2)) {
            node = result2;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }
    if (result2 === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    return edits[edits.length - 1][1];
  }
  return root2;
}
function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];
  if (typeof kindVisitor === "object") {
    return kindVisitor;
  } else if (typeof kindVisitor === "function") {
    return {
      enter: kindVisitor,
      leave: void 0
    };
  }
  return {
    enter: visitor.enter,
    leave: visitor.leave
  };
}
var BREAK;
var init_visitor = __esm({
  "node_modules/graphql/language/visitor.mjs"() {
    init_devAssert();
    init_inspect();
    init_ast();
    init_kinds();
    BREAK = Object.freeze({});
  }
});

// node_modules/graphql/language/printer.mjs
function print(ast) {
  return visit(ast, printDocASTReducer);
}
function join(maybeArray, separator = "") {
  var _maybeArray$filter$jo;
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter((x) => x).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap2("{\n", indent(join(array, "\n")), "\n}");
}
function wrap2(start, maybeString, end = "") {
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap2("  ", str.replace(/\n/g, "\n  "));
}
function hasMultilineItems(maybeArray) {
  var _maybeArray$some;
  return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
}
var MAX_LINE_LENGTH, printDocASTReducer;
var init_printer = __esm({
  "node_modules/graphql/language/printer.mjs"() {
    init_blockString();
    init_printString();
    init_visitor();
    MAX_LINE_LENGTH = 80;
    printDocASTReducer = {
      Name: {
        leave: (node) => node.value
      },
      Variable: {
        leave: (node) => "$" + node.name
      },
      // Document
      Document: {
        leave: (node) => join(node.definitions, "\n\n")
      },
      OperationDefinition: {
        leave(node) {
          const varDefs = wrap2("(", join(node.variableDefinitions, ", "), ")");
          const prefix = join(
            [
              node.operation,
              join([node.name, varDefs]),
              join(node.directives, " ")
            ],
            " "
          );
          return (prefix === "query" ? "" : prefix + " ") + node.selectionSet;
        }
      },
      VariableDefinition: {
        leave: ({ variable, type, defaultValue, directives }) => variable + ": " + type + wrap2(" = ", defaultValue) + wrap2(" ", join(directives, " "))
      },
      SelectionSet: {
        leave: ({ selections }) => block(selections)
      },
      Field: {
        leave({ alias, name, arguments: args, directives, selectionSet }) {
          const prefix = wrap2("", alias, ": ") + name;
          let argsLine = prefix + wrap2("(", join(args, ", "), ")");
          if (argsLine.length > MAX_LINE_LENGTH) {
            argsLine = prefix + wrap2("(\n", indent(join(args, "\n")), "\n)");
          }
          return join([argsLine, join(directives, " "), selectionSet], " ");
        }
      },
      Argument: {
        leave: ({ name, value }) => name + ": " + value
      },
      // Fragments
      FragmentSpread: {
        leave: ({ name, directives }) => "..." + name + wrap2(" ", join(directives, " "))
      },
      InlineFragment: {
        leave: ({ typeCondition, directives, selectionSet }) => join(
          [
            "...",
            wrap2("on ", typeCondition),
            join(directives, " "),
            selectionSet
          ],
          " "
        )
      },
      FragmentDefinition: {
        leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => (
          // or removed in the future.
          `fragment ${name}${wrap2("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap2("", join(directives, " "), " ")}` + selectionSet
        )
      },
      // Value
      IntValue: {
        leave: ({ value }) => value
      },
      FloatValue: {
        leave: ({ value }) => value
      },
      StringValue: {
        leave: ({ value, block: isBlockString }) => isBlockString ? printBlockString(value) : printString(value)
      },
      BooleanValue: {
        leave: ({ value }) => value ? "true" : "false"
      },
      NullValue: {
        leave: () => "null"
      },
      EnumValue: {
        leave: ({ value }) => value
      },
      ListValue: {
        leave: ({ values }) => "[" + join(values, ", ") + "]"
      },
      ObjectValue: {
        leave: ({ fields }) => "{" + join(fields, ", ") + "}"
      },
      ObjectField: {
        leave: ({ name, value }) => name + ": " + value
      },
      // Directive
      Directive: {
        leave: ({ name, arguments: args }) => "@" + name + wrap2("(", join(args, ", "), ")")
      },
      // Type
      NamedType: {
        leave: ({ name }) => name
      },
      ListType: {
        leave: ({ type }) => "[" + type + "]"
      },
      NonNullType: {
        leave: ({ type }) => type + "!"
      },
      // Type System Definitions
      SchemaDefinition: {
        leave: ({ description, directives, operationTypes }) => wrap2("", description, "\n") + join(["schema", join(directives, " "), block(operationTypes)], " ")
      },
      OperationTypeDefinition: {
        leave: ({ operation, type }) => operation + ": " + type
      },
      ScalarTypeDefinition: {
        leave: ({ description, name, directives }) => wrap2("", description, "\n") + join(["scalar", name, join(directives, " ")], " ")
      },
      ObjectTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) => wrap2("", description, "\n") + join(
          [
            "type",
            name,
            wrap2("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      FieldDefinition: {
        leave: ({ description, name, arguments: args, type, directives }) => wrap2("", description, "\n") + name + (hasMultilineItems(args) ? wrap2("(\n", indent(join(args, "\n")), "\n)") : wrap2("(", join(args, ", "), ")")) + ": " + type + wrap2(" ", join(directives, " "))
      },
      InputValueDefinition: {
        leave: ({ description, name, type, defaultValue, directives }) => wrap2("", description, "\n") + join(
          [name + ": " + type, wrap2("= ", defaultValue), join(directives, " ")],
          " "
        )
      },
      InterfaceTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) => wrap2("", description, "\n") + join(
          [
            "interface",
            name,
            wrap2("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      UnionTypeDefinition: {
        leave: ({ description, name, directives, types }) => wrap2("", description, "\n") + join(
          ["union", name, join(directives, " "), wrap2("= ", join(types, " | "))],
          " "
        )
      },
      EnumTypeDefinition: {
        leave: ({ description, name, directives, values }) => wrap2("", description, "\n") + join(["enum", name, join(directives, " "), block(values)], " ")
      },
      EnumValueDefinition: {
        leave: ({ description, name, directives }) => wrap2("", description, "\n") + join([name, join(directives, " ")], " ")
      },
      InputObjectTypeDefinition: {
        leave: ({ description, name, directives, fields }) => wrap2("", description, "\n") + join(["input", name, join(directives, " "), block(fields)], " ")
      },
      DirectiveDefinition: {
        leave: ({ description, name, arguments: args, repeatable, locations }) => wrap2("", description, "\n") + "directive @" + name + (hasMultilineItems(args) ? wrap2("(\n", indent(join(args, "\n")), "\n)") : wrap2("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
      },
      SchemaExtension: {
        leave: ({ directives, operationTypes }) => join(
          ["extend schema", join(directives, " "), block(operationTypes)],
          " "
        )
      },
      ScalarTypeExtension: {
        leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
      },
      ObjectTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(
          [
            "extend type",
            name,
            wrap2("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      InterfaceTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(
          [
            "extend interface",
            name,
            wrap2("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      UnionTypeExtension: {
        leave: ({ name, directives, types }) => join(
          [
            "extend union",
            name,
            join(directives, " "),
            wrap2("= ", join(types, " | "))
          ],
          " "
        )
      },
      EnumTypeExtension: {
        leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
      },
      InputObjectTypeExtension: {
        leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
      }
    };
  }
});

// node_modules/graphql/utilities/valueFromASTUntyped.mjs
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(
        (node) => valueFromASTUntyped(node, variables)
      );
    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        (field) => field.name.value,
        (field) => valueFromASTUntyped(field.value, variables)
      );
    case Kind.VARIABLE:
      return variables === null || variables === void 0 ? void 0 : variables[valueNode.name.value];
  }
}
var init_valueFromASTUntyped = __esm({
  "node_modules/graphql/utilities/valueFromASTUntyped.mjs"() {
    init_keyValMap();
    init_kinds();
  }
});

// node_modules/graphql/type/assertName.mjs
function assertName(name) {
  name != null || devAssert(false, "Must provide name.");
  typeof name === "string" || devAssert(false, "Expected name to be a string.");
  if (name.length === 0) {
    throw new GraphQLError("Expected name to be a non-empty string.");
  }
  for (let i = 1; i < name.length; ++i) {
    if (!isNameContinue(name.charCodeAt(i))) {
      throw new GraphQLError(
        `Names must only contain [_a-zA-Z0-9] but "${name}" does not.`
      );
    }
  }
  if (!isNameStart(name.charCodeAt(0))) {
    throw new GraphQLError(
      `Names must start with [_a-zA-Z] but "${name}" does not.`
    );
  }
  return name;
}
function assertEnumValueName(name) {
  if (name === "true" || name === "false" || name === "null") {
    throw new GraphQLError(`Enum values cannot be named: ${name}`);
  }
  return assertName(name);
}
var init_assertName = __esm({
  "node_modules/graphql/type/assertName.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_characterClasses();
  }
});

// node_modules/graphql/type/definition.mjs
function isType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
}
function isScalarType(type) {
  return instanceOf(type, GraphQLScalarType);
}
function isObjectType(type) {
  return instanceOf(type, GraphQLObjectType);
}
function isInterfaceType(type) {
  return instanceOf(type, GraphQLInterfaceType);
}
function isUnionType(type) {
  return instanceOf(type, GraphQLUnionType);
}
function isEnumType(type) {
  return instanceOf(type, GraphQLEnumType);
}
function isInputObjectType(type) {
  return instanceOf(type, GraphQLInputObjectType);
}
function isListType(type) {
  return instanceOf(type, GraphQLList);
}
function isNonNullType(type) {
  return instanceOf(type, GraphQLNonNull);
}
function isInputType(type) {
  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
}
function isOutputType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
}
function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}
function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
function getNamedType(type) {
  if (type) {
    let unwrappedType = type;
    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }
    return unwrappedType;
  }
}
function resolveReadonlyArrayThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function resolveObjMapThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function defineInterfaces(config) {
  var _config$interfaces;
  const interfaces = resolveReadonlyArrayThunk(
    (_config$interfaces = config.interfaces) !== null && _config$interfaces !== void 0 ? _config$interfaces : []
  );
  Array.isArray(interfaces) || devAssert(
    false,
    `${config.name} interfaces must be an Array or a function which returns an Array.`
  );
  return interfaces;
}
function defineFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    var _fieldConfig$args;
    isPlainObj(fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field config must be an object.`
    );
    fieldConfig.resolve == null || typeof fieldConfig.resolve === "function" || devAssert(
      false,
      `${config.name}.${fieldName} field resolver must be a function if provided, but got: ${inspect(fieldConfig.resolve)}.`
    );
    const argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== void 0 ? _fieldConfig$args : {};
    isPlainObj(argsConfig) || devAssert(
      false,
      `${config.name}.${fieldName} args must be an object with argument names as keys.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      args: defineArguments(argsConfig),
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function defineArguments(config) {
  return Object.entries(config).map(([argName, argConfig]) => ({
    name: assertName(argName),
    description: argConfig.description,
    type: argConfig.type,
    defaultValue: argConfig.defaultValue,
    deprecationReason: argConfig.deprecationReason,
    extensions: toObjMap(argConfig.extensions),
    astNode: argConfig.astNode
  }));
}
function isPlainObj(obj) {
  return isObjectLike(obj) && !Array.isArray(obj);
}
function fieldsToFieldsConfig(fields) {
  return mapValue(fields, (field) => ({
    description: field.description,
    type: field.type,
    args: argsToArgsConfig(field.args),
    resolve: field.resolve,
    subscribe: field.subscribe,
    deprecationReason: field.deprecationReason,
    extensions: field.extensions,
    astNode: field.astNode
  }));
}
function argsToArgsConfig(args) {
  return keyValMap(
    args,
    (arg) => arg.name,
    (arg) => ({
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode
    })
  );
}
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === void 0;
}
function defineTypes(config) {
  const types = resolveReadonlyArrayThunk(config.types);
  Array.isArray(types) || devAssert(
    false,
    `Must provide Array of types or a function which returns such an array for Union ${config.name}.`
  );
  return types;
}
function didYouMeanEnumValue(enumType, unknownValueStr) {
  const allNames = enumType.getValues().map((value) => value.name);
  const suggestedValues = suggestionList(unknownValueStr, allNames);
  return didYouMean("the enum value", suggestedValues);
}
function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) || devAssert(
    false,
    `${typeName} values must be an object with value names as keys.`
  );
  return Object.entries(valueMap).map(([valueName, valueConfig]) => {
    isPlainObj(valueConfig) || devAssert(
      false,
      `${typeName}.${valueName} must refer to an object with a "value" key representing an internal value but got: ${inspect(valueConfig)}.`
    );
    return {
      name: assertEnumValueName(valueName),
      description: valueConfig.description,
      value: valueConfig.value !== void 0 ? valueConfig.value : valueName,
      deprecationReason: valueConfig.deprecationReason,
      extensions: toObjMap(valueConfig.extensions),
      astNode: valueConfig.astNode
    };
  });
}
function defineInputFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    !("resolve" in fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field has a resolve property, but Input Types cannot define resolvers.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === void 0;
}
var GraphQLList, GraphQLNonNull, GraphQLScalarType, GraphQLObjectType, GraphQLInterfaceType, GraphQLUnionType, GraphQLEnumType, GraphQLInputObjectType;
var init_definition = __esm({
  "node_modules/graphql/type/definition.mjs"() {
    init_devAssert();
    init_didYouMean();
    init_identityFunc();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_keyMap();
    init_keyValMap();
    init_mapValue();
    init_suggestionList();
    init_toObjMap();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_valueFromASTUntyped();
    init_assertName();
    GraphQLList = class {
      constructor(ofType) {
        isType(ofType) || devAssert(false, `Expected ${inspect(ofType)} to be a GraphQL type.`);
        this.ofType = ofType;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLList";
      }
      toString() {
        return "[" + String(this.ofType) + "]";
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLNonNull = class {
      constructor(ofType) {
        isNullableType(ofType) || devAssert(
          false,
          `Expected ${inspect(ofType)} to be a GraphQL nullable type.`
        );
        this.ofType = ofType;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLNonNull";
      }
      toString() {
        return String(this.ofType) + "!";
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLScalarType = class {
      constructor(config) {
        var _config$parseValue, _config$serialize, _config$parseLiteral, _config$extensionASTN;
        const parseValue2 = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
        this.name = assertName(config.name);
        this.description = config.description;
        this.specifiedByURL = config.specifiedByURL;
        this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
        this.parseValue = parseValue2;
        this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : (node, variables) => parseValue2(valueFromASTUntyped(node, variables));
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
        config.specifiedByURL == null || typeof config.specifiedByURL === "string" || devAssert(
          false,
          `${this.name} must provide "specifiedByURL" as a string, but got: ${inspect(config.specifiedByURL)}.`
        );
        config.serialize == null || typeof config.serialize === "function" || devAssert(
          false,
          `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`
        );
        if (config.parseLiteral) {
          typeof config.parseValue === "function" && typeof config.parseLiteral === "function" || devAssert(
            false,
            `${this.name} must provide both "parseValue" and "parseLiteral" functions.`
          );
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLScalarType";
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          specifiedByURL: this.specifiedByURL,
          serialize: this.serialize,
          parseValue: this.parseValue,
          parseLiteral: this.parseLiteral,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLObjectType = class {
      constructor(config) {
        var _config$extensionASTN2;
        this.name = assertName(config.name);
        this.description = config.description;
        this.isTypeOf = config.isTypeOf;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN2 = config.extensionASTNodes) !== null && _config$extensionASTN2 !== void 0 ? _config$extensionASTN2 : [];
        this._fields = () => defineFieldMap(config);
        this._interfaces = () => defineInterfaces(config);
        config.isTypeOf == null || typeof config.isTypeOf === "function" || devAssert(
          false,
          `${this.name} must provide "isTypeOf" as a function, but got: ${inspect(config.isTypeOf)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLObjectType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      getInterfaces() {
        if (typeof this._interfaces === "function") {
          this._interfaces = this._interfaces();
        }
        return this._interfaces;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          interfaces: this.getInterfaces(),
          fields: fieldsToFieldsConfig(this.getFields()),
          isTypeOf: this.isTypeOf,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLInterfaceType = class {
      constructor(config) {
        var _config$extensionASTN3;
        this.name = assertName(config.name);
        this.description = config.description;
        this.resolveType = config.resolveType;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN3 = config.extensionASTNodes) !== null && _config$extensionASTN3 !== void 0 ? _config$extensionASTN3 : [];
        this._fields = defineFieldMap.bind(void 0, config);
        this._interfaces = defineInterfaces.bind(void 0, config);
        config.resolveType == null || typeof config.resolveType === "function" || devAssert(
          false,
          `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLInterfaceType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      getInterfaces() {
        if (typeof this._interfaces === "function") {
          this._interfaces = this._interfaces();
        }
        return this._interfaces;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          interfaces: this.getInterfaces(),
          fields: fieldsToFieldsConfig(this.getFields()),
          resolveType: this.resolveType,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLUnionType = class {
      constructor(config) {
        var _config$extensionASTN4;
        this.name = assertName(config.name);
        this.description = config.description;
        this.resolveType = config.resolveType;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN4 = config.extensionASTNodes) !== null && _config$extensionASTN4 !== void 0 ? _config$extensionASTN4 : [];
        this._types = defineTypes.bind(void 0, config);
        config.resolveType == null || typeof config.resolveType === "function" || devAssert(
          false,
          `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLUnionType";
      }
      getTypes() {
        if (typeof this._types === "function") {
          this._types = this._types();
        }
        return this._types;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          types: this.getTypes(),
          resolveType: this.resolveType,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLEnumType = class {
      /* <T> */
      constructor(config) {
        var _config$extensionASTN5;
        this.name = assertName(config.name);
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN5 = config.extensionASTNodes) !== null && _config$extensionASTN5 !== void 0 ? _config$extensionASTN5 : [];
        this._values = typeof config.values === "function" ? config.values : defineEnumValues(this.name, config.values);
        this._valueLookup = null;
        this._nameLookup = null;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLEnumType";
      }
      getValues() {
        if (typeof this._values === "function") {
          this._values = defineEnumValues(this.name, this._values());
        }
        return this._values;
      }
      getValue(name) {
        if (this._nameLookup === null) {
          this._nameLookup = keyMap(this.getValues(), (value) => value.name);
        }
        return this._nameLookup[name];
      }
      serialize(outputValue) {
        if (this._valueLookup === null) {
          this._valueLookup = new Map(
            this.getValues().map((enumValue2) => [enumValue2.value, enumValue2])
          );
        }
        const enumValue = this._valueLookup.get(outputValue);
        if (enumValue === void 0) {
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent value: ${inspect(outputValue)}`
          );
        }
        return enumValue.name;
      }
      parseValue(inputValue) {
        if (typeof inputValue !== "string") {
          const valueStr = inspect(inputValue);
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent non-string value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr)
          );
        }
        const enumValue = this.getValue(inputValue);
        if (enumValue == null) {
          throw new GraphQLError(
            `Value "${inputValue}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, inputValue)
          );
        }
        return enumValue.value;
      }
      parseLiteral(valueNode, _variables) {
        if (valueNode.kind !== Kind.ENUM) {
          const valueStr = print(valueNode);
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent non-enum value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr),
            {
              nodes: valueNode
            }
          );
        }
        const enumValue = this.getValue(valueNode.value);
        if (enumValue == null) {
          const valueStr = print(valueNode);
          throw new GraphQLError(
            `Value "${valueStr}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, valueStr),
            {
              nodes: valueNode
            }
          );
        }
        return enumValue.value;
      }
      toConfig() {
        const values = keyValMap(
          this.getValues(),
          (value) => value.name,
          (value) => ({
            description: value.description,
            value: value.value,
            deprecationReason: value.deprecationReason,
            extensions: value.extensions,
            astNode: value.astNode
          })
        );
        return {
          name: this.name,
          description: this.description,
          values,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLInputObjectType = class {
      constructor(config) {
        var _config$extensionASTN6, _config$isOneOf;
        this.name = assertName(config.name);
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN6 = config.extensionASTNodes) !== null && _config$extensionASTN6 !== void 0 ? _config$extensionASTN6 : [];
        this.isOneOf = (_config$isOneOf = config.isOneOf) !== null && _config$isOneOf !== void 0 ? _config$isOneOf : false;
        this._fields = defineInputFieldMap.bind(void 0, config);
      }
      get [Symbol.toStringTag]() {
        return "GraphQLInputObjectType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      toConfig() {
        const fields = mapValue(this.getFields(), (field) => ({
          description: field.description,
          type: field.type,
          defaultValue: field.defaultValue,
          deprecationReason: field.deprecationReason,
          extensions: field.extensions,
          astNode: field.astNode
        }));
        return {
          name: this.name,
          description: this.description,
          fields,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes,
          isOneOf: this.isOneOf
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
  }
});

// node_modules/graphql/utilities/typeComparators.mjs
function isTypeSubTypeOf(schema, maybeSubType, superType) {
  if (maybeSubType === superType) {
    return true;
  }
  if (isNonNullType(superType)) {
    if (isNonNullType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isNonNullType(maybeSubType)) {
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  }
  if (isListType(superType)) {
    if (isListType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isListType(maybeSubType)) {
    return false;
  }
  return isAbstractType(superType) && (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) && schema.isSubType(superType, maybeSubType);
}
function doTypesOverlap(schema, typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isAbstractType(typeA)) {
    if (isAbstractType(typeB)) {
      return schema.getPossibleTypes(typeA).some((type) => schema.isSubType(typeB, type));
    }
    return schema.isSubType(typeA, typeB);
  }
  if (isAbstractType(typeB)) {
    return schema.isSubType(typeB, typeA);
  }
  return false;
}
var init_typeComparators = __esm({
  "node_modules/graphql/utilities/typeComparators.mjs"() {
    init_definition();
  }
});

// node_modules/graphql/type/scalars.mjs
function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === "function") {
      const valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === "function") {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}
var GRAPHQL_MAX_INT, GRAPHQL_MIN_INT, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean, GraphQLID, specifiedScalarTypes;
var init_scalars = __esm({
  "node_modules/graphql/type/scalars.mjs"() {
    init_inspect();
    init_isObjectLike();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    GRAPHQL_MAX_INT = 2147483647;
    GRAPHQL_MIN_INT = -2147483648;
    GraphQLInt = new GraphQLScalarType({
      name: "Int",
      description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue ? 1 : 0;
        }
        let num = coercedValue;
        if (typeof coercedValue === "string" && coercedValue !== "") {
          num = Number(coercedValue);
        }
        if (typeof num !== "number" || !Number.isInteger(num)) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${inspect(coercedValue)}`
          );
        }
        if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            "Int cannot represent non 32-bit signed integer value: " + inspect(coercedValue)
          );
        }
        return num;
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "number" || !Number.isInteger(inputValue)) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${inspect(inputValue)}`
          );
        }
        if (inputValue > GRAPHQL_MAX_INT || inputValue < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            `Int cannot represent non 32-bit signed integer value: ${inputValue}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        const num = parseInt(valueNode.value, 10);
        if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            `Int cannot represent non 32-bit signed integer value: ${valueNode.value}`,
            {
              nodes: valueNode
            }
          );
        }
        return num;
      }
    });
    GraphQLFloat = new GraphQLScalarType({
      name: "Float",
      description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue ? 1 : 0;
        }
        let num = coercedValue;
        if (typeof coercedValue === "string" && coercedValue !== "") {
          num = Number(coercedValue);
        }
        if (typeof num !== "number" || !Number.isFinite(num)) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${inspect(coercedValue)}`
          );
        }
        return num;
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "number" || !Number.isFinite(inputValue)) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${print(valueNode)}`,
            valueNode
          );
        }
        return parseFloat(valueNode.value);
      }
    });
    GraphQLString = new GraphQLScalarType({
      name: "String",
      description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "string") {
          return coercedValue;
        }
        if (typeof coercedValue === "boolean") {
          return coercedValue ? "true" : "false";
        }
        if (typeof coercedValue === "number" && Number.isFinite(coercedValue)) {
          return coercedValue.toString();
        }
        throw new GraphQLError(
          `String cannot represent value: ${inspect(outputValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "string") {
          throw new GraphQLError(
            `String cannot represent a non string value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.STRING) {
          throw new GraphQLError(
            `String cannot represent a non string value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    GraphQLBoolean = new GraphQLScalarType({
      name: "Boolean",
      description: "The `Boolean` scalar type represents `true` or `false`.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue;
        }
        if (Number.isFinite(coercedValue)) {
          return coercedValue !== 0;
        }
        throw new GraphQLError(
          `Boolean cannot represent a non boolean value: ${inspect(coercedValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "boolean") {
          throw new GraphQLError(
            `Boolean cannot represent a non boolean value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.BOOLEAN) {
          throw new GraphQLError(
            `Boolean cannot represent a non boolean value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    GraphQLID = new GraphQLScalarType({
      name: "ID",
      description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "string") {
          return coercedValue;
        }
        if (Number.isInteger(coercedValue)) {
          return String(coercedValue);
        }
        throw new GraphQLError(
          `ID cannot represent value: ${inspect(outputValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue === "string") {
          return inputValue;
        }
        if (typeof inputValue === "number" && Number.isInteger(inputValue)) {
          return inputValue.toString();
        }
        throw new GraphQLError(`ID cannot represent value: ${inspect(inputValue)}`);
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            "ID cannot represent a non-string and non-integer value: " + print(valueNode),
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    specifiedScalarTypes = Object.freeze([
      GraphQLString,
      GraphQLInt,
      GraphQLFloat,
      GraphQLBoolean,
      GraphQLID
    ]);
  }
});

// node_modules/graphql/type/directives.mjs
function isDirective(directive) {
  return instanceOf(directive, GraphQLDirective);
}
var GraphQLDirective, GraphQLIncludeDirective, GraphQLSkipDirective, DEFAULT_DEPRECATION_REASON, GraphQLDeprecatedDirective, GraphQLSpecifiedByDirective, GraphQLOneOfDirective, specifiedDirectives;
var init_directives = __esm({
  "node_modules/graphql/type/directives.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_toObjMap();
    init_directiveLocation();
    init_assertName();
    init_definition();
    init_scalars();
    GraphQLDirective = class {
      constructor(config) {
        var _config$isRepeatable, _config$args;
        this.name = assertName(config.name);
        this.description = config.description;
        this.locations = config.locations;
        this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== void 0 ? _config$isRepeatable : false;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        Array.isArray(config.locations) || devAssert(false, `@${config.name} locations must be an Array.`);
        const args = (_config$args = config.args) !== null && _config$args !== void 0 ? _config$args : {};
        isObjectLike(args) && !Array.isArray(args) || devAssert(
          false,
          `@${config.name} args must be an object with argument names as keys.`
        );
        this.args = defineArguments(args);
      }
      get [Symbol.toStringTag]() {
        return "GraphQLDirective";
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          locations: this.locations,
          args: argsToArgsConfig(this.args),
          isRepeatable: this.isRepeatable,
          extensions: this.extensions,
          astNode: this.astNode
        };
      }
      toString() {
        return "@" + this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLIncludeDirective = new GraphQLDirective({
      name: "include",
      description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
      locations: [
        DirectiveLocation.FIELD,
        DirectiveLocation.FRAGMENT_SPREAD,
        DirectiveLocation.INLINE_FRAGMENT
      ],
      args: {
        if: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: "Included when true."
        }
      }
    });
    GraphQLSkipDirective = new GraphQLDirective({
      name: "skip",
      description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
      locations: [
        DirectiveLocation.FIELD,
        DirectiveLocation.FRAGMENT_SPREAD,
        DirectiveLocation.INLINE_FRAGMENT
      ],
      args: {
        if: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: "Skipped when true."
        }
      }
    });
    DEFAULT_DEPRECATION_REASON = "No longer supported";
    GraphQLDeprecatedDirective = new GraphQLDirective({
      name: "deprecated",
      description: "Marks an element of a GraphQL schema as no longer supported.",
      locations: [
        DirectiveLocation.FIELD_DEFINITION,
        DirectiveLocation.ARGUMENT_DEFINITION,
        DirectiveLocation.INPUT_FIELD_DEFINITION,
        DirectiveLocation.ENUM_VALUE
      ],
      args: {
        reason: {
          type: GraphQLString,
          description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
          defaultValue: DEFAULT_DEPRECATION_REASON
        }
      }
    });
    GraphQLSpecifiedByDirective = new GraphQLDirective({
      name: "specifiedBy",
      description: "Exposes a URL that specifies the behavior of this scalar.",
      locations: [DirectiveLocation.SCALAR],
      args: {
        url: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The URL that specifies the behavior of this scalar."
        }
      }
    });
    GraphQLOneOfDirective = new GraphQLDirective({
      name: "oneOf",
      description: "Indicates exactly one field must be supplied and this field must not be `null`.",
      locations: [DirectiveLocation.INPUT_OBJECT],
      args: {}
    });
    specifiedDirectives = Object.freeze([
      GraphQLIncludeDirective,
      GraphQLSkipDirective,
      GraphQLDeprecatedDirective,
      GraphQLSpecifiedByDirective,
      GraphQLOneOfDirective
    ]);
  }
});

// node_modules/graphql/jsutils/isIterableObject.mjs
function isIterableObject(maybeIterable) {
  return typeof maybeIterable === "object" && typeof (maybeIterable === null || maybeIterable === void 0 ? void 0 : maybeIterable[Symbol.iterator]) === "function";
}
var init_isIterableObject = __esm({
  "node_modules/graphql/jsutils/isIterableObject.mjs"() {
  }
});

// node_modules/graphql/utilities/astFromValue.mjs
function astFromValue(value, type) {
  if (isNonNullType(type)) {
    const astValue = astFromValue(value, type.ofType);
    if ((astValue === null || astValue === void 0 ? void 0 : astValue.kind) === Kind.NULL) {
      return null;
    }
    return astValue;
  }
  if (value === null) {
    return {
      kind: Kind.NULL
    };
  }
  if (value === void 0) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (isIterableObject(value)) {
      const valuesNodes = [];
      for (const item of value) {
        const itemNode = astFromValue(item, itemType);
        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }
      return {
        kind: Kind.LIST,
        values: valuesNodes
      };
    }
    return astFromValue(value, itemType);
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return null;
    }
    const fieldNodes = [];
    for (const field of Object.values(type.getFields())) {
      const fieldValue = astFromValue(value[field.name], field.type);
      if (fieldValue) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: field.name
          },
          value: fieldValue
        });
      }
    }
    return {
      kind: Kind.OBJECT,
      fields: fieldNodes
    };
  }
  if (isLeafType(type)) {
    const serialized = type.serialize(value);
    if (serialized == null) {
      return null;
    }
    if (typeof serialized === "boolean") {
      return {
        kind: Kind.BOOLEAN,
        value: serialized
      };
    }
    if (typeof serialized === "number" && Number.isFinite(serialized)) {
      const stringNum = String(serialized);
      return integerStringRegExp.test(stringNum) ? {
        kind: Kind.INT,
        value: stringNum
      } : {
        kind: Kind.FLOAT,
        value: stringNum
      };
    }
    if (typeof serialized === "string") {
      if (isEnumType(type)) {
        return {
          kind: Kind.ENUM,
          value: serialized
        };
      }
      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: Kind.INT,
          value: serialized
        };
      }
      return {
        kind: Kind.STRING,
        value: serialized
      };
    }
    throw new TypeError(`Cannot convert value to AST: ${inspect(serialized)}.`);
  }
  invariant4(false, "Unexpected input type: " + inspect(type));
}
var integerStringRegExp;
var init_astFromValue = __esm({
  "node_modules/graphql/utilities/astFromValue.mjs"() {
    init_inspect();
    init_invariant2();
    init_isIterableObject();
    init_isObjectLike();
    init_kinds();
    init_definition();
    init_scalars();
    integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;
  }
});

// node_modules/graphql/type/introspection.mjs
var __Schema, __Directive, __DirectiveLocation, __Type, __Field, __InputValue, __EnumValue, TypeKind, __TypeKind, SchemaMetaFieldDef, TypeMetaFieldDef, TypeNameMetaFieldDef, introspectionTypes;
var init_introspection = __esm({
  "node_modules/graphql/type/introspection.mjs"() {
    init_inspect();
    init_invariant2();
    init_directiveLocation();
    init_printer();
    init_astFromValue();
    init_definition();
    init_scalars();
    __Schema = new GraphQLObjectType({
      name: "__Schema",
      description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
      fields: () => ({
        description: {
          type: GraphQLString,
          resolve: (schema) => schema.description
        },
        types: {
          description: "A list of all types supported by this server.",
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
          resolve(schema) {
            return Object.values(schema.getTypeMap());
          }
        },
        queryType: {
          description: "The type that query operations will be rooted at.",
          type: new GraphQLNonNull(__Type),
          resolve: (schema) => schema.getQueryType()
        },
        mutationType: {
          description: "If this server supports mutation, the type that mutation operations will be rooted at.",
          type: __Type,
          resolve: (schema) => schema.getMutationType()
        },
        subscriptionType: {
          description: "If this server support subscription, the type that subscription operations will be rooted at.",
          type: __Type,
          resolve: (schema) => schema.getSubscriptionType()
        },
        directives: {
          description: "A list of all directives supported by this server.",
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__Directive))
          ),
          resolve: (schema) => schema.getDirectives()
        }
      })
    });
    __Directive = new GraphQLObjectType({
      name: "__Directive",
      description: "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (directive) => directive.name
        },
        description: {
          type: GraphQLString,
          resolve: (directive) => directive.description
        },
        isRepeatable: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (directive) => directive.isRepeatable
        },
        locations: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__DirectiveLocation))
          ),
          resolve: (directive) => directive.locations
        },
        args: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__InputValue))
          ),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(field, { includeDeprecated }) {
            return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
          }
        }
      })
    });
    __DirectiveLocation = new GraphQLEnumType({
      name: "__DirectiveLocation",
      description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
      values: {
        QUERY: {
          value: DirectiveLocation.QUERY,
          description: "Location adjacent to a query operation."
        },
        MUTATION: {
          value: DirectiveLocation.MUTATION,
          description: "Location adjacent to a mutation operation."
        },
        SUBSCRIPTION: {
          value: DirectiveLocation.SUBSCRIPTION,
          description: "Location adjacent to a subscription operation."
        },
        FIELD: {
          value: DirectiveLocation.FIELD,
          description: "Location adjacent to a field."
        },
        FRAGMENT_DEFINITION: {
          value: DirectiveLocation.FRAGMENT_DEFINITION,
          description: "Location adjacent to a fragment definition."
        },
        FRAGMENT_SPREAD: {
          value: DirectiveLocation.FRAGMENT_SPREAD,
          description: "Location adjacent to a fragment spread."
        },
        INLINE_FRAGMENT: {
          value: DirectiveLocation.INLINE_FRAGMENT,
          description: "Location adjacent to an inline fragment."
        },
        VARIABLE_DEFINITION: {
          value: DirectiveLocation.VARIABLE_DEFINITION,
          description: "Location adjacent to a variable definition."
        },
        SCHEMA: {
          value: DirectiveLocation.SCHEMA,
          description: "Location adjacent to a schema definition."
        },
        SCALAR: {
          value: DirectiveLocation.SCALAR,
          description: "Location adjacent to a scalar definition."
        },
        OBJECT: {
          value: DirectiveLocation.OBJECT,
          description: "Location adjacent to an object type definition."
        },
        FIELD_DEFINITION: {
          value: DirectiveLocation.FIELD_DEFINITION,
          description: "Location adjacent to a field definition."
        },
        ARGUMENT_DEFINITION: {
          value: DirectiveLocation.ARGUMENT_DEFINITION,
          description: "Location adjacent to an argument definition."
        },
        INTERFACE: {
          value: DirectiveLocation.INTERFACE,
          description: "Location adjacent to an interface definition."
        },
        UNION: {
          value: DirectiveLocation.UNION,
          description: "Location adjacent to a union definition."
        },
        ENUM: {
          value: DirectiveLocation.ENUM,
          description: "Location adjacent to an enum definition."
        },
        ENUM_VALUE: {
          value: DirectiveLocation.ENUM_VALUE,
          description: "Location adjacent to an enum value definition."
        },
        INPUT_OBJECT: {
          value: DirectiveLocation.INPUT_OBJECT,
          description: "Location adjacent to an input object type definition."
        },
        INPUT_FIELD_DEFINITION: {
          value: DirectiveLocation.INPUT_FIELD_DEFINITION,
          description: "Location adjacent to an input object field definition."
        }
      }
    });
    __Type = new GraphQLObjectType({
      name: "__Type",
      description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
      fields: () => ({
        kind: {
          type: new GraphQLNonNull(__TypeKind),
          resolve(type) {
            if (isScalarType(type)) {
              return TypeKind.SCALAR;
            }
            if (isObjectType(type)) {
              return TypeKind.OBJECT;
            }
            if (isInterfaceType(type)) {
              return TypeKind.INTERFACE;
            }
            if (isUnionType(type)) {
              return TypeKind.UNION;
            }
            if (isEnumType(type)) {
              return TypeKind.ENUM;
            }
            if (isInputObjectType(type)) {
              return TypeKind.INPUT_OBJECT;
            }
            if (isListType(type)) {
              return TypeKind.LIST;
            }
            if (isNonNullType(type)) {
              return TypeKind.NON_NULL;
            }
            invariant4(false, `Unexpected type: "${inspect(type)}".`);
          }
        },
        name: {
          type: GraphQLString,
          resolve: (type) => "name" in type ? type.name : void 0
        },
        description: {
          type: GraphQLString,
          resolve: (type) => (
            /* c8 ignore next */
            "description" in type ? type.description : void 0
          )
        },
        specifiedByURL: {
          type: GraphQLString,
          resolve: (obj) => "specifiedByURL" in obj ? obj.specifiedByURL : void 0
        },
        fields: {
          type: new GraphQLList(new GraphQLNonNull(__Field)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isObjectType(type) || isInterfaceType(type)) {
              const fields = Object.values(type.getFields());
              return includeDeprecated ? fields : fields.filter((field) => field.deprecationReason == null);
            }
          }
        },
        interfaces: {
          type: new GraphQLList(new GraphQLNonNull(__Type)),
          resolve(type) {
            if (isObjectType(type) || isInterfaceType(type)) {
              return type.getInterfaces();
            }
          }
        },
        possibleTypes: {
          type: new GraphQLList(new GraphQLNonNull(__Type)),
          resolve(type, _args, _context, { schema }) {
            if (isAbstractType(type)) {
              return schema.getPossibleTypes(type);
            }
          }
        },
        enumValues: {
          type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isEnumType(type)) {
              const values = type.getValues();
              return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
            }
          }
        },
        inputFields: {
          type: new GraphQLList(new GraphQLNonNull(__InputValue)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isInputObjectType(type)) {
              const values = Object.values(type.getFields());
              return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
            }
          }
        },
        ofType: {
          type: __Type,
          resolve: (type) => "ofType" in type ? type.ofType : void 0
        },
        isOneOf: {
          type: GraphQLBoolean,
          resolve: (type) => {
            if (isInputObjectType(type)) {
              return type.isOneOf;
            }
          }
        }
      })
    });
    __Field = new GraphQLObjectType({
      name: "__Field",
      description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (field) => field.name
        },
        description: {
          type: GraphQLString,
          resolve: (field) => field.description
        },
        args: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__InputValue))
          ),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(field, { includeDeprecated }) {
            return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
          }
        },
        type: {
          type: new GraphQLNonNull(__Type),
          resolve: (field) => field.type
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (field) => field.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (field) => field.deprecationReason
        }
      })
    });
    __InputValue = new GraphQLObjectType({
      name: "__InputValue",
      description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (inputValue) => inputValue.name
        },
        description: {
          type: GraphQLString,
          resolve: (inputValue) => inputValue.description
        },
        type: {
          type: new GraphQLNonNull(__Type),
          resolve: (inputValue) => inputValue.type
        },
        defaultValue: {
          type: GraphQLString,
          description: "A GraphQL-formatted string representing the default value for this input value.",
          resolve(inputValue) {
            const { type, defaultValue } = inputValue;
            const valueAST = astFromValue(defaultValue, type);
            return valueAST ? print(valueAST) : null;
          }
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (field) => field.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (obj) => obj.deprecationReason
        }
      })
    });
    __EnumValue = new GraphQLObjectType({
      name: "__EnumValue",
      description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (enumValue) => enumValue.name
        },
        description: {
          type: GraphQLString,
          resolve: (enumValue) => enumValue.description
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (enumValue) => enumValue.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (enumValue) => enumValue.deprecationReason
        }
      })
    });
    (function(TypeKind2) {
      TypeKind2["SCALAR"] = "SCALAR";
      TypeKind2["OBJECT"] = "OBJECT";
      TypeKind2["INTERFACE"] = "INTERFACE";
      TypeKind2["UNION"] = "UNION";
      TypeKind2["ENUM"] = "ENUM";
      TypeKind2["INPUT_OBJECT"] = "INPUT_OBJECT";
      TypeKind2["LIST"] = "LIST";
      TypeKind2["NON_NULL"] = "NON_NULL";
    })(TypeKind || (TypeKind = {}));
    __TypeKind = new GraphQLEnumType({
      name: "__TypeKind",
      description: "An enum describing what kind of type a given `__Type` is.",
      values: {
        SCALAR: {
          value: TypeKind.SCALAR,
          description: "Indicates this type is a scalar."
        },
        OBJECT: {
          value: TypeKind.OBJECT,
          description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
        },
        INTERFACE: {
          value: TypeKind.INTERFACE,
          description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
        },
        UNION: {
          value: TypeKind.UNION,
          description: "Indicates this type is a union. `possibleTypes` is a valid field."
        },
        ENUM: {
          value: TypeKind.ENUM,
          description: "Indicates this type is an enum. `enumValues` is a valid field."
        },
        INPUT_OBJECT: {
          value: TypeKind.INPUT_OBJECT,
          description: "Indicates this type is an input object. `inputFields` is a valid field."
        },
        LIST: {
          value: TypeKind.LIST,
          description: "Indicates this type is a list. `ofType` is a valid field."
        },
        NON_NULL: {
          value: TypeKind.NON_NULL,
          description: "Indicates this type is a non-null. `ofType` is a valid field."
        }
      }
    });
    SchemaMetaFieldDef = {
      name: "__schema",
      type: new GraphQLNonNull(__Schema),
      description: "Access the current type schema of this server.",
      args: [],
      resolve: (_source, _args, _context, { schema }) => schema,
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    TypeMetaFieldDef = {
      name: "__type",
      type: __Type,
      description: "Request the type information of a single type.",
      args: [
        {
          name: "name",
          description: void 0,
          type: new GraphQLNonNull(GraphQLString),
          defaultValue: void 0,
          deprecationReason: void 0,
          extensions: /* @__PURE__ */ Object.create(null),
          astNode: void 0
        }
      ],
      resolve: (_source, { name }, _context, { schema }) => schema.getType(name),
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    TypeNameMetaFieldDef = {
      name: "__typename",
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the current Object type at runtime.",
      args: [],
      resolve: (_source, _args, _context, { parentType }) => parentType.name,
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    introspectionTypes = Object.freeze([
      __Schema,
      __Directive,
      __DirectiveLocation,
      __Type,
      __Field,
      __InputValue,
      __EnumValue,
      __TypeKind
    ]);
  }
});

// node_modules/graphql/type/schema.mjs
function collectReferencedTypes(type, typeSet) {
  const namedType = getNamedType(type);
  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);
    if (isUnionType(namedType)) {
      for (const memberType of namedType.getTypes()) {
        collectReferencedTypes(memberType, typeSet);
      }
    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
      for (const interfaceType of namedType.getInterfaces()) {
        collectReferencedTypes(interfaceType, typeSet);
      }
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
        for (const arg of field.args) {
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if (isInputObjectType(namedType)) {
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
      }
    }
  }
  return typeSet;
}
var GraphQLSchema;
var init_schema = __esm({
  "node_modules/graphql/type/schema.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_toObjMap();
    init_ast();
    init_definition();
    init_directives();
    init_introspection();
    GraphQLSchema = class {
      // Used as a cache for validateSchema().
      constructor(config) {
        var _config$extensionASTN, _config$directives;
        this.__validationErrors = config.assumeValid === true ? [] : void 0;
        isObjectLike(config) || devAssert(false, "Must provide configuration object.");
        !config.types || Array.isArray(config.types) || devAssert(
          false,
          `"types" must be Array if provided but got: ${inspect(config.types)}.`
        );
        !config.directives || Array.isArray(config.directives) || devAssert(
          false,
          `"directives" must be Array if provided but got: ${inspect(config.directives)}.`
        );
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
        this._queryType = config.query;
        this._mutationType = config.mutation;
        this._subscriptionType = config.subscription;
        this._directives = (_config$directives = config.directives) !== null && _config$directives !== void 0 ? _config$directives : specifiedDirectives;
        const allReferencedTypes = new Set(config.types);
        if (config.types != null) {
          for (const type of config.types) {
            allReferencedTypes.delete(type);
            collectReferencedTypes(type, allReferencedTypes);
          }
        }
        if (this._queryType != null) {
          collectReferencedTypes(this._queryType, allReferencedTypes);
        }
        if (this._mutationType != null) {
          collectReferencedTypes(this._mutationType, allReferencedTypes);
        }
        if (this._subscriptionType != null) {
          collectReferencedTypes(this._subscriptionType, allReferencedTypes);
        }
        for (const directive of this._directives) {
          if (isDirective(directive)) {
            for (const arg of directive.args) {
              collectReferencedTypes(arg.type, allReferencedTypes);
            }
          }
        }
        collectReferencedTypes(__Schema, allReferencedTypes);
        this._typeMap = /* @__PURE__ */ Object.create(null);
        this._subTypeMap = /* @__PURE__ */ Object.create(null);
        this._implementationsMap = /* @__PURE__ */ Object.create(null);
        for (const namedType of allReferencedTypes) {
          if (namedType == null) {
            continue;
          }
          const typeName = namedType.name;
          typeName || devAssert(
            false,
            "One of the provided types for building the Schema is missing a name."
          );
          if (this._typeMap[typeName] !== void 0) {
            throw new Error(
              `Schema must contain uniquely named types but contains multiple types named "${typeName}".`
            );
          }
          this._typeMap[typeName] = namedType;
          if (isInterfaceType(namedType)) {
            for (const iface of namedType.getInterfaces()) {
              if (isInterfaceType(iface)) {
                let implementations = this._implementationsMap[iface.name];
                if (implementations === void 0) {
                  implementations = this._implementationsMap[iface.name] = {
                    objects: [],
                    interfaces: []
                  };
                }
                implementations.interfaces.push(namedType);
              }
            }
          } else if (isObjectType(namedType)) {
            for (const iface of namedType.getInterfaces()) {
              if (isInterfaceType(iface)) {
                let implementations = this._implementationsMap[iface.name];
                if (implementations === void 0) {
                  implementations = this._implementationsMap[iface.name] = {
                    objects: [],
                    interfaces: []
                  };
                }
                implementations.objects.push(namedType);
              }
            }
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLSchema";
      }
      getQueryType() {
        return this._queryType;
      }
      getMutationType() {
        return this._mutationType;
      }
      getSubscriptionType() {
        return this._subscriptionType;
      }
      getRootType(operation) {
        switch (operation) {
          case OperationTypeNode.QUERY:
            return this.getQueryType();
          case OperationTypeNode.MUTATION:
            return this.getMutationType();
          case OperationTypeNode.SUBSCRIPTION:
            return this.getSubscriptionType();
        }
      }
      getTypeMap() {
        return this._typeMap;
      }
      getType(name) {
        return this.getTypeMap()[name];
      }
      getPossibleTypes(abstractType) {
        return isUnionType(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
      }
      getImplementations(interfaceType) {
        const implementations = this._implementationsMap[interfaceType.name];
        return implementations !== null && implementations !== void 0 ? implementations : {
          objects: [],
          interfaces: []
        };
      }
      isSubType(abstractType, maybeSubType) {
        let map = this._subTypeMap[abstractType.name];
        if (map === void 0) {
          map = /* @__PURE__ */ Object.create(null);
          if (isUnionType(abstractType)) {
            for (const type of abstractType.getTypes()) {
              map[type.name] = true;
            }
          } else {
            const implementations = this.getImplementations(abstractType);
            for (const type of implementations.objects) {
              map[type.name] = true;
            }
            for (const type of implementations.interfaces) {
              map[type.name] = true;
            }
          }
          this._subTypeMap[abstractType.name] = map;
        }
        return map[maybeSubType.name] !== void 0;
      }
      getDirectives() {
        return this._directives;
      }
      getDirective(name) {
        return this.getDirectives().find((directive) => directive.name === name);
      }
      toConfig() {
        return {
          description: this.description,
          query: this.getQueryType(),
          mutation: this.getMutationType(),
          subscription: this.getSubscriptionType(),
          types: Object.values(this.getTypeMap()),
          directives: this.getDirectives(),
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes,
          assumeValid: this.__validationErrors !== void 0
        };
      }
    };
  }
});

// node_modules/graphql/type/validate.mjs
var init_validate = __esm({
  "node_modules/graphql/type/validate.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_ast();
    init_typeComparators();
    init_definition();
    init_directives();
    init_introspection();
    init_schema();
  }
});

// node_modules/graphql/utilities/typeFromAST.mjs
function typeFromAST(schema, typeNode) {
  switch (typeNode.kind) {
    case Kind.LIST_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLList(innerType);
    }
    case Kind.NON_NULL_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLNonNull(innerType);
    }
    case Kind.NAMED_TYPE:
      return schema.getType(typeNode.name.value);
  }
}
var init_typeFromAST = __esm({
  "node_modules/graphql/utilities/typeFromAST.mjs"() {
    init_kinds();
    init_definition();
  }
});

// node_modules/graphql/utilities/TypeInfo.mjs
function getFieldDef(schema, parentType, fieldNode) {
  const name = fieldNode.name.value;
  if (name === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  }
  if (name === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  }
  if (name === TypeNameMetaFieldDef.name && isCompositeType(parentType)) {
    return TypeNameMetaFieldDef;
  }
  if (isObjectType(parentType) || isInterfaceType(parentType)) {
    return parentType.getFields()[name];
  }
}
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter(...args) {
      const node = args[0];
      typeInfo.enter(node);
      const fn = getEnterLeaveForKind(visitor, node.kind).enter;
      if (fn) {
        const result2 = fn.apply(visitor, args);
        if (result2 !== void 0) {
          typeInfo.leave(node);
          if (isNode(result2)) {
            typeInfo.enter(result2);
          }
        }
        return result2;
      }
    },
    leave(...args) {
      const node = args[0];
      const fn = getEnterLeaveForKind(visitor, node.kind).leave;
      let result2;
      if (fn) {
        result2 = fn.apply(visitor, args);
      }
      typeInfo.leave(node);
      return result2;
    }
  };
}
var TypeInfo;
var init_TypeInfo = __esm({
  "node_modules/graphql/utilities/TypeInfo.mjs"() {
    init_ast();
    init_kinds();
    init_visitor();
    init_definition();
    init_introspection();
    init_typeFromAST();
    TypeInfo = class {
      constructor(schema, initialType, getFieldDefFn) {
        this._schema = schema;
        this._typeStack = [];
        this._parentTypeStack = [];
        this._inputTypeStack = [];
        this._fieldDefStack = [];
        this._defaultValueStack = [];
        this._directive = null;
        this._argument = null;
        this._enumValue = null;
        this._getFieldDef = getFieldDefFn !== null && getFieldDefFn !== void 0 ? getFieldDefFn : getFieldDef;
        if (initialType) {
          if (isInputType(initialType)) {
            this._inputTypeStack.push(initialType);
          }
          if (isCompositeType(initialType)) {
            this._parentTypeStack.push(initialType);
          }
          if (isOutputType(initialType)) {
            this._typeStack.push(initialType);
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "TypeInfo";
      }
      getType() {
        if (this._typeStack.length > 0) {
          return this._typeStack[this._typeStack.length - 1];
        }
      }
      getParentType() {
        if (this._parentTypeStack.length > 0) {
          return this._parentTypeStack[this._parentTypeStack.length - 1];
        }
      }
      getInputType() {
        if (this._inputTypeStack.length > 0) {
          return this._inputTypeStack[this._inputTypeStack.length - 1];
        }
      }
      getParentInputType() {
        if (this._inputTypeStack.length > 1) {
          return this._inputTypeStack[this._inputTypeStack.length - 2];
        }
      }
      getFieldDef() {
        if (this._fieldDefStack.length > 0) {
          return this._fieldDefStack[this._fieldDefStack.length - 1];
        }
      }
      getDefaultValue() {
        if (this._defaultValueStack.length > 0) {
          return this._defaultValueStack[this._defaultValueStack.length - 1];
        }
      }
      getDirective() {
        return this._directive;
      }
      getArgument() {
        return this._argument;
      }
      getEnumValue() {
        return this._enumValue;
      }
      enter(node) {
        const schema = this._schema;
        switch (node.kind) {
          case Kind.SELECTION_SET: {
            const namedType = getNamedType(this.getType());
            this._parentTypeStack.push(
              isCompositeType(namedType) ? namedType : void 0
            );
            break;
          }
          case Kind.FIELD: {
            const parentType = this.getParentType();
            let fieldDef;
            let fieldType;
            if (parentType) {
              fieldDef = this._getFieldDef(schema, parentType, node);
              if (fieldDef) {
                fieldType = fieldDef.type;
              }
            }
            this._fieldDefStack.push(fieldDef);
            this._typeStack.push(isOutputType(fieldType) ? fieldType : void 0);
            break;
          }
          case Kind.DIRECTIVE:
            this._directive = schema.getDirective(node.name.value);
            break;
          case Kind.OPERATION_DEFINITION: {
            const rootType = schema.getRootType(node.operation);
            this._typeStack.push(isObjectType(rootType) ? rootType : void 0);
            break;
          }
          case Kind.INLINE_FRAGMENT:
          case Kind.FRAGMENT_DEFINITION: {
            const typeConditionAST = node.typeCondition;
            const outputType = typeConditionAST ? typeFromAST(schema, typeConditionAST) : getNamedType(this.getType());
            this._typeStack.push(isOutputType(outputType) ? outputType : void 0);
            break;
          }
          case Kind.VARIABLE_DEFINITION: {
            const inputType = typeFromAST(schema, node.type);
            this._inputTypeStack.push(
              isInputType(inputType) ? inputType : void 0
            );
            break;
          }
          case Kind.ARGUMENT: {
            var _this$getDirective;
            let argDef;
            let argType;
            const fieldOrDirective = (_this$getDirective = this.getDirective()) !== null && _this$getDirective !== void 0 ? _this$getDirective : this.getFieldDef();
            if (fieldOrDirective) {
              argDef = fieldOrDirective.args.find(
                (arg) => arg.name === node.name.value
              );
              if (argDef) {
                argType = argDef.type;
              }
            }
            this._argument = argDef;
            this._defaultValueStack.push(argDef ? argDef.defaultValue : void 0);
            this._inputTypeStack.push(isInputType(argType) ? argType : void 0);
            break;
          }
          case Kind.LIST: {
            const listType = getNullableType(this.getInputType());
            const itemType = isListType(listType) ? listType.ofType : listType;
            this._defaultValueStack.push(void 0);
            this._inputTypeStack.push(isInputType(itemType) ? itemType : void 0);
            break;
          }
          case Kind.OBJECT_FIELD: {
            const objectType = getNamedType(this.getInputType());
            let inputFieldType;
            let inputField;
            if (isInputObjectType(objectType)) {
              inputField = objectType.getFields()[node.name.value];
              if (inputField) {
                inputFieldType = inputField.type;
              }
            }
            this._defaultValueStack.push(
              inputField ? inputField.defaultValue : void 0
            );
            this._inputTypeStack.push(
              isInputType(inputFieldType) ? inputFieldType : void 0
            );
            break;
          }
          case Kind.ENUM: {
            const enumType = getNamedType(this.getInputType());
            let enumValue;
            if (isEnumType(enumType)) {
              enumValue = enumType.getValue(node.value);
            }
            this._enumValue = enumValue;
            break;
          }
          default:
        }
      }
      leave(node) {
        switch (node.kind) {
          case Kind.SELECTION_SET:
            this._parentTypeStack.pop();
            break;
          case Kind.FIELD:
            this._fieldDefStack.pop();
            this._typeStack.pop();
            break;
          case Kind.DIRECTIVE:
            this._directive = null;
            break;
          case Kind.OPERATION_DEFINITION:
          case Kind.INLINE_FRAGMENT:
          case Kind.FRAGMENT_DEFINITION:
            this._typeStack.pop();
            break;
          case Kind.VARIABLE_DEFINITION:
            this._inputTypeStack.pop();
            break;
          case Kind.ARGUMENT:
            this._argument = null;
            this._defaultValueStack.pop();
            this._inputTypeStack.pop();
            break;
          case Kind.LIST:
          case Kind.OBJECT_FIELD:
            this._defaultValueStack.pop();
            this._inputTypeStack.pop();
            break;
          case Kind.ENUM:
            this._enumValue = null;
            break;
          default:
        }
      }
    };
  }
});

// node_modules/graphql/language/predicates.mjs
function isExecutableDefinitionNode(node) {
  return node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;
}
function isSelectionNode(node) {
  return node.kind === Kind.FIELD || node.kind === Kind.FRAGMENT_SPREAD || node.kind === Kind.INLINE_FRAGMENT;
}
function isTypeSystemDefinitionNode(node) {
  return node.kind === Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === Kind.DIRECTIVE_DEFINITION;
}
function isTypeDefinitionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION || node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION || node.kind === Kind.UNION_TYPE_DEFINITION || node.kind === Kind.ENUM_TYPE_DEFINITION || node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
function isTypeSystemExtensionNode(node) {
  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION || node.kind === Kind.OBJECT_TYPE_EXTENSION || node.kind === Kind.INTERFACE_TYPE_EXTENSION || node.kind === Kind.UNION_TYPE_EXTENSION || node.kind === Kind.ENUM_TYPE_EXTENSION || node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
}
var init_predicates = __esm({
  "node_modules/graphql/language/predicates.mjs"() {
    init_kinds();
  }
});

// node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
function ExecutableDefinitionsRule(context) {
  return {
    Document(node) {
      for (const definition of node.definitions) {
        if (!isExecutableDefinitionNode(definition)) {
          const defName = definition.kind === Kind.SCHEMA_DEFINITION || definition.kind === Kind.SCHEMA_EXTENSION ? "schema" : '"' + definition.name.value + '"';
          context.reportError(
            new GraphQLError(`The ${defName} definition is not executable.`, {
              nodes: definition
            })
          );
        }
      }
      return false;
    }
  };
}
var init_ExecutableDefinitionsRule = __esm({
  "node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_predicates();
  }
});

// node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
function FieldsOnCorrectTypeRule(context) {
  return {
    Field(node) {
      const type = context.getParentType();
      if (type) {
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          const schema = context.getSchema();
          const fieldName = node.name.value;
          let suggestion = didYouMean(
            "to use an inline fragment on",
            getSuggestedTypeNames(schema, type, fieldName)
          );
          if (suggestion === "") {
            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
          }
          context.reportError(
            new GraphQLError(
              `Cannot query field "${fieldName}" on type "${type.name}".` + suggestion,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}
function getSuggestedTypeNames(schema, type, fieldName) {
  if (!isAbstractType(type)) {
    return [];
  }
  const suggestedTypes = /* @__PURE__ */ new Set();
  const usageCount = /* @__PURE__ */ Object.create(null);
  for (const possibleType of schema.getPossibleTypes(type)) {
    if (!possibleType.getFields()[fieldName]) {
      continue;
    }
    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;
    for (const possibleInterface of possibleType.getInterfaces()) {
      var _usageCount$possibleI;
      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      }
      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== void 0 ? _usageCount$possibleI : 0) + 1;
    }
  }
  return [...suggestedTypes].sort((typeA, typeB) => {
    const usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];
    if (usageCountDiff !== 0) {
      return usageCountDiff;
    }
    if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
      return -1;
    }
    if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
      return 1;
    }
    return naturalCompare(typeA.name, typeB.name);
  }).map((x) => x.name);
}
function getSuggestedFieldNames(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type)) {
    const possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  }
  return [];
}
var init_FieldsOnCorrectTypeRule = __esm({
  "node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs"() {
    init_didYouMean();
    init_naturalCompare();
    init_suggestionList();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
function FragmentsOnCompositeTypesRule(context) {
  return {
    InlineFragment(node) {
      const typeCondition = node.typeCondition;
      if (typeCondition) {
        const type = typeFromAST(context.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          const typeStr = print(typeCondition);
          context.reportError(
            new GraphQLError(
              `Fragment cannot condition on non composite type "${typeStr}".`,
              {
                nodes: typeCondition
              }
            )
          );
        }
      }
    },
    FragmentDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        const typeStr = print(node.typeCondition);
        context.reportError(
          new GraphQLError(
            `Fragment "${node.name.value}" cannot condition on non composite type "${typeStr}".`,
            {
              nodes: node.typeCondition
            }
          )
        );
      }
    }
  };
}
var init_FragmentsOnCompositeTypesRule = __esm({
  "node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs"() {
    init_GraphQLError();
    init_printer();
    init_definition();
    init_typeFromAST();
  }
});

// node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
function KnownArgumentNamesRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...KnownArgumentNamesOnDirectivesRule(context),
    Argument(argNode) {
      const argDef = context.getArgument();
      const fieldDef = context.getFieldDef();
      const parentType = context.getParentType();
      if (!argDef && fieldDef && parentType) {
        const argName = argNode.name.value;
        const knownArgsNames = fieldDef.args.map((arg) => arg.name);
        const suggestions = suggestionList(argName, knownArgsNames);
        context.reportError(
          new GraphQLError(
            `Unknown argument "${argName}" on field "${parentType.name}.${fieldDef.name}".` + didYouMean(suggestions),
            {
              nodes: argNode
            }
          )
        );
      }
    }
  };
}
function KnownArgumentNamesOnDirectivesRule(context) {
  const directiveArgs = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    directiveArgs[directive.name] = directive.args.map((arg) => arg.name);
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      directiveArgs[def.name.value] = argsNodes.map((arg) => arg.name.value);
    }
  }
  return {
    Directive(directiveNode) {
      const directiveName = directiveNode.name.value;
      const knownArgs = directiveArgs[directiveName];
      if (directiveNode.arguments && knownArgs) {
        for (const argNode of directiveNode.arguments) {
          const argName = argNode.name.value;
          if (!knownArgs.includes(argName)) {
            const suggestions = suggestionList(argName, knownArgs);
            context.reportError(
              new GraphQLError(
                `Unknown argument "${argName}" on directive "@${directiveName}".` + didYouMean(suggestions),
                {
                  nodes: argNode
                }
              )
            );
          }
        }
      }
      return false;
    }
  };
}
var init_KnownArgumentNamesRule = __esm({
  "node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs"() {
    init_didYouMean();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_directives();
  }
});

// node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
function KnownDirectivesRule(context) {
  const locationsMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    locationsMap[directive.name] = directive.locations;
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map((name) => name.value);
    }
  }
  return {
    Directive(node, _key, _parent, _path, ancestors) {
      const name = node.name.value;
      const locations = locationsMap[name];
      if (!locations) {
        context.reportError(
          new GraphQLError(`Unknown directive "@${name}".`, {
            nodes: node
          })
        );
        return;
      }
      const candidateLocation = getDirectiveLocationForASTPath(ancestors);
      if (candidateLocation && !locations.includes(candidateLocation)) {
        context.reportError(
          new GraphQLError(
            `Directive "@${name}" may not be used on ${candidateLocation}.`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getDirectiveLocationForASTPath(ancestors) {
  const appliedTo = ancestors[ancestors.length - 1];
  "kind" in appliedTo || invariant4(false);
  switch (appliedTo.kind) {
    case Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);
    case Kind.FIELD:
      return DirectiveLocation.FIELD;
    case Kind.FRAGMENT_SPREAD:
      return DirectiveLocation.FRAGMENT_SPREAD;
    case Kind.INLINE_FRAGMENT:
      return DirectiveLocation.INLINE_FRAGMENT;
    case Kind.FRAGMENT_DEFINITION:
      return DirectiveLocation.FRAGMENT_DEFINITION;
    case Kind.VARIABLE_DEFINITION:
      return DirectiveLocation.VARIABLE_DEFINITION;
    case Kind.SCHEMA_DEFINITION:
    case Kind.SCHEMA_EXTENSION:
      return DirectiveLocation.SCHEMA;
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_EXTENSION:
      return DirectiveLocation.SCALAR;
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.OBJECT;
    case Kind.FIELD_DEFINITION:
      return DirectiveLocation.FIELD_DEFINITION;
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_EXTENSION:
      return DirectiveLocation.INTERFACE;
    case Kind.UNION_TYPE_DEFINITION:
    case Kind.UNION_TYPE_EXTENSION:
      return DirectiveLocation.UNION;
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_EXTENSION:
      return DirectiveLocation.ENUM;
    case Kind.ENUM_VALUE_DEFINITION:
      return DirectiveLocation.ENUM_VALUE;
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.INPUT_OBJECT;
    case Kind.INPUT_VALUE_DEFINITION: {
      const parentNode = ancestors[ancestors.length - 3];
      "kind" in parentNode || invariant4(false);
      return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION ? DirectiveLocation.INPUT_FIELD_DEFINITION : DirectiveLocation.ARGUMENT_DEFINITION;
    }
    default:
      invariant4(false, "Unexpected kind: " + inspect(appliedTo.kind));
  }
}
function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case OperationTypeNode.QUERY:
      return DirectiveLocation.QUERY;
    case OperationTypeNode.MUTATION:
      return DirectiveLocation.MUTATION;
    case OperationTypeNode.SUBSCRIPTION:
      return DirectiveLocation.SUBSCRIPTION;
  }
}
var init_KnownDirectivesRule = __esm({
  "node_modules/graphql/validation/rules/KnownDirectivesRule.mjs"() {
    init_inspect();
    init_invariant2();
    init_GraphQLError();
    init_ast();
    init_directiveLocation();
    init_kinds();
    init_directives();
  }
});

// node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
function KnownFragmentNamesRule(context) {
  return {
    FragmentSpread(node) {
      const fragmentName = node.name.value;
      const fragment = context.getFragment(fragmentName);
      if (!fragment) {
        context.reportError(
          new GraphQLError(`Unknown fragment "${fragmentName}".`, {
            nodes: node.name
          })
        );
      }
    }
  };
}
var init_KnownFragmentNamesRule = __esm({
  "node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
function KnownTypeNamesRule(context) {
  const schema = context.getSchema();
  const existingTypesMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = true;
    }
  }
  const typeNames = [
    ...Object.keys(existingTypesMap),
    ...Object.keys(definedTypes)
  ];
  return {
    NamedType(node, _1, parent, _2, ancestors) {
      const typeName = node.name.value;
      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;
        const definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0 ? _ancestors$ : parent;
        const isSDL = definitionNode != null && isSDLNode(definitionNode);
        if (isSDL && standardTypeNames.includes(typeName)) {
          return;
        }
        const suggestedTypes = suggestionList(
          typeName,
          isSDL ? standardTypeNames.concat(typeNames) : typeNames
        );
        context.reportError(
          new GraphQLError(
            `Unknown type "${typeName}".` + didYouMean(suggestedTypes),
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function isSDLNode(value) {
  return "kind" in value && (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value));
}
var standardTypeNames;
var init_KnownTypeNamesRule = __esm({
  "node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs"() {
    init_didYouMean();
    init_suggestionList();
    init_GraphQLError();
    init_predicates();
    init_introspection();
    init_scalars();
    standardTypeNames = [...specifiedScalarTypes, ...introspectionTypes].map(
      (type) => type.name
    );
  }
});

// node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
function LoneAnonymousOperationRule(context) {
  let operationCount = 0;
  return {
    Document(node) {
      operationCount = node.definitions.filter(
        (definition) => definition.kind === Kind.OPERATION_DEFINITION
      ).length;
    },
    OperationDefinition(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(
          new GraphQLError(
            "This anonymous operation must be the only defined operation.",
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var init_LoneAnonymousOperationRule = __esm({
  "node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs"() {
    init_GraphQLError();
    init_kinds();
  }
});

// node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
function LoneSchemaDefinitionRule(context) {
  var _ref, _ref2, _oldSchema$astNode;
  const oldSchema = context.getSchema();
  const alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0 ? _oldSchema$astNode : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getQueryType()) !== null && _ref2 !== void 0 ? _ref2 : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getMutationType()) !== null && _ref !== void 0 ? _ref : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getSubscriptionType();
  let schemaDefinitionsCount = 0;
  return {
    SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(
          new GraphQLError(
            "Cannot define a new schema within a schema extension.",
            {
              nodes: node
            }
          )
        );
        return;
      }
      if (schemaDefinitionsCount > 0) {
        context.reportError(
          new GraphQLError("Must provide only one schema definition.", {
            nodes: node
          })
        );
      }
      ++schemaDefinitionsCount;
    }
  };
}
var init_LoneSchemaDefinitionRule = __esm({
  "node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/MaxIntrospectionDepthRule.mjs
function MaxIntrospectionDepthRule(context) {
  function checkDepth(node, visitedFragments = /* @__PURE__ */ Object.create(null), depth = 0) {
    if (node.kind === Kind.FRAGMENT_SPREAD) {
      const fragmentName = node.name.value;
      if (visitedFragments[fragmentName] === true) {
        return false;
      }
      const fragment = context.getFragment(fragmentName);
      if (!fragment) {
        return false;
      }
      try {
        visitedFragments[fragmentName] = true;
        return checkDepth(fragment, visitedFragments, depth);
      } finally {
        visitedFragments[fragmentName] = void 0;
      }
    }
    if (node.kind === Kind.FIELD && // check all introspection lists
    (node.name.value === "fields" || node.name.value === "interfaces" || node.name.value === "possibleTypes" || node.name.value === "inputFields")) {
      depth++;
      if (depth >= MAX_LISTS_DEPTH) {
        return true;
      }
    }
    if ("selectionSet" in node && node.selectionSet) {
      for (const child of node.selectionSet.selections) {
        if (checkDepth(child, visitedFragments, depth)) {
          return true;
        }
      }
    }
    return false;
  }
  return {
    Field(node) {
      if (node.name.value === "__schema" || node.name.value === "__type") {
        if (checkDepth(node)) {
          context.reportError(
            new GraphQLError("Maximum introspection depth exceeded", {
              nodes: [node]
            })
          );
          return false;
        }
      }
    }
  };
}
var MAX_LISTS_DEPTH;
var init_MaxIntrospectionDepthRule = __esm({
  "node_modules/graphql/validation/rules/MaxIntrospectionDepthRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    MAX_LISTS_DEPTH = 3;
  }
});

// node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs
function NoFragmentCyclesRule(context) {
  const visitedFrags = /* @__PURE__ */ Object.create(null);
  const spreadPath = [];
  const spreadPathIndexByName = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    }
  };
  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }
    const fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    const spreadNodes = context.getFragmentSpreads(fragment.selectionSet);
    if (spreadNodes.length === 0) {
      return;
    }
    spreadPathIndexByName[fragmentName] = spreadPath.length;
    for (const spreadNode of spreadNodes) {
      const spreadName = spreadNode.name.value;
      const cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);
      if (cycleIndex === void 0) {
        const spreadFragment = context.getFragment(spreadName);
        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        const cyclePath = spreadPath.slice(cycleIndex);
        const viaPath = cyclePath.slice(0, -1).map((s) => '"' + s.name.value + '"').join(", ");
        context.reportError(
          new GraphQLError(
            `Cannot spread fragment "${spreadName}" within itself` + (viaPath !== "" ? ` via ${viaPath}.` : "."),
            {
              nodes: cyclePath
            }
          )
        );
      }
      spreadPath.pop();
    }
    spreadPathIndexByName[fragmentName] = void 0;
  }
}
var init_NoFragmentCyclesRule = __esm({
  "node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs
function NoUndefinedVariablesRule(context) {
  let variableNameDefined = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        variableNameDefined = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          const varName = node.name.value;
          if (variableNameDefined[varName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${varName}" is not defined by operation "${operation.name.value}".` : `Variable "$${varName}" is not defined.`,
                {
                  nodes: [node, operation]
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(node) {
      variableNameDefined[node.variable.name.value] = true;
    }
  };
}
var init_NoUndefinedVariablesRule = __esm({
  "node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
function NoUnusedFragmentsRule(context) {
  const operationDefs = [];
  const fragmentDefs = [];
  return {
    OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave() {
        const fragmentNameUsed = /* @__PURE__ */ Object.create(null);
        for (const operation of operationDefs) {
          for (const fragment of context.getRecursivelyReferencedFragments(
            operation
          )) {
            fragmentNameUsed[fragment.name.value] = true;
          }
        }
        for (const fragmentDef of fragmentDefs) {
          const fragName = fragmentDef.name.value;
          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(
              new GraphQLError(`Fragment "${fragName}" is never used.`, {
                nodes: fragmentDef
              })
            );
          }
        }
      }
    }
  };
}
var init_NoUnusedFragmentsRule = __esm({
  "node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs
function NoUnusedVariablesRule(context) {
  let variableDefs = [];
  return {
    OperationDefinition: {
      enter() {
        variableDefs = [];
      },
      leave(operation) {
        const variableNameUsed = /* @__PURE__ */ Object.create(null);
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          variableNameUsed[node.name.value] = true;
        }
        for (const variableDef of variableDefs) {
          const variableName = variableDef.variable.name.value;
          if (variableNameUsed[variableName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${variableName}" is never used in operation "${operation.name.value}".` : `Variable "$${variableName}" is never used.`,
                {
                  nodes: variableDef
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(def) {
      variableDefs.push(def);
    }
  };
}
var init_NoUnusedVariablesRule = __esm({
  "node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/utilities/sortValueNode.mjs
function sortValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.OBJECT:
      return { ...valueNode, fields: sortFields(valueNode.fields) };
    case Kind.LIST:
      return { ...valueNode, values: valueNode.values.map(sortValueNode) };
    case Kind.INT:
    case Kind.FLOAT:
    case Kind.STRING:
    case Kind.BOOLEAN:
    case Kind.NULL:
    case Kind.ENUM:
    case Kind.VARIABLE:
      return valueNode;
  }
}
function sortFields(fields) {
  return fields.map((fieldNode) => ({
    ...fieldNode,
    value: sortValueNode(fieldNode.value)
  })).sort(
    (fieldA, fieldB) => naturalCompare(fieldA.name.value, fieldB.name.value)
  );
}
var init_sortValueNode = __esm({
  "node_modules/graphql/utilities/sortValueNode.mjs"() {
    init_naturalCompare();
    init_kinds();
  }
});

// node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason.map(
      ([responseName, subReason]) => `subfields "${responseName}" conflict because ` + reasonMessage(subReason)
    ).join(" and ");
  }
  return reason;
}
function OverlappingFieldsCanBeMergedRule(context) {
  const comparedFieldsAndFragmentPairs = new OrderedPairSet();
  const comparedFragmentPairs = new PairSet();
  const cachedFieldsAndFragmentNames = /* @__PURE__ */ new Map();
  return {
    SelectionSet(selectionSet) {
      const conflicts = findConflictsWithinSelectionSet(
        context,
        cachedFieldsAndFragmentNames,
        comparedFieldsAndFragmentPairs,
        comparedFragmentPairs,
        context.getParentType(),
        selectionSet
      );
      for (const [[responseName, reason], fields1, fields2] of conflicts) {
        const reasonMsg = reasonMessage(reason);
        context.reportError(
          new GraphQLError(
            `Fields "${responseName}" conflict because ${reasonMsg}. Use different aliases on the fields to fetch both if this was intentional.`,
            {
              nodes: fields1.concat(fields2)
            }
          )
        );
      }
    }
  };
}
function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentType, selectionSet) {
  const conflicts = [];
  const [fieldMap, fragmentNames] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType,
    selectionSet
  );
  collectConflictsWithin(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    fieldMap
  );
  if (fragmentNames.length !== 0) {
    for (let i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFieldsAndFragmentPairs,
        comparedFragmentPairs,
        false,
        fieldMap,
        fragmentNames[i]
      );
      for (let j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(
          context,
          conflicts,
          cachedFieldsAndFragmentNames,
          comparedFieldsAndFragmentPairs,
          comparedFragmentPairs,
          false,
          fragmentNames[i],
          fragmentNames[j]
        );
      }
    }
  }
  return conflicts;
}
function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
  if (comparedFieldsAndFragmentPairs.has(
    fieldMap,
    fragmentName,
    areMutuallyExclusive
  )) {
    return;
  }
  comparedFieldsAndFragmentPairs.add(
    fieldMap,
    fragmentName,
    areMutuallyExclusive
  );
  const fragment = context.getFragment(fragmentName);
  if (!fragment) {
    return;
  }
  const [fieldMap2, referencedFragmentNames] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment
  );
  if (fieldMap === fieldMap2) {
    return;
  }
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap,
    fieldMap2
  );
  for (const referencedFragmentName of referencedFragmentNames) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap,
      referencedFragmentName
    );
  }
}
function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
  if (fragmentName1 === fragmentName2) {
    return;
  }
  if (comparedFragmentPairs.has(
    fragmentName1,
    fragmentName2,
    areMutuallyExclusive
  )) {
    return;
  }
  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  const fragment1 = context.getFragment(fragmentName1);
  const fragment2 = context.getFragment(fragmentName2);
  if (!fragment1 || !fragment2) {
    return;
  }
  const [fieldMap1, referencedFragmentNames1] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment1
  );
  const [fieldMap2, referencedFragmentNames2] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment2
  );
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const referencedFragmentName2 of referencedFragmentNames2) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fragmentName1,
      referencedFragmentName2
    );
  }
  for (const referencedFragmentName1 of referencedFragmentNames1) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      referencedFragmentName1,
      fragmentName2
    );
  }
}
function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
  const conflicts = [];
  const [fieldMap1, fragmentNames1] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType1,
    selectionSet1
  );
  const [fieldMap2, fragmentNames2] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType2,
    selectionSet2
  );
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const fragmentName2 of fragmentNames2) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap1,
      fragmentName2
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap2,
      fragmentName1
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    for (const fragmentName2 of fragmentNames2) {
      collectConflictsBetweenFragments(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFieldsAndFragmentPairs,
        comparedFragmentPairs,
        areMutuallyExclusive,
        fragmentName1,
        fragmentName2
      );
    }
  }
  return conflicts;
}
function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, fieldMap) {
  for (const [responseName, fields] of Object.entries(fieldMap)) {
    if (fields.length > 1) {
      for (let i = 0; i < fields.length; i++) {
        for (let j = i + 1; j < fields.length; j++) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFieldsAndFragmentPairs,
            comparedFragmentPairs,
            false,
            // within one collection is never mutually exclusive
            responseName,
            fields[i],
            fields[j]
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
  for (const [responseName, fields1] of Object.entries(fieldMap1)) {
    const fields2 = fieldMap2[responseName];
    if (fields2) {
      for (const field1 of fields1) {
        for (const field2 of fields2) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFieldsAndFragmentPairs,
            comparedFragmentPairs,
            parentFieldsAreMutuallyExclusive,
            responseName,
            field1,
            field2
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function findConflict(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
  const [parentType1, node1, def1] = field1;
  const [parentType2, node2, def2] = field2;
  const areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && isObjectType(parentType1) && isObjectType(parentType2);
  if (!areMutuallyExclusive) {
    const name1 = node1.name.value;
    const name2 = node2.name.value;
    if (name1 !== name2) {
      return [
        [responseName, `"${name1}" and "${name2}" are different fields`],
        [node1],
        [node2]
      ];
    }
    if (!sameArguments(node1, node2)) {
      return [
        [responseName, "they have differing arguments"],
        [node1],
        [node2]
      ];
    }
  }
  const type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  const type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;
  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [
      [
        responseName,
        `they return conflicting types "${inspect(type1)}" and "${inspect(
          type2
        )}"`
      ],
      [node1],
      [node2]
    ];
  }
  const selectionSet1 = node1.selectionSet;
  const selectionSet2 = node2.selectionSet;
  if (selectionSet1 && selectionSet2) {
    const conflicts = findConflictsBetweenSubSelectionSets(
      context,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      getNamedType(type1),
      selectionSet1,
      getNamedType(type2),
      selectionSet2
    );
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}
function sameArguments(node1, node2) {
  const args1 = node1.arguments;
  const args2 = node2.arguments;
  if (args1 === void 0 || args1.length === 0) {
    return args2 === void 0 || args2.length === 0;
  }
  if (args2 === void 0 || args2.length === 0) {
    return false;
  }
  if (args1.length !== args2.length) {
    return false;
  }
  const values2 = new Map(args2.map(({ name, value }) => [name.value, value]));
  return args1.every((arg1) => {
    const value1 = arg1.value;
    const value2 = values2.get(arg1.name.value);
    if (value2 === void 0) {
      return false;
    }
    return stringifyValue(value1) === stringifyValue(value2);
  });
}
function stringifyValue(value) {
  return print(sortValueNode(value));
}
function doTypesConflict(type1, type2) {
  if (isListType(type1)) {
    return isListType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isListType(type2)) {
    return true;
  }
  if (isNonNullType(type1)) {
    return isNonNullType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isNonNullType(type2)) {
    return true;
  }
  if (isLeafType(type1) || isLeafType(type2)) {
    return type1 !== type2;
  }
  return false;
}
function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
  const cached = cachedFieldsAndFragmentNames.get(selectionSet);
  if (cached) {
    return cached;
  }
  const nodeAndDefs = /* @__PURE__ */ Object.create(null);
  const fragmentNames = /* @__PURE__ */ Object.create(null);
  _collectFieldsAndFragmentNames(
    context,
    parentType,
    selectionSet,
    nodeAndDefs,
    fragmentNames
  );
  const result2 = [nodeAndDefs, Object.keys(fragmentNames)];
  cachedFieldsAndFragmentNames.set(selectionSet, result2);
  return result2;
}
function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
  const cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);
  if (cached) {
    return cached;
  }
  const fragmentType = typeFromAST(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragmentType,
    fragment.selectionSet
  );
}
function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        const fieldName = selection.name.value;
        let fieldDef;
        if (isObjectType(parentType) || isInterfaceType(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }
        const responseName = selection.alias ? selection.alias.value : fieldName;
        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }
        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }
      case Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;
      case Kind.INLINE_FRAGMENT: {
        const typeCondition = selection.typeCondition;
        const inlineFragmentType = typeCondition ? typeFromAST(context.getSchema(), typeCondition) : parentType;
        _collectFieldsAndFragmentNames(
          context,
          inlineFragmentType,
          selection.selectionSet,
          nodeAndDefs,
          fragmentNames
        );
        break;
      }
    }
  }
}
function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [
      [responseName, conflicts.map(([reason]) => reason)],
      [node1, ...conflicts.map(([, fields1]) => fields1).flat()],
      [node2, ...conflicts.map(([, , fields2]) => fields2).flat()]
    ];
  }
}
var OrderedPairSet, PairSet;
var init_OverlappingFieldsCanBeMergedRule = __esm({
  "node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_sortValueNode();
    init_typeFromAST();
    OrderedPairSet = class {
      constructor() {
        this._data = /* @__PURE__ */ new Map();
      }
      has(a, b, weaklyPresent) {
        var _this$_data$get;
        const result2 = (_this$_data$get = this._data.get(a)) === null || _this$_data$get === void 0 ? void 0 : _this$_data$get.get(b);
        if (result2 === void 0) {
          return false;
        }
        return weaklyPresent ? true : weaklyPresent === result2;
      }
      add(a, b, weaklyPresent) {
        const map = this._data.get(a);
        if (map === void 0) {
          this._data.set(a, /* @__PURE__ */ new Map([[b, weaklyPresent]]));
        } else {
          map.set(b, weaklyPresent);
        }
      }
    };
    PairSet = class {
      constructor() {
        this._orderedPairSet = new OrderedPairSet();
      }
      has(a, b, weaklyPresent) {
        return a < b ? this._orderedPairSet.has(a, b, weaklyPresent) : this._orderedPairSet.has(b, a, weaklyPresent);
      }
      add(a, b, weaklyPresent) {
        if (a < b) {
          this._orderedPairSet.add(a, b, weaklyPresent);
        } else {
          this._orderedPairSet.add(b, a, weaklyPresent);
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
function PossibleFragmentSpreadsRule(context) {
  return {
    InlineFragment(node) {
      const fragType = context.getType();
      const parentType = context.getParentType();
      if (isCompositeType(fragType) && isCompositeType(parentType) && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    },
    FragmentSpread(node) {
      const fragName = node.name.value;
      const fragType = getFragmentType(context, fragName);
      const parentType = context.getParentType();
      if (fragType && parentType && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment "${fragName}" cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getFragmentType(context, name) {
  const frag = context.getFragment(name);
  if (frag) {
    const type = typeFromAST(context.getSchema(), frag.typeCondition);
    if (isCompositeType(type)) {
      return type;
    }
  }
}
var init_PossibleFragmentSpreadsRule = __esm({
  "node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_definition();
    init_typeComparators();
    init_typeFromAST();
  }
});

// node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
function PossibleTypeExtensionsRule(context) {
  const schema = context.getSchema();
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }
  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension
  };
  function checkExtension(node) {
    const typeName = node.name.value;
    const defNode = definedTypes[typeName];
    const existingType = schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    let expectedKind;
    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }
    if (expectedKind) {
      if (expectedKind !== node.kind) {
        const kindStr = extensionKindToTypeName(node.kind);
        context.reportError(
          new GraphQLError(`Cannot extend non-${kindStr} type "${typeName}".`, {
            nodes: defNode ? [defNode, node] : node
          })
        );
      }
    } else {
      const allTypeNames = Object.keys({
        ...definedTypes,
        ...schema === null || schema === void 0 ? void 0 : schema.getTypeMap()
      });
      const suggestedTypes = suggestionList(typeName, allTypeNames);
      context.reportError(
        new GraphQLError(
          `Cannot extend type "${typeName}" because it is not defined.` + didYouMean(suggestedTypes),
          {
            nodes: node.name
          }
        )
      );
    }
  }
}
function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  }
  if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  }
  if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  }
  if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  }
  if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  }
  if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  invariant4(false, "Unexpected type: " + inspect(type));
}
function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return "scalar";
    case Kind.OBJECT_TYPE_EXTENSION:
      return "object";
    case Kind.INTERFACE_TYPE_EXTENSION:
      return "interface";
    case Kind.UNION_TYPE_EXTENSION:
      return "union";
    case Kind.ENUM_TYPE_EXTENSION:
      return "enum";
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return "input object";
    default:
      invariant4(false, "Unexpected kind: " + inspect(kind));
  }
}
var defKindToExtKind;
var init_PossibleTypeExtensionsRule = __esm({
  "node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs"() {
    init_didYouMean();
    init_inspect();
    init_invariant2();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_predicates();
    init_definition();
    defKindToExtKind = {
      [Kind.SCALAR_TYPE_DEFINITION]: Kind.SCALAR_TYPE_EXTENSION,
      [Kind.OBJECT_TYPE_DEFINITION]: Kind.OBJECT_TYPE_EXTENSION,
      [Kind.INTERFACE_TYPE_DEFINITION]: Kind.INTERFACE_TYPE_EXTENSION,
      [Kind.UNION_TYPE_DEFINITION]: Kind.UNION_TYPE_EXTENSION,
      [Kind.ENUM_TYPE_DEFINITION]: Kind.ENUM_TYPE_EXTENSION,
      [Kind.INPUT_OBJECT_TYPE_DEFINITION]: Kind.INPUT_OBJECT_TYPE_EXTENSION
    };
  }
});

// node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
function ProvidedRequiredArgumentsRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...ProvidedRequiredArgumentsOnDirectivesRule(context),
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(fieldNode) {
        var _fieldNode$arguments;
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        const providedArgs = new Set(
          // FIXME: https://github.com/graphql/graphql-js/issues/2203
          /* c8 ignore next */
          (_fieldNode$arguments = fieldNode.arguments) === null || _fieldNode$arguments === void 0 ? void 0 : _fieldNode$arguments.map((arg) => arg.name.value)
        );
        for (const argDef of fieldDef.args) {
          if (!providedArgs.has(argDef.name) && isRequiredArgument(argDef)) {
            const argTypeStr = inspect(argDef.type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldDef.name}" argument "${argDef.name}" of type "${argTypeStr}" is required, but it was not provided.`,
                {
                  nodes: fieldNode
                }
              )
            );
          }
        }
      }
    }
  };
}
function ProvidedRequiredArgumentsOnDirectivesRule(context) {
  var _schema$getDirectives;
  const requiredArgsMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = (_schema$getDirectives = schema === null || schema === void 0 ? void 0 : schema.getDirectives()) !== null && _schema$getDirectives !== void 0 ? _schema$getDirectives : specifiedDirectives;
  for (const directive of definedDirectives) {
    requiredArgsMap[directive.name] = keyMap(
      directive.args.filter(isRequiredArgument),
      (arg) => arg.name
    );
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      requiredArgsMap[def.name.value] = keyMap(
        argNodes.filter(isRequiredArgumentNode),
        (arg) => arg.name.value
      );
    }
  }
  return {
    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(directiveNode) {
        const directiveName = directiveNode.name.value;
        const requiredArgs = requiredArgsMap[directiveName];
        if (requiredArgs) {
          var _directiveNode$argume;
          const argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
          const argNodeMap = new Set(argNodes.map((arg) => arg.name.value));
          for (const [argName, argDef] of Object.entries(requiredArgs)) {
            if (!argNodeMap.has(argName)) {
              const argType = isType(argDef.type) ? inspect(argDef.type) : print(argDef.type);
              context.reportError(
                new GraphQLError(
                  `Directive "@${directiveName}" argument "${argName}" of type "${argType}" is required, but it was not provided.`,
                  {
                    nodes: directiveNode
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}
function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}
var init_ProvidedRequiredArgumentsRule = __esm({
  "node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs"() {
    init_inspect();
    init_keyMap();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_directives();
  }
});

// node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
function ScalarLeafsRule(context) {
  return {
    Field(node) {
      const type = context.getType();
      const selectionSet = node.selectionSet;
      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            const fieldName = node.name.value;
            const typeStr = inspect(type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldName}" must not have a selection since type "${typeStr}" has no subfields.`,
                {
                  nodes: selectionSet
                }
              )
            );
          }
        } else if (!selectionSet) {
          const fieldName = node.name.value;
          const typeStr = inspect(type);
          context.reportError(
            new GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`,
              {
                nodes: node
              }
            )
          );
        } else if (selectionSet.selections.length === 0) {
          const fieldName = node.name.value;
          const typeStr = inspect(type);
          context.reportError(
            new GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have at least one field selected.`,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}
var init_ScalarLeafsRule = __esm({
  "node_modules/graphql/validation/rules/ScalarLeafsRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/graphql/jsutils/printPathArray.mjs
var init_printPathArray = __esm({
  "node_modules/graphql/jsutils/printPathArray.mjs"() {
  }
});

// node_modules/graphql/jsutils/Path.mjs
var init_Path = __esm({
  "node_modules/graphql/jsutils/Path.mjs"() {
  }
});

// node_modules/graphql/utilities/coerceInputValue.mjs
var init_coerceInputValue = __esm({
  "node_modules/graphql/utilities/coerceInputValue.mjs"() {
    init_didYouMean();
    init_inspect();
    init_invariant2();
    init_isIterableObject();
    init_isObjectLike();
    init_Path();
    init_printPathArray();
    init_suggestionList();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/graphql/utilities/valueFromAST.mjs
function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    return;
  }
  if (valueNode.kind === Kind.VARIABLE) {
    const variableName = valueNode.name.value;
    if (variables == null || variables[variableName] === void 0) {
      return;
    }
    const variableValue = variables[variableName];
    if (variableValue === null && isNonNullType(type)) {
      return;
    }
    return variableValue;
  }
  if (isNonNullType(type)) {
    if (valueNode.kind === Kind.NULL) {
      return;
    }
    return valueFromAST(valueNode, type.ofType, variables);
  }
  if (valueNode.kind === Kind.NULL) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (valueNode.kind === Kind.LIST) {
      const coercedValues = [];
      for (const itemNode of valueNode.values) {
        if (isMissingVariable(itemNode, variables)) {
          if (isNonNullType(itemType)) {
            return;
          }
          coercedValues.push(null);
        } else {
          const itemValue = valueFromAST(itemNode, itemType, variables);
          if (itemValue === void 0) {
            return;
          }
          coercedValues.push(itemValue);
        }
      }
      return coercedValues;
    }
    const coercedValue = valueFromAST(valueNode, itemType, variables);
    if (coercedValue === void 0) {
      return;
    }
    return [coercedValue];
  }
  if (isInputObjectType(type)) {
    if (valueNode.kind !== Kind.OBJECT) {
      return;
    }
    const coercedObj = /* @__PURE__ */ Object.create(null);
    const fieldNodes = keyMap(valueNode.fields, (field) => field.name.value);
    for (const field of Object.values(type.getFields())) {
      const fieldNode = fieldNodes[field.name];
      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== void 0) {
          coercedObj[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          return;
        }
        continue;
      }
      const fieldValue = valueFromAST(fieldNode.value, field.type, variables);
      if (fieldValue === void 0) {
        return;
      }
      coercedObj[field.name] = fieldValue;
    }
    if (type.isOneOf) {
      const keys = Object.keys(coercedObj);
      if (keys.length !== 1) {
        return;
      }
      if (coercedObj[keys[0]] === null) {
        return;
      }
    }
    return coercedObj;
  }
  if (isLeafType(type)) {
    let result2;
    try {
      result2 = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return;
    }
    if (result2 === void 0) {
      return;
    }
    return result2;
  }
  invariant4(false, "Unexpected input type: " + inspect(type));
}
function isMissingVariable(valueNode, variables) {
  return valueNode.kind === Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === void 0);
}
var init_valueFromAST = __esm({
  "node_modules/graphql/utilities/valueFromAST.mjs"() {
    init_inspect();
    init_invariant2();
    init_keyMap();
    init_kinds();
    init_definition();
  }
});

// node_modules/graphql/execution/values.mjs
function getArgumentValues(def, node, variableValues) {
  var _node$arguments;
  const coercedValues = {};
  const argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 ? _node$arguments : [];
  const argNodeMap = keyMap(argumentNodes, (arg) => arg.name.value);
  for (const argDef of def.args) {
    const name = argDef.name;
    const argType = argDef.type;
    const argumentNode = argNodeMap[name];
    if (!argumentNode) {
      if (argDef.defaultValue !== void 0) {
        coercedValues[name] = argDef.defaultValue;
      } else if (isNonNullType(argType)) {
        throw new GraphQLError(
          `Argument "${name}" of required type "${inspect(argType)}" was not provided.`,
          {
            nodes: node
          }
        );
      }
      continue;
    }
    const valueNode = argumentNode.value;
    let isNull = valueNode.kind === Kind.NULL;
    if (valueNode.kind === Kind.VARIABLE) {
      const variableName = valueNode.name.value;
      if (variableValues == null || !hasOwnProperty(variableValues, variableName)) {
        if (argDef.defaultValue !== void 0) {
          coercedValues[name] = argDef.defaultValue;
        } else if (isNonNullType(argType)) {
          throw new GraphQLError(
            `Argument "${name}" of required type "${inspect(argType)}" was provided the variable "$${variableName}" which was not provided a runtime value.`,
            {
              nodes: valueNode
            }
          );
        }
        continue;
      }
      isNull = variableValues[variableName] == null;
    }
    if (isNull && isNonNullType(argType)) {
      throw new GraphQLError(
        `Argument "${name}" of non-null type "${inspect(argType)}" must not be null.`,
        {
          nodes: valueNode
        }
      );
    }
    const coercedValue = valueFromAST(valueNode, argType, variableValues);
    if (coercedValue === void 0) {
      throw new GraphQLError(
        `Argument "${name}" has invalid value ${print(valueNode)}.`,
        {
          nodes: valueNode
        }
      );
    }
    coercedValues[name] = coercedValue;
  }
  return coercedValues;
}
function getDirectiveValues(directiveDef, node, variableValues) {
  var _node$directives;
  const directiveNode = (_node$directives = node.directives) === null || _node$directives === void 0 ? void 0 : _node$directives.find(
    (directive) => directive.name.value === directiveDef.name
  );
  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var init_values = __esm({
  "node_modules/graphql/execution/values.mjs"() {
    init_inspect();
    init_keyMap();
    init_printPathArray();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_coerceInputValue();
    init_typeFromAST();
    init_valueFromAST();
  }
});

// node_modules/graphql/execution/collectFields.mjs
function collectFields(schema, fragments, variableValues, runtimeType, selectionSet) {
  const fields = /* @__PURE__ */ new Map();
  collectFieldsImpl(
    schema,
    fragments,
    variableValues,
    runtimeType,
    selectionSet,
    fields,
    /* @__PURE__ */ new Set()
  );
  return fields;
}
function collectSubfields(schema, fragments, variableValues, returnType, fieldNodes) {
  const subFieldNodes = /* @__PURE__ */ new Map();
  const visitedFragmentNames = /* @__PURE__ */ new Set();
  for (const node of fieldNodes) {
    if (node.selectionSet) {
      collectFieldsImpl(
        schema,
        fragments,
        variableValues,
        returnType,
        node.selectionSet,
        subFieldNodes,
        visitedFragmentNames
      );
    }
  }
  return subFieldNodes;
}
function collectFieldsImpl(schema, fragments, variableValues, runtimeType, selectionSet, fields, visitedFragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        if (!shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        const name = getFieldEntryKey(selection);
        const fieldList = fields.get(name);
        if (fieldList !== void 0) {
          fieldList.push(selection);
        } else {
          fields.set(name, [selection]);
        }
        break;
      }
      case Kind.INLINE_FRAGMENT: {
        if (!shouldIncludeNode(variableValues, selection) || !doesFragmentConditionMatch(schema, selection, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          selection.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
      case Kind.FRAGMENT_SPREAD: {
        const fragName = selection.name.value;
        if (visitedFragmentNames.has(fragName) || !shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        visitedFragmentNames.add(fragName);
        const fragment = fragments[fragName];
        if (!fragment || !doesFragmentConditionMatch(schema, fragment, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          fragment.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
    }
  }
}
function shouldIncludeNode(variableValues, node) {
  const skip = getDirectiveValues(GraphQLSkipDirective, node, variableValues);
  if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
    return false;
  }
  const include = getDirectiveValues(
    GraphQLIncludeDirective,
    node,
    variableValues
  );
  if ((include === null || include === void 0 ? void 0 : include.if) === false) {
    return false;
  }
  return true;
}
function doesFragmentConditionMatch(schema, fragment, type) {
  const typeConditionNode = fragment.typeCondition;
  if (!typeConditionNode) {
    return true;
  }
  const conditionalType = typeFromAST(schema, typeConditionNode);
  if (conditionalType === type) {
    return true;
  }
  if (isAbstractType(conditionalType)) {
    return schema.isSubType(conditionalType, type);
  }
  return false;
}
function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}
var init_collectFields = __esm({
  "node_modules/graphql/execution/collectFields.mjs"() {
    init_kinds();
    init_definition();
    init_directives();
    init_typeFromAST();
    init_values();
  }
});

// node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
function SingleFieldSubscriptionsRule(context) {
  return {
    OperationDefinition(node) {
      if (node.operation === "subscription") {
        const schema = context.getSchema();
        const subscriptionType = schema.getSubscriptionType();
        if (subscriptionType) {
          const operationName = node.name ? node.name.value : null;
          const variableValues = /* @__PURE__ */ Object.create(null);
          const document = context.getDocument();
          const fragments = /* @__PURE__ */ Object.create(null);
          for (const definition of document.definitions) {
            if (definition.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[definition.name.value] = definition;
            }
          }
          const fields = collectFields(
            schema,
            fragments,
            variableValues,
            subscriptionType,
            node.selectionSet
          );
          if (fields.size > 1) {
            const fieldSelectionLists = [...fields.values()];
            const extraFieldSelectionLists = fieldSelectionLists.slice(1);
            const extraFieldSelections = extraFieldSelectionLists.flat();
            context.reportError(
              new GraphQLError(
                operationName != null ? `Subscription "${operationName}" must select only one top level field.` : "Anonymous Subscription must select only one top level field.",
                {
                  nodes: extraFieldSelections
                }
              )
            );
          }
          for (const fieldNodes of fields.values()) {
            const field = fieldNodes[0];
            const fieldName = field.name.value;
            if (fieldName.startsWith("__")) {
              context.reportError(
                new GraphQLError(
                  operationName != null ? `Subscription "${operationName}" must not select an introspection top level field.` : "Anonymous Subscription must not select an introspection top level field.",
                  {
                    nodes: fieldNodes
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}
var init_SingleFieldSubscriptionsRule = __esm({
  "node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_collectFields();
  }
});

// node_modules/graphql/jsutils/groupBy.mjs
function groupBy(list, keyFn) {
  const result2 = /* @__PURE__ */ new Map();
  for (const item of list) {
    const key = keyFn(item);
    const group = result2.get(key);
    if (group === void 0) {
      result2.set(key, [item]);
    } else {
      group.push(item);
    }
  }
  return result2;
}
var init_groupBy = __esm({
  "node_modules/graphql/jsutils/groupBy.mjs"() {
  }
});

// node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs
function UniqueArgumentDefinitionNamesRule(context) {
  return {
    DirectiveDefinition(directiveNode) {
      var _directiveNode$argume;
      const argumentNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
      return checkArgUniqueness(`@${directiveNode.name.value}`, argumentNodes);
    },
    InterfaceTypeDefinition: checkArgUniquenessPerField,
    InterfaceTypeExtension: checkArgUniquenessPerField,
    ObjectTypeDefinition: checkArgUniquenessPerField,
    ObjectTypeExtension: checkArgUniquenessPerField
  };
  function checkArgUniquenessPerField(typeNode) {
    var _typeNode$fields;
    const typeName = typeNode.name.value;
    const fieldNodes = (_typeNode$fields = typeNode.fields) !== null && _typeNode$fields !== void 0 ? _typeNode$fields : [];
    for (const fieldDef of fieldNodes) {
      var _fieldDef$arguments;
      const fieldName = fieldDef.name.value;
      const argumentNodes = (_fieldDef$arguments = fieldDef.arguments) !== null && _fieldDef$arguments !== void 0 ? _fieldDef$arguments : [];
      checkArgUniqueness(`${typeName}.${fieldName}`, argumentNodes);
    }
    return false;
  }
  function checkArgUniqueness(parentName, argumentNodes) {
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `Argument "${parentName}(${argName}:)" can only be defined once.`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
    return false;
  }
}
var init_UniqueArgumentDefinitionNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
function UniqueArgumentNamesRule(context) {
  return {
    Field: checkArgUniqueness,
    Directive: checkArgUniqueness
  };
  function checkArgUniqueness(parentNode) {
    var _parentNode$arguments;
    const argumentNodes = (_parentNode$arguments = parentNode.arguments) !== null && _parentNode$arguments !== void 0 ? _parentNode$arguments : [];
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `There can be only one argument named "${argName}".`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
  }
}
var init_UniqueArgumentNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
function UniqueDirectiveNamesRule(context) {
  const knownDirectiveNames = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  return {
    DirectiveDefinition(node) {
      const directiveName = node.name.value;
      if (schema !== null && schema !== void 0 && schema.getDirective(directiveName)) {
        context.reportError(
          new GraphQLError(
            `Directive "@${directiveName}" already exists in the schema. It cannot be redefined.`,
            {
              nodes: node.name
            }
          )
        );
        return;
      }
      if (knownDirectiveNames[directiveName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one directive named "@${directiveName}".`,
            {
              nodes: [knownDirectiveNames[directiveName], node.name]
            }
          )
        );
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }
      return false;
    }
  };
}
var init_UniqueDirectiveNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
function UniqueDirectivesPerLocationRule(context) {
  const uniqueDirectiveMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }
  const schemaDirectives = /* @__PURE__ */ Object.create(null);
  const typeDirectivesMap = /* @__PURE__ */ Object.create(null);
  return {
    // Many different AST nodes may contain directives. Rather than listing
    // them all, just listen for entering any node, and check to see if it
    // defines any directives.
    enter(node) {
      if (!("directives" in node) || !node.directives) {
        return;
      }
      let seenDirectives;
      if (node.kind === Kind.SCHEMA_DEFINITION || node.kind === Kind.SCHEMA_EXTENSION) {
        seenDirectives = schemaDirectives;
      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
        const typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];
        if (seenDirectives === void 0) {
          typeDirectivesMap[typeName] = seenDirectives = /* @__PURE__ */ Object.create(null);
        }
      } else {
        seenDirectives = /* @__PURE__ */ Object.create(null);
      }
      for (const directive of node.directives) {
        const directiveName = directive.name.value;
        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context.reportError(
              new GraphQLError(
                `The directive "@${directiveName}" can only be used once at this location.`,
                {
                  nodes: [seenDirectives[directiveName], directive]
                }
              )
            );
          } else {
            seenDirectives[directiveName] = directive;
          }
        }
      }
    }
  };
}
var init_UniqueDirectivesPerLocationRule = __esm({
  "node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_predicates();
    init_directives();
  }
});

// node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
function UniqueEnumValueNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownValueNames = /* @__PURE__ */ Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness
  };
  function checkValueUniqueness(node) {
    var _node$values;
    const typeName = node.name.value;
    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const valueNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
    const valueNames = knownValueNames[typeName];
    for (const valueDef of valueNodes) {
      const valueName = valueDef.name.value;
      const existingType = existingTypeMap[typeName];
      if (isEnumType(existingType) && existingType.getValue(valueName)) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: valueDef.name
            }
          )
        );
      } else if (valueNames[valueName]) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" can only be defined once.`,
            {
              nodes: [valueNames[valueName], valueDef.name]
            }
          )
        );
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }
    return false;
  }
}
var init_UniqueEnumValueNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs"() {
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
function UniqueFieldDefinitionNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownFieldNames = /* @__PURE__ */ Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness
  };
  function checkFieldUniqueness(node) {
    var _node$fields;
    const typeName = node.name.value;
    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
    const fieldNames = knownFieldNames[typeName];
    for (const fieldDef of fieldNodes) {
      const fieldName = fieldDef.name.value;
      if (hasField(existingTypeMap[typeName], fieldName)) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: fieldDef.name
            }
          )
        );
      } else if (fieldNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" can only be defined once.`,
            {
              nodes: [fieldNames[fieldName], fieldDef.name]
            }
          )
        );
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }
    return false;
  }
}
function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName] != null;
  }
  return false;
}
var init_UniqueFieldDefinitionNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs"() {
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs
function UniqueFragmentNamesRule(context) {
  const knownFragmentNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      const fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one fragment named "${fragmentName}".`,
            {
              nodes: [knownFragmentNames[fragmentName], node.name]
            }
          )
        );
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}
var init_UniqueFragmentNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
function UniqueInputFieldNamesRule(context) {
  const knownNameStack = [];
  let knownNames = /* @__PURE__ */ Object.create(null);
  return {
    ObjectValue: {
      enter() {
        knownNameStack.push(knownNames);
        knownNames = /* @__PURE__ */ Object.create(null);
      },
      leave() {
        const prevKnownNames = knownNameStack.pop();
        prevKnownNames || invariant4(false);
        knownNames = prevKnownNames;
      }
    },
    ObjectField(node) {
      const fieldName = node.name.value;
      if (knownNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one input field named "${fieldName}".`,
            {
              nodes: [knownNames[fieldName], node.name]
            }
          )
        );
      } else {
        knownNames[fieldName] = node.name;
      }
    }
  };
}
var init_UniqueInputFieldNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs"() {
    init_invariant2();
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs
function UniqueOperationNamesRule(context) {
  const knownOperationNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition(node) {
      const operationName = node.name;
      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(
            new GraphQLError(
              `There can be only one operation named "${operationName.value}".`,
              {
                nodes: [
                  knownOperationNames[operationName.value],
                  operationName
                ]
              }
            )
          );
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }
      return false;
    },
    FragmentDefinition: () => false
  };
}
var init_UniqueOperationNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
function UniqueOperationTypesRule(context) {
  const schema = context.getSchema();
  const definedOperationTypes = /* @__PURE__ */ Object.create(null);
  const existingOperationTypes = schema ? {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType()
  } : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes
  };
  function checkOperationTypes(node) {
    var _node$operationTypes;
    const operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
    for (const operationType of operationTypesNodes) {
      const operation = operationType.operation;
      const alreadyDefinedOperationType = definedOperationTypes[operation];
      if (existingOperationTypes[operation]) {
        context.reportError(
          new GraphQLError(
            `Type for ${operation} already defined in the schema. It cannot be redefined.`,
            {
              nodes: operationType
            }
          )
        );
      } else if (alreadyDefinedOperationType) {
        context.reportError(
          new GraphQLError(
            `There can be only one ${operation} type in schema.`,
            {
              nodes: [alreadyDefinedOperationType, operationType]
            }
          )
        );
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }
    return false;
  }
}
var init_UniqueOperationTypesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
function UniqueTypeNamesRule(context) {
  const knownTypeNames = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName
  };
  function checkTypeName(node) {
    const typeName = node.name.value;
    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context.reportError(
        new GraphQLError(
          `Type "${typeName}" already exists in the schema. It cannot also be defined in this type definition.`,
          {
            nodes: node.name
          }
        )
      );
      return;
    }
    if (knownTypeNames[typeName]) {
      context.reportError(
        new GraphQLError(`There can be only one type named "${typeName}".`, {
          nodes: [knownTypeNames[typeName], node.name]
        })
      );
    } else {
      knownTypeNames[typeName] = node.name;
    }
    return false;
  }
}
var init_UniqueTypeNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
function UniqueVariableNamesRule(context) {
  return {
    OperationDefinition(operationNode) {
      var _operationNode$variab;
      const variableDefinitions = (_operationNode$variab = operationNode.variableDefinitions) !== null && _operationNode$variab !== void 0 ? _operationNode$variab : [];
      const seenVariableDefinitions = groupBy(
        variableDefinitions,
        (node) => node.variable.name.value
      );
      for (const [variableName, variableNodes] of seenVariableDefinitions) {
        if (variableNodes.length > 1) {
          context.reportError(
            new GraphQLError(
              `There can be only one variable named "$${variableName}".`,
              {
                nodes: variableNodes.map((node) => node.variable.name)
              }
            )
          );
        }
      }
    }
  };
}
var init_UniqueVariableNamesRule = __esm({
  "node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
function ValuesOfCorrectTypeRule(context) {
  let variableDefinitions = {};
  return {
    OperationDefinition: {
      enter() {
        variableDefinitions = {};
      }
    },
    VariableDefinition(definition) {
      variableDefinitions[definition.variable.name.value] = definition;
    },
    ListValue(node) {
      const type = getNullableType(context.getParentInputType());
      if (!isListType(type)) {
        isValidValueNode(context, node);
        return false;
      }
    },
    ObjectValue(node) {
      const type = getNamedType(context.getInputType());
      if (!isInputObjectType(type)) {
        isValidValueNode(context, node);
        return false;
      }
      const fieldNodeMap = keyMap(node.fields, (field) => field.name.value);
      for (const fieldDef of Object.values(type.getFields())) {
        const fieldNode = fieldNodeMap[fieldDef.name];
        if (!fieldNode && isRequiredInputField(fieldDef)) {
          const typeStr = inspect(fieldDef.type);
          context.reportError(
            new GraphQLError(
              `Field "${type.name}.${fieldDef.name}" of required type "${typeStr}" was not provided.`,
              {
                nodes: node
              }
            )
          );
        }
      }
      if (type.isOneOf) {
        validateOneOfInputObject(
          context,
          node,
          type,
          fieldNodeMap,
          variableDefinitions
        );
      }
    },
    ObjectField(node) {
      const parentType = getNamedType(context.getParentInputType());
      const fieldType = context.getInputType();
      if (!fieldType && isInputObjectType(parentType)) {
        const suggestions = suggestionList(
          node.name.value,
          Object.keys(parentType.getFields())
        );
        context.reportError(
          new GraphQLError(
            `Field "${node.name.value}" is not defined by type "${parentType.name}".` + didYouMean(suggestions),
            {
              nodes: node
            }
          )
        );
      }
    },
    NullValue(node) {
      const type = context.getInputType();
      if (isNonNullType(type)) {
        context.reportError(
          new GraphQLError(
            `Expected value of type "${inspect(type)}", found ${print(node)}.`,
            {
              nodes: node
            }
          )
        );
      }
    },
    EnumValue: (node) => isValidValueNode(context, node),
    IntValue: (node) => isValidValueNode(context, node),
    FloatValue: (node) => isValidValueNode(context, node),
    StringValue: (node) => isValidValueNode(context, node),
    BooleanValue: (node) => isValidValueNode(context, node)
  };
}
function isValidValueNode(context, node) {
  const locationType = context.getInputType();
  if (!locationType) {
    return;
  }
  const type = getNamedType(locationType);
  if (!isLeafType(type)) {
    const typeStr = inspect(locationType);
    context.reportError(
      new GraphQLError(
        `Expected value of type "${typeStr}", found ${print(node)}.`,
        {
          nodes: node
        }
      )
    );
    return;
  }
  try {
    const parseResult = type.parseLiteral(
      node,
      void 0
      /* variables */
    );
    if (parseResult === void 0) {
      const typeStr = inspect(locationType);
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}.`,
          {
            nodes: node
          }
        )
      );
    }
  } catch (error) {
    const typeStr = inspect(locationType);
    if (error instanceof GraphQLError) {
      context.reportError(error);
    } else {
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}; ` + error.message,
          {
            nodes: node,
            originalError: error
          }
        )
      );
    }
  }
}
function validateOneOfInputObject(context, node, type, fieldNodeMap, variableDefinitions) {
  var _fieldNodeMap$keys$;
  const keys = Object.keys(fieldNodeMap);
  const isNotExactlyOneField = keys.length !== 1;
  if (isNotExactlyOneField) {
    context.reportError(
      new GraphQLError(
        `OneOf Input Object "${type.name}" must specify exactly one key.`,
        {
          nodes: [node]
        }
      )
    );
    return;
  }
  const value = (_fieldNodeMap$keys$ = fieldNodeMap[keys[0]]) === null || _fieldNodeMap$keys$ === void 0 ? void 0 : _fieldNodeMap$keys$.value;
  const isNullLiteral = !value || value.kind === Kind.NULL;
  const isVariable2 = (value === null || value === void 0 ? void 0 : value.kind) === Kind.VARIABLE;
  if (isNullLiteral) {
    context.reportError(
      new GraphQLError(`Field "${type.name}.${keys[0]}" must be non-null.`, {
        nodes: [node]
      })
    );
    return;
  }
  if (isVariable2) {
    const variableName = value.name.value;
    const definition = variableDefinitions[variableName];
    const isNullableVariable = definition.type.kind !== Kind.NON_NULL_TYPE;
    if (isNullableVariable) {
      context.reportError(
        new GraphQLError(
          `Variable "${variableName}" must be non-nullable to be used for OneOf Input Object "${type.name}".`,
          {
            nodes: [node]
          }
        )
      );
    }
  }
}
var init_ValuesOfCorrectTypeRule = __esm({
  "node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs"() {
    init_didYouMean();
    init_inspect();
    init_keyMap();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
  }
});

// node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
function VariablesAreInputTypesRule(context) {
  return {
    VariableDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.type);
      if (type !== void 0 && !isInputType(type)) {
        const variableName = node.variable.name.value;
        const typeName = print(node.type);
        context.reportError(
          new GraphQLError(
            `Variable "$${variableName}" cannot be non-input type "${typeName}".`,
            {
              nodes: node.type
            }
          )
        );
      }
    }
  };
}
var init_VariablesAreInputTypesRule = __esm({
  "node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs"() {
    init_GraphQLError();
    init_printer();
    init_definition();
    init_typeFromAST();
  }
});

// node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
function VariablesInAllowedPositionRule(context) {
  let varDefMap = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        varDefMap = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node, type, defaultValue } of usages) {
          const varName = node.name.value;
          const varDef = varDefMap[varName];
          if (varDef && type) {
            const schema = context.getSchema();
            const varType = typeFromAST(schema, varDef.type);
            if (varType && !allowedVariableUsage(
              schema,
              varType,
              varDef.defaultValue,
              type,
              defaultValue
            )) {
              const varTypeStr = inspect(varType);
              const typeStr = inspect(type);
              context.reportError(
                new GraphQLError(
                  `Variable "$${varName}" of type "${varTypeStr}" used in position expecting type "${typeStr}".`,
                  {
                    nodes: [varDef, node]
                  }
                )
              );
            }
          }
        }
      }
    },
    VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}
function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
  if (isNonNullType(locationType) && !isNonNullType(varType)) {
    const hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
    const hasLocationDefaultValue = locationDefaultValue !== void 0;
    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }
    const nullableLocationType = locationType.ofType;
    return isTypeSubTypeOf(schema, varType, nullableLocationType);
  }
  return isTypeSubTypeOf(schema, varType, locationType);
}
var init_VariablesInAllowedPositionRule = __esm({
  "node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_kinds();
    init_definition();
    init_typeComparators();
    init_typeFromAST();
  }
});

// node_modules/graphql/validation/specifiedRules.mjs
var recommendedRules, specifiedRules, specifiedSDLRules;
var init_specifiedRules = __esm({
  "node_modules/graphql/validation/specifiedRules.mjs"() {
    init_ExecutableDefinitionsRule();
    init_FieldsOnCorrectTypeRule();
    init_FragmentsOnCompositeTypesRule();
    init_KnownArgumentNamesRule();
    init_KnownDirectivesRule();
    init_KnownFragmentNamesRule();
    init_KnownTypeNamesRule();
    init_LoneAnonymousOperationRule();
    init_LoneSchemaDefinitionRule();
    init_MaxIntrospectionDepthRule();
    init_NoFragmentCyclesRule();
    init_NoUndefinedVariablesRule();
    init_NoUnusedFragmentsRule();
    init_NoUnusedVariablesRule();
    init_OverlappingFieldsCanBeMergedRule();
    init_PossibleFragmentSpreadsRule();
    init_PossibleTypeExtensionsRule();
    init_ProvidedRequiredArgumentsRule();
    init_ScalarLeafsRule();
    init_SingleFieldSubscriptionsRule();
    init_UniqueArgumentDefinitionNamesRule();
    init_UniqueArgumentNamesRule();
    init_UniqueDirectiveNamesRule();
    init_UniqueDirectivesPerLocationRule();
    init_UniqueEnumValueNamesRule();
    init_UniqueFieldDefinitionNamesRule();
    init_UniqueFragmentNamesRule();
    init_UniqueInputFieldNamesRule();
    init_UniqueOperationNamesRule();
    init_UniqueOperationTypesRule();
    init_UniqueTypeNamesRule();
    init_UniqueVariableNamesRule();
    init_ValuesOfCorrectTypeRule();
    init_VariablesAreInputTypesRule();
    init_VariablesInAllowedPositionRule();
    recommendedRules = Object.freeze([MaxIntrospectionDepthRule]);
    specifiedRules = Object.freeze([
      ExecutableDefinitionsRule,
      UniqueOperationNamesRule,
      LoneAnonymousOperationRule,
      SingleFieldSubscriptionsRule,
      KnownTypeNamesRule,
      FragmentsOnCompositeTypesRule,
      VariablesAreInputTypesRule,
      ScalarLeafsRule,
      FieldsOnCorrectTypeRule,
      UniqueFragmentNamesRule,
      KnownFragmentNamesRule,
      NoUnusedFragmentsRule,
      PossibleFragmentSpreadsRule,
      NoFragmentCyclesRule,
      UniqueVariableNamesRule,
      NoUndefinedVariablesRule,
      NoUnusedVariablesRule,
      KnownDirectivesRule,
      UniqueDirectivesPerLocationRule,
      KnownArgumentNamesRule,
      UniqueArgumentNamesRule,
      ValuesOfCorrectTypeRule,
      ProvidedRequiredArgumentsRule,
      VariablesInAllowedPositionRule,
      OverlappingFieldsCanBeMergedRule,
      UniqueInputFieldNamesRule,
      ...recommendedRules
    ]);
    specifiedSDLRules = Object.freeze([
      LoneSchemaDefinitionRule,
      UniqueOperationTypesRule,
      UniqueTypeNamesRule,
      UniqueEnumValueNamesRule,
      UniqueFieldDefinitionNamesRule,
      UniqueArgumentDefinitionNamesRule,
      UniqueDirectiveNamesRule,
      KnownTypeNamesRule,
      KnownDirectivesRule,
      UniqueDirectivesPerLocationRule,
      PossibleTypeExtensionsRule,
      KnownArgumentNamesOnDirectivesRule,
      UniqueArgumentNamesRule,
      UniqueInputFieldNamesRule,
      ProvidedRequiredArgumentsOnDirectivesRule
    ]);
  }
});

// node_modules/graphql/validation/ValidationContext.mjs
var ASTValidationContext, SDLValidationContext, ValidationContext;
var init_ValidationContext = __esm({
  "node_modules/graphql/validation/ValidationContext.mjs"() {
    init_kinds();
    init_visitor();
    init_TypeInfo();
    ASTValidationContext = class {
      constructor(ast, onError) {
        this._ast = ast;
        this._fragments = void 0;
        this._fragmentSpreads = /* @__PURE__ */ new Map();
        this._recursivelyReferencedFragments = /* @__PURE__ */ new Map();
        this._onError = onError;
      }
      get [Symbol.toStringTag]() {
        return "ASTValidationContext";
      }
      reportError(error) {
        this._onError(error);
      }
      getDocument() {
        return this._ast;
      }
      getFragment(name) {
        let fragments;
        if (this._fragments) {
          fragments = this._fragments;
        } else {
          fragments = /* @__PURE__ */ Object.create(null);
          for (const defNode of this.getDocument().definitions) {
            if (defNode.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[defNode.name.value] = defNode;
            }
          }
          this._fragments = fragments;
        }
        return fragments[name];
      }
      getFragmentSpreads(node) {
        let spreads = this._fragmentSpreads.get(node);
        if (!spreads) {
          spreads = [];
          const setsToVisit = [node];
          let set;
          while (set = setsToVisit.pop()) {
            for (const selection of set.selections) {
              if (selection.kind === Kind.FRAGMENT_SPREAD) {
                spreads.push(selection);
              } else if (selection.selectionSet) {
                setsToVisit.push(selection.selectionSet);
              }
            }
          }
          this._fragmentSpreads.set(node, spreads);
        }
        return spreads;
      }
      getRecursivelyReferencedFragments(operation) {
        let fragments = this._recursivelyReferencedFragments.get(operation);
        if (!fragments) {
          fragments = [];
          const collectedNames = /* @__PURE__ */ Object.create(null);
          const nodesToVisit = [operation.selectionSet];
          let node;
          while (node = nodesToVisit.pop()) {
            for (const spread of this.getFragmentSpreads(node)) {
              const fragName = spread.name.value;
              if (collectedNames[fragName] !== true) {
                collectedNames[fragName] = true;
                const fragment = this.getFragment(fragName);
                if (fragment) {
                  fragments.push(fragment);
                  nodesToVisit.push(fragment.selectionSet);
                }
              }
            }
          }
          this._recursivelyReferencedFragments.set(operation, fragments);
        }
        return fragments;
      }
    };
    SDLValidationContext = class extends ASTValidationContext {
      constructor(ast, schema, onError) {
        super(ast, onError);
        this._schema = schema;
      }
      get [Symbol.toStringTag]() {
        return "SDLValidationContext";
      }
      getSchema() {
        return this._schema;
      }
    };
    ValidationContext = class extends ASTValidationContext {
      constructor(schema, ast, typeInfo, onError) {
        super(ast, onError);
        this._schema = schema;
        this._typeInfo = typeInfo;
        this._variableUsages = /* @__PURE__ */ new Map();
        this._recursiveVariableUsages = /* @__PURE__ */ new Map();
      }
      get [Symbol.toStringTag]() {
        return "ValidationContext";
      }
      getSchema() {
        return this._schema;
      }
      getVariableUsages(node) {
        let usages = this._variableUsages.get(node);
        if (!usages) {
          const newUsages = [];
          const typeInfo = new TypeInfo(this._schema);
          visit(
            node,
            visitWithTypeInfo(typeInfo, {
              VariableDefinition: () => false,
              Variable(variable) {
                newUsages.push({
                  node: variable,
                  type: typeInfo.getInputType(),
                  defaultValue: typeInfo.getDefaultValue()
                });
              }
            })
          );
          usages = newUsages;
          this._variableUsages.set(node, usages);
        }
        return usages;
      }
      getRecursiveVariableUsages(operation) {
        let usages = this._recursiveVariableUsages.get(operation);
        if (!usages) {
          usages = this.getVariableUsages(operation);
          for (const frag of this.getRecursivelyReferencedFragments(operation)) {
            usages = usages.concat(this.getVariableUsages(frag));
          }
          this._recursiveVariableUsages.set(operation, usages);
        }
        return usages;
      }
      getType() {
        return this._typeInfo.getType();
      }
      getParentType() {
        return this._typeInfo.getParentType();
      }
      getInputType() {
        return this._typeInfo.getInputType();
      }
      getParentInputType() {
        return this._typeInfo.getParentInputType();
      }
      getFieldDef() {
        return this._typeInfo.getFieldDef();
      }
      getDirective() {
        return this._typeInfo.getDirective();
      }
      getArgument() {
        return this._typeInfo.getArgument();
      }
      getEnumValue() {
        return this._typeInfo.getEnumValue();
      }
    };
  }
});

// node_modules/graphql/validation/validate.mjs
var init_validate2 = __esm({
  "node_modules/graphql/validation/validate.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_visitor();
    init_validate();
    init_TypeInfo();
    init_specifiedRules();
    init_ValidationContext();
  }
});

// node_modules/graphql/jsutils/memoize3.mjs
function memoize3(fn) {
  let cache0;
  return function memoized(a1, a2, a3) {
    if (cache0 === void 0) {
      cache0 = /* @__PURE__ */ new WeakMap();
    }
    let cache1 = cache0.get(a1);
    if (cache1 === void 0) {
      cache1 = /* @__PURE__ */ new WeakMap();
      cache0.set(a1, cache1);
    }
    let cache2 = cache1.get(a2);
    if (cache2 === void 0) {
      cache2 = /* @__PURE__ */ new WeakMap();
      cache1.set(a2, cache2);
    }
    let fnResult = cache2.get(a3);
    if (fnResult === void 0) {
      fnResult = fn(a1, a2, a3);
      cache2.set(a3, fnResult);
    }
    return fnResult;
  };
}
var init_memoize3 = __esm({
  "node_modules/graphql/jsutils/memoize3.mjs"() {
  }
});

// node_modules/graphql/jsutils/promiseForObject.mjs
var init_promiseForObject = __esm({
  "node_modules/graphql/jsutils/promiseForObject.mjs"() {
  }
});

// node_modules/graphql/jsutils/promiseReduce.mjs
var init_promiseReduce = __esm({
  "node_modules/graphql/jsutils/promiseReduce.mjs"() {
    init_isPromise();
  }
});

// node_modules/graphql/jsutils/toError.mjs
var init_toError = __esm({
  "node_modules/graphql/jsutils/toError.mjs"() {
    init_inspect();
  }
});

// node_modules/graphql/error/locatedError.mjs
var init_locatedError = __esm({
  "node_modules/graphql/error/locatedError.mjs"() {
    init_toError();
    init_GraphQLError();
  }
});

// node_modules/graphql/execution/execute.mjs
var collectSubfields2;
var init_execute = __esm({
  "node_modules/graphql/execution/execute.mjs"() {
    init_devAssert();
    init_inspect();
    init_invariant2();
    init_isIterableObject();
    init_isObjectLike();
    init_isPromise();
    init_memoize3();
    init_Path();
    init_promiseForObject();
    init_promiseReduce();
    init_GraphQLError();
    init_locatedError();
    init_ast();
    init_kinds();
    init_definition();
    init_introspection();
    init_validate();
    init_collectFields();
    init_values();
    collectSubfields2 = memoize3(
      (exeContext, returnType, fieldNodes) => collectSubfields(
        exeContext.schema,
        exeContext.fragments,
        exeContext.variableValues,
        returnType,
        fieldNodes
      )
    );
  }
});

// node_modules/graphql/graphql.mjs
var init_graphql = __esm({
  "node_modules/graphql/graphql.mjs"() {
    init_devAssert();
    init_isPromise();
    init_parser();
    init_validate();
    init_validate2();
    init_execute();
  }
});

// node_modules/graphql/type/index.mjs
var init_type = __esm({
  "node_modules/graphql/type/index.mjs"() {
    init_schema();
    init_definition();
    init_directives();
    init_scalars();
    init_introspection();
    init_validate();
    init_assertName();
  }
});

// node_modules/graphql/language/index.mjs
var init_language = __esm({
  "node_modules/graphql/language/index.mjs"() {
    init_source();
    init_location();
    init_printLocation();
    init_kinds();
    init_tokenKind();
    init_lexer();
    init_parser();
    init_printer();
    init_visitor();
    init_ast();
    init_predicates();
    init_directiveLocation();
  }
});

// node_modules/graphql/jsutils/isAsyncIterable.mjs
var init_isAsyncIterable = __esm({
  "node_modules/graphql/jsutils/isAsyncIterable.mjs"() {
  }
});

// node_modules/graphql/execution/mapAsyncIterator.mjs
var init_mapAsyncIterator = __esm({
  "node_modules/graphql/execution/mapAsyncIterator.mjs"() {
  }
});

// node_modules/graphql/execution/subscribe.mjs
var init_subscribe = __esm({
  "node_modules/graphql/execution/subscribe.mjs"() {
    init_devAssert();
    init_inspect();
    init_isAsyncIterable();
    init_Path();
    init_GraphQLError();
    init_locatedError();
    init_collectFields();
    init_execute();
    init_mapAsyncIterator();
    init_values();
  }
});

// node_modules/graphql/execution/index.mjs
var init_execution = __esm({
  "node_modules/graphql/execution/index.mjs"() {
    init_Path();
    init_execute();
    init_subscribe();
    init_values();
  }
});

// node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs
var init_NoDeprecatedCustomRule = __esm({
  "node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs"() {
    init_invariant2();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs
var init_NoSchemaIntrospectionCustomRule = __esm({
  "node_modules/graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs"() {
    init_GraphQLError();
    init_definition();
    init_introspection();
  }
});

// node_modules/graphql/validation/index.mjs
var init_validation = __esm({
  "node_modules/graphql/validation/index.mjs"() {
    init_validate2();
    init_ValidationContext();
    init_specifiedRules();
    init_ExecutableDefinitionsRule();
    init_FieldsOnCorrectTypeRule();
    init_FragmentsOnCompositeTypesRule();
    init_KnownArgumentNamesRule();
    init_KnownDirectivesRule();
    init_KnownFragmentNamesRule();
    init_KnownTypeNamesRule();
    init_LoneAnonymousOperationRule();
    init_NoFragmentCyclesRule();
    init_NoUndefinedVariablesRule();
    init_NoUnusedFragmentsRule();
    init_NoUnusedVariablesRule();
    init_OverlappingFieldsCanBeMergedRule();
    init_PossibleFragmentSpreadsRule();
    init_ProvidedRequiredArgumentsRule();
    init_ScalarLeafsRule();
    init_SingleFieldSubscriptionsRule();
    init_UniqueArgumentNamesRule();
    init_UniqueDirectivesPerLocationRule();
    init_UniqueFragmentNamesRule();
    init_UniqueInputFieldNamesRule();
    init_UniqueOperationNamesRule();
    init_UniqueVariableNamesRule();
    init_ValuesOfCorrectTypeRule();
    init_VariablesAreInputTypesRule();
    init_VariablesInAllowedPositionRule();
    init_MaxIntrospectionDepthRule();
    init_LoneSchemaDefinitionRule();
    init_UniqueOperationTypesRule();
    init_UniqueTypeNamesRule();
    init_UniqueEnumValueNamesRule();
    init_UniqueFieldDefinitionNamesRule();
    init_UniqueArgumentDefinitionNamesRule();
    init_UniqueDirectiveNamesRule();
    init_PossibleTypeExtensionsRule();
    init_NoDeprecatedCustomRule();
    init_NoSchemaIntrospectionCustomRule();
  }
});

// node_modules/graphql/error/index.mjs
var init_error = __esm({
  "node_modules/graphql/error/index.mjs"() {
    init_GraphQLError();
    init_syntaxError();
    init_locatedError();
  }
});

// node_modules/graphql/utilities/getIntrospectionQuery.mjs
var init_getIntrospectionQuery = __esm({
  "node_modules/graphql/utilities/getIntrospectionQuery.mjs"() {
  }
});

// node_modules/graphql/utilities/getOperationAST.mjs
var init_getOperationAST = __esm({
  "node_modules/graphql/utilities/getOperationAST.mjs"() {
    init_kinds();
  }
});

// node_modules/graphql/utilities/getOperationRootType.mjs
var init_getOperationRootType = __esm({
  "node_modules/graphql/utilities/getOperationRootType.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/graphql/utilities/introspectionFromSchema.mjs
var init_introspectionFromSchema = __esm({
  "node_modules/graphql/utilities/introspectionFromSchema.mjs"() {
    init_invariant2();
    init_parser();
    init_execute();
    init_getIntrospectionQuery();
  }
});

// node_modules/graphql/utilities/buildClientSchema.mjs
var init_buildClientSchema = __esm({
  "node_modules/graphql/utilities/buildClientSchema.mjs"() {
    init_devAssert();
    init_inspect();
    init_isObjectLike();
    init_keyValMap();
    init_parser();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_schema();
    init_valueFromAST();
  }
});

// node_modules/graphql/utilities/extendSchema.mjs
var stdTypeMap;
var init_extendSchema = __esm({
  "node_modules/graphql/utilities/extendSchema.mjs"() {
    init_devAssert();
    init_inspect();
    init_invariant2();
    init_keyMap();
    init_mapValue();
    init_kinds();
    init_predicates();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_schema();
    init_validate2();
    init_values();
    init_valueFromAST();
    stdTypeMap = keyMap(
      [...specifiedScalarTypes, ...introspectionTypes],
      (type) => type.name
    );
  }
});

// node_modules/graphql/utilities/buildASTSchema.mjs
var init_buildASTSchema = __esm({
  "node_modules/graphql/utilities/buildASTSchema.mjs"() {
    init_devAssert();
    init_kinds();
    init_parser();
    init_directives();
    init_schema();
    init_validate2();
    init_extendSchema();
  }
});

// node_modules/graphql/utilities/lexicographicSortSchema.mjs
var init_lexicographicSortSchema = __esm({
  "node_modules/graphql/utilities/lexicographicSortSchema.mjs"() {
    init_inspect();
    init_invariant2();
    init_keyValMap();
    init_naturalCompare();
    init_definition();
    init_directives();
    init_introspection();
    init_schema();
  }
});

// node_modules/graphql/utilities/printSchema.mjs
var init_printSchema = __esm({
  "node_modules/graphql/utilities/printSchema.mjs"() {
    init_inspect();
    init_invariant2();
    init_blockString();
    init_kinds();
    init_printer();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_astFromValue();
  }
});

// node_modules/graphql/utilities/concatAST.mjs
var init_concatAST = __esm({
  "node_modules/graphql/utilities/concatAST.mjs"() {
    init_kinds();
  }
});

// node_modules/graphql/utilities/separateOperations.mjs
var init_separateOperations = __esm({
  "node_modules/graphql/utilities/separateOperations.mjs"() {
    init_kinds();
    init_visitor();
  }
});

// node_modules/graphql/utilities/stripIgnoredCharacters.mjs
var init_stripIgnoredCharacters = __esm({
  "node_modules/graphql/utilities/stripIgnoredCharacters.mjs"() {
    init_blockString();
    init_lexer();
    init_source();
    init_tokenKind();
  }
});

// node_modules/graphql/utilities/assertValidName.mjs
var init_assertValidName = __esm({
  "node_modules/graphql/utilities/assertValidName.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_assertName();
  }
});

// node_modules/graphql/utilities/findBreakingChanges.mjs
var BreakingChangeType, DangerousChangeType;
var init_findBreakingChanges = __esm({
  "node_modules/graphql/utilities/findBreakingChanges.mjs"() {
    init_inspect();
    init_invariant2();
    init_keyMap();
    init_printer();
    init_definition();
    init_scalars();
    init_astFromValue();
    init_sortValueNode();
    (function(BreakingChangeType2) {
      BreakingChangeType2["TYPE_REMOVED"] = "TYPE_REMOVED";
      BreakingChangeType2["TYPE_CHANGED_KIND"] = "TYPE_CHANGED_KIND";
      BreakingChangeType2["TYPE_REMOVED_FROM_UNION"] = "TYPE_REMOVED_FROM_UNION";
      BreakingChangeType2["VALUE_REMOVED_FROM_ENUM"] = "VALUE_REMOVED_FROM_ENUM";
      BreakingChangeType2["REQUIRED_INPUT_FIELD_ADDED"] = "REQUIRED_INPUT_FIELD_ADDED";
      BreakingChangeType2["IMPLEMENTED_INTERFACE_REMOVED"] = "IMPLEMENTED_INTERFACE_REMOVED";
      BreakingChangeType2["FIELD_REMOVED"] = "FIELD_REMOVED";
      BreakingChangeType2["FIELD_CHANGED_KIND"] = "FIELD_CHANGED_KIND";
      BreakingChangeType2["REQUIRED_ARG_ADDED"] = "REQUIRED_ARG_ADDED";
      BreakingChangeType2["ARG_REMOVED"] = "ARG_REMOVED";
      BreakingChangeType2["ARG_CHANGED_KIND"] = "ARG_CHANGED_KIND";
      BreakingChangeType2["DIRECTIVE_REMOVED"] = "DIRECTIVE_REMOVED";
      BreakingChangeType2["DIRECTIVE_ARG_REMOVED"] = "DIRECTIVE_ARG_REMOVED";
      BreakingChangeType2["REQUIRED_DIRECTIVE_ARG_ADDED"] = "REQUIRED_DIRECTIVE_ARG_ADDED";
      BreakingChangeType2["DIRECTIVE_REPEATABLE_REMOVED"] = "DIRECTIVE_REPEATABLE_REMOVED";
      BreakingChangeType2["DIRECTIVE_LOCATION_REMOVED"] = "DIRECTIVE_LOCATION_REMOVED";
    })(BreakingChangeType || (BreakingChangeType = {}));
    (function(DangerousChangeType2) {
      DangerousChangeType2["VALUE_ADDED_TO_ENUM"] = "VALUE_ADDED_TO_ENUM";
      DangerousChangeType2["TYPE_ADDED_TO_UNION"] = "TYPE_ADDED_TO_UNION";
      DangerousChangeType2["OPTIONAL_INPUT_FIELD_ADDED"] = "OPTIONAL_INPUT_FIELD_ADDED";
      DangerousChangeType2["OPTIONAL_ARG_ADDED"] = "OPTIONAL_ARG_ADDED";
      DangerousChangeType2["IMPLEMENTED_INTERFACE_ADDED"] = "IMPLEMENTED_INTERFACE_ADDED";
      DangerousChangeType2["ARG_DEFAULT_VALUE_CHANGE"] = "ARG_DEFAULT_VALUE_CHANGE";
    })(DangerousChangeType || (DangerousChangeType = {}));
  }
});

// node_modules/graphql/utilities/index.mjs
var init_utilities = __esm({
  "node_modules/graphql/utilities/index.mjs"() {
    init_getIntrospectionQuery();
    init_getOperationAST();
    init_getOperationRootType();
    init_introspectionFromSchema();
    init_buildClientSchema();
    init_buildASTSchema();
    init_extendSchema();
    init_lexicographicSortSchema();
    init_printSchema();
    init_typeFromAST();
    init_valueFromAST();
    init_valueFromASTUntyped();
    init_astFromValue();
    init_TypeInfo();
    init_coerceInputValue();
    init_concatAST();
    init_separateOperations();
    init_stripIgnoredCharacters();
    init_typeComparators();
    init_assertValidName();
    init_findBreakingChanges();
  }
});

// node_modules/graphql/index.mjs
var init_graphql2 = __esm({
  "node_modules/graphql/index.mjs"() {
    init_version2();
    init_graphql();
    init_type();
    init_language();
    init_execution();
    init_validation();
    init_error();
    init_utilities();
  }
});

// node_modules/@apollo/client/utilities/graphql/fragments.js
function getFragmentQueryDocument(document, fragmentName) {
  var actualFragmentName = fragmentName;
  var fragments = [];
  document.definitions.forEach(function(definition) {
    if (definition.kind === "OperationDefinition") {
      throw newInvariantError(
        85,
        definition.operation,
        definition.name ? " named '".concat(definition.name.value, "'") : ""
      );
    }
    if (definition.kind === "FragmentDefinition") {
      fragments.push(definition);
    }
  });
  if (typeof actualFragmentName === "undefined") {
    invariant2(fragments.length === 1, 86, fragments.length);
    actualFragmentName = fragments[0].name.value;
  }
  var query = __assign(__assign({}, document), { definitions: __spreadArray([
    {
      kind: "OperationDefinition",
      // OperationTypeNode is an enum
      operation: "query",
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: actualFragmentName
            }
          }
        ]
      }
    }
  ], document.definitions, true) });
  return query;
}
function createFragmentMap(fragments) {
  if (fragments === void 0) {
    fragments = [];
  }
  var symTable = {};
  fragments.forEach(function(fragment) {
    symTable[fragment.name.value] = fragment;
  });
  return symTable;
}
function getFragmentFromSelection(selection, fragmentMap) {
  switch (selection.kind) {
    case "InlineFragment":
      return selection;
    case "FragmentSpread": {
      var fragmentName = selection.name.value;
      if (typeof fragmentMap === "function") {
        return fragmentMap(fragmentName);
      }
      var fragment = fragmentMap && fragmentMap[fragmentName];
      invariant2(fragment, 87, fragmentName);
      return fragment || null;
    }
    default:
      return null;
  }
}
function isFullyUnmaskedOperation(document) {
  var isUnmasked = true;
  visit(document, {
    FragmentSpread: function(node) {
      isUnmasked = !!node.directives && node.directives.some(function(directive) {
        return directive.name.value === "unmask";
      });
      if (!isUnmasked) {
        return BREAK;
      }
    }
  });
  return isUnmasked;
}
var init_fragments = __esm({
  "node_modules/@apollo/client/utilities/graphql/fragments.js"() {
    init_tslib_es6();
    init_globals();
    init_graphql2();
  }
});

// node_modules/@wry/caches/lib/strong.js
function defaultDispose() {
}
var StrongCache;
var init_strong = __esm({
  "node_modules/@wry/caches/lib/strong.js"() {
    StrongCache = class {
      constructor(max = Infinity, dispose = defaultDispose) {
        this.max = max;
        this.dispose = dispose;
        this.map = /* @__PURE__ */ new Map();
        this.newest = null;
        this.oldest = null;
      }
      has(key) {
        return this.map.has(key);
      }
      get(key) {
        const node = this.getNode(key);
        return node && node.value;
      }
      get size() {
        return this.map.size;
      }
      getNode(key) {
        const node = this.map.get(key);
        if (node && node !== this.newest) {
          const { older, newer } = node;
          if (newer) {
            newer.older = older;
          }
          if (older) {
            older.newer = newer;
          }
          node.older = this.newest;
          node.older.newer = node;
          node.newer = null;
          this.newest = node;
          if (node === this.oldest) {
            this.oldest = newer;
          }
        }
        return node;
      }
      set(key, value) {
        let node = this.getNode(key);
        if (node) {
          return node.value = value;
        }
        node = {
          key,
          value,
          newer: null,
          older: this.newest
        };
        if (this.newest) {
          this.newest.newer = node;
        }
        this.newest = node;
        this.oldest = this.oldest || node;
        this.map.set(key, node);
        return node.value;
      }
      clean() {
        while (this.oldest && this.map.size > this.max) {
          this.delete(this.oldest.key);
        }
      }
      delete(key) {
        const node = this.map.get(key);
        if (node) {
          if (node === this.newest) {
            this.newest = node.older;
          }
          if (node === this.oldest) {
            this.oldest = node.newer;
          }
          if (node.newer) {
            node.newer.older = node.older;
          }
          if (node.older) {
            node.older.newer = node.newer;
          }
          this.map.delete(key);
          this.dispose(node.value, key);
          return true;
        }
        return false;
      }
    };
  }
});

// node_modules/@wry/caches/lib/weak.js
function noop() {
}
var defaultDispose2, _WeakRef, _WeakMap, _FinalizationRegistry, finalizationBatchSize, WeakCache;
var init_weak = __esm({
  "node_modules/@wry/caches/lib/weak.js"() {
    defaultDispose2 = noop;
    _WeakRef = typeof WeakRef !== "undefined" ? WeakRef : function(value) {
      return { deref: () => value };
    };
    _WeakMap = typeof WeakMap !== "undefined" ? WeakMap : Map;
    _FinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : function() {
      return {
        register: noop,
        unregister: noop
      };
    };
    finalizationBatchSize = 10024;
    WeakCache = class {
      constructor(max = Infinity, dispose = defaultDispose2) {
        this.max = max;
        this.dispose = dispose;
        this.map = new _WeakMap();
        this.newest = null;
        this.oldest = null;
        this.unfinalizedNodes = /* @__PURE__ */ new Set();
        this.finalizationScheduled = false;
        this.size = 0;
        this.finalize = () => {
          const iterator = this.unfinalizedNodes.values();
          for (let i = 0; i < finalizationBatchSize; i++) {
            const node = iterator.next().value;
            if (!node)
              break;
            this.unfinalizedNodes.delete(node);
            const key = node.key;
            delete node.key;
            node.keyRef = new _WeakRef(key);
            this.registry.register(key, node, node);
          }
          if (this.unfinalizedNodes.size > 0) {
            queueMicrotask(this.finalize);
          } else {
            this.finalizationScheduled = false;
          }
        };
        this.registry = new _FinalizationRegistry(this.deleteNode.bind(this));
      }
      has(key) {
        return this.map.has(key);
      }
      get(key) {
        const node = this.getNode(key);
        return node && node.value;
      }
      getNode(key) {
        const node = this.map.get(key);
        if (node && node !== this.newest) {
          const { older, newer } = node;
          if (newer) {
            newer.older = older;
          }
          if (older) {
            older.newer = newer;
          }
          node.older = this.newest;
          node.older.newer = node;
          node.newer = null;
          this.newest = node;
          if (node === this.oldest) {
            this.oldest = newer;
          }
        }
        return node;
      }
      set(key, value) {
        let node = this.getNode(key);
        if (node) {
          return node.value = value;
        }
        node = {
          key,
          value,
          newer: null,
          older: this.newest
        };
        if (this.newest) {
          this.newest.newer = node;
        }
        this.newest = node;
        this.oldest = this.oldest || node;
        this.scheduleFinalization(node);
        this.map.set(key, node);
        this.size++;
        return node.value;
      }
      clean() {
        while (this.oldest && this.size > this.max) {
          this.deleteNode(this.oldest);
        }
      }
      deleteNode(node) {
        if (node === this.newest) {
          this.newest = node.older;
        }
        if (node === this.oldest) {
          this.oldest = node.newer;
        }
        if (node.newer) {
          node.newer.older = node.older;
        }
        if (node.older) {
          node.older.newer = node.newer;
        }
        this.size--;
        const key = node.key || node.keyRef && node.keyRef.deref();
        this.dispose(node.value, key);
        if (!node.keyRef) {
          this.unfinalizedNodes.delete(node);
        } else {
          this.registry.unregister(node);
        }
        if (key)
          this.map.delete(key);
      }
      delete(key) {
        const node = this.map.get(key);
        if (node) {
          this.deleteNode(node);
          return true;
        }
        return false;
      }
      scheduleFinalization(node) {
        this.unfinalizedNodes.add(node);
        if (!this.finalizationScheduled) {
          this.finalizationScheduled = true;
          queueMicrotask(this.finalize);
        }
      }
    };
  }
});

// node_modules/@wry/caches/lib/index.js
var init_lib = __esm({
  "node_modules/@wry/caches/lib/index.js"() {
    init_strong();
    init_weak();
  }
});

// node_modules/@apollo/client/utilities/caching/caches.js
function schedule(cache) {
  if (cache.size <= (cache.max || -1)) {
    return;
  }
  if (!scheduledCleanup.has(cache)) {
    scheduledCleanup.add(cache);
    setTimeout(function() {
      cache.clean();
      scheduledCleanup.delete(cache);
    }, 100);
  }
}
var scheduledCleanup, AutoCleanedWeakCache, AutoCleanedStrongCache;
var init_caches = __esm({
  "node_modules/@apollo/client/utilities/caching/caches.js"() {
    init_lib();
    scheduledCleanup = /* @__PURE__ */ new WeakSet();
    AutoCleanedWeakCache = function(max, dispose) {
      var cache = new WeakCache(max, dispose);
      cache.set = function(key, value) {
        var ret = WeakCache.prototype.set.call(this, key, value);
        schedule(this);
        return ret;
      };
      return cache;
    };
    AutoCleanedStrongCache = function(max, dispose) {
      var cache = new StrongCache(max, dispose);
      cache.set = function(key, value) {
        var ret = StrongCache.prototype.set.call(this, key, value);
        schedule(this);
        return ret;
      };
      return cache;
    };
  }
});

// node_modules/@apollo/client/utilities/caching/sizes.js
var cacheSizeSymbol, cacheSizes;
var init_sizes = __esm({
  "node_modules/@apollo/client/utilities/caching/sizes.js"() {
    init_tslib_es6();
    init_globals();
    cacheSizeSymbol = Symbol.for("apollo.cacheSize");
    cacheSizes = __assign({}, global_default[cacheSizeSymbol]);
  }
});

// node_modules/@apollo/client/utilities/caching/index.js
var init_caching = __esm({
  "node_modules/@apollo/client/utilities/caching/index.js"() {
    init_caches();
    init_sizes();
  }
});

// node_modules/@apollo/client/utilities/caching/getMemoryInternals.js
function registerGlobalCache(name, getSize) {
  globalCaches[name] = getSize;
}
function getCurrentCacheSizes() {
  var defaults = {
    parser: 1e3,
    canonicalStringify: 1e3,
    print: 2e3,
    "documentTransform.cache": 2e3,
    "queryManager.getDocumentInfo": 2e3,
    "PersistedQueryLink.persistedQueryHashes": 2e3,
    "fragmentRegistry.transform": 2e3,
    "fragmentRegistry.lookup": 1e3,
    "fragmentRegistry.findFragmentSpreads": 4e3,
    "cache.fragmentQueryDocuments": 1e3,
    "removeTypenameFromVariables.getVariableDefinitions": 2e3,
    "inMemoryCache.maybeBroadcastWatch": 5e3,
    "inMemoryCache.executeSelectionSet": 5e4,
    "inMemoryCache.executeSubSelectedArray": 1e4
  };
  return Object.fromEntries(Object.entries(defaults).map(function(_a2) {
    var k = _a2[0], v = _a2[1];
    return [
      k,
      cacheSizes[k] || v
    ];
  }));
}
function _getApolloClientMemoryInternals() {
  var _a2, _b, _c, _d, _e;
  if (!(globalThis.__DEV__ !== false))
    throw new Error("only supported in development mode");
  return {
    limits: getCurrentCacheSizes(),
    sizes: __assign({ print: (_a2 = globalCaches.print) === null || _a2 === void 0 ? void 0 : _a2.call(globalCaches), parser: (_b = globalCaches.parser) === null || _b === void 0 ? void 0 : _b.call(globalCaches), canonicalStringify: (_c = globalCaches.canonicalStringify) === null || _c === void 0 ? void 0 : _c.call(globalCaches), links: linkInfo(this.link), queryManager: {
      getDocumentInfo: this["queryManager"]["transformCache"].size,
      documentTransforms: transformInfo(this["queryManager"].documentTransform)
    } }, (_e = (_d = this.cache).getMemoryInternals) === null || _e === void 0 ? void 0 : _e.call(_d))
  };
}
function _getApolloCacheMemoryInternals() {
  return {
    cache: {
      fragmentQueryDocuments: getWrapperInformation(this["getFragmentDoc"])
    }
  };
}
function _getInMemoryCacheMemoryInternals() {
  var fragments = this.config.fragments;
  return __assign(__assign({}, _getApolloCacheMemoryInternals.apply(this)), { addTypenameDocumentTransform: transformInfo(this["addTypenameTransform"]), inMemoryCache: {
    executeSelectionSet: getWrapperInformation(this["storeReader"]["executeSelectionSet"]),
    executeSubSelectedArray: getWrapperInformation(this["storeReader"]["executeSubSelectedArray"]),
    maybeBroadcastWatch: getWrapperInformation(this["maybeBroadcastWatch"])
  }, fragmentRegistry: {
    findFragmentSpreads: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.findFragmentSpreads),
    lookup: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.lookup),
    transform: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.transform)
  } });
}
function isWrapper(f) {
  return !!f && "dirtyKey" in f;
}
function getWrapperInformation(f) {
  return isWrapper(f) ? f.size : void 0;
}
function isDefined(value) {
  return value != null;
}
function transformInfo(transform) {
  return recurseTransformInfo(transform).map(function(cache) {
    return { cache };
  });
}
function recurseTransformInfo(transform) {
  return transform ? __spreadArray(__spreadArray([
    getWrapperInformation(transform === null || transform === void 0 ? void 0 : transform["performWork"])
  ], recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["left"]), true), recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["right"]), true).filter(isDefined) : [];
}
function linkInfo(link) {
  var _a2;
  return link ? __spreadArray(__spreadArray([
    (_a2 = link === null || link === void 0 ? void 0 : link.getMemoryInternals) === null || _a2 === void 0 ? void 0 : _a2.call(link)
  ], linkInfo(link === null || link === void 0 ? void 0 : link.left), true), linkInfo(link === null || link === void 0 ? void 0 : link.right), true).filter(isDefined) : [];
}
var globalCaches, getApolloClientMemoryInternals, getInMemoryCacheMemoryInternals, getApolloCacheMemoryInternals;
var init_getMemoryInternals = __esm({
  "node_modules/@apollo/client/utilities/caching/getMemoryInternals.js"() {
    init_tslib_es6();
    init_sizes();
    globalCaches = {};
    getApolloClientMemoryInternals = globalThis.__DEV__ !== false ? _getApolloClientMemoryInternals : void 0;
    getInMemoryCacheMemoryInternals = globalThis.__DEV__ !== false ? _getInMemoryCacheMemoryInternals : void 0;
    getApolloCacheMemoryInternals = globalThis.__DEV__ !== false ? _getApolloCacheMemoryInternals : void 0;
  }
});

// node_modules/@apollo/client/utilities/common/canonicalStringify.js
function stableObjectReplacer(key, value) {
  if (value && typeof value === "object") {
    var proto = Object.getPrototypeOf(value);
    if (proto === Object.prototype || proto === null) {
      var keys = Object.keys(value);
      if (keys.every(everyKeyInOrder))
        return value;
      var unsortedKey = JSON.stringify(keys);
      var sortedKeys = sortingMap.get(unsortedKey);
      if (!sortedKeys) {
        keys.sort();
        var sortedKey = JSON.stringify(keys);
        sortedKeys = sortingMap.get(sortedKey) || keys;
        sortingMap.set(unsortedKey, sortedKeys);
        sortingMap.set(sortedKey, sortedKeys);
      }
      var sortedObject_1 = Object.create(proto);
      sortedKeys.forEach(function(key2) {
        sortedObject_1[key2] = value[key2];
      });
      return sortedObject_1;
    }
  }
  return value;
}
function everyKeyInOrder(key, i, keys) {
  return i === 0 || keys[i - 1] <= key;
}
var canonicalStringify, sortingMap;
var init_canonicalStringify = __esm({
  "node_modules/@apollo/client/utilities/common/canonicalStringify.js"() {
    init_caching();
    init_getMemoryInternals();
    canonicalStringify = Object.assign(function canonicalStringify2(value) {
      return JSON.stringify(value, stableObjectReplacer);
    }, {
      reset: function() {
        sortingMap = new AutoCleanedStrongCache(
          cacheSizes.canonicalStringify || 1e3
          /* defaultCacheSizes.canonicalStringify */
        );
      }
    });
    if (globalThis.__DEV__ !== false) {
      registerGlobalCache("canonicalStringify", function() {
        return sortingMap.size;
      });
    }
    canonicalStringify.reset();
  }
});

// node_modules/@apollo/client/utilities/graphql/storeUtils.js
function makeReference(id) {
  return { __ref: String(id) };
}
function isReference(obj) {
  return Boolean(obj && typeof obj === "object" && typeof obj.__ref === "string");
}
function isDocumentNode(value) {
  return isNonNullObject(value) && value.kind === "Document" && Array.isArray(value.definitions);
}
function isStringValue(value) {
  return value.kind === "StringValue";
}
function isBooleanValue(value) {
  return value.kind === "BooleanValue";
}
function isIntValue(value) {
  return value.kind === "IntValue";
}
function isFloatValue(value) {
  return value.kind === "FloatValue";
}
function isVariable(value) {
  return value.kind === "Variable";
}
function isObjectValue(value) {
  return value.kind === "ObjectValue";
}
function isListValue(value) {
  return value.kind === "ListValue";
}
function isEnumValue(value) {
  return value.kind === "EnumValue";
}
function isNullValue(value) {
  return value.kind === "NullValue";
}
function valueToObjectRepresentation(argObj, name, value, variables) {
  if (isIntValue(value) || isFloatValue(value)) {
    argObj[name.value] = Number(value.value);
  } else if (isBooleanValue(value) || isStringValue(value)) {
    argObj[name.value] = value.value;
  } else if (isObjectValue(value)) {
    var nestedArgObj_1 = {};
    value.fields.map(function(obj) {
      return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
    });
    argObj[name.value] = nestedArgObj_1;
  } else if (isVariable(value)) {
    var variableValue = (variables || {})[value.name.value];
    argObj[name.value] = variableValue;
  } else if (isListValue(value)) {
    argObj[name.value] = value.values.map(function(listValue) {
      var nestedArgArrayObj = {};
      valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
      return nestedArgArrayObj[name.value];
    });
  } else if (isEnumValue(value)) {
    argObj[name.value] = value.value;
  } else if (isNullValue(value)) {
    argObj[name.value] = null;
  } else {
    throw newInvariantError(96, name.value, value.kind);
  }
}
function storeKeyNameFromField(field, variables) {
  var directivesObj = null;
  if (field.directives) {
    directivesObj = {};
    field.directives.forEach(function(directive) {
      directivesObj[directive.name.value] = {};
      if (directive.arguments) {
        directive.arguments.forEach(function(_a2) {
          var name = _a2.name, value = _a2.value;
          return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
        });
      }
    });
  }
  var argObj = null;
  if (field.arguments && field.arguments.length) {
    argObj = {};
    field.arguments.forEach(function(_a2) {
      var name = _a2.name, value = _a2.value;
      return valueToObjectRepresentation(argObj, name, value, variables);
    });
  }
  return getStoreKeyName(field.name.value, argObj, directivesObj);
}
function argumentsObjectFromField(field, variables) {
  if (field.arguments && field.arguments.length) {
    var argObj_1 = {};
    field.arguments.forEach(function(_a2) {
      var name = _a2.name, value = _a2.value;
      return valueToObjectRepresentation(argObj_1, name, value, variables);
    });
    return argObj_1;
  }
  return null;
}
function resultKeyNameFromField(field) {
  return field.alias ? field.alias.value : field.name.value;
}
function getTypenameFromResult(result2, selectionSet, fragmentMap) {
  var fragments;
  for (var _i = 0, _a2 = selectionSet.selections; _i < _a2.length; _i++) {
    var selection = _a2[_i];
    if (isField(selection)) {
      if (selection.name.value === "__typename") {
        return result2[resultKeyNameFromField(selection)];
      }
    } else if (fragments) {
      fragments.push(selection);
    } else {
      fragments = [selection];
    }
  }
  if (typeof result2.__typename === "string") {
    return result2.__typename;
  }
  if (fragments) {
    for (var _b = 0, fragments_1 = fragments; _b < fragments_1.length; _b++) {
      var selection = fragments_1[_b];
      var typename = getTypenameFromResult(result2, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);
      if (typeof typename === "string") {
        return typename;
      }
    }
  }
}
function isField(selection) {
  return selection.kind === "Field";
}
function isInlineFragment(selection) {
  return selection.kind === "InlineFragment";
}
var KNOWN_DIRECTIVES, storeKeyNameStringify, getStoreKeyName;
var init_storeUtils = __esm({
  "node_modules/@apollo/client/utilities/graphql/storeUtils.js"() {
    init_globals();
    init_objects();
    init_fragments();
    init_canonicalStringify();
    KNOWN_DIRECTIVES = [
      "connection",
      "include",
      "skip",
      "client",
      "rest",
      "export",
      "nonreactive"
    ];
    storeKeyNameStringify = canonicalStringify;
    getStoreKeyName = Object.assign(function(fieldName, args, directives) {
      if (args && directives && directives["connection"] && directives["connection"]["key"]) {
        if (directives["connection"]["filter"] && directives["connection"]["filter"].length > 0) {
          var filterKeys = directives["connection"]["filter"] ? directives["connection"]["filter"] : [];
          filterKeys.sort();
          var filteredArgs_1 = {};
          filterKeys.forEach(function(key) {
            filteredArgs_1[key] = args[key];
          });
          return "".concat(directives["connection"]["key"], "(").concat(storeKeyNameStringify(filteredArgs_1), ")");
        } else {
          return directives["connection"]["key"];
        }
      }
      var completeFieldName = fieldName;
      if (args) {
        var stringifiedArgs = storeKeyNameStringify(args);
        completeFieldName += "(".concat(stringifiedArgs, ")");
      }
      if (directives) {
        Object.keys(directives).forEach(function(key) {
          if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
            return;
          if (directives[key] && Object.keys(directives[key]).length) {
            completeFieldName += "@".concat(key, "(").concat(storeKeyNameStringify(directives[key]), ")");
          } else {
            completeFieldName += "@".concat(key);
          }
        });
      }
      return completeFieldName;
    }, {
      setStringify: function(s) {
        var previous = storeKeyNameStringify;
        storeKeyNameStringify = s;
        return previous;
      }
    });
  }
});

// node_modules/@wry/trie/lib/index.js
function isObjRef(value) {
  switch (typeof value) {
    case "object":
      if (value === null)
        break;
    case "function":
      return true;
  }
  return false;
}
var defaultMakeData, forEach, slice, hasOwnProperty2, Trie;
var init_lib2 = __esm({
  "node_modules/@wry/trie/lib/index.js"() {
    defaultMakeData = () => /* @__PURE__ */ Object.create(null);
    ({ forEach, slice } = Array.prototype);
    ({ hasOwnProperty: hasOwnProperty2 } = Object.prototype);
    Trie = class _Trie {
      constructor(weakness = true, makeData = defaultMakeData) {
        this.weakness = weakness;
        this.makeData = makeData;
      }
      lookup() {
        return this.lookupArray(arguments);
      }
      lookupArray(array) {
        let node = this;
        forEach.call(array, (key) => node = node.getChildTrie(key));
        return hasOwnProperty2.call(node, "data") ? node.data : node.data = this.makeData(slice.call(array));
      }
      peek() {
        return this.peekArray(arguments);
      }
      peekArray(array) {
        let node = this;
        for (let i = 0, len = array.length; node && i < len; ++i) {
          const map = node.mapFor(array[i], false);
          node = map && map.get(array[i]);
        }
        return node && node.data;
      }
      remove() {
        return this.removeArray(arguments);
      }
      removeArray(array) {
        let data;
        if (array.length) {
          const head = array[0];
          const map = this.mapFor(head, false);
          const child = map && map.get(head);
          if (child) {
            data = child.removeArray(slice.call(array, 1));
            if (!child.data && !child.weak && !(child.strong && child.strong.size)) {
              map.delete(head);
            }
          }
        } else {
          data = this.data;
          delete this.data;
        }
        return data;
      }
      getChildTrie(key) {
        const map = this.mapFor(key, true);
        let child = map.get(key);
        if (!child)
          map.set(key, child = new _Trie(this.weakness, this.makeData));
        return child;
      }
      mapFor(key, create) {
        return this.weakness && isObjRef(key) ? this.weak || (create ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (create ? this.strong = /* @__PURE__ */ new Map() : void 0);
      }
    };
  }
});

// node_modules/@apollo/client/utilities/common/canUse.js
var isReactNative, canUseWeakMap, canUseWeakSet, canUseSymbol, canUseAsyncIteratorSymbol, canUseDOM, usingJSDOM, canUseLayoutEffect;
var init_canUse = __esm({
  "node_modules/@apollo/client/utilities/common/canUse.js"() {
    init_globals();
    isReactNative = maybe(function() {
      return navigator.product;
    }) == "ReactNative";
    canUseWeakMap = typeof WeakMap === "function" && !(isReactNative && !global.HermesInternal);
    canUseWeakSet = typeof WeakSet === "function";
    canUseSymbol = typeof Symbol === "function" && typeof Symbol.for === "function";
    canUseAsyncIteratorSymbol = canUseSymbol && Symbol.asyncIterator;
    canUseDOM = typeof maybe(function() {
      return window.document.createElement;
    }) === "function";
    usingJSDOM = // Following advice found in this comment from @domenic (maintainer of jsdom):
    // https://github.com/jsdom/jsdom/issues/1537#issuecomment-229405327
    //
    // Since we control the version of Jest and jsdom used when running Apollo
    // Client tests, and that version is recent enought to include " jsdom/x.y.z"
    // at the end of the user agent string, I believe this case is all we need to
    // check. Testing for "Node.js" was recommended for backwards compatibility
    // with older version of jsdom, but we don't have that problem.
    maybe(function() {
      return navigator.userAgent.indexOf("jsdom") >= 0;
    }) || false;
    canUseLayoutEffect = (canUseDOM || isReactNative) && !usingJSDOM;
  }
});

// node_modules/@apollo/client/utilities/graphql/getFromAST.js
function checkDocument(doc) {
  invariant2(doc && doc.kind === "Document", 88);
  var operations = doc.definitions.filter(function(d) {
    return d.kind !== "FragmentDefinition";
  }).map(function(definition) {
    if (definition.kind !== "OperationDefinition") {
      throw newInvariantError(89, definition.kind);
    }
    return definition;
  });
  invariant2(operations.length <= 1, 90, operations.length);
  return doc;
}
function getOperationDefinition(doc) {
  checkDocument(doc);
  return doc.definitions.filter(function(definition) {
    return definition.kind === "OperationDefinition";
  })[0];
}
function getOperationName(doc) {
  return doc.definitions.filter(function(definition) {
    return definition.kind === "OperationDefinition" && !!definition.name;
  }).map(function(x) {
    return x.name.value;
  })[0] || null;
}
function getFragmentDefinitions(doc) {
  return doc.definitions.filter(function(definition) {
    return definition.kind === "FragmentDefinition";
  });
}
function getQueryDefinition(doc) {
  var queryDef = getOperationDefinition(doc);
  invariant2(queryDef && queryDef.operation === "query", 91);
  return queryDef;
}
function getFragmentDefinition(doc) {
  invariant2(doc.kind === "Document", 92);
  invariant2(doc.definitions.length <= 1, 93);
  var fragmentDef = doc.definitions[0];
  invariant2(fragmentDef.kind === "FragmentDefinition", 94);
  return fragmentDef;
}
function getMainDefinition(queryDoc) {
  checkDocument(queryDoc);
  var fragmentDefinition;
  for (var _i = 0, _a2 = queryDoc.definitions; _i < _a2.length; _i++) {
    var definition = _a2[_i];
    if (definition.kind === "OperationDefinition") {
      var operation = definition.operation;
      if (operation === "query" || operation === "mutation" || operation === "subscription") {
        return definition;
      }
    }
    if (definition.kind === "FragmentDefinition" && !fragmentDefinition) {
      fragmentDefinition = definition;
    }
  }
  if (fragmentDefinition) {
    return fragmentDefinition;
  }
  throw newInvariantError(95);
}
function getDefaultValues(definition) {
  var defaultValues = /* @__PURE__ */ Object.create(null);
  var defs = definition && definition.variableDefinitions;
  if (defs && defs.length) {
    defs.forEach(function(def) {
      if (def.defaultValue) {
        valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
      }
    });
  }
  return defaultValues;
}
var init_getFromAST = __esm({
  "node_modules/@apollo/client/utilities/graphql/getFromAST.js"() {
    init_globals();
    init_storeUtils();
  }
});

// node_modules/@wry/context/lib/slot.js
function maybe2(fn) {
  try {
    return fn();
  } catch (ignored) {
  }
}
var currentContext, MISSING_VALUE, idCounter, makeSlotClass, globalKey, host, globalHost, Slot;
var init_slot = __esm({
  "node_modules/@wry/context/lib/slot.js"() {
    currentContext = null;
    MISSING_VALUE = {};
    idCounter = 1;
    makeSlotClass = () => class Slot {
      constructor() {
        this.id = [
          "slot",
          idCounter++,
          Date.now(),
          Math.random().toString(36).slice(2)
        ].join(":");
      }
      hasValue() {
        for (let context = currentContext; context; context = context.parent) {
          if (this.id in context.slots) {
            const value = context.slots[this.id];
            if (value === MISSING_VALUE)
              break;
            if (context !== currentContext) {
              currentContext.slots[this.id] = value;
            }
            return true;
          }
        }
        if (currentContext) {
          currentContext.slots[this.id] = MISSING_VALUE;
        }
        return false;
      }
      getValue() {
        if (this.hasValue()) {
          return currentContext.slots[this.id];
        }
      }
      withValue(value, callback, args, thisArg) {
        const slots = {
          __proto__: null,
          [this.id]: value
        };
        const parent = currentContext;
        currentContext = { parent, slots };
        try {
          return callback.apply(thisArg, args);
        } finally {
          currentContext = parent;
        }
      }
      // Capture the current context and wrap a callback function so that it
      // reestablishes the captured context when called.
      static bind(callback) {
        const context = currentContext;
        return function() {
          const saved = currentContext;
          try {
            currentContext = context;
            return callback.apply(this, arguments);
          } finally {
            currentContext = saved;
          }
        };
      }
      // Immediately run a callback function without any captured context.
      static noContext(callback, args, thisArg) {
        if (currentContext) {
          const saved = currentContext;
          try {
            currentContext = null;
            return callback.apply(thisArg, args);
          } finally {
            currentContext = saved;
          }
        } else {
          return callback.apply(thisArg, args);
        }
      }
    };
    globalKey = "@wry/context:Slot";
    host = // Prefer globalThis when available.
    // https://github.com/benjamn/wryware/issues/347
    maybe2(() => globalThis) || // Fall back to global, which works in Node.js and may be converted by some
    // bundlers to the appropriate identifier (window, self, ...) depending on the
    // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
    maybe2(() => global) || // Otherwise, use a dummy host that's local to this module. We used to fall
    // back to using the Array constructor as a namespace, but that was flagged in
    // https://github.com/benjamn/wryware/issues/347, and can be avoided.
    /* @__PURE__ */ Object.create(null);
    globalHost = host;
    Slot = globalHost[globalKey] || // Earlier versions of this package stored the globalKey property on the Array
    // constructor, so we check there as well, to prevent Slot class duplication.
    Array[globalKey] || function(Slot2) {
      try {
        Object.defineProperty(globalHost, globalKey, {
          value: Slot2,
          enumerable: false,
          writable: false,
          // When it was possible for globalHost to be the Array constructor (a
          // legacy Slot dedup strategy), it was important for the property to be
          // configurable:true so it could be deleted. That does not seem to be as
          // important when globalHost is the global object, but I don't want to
          // cause similar problems again, and configurable:true seems safest.
          // https://github.com/endojs/endo/issues/576#issuecomment-1178274008
          configurable: true
        });
      } finally {
        return Slot2;
      }
    }(makeSlotClass());
  }
});

// node_modules/@wry/context/lib/index.js
var bind, noContext;
var init_lib3 = __esm({
  "node_modules/@wry/context/lib/index.js"() {
    init_slot();
    ({ bind, noContext } = Slot);
  }
});

// node_modules/optimism/lib/context.js
var parentEntrySlot;
var init_context = __esm({
  "node_modules/optimism/lib/context.js"() {
    init_lib3();
    init_lib3();
    parentEntrySlot = new Slot();
  }
});

// node_modules/optimism/lib/helpers.js
function maybeUnsubscribe(entryOrDep) {
  const { unsubscribe } = entryOrDep;
  if (typeof unsubscribe === "function") {
    entryOrDep.unsubscribe = void 0;
    unsubscribe();
  }
}
var hasOwnProperty3, arrayFromSet;
var init_helpers = __esm({
  "node_modules/optimism/lib/helpers.js"() {
    ({ hasOwnProperty: hasOwnProperty3 } = Object.prototype);
    arrayFromSet = Array.from || function(set) {
      const array = [];
      set.forEach((item) => array.push(item));
      return array;
    };
  }
});

// node_modules/optimism/lib/entry.js
function assert(condition, optionalMessage) {
  if (!condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}
function valueIs(a, b) {
  const len = a.length;
  return (
    // Unknown values are not equal to each other.
    len > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    len === b.length && // The underlying value or exception must be the same.
    a[len - 1] === b[len - 1]
  );
}
function valueGet(value) {
  switch (value.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return value[0];
    case 2:
      throw value[1];
  }
}
function valueCopy(value) {
  return value.slice(0);
}
function rememberParent(child) {
  const parent = parentEntrySlot.getValue();
  if (parent) {
    child.parents.add(parent);
    if (!parent.childValues.has(child)) {
      parent.childValues.set(child, []);
    }
    if (mightBeDirty(child)) {
      reportDirtyChild(parent, child);
    } else {
      reportCleanChild(parent, child);
    }
    return parent;
  }
}
function reallyRecompute(entry, args) {
  forgetChildren(entry);
  parentEntrySlot.withValue(entry, recomputeNewValue, [entry, args]);
  if (maybeSubscribe(entry, args)) {
    setClean(entry);
  }
  return valueGet(entry.value);
}
function recomputeNewValue(entry, args) {
  entry.recomputing = true;
  const { normalizeResult } = entry;
  let oldValueCopy;
  if (normalizeResult && entry.value.length === 1) {
    oldValueCopy = valueCopy(entry.value);
  }
  entry.value.length = 0;
  try {
    entry.value[0] = entry.fn.apply(null, args);
    if (normalizeResult && oldValueCopy && !valueIs(oldValueCopy, entry.value)) {
      try {
        entry.value[0] = normalizeResult(entry.value[0], oldValueCopy[0]);
      } catch (_a2) {
      }
    }
  } catch (e) {
    entry.value[1] = e;
  }
  entry.recomputing = false;
}
function mightBeDirty(entry) {
  return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
  entry.dirty = false;
  if (mightBeDirty(entry)) {
    return;
  }
  reportClean(entry);
}
function reportDirty(child) {
  eachParent(child, reportDirtyChild);
}
function reportClean(child) {
  eachParent(child, reportCleanChild);
}
function eachParent(child, callback) {
  const parentCount = child.parents.size;
  if (parentCount) {
    const parents = arrayFromSet(child.parents);
    for (let i = 0; i < parentCount; ++i) {
      callback(parents[i], child);
    }
  }
}
function reportDirtyChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(mightBeDirty(child));
  const parentWasClean = !mightBeDirty(parent);
  if (!parent.dirtyChildren) {
    parent.dirtyChildren = emptySetPool.pop() || /* @__PURE__ */ new Set();
  } else if (parent.dirtyChildren.has(child)) {
    return;
  }
  parent.dirtyChildren.add(child);
  if (parentWasClean) {
    reportDirty(parent);
  }
}
function reportCleanChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(!mightBeDirty(child));
  const childValue = parent.childValues.get(child);
  if (childValue.length === 0) {
    parent.childValues.set(child, valueCopy(child.value));
  } else if (!valueIs(childValue, child.value)) {
    parent.setDirty();
  }
  removeDirtyChild(parent, child);
  if (mightBeDirty(parent)) {
    return;
  }
  reportClean(parent);
}
function removeDirtyChild(parent, child) {
  const dc = parent.dirtyChildren;
  if (dc) {
    dc.delete(child);
    if (dc.size === 0) {
      if (emptySetPool.length < POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }
      parent.dirtyChildren = null;
    }
  }
}
function forgetChildren(parent) {
  if (parent.childValues.size > 0) {
    parent.childValues.forEach((_value, child) => {
      forgetChild(parent, child);
    });
  }
  parent.forgetDeps();
  assert(parent.dirtyChildren === null);
}
function forgetChild(parent, child) {
  child.parents.delete(parent);
  parent.childValues.delete(child);
  removeDirtyChild(parent, child);
}
function maybeSubscribe(entry, args) {
  if (typeof entry.subscribe === "function") {
    try {
      maybeUnsubscribe(entry);
      entry.unsubscribe = entry.subscribe.apply(null, args);
    } catch (e) {
      entry.setDirty();
      return false;
    }
  }
  return true;
}
var emptySetPool, POOL_TARGET_SIZE, Entry;
var init_entry = __esm({
  "node_modules/optimism/lib/entry.js"() {
    init_context();
    init_helpers();
    emptySetPool = [];
    POOL_TARGET_SIZE = 100;
    Entry = class _Entry {
      constructor(fn) {
        this.fn = fn;
        this.parents = /* @__PURE__ */ new Set();
        this.childValues = /* @__PURE__ */ new Map();
        this.dirtyChildren = null;
        this.dirty = true;
        this.recomputing = false;
        this.value = [];
        this.deps = null;
        ++_Entry.count;
      }
      peek() {
        if (this.value.length === 1 && !mightBeDirty(this)) {
          rememberParent(this);
          return this.value[0];
        }
      }
      // This is the most important method of the Entry API, because it
      // determines whether the cached this.value can be returned immediately,
      // or must be recomputed. The overall performance of the caching system
      // depends on the truth of the following observations: (1) this.dirty is
      // usually false, (2) this.dirtyChildren is usually null/empty, and thus
      // (3) valueGet(this.value) is usually returned without recomputation.
      recompute(args) {
        assert(!this.recomputing, "already recomputing");
        rememberParent(this);
        return mightBeDirty(this) ? reallyRecompute(this, args) : valueGet(this.value);
      }
      setDirty() {
        if (this.dirty)
          return;
        this.dirty = true;
        reportDirty(this);
        maybeUnsubscribe(this);
      }
      dispose() {
        this.setDirty();
        forgetChildren(this);
        eachParent(this, (parent, child) => {
          parent.setDirty();
          forgetChild(parent, this);
        });
      }
      forget() {
        this.dispose();
      }
      dependOn(dep2) {
        dep2.add(this);
        if (!this.deps) {
          this.deps = emptySetPool.pop() || /* @__PURE__ */ new Set();
        }
        this.deps.add(dep2);
      }
      forgetDeps() {
        if (this.deps) {
          arrayFromSet(this.deps).forEach((dep2) => dep2.delete(this));
          this.deps.clear();
          emptySetPool.push(this.deps);
          this.deps = null;
        }
      }
    };
    Entry.count = 0;
  }
});

// node_modules/optimism/lib/dep.js
function dep(options) {
  const depsByKey = /* @__PURE__ */ new Map();
  const subscribe2 = options && options.subscribe;
  function depend(key) {
    const parent = parentEntrySlot.getValue();
    if (parent) {
      let dep2 = depsByKey.get(key);
      if (!dep2) {
        depsByKey.set(key, dep2 = /* @__PURE__ */ new Set());
      }
      parent.dependOn(dep2);
      if (typeof subscribe2 === "function") {
        maybeUnsubscribe(dep2);
        dep2.unsubscribe = subscribe2(key);
      }
    }
  }
  depend.dirty = function dirty(key, entryMethodName) {
    const dep2 = depsByKey.get(key);
    if (dep2) {
      const m = entryMethodName && hasOwnProperty3.call(EntryMethods, entryMethodName) ? entryMethodName : "setDirty";
      arrayFromSet(dep2).forEach((entry) => entry[m]());
      depsByKey.delete(key);
      maybeUnsubscribe(dep2);
    }
  };
  return depend;
}
var EntryMethods;
var init_dep = __esm({
  "node_modules/optimism/lib/dep.js"() {
    init_context();
    init_helpers();
    EntryMethods = {
      setDirty: true,
      dispose: true,
      forget: true
      // Fully remove parent Entry from LRU cache and computation graph
    };
  }
});

// node_modules/optimism/lib/index.js
function defaultMakeCacheKey(...args) {
  const trie = defaultKeyTrie || (defaultKeyTrie = new Trie(typeof WeakMap === "function"));
  return trie.lookupArray(args);
}
function wrap3(originalFunction, { max = Math.pow(2, 16), keyArgs, makeCacheKey = defaultMakeCacheKey, normalizeResult, subscribe: subscribe2, cache: cacheOption = StrongCache } = /* @__PURE__ */ Object.create(null)) {
  const cache = typeof cacheOption === "function" ? new cacheOption(max, (entry) => entry.dispose()) : cacheOption;
  const optimistic = function() {
    const key = makeCacheKey.apply(null, keyArgs ? keyArgs.apply(null, arguments) : arguments);
    if (key === void 0) {
      return originalFunction.apply(null, arguments);
    }
    let entry = cache.get(key);
    if (!entry) {
      cache.set(key, entry = new Entry(originalFunction));
      entry.normalizeResult = normalizeResult;
      entry.subscribe = subscribe2;
      entry.forget = () => cache.delete(key);
    }
    const value = entry.recompute(Array.prototype.slice.call(arguments));
    cache.set(key, entry);
    caches.add(cache);
    if (!parentEntrySlot.hasValue()) {
      caches.forEach((cache2) => cache2.clean());
      caches.clear();
    }
    return value;
  };
  Object.defineProperty(optimistic, "size", {
    get: () => cache.size,
    configurable: false,
    enumerable: false
  });
  Object.freeze(optimistic.options = {
    max,
    keyArgs,
    makeCacheKey,
    normalizeResult,
    subscribe: subscribe2,
    cache
  });
  function dirtyKey(key) {
    const entry = key && cache.get(key);
    if (entry) {
      entry.setDirty();
    }
  }
  optimistic.dirtyKey = dirtyKey;
  optimistic.dirty = function dirty() {
    dirtyKey(makeCacheKey.apply(null, arguments));
  };
  function peekKey(key) {
    const entry = key && cache.get(key);
    if (entry) {
      return entry.peek();
    }
  }
  optimistic.peekKey = peekKey;
  optimistic.peek = function peek() {
    return peekKey(makeCacheKey.apply(null, arguments));
  };
  function forgetKey(key) {
    return key ? cache.delete(key) : false;
  }
  optimistic.forgetKey = forgetKey;
  optimistic.forget = function forget() {
    return forgetKey(makeCacheKey.apply(null, arguments));
  };
  optimistic.makeCacheKey = makeCacheKey;
  optimistic.getKey = keyArgs ? function getKey() {
    return makeCacheKey.apply(null, keyArgs.apply(null, arguments));
  } : makeCacheKey;
  return Object.freeze(optimistic);
}
var defaultKeyTrie, caches;
var init_lib4 = __esm({
  "node_modules/optimism/lib/index.js"() {
    init_lib2();
    init_lib();
    init_entry();
    init_context();
    init_context();
    init_dep();
    caches = /* @__PURE__ */ new Set();
  }
});

// node_modules/@apollo/client/utilities/graphql/DocumentTransform.js
function identity(document) {
  return document;
}
var DocumentTransform;
var init_DocumentTransform = __esm({
  "node_modules/@apollo/client/utilities/graphql/DocumentTransform.js"() {
    init_lib2();
    init_canUse();
    init_getFromAST();
    init_globals();
    init_lib();
    init_lib4();
    init_caching();
    DocumentTransform = /** @class */
    function() {
      function DocumentTransform2(transform, options) {
        if (options === void 0) {
          options = /* @__PURE__ */ Object.create(null);
        }
        this.resultCache = canUseWeakSet ? /* @__PURE__ */ new WeakSet() : /* @__PURE__ */ new Set();
        this.transform = transform;
        if (options.getCacheKey) {
          this.getCacheKey = options.getCacheKey;
        }
        this.cached = options.cache !== false;
        this.resetCache();
      }
      DocumentTransform2.prototype.getCacheKey = function(document) {
        return [document];
      };
      DocumentTransform2.identity = function() {
        return new DocumentTransform2(identity, { cache: false });
      };
      DocumentTransform2.split = function(predicate, left, right) {
        if (right === void 0) {
          right = DocumentTransform2.identity();
        }
        return Object.assign(new DocumentTransform2(
          function(document) {
            var documentTransform = predicate(document) ? left : right;
            return documentTransform.transformDocument(document);
          },
          // Reasonably assume both `left` and `right` transforms handle their own caching
          { cache: false }
        ), { left, right });
      };
      DocumentTransform2.prototype.resetCache = function() {
        var _this = this;
        if (this.cached) {
          var stableCacheKeys_1 = new Trie(canUseWeakMap);
          this.performWork = wrap3(DocumentTransform2.prototype.performWork.bind(this), {
            makeCacheKey: function(document) {
              var cacheKeys = _this.getCacheKey(document);
              if (cacheKeys) {
                invariant2(Array.isArray(cacheKeys), 77);
                return stableCacheKeys_1.lookupArray(cacheKeys);
              }
            },
            max: cacheSizes["documentTransform.cache"],
            cache: WeakCache
          });
        }
      };
      DocumentTransform2.prototype.performWork = function(document) {
        checkDocument(document);
        return this.transform(document);
      };
      DocumentTransform2.prototype.transformDocument = function(document) {
        if (this.resultCache.has(document)) {
          return document;
        }
        var transformedDocument = this.performWork(document);
        this.resultCache.add(transformedDocument);
        return transformedDocument;
      };
      DocumentTransform2.prototype.concat = function(otherTransform) {
        var _this = this;
        return Object.assign(new DocumentTransform2(
          function(document) {
            return otherTransform.transformDocument(_this.transformDocument(document));
          },
          // Reasonably assume both transforms handle their own caching
          { cache: false }
        ), {
          left: this,
          right: otherTransform
        });
      };
      return DocumentTransform2;
    }();
  }
});

// node_modules/zen-observable-ts/module.js
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it)
    return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it)
      o = it;
    var i = 0;
    return function() {
      if (i >= o.length)
        return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function getMethod(obj, key) {
  var value = obj[key];
  if (value == null)
    return void 0;
  if (typeof value !== "function")
    throw new TypeError(value + " is not a function");
  return value;
}
function getSpecies(obj) {
  var ctor = obj.constructor;
  if (ctor !== void 0) {
    ctor = ctor[SymbolSpecies];
    if (ctor === null) {
      ctor = void 0;
    }
  }
  return ctor !== void 0 ? ctor : Observable;
}
function isObservable(x) {
  return x instanceof Observable;
}
function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function() {
      throw e;
    });
  }
}
function enqueue(fn) {
  Promise.resolve().then(function() {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}
function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === void 0)
    return;
  subscription._cleanup = void 0;
  if (!cleanup) {
    return;
  }
  try {
    if (typeof cleanup === "function") {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, "unsubscribe");
      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}
function closeSubscription(subscription) {
  subscription._observer = void 0;
  subscription._queue = void 0;
  subscription._state = "closed";
}
function flushSubscription(subscription) {
  var queue = subscription._queue;
  if (!queue) {
    return;
  }
  subscription._queue = void 0;
  subscription._state = "ready";
  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === "closed")
      break;
  }
}
function notifySubscription(subscription, type, value) {
  subscription._state = "running";
  var observer = subscription._observer;
  try {
    var m = getMethod(observer, type);
    switch (type) {
      case "next":
        if (m)
          m.call(observer, value);
        break;
      case "error":
        closeSubscription(subscription);
        if (m)
          m.call(observer, value);
        else
          throw value;
        break;
      case "complete":
        closeSubscription(subscription);
        if (m)
          m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }
  if (subscription._state === "closed")
    cleanupSubscription(subscription);
  else if (subscription._state === "running")
    subscription._state = "ready";
}
function onNotify(subscription, type, value) {
  if (subscription._state === "closed")
    return;
  if (subscription._state === "buffering") {
    subscription._queue.push({
      type,
      value
    });
    return;
  }
  if (subscription._state !== "ready") {
    subscription._state = "buffering";
    subscription._queue = [{
      type,
      value
    }];
    enqueue(function() {
      return flushSubscription(subscription);
    });
    return;
  }
  notifySubscription(subscription, type, value);
}
var hasSymbols, hasSymbol, getSymbol, SymbolIterator, SymbolObservable, SymbolSpecies, Subscription, SubscriptionObserver, Observable;
var init_module = __esm({
  "node_modules/zen-observable-ts/module.js"() {
    hasSymbols = function() {
      return typeof Symbol === "function";
    };
    hasSymbol = function(name) {
      return hasSymbols() && Boolean(Symbol[name]);
    };
    getSymbol = function(name) {
      return hasSymbol(name) ? Symbol[name] : "@@" + name;
    };
    if (hasSymbols() && !hasSymbol("observable")) {
      Symbol.observable = Symbol("observable");
    }
    SymbolIterator = getSymbol("iterator");
    SymbolObservable = getSymbol("observable");
    SymbolSpecies = getSymbol("species");
    Subscription = function() {
      function Subscription2(observer, subscriber) {
        this._cleanup = void 0;
        this._observer = observer;
        this._queue = void 0;
        this._state = "initializing";
        var subscriptionObserver = new SubscriptionObserver(this);
        try {
          this._cleanup = subscriber.call(void 0, subscriptionObserver);
        } catch (e) {
          subscriptionObserver.error(e);
        }
        if (this._state === "initializing")
          this._state = "ready";
      }
      var _proto = Subscription2.prototype;
      _proto.unsubscribe = function unsubscribe() {
        if (this._state !== "closed") {
          closeSubscription(this);
          cleanupSubscription(this);
        }
      };
      _createClass(Subscription2, [{
        key: "closed",
        get: function() {
          return this._state === "closed";
        }
      }]);
      return Subscription2;
    }();
    SubscriptionObserver = function() {
      function SubscriptionObserver2(subscription) {
        this._subscription = subscription;
      }
      var _proto2 = SubscriptionObserver2.prototype;
      _proto2.next = function next(value) {
        onNotify(this._subscription, "next", value);
      };
      _proto2.error = function error(value) {
        onNotify(this._subscription, "error", value);
      };
      _proto2.complete = function complete() {
        onNotify(this._subscription, "complete");
      };
      _createClass(SubscriptionObserver2, [{
        key: "closed",
        get: function() {
          return this._subscription._state === "closed";
        }
      }]);
      return SubscriptionObserver2;
    }();
    Observable = function() {
      function Observable2(subscriber) {
        if (!(this instanceof Observable2))
          throw new TypeError("Observable cannot be called as a function");
        if (typeof subscriber !== "function")
          throw new TypeError("Observable initializer must be a function");
        this._subscriber = subscriber;
      }
      var _proto3 = Observable2.prototype;
      _proto3.subscribe = function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          observer = {
            next: observer,
            error: arguments[1],
            complete: arguments[2]
          };
        }
        return new Subscription(observer, this._subscriber);
      };
      _proto3.forEach = function forEach2(fn) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          if (typeof fn !== "function") {
            reject(new TypeError(fn + " is not a function"));
            return;
          }
          function done() {
            subscription.unsubscribe();
            resolve();
          }
          var subscription = _this.subscribe({
            next: function(value) {
              try {
                fn(value, done);
              } catch (e) {
                reject(e);
                subscription.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
        });
      };
      _proto3.map = function map(fn) {
        var _this2 = this;
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        return new C(function(observer) {
          return _this2.subscribe({
            next: function(value) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
              observer.next(value);
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              observer.complete();
            }
          });
        });
      };
      _proto3.filter = function filter(fn) {
        var _this3 = this;
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        return new C(function(observer) {
          return _this3.subscribe({
            next: function(value) {
              try {
                if (!fn(value))
                  return;
              } catch (e) {
                return observer.error(e);
              }
              observer.next(value);
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              observer.complete();
            }
          });
        });
      };
      _proto3.reduce = function reduce(fn) {
        var _this4 = this;
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        var hasSeed = arguments.length > 1;
        var hasValue = false;
        var seed = arguments[1];
        var acc = seed;
        return new C(function(observer) {
          return _this4.subscribe({
            next: function(value) {
              var first = !hasValue;
              hasValue = true;
              if (!first || hasSeed) {
                try {
                  acc = fn(acc, value);
                } catch (e) {
                  return observer.error(e);
                }
              } else {
                acc = value;
              }
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              if (!hasValue && !hasSeed)
                return observer.error(new TypeError("Cannot reduce an empty sequence"));
              observer.next(acc);
              observer.complete();
            }
          });
        });
      };
      _proto3.concat = function concat2() {
        var _this5 = this;
        for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }
        var C = getSpecies(this);
        return new C(function(observer) {
          var subscription;
          var index = 0;
          function startNext(next) {
            subscription = next.subscribe({
              next: function(v) {
                observer.next(v);
              },
              error: function(e) {
                observer.error(e);
              },
              complete: function() {
                if (index === sources.length) {
                  subscription = void 0;
                  observer.complete();
                } else {
                  startNext(C.from(sources[index++]));
                }
              }
            });
          }
          startNext(_this5);
          return function() {
            if (subscription) {
              subscription.unsubscribe();
              subscription = void 0;
            }
          };
        });
      };
      _proto3.flatMap = function flatMap(fn) {
        var _this6 = this;
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        return new C(function(observer) {
          var subscriptions = [];
          var outer = _this6.subscribe({
            next: function(value) {
              if (fn) {
                try {
                  value = fn(value);
                } catch (e) {
                  return observer.error(e);
                }
              }
              var inner = C.from(value).subscribe({
                next: function(value2) {
                  observer.next(value2);
                },
                error: function(e) {
                  observer.error(e);
                },
                complete: function() {
                  var i = subscriptions.indexOf(inner);
                  if (i >= 0)
                    subscriptions.splice(i, 1);
                  completeIfDone();
                }
              });
              subscriptions.push(inner);
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              completeIfDone();
            }
          });
          function completeIfDone() {
            if (outer.closed && subscriptions.length === 0)
              observer.complete();
          }
          return function() {
            subscriptions.forEach(function(s) {
              return s.unsubscribe();
            });
            outer.unsubscribe();
          };
        });
      };
      _proto3[SymbolObservable] = function() {
        return this;
      };
      Observable2.from = function from2(x) {
        var C = typeof this === "function" ? this : Observable2;
        if (x == null)
          throw new TypeError(x + " is not an object");
        var method = getMethod(x, SymbolObservable);
        if (method) {
          var observable = method.call(x);
          if (Object(observable) !== observable)
            throw new TypeError(observable + " is not an object");
          if (isObservable(observable) && observable.constructor === C)
            return observable;
          return new C(function(observer) {
            return observable.subscribe(observer);
          });
        }
        if (hasSymbol("iterator")) {
          method = getMethod(x, SymbolIterator);
          if (method) {
            return new C(function(observer) {
              enqueue(function() {
                if (observer.closed)
                  return;
                for (var _iterator = _createForOfIteratorHelperLoose(method.call(x)), _step; !(_step = _iterator()).done; ) {
                  var item = _step.value;
                  observer.next(item);
                  if (observer.closed)
                    return;
                }
                observer.complete();
              });
            });
          }
        }
        if (Array.isArray(x)) {
          return new C(function(observer) {
            enqueue(function() {
              if (observer.closed)
                return;
              for (var i = 0; i < x.length; ++i) {
                observer.next(x[i]);
                if (observer.closed)
                  return;
              }
              observer.complete();
            });
          });
        }
        throw new TypeError(x + " is not observable");
      };
      Observable2.of = function of() {
        for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }
        var C = typeof this === "function" ? this : Observable2;
        return new C(function(observer) {
          enqueue(function() {
            if (observer.closed)
              return;
            for (var i = 0; i < items.length; ++i) {
              observer.next(items[i]);
              if (observer.closed)
                return;
            }
            observer.complete();
          });
        });
      };
      _createClass(Observable2, null, [{
        key: SymbolSpecies,
        get: function() {
          return this;
        }
      }]);
      return Observable2;
    }();
    if (hasSymbols()) {
      Object.defineProperty(Observable, Symbol("extensions"), {
        value: {
          symbol: SymbolObservable,
          hostReportError
        },
        configurable: true
      });
    }
  }
});

// node_modules/symbol-observable/es/ponyfill.js
function symbolObservablePonyfill(root2) {
  var result2;
  var Symbol2 = root2.Symbol;
  if (typeof Symbol2 === "function") {
    if (Symbol2.observable) {
      result2 = Symbol2.observable;
    } else {
      if (typeof Symbol2.for === "function") {
        result2 = Symbol2.for("https://github.com/benlesh/symbol-observable");
      } else {
        result2 = Symbol2("https://github.com/benlesh/symbol-observable");
      }
      try {
        Symbol2.observable = result2;
      } catch (err) {
      }
    }
  } else {
    result2 = "@@observable";
  }
  return result2;
}
var init_ponyfill = __esm({
  "node_modules/symbol-observable/es/ponyfill.js"() {
  }
});

// node_modules/symbol-observable/es/index.js
var root, result;
var init_es = __esm({
  "node_modules/symbol-observable/es/index.js"() {
    init_ponyfill();
    if (typeof self !== "undefined") {
      root = self;
    } else if (typeof window !== "undefined") {
      root = window;
    } else if (typeof global !== "undefined") {
      root = global;
    } else if (typeof module !== "undefined") {
      root = module;
    } else {
      root = Function("return this")();
    }
    result = symbolObservablePonyfill(root);
  }
});

// node_modules/@apollo/client/utilities/observables/Observable.js
var prototype, fakeObsSymbol;
var init_Observable = __esm({
  "node_modules/@apollo/client/utilities/observables/Observable.js"() {
    init_module();
    init_es();
    prototype = Observable.prototype;
    fakeObsSymbol = "@@observable";
    if (!prototype[fakeObsSymbol]) {
      prototype[fakeObsSymbol] = function() {
        return this;
      };
    }
  }
});

// node_modules/@apollo/client/utilities/common/compact.js
function compact() {
  var objects = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    objects[_i] = arguments[_i];
  }
  var result2 = /* @__PURE__ */ Object.create(null);
  objects.forEach(function(obj) {
    if (!obj)
      return;
    Object.keys(obj).forEach(function(key) {
      var value = obj[key];
      if (value !== void 0) {
        result2[key] = value;
      }
    });
  });
  return result2;
}
var init_compact = __esm({
  "node_modules/@apollo/client/utilities/common/compact.js"() {
  }
});

// node_modules/@apollo/client/utilities/common/mergeOptions.js
function mergeOptions(defaults, options) {
  return compact(defaults, options, options.variables && {
    variables: compact(__assign(__assign({}, defaults && defaults.variables), options.variables))
  });
}
var init_mergeOptions = __esm({
  "node_modules/@apollo/client/utilities/common/mergeOptions.js"() {
    init_tslib_es6();
    init_compact();
  }
});

// node_modules/@apollo/client/utilities/graphql/directives.js
function shouldInclude(_a2, variables) {
  var directives = _a2.directives;
  if (!directives || !directives.length) {
    return true;
  }
  return getInclusionDirectives(directives).every(function(_a3) {
    var directive = _a3.directive, ifArgument = _a3.ifArgument;
    var evaledValue = false;
    if (ifArgument.value.kind === "Variable") {
      evaledValue = variables && variables[ifArgument.value.name.value];
      invariant2(evaledValue !== void 0, 78, directive.name.value);
    } else {
      evaledValue = ifArgument.value.value;
    }
    return directive.name.value === "skip" ? !evaledValue : evaledValue;
  });
}
function hasDirectives(names, root2, all) {
  var nameSet = new Set(names);
  var uniqueCount = nameSet.size;
  visit(root2, {
    Directive: function(node) {
      if (nameSet.delete(node.name.value) && (!all || !nameSet.size)) {
        return BREAK;
      }
    }
  });
  return all ? !nameSet.size : nameSet.size < uniqueCount;
}
function hasClientExports(document) {
  return document && hasDirectives(["client", "export"], document, true);
}
function isInclusionDirective(_a2) {
  var value = _a2.name.value;
  return value === "skip" || value === "include";
}
function getInclusionDirectives(directives) {
  var result2 = [];
  if (directives && directives.length) {
    directives.forEach(function(directive) {
      if (!isInclusionDirective(directive))
        return;
      var directiveArguments = directive.arguments;
      var directiveName = directive.name.value;
      invariant2(directiveArguments && directiveArguments.length === 1, 79, directiveName);
      var ifArgument = directiveArguments[0];
      invariant2(ifArgument.name && ifArgument.name.value === "if", 80, directiveName);
      var ifValue = ifArgument.value;
      invariant2(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), 81, directiveName);
      result2.push({ directive, ifArgument });
    });
  }
  return result2;
}
function getFragmentMaskMode(fragment) {
  var _a2, _b;
  var directive = (_a2 = fragment.directives) === null || _a2 === void 0 ? void 0 : _a2.find(function(_a3) {
    var name = _a3.name;
    return name.value === "unmask";
  });
  if (!directive) {
    return "mask";
  }
  var modeArg = (_b = directive.arguments) === null || _b === void 0 ? void 0 : _b.find(function(_a3) {
    var name = _a3.name;
    return name.value === "mode";
  });
  if (globalThis.__DEV__ !== false) {
    if (modeArg) {
      if (modeArg.value.kind === Kind.VARIABLE) {
        globalThis.__DEV__ !== false && invariant2.warn(82);
      } else if (modeArg.value.kind !== Kind.STRING) {
        globalThis.__DEV__ !== false && invariant2.warn(83);
      } else if (modeArg.value.value !== "migrate") {
        globalThis.__DEV__ !== false && invariant2.warn(84, modeArg.value.value);
      }
    }
  }
  if (modeArg && "value" in modeArg.value && modeArg.value.value === "migrate") {
    return "migrate";
  }
  return "unmask";
}
var init_directives2 = __esm({
  "node_modules/@apollo/client/utilities/graphql/directives.js"() {
    init_globals();
    init_graphql2();
  }
});

// node_modules/@apollo/client/utilities/graphql/print.js
var printCache, print2;
var init_print = __esm({
  "node_modules/@apollo/client/utilities/graphql/print.js"() {
    init_graphql2();
    init_caching();
    init_getMemoryInternals();
    print2 = Object.assign(function(ast) {
      var result2 = printCache.get(ast);
      if (!result2) {
        result2 = print(ast);
        printCache.set(ast, result2);
      }
      return result2;
    }, {
      reset: function() {
        printCache = new AutoCleanedWeakCache(
          cacheSizes.print || 2e3
          /* defaultCacheSizes.print */
        );
      }
    });
    print2.reset();
    if (globalThis.__DEV__ !== false) {
      registerGlobalCache("print", function() {
        return printCache ? printCache.size : 0;
      });
    }
  }
});

// node_modules/@apollo/client/utilities/common/arrays.js
function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}
var isArray;
var init_arrays = __esm({
  "node_modules/@apollo/client/utilities/common/arrays.js"() {
    isArray = Array.isArray;
  }
});

// node_modules/@apollo/client/utilities/graphql/transform.js
function isEmpty(op, fragmentMap) {
  return !op || op.selectionSet.selections.every(function(selection) {
    return selection.kind === Kind.FRAGMENT_SPREAD && isEmpty(fragmentMap[selection.name.value], fragmentMap);
  });
}
function nullIfDocIsEmpty(doc) {
  return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
}
function getDirectiveMatcher(configs) {
  var names = /* @__PURE__ */ new Map();
  var tests = /* @__PURE__ */ new Map();
  configs.forEach(function(directive) {
    if (directive) {
      if (directive.name) {
        names.set(directive.name, directive);
      } else if (directive.test) {
        tests.set(directive.test, directive);
      }
    }
  });
  return function(directive) {
    var config = names.get(directive.name.value);
    if (!config && tests.size) {
      tests.forEach(function(testConfig, test) {
        if (test(directive)) {
          config = testConfig;
        }
      });
    }
    return config;
  };
}
function makeInUseGetterFunction(defaultKey) {
  var map = /* @__PURE__ */ new Map();
  return function inUseGetterFunction(key) {
    if (key === void 0) {
      key = defaultKey;
    }
    var inUse = map.get(key);
    if (!inUse) {
      map.set(key, inUse = {
        // Variable and fragment spread names used directly within this
        // operation or fragment definition, as identified by key. These sets
        // will be populated during the first traversal of the document in
        // removeDirectivesFromDocument below.
        variables: /* @__PURE__ */ new Set(),
        fragmentSpreads: /* @__PURE__ */ new Set()
      });
    }
    return inUse;
  };
}
function removeDirectivesFromDocument(directives, doc) {
  checkDocument(doc);
  var getInUseByOperationName = makeInUseGetterFunction("");
  var getInUseByFragmentName = makeInUseGetterFunction("");
  var getInUse = function(ancestors) {
    for (var p = 0, ancestor = void 0; p < ancestors.length && (ancestor = ancestors[p]); ++p) {
      if (isArray(ancestor))
        continue;
      if (ancestor.kind === Kind.OPERATION_DEFINITION) {
        return getInUseByOperationName(ancestor.name && ancestor.name.value);
      }
      if (ancestor.kind === Kind.FRAGMENT_DEFINITION) {
        return getInUseByFragmentName(ancestor.name.value);
      }
    }
    globalThis.__DEV__ !== false && invariant2.error(97);
    return null;
  };
  var operationCount = 0;
  for (var i = doc.definitions.length - 1; i >= 0; --i) {
    if (doc.definitions[i].kind === Kind.OPERATION_DEFINITION) {
      ++operationCount;
    }
  }
  var directiveMatcher = getDirectiveMatcher(directives);
  var shouldRemoveField = function(nodeDirectives) {
    return isNonEmptyArray(nodeDirectives) && nodeDirectives.map(directiveMatcher).some(function(config) {
      return config && config.remove;
    });
  };
  var originalFragmentDefsByPath = /* @__PURE__ */ new Map();
  var firstVisitMadeChanges = false;
  var fieldOrInlineFragmentVisitor = {
    enter: function(node) {
      if (shouldRemoveField(node.directives)) {
        firstVisitMadeChanges = true;
        return null;
      }
    }
  };
  var docWithoutDirectiveSubtrees = visit(doc, {
    // These two AST node types share the same implementation, defined above.
    Field: fieldOrInlineFragmentVisitor,
    InlineFragment: fieldOrInlineFragmentVisitor,
    VariableDefinition: {
      enter: function() {
        return false;
      }
    },
    Variable: {
      enter: function(node, _key, _parent, _path, ancestors) {
        var inUse = getInUse(ancestors);
        if (inUse) {
          inUse.variables.add(node.name.value);
        }
      }
    },
    FragmentSpread: {
      enter: function(node, _key, _parent, _path, ancestors) {
        if (shouldRemoveField(node.directives)) {
          firstVisitMadeChanges = true;
          return null;
        }
        var inUse = getInUse(ancestors);
        if (inUse) {
          inUse.fragmentSpreads.add(node.name.value);
        }
      }
    },
    FragmentDefinition: {
      enter: function(node, _key, _parent, path) {
        originalFragmentDefsByPath.set(JSON.stringify(path), node);
      },
      leave: function(node, _key, _parent, path) {
        var originalNode = originalFragmentDefsByPath.get(JSON.stringify(path));
        if (node === originalNode) {
          return node;
        }
        if (
          // This logic applies only if the document contains one or more
          // operations, since removing all fragments from a document containing
          // only fragments makes the document useless.
          operationCount > 0 && node.selectionSet.selections.every(function(selection) {
            return selection.kind === Kind.FIELD && selection.name.value === "__typename";
          })
        ) {
          getInUseByFragmentName(node.name.value).removed = true;
          firstVisitMadeChanges = true;
          return null;
        }
      }
    },
    Directive: {
      leave: function(node) {
        if (directiveMatcher(node)) {
          firstVisitMadeChanges = true;
          return null;
        }
      }
    }
  });
  if (!firstVisitMadeChanges) {
    return doc;
  }
  var populateTransitiveVars = function(inUse) {
    if (!inUse.transitiveVars) {
      inUse.transitiveVars = new Set(inUse.variables);
      if (!inUse.removed) {
        inUse.fragmentSpreads.forEach(function(childFragmentName) {
          populateTransitiveVars(getInUseByFragmentName(childFragmentName)).transitiveVars.forEach(function(varName) {
            inUse.transitiveVars.add(varName);
          });
        });
      }
    }
    return inUse;
  };
  var allFragmentNamesUsed = /* @__PURE__ */ new Set();
  docWithoutDirectiveSubtrees.definitions.forEach(function(def) {
    if (def.kind === Kind.OPERATION_DEFINITION) {
      populateTransitiveVars(getInUseByOperationName(def.name && def.name.value)).fragmentSpreads.forEach(function(childFragmentName) {
        allFragmentNamesUsed.add(childFragmentName);
      });
    } else if (def.kind === Kind.FRAGMENT_DEFINITION && // If there are no operations in the document, then all fragment
    // definitions count as usages of their own fragment names. This heuristic
    // prevents accidentally removing all fragment definitions from the
    // document just because it contains no operations that use the fragments.
    operationCount === 0 && !getInUseByFragmentName(def.name.value).removed) {
      allFragmentNamesUsed.add(def.name.value);
    }
  });
  allFragmentNamesUsed.forEach(function(fragmentName) {
    populateTransitiveVars(getInUseByFragmentName(fragmentName)).fragmentSpreads.forEach(function(childFragmentName) {
      allFragmentNamesUsed.add(childFragmentName);
    });
  });
  var fragmentWillBeRemoved = function(fragmentName) {
    return !!// A fragment definition will be removed if there are no spreads that refer
    // to it, or the fragment was explicitly removed because it had no fields
    // other than __typename.
    (!allFragmentNamesUsed.has(fragmentName) || getInUseByFragmentName(fragmentName).removed);
  };
  var enterVisitor = {
    enter: function(node) {
      if (fragmentWillBeRemoved(node.name.value)) {
        return null;
      }
    }
  };
  return nullIfDocIsEmpty(visit(docWithoutDirectiveSubtrees, {
    // If the fragment is going to be removed, then leaving any dangling
    // FragmentSpread nodes with the same name would be a mistake.
    FragmentSpread: enterVisitor,
    // This is where the fragment definition is actually removed.
    FragmentDefinition: enterVisitor,
    OperationDefinition: {
      leave: function(node) {
        if (node.variableDefinitions) {
          var usedVariableNames_1 = populateTransitiveVars(
            // If an operation is anonymous, we use the empty string as its key.
            getInUseByOperationName(node.name && node.name.value)
          ).transitiveVars;
          if (usedVariableNames_1.size < node.variableDefinitions.length) {
            return __assign(__assign({}, node), { variableDefinitions: node.variableDefinitions.filter(function(varDef) {
              return usedVariableNames_1.has(varDef.variable.name.value);
            }) });
          }
        }
      }
    }
  }));
}
function buildQueryFromSelectionSet(document) {
  var definition = getMainDefinition(document);
  var definitionOperation = definition.operation;
  if (definitionOperation === "query") {
    return document;
  }
  var modifiedDoc = visit(document, {
    OperationDefinition: {
      enter: function(node) {
        return __assign(__assign({}, node), { operation: "query" });
      }
    }
  });
  return modifiedDoc;
}
function removeClientSetsFromDocument(document) {
  checkDocument(document);
  var modifiedDoc = removeDirectivesFromDocument([
    {
      test: function(directive) {
        return directive.name.value === "client";
      },
      remove: true
    }
  ], document);
  return modifiedDoc;
}
function addNonReactiveToNamedFragments(document) {
  checkDocument(document);
  return visit(document, {
    FragmentSpread: function(node) {
      var _a2;
      if ((_a2 = node.directives) === null || _a2 === void 0 ? void 0 : _a2.some(function(directive) {
        return directive.name.value === "unmask";
      })) {
        return;
      }
      return __assign(__assign({}, node), { directives: __spreadArray(__spreadArray([], node.directives || [], true), [
        {
          kind: Kind.DIRECTIVE,
          name: { kind: Kind.NAME, value: "nonreactive" }
        }
      ], false) });
    }
  });
}
var TYPENAME_FIELD, addTypenameToDocument;
var init_transform = __esm({
  "node_modules/@apollo/client/utilities/graphql/transform.js"() {
    init_tslib_es6();
    init_globals();
    init_graphql2();
    init_getFromAST();
    init_storeUtils();
    init_fragments();
    init_arrays();
    TYPENAME_FIELD = {
      kind: Kind.FIELD,
      name: {
        kind: Kind.NAME,
        value: "__typename"
      }
    };
    addTypenameToDocument = Object.assign(function(doc) {
      return visit(doc, {
        SelectionSet: {
          enter: function(node, _key, parent) {
            if (parent && parent.kind === Kind.OPERATION_DEFINITION) {
              return;
            }
            var selections = node.selections;
            if (!selections) {
              return;
            }
            var skip = selections.some(function(selection) {
              return isField(selection) && (selection.name.value === "__typename" || selection.name.value.lastIndexOf("__", 0) === 0);
            });
            if (skip) {
              return;
            }
            var field = parent;
            if (isField(field) && field.directives && field.directives.some(function(d) {
              return d.name.value === "export";
            })) {
              return;
            }
            return __assign(__assign({}, node), { selections: __spreadArray(__spreadArray([], selections, true), [TYPENAME_FIELD], false) });
          }
        }
      });
    }, {
      added: function(field) {
        return field === TYPENAME_FIELD;
      }
    });
  }
});

// node_modules/@apollo/client/utilities/graphql/operations.js
var init_operations = __esm({
  "node_modules/@apollo/client/utilities/graphql/operations.js"() {
    init_getFromAST();
  }
});

// node_modules/@apollo/client/utilities/common/mergeDeep.js
function mergeDeep() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  return mergeDeepArray(sources);
}
function mergeDeepArray(sources) {
  var target = sources[0] || {};
  var count = sources.length;
  if (count > 1) {
    var merger = new DeepMerger();
    for (var i = 1; i < count; ++i) {
      target = merger.merge(target, sources[i]);
    }
  }
  return target;
}
var hasOwnProperty4, defaultReconciler, DeepMerger;
var init_mergeDeep = __esm({
  "node_modules/@apollo/client/utilities/common/mergeDeep.js"() {
    init_tslib_es6();
    init_objects();
    hasOwnProperty4 = Object.prototype.hasOwnProperty;
    defaultReconciler = function(target, source, property) {
      return this.merge(target[property], source[property]);
    };
    DeepMerger = /** @class */
    function() {
      function DeepMerger2(reconciler) {
        if (reconciler === void 0) {
          reconciler = defaultReconciler;
        }
        this.reconciler = reconciler;
        this.isObject = isNonNullObject;
        this.pastCopies = /* @__PURE__ */ new Set();
      }
      DeepMerger2.prototype.merge = function(target, source) {
        var _this = this;
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          context[_i - 2] = arguments[_i];
        }
        if (isNonNullObject(source) && isNonNullObject(target)) {
          Object.keys(source).forEach(function(sourceKey) {
            if (hasOwnProperty4.call(target, sourceKey)) {
              var targetValue = target[sourceKey];
              if (source[sourceKey] !== targetValue) {
                var result2 = _this.reconciler.apply(_this, __spreadArray([
                  target,
                  source,
                  sourceKey
                ], context, false));
                if (result2 !== targetValue) {
                  target = _this.shallowCopyForMerge(target);
                  target[sourceKey] = result2;
                }
              }
            } else {
              target = _this.shallowCopyForMerge(target);
              target[sourceKey] = source[sourceKey];
            }
          });
          return target;
        }
        return source;
      };
      DeepMerger2.prototype.shallowCopyForMerge = function(value) {
        if (isNonNullObject(value)) {
          if (!this.pastCopies.has(value)) {
            if (Array.isArray(value)) {
              value = value.slice(0);
            } else {
              value = __assign({ __proto__: Object.getPrototypeOf(value) }, value);
            }
            this.pastCopies.add(value);
          }
        }
        return value;
      };
      return DeepMerger2;
    }();
  }
});

// node_modules/@apollo/client/utilities/policies/pagination.js
var init_pagination = __esm({
  "node_modules/@apollo/client/utilities/policies/pagination.js"() {
    init_tslib_es6();
    init_tslib_es6();
    init_mergeDeep();
  }
});

// node_modules/@apollo/client/utilities/promises/decoration.js
function createFulfilledPromise(value) {
  var promise = Promise.resolve(value);
  promise.status = "fulfilled";
  promise.value = value;
  return promise;
}
function createRejectedPromise(reason) {
  var promise = Promise.reject(reason);
  promise.catch(function() {
  });
  promise.status = "rejected";
  promise.reason = reason;
  return promise;
}
function isStatefulPromise(promise) {
  return "status" in promise;
}
function wrapPromiseWithState(promise) {
  if (isStatefulPromise(promise)) {
    return promise;
  }
  var pendingPromise = promise;
  pendingPromise.status = "pending";
  pendingPromise.then(function(value) {
    if (pendingPromise.status === "pending") {
      var fulfilledPromise = pendingPromise;
      fulfilledPromise.status = "fulfilled";
      fulfilledPromise.value = value;
    }
  }, function(reason) {
    if (pendingPromise.status === "pending") {
      var rejectedPromise = pendingPromise;
      rejectedPromise.status = "rejected";
      rejectedPromise.reason = reason;
    }
  });
  return promise;
}
var init_decoration = __esm({
  "node_modules/@apollo/client/utilities/promises/decoration.js"() {
  }
});

// node_modules/@apollo/client/utilities/promises/preventUnhandledRejection.js
function preventUnhandledRejection(promise) {
  promise.catch(function() {
  });
  return promise;
}
var init_preventUnhandledRejection = __esm({
  "node_modules/@apollo/client/utilities/promises/preventUnhandledRejection.js"() {
  }
});

// node_modules/@apollo/client/utilities/common/cloneDeep.js
function cloneDeep(value) {
  return cloneDeepHelper(value);
}
function cloneDeepHelper(val, seen) {
  switch (toString.call(val)) {
    case "[object Array]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_1 = val.slice(0);
      seen.set(val, copy_1);
      copy_1.forEach(function(child, i) {
        copy_1[i] = cloneDeepHelper(child, seen);
      });
      return copy_1;
    }
    case "[object Object]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_2 = Object.create(Object.getPrototypeOf(val));
      seen.set(val, copy_2);
      Object.keys(val).forEach(function(key) {
        copy_2[key] = cloneDeepHelper(val[key], seen);
      });
      return copy_2;
    }
    default:
      return val;
  }
}
var toString;
var init_cloneDeep = __esm({
  "node_modules/@apollo/client/utilities/common/cloneDeep.js"() {
    toString = Object.prototype.toString;
  }
});

// node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js
function deepFreeze(value) {
  var workSet = /* @__PURE__ */ new Set([value]);
  workSet.forEach(function(obj) {
    if (isNonNullObject(obj) && shallowFreeze(obj) === obj) {
      Object.getOwnPropertyNames(obj).forEach(function(name) {
        if (isNonNullObject(obj[name]))
          workSet.add(obj[name]);
      });
    }
  });
  return value;
}
function shallowFreeze(obj) {
  if (globalThis.__DEV__ !== false && !Object.isFrozen(obj)) {
    try {
      Object.freeze(obj);
    } catch (e) {
      if (e instanceof TypeError)
        return null;
      throw e;
    }
  }
  return obj;
}
function maybeDeepFreeze(obj) {
  if (globalThis.__DEV__ !== false) {
    deepFreeze(obj);
  }
  return obj;
}
var init_maybeDeepFreeze = __esm({
  "node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js"() {
    init_objects();
  }
});

// node_modules/@apollo/client/utilities/observables/iteration.js
function iterateObserversSafely(observers, method, argument) {
  var observersWithMethod = [];
  observers.forEach(function(obs) {
    return obs[method] && observersWithMethod.push(obs);
  });
  observersWithMethod.forEach(function(obs) {
    return obs[method](argument);
  });
}
var init_iteration = __esm({
  "node_modules/@apollo/client/utilities/observables/iteration.js"() {
  }
});

// node_modules/@apollo/client/utilities/observables/asyncMap.js
function asyncMap(observable, mapFn, catchFn) {
  return new Observable(function(observer) {
    var promiseQueue = {
      // Normally we would initialize promiseQueue to Promise.resolve(), but
      // in this case, for backwards compatibility, we need to be careful to
      // invoke the first callback synchronously.
      then: function(callback) {
        return new Promise(function(resolve) {
          return resolve(callback());
        });
      }
    };
    function makeCallback(examiner, key) {
      return function(arg) {
        if (examiner) {
          var both = function() {
            return observer.closed ? (
              /* will be swallowed */
              0
            ) : examiner(arg);
          };
          promiseQueue = promiseQueue.then(both, both).then(function(result2) {
            return observer.next(result2);
          }, function(error) {
            return observer.error(error);
          });
        } else {
          observer[key](arg);
        }
      };
    }
    var handler = {
      next: makeCallback(mapFn, "next"),
      error: makeCallback(catchFn, "error"),
      complete: function() {
        promiseQueue.then(function() {
          return observer.complete();
        });
      }
    };
    var sub = observable.subscribe(handler);
    return function() {
      return sub.unsubscribe();
    };
  });
}
var init_asyncMap = __esm({
  "node_modules/@apollo/client/utilities/observables/asyncMap.js"() {
    init_Observable();
  }
});

// node_modules/@apollo/client/utilities/observables/subclassing.js
function fixObservableSubclass(subclass) {
  function set(key) {
    Object.defineProperty(subclass, key, { value: Observable });
  }
  if (canUseSymbol && Symbol.species) {
    set(Symbol.species);
  }
  set("@@species");
  return subclass;
}
var init_subclassing = __esm({
  "node_modules/@apollo/client/utilities/observables/subclassing.js"() {
    init_Observable();
    init_canUse();
  }
});

// node_modules/@apollo/client/utilities/observables/Concast.js
function isPromiseLike(value) {
  return value && typeof value.then === "function";
}
var Concast;
var init_Concast = __esm({
  "node_modules/@apollo/client/utilities/observables/Concast.js"() {
    init_tslib_es6();
    init_Observable();
    init_iteration();
    init_subclassing();
    Concast = /** @class */
    function(_super) {
      __extends(Concast2, _super);
      function Concast2(sources) {
        var _this = _super.call(this, function(observer) {
          _this.addObserver(observer);
          return function() {
            return _this.removeObserver(observer);
          };
        }) || this;
        _this.observers = /* @__PURE__ */ new Set();
        _this.promise = new Promise(function(resolve, reject) {
          _this.resolve = resolve;
          _this.reject = reject;
        });
        _this.handlers = {
          next: function(result2) {
            if (_this.sub !== null) {
              _this.latest = ["next", result2];
              _this.notify("next", result2);
              iterateObserversSafely(_this.observers, "next", result2);
            }
          },
          error: function(error) {
            var sub = _this.sub;
            if (sub !== null) {
              if (sub)
                setTimeout(function() {
                  return sub.unsubscribe();
                });
              _this.sub = null;
              _this.latest = ["error", error];
              _this.reject(error);
              _this.notify("error", error);
              iterateObserversSafely(_this.observers, "error", error);
            }
          },
          complete: function() {
            var _a2 = _this, sub = _a2.sub, _b = _a2.sources, sources2 = _b === void 0 ? [] : _b;
            if (sub !== null) {
              var value = sources2.shift();
              if (!value) {
                if (sub)
                  setTimeout(function() {
                    return sub.unsubscribe();
                  });
                _this.sub = null;
                if (_this.latest && _this.latest[0] === "next") {
                  _this.resolve(_this.latest[1]);
                } else {
                  _this.resolve();
                }
                _this.notify("complete");
                iterateObserversSafely(_this.observers, "complete");
              } else if (isPromiseLike(value)) {
                value.then(function(obs) {
                  return _this.sub = obs.subscribe(_this.handlers);
                }, _this.handlers.error);
              } else {
                _this.sub = value.subscribe(_this.handlers);
              }
            }
          }
        };
        _this.nextResultListeners = /* @__PURE__ */ new Set();
        _this.cancel = function(reason) {
          _this.reject(reason);
          _this.sources = [];
          _this.handlers.error(reason);
        };
        _this.promise.catch(function(_) {
        });
        if (typeof sources === "function") {
          sources = [new Observable(sources)];
        }
        if (isPromiseLike(sources)) {
          sources.then(function(iterable) {
            return _this.start(iterable);
          }, _this.handlers.error);
        } else {
          _this.start(sources);
        }
        return _this;
      }
      Concast2.prototype.start = function(sources) {
        if (this.sub !== void 0)
          return;
        this.sources = Array.from(sources);
        this.handlers.complete();
      };
      Concast2.prototype.deliverLastMessage = function(observer) {
        if (this.latest) {
          var nextOrError = this.latest[0];
          var method = observer[nextOrError];
          if (method) {
            method.call(observer, this.latest[1]);
          }
          if (this.sub === null && nextOrError === "next" && observer.complete) {
            observer.complete();
          }
        }
      };
      Concast2.prototype.addObserver = function(observer) {
        if (!this.observers.has(observer)) {
          this.deliverLastMessage(observer);
          this.observers.add(observer);
        }
      };
      Concast2.prototype.removeObserver = function(observer) {
        if (this.observers.delete(observer) && this.observers.size < 1) {
          this.handlers.complete();
        }
      };
      Concast2.prototype.notify = function(method, arg) {
        var nextResultListeners = this.nextResultListeners;
        if (nextResultListeners.size) {
          this.nextResultListeners = /* @__PURE__ */ new Set();
          nextResultListeners.forEach(function(listener) {
            return listener(method, arg);
          });
        }
      };
      Concast2.prototype.beforeNext = function(callback) {
        var called = false;
        this.nextResultListeners.add(function(method, arg) {
          if (!called) {
            called = true;
            callback(method, arg);
          }
        });
      };
      return Concast2;
    }(Observable);
    fixObservableSubclass(Concast);
  }
});

// node_modules/@apollo/client/utilities/common/incrementalResult.js
function isExecutionPatchIncrementalResult(value) {
  return "incremental" in value;
}
function isExecutionPatchInitialResult(value) {
  return "hasNext" in value && "data" in value;
}
function isExecutionPatchResult(value) {
  return isExecutionPatchIncrementalResult(value) || isExecutionPatchInitialResult(value);
}
function isApolloPayloadResult(value) {
  return isNonNullObject(value) && "payload" in value;
}
function mergeIncrementalData(prevResult, result2) {
  var mergedData = prevResult;
  var merger = new DeepMerger();
  if (isExecutionPatchIncrementalResult(result2) && isNonEmptyArray(result2.incremental)) {
    result2.incremental.forEach(function(_a2) {
      var data = _a2.data, path = _a2.path;
      for (var i = path.length - 1; i >= 0; --i) {
        var key = path[i];
        var isNumericKey = !isNaN(+key);
        var parent_1 = isNumericKey ? [] : {};
        parent_1[key] = data;
        data = parent_1;
      }
      mergedData = merger.merge(mergedData, data);
    });
  }
  return mergedData;
}
var init_incrementalResult = __esm({
  "node_modules/@apollo/client/utilities/common/incrementalResult.js"() {
    init_objects();
    init_arrays();
    init_mergeDeep();
  }
});

// node_modules/@apollo/client/utilities/common/errorHandling.js
function graphQLResultHasError(result2) {
  var errors = getGraphQLErrorsFromResult(result2);
  return isNonEmptyArray(errors);
}
function getGraphQLErrorsFromResult(result2) {
  var graphQLErrors = isNonEmptyArray(result2.errors) ? result2.errors.slice(0) : [];
  if (isExecutionPatchIncrementalResult(result2) && isNonEmptyArray(result2.incremental)) {
    result2.incremental.forEach(function(incrementalResult) {
      if (incrementalResult.errors) {
        graphQLErrors.push.apply(graphQLErrors, incrementalResult.errors);
      }
    });
  }
  return graphQLErrors;
}
var init_errorHandling = __esm({
  "node_modules/@apollo/client/utilities/common/errorHandling.js"() {
    init_arrays();
    init_incrementalResult();
  }
});

// node_modules/@apollo/client/utilities/common/omitDeep.js
var init_omitDeep = __esm({
  "node_modules/@apollo/client/utilities/common/omitDeep.js"() {
    init_objects();
  }
});

// node_modules/@apollo/client/utilities/common/stripTypename.js
var init_stripTypename = __esm({
  "node_modules/@apollo/client/utilities/common/stripTypename.js"() {
    init_omitDeep();
  }
});

// node_modules/@apollo/client/utilities/index.js
var init_utilities2 = __esm({
  "node_modules/@apollo/client/utilities/index.js"() {
    init_globals();
    init_directives2();
    init_DocumentTransform();
    init_fragments();
    init_getFromAST();
    init_print();
    init_storeUtils();
    init_transform();
    init_operations();
    init_pagination();
    init_Observable();
    init_decoration();
    init_preventUnhandledRejection();
    init_mergeDeep();
    init_cloneDeep();
    init_maybeDeepFreeze();
    init_iteration();
    init_asyncMap();
    init_Concast();
    init_subclassing();
    init_arrays();
    init_objects();
    init_errorHandling();
    init_canUse();
    init_compact();
    init_makeUniqueId();
    init_stringifyForDisplay();
    init_mergeOptions();
    init_incrementalResult();
    init_canonicalStringify();
    init_omitDeep();
    init_stripTypename();
    init_caching();
  }
});

// node_modules/@apollo/client/link/utils/fromError.js
function fromError(errorValue) {
  return new Observable(function(observer) {
    observer.error(errorValue);
  });
}
var init_fromError = __esm({
  "node_modules/@apollo/client/link/utils/fromError.js"() {
    init_utilities2();
  }
});

// node_modules/@apollo/client/link/utils/toPromise.js
function toPromise(observable) {
  var completed = false;
  return new Promise(function(resolve, reject) {
    observable.subscribe({
      next: function(data) {
        if (completed) {
          globalThis.__DEV__ !== false && invariant2.warn(45);
        } else {
          completed = true;
          resolve(data);
        }
      },
      error: reject
    });
  });
}
var init_toPromise = __esm({
  "node_modules/@apollo/client/link/utils/toPromise.js"() {
    init_globals();
  }
});

// node_modules/@apollo/client/link/utils/fromPromise.js
function fromPromise(promise) {
  return new Observable(function(observer) {
    promise.then(function(value) {
      observer.next(value);
      observer.complete();
    }).catch(observer.error.bind(observer));
  });
}
var init_fromPromise = __esm({
  "node_modules/@apollo/client/link/utils/fromPromise.js"() {
    init_utilities2();
  }
});

// node_modules/@apollo/client/link/utils/throwServerError.js
var throwServerError;
var init_throwServerError = __esm({
  "node_modules/@apollo/client/link/utils/throwServerError.js"() {
    throwServerError = function(response, result2, message) {
      var error = new Error(message);
      error.name = "ServerError";
      error.response = response;
      error.statusCode = response.status;
      error.result = result2;
      throw error;
    };
  }
});

// node_modules/@apollo/client/link/utils/validateOperation.js
function validateOperation(operation) {
  var OPERATION_FIELDS = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ];
  for (var _i = 0, _a2 = Object.keys(operation); _i < _a2.length; _i++) {
    var key = _a2[_i];
    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw newInvariantError(46, key);
    }
  }
  return operation;
}
var init_validateOperation = __esm({
  "node_modules/@apollo/client/link/utils/validateOperation.js"() {
    init_globals();
  }
});

// node_modules/@apollo/client/link/utils/createOperation.js
function createOperation(starting, operation) {
  var context = __assign({}, starting);
  var setContext = function(next) {
    if (typeof next === "function") {
      context = __assign(__assign({}, context), next(context));
    } else {
      context = __assign(__assign({}, context), next);
    }
  };
  var getContext = function() {
    return __assign({}, context);
  };
  Object.defineProperty(operation, "setContext", {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, "getContext", {
    enumerable: false,
    value: getContext
  });
  return operation;
}
var init_createOperation = __esm({
  "node_modules/@apollo/client/link/utils/createOperation.js"() {
    init_tslib_es6();
  }
});

// node_modules/@apollo/client/link/utils/transformOperation.js
function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };
  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== "string" ? getOperationName(transformedOperation.query) || void 0 : "";
  }
  return transformedOperation;
}
var init_transformOperation = __esm({
  "node_modules/@apollo/client/link/utils/transformOperation.js"() {
    init_utilities2();
  }
});

// node_modules/@apollo/client/link/utils/filterOperationVariables.js
function filterOperationVariables(variables, query) {
  var result2 = __assign({}, variables);
  var unusedNames = new Set(Object.keys(variables));
  visit(query, {
    Variable: function(node, _key, parent) {
      if (parent && parent.kind !== "VariableDefinition") {
        unusedNames.delete(node.name.value);
      }
    }
  });
  unusedNames.forEach(function(name) {
    delete result2[name];
  });
  return result2;
}
var init_filterOperationVariables = __esm({
  "node_modules/@apollo/client/link/utils/filterOperationVariables.js"() {
    init_tslib_es6();
    init_graphql2();
  }
});

// node_modules/@apollo/client/link/utils/index.js
var init_utils = __esm({
  "node_modules/@apollo/client/link/utils/index.js"() {
    init_globals();
    init_fromError();
    init_toPromise();
    init_fromPromise();
    init_throwServerError();
    init_validateOperation();
    init_createOperation();
    init_transformOperation();
    init_filterOperationVariables();
  }
});

// node_modules/@apollo/client/link/core/ApolloLink.js
function passthrough(op, forward) {
  return forward ? forward(op) : Observable.of();
}
function toLink(handler) {
  return typeof handler === "function" ? new ApolloLink(handler) : handler;
}
function isTerminating(link) {
  return link.request.length <= 1;
}
var ApolloLink;
var init_ApolloLink = __esm({
  "node_modules/@apollo/client/link/core/ApolloLink.js"() {
    init_globals();
    init_utilities2();
    init_utils();
    ApolloLink = /** @class */
    function() {
      function ApolloLink2(request) {
        if (request)
          this.request = request;
      }
      ApolloLink2.empty = function() {
        return new ApolloLink2(function() {
          return Observable.of();
        });
      };
      ApolloLink2.from = function(links) {
        if (links.length === 0)
          return ApolloLink2.empty();
        return links.map(toLink).reduce(function(x, y) {
          return x.concat(y);
        });
      };
      ApolloLink2.split = function(test, left, right) {
        var leftLink = toLink(left);
        var rightLink = toLink(right || new ApolloLink2(passthrough));
        var ret;
        if (isTerminating(leftLink) && isTerminating(rightLink)) {
          ret = new ApolloLink2(function(operation) {
            return test(operation) ? leftLink.request(operation) || Observable.of() : rightLink.request(operation) || Observable.of();
          });
        } else {
          ret = new ApolloLink2(function(operation, forward) {
            return test(operation) ? leftLink.request(operation, forward) || Observable.of() : rightLink.request(operation, forward) || Observable.of();
          });
        }
        return Object.assign(ret, { left: leftLink, right: rightLink });
      };
      ApolloLink2.execute = function(link, operation) {
        return link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable.of();
      };
      ApolloLink2.concat = function(first, second) {
        var firstLink = toLink(first);
        if (isTerminating(firstLink)) {
          globalThis.__DEV__ !== false && invariant2.warn(38, firstLink);
          return firstLink;
        }
        var nextLink = toLink(second);
        var ret;
        if (isTerminating(nextLink)) {
          ret = new ApolloLink2(function(operation) {
            return firstLink.request(operation, function(op) {
              return nextLink.request(op) || Observable.of();
            }) || Observable.of();
          });
        } else {
          ret = new ApolloLink2(function(operation, forward) {
            return firstLink.request(operation, function(op) {
              return nextLink.request(op, forward) || Observable.of();
            }) || Observable.of();
          });
        }
        return Object.assign(ret, { left: firstLink, right: nextLink });
      };
      ApolloLink2.prototype.split = function(test, left, right) {
        return this.concat(ApolloLink2.split(test, left, right || new ApolloLink2(passthrough)));
      };
      ApolloLink2.prototype.concat = function(next) {
        return ApolloLink2.concat(this, next);
      };
      ApolloLink2.prototype.request = function(operation, forward) {
        throw newInvariantError(39);
      };
      ApolloLink2.prototype.onError = function(error, observer) {
        if (observer && observer.error) {
          observer.error(error);
          return false;
        }
        throw error;
      };
      ApolloLink2.prototype.setOnError = function(fn) {
        this.onError = fn;
        return this;
      };
      return ApolloLink2;
    }();
  }
});

// node_modules/@apollo/client/link/core/empty.js
var empty;
var init_empty = __esm({
  "node_modules/@apollo/client/link/core/empty.js"() {
    init_ApolloLink();
    empty = ApolloLink.empty;
  }
});

// node_modules/@apollo/client/link/core/from.js
var from;
var init_from = __esm({
  "node_modules/@apollo/client/link/core/from.js"() {
    init_ApolloLink();
    from = ApolloLink.from;
  }
});

// node_modules/@apollo/client/link/core/split.js
var split;
var init_split = __esm({
  "node_modules/@apollo/client/link/core/split.js"() {
    init_ApolloLink();
    split = ApolloLink.split;
  }
});

// node_modules/@apollo/client/link/core/concat.js
var concat;
var init_concat = __esm({
  "node_modules/@apollo/client/link/core/concat.js"() {
    init_ApolloLink();
    concat = ApolloLink.concat;
  }
});

// node_modules/@apollo/client/link/core/execute.js
var execute2;
var init_execute2 = __esm({
  "node_modules/@apollo/client/link/core/execute.js"() {
    init_ApolloLink();
    execute2 = ApolloLink.execute;
  }
});

// node_modules/@apollo/client/link/core/index.js
var init_core = __esm({
  "node_modules/@apollo/client/link/core/index.js"() {
    init_globals();
    init_empty();
    init_from();
    init_split();
    init_concat();
    init_execute2();
    init_ApolloLink();
  }
});

// node_modules/@apollo/client/errors/index.js
function graphQLResultHasProtocolErrors(result2) {
  if (result2.extensions) {
    return Array.isArray(result2.extensions[PROTOCOL_ERRORS_SYMBOL]);
  }
  return false;
}
function isApolloError(err) {
  return err.hasOwnProperty("graphQLErrors");
}
var PROTOCOL_ERRORS_SYMBOL, generateErrorMessage, ApolloError;
var init_errors = __esm({
  "node_modules/@apollo/client/errors/index.js"() {
    init_tslib_es6();
    init_globals();
    init_utilities2();
    PROTOCOL_ERRORS_SYMBOL = Symbol();
    generateErrorMessage = function(err) {
      var errors = __spreadArray(__spreadArray(__spreadArray([], err.graphQLErrors, true), err.clientErrors, true), err.protocolErrors, true);
      if (err.networkError)
        errors.push(err.networkError);
      return errors.map(function(err2) {
        return isNonNullObject(err2) && err2.message || "Error message not found.";
      }).join("\n");
    };
    ApolloError = /** @class */
    function(_super) {
      __extends(ApolloError2, _super);
      function ApolloError2(_a2) {
        var graphQLErrors = _a2.graphQLErrors, protocolErrors = _a2.protocolErrors, clientErrors = _a2.clientErrors, networkError = _a2.networkError, errorMessage = _a2.errorMessage, extraInfo = _a2.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.name = "ApolloError";
        _this.graphQLErrors = graphQLErrors || [];
        _this.protocolErrors = protocolErrors || [];
        _this.clientErrors = clientErrors || [];
        _this.networkError = networkError || null;
        _this.message = errorMessage || generateErrorMessage(_this);
        _this.extraInfo = extraInfo;
        _this.cause = __spreadArray(__spreadArray(__spreadArray([
          networkError
        ], graphQLErrors || [], true), protocolErrors || [], true), clientErrors || [], true).find(function(e) {
          return !!e;
        }) || null;
        _this.__proto__ = ApolloError2.prototype;
        return _this;
      }
      return ApolloError2;
    }(Error);
  }
});

export {
  setVerbosity,
  init_invariant,
  version,
  init_version,
  maybe,
  makeUniqueId,
  stringifyForDisplay,
  invariant2 as invariant,
  newInvariantError,
  init_invariantWrappers,
  init_globals,
  Kind,
  parse,
  BREAK,
  visit,
  isSelectionNode,
  init_graphql2 as init_graphql,
  shouldInclude,
  hasDirectives,
  hasClientExports,
  getFragmentMaskMode,
  Trie,
  init_lib2 as init_lib,
  canUseWeakMap,
  canUseWeakSet,
  canUseSymbol,
  canUseAsyncIteratorSymbol,
  canUseDOM,
  canUseLayoutEffect,
  isNonNullObject,
  getFragmentQueryDocument,
  createFragmentMap,
  getFragmentFromSelection,
  isFullyUnmaskedOperation,
  WeakCache,
  init_lib as init_lib2,
  AutoCleanedWeakCache,
  cacheSizes,
  registerGlobalCache,
  getApolloClientMemoryInternals,
  getInMemoryCacheMemoryInternals,
  getApolloCacheMemoryInternals,
  init_getMemoryInternals,
  canonicalStringify,
  makeReference,
  isReference,
  isDocumentNode,
  storeKeyNameFromField,
  getStoreKeyName,
  argumentsObjectFromField,
  resultKeyNameFromField,
  getTypenameFromResult,
  isField,
  isInlineFragment,
  getOperationDefinition,
  getOperationName,
  getFragmentDefinitions,
  getQueryDefinition,
  getFragmentDefinition,
  getMainDefinition,
  getDefaultValues,
  Slot,
  dep,
  wrap3 as wrap,
  init_lib4 as init_lib3,
  DocumentTransform,
  print2 as print,
  isArray,
  isNonEmptyArray,
  removeDirectivesFromDocument,
  addTypenameToDocument,
  buildQueryFromSelectionSet,
  removeClientSetsFromDocument,
  addNonReactiveToNamedFragments,
  mergeDeep,
  mergeDeepArray,
  DeepMerger,
  Observable,
  createFulfilledPromise,
  createRejectedPromise,
  wrapPromiseWithState,
  preventUnhandledRejection,
  cloneDeep,
  maybeDeepFreeze,
  iterateObserversSafely,
  asyncMap,
  fixObservableSubclass,
  Concast,
  isExecutionPatchIncrementalResult,
  isExecutionPatchResult,
  isApolloPayloadResult,
  mergeIncrementalData,
  init_incrementalResult,
  graphQLResultHasError,
  getGraphQLErrorsFromResult,
  compact,
  mergeOptions,
  init_utilities2 as init_utilities,
  fromError,
  toPromise,
  fromPromise,
  throwServerError,
  filterOperationVariables,
  init_utils,
  ApolloLink,
  empty,
  from,
  split,
  concat,
  execute2 as execute,
  init_core,
  PROTOCOL_ERRORS_SYMBOL,
  graphQLResultHasProtocolErrors,
  isApolloError,
  ApolloError,
  init_errors
};
//# sourceMappingURL=chunk-J73DCMPX.js.map
