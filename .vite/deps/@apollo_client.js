import {
  require_react
} from "./chunk-ZSN3XFJS.js";
import {
  ApolloCache,
  ApolloClient,
  Cache,
  HttpLink,
  InMemoryCache,
  MissingFieldError,
  NetworkStatus,
  ObservableQuery,
  checkFetcher,
  createHttpLink,
  createSignalIfSupported,
  defaultDataIdFromObject,
  defaultPrinter,
  disableExperimentalFragmentVariables,
  disableFragmentWarnings,
  enableExperimentalFragmentVariables,
  equal,
  fallbackHttpConfig,
  gql,
  init_cache,
  init_core,
  init_lib as init_lib2,
  isNetworkRequestSettled,
  lib_default,
  makeVar,
  parseAndCheckHttpResponse,
  resetCaches,
  rewriteURIForGET,
  selectHttpOptionsAndBody,
  selectHttpOptionsAndBodyInternal,
  selectURI,
  serializeFetchParameter
} from "./chunk-C5B4W33F.js";
import {
  ApolloError,
  ApolloLink,
  AutoCleanedWeakCache,
  DocumentTransform,
  Observable,
  Trie,
  cacheSizes,
  canUseDOM,
  canUseLayoutEffect,
  canUseSymbol,
  canUseWeakMap,
  canonicalStringify,
  compact,
  concat,
  createFulfilledPromise,
  createRejectedPromise,
  empty,
  execute,
  from,
  fromError,
  fromPromise,
  init_errors,
  init_getMemoryInternals,
  init_globals,
  init_invariantWrappers,
  init_lib,
  init_utilities,
  invariant,
  isApolloError,
  isNonEmptyArray,
  isReference,
  makeReference,
  maybeDeepFreeze,
  mergeDeepArray,
  mergeOptions,
  registerGlobalCache,
  setVerbosity,
  split,
  throwServerError,
  toPromise,
  wrapPromiseWithState
} from "./chunk-J73DCMPX.js";
import {
  __assign,
  __rest,
  __spreadArray,
  init_tslib_es6
} from "./chunk-2NLV3Q7R.js";
import {
  __commonJS,
  __toESM
} from "./chunk-2GTGKKMZ.js";

// node_modules/rehackt/index.js
var require_rehackt = __commonJS({
  "node_modules/rehackt/index.js"(exports, module) {
    "use strict";
    if (0) {
      module.exports = null;
    }
    module.exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = void 0;
    module.exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = void 0;
    module.exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = void 0;
    Object.assign(module.exports, require_react());
  }
});

// node_modules/@apollo/client/index.js
init_core();

// node_modules/@apollo/client/react/index.js
init_globals();

// node_modules/@apollo/client/react/context/index.js
init_globals();

// node_modules/@apollo/client/react/context/ApolloConsumer.js
init_globals();
var React2 = __toESM(require_rehackt(), 1);

// node_modules/@apollo/client/react/context/ApolloContext.js
var React = __toESM(require_rehackt(), 1);
init_utilities();
init_globals();
var contextKey = canUseSymbol ? Symbol.for("__APOLLO_CONTEXT__") : "__APOLLO_CONTEXT__";
function getApolloContext() {
  invariant("createContext" in React, 54);
  var context = React.createContext[contextKey];
  if (!context) {
    Object.defineProperty(React.createContext, contextKey, {
      value: context = React.createContext({}),
      enumerable: false,
      writable: false,
      configurable: true
    });
    context.displayName = "ApolloContext";
  }
  return context;
}
var resetApolloContext = getApolloContext;

// node_modules/@apollo/client/react/context/ApolloConsumer.js
var ApolloConsumer = function(props) {
  var ApolloContext = getApolloContext();
  return React2.createElement(ApolloContext.Consumer, null, function(context) {
    invariant(context && context.client, 53);
    return props.children(context.client);
  });
};

// node_modules/@apollo/client/react/context/ApolloProvider.js
init_tslib_es6();
init_globals();
var React3 = __toESM(require_rehackt(), 1);
var ApolloProvider = function(_a) {
  var client = _a.client, children = _a.children;
  var ApolloContext = getApolloContext();
  var parentContext = React3.useContext(ApolloContext);
  var context = React3.useMemo(function() {
    return __assign(__assign({}, parentContext), { client: client || parentContext.client });
  }, [parentContext, client]);
  invariant(context.client, 55);
  return React3.createElement(ApolloContext.Provider, { value: context }, children);
};

// node_modules/@apollo/client/react/hooks/index.js
init_globals();

// node_modules/@apollo/client/react/hooks/useApolloClient.js
init_globals();
var React4 = __toESM(require_rehackt(), 1);
function useApolloClient(override) {
  var context = React4.useContext(getApolloContext());
  var client = override || context.client;
  invariant(!!client, 58);
  return client;
}

// node_modules/@apollo/client/react/hooks/useLazyQuery.js
init_tslib_es6();
var React11 = __toESM(require_rehackt(), 1);
init_utilities();

// node_modules/@apollo/client/react/hooks/useQuery.js
init_tslib_es6();
init_globals();
var React10 = __toESM(require_rehackt(), 1);

// node_modules/@apollo/client/react/hooks/useSyncExternalStore.js
init_globals();
var React5 = __toESM(require_rehackt(), 1);
init_utilities();
var didWarnUncachedGetSnapshot = false;
var uSESKey = "useSyncExternalStore";
var realHook = React5[uSESKey];
var useSyncExternalStore = realHook || function(subscribe, getSnapshot, getServerSnapshot) {
  var value = getSnapshot();
  if (
    // DEVIATION: Using __DEV__
    globalThis.__DEV__ !== false && !didWarnUncachedGetSnapshot && // DEVIATION: Not using Object.is because we know our snapshots will never
    // be exotic primitive values like NaN, which is !== itself.
    value !== getSnapshot()
  ) {
    didWarnUncachedGetSnapshot = true;
    globalThis.__DEV__ !== false && invariant.error(68);
  }
  var _a = React5.useState({
    inst: { value, getSnapshot }
  }), inst = _a[0].inst, forceUpdate = _a[1];
  if (canUseLayoutEffect) {
    React5.useLayoutEffect(function() {
      Object.assign(inst, { value, getSnapshot });
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    }, [subscribe, value, getSnapshot]);
  } else {
    Object.assign(inst, { value, getSnapshot });
  }
  React5.useEffect(function() {
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }
    return subscribe(function handleStoreChange() {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    });
  }, [subscribe]);
  return value;
};
function checkIfSnapshotChanged(_a) {
  var value = _a.value, getSnapshot = _a.getSnapshot;
  try {
    return value !== getSnapshot();
  } catch (_b) {
    return true;
  }
}

// node_modules/@apollo/client/react/hooks/useQuery.js
init_lib2();
init_utilities();
init_errors();
init_core();

// node_modules/@apollo/client/react/parser/index.js
init_globals();
init_utilities();
init_getMemoryInternals();
var DocumentType;
(function(DocumentType2) {
  DocumentType2[DocumentType2["Query"] = 0] = "Query";
  DocumentType2[DocumentType2["Mutation"] = 1] = "Mutation";
  DocumentType2[DocumentType2["Subscription"] = 2] = "Subscription";
})(DocumentType || (DocumentType = {}));
var cache;
function operationName(type) {
  var name;
  switch (type) {
    case DocumentType.Query:
      name = "Query";
      break;
    case DocumentType.Mutation:
      name = "Mutation";
      break;
    case DocumentType.Subscription:
      name = "Subscription";
      break;
  }
  return name;
}
function parser(document) {
  if (!cache) {
    cache = new AutoCleanedWeakCache(
      cacheSizes.parser || 1e3
      /* defaultCacheSizes.parser */
    );
  }
  var cached = cache.get(document);
  if (cached)
    return cached;
  var variables, type, name;
  invariant(!!document && !!document.kind, 70, document);
  var fragments = [];
  var queries = [];
  var mutations = [];
  var subscriptions = [];
  for (var _i = 0, _a = document.definitions; _i < _a.length; _i++) {
    var x = _a[_i];
    if (x.kind === "FragmentDefinition") {
      fragments.push(x);
      continue;
    }
    if (x.kind === "OperationDefinition") {
      switch (x.operation) {
        case "query":
          queries.push(x);
          break;
        case "mutation":
          mutations.push(x);
          break;
        case "subscription":
          subscriptions.push(x);
          break;
      }
    }
  }
  invariant(!fragments.length || queries.length || mutations.length || subscriptions.length, 71);
  invariant(
    queries.length + mutations.length + subscriptions.length <= 1,
    72,
    document,
    queries.length,
    subscriptions.length,
    mutations.length
  );
  type = queries.length ? DocumentType.Query : DocumentType.Mutation;
  if (!queries.length && !mutations.length)
    type = DocumentType.Subscription;
  var definitions = queries.length ? queries : mutations.length ? mutations : subscriptions;
  invariant(definitions.length === 1, 73, document, definitions.length);
  var definition = definitions[0];
  variables = definition.variableDefinitions || [];
  if (definition.name && definition.name.kind === "Name") {
    name = definition.name.value;
  } else {
    name = "data";
  }
  var payload = { name, type, variables };
  cache.set(document, payload);
  return payload;
}
parser.resetCache = function() {
  cache = void 0;
};
if (globalThis.__DEV__ !== false) {
  registerGlobalCache("parser", function() {
    return cache ? cache.size : 0;
  });
}
function verifyDocumentType(document, type) {
  var operation = parser(document);
  var requiredOperationName = operationName(type);
  var usedOperationName = operationName(operation.type);
  invariant(
    operation.type === type,
    74,
    requiredOperationName,
    requiredOperationName,
    usedOperationName
  );
}

