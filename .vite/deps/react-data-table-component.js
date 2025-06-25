import {
  dt,
  lt,
  ot
} from "./chunk-MKKRDBPP.js";
import {
  require_react
} from "./chunk-ZSN3XFJS.js";
import "./chunk-2NLV3Q7R.js";
import {
  __toESM
} from "./chunk-2GTGKKMZ.js";

// node_modules/react-data-table-component/dist/index.es.js
var e = __toESM(require_react());
var import_react = __toESM(require_react());
var l;
function r(e2, t2) {
  return e2[t2];
}
function i(e2 = [], t2, n = 0) {
  return [...e2.slice(0, n), t2, ...e2.slice(n)];
}
function s(e2 = [], t2, n = "id") {
  const o = e2.slice(), a = r(t2, n);
  return a ? o.splice(o.findIndex((e3) => r(e3, n) === a), 1) : o.splice(o.findIndex((e3) => e3 === t2), 1), o;
}
function d(e2) {
  return e2.map((e3, t2) => {
    const n = Object.assign(Object.assign({}, e3), { sortable: e3.sortable || !!e3.sortFunction || void 0 });
    return e3.id || (n.id = t2 + 1), n;
  });
}
function c(e2, t2) {
  return Math.ceil(e2 / t2);
}
function g(e2, t2) {
  return Math.min(e2, t2);
}
!function(e2) {
  e2.ASC = "asc", e2.DESC = "desc";
}(l || (l = {}));
var u = () => null;
function p(e2, t2 = [], n = []) {
  let o = {}, a = [...n];
  return t2.length && t2.forEach((t3) => {
    if (!t3.when || "function" != typeof t3.when)
      throw new Error('"when" must be defined in the conditional style object and must be function');
    t3.when(e2) && (o = t3.style || {}, t3.classNames && (a = [...a, ...t3.classNames]), "function" == typeof t3.style && (o = t3.style(e2) || {}));
  }), { conditionalStyle: o, classNames: a.join(" ") };
}
function b(e2, t2 = [], n = "id") {
  const o = r(e2, n);
  return o ? t2.some((e3) => r(e3, n) === o) : t2.some((t3) => t3 === e2);
}
function m(e2, t2) {
  return t2 ? e2.findIndex((e3) => h(e3.id, t2)) : -1;
}
function h(e2, t2) {
  return e2 == t2;
}
function w(e2, t2) {
  const n = !e2.toggleOnSelectedRowsChange;
  switch (t2.type) {
    case "SELECT_ALL_ROWS": {
      const { keyField: n2, rows: o, rowCount: a, mergeSelections: l2 } = t2, r2 = !e2.allSelected, i2 = !e2.toggleOnSelectedRowsChange;
      if (l2) {
        const t3 = r2 ? [...e2.selectedRows, ...o.filter((t4) => !b(t4, e2.selectedRows, n2))] : e2.selectedRows.filter((e3) => !b(e3, o, n2));
        return Object.assign(Object.assign({}, e2), { allSelected: r2, selectedCount: t3.length, selectedRows: t3, toggleOnSelectedRowsChange: i2 });
      }
      return Object.assign(Object.assign({}, e2), { allSelected: r2, selectedCount: r2 ? a : 0, selectedRows: r2 ? o : [], toggleOnSelectedRowsChange: i2 });
    }
    case "SELECT_SINGLE_ROW": {
      const { keyField: o, row: a, isSelected: l2, rowCount: r2, singleSelect: d2 } = t2;
      return d2 ? l2 ? Object.assign(Object.assign({}, e2), { selectedCount: 0, allSelected: false, selectedRows: [], toggleOnSelectedRowsChange: n }) : Object.assign(Object.assign({}, e2), { selectedCount: 1, allSelected: false, selectedRows: [a], toggleOnSelectedRowsChange: n }) : l2 ? Object.assign(Object.assign({}, e2), { selectedCount: e2.selectedRows.length > 0 ? e2.selectedRows.length - 1 : 0, allSelected: false, selectedRows: s(e2.selectedRows, a, o), toggleOnSelectedRowsChange: n }) : Object.assign(Object.assign({}, e2), { selectedCount: e2.selectedRows.length + 1, allSelected: e2.selectedRows.length + 1 === r2, selectedRows: i(e2.selectedRows, a), toggleOnSelectedRowsChange: n });
    }
    case "SELECT_MULTIPLE_ROWS": {
      const { keyField: o, selectedRows: a, totalRows: l2, mergeSelections: r2 } = t2;
      if (r2) {
        const t3 = [...e2.selectedRows, ...a.filter((t4) => !b(t4, e2.selectedRows, o))];
        return Object.assign(Object.assign({}, e2), { selectedCount: t3.length, allSelected: false, selectedRows: t3, toggleOnSelectedRowsChange: n });
      }
      return Object.assign(Object.assign({}, e2), { selectedCount: a.length, allSelected: a.length === l2, selectedRows: a, toggleOnSelectedRowsChange: n });
    }
    case "CLEAR_SELECTED_ROWS": {
      const { selectedRowsFlag: n2 } = t2;
      return Object.assign(Object.assign({}, e2), { allSelected: false, selectedCount: 0, selectedRows: [], selectedRowsFlag: n2 });
    }
    case "SORT_CHANGE": {
      const { sortDirection: o, selectedColumn: a, clearSelectedOnSort: l2 } = t2;
      return Object.assign(Object.assign(Object.assign({}, e2), { selectedColumn: a, sortDirection: o, currentPage: 1 }), l2 && { allSelected: false, selectedCount: 0, selectedRows: [], toggleOnSelectedRowsChange: n });
    }
    case "CHANGE_PAGE": {
      const { page: o, paginationServer: a, visibleOnly: l2, persistSelectedOnPageChange: r2 } = t2, i2 = a && r2, s2 = a && !r2 || l2;
      return Object.assign(Object.assign(Object.assign(Object.assign({}, e2), { currentPage: o }), i2 && { allSelected: false }), s2 && { allSelected: false, selectedCount: 0, selectedRows: [], toggleOnSelectedRowsChange: n });
    }
    case "CHANGE_ROWS_PER_PAGE": {
      const { rowsPerPage: n2, page: o } = t2;
      return Object.assign(Object.assign({}, e2), { currentPage: o, rowsPerPage: n2 });
    }
  }
}
var f = lt`
	pointer-events: none;
	opacity: 0.4;
`;
var x = dt.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({ disabled: e2 }) => e2 && f};
	${({ theme: e2 }) => e2.table.style};
`;
var C = lt`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`;
var y = dt.div`
	display: flex;
	width: 100%;
	${({ $fixedHeader: e2 }) => e2 && C};
	${({ theme: e2 }) => e2.head.style};
`;
var R = dt.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({ theme: e2 }) => e2.headRow.style};
	${({ $dense: e2, theme: t2 }) => e2 && t2.headRow.denseStyle};
`;
var v = (e2, ...t2) => lt`
		@media screen and (max-width: ${599}px) {
			${lt(e2, ...t2)}
		}
	`;
var S = (e2, ...t2) => lt`
		@media screen and (max-width: ${959}px) {
			${lt(e2, ...t2)}
		}
	`;
var E = (e2, ...t2) => lt`
		@media screen and (max-width: ${1280}px) {
			${lt(e2, ...t2)}
		}
	`;
var O = (e2) => (t2, ...n) => lt`
			@media screen and (max-width: ${e2}px) {
				${lt(t2, ...n)}
			}
		`;
var $ = dt.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({ theme: e2, $headCell: t2 }) => e2[t2 ? "headCells" : "cells"].style};
	${({ $noPadding: e2 }) => e2 && "padding: 0"};
