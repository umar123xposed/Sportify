import {
  require_react
} from "./chunk-ZSN3XFJS.js";
import {
  __toESM
} from "./chunk-2GTGKKMZ.js";

// node_modules/react-country-state-city/dist/esm/index.js
var import_react = __toESM(require_react());
var o = function() {
  return o = Object.assign || function(e2) {
    for (var n2, t2 = 1, a2 = arguments.length; t2 < a2; t2++)
      for (var o2 in n2 = arguments[t2])
        Object.prototype.hasOwnProperty.call(n2, o2) && (e2[o2] = n2[o2]);
    return e2;
  }, o.apply(this, arguments);
};
function i(e2, n2) {
  var t2 = {};
  for (var a2 in e2)
    Object.prototype.hasOwnProperty.call(e2, a2) && n2.indexOf(a2) < 0 && (t2[a2] = e2[a2]);
  if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
    var o2 = 0;
    for (a2 = Object.getOwnPropertySymbols(e2); o2 < a2.length; o2++)
      n2.indexOf(a2[o2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, a2[o2]) && (t2[a2[o2]] = e2[a2[o2]]);
  }
  return t2;
}
function r(e2, n2, t2, a2) {
  return new (t2 || (t2 = Promise))(function(o2, i2) {
    function r2(e3) {
      try {
        s2(a2.next(e3));
      } catch (e4) {
        i2(e4);
      }
    }
    function c2(e3) {
      try {
        s2(a2.throw(e3));
      } catch (e4) {
        i2(e4);
      }
    }
    function s2(e3) {
      var n3;
      e3.done ? o2(e3.value) : (n3 = e3.value, n3 instanceof t2 ? n3 : new t2(function(e4) {
        e4(n3);
      })).then(r2, c2);
    }
    s2((a2 = a2.apply(e2, n2 || [])).next());
  });
}
function c(e2, n2) {
  var t2, a2, o2, i2, r2 = { label: 0, sent: function() {
    if (1 & o2[0])
      throw o2[1];
    return o2[1];
  }, trys: [], ops: [] };
  return i2 = { next: c2(0), throw: c2(1), return: c2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
    return this;
  }), i2;
  function c2(c3) {
    return function(s2) {
      return function(c4) {
        if (t2)
          throw new TypeError("Generator is already executing.");
        for (; i2 && (i2 = 0, c4[0] && (r2 = 0)), r2; )
          try {
            if (t2 = 1, a2 && (o2 = 2 & c4[0] ? a2.return : c4[0] ? a2.throw || ((o2 = a2.return) && o2.call(a2), 0) : a2.next) && !(o2 = o2.call(a2, c4[1])).done)
              return o2;
            switch (a2 = 0, o2 && (c4 = [2 & c4[0], o2.value]), c4[0]) {
              case 0:
              case 1:
                o2 = c4;
                break;
              case 4:
                return r2.label++, { value: c4[1], done: false };
              case 5:
                r2.label++, a2 = c4[1], c4 = [0];
                continue;
              case 7:
                c4 = r2.ops.pop(), r2.trys.pop();
                continue;
              default:
                if (!(o2 = r2.trys, (o2 = o2.length > 0 && o2[o2.length - 1]) || 6 !== c4[0] && 2 !== c4[0])) {
                  r2 = 0;
                  continue;
                }
                if (3 === c4[0] && (!o2 || c4[1] > o2[0] && c4[1] < o2[3])) {
                  r2.label = c4[1];
                  break;
                }
                if (6 === c4[0] && r2.label < o2[1]) {
                  r2.label = o2[1], o2 = c4;
                  break;
                }
                if (o2 && r2.label < o2[2]) {
                  r2.label = o2[2], r2.ops.push(c4);
                  break;
                }
                o2[2] && r2.ops.pop(), r2.trys.pop();
                continue;
            }
            c4 = n2.call(e2, r2);
          } catch (e3) {
            c4 = [6, e3], a2 = 0;
          } finally {
            t2 = o2 = 0;
          }
        if (5 & c4[0])
          throw c4[1];
        return { value: c4[0] ? c4[1] : void 0, done: true };
      }([c3, s2]);
    };
  }
}
var s = function(e2) {
  return r(void 0, void 0, void 0, function() {
    var n2;
    return c(this, function(t2) {
      switch (t2.label) {
        case 0:
          return n2 = "https://venkatmcajj.github.io/react-country-state-city/data/regionsminified.json", e2 && (n2 = e2 + "/regionsminified.json"), [4, fetch(n2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return [2, t2.sent()];
      }
    });
  });
};
var u = function(e2, n2) {
  return r(void 0, void 0, void 0, function() {
    var t2, a2, o2;
    return c(this, function(i2) {
      switch (i2.label) {
        case 0:
          return t2 = "https://venkatmcajj.github.io/react-country-state-city/data/countriesminified.json", n2 && (t2 = n2 + "/countriesminified.json"), [4, fetch(t2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return a2 = i2.sent(), o2 = a2, e2 && (o2 = o2.filter(function(n3) {
            return n3.region === e2;
          })), [2, o2.map(function(e3) {
            return { id: e3.id, name: e3.name, phone_code: e3.phone_code, region: e3.region };
          })];
      }
    });
  });
};
var l = function(e2) {
  return r(void 0, void 0, void 0, function() {
    var n2, t2;
    return c(this, function(a2) {
      switch (a2.label) {
        case 0:
          return n2 = "https://venkatmcajj.github.io/react-country-state-city/data/countriesminified.json", e2 && (n2 = e2 + "/countriesminified.json"), [4, fetch(n2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return t2 = a2.sent(), [2, t2.map(function(e3) {
            return { id: e3.id, name: e3.name, phone_code: e3.phone_code, region: e3.region };
          })];
      }
    });
  });
};
var d = function(e2, n2) {
  return r(void 0, void 0, void 0, function() {
    var t2, a2, o2;
    return c(this, function(i2) {
      switch (i2.label) {
        case 0:
          return t2 = "https://venkatmcajj.github.io/react-country-state-city/data/countriesminified.json", n2 && (t2 = n2 + "/countriesminified.json"), [4, fetch(t2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return a2 = i2.sent(), o2 = a2, e2 && (o2 = o2.filter(function(n3) {
            return n3.region === e2;
          })), [2, o2];
      }
    });
  });
};
var f = function(e2) {
  return r(void 0, void 0, void 0, function() {
    var n2;
    return c(this, function(t2) {
      switch (t2.label) {
        case 0:
          return n2 = "https://venkatmcajj.github.io/react-country-state-city/data/countriesminified.json", e2 && (n2 = e2 + "/countriesminified.json"), [4, fetch(n2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return [2, t2.sent()];
      }
    });
  });
};
var m = function(e2) {
  return r(void 0, void 0, void 0, function() {
    var n2;
    return c(this, function(t2) {
      switch (t2.label) {
        case 0:
          return n2 = "https://venkatmcajj.github.io/react-country-state-city/data/languagesminified.json", e2 && (n2 = e2 + "/languagesminified.json"), [4, fetch(n2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return [2, t2.sent()];
      }
    });
  });
};
var h = function(e2, n2) {
  return r(void 0, void 0, void 0, function() {
    var t2, a2, o2;
    return c(this, function(i2) {
      switch (i2.label) {
        case 0:
          return t2 = "https://venkatmcajj.github.io/react-country-state-city/data/statesminified.json", n2 && (t2 = n2 + "/statesminified.json"), [4, fetch(t2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return a2 = i2.sent(), o2 = a2.find(function(n3) {
            return n3.id === e2;
          }), [2, o2 && o2.states ? o2.states : []];
      }
    });
  });
};
var p = function(e2, n2, t2) {
  return r(void 0, void 0, void 0, function() {
    var a2, o2, i2, r2, s2;
    return c(this, function(c2) {
      switch (c2.label) {
        case 0:
          return a2 = "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json", t2 && (a2 = t2 + "/citiesminified.json"), [4, fetch(a2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          return o2 = c2.sent(), (i2 = o2.find(function(n3) {
            return n3.id === e2;
          })) ? (r2 = i2 && i2.states ? i2.states : [], [2, (s2 = r2.find(function(e3) {
            return e3.id === n2;
          })) && s2.cities ? s2.cities : []]) : [2, []];
      }
    });
  });
};
var v = function(e2) {
  return r(void 0, void 0, void 0, function() {
    var n2, t2, a2, o2, i2, r2, s2, u2, l2, d2, f2, m2;
    return c(this, function(c2) {
      switch (c2.label) {
        case 0:
          return n2 = "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json", e2 && (n2 = e2 + "/citiesminified.json"), [4, fetch(n2).then(function(e3) {
            return e3.json();
          })];
        case 1:
          for (t2 = c2.sent(), a2 = [], o2 = 0, i2 = t2; o2 < i2.length; o2++)
            for (r2 = i2[o2], s2 = 0, u2 = r2.states; s2 < u2.length; s2++)
              for (l2 = u2[s2], d2 = 0, f2 = l2.cities; d2 < f2.length; d2++)
                m2 = f2[d2], a2.push(m2);
          return [2, a2];
      }
    });
  });
};
var g = function() {
  return import_react.default.createElement("svg", { height: "20", width: "20", viewBox: "0 0 20 20" }, import_react.default.createElement("path", { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" }));
};
var C = function(r2) {
  var c2 = r2.placeHolder, s2 = r2.options, u2 = r2.onChange, l2 = r2.inputClassName, d2 = r2.onTextChange, f2 = r2.defaultValue, m2 = r2.showFlag, h2 = void 0 === m2 || m2, p2 = i(r2, ["placeHolder", "options", "onChange", "inputClassName", "onTextChange", "defaultValue", "showFlag"]), v2 = (0, import_react.useState)(false), C2 = v2[0], w2 = v2[1], N2 = (0, import_react.useState)(), y2 = N2[0], j2 = N2[1], E2 = (0, import_react.useState)(""), b2 = E2[0], x2 = E2[1], k2 = (0, import_react.useRef)(null), T2 = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(function() {
    if (f2)
      if ("string" == typeof f2)
        (e2 = s2.find(function(e3) {
          return e3.name === f2;
        })) && j2(e2);
      else if ("number" == typeof f2) {
        var e2;
        (e2 = s2.find(function(e3) {
          return e3.id === f2;
        })) && j2(e2);
      } else
        j2(f2);
  }, [f2, s2]), (0, import_react.useEffect)(function() {
    x2(""), C2 && k2.current && k2.current.focus();
  }, [C2]), (0, import_react.useEffect)(function() {
    var e2 = function(e3) {
      T2.current && !T2.current.contains(e3.target) && w2(false);
    };
    return window.addEventListener("click", e2), function() {
      window.removeEventListener("click", e2);
    };
  });
  var H2 = function(e2) {
    return !!y2 && y2.id === e2.id;
  };
  return import_react.default.createElement("div", { className: "stdropdown-container" }, import_react.default.createElement("div", { ref: T2, onClick: function() {
    w2(true);
  }, className: "stdropdown-input stsearch-box" }, import_react.default.createElement("input", o({}, p2, { className: l2, onChange: function(e2) {
    x2(e2.target.value), j2(void 0), d2 && d2(e2);
  }, value: y2 ? "".concat(h2 && "emoji" in y2 ? y2.emoji + " " : "").concat(y2.name) : b2 || "", placeholder: c2, ref: k2 })), import_react.default.createElement("div", { className: "stdropdown-tools" }, import_react.default.createElement("div", { className: "stdropdown-tool" }, import_react.default.createElement(g, null)))), C2 && import_react.default.createElement("div", { className: "stdropdown-menu" }, (b2 ? s2.filter(function(e2) {
    return e2.name.toLowerCase().indexOf(b2.toLowerCase()) >= 0;
  }) : s2).map(function(n2) {
    return import_react.default.createElement("div", { onClick: function() {
      return function(e2) {
        j2(e2), u2(e2);
      }(n2);
    }, key: n2.id, className: "".concat("stdropdown-item", " ").concat(H2(n2) && "selected") }, h2 && import_react.default.createElement("span", { className: "stdropdown-flag" }, "emoji" in n2 ? n2.emoji : "", " "), n2.name);
  })));
};
var w = function(t2) {
  var r2 = t2.containerClassName, c2 = t2.inputClassName, s2 = t2.onTextChange, u2 = t2.defaultValue, l2 = t2.onChange, m2 = t2.placeHolder, h2 = t2.showFlag, p2 = t2.region, v2 = t2.src, g2 = i(t2, ["containerClassName", "inputClassName", "onTextChange", "defaultValue", "onChange", "placeHolder", "showFlag", "region", "src"]), w2 = (0, import_react.useState)([]), N2 = w2[0], y2 = w2[1];
  return (0, import_react.useEffect)(function() {
    p2 ? d(p2, v2).then(function(e2) {
      y2(e2);
    }) : f(v2).then(function(e2) {
      y2(e2);
    });
  }, [p2, v2]), import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("div", { className: r2, style: { position: "relative" } }, import_react.default.createElement(C, o({}, g2, { placeHolder: m2, options: N2, onChange: function(e2) {
    l2 && l2(e2);
  }, showFlag: h2, onTextChange: s2, defaultValue: u2, inputClassName: c2 }))));
};
var N = function(t2) {
  var r2 = t2.containerClassName, c2 = t2.inputClassName, s2 = t2.onTextChange, u2 = t2.defaultValue, l2 = t2.onChange, d2 = t2.countryid, f2 = t2.placeHolder, m2 = t2.src, p2 = i(t2, ["containerClassName", "inputClassName", "onTextChange", "defaultValue", "onChange", "countryid", "placeHolder", "src"]), v2 = (0, import_react.useState)([]), g2 = v2[0], w2 = v2[1];
  return (0, import_react.useEffect)(function() {
    d2 && h(d2, m2).then(function(e2) {
      w2(e2);
    });
  }, [d2, m2]), import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("div", { className: r2, style: { position: "relative" } }, import_react.default.createElement(C, o({}, p2, { placeHolder: f2, options: g2, onChange: function(e2) {
    l2 && l2(e2);
  }, onTextChange: s2, defaultValue: u2, inputClassName: c2 }))));
};
var y = function(t2) {
  var r2 = t2.containerClassName, c2 = t2.inputClassName, s2 = t2.onTextChange, u2 = t2.defaultValue, l2 = t2.onChange, d2 = t2.countryid, f2 = t2.stateid, m2 = t2.placeHolder, h2 = t2.src, v2 = i(t2, ["containerClassName", "inputClassName", "onTextChange", "defaultValue", "onChange", "countryid", "stateid", "placeHolder", "src"]), g2 = (0, import_react.useState)([]), w2 = g2[0], N2 = g2[1];
  return (0, import_react.useEffect)(function() {
    d2 && p(d2, f2, h2).then(function(e2) {
      N2(e2);
    });
  }, [d2, f2, h2]), import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("div", { className: r2, style: { position: "relative" } }, import_react.default.createElement(C, o({}, v2, { placeHolder: m2, options: w2, onChange: function(e2) {
    l2 && l2(e2);
  }, onTextChange: s2, defaultValue: u2, inputClassName: c2 }))));
};
var j = function() {
  return import_react.default.createElement("svg", { height: "20", width: "20", viewBox: "0 0 20 20" }, import_react.default.createElement("path", { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" }));
};
var E = function(r2) {
  var c2 = r2.placeHolder, s2 = r2.options, u2 = r2.onChange, l2 = r2.inputClassName, d2 = r2.onTextChange, f2 = r2.defaultValue, m2 = r2.displayNative, h2 = i(r2, ["placeHolder", "options", "onChange", "inputClassName", "onTextChange", "defaultValue", "displayNative"]), p2 = (0, import_react.useState)(false), v2 = p2[0], g2 = p2[1], C2 = (0, import_react.useState)(), w2 = C2[0], N2 = C2[1], y2 = (0, import_react.useState)(""), E2 = y2[0], b2 = y2[1], x2 = (0, import_react.useRef)(null), k2 = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(function() {
    if (f2)
      if ("string" == typeof f2) {
        var e2 = s2.find(function(e3) {
          return e3.name === f2;
        });
        e2 && N2(e2);
      } else
        N2(f2);
  }, [f2, s2]), (0, import_react.useEffect)(function() {
    b2(""), v2 && x2.current && x2.current.focus();
  }, [v2]), (0, import_react.useEffect)(function() {
    var e2 = function(e3) {
      k2.current && !k2.current.contains(e3.target) && g2(false);
    };
    return window.addEventListener("click", e2), function() {
      window.removeEventListener("click", e2);
    };
  });
  var T2 = function(e2) {
    return !!w2 && w2.code === e2.code;
  };
  return import_react.default.createElement("div", { className: "stdropdown-container" }, import_react.default.createElement("div", { ref: k2, onClick: function() {
    g2(true);
  }, className: "stdropdown-input stsearch-box" }, import_react.default.createElement("input", o({}, h2, { className: l2, onChange: function(e2) {
    b2(e2.target.value), N2(void 0), d2 && d2(e2);
  }, value: w2 ? "".concat(m2 ? w2.native : w2.name) : E2 || "", placeholder: c2, ref: x2 })), import_react.default.createElement("div", { className: "stdropdown-tools" }, import_react.default.createElement("div", { className: "stdropdown-tool" }, import_react.default.createElement(j, null)))), v2 && import_react.default.createElement("div", { className: "stdropdown-menu" }, (E2 ? s2.filter(function(e2) {
    return e2.name.toLowerCase().indexOf(E2.toLowerCase()) >= 0 || e2.native.toLowerCase().indexOf(E2.toLowerCase()) >= 0;
  }) : s2).map(function(n2) {
    return import_react.default.createElement("div", { onClick: function() {
      return function(e2) {
        N2(e2), u2(e2);
      }(n2);
    }, key: n2.code, className: "".concat("stdropdown-item", " ").concat(T2(n2) && "selected") }, m2 ? n2.native : n2.name);
  })));
};
var b = function(t2) {
  var r2 = t2.containerClassName, c2 = t2.inputClassName, s2 = t2.onTextChange, u2 = t2.defaultValue, l2 = t2.onChange, d2 = t2.placeHolder, f2 = t2.displayNative, h2 = t2.src, p2 = i(t2, ["containerClassName", "inputClassName", "onTextChange", "defaultValue", "onChange", "placeHolder", "displayNative", "src"]), v2 = (0, import_react.useState)([]), g2 = v2[0], C2 = v2[1];
  return (0, import_react.useEffect)(function() {
    m(h2).then(function(e2) {
      C2(e2);
    });
  }, [h2]), import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("div", { className: r2, style: { position: "relative" } }, import_react.default.createElement(E, o({}, p2, { placeHolder: d2, options: g2, onChange: function(e2) {
    l2 && l2(e2);
  }, displayNative: f2, onTextChange: s2, defaultValue: u2, inputClassName: c2 }))));
};
var x = function(t2) {
  var r2 = t2.containerClassName, c2 = t2.inputClassName, u2 = t2.onTextChange, l2 = t2.defaultValue, d2 = t2.onChange, f2 = t2.placeHolder, m2 = t2.src, h2 = i(t2, ["containerClassName", "inputClassName", "onTextChange", "defaultValue", "onChange", "placeHolder", "src"]), p2 = (0, import_react.useState)([]), v2 = p2[0], g2 = p2[1];
  return (0, import_react.useEffect)(function() {
    s(m2).then(function(e2) {
      g2(e2);
    });
  }, [m2]), import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("div", { className: r2, style: { position: "relative" } }, import_react.default.createElement(C, o({}, h2, { placeHolder: f2, options: v2, onChange: function(e2) {
    d2 && d2(e2);
  }, onTextChange: u2, defaultValue: l2, inputClassName: c2 }))));
};
var k = function() {
  return import_react.default.createElement("svg", { height: "20", width: "20", viewBox: "0 0 20 20" }, import_react.default.createElement("path", { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" }));
};
var T = function(r2) {
  var c2 = r2.placeHolder, s2 = r2.options, u2 = r2.onChange, l2 = r2.inputClassName, d2 = r2.onTextChange, f2 = r2.defaultValue, m2 = r2.showFlag, h2 = void 0 === m2 || m2, p2 = i(r2, ["placeHolder", "options", "onChange", "inputClassName", "onTextChange", "defaultValue", "showFlag"]), v2 = (0, import_react.useState)(false), g2 = v2[0], C2 = v2[1], w2 = (0, import_react.useState)(), N2 = w2[0], y2 = w2[1], j2 = (0, import_react.useState)(""), E2 = j2[0], b2 = j2[1], x2 = (0, import_react.useRef)(null), T2 = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(function() {
    if (f2)
      if ("string" == typeof f2) {
        var e2 = s2.find(function(e3) {
          return e3.name === f2 || e3.phone_code === f2;
        });
        e2 && y2(e2);
      } else
        y2(f2);
  }, [f2, s2]), (0, import_react.useEffect)(function() {
    b2(""), g2 && x2.current && x2.current.focus();
  }, [g2]), (0, import_react.useEffect)(function() {
    var e2 = function(e3) {
      T2.current && !T2.current.contains(e3.target) && C2(false);
    };
    return window.addEventListener("click", e2), function() {
      window.removeEventListener("click", e2);
    };
  });
  var H2 = function(e2) {
    return !!N2 && N2.id === e2.id;
  };
  return import_react.default.createElement("div", { className: "stdropdown-container" }, import_react.default.createElement("div", { ref: T2, onClick: function() {
    C2(true);
  }, className: "stdropdown-input stsearch-box" }, import_react.default.createElement("input", o({}, p2, { className: l2, onChange: function(e2) {
    b2(e2.target.value), y2(void 0), d2 && d2(e2);
  }, value: N2 ? "".concat(h2 && "emoji" in N2 ? N2.emoji + " " : "", "+").concat(N2.phone_code) : E2 || "", placeholder: c2, ref: x2 })), import_react.default.createElement("div", { className: "stdropdown-tools" }, import_react.default.createElement("div", { className: "stdropdown-tool" }, import_react.default.createElement(k, null)))), g2 && import_react.default.createElement("div", { className: "stdropdown-menu" }, (E2 ? s2.filter(function(e2) {
    return e2.name.toLowerCase().indexOf(E2.toLowerCase()) >= 0 || e2.phone_code.indexOf(E2) >= 0 || ("+" + e2.phone_code).indexOf(E2) >= 0;
  }) : s2).map(function(n2) {
    return import_react.default.createElement("div", { onClick: function() {
      return function(e2) {
        y2(e2), u2(e2);
      }(n2);
    }, key: n2.id, className: "".concat("stdropdown-item", " ").concat(H2(n2) && "selected") }, h2 && import_react.default.createElement("span", { className: "stdropdown-flag" }, "emoji" in n2 ? n2.emoji : "", " "), "+", n2.phone_code);
  })));
};
var H = function(t2) {
  var r2 = t2.containerClassName, c2 = t2.inputClassName, s2 = t2.onTextChange, u2 = t2.defaultValue, l2 = t2.onChange, m2 = t2.placeHolder, h2 = t2.showFlag, p2 = t2.region, v2 = t2.src, g2 = i(t2, ["containerClassName", "inputClassName", "onTextChange", "defaultValue", "onChange", "placeHolder", "showFlag", "region", "src"]), C2 = (0, import_react.useState)([]), w2 = C2[0], N2 = C2[1];
  return (0, import_react.useEffect)(function() {
    p2 ? d(p2, v2).then(function(e2) {
      N2(e2);
    }) : f(v2).then(function(e2) {
      N2(e2);
    });
  }, [p2, v2]), import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("div", { className: r2, style: { position: "relative" } }, import_react.default.createElement(T, o({}, g2, { placeHolder: m2, options: w2, onChange: function(e2) {
    l2 && l2(e2);
  }, showFlag: h2, onTextChange: s2, defaultValue: u2, inputClassName: c2 }))));
};
export {
  y as CitySelect,
  w as CountrySelect,
  v as GetAllCities,
  p as GetCity,
  f as GetCountries,
  d as GetCountriesByRegion,
  m as GetLanguages,
  l as GetPhonecodes,
  u as GetPhonecodesByRegion,
  s as GetRegions,
  h as GetState,
  b as LanguageSelect,
  H as PhonecodeSelect,
  x as RegionSelect,
  N as StateSelect
};
//# sourceMappingURL=react-country-state-city.js.map