// node_modules/@apollo/client/react/hooks/useQuery.js
init_utilities();

// node_modules/@apollo/client/react/hooks/internal/useDeepMemo.js
var React6 = __toESM(require_rehackt(), 1);
init_lib2();
function useDeepMemo(memoFn, deps) {
  var ref = React6.useRef(void 0);
  if (!ref.current || !equal(ref.current.deps, deps)) {
    ref.current = { value: memoFn(), deps };
  }
  return ref.current.value;
}

// node_modules/@apollo/client/react/hooks/internal/useIsomorphicLayoutEffect.js
var React7 = __toESM(require_rehackt(), 1);
init_utilities();
var useIsomorphicLayoutEffect = canUseDOM ? React7.useLayoutEffect : React7.useEffect;

// node_modules/@apollo/client/react/hooks/internal/useRenderGuard.js
var React8 = __toESM(require_rehackt(), 1);
var Ctx;
function noop() {
}
function useRenderGuard() {
  if (!Ctx) {
    Ctx = React8.createContext(null);
  }
  return React8.useCallback(
    /**
     * @returns true if the hook was called during render
     */
    function() {
      var orig = console.error;
      try {
        console.error = noop;
        React8["useContext"](Ctx);
        return true;
      } catch (e) {
        return false;
      } finally {
        console.error = orig;
      }
    },
    []
  );
}

// node_modules/@apollo/client/react/hooks/internal/__use.js
init_utilities();
var React9 = __toESM(require_rehackt(), 1);
var useKey = "use";
var realHook2 = React9[useKey];
var __use = realHook2 || function __use2(promise) {
  var statefulPromise = wrapPromiseWithState(promise);
  switch (statefulPromise.status) {
    case "pending":
      throw statefulPromise;
    case "rejected":
      throw statefulPromise.reason;
    case "fulfilled":
      return statefulPromise.value;
  }
};

// node_modules/@apollo/client/react/hooks/internal/wrapHook.js
var wrapperSymbol = Symbol.for("apollo.hook.wrappers");
function wrapHook(hookName, useHook, clientOrObsQuery) {
  var queryManager = clientOrObsQuery["queryManager"];
  var wrappers = queryManager && queryManager[wrapperSymbol];
  var wrapper = wrappers && wrappers[hookName];
  return wrapper ? wrapper(useHook) : useHook;
}