`;
var k = dt($)`
	flex-grow: ${({ button: e2, grow: t2 }) => 0 === t2 || e2 ? 0 : t2 || 1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({ maxWidth: e2 }) => e2 || "100%"};
	min-width: ${({ minWidth: e2 }) => e2 || "100px"};
	${({ width: e2 }) => e2 && lt`
			min-width: ${e2};
			max-width: ${e2};
		`};
	${({ right: e2 }) => e2 && "justify-content: flex-end"};
	${({ button: e2, center: t2 }) => (t2 || e2) && "justify-content: center"};
	${({ compact: e2, button: t2 }) => (e2 || t2) && "padding: 0"};

	/* handle hiding cells */
	${({ hide: e2 }) => e2 && "sm" === e2 && v`
    display: none;
  `};
	${({ hide: e2 }) => e2 && "md" === e2 && S`
    display: none;
  `};
	${({ hide: e2 }) => e2 && "lg" === e2 && E`
    display: none;
  `};
	${({ hide: e2 }) => e2 && Number.isInteger(e2) && O(e2)`
    display: none;
  `};
`;
var P = lt`
	div:first-child {
		white-space: ${({ $wrapCell: e2 }) => e2 ? "normal" : "nowrap"};
		overflow: ${({ $allowOverflow: e2 }) => e2 ? "visible" : "hidden"};
		text-overflow: ellipsis;
	}
`;
var D = dt(k).attrs((e2) => ({ style: e2.style }))`
	${({ $renderAsCell: e2 }) => !e2 && P};
	${({ theme: e2, $isDragging: t2 }) => t2 && e2.cells.draggingStyle};
	${({ $cellStyle: e2 }) => e2};
`;
var H = e.memo(function({ id: t2, column: n, row: o, rowIndex: a, dataTag: l2, isDragging: r2, onDragStart: i2, onDragOver: s2, onDragEnd: d2, onDragEnter: c2, onDragLeave: g2 }) {
  const { conditionalStyle: u2, classNames: b2 } = p(o, n.conditionalCellStyles, ["rdt_TableCell"]);
  return e.createElement(D, { id: t2, "data-column-id": n.id, role: "cell", className: b2, "data-tag": l2, $cellStyle: n.style, $renderAsCell: !!n.cell, $allowOverflow: n.allowOverflow, button: n.button, center: n.center, compact: n.compact, grow: n.grow, hide: n.hide, maxWidth: n.maxWidth, minWidth: n.minWidth, right: n.right, width: n.width, $wrapCell: n.wrap, style: u2, $isDragging: r2, onDragStart: i2, onDragOver: s2, onDragEnd: d2, onDragEnter: c2, onDragLeave: g2 }, !n.cell && e.createElement("div", { "data-tag": l2 }, function(e2, t3, n2, o2) {
    return t3 ? n2 && "function" == typeof n2 ? n2(e2, o2) : t3(e2, o2) : null;
  }(o, n.selector, n.format, a)), n.cell && n.cell(o, a, n, t2));
});
var F = "input";
var j = e.memo(function({ name: t2, component: n = F, componentOptions: o = { style: {} }, indeterminate: a = false, checked: l2 = false, disabled: r2 = false, onClick: i2 = u }) {
  const s2 = n, d2 = s2 !== F ? o.style : ((e2) => Object.assign(Object.assign({ fontSize: "18px" }, !e2 && { cursor: "pointer" }), { padding: 0, marginTop: "1px", verticalAlign: "middle", position: "relative" }))(r2), c2 = e.useMemo(() => function(e2, ...t3) {
    let n2;
    return Object.keys(e2).map((t4) => e2[t4]).forEach((o2, a2) => {
      const l3 = e2;
      "function" == typeof o2 && (n2 = Object.assign(Object.assign({}, l3), { [Object.keys(e2)[a2]]: o2(...t3) }));
    }), n2 || e2;
  }(o, a), [o, a]);
  return e.createElement(s2, Object.assign({ type: "checkbox", ref: (e2) => {
    e2 && (e2.indeterminate = a);
  }, style: d2, onClick: r2 ? u : i2, name: t2, "aria-label": t2, checked: l2, disabled: r2 }, c2, { onChange: u }));
});
var I = dt($)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;
function T({ name: t2, keyField: n, row: o, rowCount: a, selected: l2, selectableRowsComponent: r2, selectableRowsComponentProps: i2, selectableRowsSingle: s2, selectableRowDisabled: d2, onSelectedRow: c2 }) {
  const g2 = !(!d2 || !d2(o));
  return e.createElement(I, { onClick: (e2) => e2.stopPropagation(), className: "rdt_TableCell", $noPadding: true }, e.createElement(j, { name: t2, component: r2, componentOptions: i2, checked: l2, "aria-checked": l2, onClick: () => {
    c2({ type: "SELECT_SINGLE_ROW", row: o, isSelected: l2, keyField: n, rowCount: a, singleSelect: s2 });
  }, disabled: g2 }));
}
var L = dt.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({ theme: e2 }) => e2.expanderButton.style};
`;
function M({ disabled: t2 = false, expanded: n = false, expandableIcon: o, id: a, row: l2, onToggled: r2 }) {
  const i2 = n ? o.expanded : o.collapsed;
  return e.createElement(L, { "aria-disabled": t2, onClick: () => r2 && r2(l2), "data-testid": `expander-button-${a}`, disabled: t2, "aria-label": n ? "Collapse Row" : "Expand Row", role: "button", type: "button" }, i2);
}
var A = dt($)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({ theme: e2 }) => e2.expanderCell.style};
`;
function _({ row: t2, expanded: n = false, expandableIcon: o, id: a, onToggled: l2, disabled: r2 = false }) {
  return e.createElement(A, { onClick: (e2) => e2.stopPropagation(), $noPadding: true }, e.createElement(M, { id: a, row: t2, expanded: n, expandableIcon: o, disabled: r2, onToggled: l2 }));
}
var N = dt.div`
	width: 100%;
	box-sizing: border-box;
	${({ theme: e2 }) => e2.expanderRow.style};
	${({ $extendedRowStyle: e2 }) => e2};
`;
var z = e.memo(function({ data: t2, ExpanderComponent: n, expanderComponentProps: o, extendedRowStyle: a, extendedClassNames: l2 }) {
  const r2 = ["rdt_ExpanderRow", ...l2.split(" ").filter((e2) => "rdt_TableRow" !== e2)].join(" ");
  return e.createElement(N, { className: r2, $extendedRowStyle: a }, e.createElement(n, Object.assign({ data: t2 }, o)));
});
var W = "allowRowEvents";
var B;
var G;
var V;
!function(e2) {
  e2.LTR = "ltr", e2.RTL = "rtl", e2.AUTO = "auto";
}(B || (B = {})), function(e2) {
  e2.LEFT = "left", e2.RIGHT = "right", e2.CENTER = "center";
}(G || (G = {})), function(e2) {
  e2.SM = "sm", e2.MD = "md", e2.LG = "lg";
}(V || (V = {}));
var U = lt`
	&:hover {
		${({ $highlightOnHover: e2, theme: t2 }) => e2 && t2.rows.highlightOnHoverStyle};
	}
`;
var Y = lt`
	&:hover {
		cursor: pointer;
	}
