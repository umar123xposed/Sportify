import {
  require_react
} from "./chunk-ZSN3XFJS.js";
import {
  __commonJS
} from "./chunk-2GTGKKMZ.js";

// node_modules/react-paginate/dist/react-paginate.js
var require_react_paginate = __commonJS({
  "node_modules/react-paginate/dist/react-paginate.js"(exports, module) {
    !function(e, a) {
      "object" == typeof exports && "object" == typeof module ? module.exports = a(require_react()) : "function" == typeof define && define.amd ? define(["react"], a) : "object" == typeof exports ? exports.ReactPaginate = a(require_react()) : e.ReactPaginate = a(e.React);
    }(exports, (e) => (() => {
      var a = { 703: (e2, a2, t2) => {
        "use strict";
        var r2 = t2(414);
        function n2() {
        }
        function i() {
        }
        i.resetWarningCache = n2, e2.exports = function() {
          function e3(e4, a4, t4, n3, i2, s) {
            if (s !== r2) {
              var o = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
              throw o.name = "Invariant Violation", o;
            }
          }
          function a3() {
            return e3;
          }
          e3.isRequired = e3;
          var t3 = { array: e3, bigint: e3, bool: e3, func: e3, number: e3, object: e3, string: e3, symbol: e3, any: e3, arrayOf: a3, element: e3, elementType: e3, instanceOf: a3, node: e3, objectOf: a3, oneOf: a3, oneOfType: a3, shape: a3, exact: a3, checkPropTypes: i, resetWarningCache: n2 };
          return t3.PropTypes = t3, t3;
        };
      }, 697: (e2, a2, t2) => {
        e2.exports = t2(703)();
      }, 414: (e2) => {
        "use strict";
        e2.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      }, 98: (a2) => {
        "use strict";
        a2.exports = e;
      } }, t = {};
      function r(e2) {
        var n2 = t[e2];
        if (void 0 !== n2)
          return n2.exports;
        var i = t[e2] = { exports: {} };
        return a[e2](i, i.exports, r), i.exports;
      }
      r.n = (e2) => {
        var a2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return r.d(a2, { a: a2 }), a2;
      }, r.d = (e2, a2) => {
        for (var t2 in a2)
          r.o(a2, t2) && !r.o(e2, t2) && Object.defineProperty(e2, t2, { enumerable: true, get: a2[t2] });
      }, r.o = (e2, a2) => Object.prototype.hasOwnProperty.call(e2, a2), r.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      };
      var n = {};
      return (() => {
        "use strict";
        r.r(n), r.d(n, { default: () => k });
        var e2 = r(98), a2 = r.n(e2), t2 = r(697), i = r.n(t2);
        function s() {
          return s = Object.assign ? Object.assign.bind() : function(e3) {
            for (var a3 = 1; a3 < arguments.length; a3++) {
              var t3 = arguments[a3];
              for (var r2 in t3)
                Object.prototype.hasOwnProperty.call(t3, r2) && (e3[r2] = t3[r2]);
            }
            return e3;
          }, s.apply(this, arguments);
        }
        var o = function(e3) {
          var t3 = e3.pageClassName, r2 = e3.pageLinkClassName, n2 = e3.page, i2 = e3.selected, o2 = e3.activeClassName, l2 = e3.activeLinkClassName, c2 = e3.getEventListener, p2 = e3.pageSelectedHandler, u2 = e3.href, g2 = e3.extraAriaContext, d2 = e3.pageLabelBuilder, f2 = e3.rel, b2 = e3.ariaLabel || "Page " + n2 + (g2 ? " " + g2 : ""), v2 = null;
          return i2 && (v2 = "page", b2 = e3.ariaLabel || "Page " + n2 + " is your current page", t3 = void 0 !== t3 ? t3 + " " + o2 : o2, void 0 !== r2 ? void 0 !== l2 && (r2 = r2 + " " + l2) : r2 = l2), a2().createElement("li", { className: t3 }, a2().createElement("a", s({ rel: f2, role: u2 ? void 0 : "button", className: r2, href: u2, tabIndex: i2 ? "-1" : "0", "aria-label": b2, "aria-current": v2, onKeyPress: p2 }, c2(p2)), d2(n2)));
        };
        o.propTypes = { pageSelectedHandler: i().func.isRequired, selected: i().bool.isRequired, pageClassName: i().string, pageLinkClassName: i().string, activeClassName: i().string, activeLinkClassName: i().string, extraAriaContext: i().string, href: i().string, ariaLabel: i().string, page: i().number.isRequired, getEventListener: i().func.isRequired, pageLabelBuilder: i().func.isRequired, rel: i().string };
        const l = o;
        function c() {
          return c = Object.assign ? Object.assign.bind() : function(e3) {
            for (var a3 = 1; a3 < arguments.length; a3++) {
              var t3 = arguments[a3];
              for (var r2 in t3)
                Object.prototype.hasOwnProperty.call(t3, r2) && (e3[r2] = t3[r2]);
            }
            return e3;
          }, c.apply(this, arguments);
        }
        var p = function(e3) {
          var t3 = e3.breakLabel, r2 = e3.breakAriaLabel, n2 = e3.breakClassName, i2 = e3.breakLinkClassName, s2 = e3.breakHandler, o2 = e3.getEventListener, l2 = n2 || "break";
          return a2().createElement("li", { className: l2 }, a2().createElement("a", c({ className: i2, role: "button", tabIndex: "0", "aria-label": r2, onKeyPress: s2 }, o2(s2)), t3));
        };
        p.propTypes = { breakLabel: i().oneOfType([i().string, i().node]), breakAriaLabel: i().string, breakClassName: i().string, breakLinkClassName: i().string, breakHandler: i().func.isRequired, getEventListener: i().func.isRequired };
        const u = p;
        function g(e3) {
          var a3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          return null != e3 ? e3 : a3;
        }
        function d(e3) {
          return d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
            return typeof e4;
          } : function(e4) {
            return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
          }, d(e3);
        }
        function f() {
          return f = Object.assign ? Object.assign.bind() : function(e3) {
            for (var a3 = 1; a3 < arguments.length; a3++) {
              var t3 = arguments[a3];
              for (var r2 in t3)
                Object.prototype.hasOwnProperty.call(t3, r2) && (e3[r2] = t3[r2]);
            }
            return e3;
          }, f.apply(this, arguments);
        }
        function b(e3, a3) {
          for (var t3 = 0; t3 < a3.length; t3++) {
            var r2 = a3[t3];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e3, r2.key, r2);
          }
        }
        function v(e3, a3) {
          return v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e4, a4) {
            return e4.__proto__ = a4, e4;
          }, v(e3, a3);
        }
        function h(e3, a3) {
          if (a3 && ("object" === d(a3) || "function" == typeof a3))
            return a3;
          if (void 0 !== a3)
            throw new TypeError("Derived constructors may only return object or undefined");
          return m(e3);
        }
        function m(e3) {
          if (void 0 === e3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e3;
        }
        function y(e3) {
          return y = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e4) {
            return e4.__proto__ || Object.getPrototypeOf(e4);
          }, y(e3);
        }
        function C(e3, a3, t3) {
          return a3 in e3 ? Object.defineProperty(e3, a3, { value: t3, enumerable: true, configurable: true, writable: true }) : e3[a3] = t3, e3;
        }
        var P = function(e3) {
          !function(e4, a3) {
            if ("function" != typeof a3 && null !== a3)
              throw new TypeError("Super expression must either be null or a function");
            e4.prototype = Object.create(a3 && a3.prototype, { constructor: { value: e4, writable: true, configurable: true } }), Object.defineProperty(e4, "prototype", { writable: false }), a3 && v(e4, a3);
          }(o2, e3);
          var t3, r2, n2, i2, s2 = (n2 = o2, i2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }(), function() {
            var e4, a3 = y(n2);
            if (i2) {
              var t4 = y(this).constructor;
              e4 = Reflect.construct(a3, arguments, t4);
            } else
              e4 = a3.apply(this, arguments);
            return h(this, e4);
          });
          function o2(e4) {
            var t4, r3;
            return function(e5, a3) {
              if (!(e5 instanceof a3))
                throw new TypeError("Cannot call a class as a function");
            }(this, o2), C(m(t4 = s2.call(this, e4)), "handlePreviousPage", function(e5) {
              var a3 = t4.state.selected;
              t4.handleClick(e5, null, a3 > 0 ? a3 - 1 : void 0, { isPrevious: true });
            }), C(m(t4), "handleNextPage", function(e5) {
              var a3 = t4.state.selected, r4 = t4.props.pageCount;
              t4.handleClick(e5, null, a3 < r4 - 1 ? a3 + 1 : void 0, { isNext: true });
            }), C(m(t4), "handlePageSelected", function(e5, a3) {
              if (t4.state.selected === e5)
                return t4.callActiveCallback(e5), void t4.handleClick(a3, null, void 0, { isActive: true });
              t4.handleClick(a3, null, e5);
            }), C(m(t4), "handlePageChange", function(e5) {
              t4.state.selected !== e5 && (t4.setState({ selected: e5 }), t4.callCallback(e5));
            }), C(m(t4), "getEventListener", function(e5) {
              return C({}, t4.props.eventListener, e5);
            }), C(m(t4), "handleClick", function(e5, a3, r4) {
              var n3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, i3 = n3.isPrevious, s3 = void 0 !== i3 && i3, o3 = n3.isNext, l2 = void 0 !== o3 && o3, c2 = n3.isBreak, p2 = void 0 !== c2 && c2, u2 = n3.isActive, g2 = void 0 !== u2 && u2;
              e5.preventDefault ? e5.preventDefault() : e5.returnValue = false;
              var d2 = t4.state.selected, f2 = t4.props.onClick, b2 = r4;
              if (f2) {
                var v2 = f2({ index: a3, selected: d2, nextSelectedPage: r4, event: e5, isPrevious: s3, isNext: l2, isBreak: p2, isActive: g2 });
                if (false === v2)
                  return;
                Number.isInteger(v2) && (b2 = v2);
              }
              void 0 !== b2 && t4.handlePageChange(b2);
            }), C(m(t4), "handleBreakClick", function(e5, a3) {
              var r4 = t4.state.selected;
              t4.handleClick(a3, e5, r4 < e5 ? t4.getForwardJump() : t4.getBackwardJump(), { isBreak: true });
            }), C(m(t4), "callCallback", function(e5) {
              void 0 !== t4.props.onPageChange && "function" == typeof t4.props.onPageChange && t4.props.onPageChange({ selected: e5 });
            }), C(m(t4), "callActiveCallback", function(e5) {
              void 0 !== t4.props.onPageActive && "function" == typeof t4.props.onPageActive && t4.props.onPageActive({ selected: e5 });
            }), C(m(t4), "getElementPageRel", function(e5) {
              var a3 = t4.state.selected, r4 = t4.props, n3 = r4.nextPageRel, i3 = r4.prevPageRel, s3 = r4.selectedPageRel;
              return a3 - 1 === e5 ? i3 : a3 === e5 ? s3 : a3 + 1 === e5 ? n3 : void 0;
            }), C(m(t4), "pagination", function() {
              var e5 = [], r4 = t4.props, n3 = r4.pageRangeDisplayed, i3 = r4.pageCount, s3 = r4.marginPagesDisplayed, o3 = r4.breakLabel, l2 = r4.breakClassName, c2 = r4.breakLinkClassName, p2 = r4.breakAriaLabels, g2 = t4.state.selected;
              if (i3 <= n3)
                for (var d2 = 0; d2 < i3; d2++)
                  e5.push(t4.getPageElement(d2));
              else {
                var f2 = n3 / 2, b2 = n3 - f2;
                g2 > i3 - n3 / 2 ? f2 = n3 - (b2 = i3 - g2) : g2 < n3 / 2 && (b2 = n3 - (f2 = g2));
                var v2, h2, m2 = function(e6) {
                  return t4.getPageElement(e6);
                }, y2 = [];
                for (v2 = 0; v2 < i3; v2++) {
                  var C2 = v2 + 1;
                  if (C2 <= s3)
                    y2.push({ type: "page", index: v2, display: m2(v2) });
                  else if (C2 > i3 - s3)
                    y2.push({ type: "page", index: v2, display: m2(v2) });
                  else if (v2 >= g2 - f2 && v2 <= g2 + (0 === g2 && n3 > 1 ? b2 - 1 : b2))
                    y2.push({ type: "page", index: v2, display: m2(v2) });
                  else if (o3 && y2.length > 0 && y2[y2.length - 1].display !== h2 && (n3 > 0 || s3 > 0)) {
                    var P2 = v2 < g2 ? p2.backward : p2.forward;
                    h2 = a2().createElement(u, { key: v2, breakAriaLabel: P2, breakLabel: o3, breakClassName: l2, breakLinkClassName: c2, breakHandler: t4.handleBreakClick.bind(null, v2), getEventListener: t4.getEventListener }), y2.push({ type: "break", index: v2, display: h2 });
                  }
                }
                y2.forEach(function(a3, t5) {
                  var r5 = a3;
                  "break" === a3.type && y2[t5 - 1] && "page" === y2[t5 - 1].type && y2[t5 + 1] && "page" === y2[t5 + 1].type && y2[t5 + 1].index - y2[t5 - 1].index <= 2 && (r5 = { type: "page", index: a3.index, display: m2(a3.index) }), e5.push(r5.display);
                });
              }
              return e5;
            }), void 0 !== e4.initialPage && void 0 !== e4.forcePage && console.warn("(react-paginate): Both initialPage (".concat(e4.initialPage, ") and forcePage (").concat(e4.forcePage, ") props are provided, which is discouraged.") + " Use exclusively forcePage prop for a controlled component.\nSee https://reactjs.org/docs/forms.html#controlled-components"), r3 = e4.initialPage ? e4.initialPage : e4.forcePage ? e4.forcePage : 0, t4.state = { selected: r3 }, t4;
          }
          return t3 = o2, (r2 = [{ key: "componentDidMount", value: function() {
            var e4 = this.props, a3 = e4.initialPage, t4 = e4.disableInitialCallback, r3 = e4.extraAriaContext, n3 = e4.pageCount, i3 = e4.forcePage;
            void 0 === a3 || t4 || this.callCallback(a3), r3 && console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."), Number.isInteger(n3) || console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(n3, "). Did you forget a Math.ceil()?")), void 0 !== a3 && a3 > n3 - 1 && console.warn("(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (".concat(a3, " > ").concat(n3 - 1, ").")), void 0 !== i3 && i3 > n3 - 1 && console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(i3, " > ").concat(n3 - 1, ")."));
          } }, { key: "componentDidUpdate", value: function(e4) {
            void 0 !== this.props.forcePage && this.props.forcePage !== e4.forcePage && (this.props.forcePage > this.props.pageCount - 1 && console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(this.props.forcePage, " > ").concat(this.props.pageCount - 1, ").")), this.setState({ selected: this.props.forcePage })), Number.isInteger(e4.pageCount) && !Number.isInteger(this.props.pageCount) && console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount, "). Did you forget a Math.ceil()?"));
          } }, { key: "getForwardJump", value: function() {
            var e4 = this.state.selected, a3 = this.props, t4 = a3.pageCount, r3 = e4 + a3.pageRangeDisplayed;
            return r3 >= t4 ? t4 - 1 : r3;
          } }, { key: "getBackwardJump", value: function() {
            var e4 = this.state.selected - this.props.pageRangeDisplayed;
            return e4 < 0 ? 0 : e4;
          } }, { key: "getElementHref", value: function(e4) {
            var a3 = this.props, t4 = a3.hrefBuilder, r3 = a3.pageCount, n3 = a3.hrefAllControls;
            if (t4)
              return n3 || e4 >= 0 && e4 < r3 ? t4(e4 + 1, r3, this.state.selected) : void 0;
          } }, { key: "ariaLabelBuilder", value: function(e4) {
            var a3 = e4 === this.state.selected;
            if (this.props.ariaLabelBuilder && e4 >= 0 && e4 < this.props.pageCount) {
              var t4 = this.props.ariaLabelBuilder(e4 + 1, a3);
              return this.props.extraAriaContext && !a3 && (t4 = t4 + " " + this.props.extraAriaContext), t4;
            }
          } }, { key: "getPageElement", value: function(e4) {
            var t4 = this.state.selected, r3 = this.props, n3 = r3.pageClassName, i3 = r3.pageLinkClassName, s3 = r3.activeClassName, o3 = r3.activeLinkClassName, c2 = r3.extraAriaContext, p2 = r3.pageLabelBuilder;
            return a2().createElement(l, { key: e4, pageSelectedHandler: this.handlePageSelected.bind(null, e4), selected: t4 === e4, rel: this.getElementPageRel(e4), pageClassName: n3, pageLinkClassName: i3, activeClassName: s3, activeLinkClassName: o3, extraAriaContext: c2, href: this.getElementHref(e4), ariaLabel: this.ariaLabelBuilder(e4), page: e4 + 1, pageLabelBuilder: p2, getEventListener: this.getEventListener });
          } }, { key: "render", value: function() {
            var e4 = this.props.renderOnZeroPageCount;
            if (0 === this.props.pageCount && void 0 !== e4)
              return e4 ? e4(this.props) : e4;
            var t4 = this.props, r3 = t4.disabledClassName, n3 = t4.disabledLinkClassName, i3 = t4.pageCount, s3 = t4.className, o3 = t4.containerClassName, l2 = t4.previousLabel, c2 = t4.previousClassName, p2 = t4.previousLinkClassName, u2 = t4.previousAriaLabel, d2 = t4.prevRel, b2 = t4.nextLabel, v2 = t4.nextClassName, h2 = t4.nextLinkClassName, m2 = t4.nextAriaLabel, y2 = t4.nextRel, C2 = this.state.selected, P2 = 0 === C2, k2 = C2 === i3 - 1, x = "".concat(g(c2)).concat(P2 ? " ".concat(g(r3)) : ""), L = "".concat(g(v2)).concat(k2 ? " ".concat(g(r3)) : ""), N = "".concat(g(p2)).concat(P2 ? " ".concat(g(n3)) : ""), O = "".concat(g(h2)).concat(k2 ? " ".concat(g(n3)) : ""), R = P2 ? "true" : "false", E = k2 ? "true" : "false";
            return a2().createElement("ul", { className: s3 || o3, role: "navigation", "aria-label": "Pagination" }, a2().createElement("li", { className: x }, a2().createElement("a", f({ className: N, href: this.getElementHref(C2 - 1), tabIndex: P2 ? "-1" : "0", role: "button", onKeyPress: this.handlePreviousPage, "aria-disabled": R, "aria-label": u2, rel: d2 }, this.getEventListener(this.handlePreviousPage)), l2)), this.pagination(), a2().createElement("li", { className: L }, a2().createElement("a", f({ className: O, href: this.getElementHref(C2 + 1), tabIndex: k2 ? "-1" : "0", role: "button", onKeyPress: this.handleNextPage, "aria-disabled": E, "aria-label": m2, rel: y2 }, this.getEventListener(this.handleNextPage)), b2)));
          } }]) && b(t3.prototype, r2), Object.defineProperty(t3, "prototype", { writable: false }), o2;
        }(e2.Component);
        C(P, "propTypes", { pageCount: i().number.isRequired, pageRangeDisplayed: i().number, marginPagesDisplayed: i().number, previousLabel: i().node, previousAriaLabel: i().string, prevPageRel: i().string, prevRel: i().string, nextLabel: i().node, nextAriaLabel: i().string, nextPageRel: i().string, nextRel: i().string, breakLabel: i().oneOfType([i().string, i().node]), breakAriaLabels: i().shape({ forward: i().string, backward: i().string }), hrefBuilder: i().func, hrefAllControls: i().bool, onPageChange: i().func, onPageActive: i().func, onClick: i().func, initialPage: i().number, forcePage: i().number, disableInitialCallback: i().bool, containerClassName: i().string, className: i().string, pageClassName: i().string, pageLinkClassName: i().string, pageLabelBuilder: i().func, activeClassName: i().string, activeLinkClassName: i().string, previousClassName: i().string, nextClassName: i().string, previousLinkClassName: i().string, nextLinkClassName: i().string, disabledClassName: i().string, disabledLinkClassName: i().string, breakClassName: i().string, breakLinkClassName: i().string, extraAriaContext: i().string, ariaLabelBuilder: i().func, eventListener: i().string, renderOnZeroPageCount: i().func, selectedPageRel: i().string }), C(P, "defaultProps", { pageRangeDisplayed: 2, marginPagesDisplayed: 3, activeClassName: "selected", previousLabel: "Previous", previousClassName: "previous", previousAriaLabel: "Previous page", prevPageRel: "prev", prevRel: "prev", nextLabel: "Next", nextClassName: "next", nextAriaLabel: "Next page", nextPageRel: "next", nextRel: "next", breakLabel: "...", breakAriaLabels: { forward: "Jump forward", backward: "Jump backward" }, disabledClassName: "disabled", disableInitialCallback: false, pageLabelBuilder: function(e3) {
          return e3;
        }, eventListener: "onClick", renderOnZeroPageCount: void 0, selectedPageRel: "canonical", hrefAllControls: false });
        const k = P;
      })(), n;
    })());
  }
});
export default require_react_paginate();
//# sourceMappingURL=react-paginate.js.map