// node_modules/@apollo/client/react/hooks/useQuery.js
var hasOwnProperty = Object.prototype.hasOwnProperty;
function noop2() {
}
var lastWatchOptions = Symbol();
function useQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  return wrapHook(
    "useQuery",
    // eslint-disable-next-line react-compiler/react-compiler
    useQuery_,
    useApolloClient(options && options.client)
  )(query, options);
}
function useQuery_(query, options) {
  var _a = useQueryInternals(query, options), result = _a.result, obsQueryFields = _a.obsQueryFields;
  return React10.useMemo(function() {
    return __assign(__assign({}, result), obsQueryFields);
  }, [result, obsQueryFields]);
}
function useInternalState(client, query, options, renderPromises, makeWatchQueryOptions) {
  function createInternalState(previous) {
    var _a2;
    verifyDocumentType(query, DocumentType.Query);
    var internalState2 = {
      client,
      query,
      observable: (
        // See if there is an existing observable that was used to fetch the same
        // data and if so, use it instead since it will contain the proper queryId
        // to fetch the result set. This is used during SSR.
        renderPromises && renderPromises.getSSRObservable(makeWatchQueryOptions()) || client.watchQuery(getObsQueryOptions(void 0, client, options, makeWatchQueryOptions()))
      ),
      resultData: {
        // Reuse previousData from previous InternalState (if any) to provide
        // continuity of previousData even if/when the query or client changes.
        previousData: (_a2 = previous === null || previous === void 0 ? void 0 : previous.resultData.current) === null || _a2 === void 0 ? void 0 : _a2.data
      }
    };
    return internalState2;
  }
  var _a = React10.useState(createInternalState), internalState = _a[0], updateInternalState = _a[1];
  function onQueryExecuted(watchQueryOptions) {
    var _a2;
    var _b;
    Object.assign(internalState.observable, (_a2 = {}, _a2[lastWatchOptions] = watchQueryOptions, _a2));
    var resultData = internalState.resultData;
    updateInternalState(__assign(__assign({}, internalState), {
      // might be a different query
      query: watchQueryOptions.query,
      resultData: Object.assign(resultData, {
        // We need to modify the previous `resultData` object as we rely on the
        // object reference in other places
        previousData: ((_b = resultData.current) === null || _b === void 0 ? void 0 : _b.data) || resultData.previousData,
        current: void 0
      })
    }));
  }
  if (client !== internalState.client || query !== internalState.query) {
    var newInternalState = createInternalState(internalState);
    updateInternalState(newInternalState);
    return [newInternalState, onQueryExecuted];
  }
  return [internalState, onQueryExecuted];
}
function useQueryInternals(query, options) {
  var client = useApolloClient(options.client);
  var renderPromises = React10.useContext(getApolloContext()).renderPromises;
  var isSyncSSR = !!renderPromises;
  var disableNetworkFetches = client.disableNetworkFetches;
  var ssrAllowed = options.ssr !== false && !options.skip;
  var partialRefetch = options.partialRefetch;
  var makeWatchQueryOptions = createMakeWatchQueryOptions(client, query, options, isSyncSSR);
  var _a = useInternalState(client, query, options, renderPromises, makeWatchQueryOptions), _b = _a[0], observable = _b.observable, resultData = _b.resultData, onQueryExecuted = _a[1];
  var watchQueryOptions = makeWatchQueryOptions(observable);
  useResubscribeIfNecessary(
    resultData,
    // might get mutated during render
    observable,
    // might get mutated during render
    client,
    options,
    watchQueryOptions
  );
  var obsQueryFields = React10.useMemo(function() {
    return bindObservableMethods(observable);
  }, [observable]);
  useRegisterSSRObservable(observable, renderPromises, ssrAllowed);
  var result = useObservableSubscriptionResult(resultData, observable, client, options, watchQueryOptions, disableNetworkFetches, partialRefetch, isSyncSSR, {
    onCompleted: options.onCompleted || noop2,
    onError: options.onError || noop2
  });
  return {
    result,
    obsQueryFields,
    observable,
    resultData,
    client,
    onQueryExecuted
  };
}
function useObservableSubscriptionResult(resultData, observable, client, options, watchQueryOptions, disableNetworkFetches, partialRefetch, isSyncSSR, callbacks) {
  var callbackRef = React10.useRef(callbacks);
  React10.useEffect(function() {
    callbackRef.current = callbacks;
  });
  var resultOverride = (isSyncSSR || disableNetworkFetches) && options.ssr === false && !options.skip ? (
    // If SSR has been explicitly disabled, and this function has been called
    // on the server side, return the default loading state.
    ssrDisabledResult
  ) : options.skip || watchQueryOptions.fetchPolicy === "standby" ? (
    // When skipping a query (ie. we're not querying for data but still want to
    // render children), make sure the `data` is cleared out and `loading` is
    // set to `false` (since we aren't loading anything).
    //
    // NOTE: We no longer think this is the correct behavior. Skipping should
    // not automatically set `data` to `undefined`, but instead leave the
    // previous data in place. In other words, skipping should not mandate that
    // previously received data is all of a sudden removed. Unfortunately,
    // changing this is breaking, so we'll have to wait until Apollo Client 4.0
    // to address this.
    skipStandbyResult
  ) : void 0;
  var previousData = resultData.previousData;
  var currentResultOverride = React10.useMemo(function() {
    return resultOverride && toQueryResult(resultOverride, previousData, observable, client);
  }, [client, observable, resultOverride, previousData]);
  return useSyncExternalStore(React10.useCallback(function(handleStoreChange) {
    disableNetworkFetches;
    if (isSyncSSR) {
      return function() {
      };
    }
    var onNext = function() {
      var previousResult = resultData.current;
      var result = observable.getCurrentResult();
      if (previousResult && previousResult.loading === result.loading && previousResult.networkStatus === result.networkStatus && equal(previousResult.data, result.data)) {
        return;
      }
      setResult(result, resultData, observable, client, partialRefetch, handleStoreChange, callbackRef.current);
    };
    var onError = function(error) {
      subscription.current.unsubscribe();
      subscription.current = observable.resubscribeAfterError(onNext, onError);
      if (!hasOwnProperty.call(error, "graphQLErrors")) {
        throw error;
      }
      var previousResult = resultData.current;
      if (!previousResult || previousResult && previousResult.loading || !equal(error, previousResult.error)) {
        setResult({
          data: previousResult && previousResult.data,
          error,
          loading: false,
          networkStatus: NetworkStatus.error
        }, resultData, observable, client, partialRefetch, handleStoreChange, callbackRef.current);
      }
    };
    var subscription = { current: observable.subscribe(onNext, onError) };
    return function() {
      setTimeout(function() {
        return subscription.current.unsubscribe();
      });
    };
  }, [
    disableNetworkFetches,
    isSyncSSR,
    observable,
    resultData,
    partialRefetch,
    client
  ]), function() {
    return currentResultOverride || getCurrentResult(resultData, observable, callbackRef.current, partialRefetch, client);
  }, function() {
    return currentResultOverride || getCurrentResult(resultData, observable, callbackRef.current, partialRefetch, client);
  });
}
function useRegisterSSRObservable(observable, renderPromises, ssrAllowed) {
  if (renderPromises && ssrAllowed) {
    renderPromises.registerSSRObservable(observable);
    if (observable.getCurrentResult().loading) {
      renderPromises.addObservableQueryPromise(observable);
    }
  }
}
function useResubscribeIfNecessary(resultData, observable, client, options, watchQueryOptions) {
  var _a;
  if (observable[lastWatchOptions] && !equal(observable[lastWatchOptions], watchQueryOptions)) {
    observable.reobserve(getObsQueryOptions(observable, client, options, watchQueryOptions));
    resultData.previousData = ((_a = resultData.current) === null || _a === void 0 ? void 0 : _a.data) || resultData.previousData;
    resultData.current = void 0;
  }
  observable[lastWatchOptions] = watchQueryOptions;
}
function createMakeWatchQueryOptions(client, query, _a, isSyncSSR) {
  if (_a === void 0) {
    _a = {};
  }
  var skip = _a.skip, ssr = _a.ssr, onCompleted = _a.onCompleted, onError = _a.onError, defaultOptions = _a.defaultOptions, otherOptions = __rest(_a, ["skip", "ssr", "onCompleted", "onError", "defaultOptions"]);
  return function(observable) {
    var watchQueryOptions = Object.assign(otherOptions, { query });
    if (isSyncSSR && (watchQueryOptions.fetchPolicy === "network-only" || watchQueryOptions.fetchPolicy === "cache-and-network")) {
      watchQueryOptions.fetchPolicy = "cache-first";
    }
    if (!watchQueryOptions.variables) {
      watchQueryOptions.variables = {};
    }
    if (skip) {
      watchQueryOptions.initialFetchPolicy = watchQueryOptions.initialFetchPolicy || watchQueryOptions.fetchPolicy || getDefaultFetchPolicy(defaultOptions, client.defaultOptions);
      watchQueryOptions.fetchPolicy = "standby";
    } else if (!watchQueryOptions.fetchPolicy) {
      watchQueryOptions.fetchPolicy = (observable === null || observable === void 0 ? void 0 : observable.options.initialFetchPolicy) || getDefaultFetchPolicy(defaultOptions, client.defaultOptions);
    }
    return watchQueryOptions;
  };
}
function getObsQueryOptions(observable, client, queryHookOptions, watchQueryOptions) {
  var toMerge = [];
  var globalDefaults = client.defaultOptions.watchQuery;
  if (globalDefaults)
    toMerge.push(globalDefaults);
  if (queryHookOptions.defaultOptions) {
    toMerge.push(queryHookOptions.defaultOptions);
  }
  toMerge.push(compact(observable && observable.options, watchQueryOptions));
  return toMerge.reduce(mergeOptions);
}
function setResult(nextResult, resultData, observable, client, partialRefetch, forceUpdate, callbacks) {
  var previousResult = resultData.current;
  if (previousResult && previousResult.data) {
    resultData.previousData = previousResult.data;
  }
  if (!nextResult.error && isNonEmptyArray(nextResult.errors)) {
    nextResult.error = new ApolloError({ graphQLErrors: nextResult.errors });
  }
  resultData.current = toQueryResult(unsafeHandlePartialRefetch(nextResult, observable, partialRefetch), resultData.previousData, observable, client);
  forceUpdate();
  handleErrorOrCompleted(nextResult, previousResult === null || previousResult === void 0 ? void 0 : previousResult.networkStatus, callbacks);
}
function handleErrorOrCompleted(result, previousNetworkStatus, callbacks) {
  if (!result.loading) {
    var error_1 = toApolloError(result);
    Promise.resolve().then(function() {
      if (error_1) {
        callbacks.onError(error_1);
      } else if (result.data && previousNetworkStatus !== result.networkStatus && result.networkStatus === NetworkStatus.ready) {
        callbacks.onCompleted(result.data);
      }
    }).catch(function(error) {
      globalThis.__DEV__ !== false && invariant.warn(error);
    });
  }
}
function getCurrentResult(resultData, observable, callbacks, partialRefetch, client) {
  if (!resultData.current) {
    setResult(observable.getCurrentResult(), resultData, observable, client, partialRefetch, function() {
    }, callbacks);
  }
  return resultData.current;
}
function getDefaultFetchPolicy(queryHookDefaultOptions, clientDefaultOptions) {
  var _a;
  return (queryHookDefaultOptions === null || queryHookDefaultOptions === void 0 ? void 0 : queryHookDefaultOptions.fetchPolicy) || ((_a = clientDefaultOptions === null || clientDefaultOptions === void 0 ? void 0 : clientDefaultOptions.watchQuery) === null || _a === void 0 ? void 0 : _a.fetchPolicy) || "cache-first";
}
function toApolloError(result) {
  return isNonEmptyArray(result.errors) ? new ApolloError({ graphQLErrors: result.errors }) : result.error;
}
function toQueryResult(result, previousData, observable, client) {
  var data = result.data, partial = result.partial, resultWithoutPartial = __rest(result, ["data", "partial"]);
  var queryResult = __assign(__assign({ data }, resultWithoutPartial), { client, observable, variables: observable.variables, called: result !== ssrDisabledResult && result !== skipStandbyResult, previousData });
  return queryResult;
}
function unsafeHandlePartialRefetch(result, observable, partialRefetch) {
  if (result.partial && partialRefetch && !result.loading && (!result.data || Object.keys(result.data).length === 0) && observable.options.fetchPolicy !== "cache-only") {
    observable.refetch();
    return __assign(__assign({}, result), { loading: true, networkStatus: NetworkStatus.refetch });
  }
  return result;
}
var ssrDisabledResult = maybeDeepFreeze({
  loading: true,
  data: void 0,
  error: void 0,
  networkStatus: NetworkStatus.loading
});
var skipStandbyResult = maybeDeepFreeze({
  loading: false,
  data: void 0,
  error: void 0,
  networkStatus: NetworkStatus.ready
});
function bindObservableMethods(observable) {
  return {
    refetch: observable.refetch.bind(observable),
    reobserve: observable.reobserve.bind(observable),
    fetchMore: observable.fetchMore.bind(observable),
    updateQuery: observable.updateQuery.bind(observable),
    startPolling: observable.startPolling.bind(observable),
    stopPolling: observable.stopPolling.bind(observable),
    subscribeToMore: observable.subscribeToMore.bind(observable)
  };
}

// node_modules/@apollo/client/react/hooks/useLazyQuery.js
var EAGER_METHODS = [
  "refetch",
  "reobserve",
  "fetchMore",
  "updateQuery",
  "startPolling",
  "stopPolling",
  "subscribeToMore"
];
function useLazyQuery(query, options) {
  var _a;
  var execOptionsRef = React11.useRef(void 0);
  var optionsRef = React11.useRef(void 0);
  var queryRef = React11.useRef(void 0);
  var merged = mergeOptions(options, execOptionsRef.current || {});
  var document = (_a = merged === null || merged === void 0 ? void 0 : merged.query) !== null && _a !== void 0 ? _a : query;
  optionsRef.current = options;
  queryRef.current = document;
  var queryHookOptions = __assign(__assign({}, merged), { skip: !execOptionsRef.current });
  var _b = useQueryInternals(document, queryHookOptions), obsQueryFields = _b.obsQueryFields, useQueryResult = _b.result, client = _b.client, resultData = _b.resultData, observable = _b.observable, onQueryExecuted = _b.onQueryExecuted;
  var initialFetchPolicy = observable.options.initialFetchPolicy || getDefaultFetchPolicy(queryHookOptions.defaultOptions, client.defaultOptions);
  var forceUpdateState = React11.useReducer(function(tick) {
    return tick + 1;
  }, 0)[1];
  var eagerMethods = React11.useMemo(function() {
    var eagerMethods2 = {};
    var _loop_1 = function(key2) {
      var method = obsQueryFields[key2];
      eagerMethods2[key2] = function() {
        if (!execOptionsRef.current) {
          execOptionsRef.current = /* @__PURE__ */ Object.create(null);
          forceUpdateState();
        }
        return method.apply(this, arguments);
      };
    };
    for (var _i = 0, EAGER_METHODS_1 = EAGER_METHODS; _i < EAGER_METHODS_1.length; _i++) {
      var key = EAGER_METHODS_1[_i];
      _loop_1(key);
    }
    return eagerMethods2;
  }, [forceUpdateState, obsQueryFields]);
  var called = !!execOptionsRef.current;
  var result = React11.useMemo(function() {
    return __assign(__assign(__assign({}, useQueryResult), eagerMethods), { called });
  }, [useQueryResult, eagerMethods, called]);
  var execute2 = React11.useCallback(function(executeOptions) {
    execOptionsRef.current = executeOptions ? __assign(__assign({}, executeOptions), { fetchPolicy: executeOptions.fetchPolicy || initialFetchPolicy }) : {
      fetchPolicy: initialFetchPolicy
    };
    var options2 = mergeOptions(optionsRef.current, __assign({ query: queryRef.current }, execOptionsRef.current));
    var promise = executeQuery(resultData, observable, client, document, __assign(__assign({}, options2), { skip: false }), onQueryExecuted).then(function(queryResult) {
      return Object.assign(queryResult, eagerMethods);
    });
    promise.catch(function() {
    });
    return promise;
  }, [
    client,
    document,
    eagerMethods,
    initialFetchPolicy,
    observable,
    resultData,
    onQueryExecuted
  ]);
  var executeRef = React11.useRef(execute2);
  useIsomorphicLayoutEffect(function() {
    executeRef.current = execute2;
  });
  var stableExecute = React11.useCallback(function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return executeRef.current.apply(executeRef, args);
  }, []);
  return [stableExecute, result];
}
function executeQuery(resultData, observable, client, currentQuery, options, onQueryExecuted) {
  var query = options.query || currentQuery;
  var watchQueryOptions = createMakeWatchQueryOptions(client, query, options, false)(observable);
  var concast = observable.reobserveAsConcast(getObsQueryOptions(observable, client, options, watchQueryOptions));
  onQueryExecuted(watchQueryOptions);
  return new Promise(function(resolve) {
    var result;
    concast.subscribe({
      next: function(value) {
        result = value;
      },
      error: function() {
        resolve(toQueryResult(observable.getCurrentResult(), resultData.previousData, observable, client));
      },
      complete: function() {
        resolve(toQueryResult(observable["maskResult"](result), resultData.previousData, observable, client));
      }
    });
  });
}

