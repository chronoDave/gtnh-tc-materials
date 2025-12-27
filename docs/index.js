"use strict";
(() => {
  // node_modules/@chronocide/hyper/dist/hyper.js
  var maybe = (fn) => (x) => {
    if (x === null || x === void 0) return null;
    return fn(x);
  };
  var setAttributes = (element) => (attributes) => Object.entries(attributes).forEach(([k, v]) => {
    if (typeof v === "string") element.setAttribute(k, v);
    if (typeof v === "number") element.setAttribute(k, `${v}`);
    if (v === true) element.toggleAttribute(k, v);
  });
  var create = (element) => (attributes) => (children) => {
    maybe(setAttributes(element))(attributes);
    element.append(...children);
    return element;
  };
  var html = (document2) => (tag) => (attributes) => (...children) => create(document2.createElement(tag))(attributes)(children);
  var Env = class {
    _document;
    get document() {
      if (!this._document) throw new Error("Missing document");
      return this._document;
    }
    set document(document2) {
      this._document = document2;
    }
    constructor() {
      this._document = typeof document === "undefined" ? null : document;
    }
  };
  var env = new Env();
  var hyper = (tag) => html(env.document)(tag);

  // node_modules/@chronocide/web-components/dist/datagrid.js
  var maybe$1 = (fn) => (x) => {
    if (x === null || x === void 0) return null;
    return fn(x);
  };
  var setAttributes2 = (element) => (attributes) => Object.entries(attributes).forEach(([k, v]) => {
    if (typeof v === "string") element.setAttribute(k, v);
    if (typeof v === "number") element.setAttribute(k, `${v}`);
    if (v === true) element.toggleAttribute(k, v);
  });
  var create2 = (element) => (attributes) => (children) => {
    maybe$1(setAttributes2(element))(attributes);
    element.append(...children);
    return element;
  };
  var html2 = (document2) => (tag) => (attributes) => (...children) => create2(document2.createElement(tag))(attributes)(children);
  var svg$1 = (document2) => (tag) => (attributes) => (...children) => create2(document2.createElementNS("http://www.w3.org/2000/svg", tag))(attributes)(children);
  var Env2 = class {
    _document;
    get document() {
      if (!this._document) throw new Error("Missing document");
      return this._document;
    }
    set document(document2) {
      this._document = document2;
    }
    constructor() {
      this._document = typeof document === "undefined" ? null : document;
    }
  };
  var env2 = new Env2();
  var hyper2 = (tag) => html2(env2.document)(tag);
  var svg = (tag) => svg$1(env2.document)(tag);
  var uid = /* @__PURE__ */ (() => {
    let n = 0;
    return () => `${Date.now().toString(16)}-${(n++ * 16 ** 4).toString(16).padEnd(4, "0")}`;
  })();
  var number = (x) => {
    if (x.length === 0) return false;
    return !Number.isNaN(parseFloat(x));
  };
  var maybe2 = (fn) => (x) => {
    if (x === null || x === void 0) return null;
    return fn(x);
  };
  var childIndex = (child) => Array.from(child.parentElement?.children ?? []).indexOf(child);
  var wrap = (root) => {
    const wrapper = hyper2("div")()();
    root.parentElement?.insertBefore(wrapper, root);
    wrapper.appendChild(root);
    return wrapper;
  };
  var icon = (attributes) => (state) => svg("svg")({
    "xmlns": "http://www.w3.org/2000/svg",
    "class": "icon",
    "viewBox": attributes.viewbox,
    "width": 16,
    "hidden": state?.hidden,
    "height": 16,
    "aria-hidden": "true",
    "data-icon": attributes.id
  })(svg("path")({ d: attributes.d })());
  var chevronLeft = icon({
    id: "chevron-left",
    viewbox: "0 0 320 512",
    d: "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
  });
  var chevronRight = icon({
    id: "chevron-right",
    viewbox: "0 0 320 512",
    d: "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
  });
  var caretUp = icon({
    id: "caret-up",
    viewbox: "0 0 320 512",
    d: "M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
  });
  var caretDown = icon({
    id: "caret-down",
    viewbox: "0 0 320 512",
    d: "M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
  });
  var magnifyingGlass = icon({
    id: "magnifying-glass",
    viewbox: "0 0 512 512",
    d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
  });
  var buttonIcon = (icon2) => (id) => (label) => hyper2("button")({
    "type": "button",
    "aria-controls": id
  })(icon2, hyper2("span")({ class: "sr-only" })(label));
  var HTMLDatagridElement = class extends HTMLElement {
    static observedAttributes = ["data-index"];
    _initialised;
    /** Get active table cell */
    get _active() {
      const rows = this.querySelectorAll("tr:not([hidden])");
      const row = document.activeElement?.closest("tr") ?? null;
      const col = document.activeElement?.closest("td") ?? // Link
      document.activeElement?.closest("th") ?? // Button
      document.activeElement;
      const x = maybe2(childIndex)(col) ?? 0;
      const y = row ? Math.max(0, Array.from(rows).indexOf(row)) : 0;
      return { row, col, x, y };
    }
    /** Get view size (visible rows) */
    get _view() {
      const select = document.getElementById(`${this.id}-view`);
      return +(select?.value ?? 0);
    }
    /** Get page count */
    get _max() {
      const rows = this.querySelectorAll("tbody tr:not([data-ignored])");
      return Math.ceil(rows.length / this._view);
    }
    /** Get page index */
    get _index() {
      return +(this.dataset.index ?? 0);
    }
    /** Set page index */
    set _index(n) {
      if (n >= 0 && n < this._max) this.dataset.index = `${n}`;
    }
    /** Change visible rows */
    _paginate(i) {
      const min = this._view * i;
      const max = this._view * (i + 1);
      const rows = this.querySelectorAll("tbody tr:not([data-ignored])");
      rows.forEach((tr, i2) => {
        const hidden = max === 0 ? false : i2 < min || i2 >= max;
        tr.toggleAttribute("hidden", hidden);
      });
      const status = this.querySelector(".status");
      if (status) status.textContent = `Showing ${min + 1} to ${Math.min(max, rows.length)} of ${rows.length} entries`;
    }
    _search(query) {
      this.querySelectorAll("tbody tr").forEach((tr) => {
        const matches = Array.from(tr.querySelectorAll("td")).some((td) => td.textContent.toLocaleLowerCase().includes(query));
        tr.toggleAttribute("data-ignored", !matches);
        tr.toggleAttribute("hidden", true);
      });
    }
    _sort(i) {
      const buttons = this.querySelectorAll("th > button");
      buttons.forEach((button) => {
        button.setAttribute("aria-sort", "none");
        button.querySelectorAll("[data-icon]").forEach((icon2) => icon2.toggleAttribute("hidden", true));
      });
      const cell = this.querySelectorAll("th").item(i);
      const descending = cell.getAttribute("aria-sort") === "descending";
      cell.setAttribute("aria-sort", descending ? "ascending" : "descending");
      cell.querySelector('[data-icon="caret-up"]')?.toggleAttribute("hidden", descending);
      cell.querySelector('[data-icon="caret-down"]')?.toggleAttribute("hidden", !descending);
      const type = cell.getAttribute("data-type");
      const text = (row) => row.children.item(i)?.textContent ?? "";
      const rows = Array.from(this.querySelectorAll("tbody tr")).sort((a, b) => {
        if (type === "number") {
          if (descending) return +text(b) - +text(a);
          return +text(a) - +text(b);
        }
        if (type === "string") {
          if (descending) return text(b).localeCompare(text(a));
          return text(a).localeCompare(text(b));
        }
        return 0;
      });
      rows.forEach((tr, i2) => {
        tr.setAttribute("aria-rowindex", `${i2 + 2}`);
      });
      const tbody = this.querySelector("tbody");
      tbody?.replaceChildren(...rows);
    }
    constructor() {
      super();
      this._initialised = false;
    }
    connectedCallback() {
      if (this._initialised) return;
      this._initialised = true;
      if (this.id === "") this.id = uid();
      const rows = this.querySelectorAll("tr");
      rows.forEach((tr, i) => tr.setAttribute("aria-rowindex", `${i + 1}`));
      const table = this.querySelector("table");
      table?.setAttribute("role", "grid");
      table?.setAttribute("aria-rowcount", `${rows.length + 1}`);
      if (table?.getAttribute("aria-label") === null) table.setAttribute("aria-labelledby", `${this.id}-label`);
      const tbody = this.querySelector("tbody");
      tbody?.setAttribute("id", `${this.id}-container`);
      const ths = this.querySelectorAll("th");
      ths.forEach((th, i) => {
        th.setAttribute("aria-sort", "none");
        const cells2 = Array.from(this.querySelectorAll(`td:nth-child(${i + 1})`));
        th.setAttribute("data-type", cells2.some((cell) => maybe2(number)(cell.textContent)) ? "number" : "string");
        th.replaceChildren(hyper2("button")({
          "type": "button",
          "data-action": "sort",
          "tabindex": i === 0 ? "0" : "-1"
        })(
          caretUp({ hidden: true }),
          caretDown({ hidden: true }),
          ...th.childNodes
        ));
      });
      const cells = this.querySelectorAll("td");
      cells.forEach((td) => {
        (td.querySelector("a") ?? td).setAttribute("tabindex", "-1");
      });
      const thead = this.querySelector("thead");
      thead?.addEventListener("click", (event) => {
        const target = event.target;
        const button = target?.closest("button") ?? target;
        if (button?.dataset.action === "sort") {
          const i = maybe2(childIndex)(button.closest("th"));
          if (typeof i === "number") {
            this._sort(i);
            this._index = 0;
          }
        }
      }, { passive: true });
      const wrapper = maybe2(wrap)(table);
      wrapper?.classList.add("datagrid");
      if (wrapper) this.append(wrapper);
      const createFocus = (event) => (cell) => {
        const root = cell.querySelector("[tabindex]") ?? cell;
        event.preventDefault();
        document.activeElement?.setAttribute("tabindex", "-1");
        root.setAttribute("tabindex", "0");
        root.focus();
      };
      table?.addEventListener("keydown", (event) => {
        const rows2 = this.querySelectorAll("tr:not([hidden])");
        const { row, x, y } = this._active;
        const focus = maybe2(createFocus(event));
        if (event.key === "ArrowLeft" && x !== 0) focus(row?.children.item(x - 1));
        if (event.key === "ArrowRight" && x < (row?.children.length ?? 0)) focus(row?.children.item(x + 1));
        if (event.key === "ArrowUp" && y > 0) focus(rows2.item(y - 1).children.item(x));
        if (event.key === "ArrowDown" && y < rows2.length - 1) focus(rows2.item(y + 1).children.item(x));
        if (event.key === "PageUp" && this._index > 0) {
          this._index -= 1;
          const rows3 = this.querySelectorAll("tr:not([hidden])");
          focus(rows3.item(Math.min(rows3.length - 1, y)).children.item(x));
        }
        if (event.key === "PageDown" && this._index < this._max - 1) {
          this._index += 1;
          const rows3 = this.querySelectorAll("tr:not([hidden])");
          focus(rows3.item(Math.min(rows3.length - 1, y)).children.item(x));
        }
        if (event.key === "Home") {
          if (event.ctrlKey) {
            this._index = 0;
            focus(rows2.item(0).children.item(0));
          } else {
            focus(row?.children.item(0));
          }
        }
        if (event.key === "End") {
          if (event.ctrlKey) {
            this._index = this._max - 1;
            const rows3 = this.querySelectorAll("tr:not([hidden])");
            const row2 = rows3.item(rows3.length - 1);
            focus(row2.children.item(row2.children.length - 1));
          } else {
            focus(row?.children.item(row.children.length - 1));
          }
        }
      });
      const inputSearch = hyper2("input")({ type: "search", id: `${this.id}-search` })();
      const buttonSearch = buttonIcon(magnifyingGlass())(`${this.id}-search`)("Search");
      const search = () => {
        this._search(inputSearch.value.toLocaleLowerCase());
        this._index = 0;
      };
      inputSearch.addEventListener("change", search, { passive: true });
      buttonSearch.addEventListener("click", search, { passive: true });
      const selectView = hyper2("select")({ id: `${this.id}-view` })(
        hyper2("option")({ value: 10 })("10"),
        hyper2("option")({ value: 25, selected: true })("25"),
        hyper2("option")({ value: 50 })("50"),
        hyper2("option")({ value: 0 })("All")
      );
      selectView.addEventListener("change", () => {
        this._paginate(Math.min(this._index, this._max));
        if (this.querySelector('table [tabindex="0"]')?.closest("tr")?.hidden) {
          this.querySelector("table th button")?.setAttribute("tabindex", "0");
        }
      }, { passive: true });
      this.prepend(hyper2("div")({ class: "toolbar" })(
        hyper2("div")({ class: "view" })(
          hyper2("label")({ for: `${this.id}-view` })("Show entries"),
          selectView
        ),
        hyper2("div")({ class: "search" })(
          hyper2("label")({ for: `${this.id}-search` })("Search"),
          inputSearch,
          buttonSearch
        )
      ));
      const buttonPrevious = buttonIcon(chevronLeft())(`${this.id}-container`)("Previous");
      buttonPrevious.addEventListener("click", () => {
        this._index -= 1;
      }, { passive: true });
      const buttonNext = buttonIcon(chevronRight())(`${this.id}-container`)("Next");
      buttonNext.addEventListener("click", () => {
        this._index += 1;
      }, { passive: true });
      this.appendChild(hyper2("div")({ class: "footer" })(
        hyper2("p")({ class: "status" })(),
        hyper2("div")({ class: "controls" })(buttonPrevious, buttonNext)
      ));
      this._paginate(0);
    }
    attributeChangedCallback(attribute) {
      if (attribute === "data-index") this._paginate(this._index);
    }
  };

  // src/index.ts
  customElements.define("chrono-datagrid", HTMLDatagridElement);
  var read = async (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
  var parse = (x) => {
    const materials = /* @__PURE__ */ new Map();
    let current = null;
    x.split(/\r?\n/).forEach((line) => {
      const name = /(.*)\s*{/.exec(line)?.[1]?.trim();
      if (typeof name === "string") {
        materials.set(name, /* @__PURE__ */ new Map());
        current = name;
      }
      const matches = /\w:(\w+)=(.+)/.exec(line);
      if (current !== null && typeof matches?.[1] === "string" && typeof matches[2] === "string") materials.get(current)?.set(matches[1], matches[2]);
    });
    materials.forEach((material, name) => {
      if (material.size === 0) materials.delete(name);
    });
    return materials;
  };
  var input = document.getElementById("cfg");
  input?.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    const raw = await read(file);
    if (typeof raw !== "string") return;
    const materials = parse(raw);
    const keys = Array.from(new Set(Array.from(materials.values().map((material) => Array.from(material.keys()))).flat()));
    console.log(keys);
    const table = hyper("chrono-datagrid")({ id: "materials" })(
      hyper("h2")({ id: "materials-label" })("Materials"),
      hyper("table")()(
        hyper("thead")()(
          hyper("tr")()(...[
            "Name",
            ...keys
          ].map((key) => hyper("th")()(key)))
        ),
        hyper("tbody")()(...Array.from(materials.entries()).map(([name, material]) => hyper("tr")()(
          hyper("td")()(name),
          ...keys.map((key) => hyper("td")()(material.get(key) ?? ""))
        )))
      )
    );
    document.getElementById("output")?.replaceChildren(table);
  }, { passive: true });
})();