`;
var K = dt.div.attrs((e2) => ({ style: e2.style }))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({ theme: e2 }) => e2.rows.style};
	${({ $dense: e2, theme: t2 }) => e2 && t2.rows.denseStyle};
	${({ $striped: e2, theme: t2 }) => e2 && t2.rows.stripedStyle};
	${({ $highlightOnHover: e2 }) => e2 && U};
	${({ $pointerOnHover: e2 }) => e2 && Y};
	${({ $selected: e2, theme: t2 }) => e2 && t2.rows.selectedHighlightStyle};
	${({ $conditionalStyle: e2 }) => e2};
`;
function q({ columns: t2 = [], conditionalRowStyles: n = [], defaultExpanded: o = false, defaultExpanderDisabled: a = false, dense: l2 = false, expandableIcon: i2, expandableRows: s2 = false, expandableRowsComponent: d2, expandableRowsComponentProps: c2, expandableRowsHideExpander: g2, expandOnRowClicked: b2 = false, expandOnRowDoubleClicked: m2 = false, highlightOnHover: w2 = false, id: f2, expandableInheritConditionalStyles: x2, keyField: C2, onRowClicked: y2 = u, onRowDoubleClicked: R2 = u, onRowMouseEnter: v2 = u, onRowMouseLeave: S2 = u, onRowExpandToggled: E2 = u, onSelectedRow: O2 = u, pointerOnHover: $2 = false, row: k2, rowCount: P2, rowIndex: D2, selectableRowDisabled: F2 = null, selectableRows: j2 = false, selectableRowsComponent: I2, selectableRowsComponentProps: L2, selectableRowsHighlight: M2 = false, selectableRowsSingle: A2 = false, selected: N2, striped: B2 = false, draggingColumnId: G2, onDragStart: V2, onDragOver: U2, onDragEnd: Y2, onDragEnter: q2, onDragLeave: J2 }) {
  const [Q2, X2] = e.useState(o);
  e.useEffect(() => {
    X2(o);
  }, [o]);
  const Z2 = e.useCallback(() => {
    X2(!Q2), E2(!Q2, k2);
  }, [Q2, E2, k2]), ee2 = $2 || s2 && (b2 || m2), te2 = e.useCallback((e2) => {
    e2.target.getAttribute("data-tag") === W && (y2(k2, e2), !a && s2 && b2 && Z2());
  }, [a, b2, s2, Z2, y2, k2]), ne2 = e.useCallback((e2) => {
    e2.target.getAttribute("data-tag") === W && (R2(k2, e2), !a && s2 && m2 && Z2());
  }, [a, m2, s2, Z2, R2, k2]), oe2 = e.useCallback((e2) => {
    v2(k2, e2);
  }, [v2, k2]), ae2 = e.useCallback((e2) => {
    S2(k2, e2);
  }, [S2, k2]), le2 = r(k2, C2), { conditionalStyle: re2, classNames: ie2 } = p(k2, n, ["rdt_TableRow"]), se2 = M2 && N2, de2 = x2 ? re2 : {}, ce2 = B2 && D2 % 2 == 0;
  return e.createElement(e.Fragment, null, e.createElement(K, { id: `row-${f2}`, role: "row", $striped: ce2, $highlightOnHover: w2, $pointerOnHover: !a && ee2, $dense: l2, onClick: te2, onDoubleClick: ne2, onMouseEnter: oe2, onMouseLeave: ae2, className: ie2, $selected: se2, $conditionalStyle: re2 }, j2 && e.createElement(T, { name: `select-row-${le2}`, keyField: C2, row: k2, rowCount: P2, selected: N2, selectableRowsComponent: I2, selectableRowsComponentProps: L2, selectableRowDisabled: F2, selectableRowsSingle: A2, onSelectedRow: O2 }), s2 && !g2 && e.createElement(_, { id: le2, expandableIcon: i2, expanded: Q2, row: k2, onToggled: Z2, disabled: a }), t2.map((t3) => t3.omit ? null : e.createElement(H, { id: `cell-${t3.id}-${le2}`, key: `cell-${t3.id}-${le2}`, dataTag: t3.ignoreRowClick || t3.button ? null : W, column: t3, row: k2, rowIndex: D2, isDragging: h(G2, t3.id), onDragStart: V2, onDragOver: U2, onDragEnd: Y2, onDragEnter: q2, onDragLeave: J2 }))), s2 && Q2 && e.createElement(z, { key: `expander-${le2}`, data: k2, extendedRowStyle: de2, extendedClassNames: ie2, ExpanderComponent: d2, expanderComponentProps: c2 }));
}
var J = dt.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({ $sortActive: e2 }) => e2 ? "opacity: 1" : "opacity: 0"};
	${({ $sortDirection: e2 }) => "desc" === e2 && "transform: rotate(180deg)"};
`;
var Q = ({ sortActive: e2, sortDirection: n }) => import_react.default.createElement(J, { $sortActive: e2, $sortDirection: n }, "▲");
var X = dt(k)`
	${({ button: e2 }) => e2 && "text-align: center"};
	${({ theme: e2, $isDragging: t2 }) => t2 && e2.headCells.draggingStyle};