// node_modules/@apollo/client/react/hooks/useMutation.js
init_tslib_es6();
var React12 = __toESM(require_rehackt(), 1);
init_utilities();
init_lib2();
init_errors();
function useMutation(mutation, options) {
  var client = useApolloClient(options === null || options === void 0 ? void 0 : options.client);
  verifyDocumentType(mutation, DocumentType.Mutation);
  var _a = React12.useState({
    called: false,
    loading: false,
    client
  }), result = _a[0], setResult2 = _a[1];
  var ref = React12.useRef({
    result,
    mutationId: 0,
    isMounted: true,
    client,
    mutation,
    options
  });
  useIsomorphicLayoutEffect(function() {
    Object.assign(ref.current, { client, options, mutation });
  });
  var execute2 = React12.useCallback(function(executeOptions) {
    if (executeOptions === void 0) {
      executeOptions = {};
    }
    var _a2 = ref.current, options2 = _a2.options, mutation2 = _a2.mutation;
    var baseOptions = __assign(__assign({}, options2), { mutation: mutation2 });
    var client2 = executeOptions.client || ref.current.client;
    if (!ref.current.result.loading && !baseOptions.ignoreResults && ref.current.isMounted) {
      setResult2(ref.current.result = {
        loading: true,
        error: void 0,
        data: void 0,
        called: true,
        client: client2
      });
    }
    var mutationId = ++ref.current.mutationId;
    var clientOptions = mergeOptions(baseOptions, executeOptions);
    return client2.mutate(clientOptions).then(function(response) {
      var _a3, _b;
      var data = response.data, errors = response.errors;
      var error = errors && errors.length > 0 ? new ApolloError({ graphQLErrors: errors }) : void 0;
      var onError = executeOptions.onError || ((_a3 = ref.current.options) === null || _a3 === void 0 ? void 0 : _a3.onError);
      if (error && onError) {
        onError(error, clientOptions);
      }
      if (mutationId === ref.current.mutationId && !clientOptions.ignoreResults) {
        var result_1 = {
          called: true,
          loading: false,
          data,
          error,
          client: client2
        };
        if (ref.current.isMounted && !equal(ref.current.result, result_1)) {
          setResult2(ref.current.result = result_1);
        }
      }
      var onCompleted = executeOptions.onCompleted || ((_b = ref.current.options) === null || _b === void 0 ? void 0 : _b.onCompleted);
      if (!error) {
        onCompleted === null || onCompleted === void 0 ? void 0 : onCompleted(response.data, clientOptions);
      }
      return response;
    }, function(error) {
      var _a3;
      if (mutationId === ref.current.mutationId && ref.current.isMounted) {
        var result_2 = {
          loading: false,
          error,
          data: void 0,
          called: true,
          client: client2
        };
        if (!equal(ref.current.result, result_2)) {
          setResult2(ref.current.result = result_2);
        }
      }
      var onError = executeOptions.onError || ((_a3 = ref.current.options) === null || _a3 === void 0 ? void 0 : _a3.onError);
      if (onError) {
        onError(error, clientOptions);
        return { data: void 0, errors: error };
      }
      throw error;
    });
  }, []);
  var reset = React12.useCallback(function() {
    if (ref.current.isMounted) {
      var result_3 = {
        called: false,
        loading: false,
        client: ref.current.client
      };
      Object.assign(ref.current, { mutationId: 0, result: result_3 });
      setResult2(result_3);
    }
  }, []);
  React12.useEffect(function() {
    var current = ref.current;
    current.isMounted = true;
    return function() {
      current.isMounted = false;
    };
  }, []);
  return [execute2, __assign({ reset }, result)];
}

// node_modules/@apollo/client/react/hooks/useSubscription.js
init_tslib_es6();
init_globals();
var React13 = __toESM(require_rehackt(), 1);
init_lib2();
init_core();
function useSubscription(subscription, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  var hasIssuedDeprecationWarningRef = React13.useRef(false);
  var client = useApolloClient(options.client);
  verifyDocumentType(subscription, DocumentType.Subscription);
  if (!hasIssuedDeprecationWarningRef.current) {
    hasIssuedDeprecationWarningRef.current = true;
    if (options.onSubscriptionData) {
      globalThis.__DEV__ !== false && invariant.warn(options.onData ? 61 : 62);
    }
    if (options.onSubscriptionComplete) {
      globalThis.__DEV__ !== false && invariant.warn(options.onComplete ? 63 : 64);
    }
  }
  var skip = options.skip, fetchPolicy = options.fetchPolicy, errorPolicy = options.errorPolicy, shouldResubscribe = options.shouldResubscribe, context = options.context, extensions = options.extensions, ignoreResults = options.ignoreResults;
  var variables = useDeepMemo(function() {
    return options.variables;
  }, [options.variables]);
  var recreate = function() {
    return createSubscription(client, subscription, variables, fetchPolicy, errorPolicy, context, extensions);
  };
  var _a = React13.useState(options.skip ? null : recreate), observable = _a[0], setObservable = _a[1];
  var recreateRef = React13.useRef(recreate);
  useIsomorphicLayoutEffect(function() {
    recreateRef.current = recreate;
  });
  if (skip) {
    if (observable) {
      setObservable(observable = null);
    }
  } else if (!observable || (client !== observable.__.client || subscription !== observable.__.query || fetchPolicy !== observable.__.fetchPolicy || errorPolicy !== observable.__.errorPolicy || !equal(variables, observable.__.variables)) && (typeof shouldResubscribe === "function" ? !!shouldResubscribe(options) : shouldResubscribe) !== false) {
    setObservable(observable = recreate());
  }
  var optionsRef = React13.useRef(options);
  React13.useEffect(function() {
    optionsRef.current = options;
  });
  var fallbackLoading = !skip && !ignoreResults;
  var fallbackResult = React13.useMemo(function() {
    return {
      loading: fallbackLoading,
      error: void 0,
      data: void 0,
      variables
    };
  }, [fallbackLoading, variables]);
  var ignoreResultsRef = React13.useRef(ignoreResults);
  useIsomorphicLayoutEffect(function() {
    ignoreResultsRef.current = ignoreResults;
  });
  var ret = useSyncExternalStore(React13.useCallback(function(update) {
    if (!observable) {
      return function() {
      };
    }
    var subscriptionStopped = false;
    var variables2 = observable.__.variables;
    var client2 = observable.__.client;
    var subscription2 = observable.subscribe({
      next: function(fetchResult) {
        var _a2, _b;
        if (subscriptionStopped) {
          return;
        }
        var result = {
          loading: false,
          // TODO: fetchResult.data can be null but SubscriptionResult.data
          // expects TData | undefined only
          data: fetchResult.data,
          error: toApolloError(fetchResult),
          variables: variables2
        };
        observable.__.setResult(result);
        if (!ignoreResultsRef.current)
          update();
        if (result.error) {
          (_b = (_a2 = optionsRef.current).onError) === null || _b === void 0 ? void 0 : _b.call(_a2, result.error);
        } else if (optionsRef.current.onData) {
          optionsRef.current.onData({
            client: client2,
            data: result
          });
        } else if (optionsRef.current.onSubscriptionData) {
          optionsRef.current.onSubscriptionData({
            client: client2,
            subscriptionData: result
          });
        }
      },
      error: function(error) {
        var _a2, _b;
        error = error instanceof ApolloError ? error : new ApolloError({ protocolErrors: [error] });
        if (!subscriptionStopped) {
          observable.__.setResult({
            loading: false,
            data: void 0,
            error,
            variables: variables2
          });
          if (!ignoreResultsRef.current)
            update();
          (_b = (_a2 = optionsRef.current).onError) === null || _b === void 0 ? void 0 : _b.call(_a2, error);
        }
      },
      complete: function() {
        if (!subscriptionStopped) {
          if (optionsRef.current.onComplete) {
            optionsRef.current.onComplete();
          } else if (optionsRef.current.onSubscriptionComplete) {
            optionsRef.current.onSubscriptionComplete();
          }
        }
      }
    });
    return function() {
      subscriptionStopped = true;
      setTimeout(function() {
        subscription2.unsubscribe();
      });
    };
  }, [observable]), function() {
    return observable && !skip && !ignoreResults ? observable.__.result : fallbackResult;
  }, function() {
    return fallbackResult;
  });
  var restart = React13.useCallback(function() {
    invariant(!optionsRef.current.skip, 65);
    setObservable(recreateRef.current());
  }, [optionsRef, recreateRef]);
  return React13.useMemo(function() {
    return __assign(__assign({}, ret), { restart });
  }, [ret, restart]);
}
function createSubscription(client, query, variables, fetchPolicy, errorPolicy, context, extensions) {
  var options = {
    query,
    variables,
    fetchPolicy,
    errorPolicy,
    context,
    extensions
  };
  var __ = __assign(__assign({}, options), { client, result: {
    loading: true,
    data: void 0,
    error: void 0,
    variables
  }, setResult: function(result) {
    __.result = result;
  } });
  var observable = null;
  return Object.assign(new Observable(function(observer) {
    if (!observable) {
      observable = client.subscribe(options);
    }
    var sub = observable.subscribe(observer);
    return function() {
      return sub.unsubscribe();
    };
  }), {
    /**
     * A tracking object to store details about the observable and the latest result of the subscription.
     */
    __
  });
}

