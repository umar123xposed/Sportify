import {
  require_react
} from "./chunk-ZSN3XFJS.js";
import {
  __commonJS
} from "./chunk-2GTGKKMZ.js";

// node_modules/react-spinner-loader/build/index.js
var require_build = __commonJS({
  "node_modules/react-spinner-loader/build/index.js"(exports, module) {
    module.exports = function(e) {
      var n = {};
      function t(r) {
        if (n[r])
          return n[r].exports;
        var o = n[r] = { i: r, l: false, exports: {} };
        return e[r].call(o.exports, o, o.exports, t), o.l = true, o.exports;
      }
      return t.m = e, t.c = n, t.d = function(e2, n2, r) {
        t.o(e2, n2) || Object.defineProperty(e2, n2, { enumerable: true, get: r });
      }, t.r = function(e2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, t.t = function(e2, n2) {
        if (1 & n2 && (e2 = t(e2)), 8 & n2)
          return e2;
        if (4 & n2 && "object" == typeof e2 && e2 && e2.__esModule)
          return e2;
        var r = /* @__PURE__ */ Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e2 }), 2 & n2 && "string" != typeof e2)
          for (var o in e2)
            t.d(r, o, (function(n3) {
              return e2[n3];
            }).bind(null, o));
        return r;
      }, t.n = function(e2) {
        var n2 = e2 && e2.__esModule ? function() {
          return e2.default;
        } : function() {
          return e2;
        };
        return t.d(n2, "a", n2), n2;
      }, t.o = function(e2, n2) {
        return Object.prototype.hasOwnProperty.call(e2, n2);
      }, t.p = "", t(t.s = 0);
    }([function(e, n, t) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: true });
      var r = Object.assign || function(e2) {
        for (var n2 = 1; n2 < arguments.length; n2++) {
          var t2 = arguments[n2];
          for (var r2 in t2)
            Object.prototype.hasOwnProperty.call(t2, r2) && (e2[r2] = t2[r2]);
        }
        return e2;
      };
      t(1);
      var o, a = t(5), i = (o = a) && o.__esModule ? o : { default: o };
      n.default = function(e2) {
        var n2 = e2.type, t2 = void 0 === n2 ? "BOX" : n2, o2 = e2.show, a2 = void 0 !== o2 && o2, c = e2.color, s = e2.message, l = e2.messageStyle, u = e2.spinnerSize, d = "loader-container " + t2, f = "loader " + t2 + " " + e2.stack, p = {};
        return c && (p = { borderColor: c.primary, borderTopColor: c.secondary }), u && (p = r({}, p, { width: u, height: u })), a2 && i.default.createElement("div", { className: d }, i.default.createElement("div", { className: f }, i.default.createElement("div", { className: "spinner", style: p }), s && i.default.createElement("div", { className: "message", style: l }, s)));
      };
    }, function(e, n, t) {
      var r = t(2), o = t(3);
      "string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
      var a = { insert: "head", singleton: false };
      r(o, a);
      e.exports = o.locals || {};
    }, function(e, n, t) {
      "use strict";
      var r, o = function() {
        return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r;
      }, a = function() {
        var e2 = {};
        return function(n2) {
          if (void 0 === e2[n2]) {
            var t2 = document.querySelector(n2);
            if (window.HTMLIFrameElement && t2 instanceof window.HTMLIFrameElement)
              try {
                t2 = t2.contentDocument.head;
              } catch (e3) {
                t2 = null;
              }
            e2[n2] = t2;
          }
          return e2[n2];
        };
      }(), i = [];
      function c(e2) {
        for (var n2 = -1, t2 = 0; t2 < i.length; t2++)
          if (i[t2].identifier === e2) {
            n2 = t2;
            break;
          }
        return n2;
      }
      function s(e2, n2) {
        for (var t2 = {}, r2 = [], o2 = 0; o2 < e2.length; o2++) {
          var a2 = e2[o2], s2 = n2.base ? a2[0] + n2.base : a2[0], l2 = t2[s2] || 0, u2 = "".concat(s2, " ").concat(l2);
          t2[s2] = l2 + 1;
          var d2 = c(u2), f2 = { css: a2[1], media: a2[2], sourceMap: a2[3] };
          -1 !== d2 ? (i[d2].references++, i[d2].updater(f2)) : i.push({ identifier: u2, updater: v(f2, n2), references: 1 }), r2.push(u2);
        }
        return r2;
      }
      function l(e2) {
        var n2 = document.createElement("style"), r2 = e2.attributes || {};
        if (void 0 === r2.nonce) {
          var o2 = t.nc;
          o2 && (r2.nonce = o2);
        }
        if (Object.keys(r2).forEach(function(e3) {
          n2.setAttribute(e3, r2[e3]);
        }), "function" == typeof e2.insert)
          e2.insert(n2);
        else {
          var i2 = a(e2.insert || "head");
          if (!i2)
            throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          i2.appendChild(n2);
        }
        return n2;
      }
      var u, d = (u = [], function(e2, n2) {
        return u[e2] = n2, u.filter(Boolean).join("\n");
      });
      function f(e2, n2, t2, r2) {
        var o2 = t2 ? "" : r2.media ? "@media ".concat(r2.media, " {").concat(r2.css, "}") : r2.css;
        if (e2.styleSheet)
          e2.styleSheet.cssText = d(n2, o2);
        else {
          var a2 = document.createTextNode(o2), i2 = e2.childNodes;
          i2[n2] && e2.removeChild(i2[n2]), i2.length ? e2.insertBefore(a2, i2[n2]) : e2.appendChild(a2);
        }
      }
      function p(e2, n2, t2) {
        var r2 = t2.css, o2 = t2.media, a2 = t2.sourceMap;
        if (o2 ? e2.setAttribute("media", o2) : e2.removeAttribute("media"), a2 && btoa && (r2 += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a2)))), " */")), e2.styleSheet)
          e2.styleSheet.cssText = r2;
        else {
          for (; e2.firstChild; )
            e2.removeChild(e2.firstChild);
          e2.appendChild(document.createTextNode(r2));
        }
      }
      var m = null, b = 0;
      function v(e2, n2) {
        var t2, r2, o2;
        if (n2.singleton) {
          var a2 = b++;
          t2 = m || (m = l(n2)), r2 = f.bind(null, t2, a2, false), o2 = f.bind(null, t2, a2, true);
        } else
          t2 = l(n2), r2 = p.bind(null, t2, n2), o2 = function() {
            !function(e3) {
              if (null === e3.parentNode)
                return false;
              e3.parentNode.removeChild(e3);
            }(t2);
          };
        return r2(e2), function(n3) {
          if (n3) {
            if (n3.css === e2.css && n3.media === e2.media && n3.sourceMap === e2.sourceMap)
              return;
            r2(e2 = n3);
          } else
            o2();
        };
      }
      e.exports = function(e2, n2) {
        (n2 = n2 || {}).singleton || "boolean" == typeof n2.singleton || (n2.singleton = o());
        var t2 = s(e2 = e2 || [], n2);
        return function(e3) {
          if (e3 = e3 || [], "[object Array]" === Object.prototype.toString.call(e3)) {
            for (var r2 = 0; r2 < t2.length; r2++) {
              var o2 = c(t2[r2]);
              i[o2].references--;
            }
            for (var a2 = s(e3, n2), l2 = 0; l2 < t2.length; l2++) {
              var u2 = c(t2[l2]);
              0 === i[u2].references && (i[u2].updater(), i.splice(u2, 1));
            }
            t2 = a2;
          }
        };
      };
    }, function(e, n, t) {
      (n = t(4)(false)).push([e.i, ".loader-container * {\n    box-sizing: border-box;\n}\n\n.loader-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.loader-container.body,\n.loader-container.box {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n}\n\n.loader-container.body {\n    background-color: rgba(0, 0, 0, 0.7);\n}\n\n.loader {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.loader.box,\n.loader.body {\n    background-color: rgba(0, 0, 0, 0.9);\n    padding: 15px;\n    border-radius: 5px;\n}\n\n.loader.vertical {\n    flex-direction: column;\n    padding: 30px 30px;\n}\n\n.loader .spinner {\n    width: 40px;\n    height: 40px;\n    border-width: 5px;\n    border-style: solid;\n    border-color: #ddd;\n    border-top-color: #3498db;\n    border-radius: 50%;\n    -webkit-animation: spin 2s linear infinite;\n    animation: spin 2s linear infinite;\n}\n\n\n.loader .message {\n    color: #101010;\n    margin: 10px;\n}\n\n.loader.box .message,\n.loader.body .message {\n    color: #FFF;\n}\n\n.loader.vertical .message {\n    margin-bottom: 0;\n}\n\n\n/* --------- SPINNER ANIMATION ------------ */\n@-webkit-keyframes spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n    }\n\n    100% {\n        -webkit-transform: rotate(360deg);\n    }\n}\n\n@keyframes spin {\n    0% {\n        transform: rotate(0deg);\n    }\n\n    100% {\n        transform: rotate(360deg);\n    }\n}", ""]), e.exports = n;
    }, function(e, n, t) {
      "use strict";
      e.exports = function(e2) {
        var n2 = [];
        return n2.toString = function() {
          return this.map(function(n3) {
            var t2 = function(e3, n4) {
              var t3 = e3[1] || "", r = e3[3];
              if (!r)
                return t3;
              if (n4 && "function" == typeof btoa) {
                var o = (i = r, c = btoa(unescape(encodeURIComponent(JSON.stringify(i)))), s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c), "/*# ".concat(s, " */")), a = r.sources.map(function(e4) {
                  return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e4, " */");
                });
                return [t3].concat(a).concat([o]).join("\n");
              }
              var i, c, s;
              return [t3].join("\n");
            }(n3, e2);
            return n3[2] ? "@media ".concat(n3[2], " {").concat(t2, "}") : t2;
          }).join("");
        }, n2.i = function(e3, t2, r) {
          "string" == typeof e3 && (e3 = [[null, e3, ""]]);
          var o = {};
          if (r)
            for (var a = 0; a < this.length; a++) {
              var i = this[a][0];
              null != i && (o[i] = true);
            }
          for (var c = 0; c < e3.length; c++) {
            var s = [].concat(e3[c]);
            r && o[s[0]] || (t2 && (s[2] ? s[2] = "".concat(t2, " and ").concat(s[2]) : s[2] = t2), n2.push(s));
          }
        }, n2;
      };
    }, function(e, n) {
      e.exports = require_react();
    }]);
  }
});
export default require_build();
//# sourceMappingURL=react-spinner-loader.js.map