`;
var Z = lt`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({ $sortActive: e2 }) => e2 ? "opacity: 1" : "opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({ $sortActive: e2 }) => !e2 && lt`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`;
var ee = dt.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({ disabled: e2 }) => !e2 && Z};
`;
var te = dt.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
var ne = e.memo(function({ column: t2, disabled: n, draggingColumnId: o, selectedColumn: a = {}, sortDirection: r2, sortIcon: i2, sortServer: s2, pagination: d2, paginationServer: c2, persistSelectedOnSort: g2, selectableRowsVisibleOnly: u2, onSort: p2, onDragStart: b2, onDragOver: m2, onDragEnd: w2, onDragEnter: f2, onDragLeave: x2 }) {
  e.useEffect(() => {
    "string" == typeof t2.selector && console.error(`Warning: ${t2.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`);
  }, []);
  const [C2, y2] = e.useState(false), R2 = e.useRef(null);
  if (e.useEffect(() => {
    R2.current && y2(R2.current.scrollWidth > R2.current.clientWidth);
  }, [C2]), t2.omit)
    return null;
  const v2 = () => {
    if (!t2.sortable && !t2.selector)
      return;
    let e2 = r2;
    h(a.id, t2.id) && (e2 = r2 === l.ASC ? l.DESC : l.ASC), p2({ type: "SORT_CHANGE", sortDirection: e2, selectedColumn: t2, clearSelectedOnSort: d2 && c2 && !g2 || s2 || u2 });
  }, S2 = (t3) => e.createElement(Q, { sortActive: t3, sortDirection: r2 }), E2 = () => e.createElement("span", { className: [r2, "__rdt_custom_sort_icon__"].join(" ") }, i2), O2 = !(!t2.sortable || !h(a.id, t2.id)), $2 = !t2.sortable || n, k2 = t2.sortable && !i2 && !t2.right, P2 = t2.sortable && !i2 && t2.right, D2 = t2.sortable && i2 && !t2.right, H2 = t2.sortable && i2 && t2.right;
  return e.createElement(X, { "data-column-id": t2.id, className: "rdt_TableCol", $headCell: true, allowOverflow: t2.allowOverflow, button: t2.button, compact: t2.compact, grow: t2.grow, hide: t2.hide, maxWidth: t2.maxWidth, minWidth: t2.minWidth, right: t2.right, center: t2.center, width: t2.width, draggable: t2.reorder, $isDragging: h(t2.id, o), onDragStart: b2, onDragOver: m2, onDragEnd: w2, onDragEnter: f2, onDragLeave: x2 }, t2.name && e.createElement(ee, { "data-column-id": t2.id, "data-sort-id": t2.id, role: "columnheader", tabIndex: 0, className: "rdt_TableCol_Sortable", onClick: $2 ? void 0 : v2, onKeyPress: $2 ? void 0 : (e2) => {
    "Enter" === e2.key && v2();
  }, $sortActive: !$2 && O2, disabled: $2 }, !$2 && H2 && E2(), !$2 && P2 && S2(O2), "string" == typeof t2.name ? e.createElement(te, { title: C2 ? t2.name : void 0, ref: R2, "data-column-id": t2.id }, t2.name) : t2.name, !$2 && D2 && E2(), !$2 && k2 && S2(O2)));
});
var oe = dt($)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;
function ae({ headCell: t2 = true, rowData: n, keyField: o, allSelected: a, mergeSelections: l2, selectedRows: r2, selectableRowsComponent: i2, selectableRowsComponentProps: s2, selectableRowDisabled: d2, onSelectAllRows: c2 }) {
  const g2 = r2.length > 0 && !a, u2 = d2 ? n.filter((e2) => !d2(e2)) : n, p2 = 0 === u2.length, b2 = Math.min(n.length, u2.length);
  return e.createElement(oe, { className: "rdt_TableCol", $headCell: t2, $noPadding: true }, e.createElement(j, { name: "select-all-rows", component: i2, componentOptions: s2, onClick: () => {
    c2({ type: "SELECT_ALL_ROWS", rows: u2, rowCount: b2, mergeSelections: l2, keyField: o });
  }, checked: a, indeterminate: g2, disabled: p2 }));
}
function le(t2 = B.AUTO) {
  const n = "object" == typeof window, [o, a] = e.useState(false);
  return e.useEffect(() => {
    if (n)
      if ("auto" !== t2)
        a("rtl" === t2);
      else {
        const e2 = !(!window.document || !window.document.createElement), t3 = document.getElementsByTagName("BODY")[0], n2 = document.getElementsByTagName("HTML")[0], o2 = "rtl" === t3.dir || "rtl" === n2.dir;
        a(e2 && o2);
      }
  }, [t2, n]), o;
}
var re = dt.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({ theme: e2 }) => e2.contextMenu.fontColor};
	font-size: ${({ theme: e2 }) => e2.contextMenu.fontSize};
	font-weight: 400;
`;
var ie = dt.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`;
var se = dt.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({ $rtl: e2 }) => e2 && "direction: rtl"};
	${({ theme: e2 }) => e2.contextMenu.style};
	${({ theme: e2, $visible: t2 }) => t2 && e2.contextMenu.activeStyle};
`;
function de({ contextMessage: t2, contextActions: n, contextComponent: o, selectedCount: a, direction: l2 }) {
  const r2 = le(l2), i2 = a > 0;
  return o ? e.createElement(se, { $visible: i2 }, e.cloneElement(o, { selectedCount: a })) : e.createElement(se, { $visible: i2, $rtl: r2 }, e.createElement(re, null, ((e2, t3, n2) => {
    if (0 === t3)
      return null;
    const o2 = 1 === t3 ? e2.singular : e2.plural;
    return n2 ? `${t3} ${e2.message || ""} ${o2}` : `${t3} ${o2} ${e2.message || ""}`;
  })(t2, a, r2)), e.createElement(ie, null, n));
}
var ce = dt.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({ theme: e2 }) => e2.header.style}
`;
var ge = dt.div`
	flex: 1 0 auto;
	color: ${({ theme: e2 }) => e2.header.fontColor};
	font-size: ${({ theme: e2 }) => e2.header.fontSize};
	font-weight: 400;
`;
var ue = dt.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`;
var pe = ({ title: t2, actions: n = null, contextMessage: o, contextActions: a, contextComponent: l2, selectedCount: r2, direction: i2, showMenu: s2 = true }) => e.createElement(ce, { className: "rdt_TableHeader", role: "heading", "aria-level": 1 }, e.createElement(ge, null, t2), n && e.createElement(ue, null, n), s2 && e.createElement(de, { contextMessage: o, contextActions: a, contextComponent: l2, direction: i2, selectedCount: r2 }));
function be(e2, t2) {
  var n = {};
  for (var o in e2)
    Object.prototype.hasOwnProperty.call(e2, o) && t2.indexOf(o) < 0 && (n[o] = e2[o]);
  if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
    var a = 0;
    for (o = Object.getOwnPropertySymbols(e2); a < o.length; a++)
      t2.indexOf(o[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, o[a]) && (n[o[a]] = e2[o[a]]);
  }
  return n;
}
var me = { left: "flex-start", right: "flex-end", center: "center" };
var he = dt.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({ align: e2 }) => me[e2]};
	flex-wrap: ${({ $wrapContent: e2 }) => e2 ? "wrap" : "nowrap"};
	${({ theme: e2 }) => e2.subHeader.style}
`;
var we = (t2) => {
  var { align: n = "right", wrapContent: o = true } = t2, a = be(t2, ["align", "wrapContent"]);
  return e.createElement(he, Object.assign({ align: n, $wrapContent: o }, a));
};
var fe = dt.div`
	display: flex;
	flex-direction: column;
`;
var xe = dt.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({ $responsive: e2, $fixedHeader: t2 }) => e2 && lt`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t2 ? "auto" : "hidden"};
			min-height: 0;
		`};

	${({ $fixedHeader: e2 = false, $fixedHeaderScrollHeight: t2 = "100vh" }) => e2 && lt`
			max-height: ${t2};
			-webkit-overflow-scrolling: touch;
		`};

	${({ theme: e2 }) => e2.responsiveWrapper.style};
`;
var Ce = dt.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${(e2) => e2.theme.progress.style};
`;
var ye = dt.div`
	position: relative;
	width: 100%;
	${({ theme: e2 }) => e2.tableWrapper.style};
`;
var Re = dt($)`
	white-space: nowrap;
	${({ theme: e2 }) => e2.expanderCell.style};