// node_modules/@apollo/client/react/hooks/useReactiveVar.js
var React14 = __toESM(require_rehackt(), 1);
function useReactiveVar(rv) {
  return useSyncExternalStore(React14.useCallback(function(update) {
    return rv.onNextChange(function onNext() {
      update();
      rv.onNextChange(onNext);
    });
  }, [rv]), rv, rv);
}

// node_modules/@apollo/client/react/hooks/useFragment.js
init_tslib_es6();
var React15 = __toESM(require_rehackt(), 1);
init_utilities();
init_lib2();
function useFragment(options) {
  return wrapHook(
    "useFragment",
    // eslint-disable-next-line react-compiler/react-compiler
    useFragment_,
    useApolloClient(options.client)
  )(options);
}
function useFragment_(options) {
  var client = useApolloClient(options.client);
  var cache2 = client.cache;
  var from2 = options.from, rest = __rest(options, ["from"]);
  var id = React15.useMemo(function() {
    return typeof from2 === "string" ? from2 : from2 === null ? null : cache2.identify(from2);
  }, [cache2, from2]);
  var stableOptions = useDeepMemo(function() {
    return __assign(__assign({}, rest), { from: id });
  }, [rest, id]);
  var diff = React15.useMemo(function() {
    var fragment = stableOptions.fragment, fragmentName = stableOptions.fragmentName, from3 = stableOptions.from, _a = stableOptions.optimistic, optimistic = _a === void 0 ? true : _a;
    if (from3 === null) {
      return {
        result: diffToResult({
          result: {},
          complete: false
        })
      };
    }
    var cache3 = client.cache;
    var diff2 = cache3.diff(__assign(__assign({}, stableOptions), { returnPartialData: true, id: from3, query: cache3["getFragmentDoc"](fragment, fragmentName), optimistic }));
    return {
      result: diffToResult(__assign(__assign({}, diff2), { result: client["queryManager"].maskFragment({
        fragment,
        fragmentName,
        data: diff2.result
      }) }))
    };
  }, [client, stableOptions]);
  var getSnapshot = React15.useCallback(function() {
    return diff.result;
  }, [diff]);
  return useSyncExternalStore(React15.useCallback(function(forceUpdate) {
    var lastTimeout = 0;
    var subscription = stableOptions.from === null ? null : client.watchFragment(stableOptions).subscribe({
      next: function(result) {
        if (lib_default(result, diff.result))
          return;
        diff.result = result;
        clearTimeout(lastTimeout);
        lastTimeout = setTimeout(forceUpdate);
      }
    });
    return function() {
      subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
      clearTimeout(lastTimeout);
    };
  }, [client, stableOptions, diff]), getSnapshot, getSnapshot);
}
function diffToResult(diff) {
  var result = {
    data: diff.result,
    complete: !!diff.complete
  };
  if (diff.missing) {
    result.missing = mergeDeepArray(diff.missing.map(function(error) {
      return error.missing;
    }));
  }
  return result;
}

// node_modules/@apollo/client/react/hooks/useSuspenseQuery.js
init_tslib_es6();
var React16 = __toESM(require_rehackt(), 1);
init_globals();
init_core();
init_utilities();

// node_modules/@apollo/client/react/internal/cache/SuspenseCache.js
init_lib();
init_utilities();

// node_modules/@apollo/client/react/internal/cache/QueryReference.js
init_tslib_es6();
init_lib2();
init_utilities();
init_utilities();
init_invariantWrappers();
var QUERY_REFERENCE_SYMBOL = Symbol.for("apollo.internal.queryRef");
var PROMISE_SYMBOL = Symbol.for("apollo.internal.refPromise");
function wrapQueryRef(internalQueryRef) {
  var _a;
  var ref = (_a = {
    toPromise: function() {
      return getWrappedPromise(ref).then(function() {
        return ref;
      });
    }
  }, _a[QUERY_REFERENCE_SYMBOL] = internalQueryRef, _a[PROMISE_SYMBOL] = internalQueryRef.promise, _a);
  return ref;
}
function assertWrappedQueryRef(queryRef) {
  invariant(!queryRef || QUERY_REFERENCE_SYMBOL in queryRef, 69);
}
function getWrappedPromise(queryRef) {
  var internalQueryRef = unwrapQueryRef(queryRef);
  return internalQueryRef.promise.status === "fulfilled" ? internalQueryRef.promise : queryRef[PROMISE_SYMBOL];
}
function unwrapQueryRef(queryRef) {
  return queryRef[QUERY_REFERENCE_SYMBOL];
}
function updateWrappedQueryRef(queryRef, promise) {
  queryRef[PROMISE_SYMBOL] = promise;
}
var OBSERVED_CHANGED_OPTIONS = [
  "canonizeResults",
  "context",
  "errorPolicy",
  "fetchPolicy",
  "refetchWritePolicy",
  "returnPartialData"
];
var InternalQueryReference = (
  /** @class */
  function() {
    function InternalQueryReference2(observable, options) {
      var _this = this;
      this.key = {};
      this.listeners = /* @__PURE__ */ new Set();
      this.references = 0;
      this.softReferences = 0;
      this.handleNext = this.handleNext.bind(this);
      this.handleError = this.handleError.bind(this);
      this.dispose = this.dispose.bind(this);
      this.observable = observable;
      if (options.onDispose) {
        this.onDispose = options.onDispose;
      }
      this.setResult();
      this.subscribeToQuery();
      var startDisposeTimer = function() {
        var _a;
        if (!_this.references) {
          _this.autoDisposeTimeoutId = setTimeout(_this.dispose, (_a = options.autoDisposeTimeoutMs) !== null && _a !== void 0 ? _a : 3e4);
        }
      };
      this.promise.then(startDisposeTimer, startDisposeTimer);
    }
    Object.defineProperty(InternalQueryReference2.prototype, "disposed", {
      get: function() {
        return this.subscription.closed;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(InternalQueryReference2.prototype, "watchQueryOptions", {
      get: function() {
        return this.observable.options;
      },
      enumerable: false,
      configurable: true
    });
    InternalQueryReference2.prototype.reinitialize = function() {
      var observable = this.observable;
      var originalFetchPolicy = this.watchQueryOptions.fetchPolicy;
      var avoidNetworkRequests = originalFetchPolicy === "no-cache" || originalFetchPolicy === "standby";
      try {
        if (avoidNetworkRequests) {
          observable.silentSetOptions({ fetchPolicy: "standby" });
        } else {
          observable.resetLastResults();
          observable.silentSetOptions({ fetchPolicy: "cache-first" });
        }
        this.subscribeToQuery();
        if (avoidNetworkRequests) {
          return;
        }
        observable.resetDiff();
        this.setResult();
      } finally {
        observable.silentSetOptions({ fetchPolicy: originalFetchPolicy });
      }
    };
    InternalQueryReference2.prototype.retain = function() {
      var _this = this;
      this.references++;
      clearTimeout(this.autoDisposeTimeoutId);
      var disposed = false;
      return function() {
        if (disposed) {
          return;
        }
        disposed = true;
        _this.references--;
        setTimeout(function() {
          if (!_this.references) {
            _this.dispose();
          }
        });
      };
    };
    InternalQueryReference2.prototype.softRetain = function() {
      var _this = this;
      this.softReferences++;
      var disposed = false;
      return function() {
        if (disposed) {
          return;
        }
        disposed = true;
        _this.softReferences--;
        setTimeout(function() {
          if (!_this.softReferences && !_this.references) {
            _this.dispose();
          }
        });
      };
    };
    InternalQueryReference2.prototype.didChangeOptions = function(watchQueryOptions) {
      var _this = this;
      return OBSERVED_CHANGED_OPTIONS.some(function(option) {
        return option in watchQueryOptions && !equal(_this.watchQueryOptions[option], watchQueryOptions[option]);
      });
    };
    InternalQueryReference2.prototype.applyOptions = function(watchQueryOptions) {
      var _a = this.watchQueryOptions, currentFetchPolicy = _a.fetchPolicy, currentCanonizeResults = _a.canonizeResults;
      if (currentFetchPolicy === "standby" && currentFetchPolicy !== watchQueryOptions.fetchPolicy) {
        this.initiateFetch(this.observable.reobserve(watchQueryOptions));
      } else {
        this.observable.silentSetOptions(watchQueryOptions);
        if (currentCanonizeResults !== watchQueryOptions.canonizeResults) {
          this.result = __assign(__assign({}, this.result), this.observable.getCurrentResult());
          this.promise = createFulfilledPromise(this.result);
        }
      }
      return this.promise;
    };
    InternalQueryReference2.prototype.listen = function(listener) {
      var _this = this;
      this.listeners.add(listener);
      return function() {
        _this.listeners.delete(listener);
      };
    };
    InternalQueryReference2.prototype.refetch = function(variables) {
      return this.initiateFetch(this.observable.refetch(variables));
    };
    InternalQueryReference2.prototype.fetchMore = function(options) {
      return this.initiateFetch(this.observable.fetchMore(options));
    };
    InternalQueryReference2.prototype.dispose = function() {
      this.subscription.unsubscribe();
      this.onDispose();
    };
    InternalQueryReference2.prototype.onDispose = function() {
    };
    InternalQueryReference2.prototype.handleNext = function(result) {
      var _a;
      switch (this.promise.status) {
        case "pending": {
          if (result.data === void 0) {
            result.data = this.result.data;
          }
          this.result = result;
          (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, result);
          break;
        }
        default: {
          if (result.data === this.result.data && result.networkStatus === this.result.networkStatus) {
            return;
          }
          if (result.data === void 0) {
            result.data = this.result.data;
          }
          this.result = result;
          this.promise = createFulfilledPromise(result);
          this.deliver(this.promise);
          break;
        }
      }
    };
    InternalQueryReference2.prototype.handleError = function(error) {
      var _a;
      this.subscription.unsubscribe();
      this.subscription = this.observable.resubscribeAfterError(this.handleNext, this.handleError);
      switch (this.promise.status) {
        case "pending": {
          (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, error);
          break;
        }
        default: {
          this.promise = createRejectedPromise(error);
          this.deliver(this.promise);
        }
      }
    };
    InternalQueryReference2.prototype.deliver = function(promise) {
      this.listeners.forEach(function(listener) {
        return listener(promise);
      });
    };
    InternalQueryReference2.prototype.initiateFetch = function(returnedPromise) {
      var _this = this;
      this.promise = this.createPendingPromise();
      this.promise.catch(function() {
      });
      returnedPromise.then(function() {
        setTimeout(function() {
          var _a;
          if (_this.promise.status === "pending") {
            _this.result = _this.observable.getCurrentResult();
            (_a = _this.resolve) === null || _a === void 0 ? void 0 : _a.call(_this, _this.result);
          }
        });
      }).catch(function(error) {
        var _a;
        return (_a = _this.reject) === null || _a === void 0 ? void 0 : _a.call(_this, error);
      });
      return returnedPromise;
    };
    InternalQueryReference2.prototype.subscribeToQuery = function() {
      var _this = this;
      this.subscription = this.observable.filter(function(result) {
        return !equal(result.data, {}) && !equal(result, _this.result);
      }).subscribe(this.handleNext, this.handleError);
    };
    InternalQueryReference2.prototype.setResult = function() {
      var result = this.observable.getCurrentResult(false);
      if (equal(result, this.result)) {
        return;
      }
      this.result = result;
      this.promise = result.data && (!result.partial || this.watchQueryOptions.returnPartialData) ? createFulfilledPromise(result) : this.createPendingPromise();
    };
    InternalQueryReference2.prototype.createPendingPromise = function() {
      var _this = this;
      return wrapPromiseWithState(new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      }));
    };
    return InternalQueryReference2;
  }()
);

// node_modules/@apollo/client/react/internal/cache/FragmentReference.js
init_tslib_es6();
init_lib2();
init_utilities();
var FragmentReference = (
  /** @class */
  function() {
    function FragmentReference2(client, watchFragmentOptions, options) {
      var _this = this;
      this.key = {};
      this.listeners = /* @__PURE__ */ new Set();
      this.references = 0;
      this.dispose = this.dispose.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.handleError = this.handleError.bind(this);
      this.observable = client.watchFragment(watchFragmentOptions);
      if (options.onDispose) {
        this.onDispose = options.onDispose;
      }
      var diff = this.getDiff(client, watchFragmentOptions);
      var startDisposeTimer = function() {
        var _a;
        if (!_this.references) {
          _this.autoDisposeTimeoutId = setTimeout(_this.dispose, (_a = options.autoDisposeTimeoutMs) !== null && _a !== void 0 ? _a : 3e4);
        }
      };
      this.promise = diff.complete ? createFulfilledPromise(diff.result) : this.createPendingPromise();
      this.subscribeToFragment();
      this.promise.then(startDisposeTimer, startDisposeTimer);
    }
    FragmentReference2.prototype.listen = function(listener) {
      var _this = this;
      this.listeners.add(listener);
      return function() {
        _this.listeners.delete(listener);
      };
    };
    FragmentReference2.prototype.retain = function() {
      var _this = this;
      this.references++;
      clearTimeout(this.autoDisposeTimeoutId);
      var disposed = false;
      return function() {
        if (disposed) {
          return;
        }
        disposed = true;
        _this.references--;
        setTimeout(function() {
          if (!_this.references) {
            _this.dispose();
          }
        });
      };
    };
    FragmentReference2.prototype.dispose = function() {
      this.subscription.unsubscribe();
      this.onDispose();
    };
    FragmentReference2.prototype.onDispose = function() {
    };
    FragmentReference2.prototype.subscribeToFragment = function() {
      this.subscription = this.observable.subscribe(this.handleNext.bind(this), this.handleError.bind(this));
    };
    FragmentReference2.prototype.handleNext = function(result) {
      var _a;
      switch (this.promise.status) {
        case "pending": {
          if (result.complete) {
            return (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, result.data);
          }
          this.deliver(this.promise);
          break;
        }
        case "fulfilled": {
          if (equal(this.promise.value, result.data)) {
            return;
          }
          this.promise = result.complete ? createFulfilledPromise(result.data) : this.createPendingPromise();
          this.deliver(this.promise);
        }
      }
    };
    FragmentReference2.prototype.handleError = function(error) {
      var _a;
      (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, error);
    };
    FragmentReference2.prototype.deliver = function(promise) {
      this.listeners.forEach(function(listener) {
        return listener(promise);
      });
    };
    FragmentReference2.prototype.createPendingPromise = function() {
      var _this = this;
      return wrapPromiseWithState(new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      }));
    };
    FragmentReference2.prototype.getDiff = function(client, options) {
      var cache2 = client.cache;
      var from2 = options.from, fragment = options.fragment, fragmentName = options.fragmentName;
      var diff = cache2.diff(__assign(__assign({}, options), { query: cache2["getFragmentDoc"](fragment, fragmentName), returnPartialData: true, id: from2, optimistic: true }));
      return __assign(__assign({}, diff), { result: client["queryManager"].maskFragment({
        fragment,
        fragmentName,
        data: diff.result
      }) });
    };
    return FragmentReference2;
  }()
);

// node_modules/@apollo/client/react/internal/cache/SuspenseCache.js
var SuspenseCache = (
  /** @class */
  function() {
    function SuspenseCache2(options) {
      if (options === void 0) {
        options = /* @__PURE__ */ Object.create(null);
      }
      this.queryRefs = new Trie(canUseWeakMap);
      this.fragmentRefs = new Trie(canUseWeakMap);
      this.options = options;
    }
    SuspenseCache2.prototype.getQueryRef = function(cacheKey, createObservable) {
      var ref = this.queryRefs.lookupArray(cacheKey);
      if (!ref.current) {
        ref.current = new InternalQueryReference(createObservable(), {
          autoDisposeTimeoutMs: this.options.autoDisposeTimeoutMs,
          onDispose: function() {
            delete ref.current;
          }
        });
      }
      return ref.current;
    };
    SuspenseCache2.prototype.getFragmentRef = function(cacheKey, client, options) {
      var ref = this.fragmentRefs.lookupArray(cacheKey);
      if (!ref.current) {
        ref.current = new FragmentReference(client, options, {
          autoDisposeTimeoutMs: this.options.autoDisposeTimeoutMs,
          onDispose: function() {
            delete ref.current;
          }
        });
      }
      return ref.current;
    };
    SuspenseCache2.prototype.add = function(cacheKey, queryRef) {
      var ref = this.queryRefs.lookupArray(cacheKey);
      ref.current = queryRef;
    };
    return SuspenseCache2;
  }()
);