`;
var ve = dt.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({ theme: e2 }) => e2.noData.style};
`;
var Se = () => import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" }, import_react.default.createElement("path", { d: "M7 10l5 5 5-5z" }), import_react.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }));
var Ee = dt.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`;
var Oe = dt.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`;
var $e = (t2) => {
  var { defaultValue: n, onChange: o } = t2, a = be(t2, ["defaultValue", "onChange"]);
  return e.createElement(Oe, null, e.createElement(Ee, Object.assign({ onChange: o, defaultValue: n }, a)), e.createElement(Se, null));
};
var ke = { columns: [], data: [], title: "", keyField: "id", selectableRows: false, selectableRowsHighlight: false, selectableRowsNoSelectAll: false, selectableRowSelected: null, selectableRowDisabled: null, selectableRowsComponent: "input", selectableRowsComponentProps: {}, selectableRowsVisibleOnly: false, selectableRowsSingle: false, clearSelectedRows: false, expandableRows: false, expandableRowDisabled: null, expandableRowExpanded: null, expandOnRowClicked: false, expandableRowsHideExpander: false, expandOnRowDoubleClicked: false, expandableInheritConditionalStyles: false, expandableRowsComponent: function() {
  return import_react.default.createElement("div", null, "To add an expander pass in a component instance via ", import_react.default.createElement("strong", null, "expandableRowsComponent"), ". You can then access props.data from this component.");
}, expandableIcon: { collapsed: import_react.default.createElement(() => import_react.default.createElement("svg", { fill: "currentColor", height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }, import_react.default.createElement("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }), import_react.default.createElement("path", { d: "M0-.25h24v24H0z", fill: "none" })), null), expanded: import_react.default.createElement(() => import_react.default.createElement("svg", { fill: "currentColor", height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }, import_react.default.createElement("path", { d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" }), import_react.default.createElement("path", { d: "M0-.75h24v24H0z", fill: "none" })), null) }, expandableRowsComponentProps: {}, progressPending: false, progressComponent: import_react.default.createElement("div", { style: { fontSize: "24px", fontWeight: 700, padding: "24px" } }, "Loading..."), persistTableHead: false, sortIcon: null, sortFunction: null, sortServer: false, striped: false, highlightOnHover: false, pointerOnHover: false, noContextMenu: false, contextMessage: { singular: "item", plural: "items", message: "selected" }, actions: null, contextActions: null, contextComponent: null, defaultSortFieldId: null, defaultSortAsc: true, responsive: true, noDataComponent: import_react.default.createElement("div", { style: { padding: "24px" } }, "There are no records to display"), disabled: false, noTableHead: false, noHeader: false, subHeader: false, subHeaderAlign: G.RIGHT, subHeaderWrap: true, subHeaderComponent: null, fixedHeader: false, fixedHeaderScrollHeight: "100vh", pagination: false, paginationServer: false, paginationServerOptions: { persistSelectedOnSort: false, persistSelectedOnPageChange: false }, paginationDefaultPage: 1, paginationResetDefaultPage: false, paginationTotalRows: 0, paginationPerPage: 10, paginationRowsPerPageOptions: [10, 15, 20, 25, 30], paginationComponent: null, paginationComponentOptions: {}, paginationIconFirstPage: import_react.default.createElement(() => import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, import_react.default.createElement("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" }), import_react.default.createElement("path", { fill: "none", d: "M24 24H0V0h24v24z" })), null), paginationIconLastPage: import_react.default.createElement(() => import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, import_react.default.createElement("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" }), import_react.default.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" })), null), paginationIconNext: import_react.default.createElement(() => import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, import_react.default.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" }), import_react.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })), null), paginationIconPrevious: import_react.default.createElement(() => import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, import_react.default.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" }), import_react.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })), null), dense: false, conditionalRowStyles: [], theme: "default", customStyles: {}, direction: B.AUTO, onChangePage: u, onChangeRowsPerPage: u, onRowClicked: u, onRowDoubleClicked: u, onRowMouseEnter: u, onRowMouseLeave: u, onRowExpandToggled: u, onSelectedRowsChange: u, onSort: u, onColumnOrderChange: u };
var Pe = { rowsPerPageText: "Rows per page:", rangeSeparatorText: "of", noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: "All" };
var De = dt.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({ theme: e2 }) => e2.pagination.style};
`;
var He = dt.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({ theme: e2 }) => e2.pagination.pageButtonsStyle};
	${({ $isRTL: e2 }) => e2 && "transform: scale(-1, -1)"};
`;
var Fe = dt.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${v`
    width: 100%;
    justify-content: space-around;
  `};
`;
var je = dt.span`
	flex-shrink: 1;
	user-select: none;
`;
var Ie = dt(je)`
	margin: 0 24px;
`;
var Te = dt(je)`
	margin: 0 4px;