// node_modules/@apollo/client/react/internal/cache/getSuspenseCache.js
var suspenseCacheSymbol = Symbol.for("apollo.suspenseCache");
function getSuspenseCache(client) {
  var _a;
  if (!client[suspenseCacheSymbol]) {
    client[suspenseCacheSymbol] = new SuspenseCache((_a = client.defaultOptions.react) === null || _a === void 0 ? void 0 : _a.suspense);
  }
  return client[suspenseCacheSymbol];
}

// node_modules/@apollo/client/react/hooks/useSuspenseQuery.js
init_cache();

// node_modules/@apollo/client/react/hooks/constants.js
var skipToken = Symbol.for("apollo.skipToken");

// node_modules/@apollo/client/react/hooks/useSuspenseQuery.js
function useSuspenseQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  return wrapHook(
    "useSuspenseQuery",
    // eslint-disable-next-line react-compiler/react-compiler
    useSuspenseQuery_,
    useApolloClient(typeof options === "object" ? options.client : void 0)
  )(query, options);
}
function useSuspenseQuery_(query, options) {
  var client = useApolloClient(options.client);
  var suspenseCache = getSuspenseCache(client);
  var watchQueryOptions = useWatchQueryOptions({
    client,
    query,
    options
  });
  var fetchPolicy = watchQueryOptions.fetchPolicy, variables = watchQueryOptions.variables;
  var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
  var cacheKey = __spreadArray([
    query,
    canonicalStringify(variables)
  ], [].concat(queryKey), true);
  var queryRef = suspenseCache.getQueryRef(cacheKey, function() {
    return client.watchQuery(watchQueryOptions);
  });
  var _b = React16.useState([queryRef.key, queryRef.promise]), current = _b[0], setPromise = _b[1];
  if (current[0] !== queryRef.key) {
    current[0] = queryRef.key;
    current[1] = queryRef.promise;
  }
  var promise = current[1];
  if (queryRef.didChangeOptions(watchQueryOptions)) {
    current[1] = promise = queryRef.applyOptions(watchQueryOptions);
  }
  React16.useEffect(function() {
    var dispose = queryRef.retain();
    var removeListener = queryRef.listen(function(promise2) {
      setPromise([queryRef.key, promise2]);
    });
    return function() {
      removeListener();
      dispose();
    };
  }, [queryRef]);
  var skipResult = React16.useMemo(function() {
    var error = toApolloError2(queryRef.result);
    return {
      loading: false,
      data: queryRef.result.data,
      networkStatus: error ? NetworkStatus.error : NetworkStatus.ready,
      error
    };
  }, [queryRef.result]);
  var result = fetchPolicy === "standby" ? skipResult : __use(promise);
  var fetchMore = React16.useCallback(function(options2) {
    var promise2 = queryRef.fetchMore(options2);
    setPromise([queryRef.key, queryRef.promise]);
    return promise2;
  }, [queryRef]);
  var refetch = React16.useCallback(function(variables2) {
    var promise2 = queryRef.refetch(variables2);
    setPromise([queryRef.key, queryRef.promise]);
    return promise2;
  }, [queryRef]);
  var subscribeToMore = queryRef.observable.subscribeToMore;
  return React16.useMemo(function() {
    return {
      client,
      data: result.data,
      error: toApolloError2(result),
      networkStatus: result.networkStatus,
      fetchMore,
      refetch,
      subscribeToMore
    };
  }, [client, fetchMore, refetch, result, subscribeToMore]);
}
function validateOptions(options) {
  var query = options.query, fetchPolicy = options.fetchPolicy, returnPartialData = options.returnPartialData;
  verifyDocumentType(query, DocumentType.Query);
  validateFetchPolicy(fetchPolicy);
  validatePartialDataReturn(fetchPolicy, returnPartialData);
}
function validateFetchPolicy(fetchPolicy) {
  if (fetchPolicy === void 0) {
    fetchPolicy = "cache-first";
  }
  var supportedFetchPolicies = [
    "cache-first",
    "network-only",
    "no-cache",
    "cache-and-network"
  ];
  invariant(supportedFetchPolicies.includes(fetchPolicy), 66, fetchPolicy);
}
function validatePartialDataReturn(fetchPolicy, returnPartialData) {
  if (fetchPolicy === "no-cache" && returnPartialData) {
    globalThis.__DEV__ !== false && invariant.warn(67);
  }
}
function toApolloError2(result) {
  return isNonEmptyArray(result.errors) ? new ApolloError({ graphQLErrors: result.errors }) : result.error;
}
function useWatchQueryOptions(_a) {
  var client = _a.client, query = _a.query, options = _a.options;
  return useDeepMemo(function() {
    var _a2;
    if (options === skipToken) {
      return { query, fetchPolicy: "standby" };
    }
    var fetchPolicy = options.fetchPolicy || ((_a2 = client.defaultOptions.watchQuery) === null || _a2 === void 0 ? void 0 : _a2.fetchPolicy) || "cache-first";
    var watchQueryOptions = __assign(__assign({}, options), { fetchPolicy, query, notifyOnNetworkStatusChange: false, nextFetchPolicy: void 0 });
    if (globalThis.__DEV__ !== false) {
      validateOptions(watchQueryOptions);
    }
    if (options.skip) {
      watchQueryOptions.fetchPolicy = "standby";
    }
    return watchQueryOptions;
  }, [client, options, query]);
}

// node_modules/@apollo/client/react/hooks/useBackgroundQuery.js
init_tslib_es6();
var React17 = __toESM(require_rehackt(), 1);
init_cache();
function useBackgroundQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  return wrapHook(
    "useBackgroundQuery",
    // eslint-disable-next-line react-compiler/react-compiler
    useBackgroundQuery_,
    useApolloClient(typeof options === "object" ? options.client : void 0)
  )(query, options);
}
function useBackgroundQuery_(query, options) {
  var client = useApolloClient(options.client);
  var suspenseCache = getSuspenseCache(client);
  var watchQueryOptions = useWatchQueryOptions({ client, query, options });
  var fetchPolicy = watchQueryOptions.fetchPolicy, variables = watchQueryOptions.variables;
  var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
  var didFetchResult = React17.useRef(fetchPolicy !== "standby");
  didFetchResult.current || (didFetchResult.current = fetchPolicy !== "standby");
  var cacheKey = __spreadArray([
    query,
    canonicalStringify(variables)
  ], [].concat(queryKey), true);
  var queryRef = suspenseCache.getQueryRef(cacheKey, function() {
    return client.watchQuery(watchQueryOptions);
  });
  var _b = React17.useState(wrapQueryRef(queryRef)), wrappedQueryRef = _b[0], setWrappedQueryRef = _b[1];
  if (unwrapQueryRef(wrappedQueryRef) !== queryRef) {
    setWrappedQueryRef(wrapQueryRef(queryRef));
  }
  if (queryRef.didChangeOptions(watchQueryOptions)) {
    var promise = queryRef.applyOptions(watchQueryOptions);
    updateWrappedQueryRef(wrappedQueryRef, promise);
  }
  React17.useEffect(function() {
    var id = setTimeout(function() {
      if (queryRef.disposed) {
        suspenseCache.add(cacheKey, queryRef);
      }
    });
    return function() {
      return clearTimeout(id);
    };
  });
  var fetchMore = React17.useCallback(function(options2) {
    var promise2 = queryRef.fetchMore(options2);
    setWrappedQueryRef(wrapQueryRef(queryRef));
    return promise2;
  }, [queryRef]);
  var refetch = React17.useCallback(function(variables2) {
    var promise2 = queryRef.refetch(variables2);
    setWrappedQueryRef(wrapQueryRef(queryRef));
    return promise2;
  }, [queryRef]);
  React17.useEffect(function() {
    return queryRef.softRetain();
  }, [queryRef]);
  return [
    didFetchResult.current ? wrappedQueryRef : void 0,
    {
      fetchMore,
      refetch,
      // TODO: The internalQueryRef doesn't have TVariables' type information so we have to cast it here
      subscribeToMore: queryRef.observable.subscribeToMore
    }
  ];
}

// node_modules/@apollo/client/react/hooks/useSuspenseFragment.js
init_tslib_es6();
init_cache();
var React18 = __toESM(require_rehackt(), 1);
var NULL_PLACEHOLDER = [];
function useSuspenseFragment(options) {
  return wrapHook(
    "useSuspenseFragment",
    // eslint-disable-next-line react-compiler/react-compiler
    useSuspenseFragment_,
    useApolloClient(typeof options === "object" ? options.client : void 0)
  )(options);
}
function useSuspenseFragment_(options) {
  var client = useApolloClient(options.client);
  var from2 = options.from, variables = options.variables;
  var cache2 = client.cache;
  var id = React18.useMemo(function() {
    return typeof from2 === "string" ? from2 : from2 === null ? null : cache2.identify(from2);
  }, [cache2, from2]);
  var fragmentRef = id === null ? null : getSuspenseCache(client).getFragmentRef([id, options.fragment, canonicalStringify(variables)], client, __assign(__assign({}, options), { variables, from: id }));
  var _a = React18.useState(fragmentRef === null ? NULL_PLACEHOLDER : [fragmentRef.key, fragmentRef.promise]), current = _a[0], setPromise = _a[1];
  React18.useEffect(function() {
    if (fragmentRef === null) {
      return;
    }
    var dispose = fragmentRef.retain();
    var removeListener = fragmentRef.listen(function(promise) {
      setPromise([fragmentRef.key, promise]);
    });
    return function() {
      dispose();
      removeListener();
    };
  }, [fragmentRef]);
  if (fragmentRef === null) {
    return { data: null };
  }
  if (current[0] !== fragmentRef.key) {
    current[0] = fragmentRef.key;
    current[1] = fragmentRef.promise;
  }
  var data = __use(current[1]);
  return { data };
}