`;
var Le = e.memo(function({ rowsPerPage: t2, rowCount: n, currentPage: o, direction: a = ke.direction, paginationRowsPerPageOptions: l2 = ke.paginationRowsPerPageOptions, paginationIconLastPage: r2 = ke.paginationIconLastPage, paginationIconFirstPage: i2 = ke.paginationIconFirstPage, paginationIconNext: s2 = ke.paginationIconNext, paginationIconPrevious: d2 = ke.paginationIconPrevious, paginationComponentOptions: g2 = ke.paginationComponentOptions, onChangeRowsPerPage: u2 = ke.onChangeRowsPerPage, onChangePage: p2 = ke.onChangePage }) {
  const b2 = (() => {
    const t3 = "object" == typeof window;
    function n2() {
      return { width: t3 ? window.innerWidth : void 0, height: t3 ? window.innerHeight : void 0 };
    }
    const [o2, a2] = e.useState(n2);
    return e.useEffect(() => {
      if (!t3)
        return () => null;
      function e2() {
        a2(n2());
      }
      return window.addEventListener("resize", e2), () => window.removeEventListener("resize", e2);
    }, []), o2;
  })(), m2 = le(a), h2 = b2.width && b2.width > 599, w2 = c(n, t2), f2 = o * t2, x2 = f2 - t2 + 1, C2 = 1 === o, y2 = o === w2, R2 = Object.assign(Object.assign({}, Pe), g2), v2 = o === w2 ? `${x2}-${n} ${R2.rangeSeparatorText} ${n}` : `${x2}-${f2} ${R2.rangeSeparatorText} ${n}`, S2 = e.useCallback(() => p2(o - 1), [o, p2]), E2 = e.useCallback(() => p2(o + 1), [o, p2]), O2 = e.useCallback(() => p2(1), [p2]), $2 = e.useCallback(() => p2(c(n, t2)), [p2, n, t2]), k2 = e.useCallback((e2) => u2(Number(e2.target.value), o), [o, u2]), P2 = l2.map((t3) => e.createElement("option", { key: t3, value: t3 }, t3));
  R2.selectAllRowsItem && P2.push(e.createElement("option", { key: -1, value: n }, R2.selectAllRowsItemText));
  const D2 = e.createElement($e, { onChange: k2, defaultValue: t2, "aria-label": R2.rowsPerPageText }, P2);
  return e.createElement(De, { className: "rdt_Pagination" }, !R2.noRowsPerPage && h2 && e.createElement(e.Fragment, null, e.createElement(Te, null, R2.rowsPerPageText), D2), h2 && e.createElement(Ie, null, v2), e.createElement(Fe, null, e.createElement(He, { id: "pagination-first-page", type: "button", "aria-label": "First Page", "aria-disabled": C2, onClick: O2, disabled: C2, $isRTL: m2 }, i2), e.createElement(He, { id: "pagination-previous-page", type: "button", "aria-label": "Previous Page", "aria-disabled": C2, onClick: S2, disabled: C2, $isRTL: m2 }, d2), !R2.noRowsPerPage && !h2 && D2, e.createElement(He, { id: "pagination-next-page", type: "button", "aria-label": "Next Page", "aria-disabled": y2, onClick: E2, disabled: y2, $isRTL: m2 }, s2), e.createElement(He, { id: "pagination-last-page", type: "button", "aria-label": "Last Page", "aria-disabled": y2, onClick: $2, disabled: y2, $isRTL: m2 }, r2)));
});
var Me = (t2, n) => {
  const o = e.useRef(true);
  e.useEffect(() => {
    o.current ? o.current = false : t2();
  }, n);
};
function Ae(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var _e = function(e2) {
  return function(e3) {
    return !!e3 && "object" == typeof e3;
  }(e2) && !function(e3) {
    var t2 = Object.prototype.toString.call(e3);
    return "[object RegExp]" === t2 || "[object Date]" === t2 || function(e4) {
      return e4.$$typeof === Ne;
    }(e3);
  }(e2);
};
var Ne = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
function ze(e2, t2) {
  return false !== t2.clone && t2.isMergeableObject(e2) ? Ue((n = e2, Array.isArray(n) ? [] : {}), e2, t2) : e2;
  var n;
}
function We(e2, t2, n) {
  return e2.concat(t2).map(function(e3) {
    return ze(e3, n);
  });
}
function Be(e2) {
  return Object.keys(e2).concat(function(e3) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e3).filter(function(t2) {
      return Object.propertyIsEnumerable.call(e3, t2);
    }) : [];
  }(e2));
}
function Ge(e2, t2) {
  try {
    return t2 in e2;
  } catch (e3) {
    return false;
  }
}
function Ve(e2, t2, n) {
  var o = {};
  return n.isMergeableObject(e2) && Be(e2).forEach(function(t3) {
    o[t3] = ze(e2[t3], n);
  }), Be(t2).forEach(function(a) {
    (function(e3, t3) {
      return Ge(e3, t3) && !(Object.hasOwnProperty.call(e3, t3) && Object.propertyIsEnumerable.call(e3, t3));
    })(e2, a) || (Ge(e2, a) && n.isMergeableObject(t2[a]) ? o[a] = function(e3, t3) {
      if (!t3.customMerge)
        return Ue;
      var n2 = t3.customMerge(e3);
      return "function" == typeof n2 ? n2 : Ue;
    }(a, n)(e2[a], t2[a], n) : o[a] = ze(t2[a], n));
  }), o;
}
function Ue(e2, t2, n) {
  (n = n || {}).arrayMerge = n.arrayMerge || We, n.isMergeableObject = n.isMergeableObject || _e, n.cloneUnlessOtherwiseSpecified = ze;
  var o = Array.isArray(t2);
  return o === Array.isArray(e2) ? o ? n.arrayMerge(e2, t2, n) : Ve(e2, t2, n) : ze(t2, n);
}
Ue.all = function(e2, t2) {
  if (!Array.isArray(e2))
    throw new Error("first argument should be an array");
  return e2.reduce(function(e3, n) {
    return Ue(e3, n, t2);
  }, {});
};
var Ye = Ae(Ue);
var Ke = { text: { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)" }, background: { default: "#FFFFFF" }, context: { background: "#e3f2fd", text: "rgba(0, 0, 0, 0.87)" }, divider: { default: "rgba(0,0,0,.12)" }, button: { default: "rgba(0,0,0,.54)", focus: "rgba(0,0,0,.12)", hover: "rgba(0,0,0,.12)", disabled: "rgba(0, 0, 0, .18)" }, selected: { default: "#e3f2fd", text: "rgba(0, 0, 0, 0.87)" }, highlightOnHover: { default: "#EEEEEE", text: "rgba(0, 0, 0, 0.87)" }, striped: { default: "#FAFAFA", text: "rgba(0, 0, 0, 0.87)" } };
var qe = { default: Ke, light: Ke, dark: { text: { primary: "#FFFFFF", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(0,0,0,.12)" }, background: { default: "#424242" }, context: { background: "#E91E63", text: "#FFFFFF" }, divider: { default: "rgba(81, 81, 81, 1)" }, button: { default: "#FFFFFF", focus: "rgba(255, 255, 255, .54)", hover: "rgba(255, 255, 255, .12)", disabled: "rgba(255, 255, 255, .18)" }, selected: { default: "rgba(0, 0, 0, .7)", text: "#FFFFFF" }, highlightOnHover: { default: "rgba(0, 0, 0, .7)", text: "#FFFFFF" }, striped: { default: "rgba(0, 0, 0, .87)", text: "#FFFFFF" } } };
function Je(e2 = "default", t2, n = "default") {
  return qe[e2] || (qe[e2] = Ye(qe[n], t2 || {})), qe[e2] = Ye(qe[e2], t2 || {}), qe[e2];
}
function Qe(t2, n, o, a) {
  const [r2, i2] = e.useState(() => d(t2)), [s2, c2] = e.useState(""), g2 = e.useRef("");
  Me(() => {
    i2(d(t2));
  }, [t2]);
  const u2 = e.useCallback((e2) => {
    var t3, n2, o2;
    const { attributes: a2 } = e2.target, l2 = null === (t3 = a2.getNamedItem("data-column-id")) || void 0 === t3 ? void 0 : t3.value;
    l2 && (g2.current = (null === (o2 = null === (n2 = r2[m(r2, l2)]) || void 0 === n2 ? void 0 : n2.id) || void 0 === o2 ? void 0 : o2.toString()) || "", c2(g2.current));
  }, [r2]), p2 = e.useCallback((e2) => {
    var t3;
    const { attributes: o2 } = e2.target, a2 = null === (t3 = o2.getNamedItem("data-column-id")) || void 0 === t3 ? void 0 : t3.value;
    if (a2 && g2.current && a2 !== g2.current) {
      const e3 = m(r2, g2.current), t4 = m(r2, a2), o3 = [...r2];
      o3[e3] = r2[t4], o3[t4] = r2[e3], i2(o3), n(o3);
    }
  }, [n, r2]), b2 = e.useCallback((e2) => {
    e2.preventDefault();
  }, []), h2 = e.useCallback((e2) => {
    e2.preventDefault();
  }, []), w2 = e.useCallback((e2) => {
    e2.preventDefault(), g2.current = "", c2("");
  }, []), f2 = function(e2 = false) {
    return e2 ? l.ASC : l.DESC;
  }(a), x2 = e.useMemo(() => r2[m(r2, null == o ? void 0 : o.toString())] || {}, [o, r2]);
  return { tableColumns: r2, draggingColumnId: s2, handleDragStart: u2, handleDragEnter: p2, handleDragOver: b2, handleDragLeave: h2, handleDragEnd: w2, defaultSortDirection: f2, defaultSortColumn: x2 };
}
var Xe = e.memo(function(t2) {
  const { data: n = ke.data, columns: o = ke.columns, title: i2 = ke.title, actions: s2 = ke.actions, keyField: d2 = ke.keyField, striped: u2 = ke.striped, highlightOnHover: p2 = ke.highlightOnHover, pointerOnHover: m2 = ke.pointerOnHover, dense: h2 = ke.dense, selectableRows: f2 = ke.selectableRows, selectableRowsSingle: C2 = ke.selectableRowsSingle, selectableRowsHighlight: v2 = ke.selectableRowsHighlight, selectableRowsNoSelectAll: S2 = ke.selectableRowsNoSelectAll, selectableRowsVisibleOnly: E2 = ke.selectableRowsVisibleOnly, selectableRowSelected: O2 = ke.selectableRowSelected, selectableRowDisabled: k2 = ke.selectableRowDisabled, selectableRowsComponent: P2 = ke.selectableRowsComponent, selectableRowsComponentProps: D2 = ke.selectableRowsComponentProps, onRowExpandToggled: H2 = ke.onRowExpandToggled, onSelectedRowsChange: F2 = ke.onSelectedRowsChange, expandableIcon: j2 = ke.expandableIcon, onChangeRowsPerPage: I2 = ke.onChangeRowsPerPage, onChangePage: T2 = ke.onChangePage, paginationServer: L2 = ke.paginationServer, paginationServerOptions: M2 = ke.paginationServerOptions, paginationTotalRows: A2 = ke.paginationTotalRows, paginationDefaultPage: _2 = ke.paginationDefaultPage, paginationResetDefaultPage: N2 = ke.paginationResetDefaultPage, paginationPerPage: z2 = ke.paginationPerPage, paginationRowsPerPageOptions: W2 = ke.paginationRowsPerPageOptions, paginationIconLastPage: B2 = ke.paginationIconLastPage, paginationIconFirstPage: G2 = ke.paginationIconFirstPage, paginationIconNext: V2 = ke.paginationIconNext, paginationIconPrevious: U2 = ke.paginationIconPrevious, paginationComponent: Y2 = ke.paginationComponent, paginationComponentOptions: K2 = ke.paginationComponentOptions, responsive: J2 = ke.responsive, progressPending: Q2 = ke.progressPending, progressComponent: X2 = ke.progressComponent, persistTableHead: Z2 = ke.persistTableHead, noDataComponent: ee2 = ke.noDataComponent, disabled: te2 = ke.disabled, noTableHead: oe2 = ke.noTableHead, noHeader: le2 = ke.noHeader, fixedHeader: re2 = ke.fixedHeader, fixedHeaderScrollHeight: ie2 = ke.fixedHeaderScrollHeight, pagination: se2 = ke.pagination, subHeader: de2 = ke.subHeader, subHeaderAlign: ce2 = ke.subHeaderAlign, subHeaderWrap: ge2 = ke.subHeaderWrap, subHeaderComponent: ue2 = ke.subHeaderComponent, noContextMenu: be2 = ke.noContextMenu, contextMessage: me2 = ke.contextMessage, contextActions: he2 = ke.contextActions, contextComponent: Se2 = ke.contextComponent, expandableRows: Ee2 = ke.expandableRows, onRowClicked: Oe2 = ke.onRowClicked, onRowDoubleClicked: $e2 = ke.onRowDoubleClicked, onRowMouseEnter: Pe2 = ke.onRowMouseEnter, onRowMouseLeave: De2 = ke.onRowMouseLeave, sortIcon: He2 = ke.sortIcon, onSort: Fe2 = ke.onSort, sortFunction: je2 = ke.sortFunction, sortServer: Ie2 = ke.sortServer, expandableRowsComponent: Te2 = ke.expandableRowsComponent, expandableRowsComponentProps: Ae2 = ke.expandableRowsComponentProps, expandableRowDisabled: _e2 = ke.expandableRowDisabled, expandableRowsHideExpander: Ne2 = ke.expandableRowsHideExpander, expandOnRowClicked: ze2 = ke.expandOnRowClicked, expandOnRowDoubleClicked: We2 = ke.expandOnRowDoubleClicked, expandableRowExpanded: Be2 = ke.expandableRowExpanded, expandableInheritConditionalStyles: Ge2 = ke.expandableInheritConditionalStyles, defaultSortFieldId: Ve2 = ke.defaultSortFieldId, defaultSortAsc: Ue2 = ke.defaultSortAsc, clearSelectedRows: Ke2 = ke.clearSelectedRows, conditionalRowStyles: Je2 = ke.conditionalRowStyles, theme: Xe2 = ke.theme, customStyles: Ze = ke.customStyles, direction: et = ke.direction, onColumnOrderChange: tt = ke.onColumnOrderChange, className: nt, ariaLabel: ot2 } = t2, { tableColumns: at, draggingColumnId: lt2, handleDragStart: rt, handleDragEnter: it, handleDragOver: st, handleDragLeave: dt2, handleDragEnd: ct, defaultSortDirection: gt, defaultSortColumn: ut } = Qe(o, tt, Ve2, Ue2), [{ rowsPerPage: pt, currentPage: bt, selectedRows: mt, allSelected: ht, selectedCount: wt, selectedColumn: ft, sortDirection: xt, toggleOnSelectedRowsChange: Ct }, yt] = e.useReducer(w, { allSelected: false, selectedCount: 0, selectedRows: [], selectedColumn: ut, toggleOnSelectedRowsChange: false, sortDirection: gt, currentPage: _2, rowsPerPage: z2, selectedRowsFlag: false, contextMessage: ke.contextMessage }), { persistSelectedOnSort: Rt = false, persistSelectedOnPageChange: vt = false } = M2, St = !(!L2 || !vt && !Rt), Et = se2 && !Q2 && n.length > 0, Ot = Y2 || Le, $t = e.useMemo(() => ((e2 = {}, t3 = "default", n2 = "default") => {
    const o2 = qe[t3] ? t3 : n2;
    return Ye({ table: { style: { color: (a = qe[o2]).text.primary, backgroundColor: a.background.default } }, tableWrapper: { style: { display: "table" } }, responsiveWrapper: { style: {} }, header: { style: { fontSize: "22px", color: a.text.primary, backgroundColor: a.background.default, minHeight: "56px", paddingLeft: "16px", paddingRight: "8px" } }, subHeader: { style: { backgroundColor: a.background.default, minHeight: "52px" } }, head: { style: { color: a.text.primary, fontSize: "12px", fontWeight: 500 } }, headRow: { style: { backgroundColor: a.background.default, minHeight: "52px", borderBottomWidth: "1px", borderBottomColor: a.divider.default, borderBottomStyle: "solid" }, denseStyle: { minHeight: "32px" } }, headCells: { style: { paddingLeft: "16px", paddingRight: "16px" }, draggingStyle: { cursor: "move" } }, contextMenu: { style: { backgroundColor: a.context.background, fontSize: "18px", fontWeight: 400, color: a.context.text, paddingLeft: "16px", paddingRight: "8px", transform: "translate3d(0, -100%, 0)", transitionDuration: "125ms", transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)", willChange: "transform" }, activeStyle: { transform: "translate3d(0, 0, 0)" } }, cells: { style: { paddingLeft: "16px", paddingRight: "16px", wordBreak: "break-word" }, draggingStyle: {} }, rows: { style: { fontSize: "13px", fontWeight: 400, color: a.text.primary, backgroundColor: a.background.default, minHeight: "48px", "&:not(:last-of-type)": { borderBottomStyle: "solid", borderBottomWidth: "1px", borderBottomColor: a.divider.default } }, denseStyle: { minHeight: "32px" }, selectedHighlightStyle: { "&:nth-of-type(n)": { color: a.selected.text, backgroundColor: a.selected.default, borderBottomColor: a.background.default } }, highlightOnHoverStyle: { color: a.highlightOnHover.text, backgroundColor: a.highlightOnHover.default, transitionDuration: "0.15s", transitionProperty: "background-color", borderBottomColor: a.background.default, outlineStyle: "solid", outlineWidth: "1px", outlineColor: a.background.default }, stripedStyle: { color: a.striped.text, backgroundColor: a.striped.default } }, expanderRow: { style: { color: a.text.primary, backgroundColor: a.background.default } }, expanderCell: { style: { flex: "0 0 48px" } }, expanderButton: { style: { color: a.button.default, fill: a.button.default, backgroundColor: "transparent", borderRadius: "2px", transition: "0.25s", height: "100%", width: "100%", "&:hover:enabled": { cursor: "pointer" }, "&:disabled": { color: a.button.disabled }, "&:hover:not(:disabled)": { cursor: "pointer", backgroundColor: a.button.hover }, "&:focus": { outline: "none", backgroundColor: a.button.focus }, svg: { margin: "auto" } } }, pagination: { style: { color: a.text.secondary, fontSize: "13px", minHeight: "56px", backgroundColor: a.background.default, borderTopStyle: "solid", borderTopWidth: "1px", borderTopColor: a.divider.default }, pageButtonsStyle: { borderRadius: "50%", height: "40px", width: "40px", padding: "8px", margin: "px", cursor: "pointer", transition: "0.4s", color: a.button.default, fill: a.button.default, backgroundColor: "transparent", "&:disabled": { cursor: "unset", color: a.button.disabled, fill: a.button.disabled }, "&:hover:not(:disabled)": { backgroundColor: a.button.hover }, "&:focus": { outline: "none", backgroundColor: a.button.focus } } }, noData: { style: { display: "flex", alignItems: "center", justifyContent: "center", color: a.text.primary, backgroundColor: a.background.default } }, progress: { style: { display: "flex", alignItems: "center", justifyContent: "center", color: a.text.primary, backgroundColor: a.background.default } } }, e2);
    var a;
  })(Ze, Xe2), [Ze, Xe2]), kt = e.useMemo(() => Object.assign({}, "auto" !== et && { dir: et }), [et]), Pt = e.useMemo(() => {
    if (Ie2)
      return n;
    if ((null == ft ? void 0 : ft.sortFunction) && "function" == typeof ft.sortFunction) {
      const e2 = ft.sortFunction, t3 = xt === l.ASC ? e2 : (t4, n2) => -1 * e2(t4, n2);
      return [...n].sort(t3);
    }
    return function(e2, t3, n2, o2) {
      return t3 ? o2 && "function" == typeof o2 ? o2(e2.slice(0), t3, n2) : e2.slice(0).sort((e3, o3) => {
        const a = t3(e3), l2 = t3(o3);
        if ("asc" === n2) {
          if (a < l2)
            return -1;
          if (a > l2)
            return 1;
        }
        if ("desc" === n2) {
          if (a > l2)
            return -1;
          if (a < l2)
            return 1;
        }
        return 0;
      }) : e2;
    }(n, null == ft ? void 0 : ft.selector, xt, je2);
  }, [Ie2, ft, xt, n, je2]), Dt = e.useMemo(() => {
    if (se2 && !L2) {
      const e2 = bt * pt, t3 = e2 - pt;
      return Pt.slice(t3, e2);
    }
    return Pt;
  }, [bt, se2, L2, pt, Pt]), Ht = e.useCallback((e2) => {
    yt(e2);
  }, []), Ft = e.useCallback((e2) => {
    yt(e2);
  }, []), jt = e.useCallback((e2) => {
    yt(e2);
  }, []), It = e.useCallback((e2, t3) => Oe2(e2, t3), [Oe2]), Tt = e.useCallback((e2, t3) => $e2(e2, t3), [$e2]), Lt = e.useCallback((e2, t3) => Pe2(e2, t3), [Pe2]), Mt = e.useCallback((e2, t3) => De2(e2, t3), [De2]), At = e.useCallback((e2) => yt({ type: "CHANGE_PAGE", page: e2, paginationServer: L2, visibleOnly: E2, persistSelectedOnPageChange: vt }), [L2, vt, E2]), _t = e.useCallback((e2) => {
    const t3 = c(A2 || Dt.length, e2), n2 = g(bt, t3);
    L2 || At(n2), yt({ type: "CHANGE_ROWS_PER_PAGE", page: n2, rowsPerPage: e2 });
  }, [bt, At, L2, A2, Dt.length]);
  if (se2 && !L2 && Pt.length > 0 && 0 === Dt.length) {
    const e2 = c(Pt.length, pt), t3 = g(bt, e2);
    At(t3);
  }
  Me(() => {
    F2({ allSelected: ht, selectedCount: wt, selectedRows: mt.slice(0) });
  }, [Ct]), Me(() => {
    Fe2(ft, xt, Pt.slice(0));
  }, [ft, xt]), Me(() => {
    T2(bt, A2 || Pt.length);
  }, [bt]), Me(() => {
    I2(pt, bt);
  }, [pt]), Me(() => {
    At(_2);
  }, [_2, N2]), Me(() => {
    if (se2 && L2 && A2 > 0) {
      const e2 = c(A2, pt), t3 = g(bt, e2);
      bt !== t3 && At(t3);
    }
  }, [A2]), e.useEffect(() => {
    yt({ type: "CLEAR_SELECTED_ROWS", selectedRowsFlag: Ke2 });
  }, [C2, Ke2]), e.useEffect(() => {
    if (!O2)
      return;
    const e2 = Pt.filter((e3) => O2(e3)), t3 = C2 ? e2.slice(0, 1) : e2;
    yt({ type: "SELECT_MULTIPLE_ROWS", keyField: d2, selectedRows: t3, totalRows: Pt.length, mergeSelections: St });
  }, [n, O2]);
  const Nt = E2 ? Dt : Pt, zt = vt || C2 || S2;
  return e.createElement(ot, { theme: $t }, !le2 && (!!i2 || !!s2) && e.createElement(pe, { title: i2, actions: s2, showMenu: !be2, selectedCount: wt, direction: et, contextActions: he2, contextComponent: Se2, contextMessage: me2 }), de2 && e.createElement(we, { align: ce2, wrapContent: ge2 }, ue2), e.createElement(xe, Object.assign({ $responsive: J2, $fixedHeader: re2, $fixedHeaderScrollHeight: ie2, className: nt }, kt), e.createElement(ye, null, Q2 && !Z2 && e.createElement(Ce, null, X2), e.createElement(x, Object.assign({ disabled: te2, className: "rdt_Table", role: "table" }, ot2 && { "aria-label": ot2 }), !oe2 && (!!Z2 || Pt.length > 0 && !Q2) && e.createElement(y, { className: "rdt_TableHead", role: "rowgroup", $fixedHeader: re2 }, e.createElement(R, { className: "rdt_TableHeadRow", role: "row", $dense: h2 }, f2 && (zt ? e.createElement($, { style: { flex: "0 0 48px" } }) : e.createElement(ae, { allSelected: ht, selectedRows: mt, selectableRowsComponent: P2, selectableRowsComponentProps: D2, selectableRowDisabled: k2, rowData: Nt, keyField: d2, mergeSelections: St, onSelectAllRows: Ft })), Ee2 && !Ne2 && e.createElement(Re, null), at.map((t3) => e.createElement(ne, { key: t3.id, column: t3, selectedColumn: ft, disabled: Q2 || 0 === Pt.length, pagination: se2, paginationServer: L2, persistSelectedOnSort: Rt, selectableRowsVisibleOnly: E2, sortDirection: xt, sortIcon: He2, sortServer: Ie2, onSort: Ht, onDragStart: rt, onDragOver: st, onDragEnd: ct, onDragEnter: it, onDragLeave: dt2, draggingColumnId: lt2 })))), !Pt.length && !Q2 && e.createElement(ve, null, ee2), Q2 && Z2 && e.createElement(Ce, null, X2), !Q2 && Pt.length > 0 && e.createElement(fe, { className: "rdt_TableBody", role: "rowgroup" }, Dt.map((t3, n2) => {
    const o2 = r(t3, d2), a = function(e2 = "") {
      return "number" != typeof e2 && (!e2 || 0 === e2.length);
    }(o2) ? n2 : o2, l2 = b(t3, mt, d2), i3 = !!(Ee2 && Be2 && Be2(t3)), s3 = !!(Ee2 && _e2 && _e2(t3));
    return e.createElement(q, { id: a, key: a, keyField: d2, "data-row-id": a, columns: at, row: t3, rowCount: Pt.length, rowIndex: n2, selectableRows: f2, expandableRows: Ee2, expandableIcon: j2, highlightOnHover: p2, pointerOnHover: m2, dense: h2, expandOnRowClicked: ze2, expandOnRowDoubleClicked: We2, expandableRowsComponent: Te2, expandableRowsComponentProps: Ae2, expandableRowsHideExpander: Ne2, defaultExpanderDisabled: s3, defaultExpanded: i3, expandableInheritConditionalStyles: Ge2, conditionalRowStyles: Je2, selected: l2, selectableRowsHighlight: v2, selectableRowsComponent: P2, selectableRowsComponentProps: D2, selectableRowDisabled: k2, selectableRowsSingle: C2, striped: u2, onRowExpandToggled: H2, onRowClicked: It, onRowDoubleClicked: Tt, onRowMouseEnter: Lt, onRowMouseLeave: Mt, onSelectedRow: jt, draggingColumnId: lt2, onDragStart: rt, onDragOver: st, onDragEnd: ct, onDragEnter: it, onDragLeave: dt2 });
  }))))), Et && e.createElement("div", null, e.createElement(Ot, { onChangePage: At, onChangeRowsPerPage: _t, rowCount: A2 || Pt.length, currentPage: bt, rowsPerPage: pt, direction: et, paginationRowsPerPageOptions: W2, paginationIconLastPage: B2, paginationIconFirstPage: G2, paginationIconNext: V2, paginationIconPrevious: U2, paginationComponentOptions: K2 })));
});
export {
  G as Alignment,
  B as Direction,
  V as Media,
  W as STOP_PROP_TAG,
  Je as createTheme,
  Xe as default,
  qe as defaultThemes
};
//# sourceMappingURL=react-data-table-component.js.map