// node_modules/@apollo/client/react/hooks/useLoadableQuery.js
init_tslib_es6();
var React19 = __toESM(require_rehackt(), 1);
init_cache();
init_globals();
function useLoadableQuery(query, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  var client = useApolloClient(options.client);
  var suspenseCache = getSuspenseCache(client);
  var watchQueryOptions = useWatchQueryOptions({ client, query, options });
  var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
  var _b = React19.useState(null), queryRef = _b[0], setQueryRef = _b[1];
  assertWrappedQueryRef(queryRef);
  var internalQueryRef = queryRef && unwrapQueryRef(queryRef);
  if (queryRef && (internalQueryRef === null || internalQueryRef === void 0 ? void 0 : internalQueryRef.didChangeOptions(watchQueryOptions))) {
    var promise = internalQueryRef.applyOptions(watchQueryOptions);
    updateWrappedQueryRef(queryRef, promise);
  }
  var calledDuringRender = useRenderGuard();
  var fetchMore = React19.useCallback(function(options2) {
    if (!internalQueryRef) {
      throw new Error("The query has not been loaded. Please load the query.");
    }
    var promise2 = internalQueryRef.fetchMore(options2);
    setQueryRef(wrapQueryRef(internalQueryRef));
    return promise2;
  }, [internalQueryRef]);
  var refetch = React19.useCallback(function(options2) {
    if (!internalQueryRef) {
      throw new Error("The query has not been loaded. Please load the query.");
    }
    var promise2 = internalQueryRef.refetch(options2);
    setQueryRef(wrapQueryRef(internalQueryRef));
    return promise2;
  }, [internalQueryRef]);
  var loadQuery = React19.useCallback(function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    invariant(!calledDuringRender(), 59);
    var variables = args[0];
    var cacheKey = __spreadArray([
      query,
      canonicalStringify(variables)
    ], [].concat(queryKey), true);
    var queryRef2 = suspenseCache.getQueryRef(cacheKey, function() {
      return client.watchQuery(__assign(__assign({}, watchQueryOptions), { variables }));
    });
    setQueryRef(wrapQueryRef(queryRef2));
  }, [
    query,
    queryKey,
    suspenseCache,
    watchQueryOptions,
    calledDuringRender,
    client
  ]);
  var subscribeToMore = React19.useCallback(function(options2) {
    invariant(internalQueryRef, 60);
    return internalQueryRef.observable.subscribeToMore(
      // TODO: The internalQueryRef doesn't have TVariables' type information so we have to cast it here
      options2
    );
  }, [internalQueryRef]);
  var reset = React19.useCallback(function() {
    setQueryRef(null);
  }, []);
  return [loadQuery, queryRef, { fetchMore, refetch, reset, subscribeToMore }];
}

// node_modules/@apollo/client/react/hooks/useQueryRefHandlers.js
var React20 = __toESM(require_rehackt(), 1);
function useQueryRefHandlers(queryRef) {
  var unwrapped = unwrapQueryRef(queryRef);
  var clientOrObsQuery = useApolloClient(unwrapped ? (
    // passing an `ObservableQuery` is not supported by the types, but it will
    // return any truthy value that is passed in as an override so we cast the result
    unwrapped["observable"]
  ) : void 0);
  return wrapHook(
    "useQueryRefHandlers",
    // eslint-disable-next-line react-compiler/react-compiler
    useQueryRefHandlers_,
    clientOrObsQuery
  )(queryRef);
}
function useQueryRefHandlers_(queryRef) {
  assertWrappedQueryRef(queryRef);
  var _a = React20.useState(queryRef), previousQueryRef = _a[0], setPreviousQueryRef = _a[1];
  var _b = React20.useState(queryRef), wrappedQueryRef = _b[0], setWrappedQueryRef = _b[1];
  var internalQueryRef = unwrapQueryRef(queryRef);
  if (previousQueryRef !== queryRef) {
    setPreviousQueryRef(queryRef);
    setWrappedQueryRef(queryRef);
  } else {
    updateWrappedQueryRef(queryRef, getWrappedPromise(wrappedQueryRef));
  }
  var refetch = React20.useCallback(function(variables) {
    var promise = internalQueryRef.refetch(variables);
    setWrappedQueryRef(wrapQueryRef(internalQueryRef));
    return promise;
  }, [internalQueryRef]);
  var fetchMore = React20.useCallback(function(options) {
    var promise = internalQueryRef.fetchMore(options);
    setWrappedQueryRef(wrapQueryRef(internalQueryRef));
    return promise;
  }, [internalQueryRef]);
  return {
    refetch,
    fetchMore,
    // TODO: The internalQueryRef doesn't have TVariables' type information so we have to cast it here
    subscribeToMore: internalQueryRef.observable.subscribeToMore
  };
}

// node_modules/@apollo/client/react/hooks/useReadQuery.js
var React21 = __toESM(require_rehackt(), 1);
function useReadQuery(queryRef) {
  var unwrapped = unwrapQueryRef(queryRef);
  var clientOrObsQuery = useApolloClient(unwrapped ? (
    // passing an `ObservableQuery` is not supported by the types, but it will
    // return any truthy value that is passed in as an override so we cast the result
    unwrapped["observable"]
  ) : void 0);
  return wrapHook(
    "useReadQuery",
    // eslint-disable-next-line react-compiler/react-compiler
    useReadQuery_,
    clientOrObsQuery
  )(queryRef);
}
function useReadQuery_(queryRef) {
  assertWrappedQueryRef(queryRef);
  var internalQueryRef = React21.useMemo(function() {
    return unwrapQueryRef(queryRef);
  }, [queryRef]);
  var getPromise = React21.useCallback(function() {
    return getWrappedPromise(queryRef);
  }, [queryRef]);
  if (internalQueryRef.disposed) {
    internalQueryRef.reinitialize();
    updateWrappedQueryRef(queryRef, internalQueryRef.promise);
  }
  React21.useEffect(function() {
    return internalQueryRef.retain();
  }, [internalQueryRef]);
  var promise = useSyncExternalStore(React21.useCallback(function(forceUpdate) {
    return internalQueryRef.listen(function(promise2) {
      updateWrappedQueryRef(queryRef, promise2);
      forceUpdate();
    });
  }, [internalQueryRef, queryRef]), getPromise, getPromise);
  var result = __use(promise);
  return React21.useMemo(function() {
    return {
      data: result.data,
      networkStatus: result.networkStatus,
      error: toApolloError2(result)
    };
  }, [result]);
}

// node_modules/@apollo/client/react/query-preloader/createQueryPreloader.js
init_tslib_es6();
function createQueryPreloader(client) {
  return wrapHook("createQueryPreloader", _createQueryPreloader, client)(client);
}
var _createQueryPreloader = function(client) {
  return function preloadQuery(query, options) {
    var _a, _b;
    if (options === void 0) {
      options = /* @__PURE__ */ Object.create(null);
    }
    var queryRef = new InternalQueryReference(client.watchQuery(__assign(__assign({}, options), { query })), {
      autoDisposeTimeoutMs: (_b = (_a = client.defaultOptions.react) === null || _a === void 0 ? void 0 : _a.suspense) === null || _b === void 0 ? void 0 : _b.autoDisposeTimeoutMs
    });
    return wrapQueryRef(queryRef);
  };
};
export {
  ApolloCache,
  ApolloClient,
  ApolloConsumer,
  ApolloError,
  ApolloLink,
  ApolloProvider,
  Cache,
  DocumentTransform,
  DocumentType,
  HttpLink,
  InMemoryCache,
  MissingFieldError,
  NetworkStatus,
  Observable,
  ObservableQuery,
  checkFetcher,
  concat,
  createHttpLink,
  createQueryPreloader,
  createSignalIfSupported,
  defaultDataIdFromObject,
  defaultPrinter,
  disableExperimentalFragmentVariables,
  disableFragmentWarnings,
  empty,
  enableExperimentalFragmentVariables,
  execute,
  fallbackHttpConfig,
  from,
  fromError,
  fromPromise,
  getApolloContext,
  gql,
  isApolloError,
  isNetworkRequestSettled,
  isReference,
  makeReference,
  makeVar,
  mergeOptions,
  operationName,
  parseAndCheckHttpResponse,
  parser,
  resetApolloContext,
  resetCaches,
  rewriteURIForGET,
  selectHttpOptionsAndBody,
  selectHttpOptionsAndBodyInternal,
  selectURI,
  serializeFetchParameter,
  setVerbosity as setLogVerbosity,
  skipToken,
  split,
  throwServerError,
  toPromise,
  useApolloClient,
  useBackgroundQuery,
  useFragment,
  useLazyQuery,
  useLoadableQuery,
  useMutation,
  useQuery,
  useQueryRefHandlers,
  useReactiveVar,
  useReadQuery,
  useSubscription,
  useSuspenseFragment,
  useSuspenseQuery
};
//# sourceMappingURL=@apollo_client.js.map
