!(function(t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = t || self).WaterHeaterCard = e())
})(this, function() {
  'use strict'
  const t =
      'undefined' != typeof window &&
      null != window.customElements &&
      void 0 !== window.customElements.polyfillWrapFlushCallback,
    e = (t, e, n = null) => {
      for (; e !== n; ) {
        const n = e.nextSibling
        t.removeChild(e), (e = n)
      }
    },
    n = `{{lit-${String(Math.random()).slice(2)}}}`,
    i = `\x3c!--${n}--\x3e`,
    r = new RegExp(`${n}|${i}`)
  class s {
    constructor(t, e) {
      ;(this.parts = []), (this.element = e)
      const i = [],
        s = [],
        a = document.createTreeWalker(e.content, 133, null, !1)
      let u = 0,
        d = -1,
        h = 0
      const {
        strings: p,
        values: { length: f },
      } = t
      for (; h < f; ) {
        const t = a.nextNode()
        if (null !== t) {
          if ((d++, 1 === t.nodeType)) {
            if (t.hasAttributes()) {
              const e = t.attributes,
                { length: n } = e
              let i = 0
              for (let t = 0; t < n; t++) o(e[t].name, '$lit$') && i++
              for (; i-- > 0; ) {
                const e = p[h],
                  n = l.exec(e)[2],
                  i = n.toLowerCase() + '$lit$',
                  s = t.getAttribute(i)
                t.removeAttribute(i)
                const o = s.split(r)
                this.parts.push({
                  type: 'attribute',
                  index: d,
                  name: n,
                  strings: o,
                }),
                  (h += o.length - 1)
              }
            }
            'TEMPLATE' === t.tagName && (s.push(t), (a.currentNode = t.content))
          } else if (3 === t.nodeType) {
            const e = t.data
            if (e.indexOf(n) >= 0) {
              const n = t.parentNode,
                s = e.split(r),
                a = s.length - 1
              for (let e = 0; e < a; e++) {
                let i,
                  r = s[e]
                if ('' === r) i = c()
                else {
                  const t = l.exec(r)
                  null !== t &&
                    o(t[2], '$lit$') &&
                    (r =
                      r.slice(0, t.index) +
                      t[1] +
                      t[2].slice(0, -'$lit$'.length) +
                      t[3]),
                    (i = document.createTextNode(r))
                }
                n.insertBefore(i, t),
                  this.parts.push({ type: 'node', index: ++d })
              }
              '' === s[a]
                ? (n.insertBefore(c(), t), i.push(t))
                : (t.data = s[a]),
                (h += a)
            }
          } else if (8 === t.nodeType)
            if (t.data === n) {
              const e = t.parentNode
              ;(null !== t.previousSibling && d !== u) ||
                (d++, e.insertBefore(c(), t)),
                (u = d),
                this.parts.push({ type: 'node', index: d }),
                null === t.nextSibling ? (t.data = '') : (i.push(t), d--),
                h++
            } else {
              let e = -1
              for (; -1 !== (e = t.data.indexOf(n, e + 1)); )
                this.parts.push({ type: 'node', index: -1 }), h++
            }
        } else a.currentNode = s.pop()
      }
      for (const t of i) t.parentNode.removeChild(t)
    }
  }
  const o = (t, e) => {
      const n = t.length - e.length
      return n >= 0 && t.slice(n) === e
    },
    a = t => -1 !== t.index,
    c = () => document.createComment(''),
    l = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
  function u(t, e) {
    const {
        element: { content: n },
        parts: i,
      } = t,
      r = document.createTreeWalker(n, 133, null, !1)
    let s = h(i),
      o = i[s],
      a = -1,
      c = 0
    const l = []
    let u = null
    for (; r.nextNode(); ) {
      a++
      const t = r.currentNode
      for (
        t.previousSibling === u && (u = null),
          e.has(t) && (l.push(t), null === u && (u = t)),
          null !== u && c++;
        void 0 !== o && o.index === a;

      )
        (o.index = null !== u ? -1 : o.index - c), (s = h(i, s)), (o = i[s])
    }
    l.forEach(t => t.parentNode.removeChild(t))
  }
  const d = t => {
      let e = 11 === t.nodeType ? 0 : 1
      const n = document.createTreeWalker(t, 133, null, !1)
      for (; n.nextNode(); ) e++
      return e
    },
    h = (t, e = -1) => {
      for (let n = e + 1; n < t.length; n++) {
        const e = t[n]
        if (a(e)) return n
      }
      return -1
    }
  const p = new WeakMap(),
    f = t => 'function' == typeof t && p.has(t),
    _ = {},
    g = {}
  class m {
    constructor(t, e, n) {
      ;(this.__parts = []),
        (this.template = t),
        (this.processor = e),
        (this.options = n)
    }
    update(t) {
      let e = 0
      for (const n of this.__parts) void 0 !== n && n.setValue(t[e]), e++
      for (const t of this.__parts) void 0 !== t && t.commit()
    }
    _clone() {
      const e = t
          ? this.template.element.content.cloneNode(!0)
          : document.importNode(this.template.element.content, !0),
        n = [],
        i = this.template.parts,
        r = document.createTreeWalker(e, 133, null, !1)
      let s,
        o = 0,
        c = 0,
        l = r.nextNode()
      for (; o < i.length; )
        if (((s = i[o]), a(s))) {
          for (; c < s.index; )
            c++,
              'TEMPLATE' === l.nodeName &&
                (n.push(l), (r.currentNode = l.content)),
              null === (l = r.nextNode()) &&
                ((r.currentNode = n.pop()), (l = r.nextNode()))
          if ('node' === s.type) {
            const t = this.processor.handleTextExpression(this.options)
            t.insertAfterNode(l.previousSibling), this.__parts.push(t)
          } else
            this.__parts.push(
              ...this.processor.handleAttributeExpressions(
                l,
                s.name,
                s.strings,
                this.options
              )
            )
          o++
        } else this.__parts.push(void 0), o++
      return t && (document.adoptNode(e), customElements.upgrade(e)), e
    }
  }
  const y = ` ${n} `
  class v {
    constructor(t, e, n, i) {
      ;(this.strings = t),
        (this.values = e),
        (this.type = n),
        (this.processor = i)
    }
    getHTML() {
      const t = this.strings.length - 1
      let e = '',
        r = !1
      for (let s = 0; s < t; s++) {
        const t = this.strings[s],
          o = t.lastIndexOf('\x3c!--')
        r = (o > -1 || r) && -1 === t.indexOf('--\x3e', o + 1)
        const a = l.exec(t)
        e +=
          null === a
            ? t + (r ? y : i)
            : t.substr(0, a.index) + a[1] + a[2] + '$lit$' + a[3] + n
      }
      return (e += this.strings[t]), e
    }
    getTemplateElement() {
      const t = document.createElement('template')
      return (t.innerHTML = this.getHTML()), t
    }
  }
  const b = t =>
      null === t || !('object' == typeof t || 'function' == typeof t),
    w = t => Array.isArray(t) || !(!t || !t[Symbol.iterator])
  class S {
    constructor(t, e, n) {
      ;(this.dirty = !0),
        (this.element = t),
        (this.name = e),
        (this.strings = n),
        (this.parts = [])
      for (let t = 0; t < n.length - 1; t++) this.parts[t] = this._createPart()
    }
    _createPart() {
      return new x(this)
    }
    _getValue() {
      const t = this.strings,
        e = t.length - 1
      let n = ''
      for (let i = 0; i < e; i++) {
        n += t[i]
        const e = this.parts[i]
        if (void 0 !== e) {
          const t = e.value
          if (b(t) || !w(t)) n += 'string' == typeof t ? t : String(t)
          else for (const e of t) n += 'string' == typeof e ? e : String(e)
        }
      }
      return (n += t[e]), n
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1),
        this.element.setAttribute(this.name, this._getValue()))
    }
  }
  class x {
    constructor(t) {
      ;(this.value = void 0), (this.committer = t)
    }
    setValue(t) {
      t === _ ||
        (b(t) && t === this.value) ||
        ((this.value = t), f(t) || (this.committer.dirty = !0))
    }
    commit() {
      for (; f(this.value); ) {
        const t = this.value
        ;(this.value = _), t(this)
      }
      this.value !== _ && this.committer.commit()
    }
  }
  class j {
    constructor(t) {
      ;(this.value = void 0), (this.__pendingValue = void 0), (this.options = t)
    }
    appendInto(t) {
      ;(this.startNode = t.appendChild(c())),
        (this.endNode = t.appendChild(c()))
    }
    insertAfterNode(t) {
      ;(this.startNode = t), (this.endNode = t.nextSibling)
    }
    appendIntoPart(t) {
      t.__insert((this.startNode = c())), t.__insert((this.endNode = c()))
    }
    insertAfterPart(t) {
      t.__insert((this.startNode = c())),
        (this.endNode = t.endNode),
        (t.endNode = this.startNode)
    }
    setValue(t) {
      this.__pendingValue = t
    }
    commit() {
      if (null === this.startNode.parentNode) return
      for (; f(this.__pendingValue); ) {
        const t = this.__pendingValue
        ;(this.__pendingValue = _), t(this)
      }
      const t = this.__pendingValue
      t !== _ &&
        (b(t)
          ? t !== this.value && this.__commitText(t)
          : t instanceof v
          ? this.__commitTemplateResult(t)
          : t instanceof Node
          ? this.__commitNode(t)
          : w(t)
          ? this.__commitIterable(t)
          : t === g
          ? ((this.value = g), this.clear())
          : this.__commitText(t))
    }
    __insert(t) {
      this.endNode.parentNode.insertBefore(t, this.endNode)
    }
    __commitNode(t) {
      this.value !== t && (this.clear(), this.__insert(t), (this.value = t))
    }
    __commitText(t) {
      const e = this.startNode.nextSibling,
        n = 'string' == typeof (t = null == t ? '' : t) ? t : String(t)
      e === this.endNode.previousSibling && 3 === e.nodeType
        ? (e.data = n)
        : this.__commitNode(document.createTextNode(n)),
        (this.value = t)
    }
    __commitTemplateResult(t) {
      const e = this.options.templateFactory(t)
      if (this.value instanceof m && this.value.template === e)
        this.value.update(t.values)
      else {
        const n = new m(e, t.processor, this.options),
          i = n._clone()
        n.update(t.values), this.__commitNode(i), (this.value = n)
      }
    }
    __commitIterable(t) {
      Array.isArray(this.value) || ((this.value = []), this.clear())
      const e = this.value
      let n,
        i = 0
      for (const r of t)
        (n = e[i]),
          void 0 === n &&
            ((n = new j(this.options)),
            e.push(n),
            0 === i ? n.appendIntoPart(this) : n.insertAfterPart(e[i - 1])),
          n.setValue(r),
          n.commit(),
          i++
      i < e.length && ((e.length = i), this.clear(n && n.endNode))
    }
    clear(t = this.startNode) {
      e(this.startNode.parentNode, t.nextSibling, this.endNode)
    }
  }
  class P {
    constructor(t, e, n) {
      if (
        ((this.value = void 0),
        (this.__pendingValue = void 0),
        2 !== n.length || '' !== n[0] || '' !== n[1])
      )
        throw new Error(
          'Boolean attributes can only contain a single expression'
        )
      ;(this.element = t), (this.name = e), (this.strings = n)
    }
    setValue(t) {
      this.__pendingValue = t
    }
    commit() {
      for (; f(this.__pendingValue); ) {
        const t = this.__pendingValue
        ;(this.__pendingValue = _), t(this)
      }
      if (this.__pendingValue === _) return
      const t = !!this.__pendingValue
      this.value !== t &&
        (t
          ? this.element.setAttribute(this.name, '')
          : this.element.removeAttribute(this.name),
        (this.value = t)),
        (this.__pendingValue = _)
    }
  }
  class A extends S {
    constructor(t, e, n) {
      super(t, e, n),
        (this.single = 2 === n.length && '' === n[0] && '' === n[1])
    }
    _createPart() {
      return new O(this)
    }
    _getValue() {
      return this.single ? this.parts[0].value : super._getValue()
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1), (this.element[this.name] = this._getValue()))
    }
  }
  class O extends x {}
  let z = !1
  ;(() => {
    try {
      const t = {
        get capture() {
          return (z = !0), !1
        },
      }
      window.addEventListener('test', t, t),
        window.removeEventListener('test', t, t)
    } catch (t) {}
  })()
  class N {
    constructor(t, e, n) {
      ;(this.value = void 0),
        (this.__pendingValue = void 0),
        (this.element = t),
        (this.eventName = e),
        (this.eventContext = n),
        (this.__boundHandleEvent = t => this.handleEvent(t))
    }
    setValue(t) {
      this.__pendingValue = t
    }
    commit() {
      for (; f(this.__pendingValue); ) {
        const t = this.__pendingValue
        ;(this.__pendingValue = _), t(this)
      }
      if (this.__pendingValue === _) return
      const t = this.__pendingValue,
        e = this.value,
        n =
          null == t ||
          (null != e &&
            (t.capture !== e.capture ||
              t.once !== e.once ||
              t.passive !== e.passive)),
        i = null != t && (null == e || n)
      n &&
        this.element.removeEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        ),
        i &&
          ((this.__options = E(t)),
          this.element.addEventListener(
            this.eventName,
            this.__boundHandleEvent,
            this.__options
          )),
        (this.value = t),
        (this.__pendingValue = _)
    }
    handleEvent(t) {
      'function' == typeof this.value
        ? this.value.call(this.eventContext || this.element, t)
        : this.value.handleEvent(t)
    }
  }
  const E = t =>
    t &&
    (z ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture)
  function T(t) {
    let e = C.get(t.type)
    void 0 === e &&
      ((e = { stringsArray: new WeakMap(), keyString: new Map() }),
      C.set(t.type, e))
    let i = e.stringsArray.get(t.strings)
    if (void 0 !== i) return i
    const r = t.strings.join(n)
    return (
      (i = e.keyString.get(r)),
      void 0 === i &&
        ((i = new s(t, t.getTemplateElement())), e.keyString.set(r, i)),
      e.stringsArray.set(t.strings, i),
      i
    )
  }
  const C = new Map(),
    $ = new WeakMap()
  const k = new (class {
    handleAttributeExpressions(t, e, n, i) {
      const r = e[0]
      if ('.' === r) {
        return new A(t, e.slice(1), n).parts
      }
      if ('@' === r) return [new N(t, e.slice(1), i.eventContext)]
      if ('?' === r) return [new P(t, e.slice(1), n)]
      return new S(t, e, n).parts
    }
    handleTextExpression(t) {
      return new j(t)
    }
  })()
  'undefined' != typeof window &&
    (window.litHtmlVersions || (window.litHtmlVersions = [])).push('1.2.1')
  const V = (t, ...e) => new v(t, e, 'html', k),
    U = (t, e) => `${t}--${e}`
  let M = !0
  void 0 === window.ShadyCSS
    ? (M = !1)
    : void 0 === window.ShadyCSS.prepareTemplateDom &&
      (console.warn(
        'Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.'
      ),
      (M = !1))
  const R = t => e => {
      const i = U(e.type, t)
      let r = C.get(i)
      void 0 === r &&
        ((r = { stringsArray: new WeakMap(), keyString: new Map() }),
        C.set(i, r))
      let o = r.stringsArray.get(e.strings)
      if (void 0 !== o) return o
      const a = e.strings.join(n)
      if (((o = r.keyString.get(a)), void 0 === o)) {
        const n = e.getTemplateElement()
        M && window.ShadyCSS.prepareTemplateDom(n, t),
          (o = new s(e, n)),
          r.keyString.set(a, o)
      }
      return r.stringsArray.set(e.strings, o), o
    },
    F = ['html', 'svg'],
    I = new Set(),
    B = (t, e, n) => {
      I.add(t)
      const i = n ? n.element : document.createElement('template'),
        r = e.querySelectorAll('style'),
        { length: s } = r
      if (0 === s) return void window.ShadyCSS.prepareTemplateStyles(i, t)
      const o = document.createElement('style')
      for (let t = 0; t < s; t++) {
        const e = r[t]
        e.parentNode.removeChild(e), (o.textContent += e.textContent)
      }
      ;(t => {
        F.forEach(e => {
          const n = C.get(U(e, t))
          void 0 !== n &&
            n.keyString.forEach(t => {
              const {
                  element: { content: e },
                } = t,
                n = new Set()
              Array.from(e.querySelectorAll('style')).forEach(t => {
                n.add(t)
              }),
                u(t, n)
            })
        })
      })(t)
      const a = i.content
      n
        ? (function(t, e, n = null) {
            const {
              element: { content: i },
              parts: r,
            } = t
            if (null == n) return void i.appendChild(e)
            const s = document.createTreeWalker(i, 133, null, !1)
            let o = h(r),
              a = 0,
              c = -1
            for (; s.nextNode(); ) {
              c++
              for (
                s.currentNode === n &&
                ((a = d(e)), n.parentNode.insertBefore(e, n));
                -1 !== o && r[o].index === c;

              ) {
                if (a > 0) {
                  for (; -1 !== o; ) (r[o].index += a), (o = h(r, o))
                  return
                }
                o = h(r, o)
              }
            }
          })(n, o, a.firstChild)
        : a.insertBefore(o, a.firstChild),
        window.ShadyCSS.prepareTemplateStyles(i, t)
      const c = a.querySelector('style')
      if (window.ShadyCSS.nativeShadow && null !== c)
        e.insertBefore(c.cloneNode(!0), e.firstChild)
      else if (n) {
        a.insertBefore(o, a.firstChild)
        const t = new Set()
        t.add(o), u(n, t)
      }
    }
  window.JSCompiler_renameProperty = (t, e) => t
  const D = {
      toAttribute(t, e) {
        switch (e) {
          case Boolean:
            return t ? '' : null
          case Object:
          case Array:
            return null == t ? t : JSON.stringify(t)
        }
        return t
      },
      fromAttribute(t, e) {
        switch (e) {
          case Boolean:
            return null !== t
          case Number:
            return null === t ? null : Number(t)
          case Object:
          case Array:
            return JSON.parse(t)
        }
        return t
      },
    },
    q = (t, e) => e !== t && (e == e || t == t),
    L = {
      attribute: !0,
      type: String,
      converter: D,
      reflect: !1,
      hasChanged: q,
    }
  class W extends HTMLElement {
    constructor() {
      super(),
        (this._updateState = 0),
        (this._instanceProperties = void 0),
        (this._updatePromise = new Promise(
          t => (this._enableUpdatingResolver = t)
        )),
        (this._changedProperties = new Map()),
        (this._reflectingProperties = void 0),
        this.initialize()
    }
    static get observedAttributes() {
      this.finalize()
      const t = []
      return (
        this._classProperties.forEach((e, n) => {
          const i = this._attributeNameForProperty(n, e)
          void 0 !== i && (this._attributeToPropertyMap.set(i, n), t.push(i))
        }),
        t
      )
    }
    static _ensureClassProperties() {
      if (
        !this.hasOwnProperty(
          JSCompiler_renameProperty('_classProperties', this)
        )
      ) {
        this._classProperties = new Map()
        const t = Object.getPrototypeOf(this)._classProperties
        void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t))
      }
    }
    static createProperty(t, e = L) {
      if (
        (this._ensureClassProperties(),
        this._classProperties.set(t, e),
        e.noAccessor || this.prototype.hasOwnProperty(t))
      )
        return
      const n = 'symbol' == typeof t ? Symbol() : '__' + t,
        i = this.getPropertyDescriptor(t, n, e)
      void 0 !== i && Object.defineProperty(this.prototype, t, i)
    }
    static getPropertyDescriptor(t, e, n) {
      return {
        get() {
          return this[e]
        },
        set(n) {
          const i = this[t]
          ;(this[e] = n), this._requestUpdate(t, i)
        },
        configurable: !0,
        enumerable: !0,
      }
    }
    static getPropertyOptions(t) {
      return (this._classProperties && this._classProperties.get(t)) || L
    }
    static finalize() {
      const t = Object.getPrototypeOf(this)
      if (
        (t.hasOwnProperty('finalized') || t.finalize(),
        (this.finalized = !0),
        this._ensureClassProperties(),
        (this._attributeToPropertyMap = new Map()),
        this.hasOwnProperty(JSCompiler_renameProperty('properties', this)))
      ) {
        const t = this.properties,
          e = [
            ...Object.getOwnPropertyNames(t),
            ...('function' == typeof Object.getOwnPropertySymbols
              ? Object.getOwnPropertySymbols(t)
              : []),
          ]
        for (const n of e) this.createProperty(n, t[n])
      }
    }
    static _attributeNameForProperty(t, e) {
      const n = e.attribute
      return !1 === n
        ? void 0
        : 'string' == typeof n
        ? n
        : 'string' == typeof t
        ? t.toLowerCase()
        : void 0
    }
    static _valueHasChanged(t, e, n = q) {
      return n(t, e)
    }
    static _propertyValueFromAttribute(t, e) {
      const n = e.type,
        i = e.converter || D,
        r = 'function' == typeof i ? i : i.fromAttribute
      return r ? r(t, n) : t
    }
    static _propertyValueToAttribute(t, e) {
      if (void 0 === e.reflect) return
      const n = e.type,
        i = e.converter
      return ((i && i.toAttribute) || D.toAttribute)(t, n)
    }
    initialize() {
      this._saveInstanceProperties(), this._requestUpdate()
    }
    _saveInstanceProperties() {
      this.constructor._classProperties.forEach((t, e) => {
        if (this.hasOwnProperty(e)) {
          const t = this[e]
          delete this[e],
            this._instanceProperties || (this._instanceProperties = new Map()),
            this._instanceProperties.set(e, t)
        }
      })
    }
    _applyInstanceProperties() {
      this._instanceProperties.forEach((t, e) => (this[e] = t)),
        (this._instanceProperties = void 0)
    }
    connectedCallback() {
      this.enableUpdating()
    }
    enableUpdating() {
      void 0 !== this._enableUpdatingResolver &&
        (this._enableUpdatingResolver(),
        (this._enableUpdatingResolver = void 0))
    }
    disconnectedCallback() {}
    attributeChangedCallback(t, e, n) {
      e !== n && this._attributeToProperty(t, n)
    }
    _propertyToAttribute(t, e, n = L) {
      const i = this.constructor,
        r = i._attributeNameForProperty(t, n)
      if (void 0 !== r) {
        const t = i._propertyValueToAttribute(e, n)
        if (void 0 === t) return
        ;(this._updateState = 8 | this._updateState),
          null == t ? this.removeAttribute(r) : this.setAttribute(r, t),
          (this._updateState = -9 & this._updateState)
      }
    }
    _attributeToProperty(t, e) {
      if (8 & this._updateState) return
      const n = this.constructor,
        i = n._attributeToPropertyMap.get(t)
      if (void 0 !== i) {
        const t = n.getPropertyOptions(i)
        ;(this._updateState = 16 | this._updateState),
          (this[i] = n._propertyValueFromAttribute(e, t)),
          (this._updateState = -17 & this._updateState)
      }
    }
    _requestUpdate(t, e) {
      let n = !0
      if (void 0 !== t) {
        const i = this.constructor,
          r = i.getPropertyOptions(t)
        i._valueHasChanged(this[t], e, r.hasChanged)
          ? (this._changedProperties.has(t) ||
              this._changedProperties.set(t, e),
            !0 !== r.reflect ||
              16 & this._updateState ||
              (void 0 === this._reflectingProperties &&
                (this._reflectingProperties = new Map()),
              this._reflectingProperties.set(t, r)))
          : (n = !1)
      }
      !this._hasRequestedUpdate &&
        n &&
        (this._updatePromise = this._enqueueUpdate())
    }
    requestUpdate(t, e) {
      return this._requestUpdate(t, e), this.updateComplete
    }
    async _enqueueUpdate() {
      this._updateState = 4 | this._updateState
      try {
        await this._updatePromise
      } catch (t) {}
      const t = this.performUpdate()
      return null != t && (await t), !this._hasRequestedUpdate
    }
    get _hasRequestedUpdate() {
      return 4 & this._updateState
    }
    get hasUpdated() {
      return 1 & this._updateState
    }
    performUpdate() {
      this._instanceProperties && this._applyInstanceProperties()
      let t = !1
      const e = this._changedProperties
      try {
        ;(t = this.shouldUpdate(e)), t ? this.update(e) : this._markUpdated()
      } catch (e) {
        throw ((t = !1), this._markUpdated(), e)
      }
      t &&
        (1 & this._updateState ||
          ((this._updateState = 1 | this._updateState), this.firstUpdated(e)),
        this.updated(e))
    }
    _markUpdated() {
      ;(this._changedProperties = new Map()),
        (this._updateState = -5 & this._updateState)
    }
    get updateComplete() {
      return this._getUpdateComplete()
    }
    _getUpdateComplete() {
      return this._updatePromise
    }
    shouldUpdate(t) {
      return !0
    }
    update(t) {
      void 0 !== this._reflectingProperties &&
        this._reflectingProperties.size > 0 &&
        (this._reflectingProperties.forEach((t, e) =>
          this._propertyToAttribute(e, this[e], t)
        ),
        (this._reflectingProperties = void 0)),
        this._markUpdated()
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  W.finalized = !0
  const H =
      'adoptedStyleSheets' in Document.prototype &&
      'replace' in CSSStyleSheet.prototype,
    J = Symbol()
  class G {
    constructor(t, e) {
      if (e !== J)
        throw new Error(
          'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
        )
      this.cssText = t
    }
    get styleSheet() {
      return (
        void 0 === this._styleSheet &&
          (H
            ? ((this._styleSheet = new CSSStyleSheet()),
              this._styleSheet.replaceSync(this.cssText))
            : (this._styleSheet = null)),
        this._styleSheet
      )
    }
    toString() {
      return this.cssText
    }
  }
  ;(window.litElementVersions || (window.litElementVersions = [])).push('2.3.1')
  const K = {}
  class Y extends W {
    static getStyles() {
      return this.styles
    }
    static _getUniqueStyles() {
      if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this)))
        return
      const t = this.getStyles()
      if (void 0 === t) this._styles = []
      else if (Array.isArray(t)) {
        const e = (t, n) =>
            t.reduceRight(
              (t, n) => (Array.isArray(n) ? e(n, t) : (t.add(n), t)),
              n
            ),
          n = e(t, new Set()),
          i = []
        n.forEach(t => i.unshift(t)), (this._styles = i)
      } else this._styles = [t]
    }
    initialize() {
      super.initialize(),
        this.constructor._getUniqueStyles(),
        (this.renderRoot = this.createRenderRoot()),
        window.ShadowRoot &&
          this.renderRoot instanceof window.ShadowRoot &&
          this.adoptStyles()
    }
    createRenderRoot() {
      return this.attachShadow({ mode: 'open' })
    }
    adoptStyles() {
      const t = this.constructor._styles
      0 !== t.length &&
        (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
          ? H
            ? (this.renderRoot.adoptedStyleSheets = t.map(t => t.styleSheet))
            : (this._needsShimAdoptedStyleSheets = !0)
          : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
              t.map(t => t.cssText),
              this.localName
            ))
    }
    connectedCallback() {
      super.connectedCallback(),
        this.hasUpdated &&
          void 0 !== window.ShadyCSS &&
          window.ShadyCSS.styleElement(this)
    }
    update(t) {
      const e = this.render()
      super.update(t),
        e !== K &&
          this.constructor.render(e, this.renderRoot, {
            scopeName: this.localName,
            eventContext: this,
          }),
        this._needsShimAdoptedStyleSheets &&
          ((this._needsShimAdoptedStyleSheets = !1),
          this.constructor._styles.forEach(t => {
            const e = document.createElement('style')
            ;(e.textContent = t.cssText), this.renderRoot.appendChild(e)
          }))
    }
    render() {
      return K
    }
  }
  ;(Y.finalized = !0),
    (Y.render = (t, n, i) => {
      if (!i || 'object' != typeof i || !i.scopeName)
        throw new Error('The `scopeName` option is required.')
      const r = i.scopeName,
        s = $.has(n),
        o = M && 11 === n.nodeType && !!n.host,
        a = o && !I.has(r),
        c = a ? document.createDocumentFragment() : n
      if (
        (((t, n, i) => {
          let r = $.get(n)
          void 0 === r &&
            (e(n, n.firstChild),
            $.set(n, (r = new j(Object.assign({ templateFactory: T }, i)))),
            r.appendInto(n)),
            r.setValue(t),
            r.commit()
        })(t, c, Object.assign({ templateFactory: R(r) }, i)),
        a)
      ) {
        const t = $.get(c)
        $.delete(c)
        const i = t.value instanceof m ? t.value.template : void 0
        B(r, c, i), e(n, n.firstChild), n.appendChild(c), $.set(n, t)
      }
      !s && o && window.ShadyCSS.styleElement(n.host)
    })
  const Q = (t, e, n, i) => {
      if ('length' === n || 'prototype' === n) return
      const r = Object.getOwnPropertyDescriptor(t, n),
        s = Object.getOwnPropertyDescriptor(e, n)
      ;(!X(r, s) && i) || Object.defineProperty(t, n, s)
    },
    X = function(t, e) {
      return (
        void 0 === t ||
        t.configurable ||
        (t.writable === e.writable &&
          t.enumerable === e.enumerable &&
          t.configurable === e.configurable &&
          (t.writable || t.value === e.value))
      )
    },
    Z = (t, e) => `/* Wrapped ${t}*/\n${e}`,
    tt = Object.getOwnPropertyDescriptor(Function.prototype, 'toString'),
    et = Object.getOwnPropertyDescriptor(Function.prototype.toString, 'name')
  var nt = (t, e, { ignoreNonConfigurable: n = !1 } = {}) => {
      const { name: i } = t
      for (const i of Reflect.ownKeys(e)) Q(t, e, i, n)
      return (
        ((t, e) => {
          const n = Object.getPrototypeOf(e)
          n !== Object.getPrototypeOf(t) && Object.setPrototypeOf(t, n)
        })(t, e),
        ((t, e, n) => {
          const i = '' === n ? '' : `with ${n.trim()}() `,
            r = Z.bind(null, i, e.toString())
          Object.defineProperty(r, 'name', et),
            Object.defineProperty(t, 'toString', { ...tt, value: r })
        })(t, e, i),
        t
      )
    },
    it = (t, e = {}) => {
      if ('function' != typeof t)
        throw new TypeError(
          `Expected the first argument to be a function, got \`${typeof t}\``
        )
      const { wait: n = 0, before: i = !1, after: r = !0 } = e
      if (!i && !r)
        throw new Error(
          "Both `before` and `after` are false, function wouldn't be called."
        )
      let s, o
      const a = function(...e) {
        const a = this,
          c = i && !s
        return (
          clearTimeout(s),
          (s = setTimeout(() => {
            ;(s = void 0), r && (o = t.apply(a, e))
          }, n)),
          c && (o = t.apply(a, e)),
          o
        )
      }
      return (
        nt(a, t),
        (a.cancel = () => {
          s && (clearTimeout(s), (s = void 0))
        }),
        a
      )
    },
    rt =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {}
  var st = (function(t, e, n) {
    return (
      t(
        (n = {
          path: e,
          exports: {},
          require: function(t, e) {
            return (function() {
              throw new Error(
                'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
              )
            })(null == e && n.path)
          },
        }),
        n.exports
      ),
      n.exports
    )
  })(function(t, e) {
    var n = '[object Arguments]',
      i = '[object Map]',
      r = '[object Object]',
      s = '[object Set]',
      o = /^\[object .+?Constructor\]$/,
      a = /^(?:0|[1-9]\d*)$/,
      c = {}
    ;(c['[object Float32Array]'] = c['[object Float64Array]'] = c[
      '[object Int8Array]'
    ] = c['[object Int16Array]'] = c['[object Int32Array]'] = c[
      '[object Uint8Array]'
    ] = c['[object Uint8ClampedArray]'] = c['[object Uint16Array]'] = c[
      '[object Uint32Array]'
    ] = !0),
      (c[n] = c['[object Array]'] = c['[object ArrayBuffer]'] = c[
        '[object Boolean]'
      ] = c['[object DataView]'] = c['[object Date]'] = c['[object Error]'] = c[
        '[object Function]'
      ] = c[i] = c['[object Number]'] = c[r] = c['[object RegExp]'] = c[s] = c[
        '[object String]'
      ] = c['[object WeakMap]'] = !1)
    var l = 'object' == typeof rt && rt && rt.Object === Object && rt,
      u = 'object' == typeof self && self && self.Object === Object && self,
      d = l || u || Function('return this')(),
      h = e && !e.nodeType && e,
      p = h && t && !t.nodeType && t,
      f = p && p.exports === h,
      _ = f && l.process,
      g = (function() {
        try {
          return _ && _.binding && _.binding('util')
        } catch (t) {}
      })(),
      m = g && g.isTypedArray
    function y(t, e) {
      for (var n = -1, i = null == t ? 0 : t.length; ++n < i; )
        if (e(t[n], n, t)) return !0
      return !1
    }
    function v(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function(t, i) {
          n[++e] = [i, t]
        }),
        n
      )
    }
    function b(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function(t) {
          n[++e] = t
        }),
        n
      )
    }
    var w,
      S,
      x,
      j = Array.prototype,
      P = Function.prototype,
      A = Object.prototype,
      O = d['__core-js_shared__'],
      z = P.toString,
      N = A.hasOwnProperty,
      E = (w = /[^.]+$/.exec((O && O.keys && O.keys.IE_PROTO) || ''))
        ? 'Symbol(src)_1.' + w
        : '',
      T = A.toString,
      C = RegExp(
        '^' +
          z
            .call(N)
            .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      ),
      $ = f ? d.Buffer : void 0,
      k = d.Symbol,
      V = d.Uint8Array,
      U = A.propertyIsEnumerable,
      M = j.splice,
      R = k ? k.toStringTag : void 0,
      F = Object.getOwnPropertySymbols,
      I = $ ? $.isBuffer : void 0,
      B =
        ((S = Object.keys),
        (x = Object),
        function(t) {
          return S(x(t))
        }),
      D = mt(d, 'DataView'),
      q = mt(d, 'Map'),
      L = mt(d, 'Promise'),
      W = mt(d, 'Set'),
      H = mt(d, 'WeakMap'),
      J = mt(Object, 'create'),
      G = wt(D),
      K = wt(q),
      Y = wt(L),
      Q = wt(W),
      X = wt(H),
      Z = k ? k.prototype : void 0,
      tt = Z ? Z.valueOf : void 0
    function et(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.clear(); ++e < n; ) {
        var i = t[e]
        this.set(i[0], i[1])
      }
    }
    function nt(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.clear(); ++e < n; ) {
        var i = t[e]
        this.set(i[0], i[1])
      }
    }
    function it(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.clear(); ++e < n; ) {
        var i = t[e]
        this.set(i[0], i[1])
      }
    }
    function st(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.__data__ = new it(); ++e < n; ) this.add(t[e])
    }
    function ot(t) {
      var e = (this.__data__ = new nt(t))
      this.size = e.size
    }
    function at(t, e) {
      var n = jt(t),
        i = !n && xt(t),
        r = !n && !i && Pt(t),
        s = !n && !i && !r && Et(t),
        o = n || i || r || s,
        a = o
          ? (function(t, e) {
              for (var n = -1, i = Array(t); ++n < t; ) i[n] = e(n)
              return i
            })(t.length, String)
          : [],
        c = a.length
      for (var l in t)
        (!e && !N.call(t, l)) ||
          (o &&
            ('length' == l ||
              (r && ('offset' == l || 'parent' == l)) ||
              (s &&
                ('buffer' == l || 'byteLength' == l || 'byteOffset' == l)) ||
              bt(l, c))) ||
          a.push(l)
      return a
    }
    function ct(t, e) {
      for (var n = t.length; n--; ) if (St(t[n][0], e)) return n
      return -1
    }
    function lt(t) {
      return null == t
        ? void 0 === t
          ? '[object Undefined]'
          : '[object Null]'
        : R && R in Object(t)
        ? (function(t) {
            var e = N.call(t, R),
              n = t[R]
            try {
              t[R] = void 0
              var i = !0
            } catch (t) {}
            var r = T.call(t)
            i && (e ? (t[R] = n) : delete t[R])
            return r
          })(t)
        : (function(t) {
            return T.call(t)
          })(t)
    }
    function ut(t) {
      return Nt(t) && lt(t) == n
    }
    function dt(t, e, o, a, c) {
      return (
        t === e ||
        (null == t || null == e || (!Nt(t) && !Nt(e))
          ? t != t && e != e
          : (function(t, e, o, a, c, l) {
              var u = jt(t),
                d = jt(e),
                h = u ? '[object Array]' : vt(t),
                p = d ? '[object Array]' : vt(e),
                f = (h = h == n ? r : h) == r,
                _ = (p = p == n ? r : p) == r,
                g = h == p
              if (g && Pt(t)) {
                if (!Pt(e)) return !1
                ;(u = !0), (f = !1)
              }
              if (g && !f)
                return (
                  l || (l = new ot()),
                  u || Et(t)
                    ? ft(t, e, o, a, c, l)
                    : (function(t, e, n, r, o, a, c) {
                        switch (n) {
                          case '[object DataView]':
                            if (
                              t.byteLength != e.byteLength ||
                              t.byteOffset != e.byteOffset
                            )
                              return !1
                            ;(t = t.buffer), (e = e.buffer)
                          case '[object ArrayBuffer]':
                            return !(
                              t.byteLength != e.byteLength ||
                              !a(new V(t), new V(e))
                            )
                          case '[object Boolean]':
                          case '[object Date]':
                          case '[object Number]':
                            return St(+t, +e)
                          case '[object Error]':
                            return t.name == e.name && t.message == e.message
                          case '[object RegExp]':
                          case '[object String]':
                            return t == e + ''
                          case i:
                            var l = v
                          case s:
                            var u = 1 & r
                            if ((l || (l = b), t.size != e.size && !u))
                              return !1
                            var d = c.get(t)
                            if (d) return d == e
                            ;(r |= 2), c.set(t, e)
                            var h = ft(l(t), l(e), r, o, a, c)
                            return c.delete(t), h
                          case '[object Symbol]':
                            if (tt) return tt.call(t) == tt.call(e)
                        }
                        return !1
                      })(t, e, h, o, a, c, l)
                )
              if (!(1 & o)) {
                var m = f && N.call(t, '__wrapped__'),
                  y = _ && N.call(e, '__wrapped__')
                if (m || y) {
                  var w = m ? t.value() : t,
                    S = y ? e.value() : e
                  return l || (l = new ot()), c(w, S, o, a, l)
                }
              }
              if (!g) return !1
              return (
                l || (l = new ot()),
                (function(t, e, n, i, r, s) {
                  var o = 1 & n,
                    a = _t(t),
                    c = a.length,
                    l = _t(e).length
                  if (c != l && !o) return !1
                  var u = c
                  for (; u--; ) {
                    var d = a[u]
                    if (!(o ? d in e : N.call(e, d))) return !1
                  }
                  var h = s.get(t)
                  if (h && s.get(e)) return h == e
                  var p = !0
                  s.set(t, e), s.set(e, t)
                  var f = o
                  for (; ++u < c; ) {
                    d = a[u]
                    var _ = t[d],
                      g = e[d]
                    if (i) var m = o ? i(g, _, d, e, t, s) : i(_, g, d, t, e, s)
                    if (!(void 0 === m ? _ === g || r(_, g, n, i, s) : m)) {
                      p = !1
                      break
                    }
                    f || (f = 'constructor' == d)
                  }
                  if (p && !f) {
                    var y = t.constructor,
                      v = e.constructor
                    y == v ||
                      !('constructor' in t) ||
                      !('constructor' in e) ||
                      ('function' == typeof y &&
                        y instanceof y &&
                        'function' == typeof v &&
                        v instanceof v) ||
                      (p = !1)
                  }
                  return s.delete(t), s.delete(e), p
                })(t, e, o, a, c, l)
              )
            })(t, e, o, a, dt, c))
      )
    }
    function ht(t) {
      return (
        !(
          !zt(t) ||
          (function(t) {
            return !!E && E in t
          })(t)
        ) && (At(t) ? C : o).test(wt(t))
      )
    }
    function pt(t) {
      if (
        ((n = (e = t) && e.constructor),
        (i = ('function' == typeof n && n.prototype) || A),
        e !== i)
      )
        return B(t)
      var e,
        n,
        i,
        r = []
      for (var s in Object(t)) N.call(t, s) && 'constructor' != s && r.push(s)
      return r
    }
    function ft(t, e, n, i, r, s) {
      var o = 1 & n,
        a = t.length,
        c = e.length
      if (a != c && !(o && c > a)) return !1
      var l = s.get(t)
      if (l && s.get(e)) return l == e
      var u = -1,
        d = !0,
        h = 2 & n ? new st() : void 0
      for (s.set(t, e), s.set(e, t); ++u < a; ) {
        var p = t[u],
          f = e[u]
        if (i) var _ = o ? i(f, p, u, e, t, s) : i(p, f, u, t, e, s)
        if (void 0 !== _) {
          if (_) continue
          d = !1
          break
        }
        if (h) {
          if (
            !y(e, function(t, e) {
              if (((o = e), !h.has(o) && (p === t || r(p, t, n, i, s))))
                return h.push(e)
              var o
            })
          ) {
            d = !1
            break
          }
        } else if (p !== f && !r(p, f, n, i, s)) {
          d = !1
          break
        }
      }
      return s.delete(t), s.delete(e), d
    }
    function _t(t) {
      return (function(t, e, n) {
        var i = e(t)
        return jt(t)
          ? i
          : (function(t, e) {
              for (var n = -1, i = e.length, r = t.length; ++n < i; )
                t[r + n] = e[n]
              return t
            })(i, n(t))
      })(t, Tt, yt)
    }
    function gt(t, e) {
      var n,
        i,
        r = t.__data__
      return ('string' == (i = typeof (n = e)) ||
      'number' == i ||
      'symbol' == i ||
      'boolean' == i
      ? '__proto__' !== n
      : null === n)
        ? r['string' == typeof e ? 'string' : 'hash']
        : r.map
    }
    function mt(t, e) {
      var n = (function(t, e) {
        return null == t ? void 0 : t[e]
      })(t, e)
      return ht(n) ? n : void 0
    }
    ;(et.prototype.clear = function() {
      ;(this.__data__ = J ? J(null) : {}), (this.size = 0)
    }),
      (et.prototype.delete = function(t) {
        var e = this.has(t) && delete this.__data__[t]
        return (this.size -= e ? 1 : 0), e
      }),
      (et.prototype.get = function(t) {
        var e = this.__data__
        if (J) {
          var n = e[t]
          return '__lodash_hash_undefined__' === n ? void 0 : n
        }
        return N.call(e, t) ? e[t] : void 0
      }),
      (et.prototype.has = function(t) {
        var e = this.__data__
        return J ? void 0 !== e[t] : N.call(e, t)
      }),
      (et.prototype.set = function(t, e) {
        var n = this.__data__
        return (
          (this.size += this.has(t) ? 0 : 1),
          (n[t] = J && void 0 === e ? '__lodash_hash_undefined__' : e),
          this
        )
      }),
      (nt.prototype.clear = function() {
        ;(this.__data__ = []), (this.size = 0)
      }),
      (nt.prototype.delete = function(t) {
        var e = this.__data__,
          n = ct(e, t)
        return (
          !(n < 0) &&
          (n == e.length - 1 ? e.pop() : M.call(e, n, 1), --this.size, !0)
        )
      }),
      (nt.prototype.get = function(t) {
        var e = this.__data__,
          n = ct(e, t)
        return n < 0 ? void 0 : e[n][1]
      }),
      (nt.prototype.has = function(t) {
        return ct(this.__data__, t) > -1
      }),
      (nt.prototype.set = function(t, e) {
        var n = this.__data__,
          i = ct(n, t)
        return i < 0 ? (++this.size, n.push([t, e])) : (n[i][1] = e), this
      }),
      (it.prototype.clear = function() {
        ;(this.size = 0),
          (this.__data__ = {
            hash: new et(),
            map: new (q || nt)(),
            string: new et(),
          })
      }),
      (it.prototype.delete = function(t) {
        var e = gt(this, t).delete(t)
        return (this.size -= e ? 1 : 0), e
      }),
      (it.prototype.get = function(t) {
        return gt(this, t).get(t)
      }),
      (it.prototype.has = function(t) {
        return gt(this, t).has(t)
      }),
      (it.prototype.set = function(t, e) {
        var n = gt(this, t),
          i = n.size
        return n.set(t, e), (this.size += n.size == i ? 0 : 1), this
      }),
      (st.prototype.add = st.prototype.push = function(t) {
        return this.__data__.set(t, '__lodash_hash_undefined__'), this
      }),
      (st.prototype.has = function(t) {
        return this.__data__.has(t)
      }),
      (ot.prototype.clear = function() {
        ;(this.__data__ = new nt()), (this.size = 0)
      }),
      (ot.prototype.delete = function(t) {
        var e = this.__data__,
          n = e.delete(t)
        return (this.size = e.size), n
      }),
      (ot.prototype.get = function(t) {
        return this.__data__.get(t)
      }),
      (ot.prototype.has = function(t) {
        return this.__data__.has(t)
      }),
      (ot.prototype.set = function(t, e) {
        var n = this.__data__
        if (n instanceof nt) {
          var i = n.__data__
          if (!q || i.length < 199)
            return i.push([t, e]), (this.size = ++n.size), this
          n = this.__data__ = new it(i)
        }
        return n.set(t, e), (this.size = n.size), this
      })
    var yt = F
        ? function(t) {
            return null == t
              ? []
              : ((t = Object(t)),
                (function(t, e) {
                  for (
                    var n = -1, i = null == t ? 0 : t.length, r = 0, s = [];
                    ++n < i;

                  ) {
                    var o = t[n]
                    e(o, n, t) && (s[r++] = o)
                  }
                  return s
                })(F(t), function(e) {
                  return U.call(t, e)
                }))
          }
        : function() {
            return []
          },
      vt = lt
    function bt(t, e) {
      return (
        !!(e = null == e ? 9007199254740991 : e) &&
        ('number' == typeof t || a.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
      )
    }
    function wt(t) {
      if (null != t) {
        try {
          return z.call(t)
        } catch (t) {}
        try {
          return t + ''
        } catch (t) {}
      }
      return ''
    }
    function St(t, e) {
      return t === e || (t != t && e != e)
    }
    ;((D && '[object DataView]' != vt(new D(new ArrayBuffer(1)))) ||
      (q && vt(new q()) != i) ||
      (L && '[object Promise]' != vt(L.resolve())) ||
      (W && vt(new W()) != s) ||
      (H && '[object WeakMap]' != vt(new H()))) &&
      (vt = function(t) {
        var e = lt(t),
          n = e == r ? t.constructor : void 0,
          o = n ? wt(n) : ''
        if (o)
          switch (o) {
            case G:
              return '[object DataView]'
            case K:
              return i
            case Y:
              return '[object Promise]'
            case Q:
              return s
            case X:
              return '[object WeakMap]'
          }
        return e
      })
    var xt = ut(
        (function() {
          return arguments
        })()
      )
        ? ut
        : function(t) {
            return Nt(t) && N.call(t, 'callee') && !U.call(t, 'callee')
          },
      jt = Array.isArray
    var Pt =
      I ||
      function() {
        return !1
      }
    function At(t) {
      if (!zt(t)) return !1
      var e = lt(t)
      return (
        '[object Function]' == e ||
        '[object GeneratorFunction]' == e ||
        '[object AsyncFunction]' == e ||
        '[object Proxy]' == e
      )
    }
    function Ot(t) {
      return (
        'number' == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
      )
    }
    function zt(t) {
      var e = typeof t
      return null != t && ('object' == e || 'function' == e)
    }
    function Nt(t) {
      return null != t && 'object' == typeof t
    }
    var Et = m
      ? (function(t) {
          return function(e) {
            return t(e)
          }
        })(m)
      : function(t) {
          return Nt(t) && Ot(t.length) && !!c[lt(t)]
        }
    function Tt(t) {
      return null != (e = t) && Ot(e.length) && !At(e) ? at(t) : pt(t)
      var e
    }
    t.exports = function(t, e) {
      return dt(t, e)
    }
  })
  var ot = ((t, ...e) => {
    const n = e.reduce(
      (e, n, i) =>
        e +
        (t => {
          if (t instanceof G) return t.cssText
          if ('number' == typeof t) return t
          throw new Error(
            `Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`
          )
        })(n) +
        t[i + 1],
      t[0]
    )
    return new G(n, J)
  })`:host {\n  --st-default-spacing: 4px;\n}\nha-card {\n  -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);\n  font-size: var(--paper-font-body1_-_font-size);\n  font-weight: var(--paper-font-body1_-_font-weight);\n  line-height: var(--paper-font-body1_-_line-height);\n\n  padding-bottom: calc(var(--st-default-spacing) * 2);\n\n  padding-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 2);\n}\n\nha-card.no-header {\n  padding: calc(var(--st-default-spacing) * 4) 0;\n  padding: calc(var(--st-spacing, var(--st-default-spacing)) * 4) 0;\n}\n\n.not-found {\n  flex: 1;\n  background-color: yellow;\n  padding: calc(var(--st-default-spacing) * 4);\n  padding: calc(var(--st-spacing, var(--st-default-spacing)) * 4);\n}\n\n.body {\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 1fr;\n  align-items: center;\n  justify-items: center;\n  place-items: center;\n  padding: 0 calc(var(--st-default-spacing) * 4);\n  padding: 0 calc(var(--st-spacing, var(--st-default-spacing)) * 4);\n  padding-bottom: calc(var(--st-default-spacing) * 2);\n  padding-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 2);\n}\n.main {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n.sensors {\n  display: grid;\n  grid: auto-flow / 1fr 2fr;\n  grid-gap: var(--st-default-spacing);\n  grid-gap: var(--st-spacing, var(--st-default-spacing));\n  font-size: 16px;\n  font-size: var(\n    --st-font-size-sensors,\n    var(--paper-font-subhead_-_font-size, 16px)\n  );\n}\n.sensor-heading {\n  text-align: right;\n  font-weight: 300;\n  padding-right: 8px;\n  padding-bottom: 4px;\n  white-space: nowrap;\n}\n.sensors:empty {\n  display: none;\n}\nheader {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n\n  padding: calc(var(--st-default-spacing) * 6)\n    calc(var(--st-default-spacing) * 4)\n    calc(var(--st-default-spacing) * 4);\n\n  padding: calc(var(--st-spacing, var(--st-default-spacing)) * 6)\n    calc(var(--st-spacing, var(--st-default-spacing)) * 4)\n    calc(var(--st-spacing, var(--st-default-spacing)) * 4);\n}\n.header__icon {\n  margin-right: calc(var(--st-default-spacing) * 2);\n  margin-right: calc(var(--st-spacing, var(--st-default-spacing)) * 2);\n  color: #44739e;\n  color: var(--paper-item-icon-color, #44739e);\n}\n.header__title {\n  font-size: 24px;\n  font-size: var(--st-font-size-title, var(--ha-card-header-font-size, 24px));\n  line-height: 24px;\n  line-height: var(--st-font-size-title, var(--ha-card-header-font-size, 24px));\n  -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);\n  font-weight: normal;\n  margin: 0;\n  align-self: left;\n}\n.current-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center\n}\n.current-wrapper.row {\n    flex-direction: row-reverse;\n  }\n.current--value-wrapper {\n  display: flex;\n  align-items: center;\n}\n.current--value {\n  margin: 0;\n  font-weight: 400;\n  line-height: var(--paper-font-display2_-_font-size);\n  line-height: var(--st-font-size-l, var(--paper-font-display2_-_font-size));\n  font-size: var(--paper-font-display2_-_font-size);\n  font-size: var(--st-font-size-l, var(--paper-font-display2_-_font-size))\n}\n@media (min-width: 768px) {\n.current--value {\n    font-size: var(--paper-font-display3_-_font-size);\n    font-size: var(--st-font-size-xl, var(--paper-font-display3_-_font-size));\n    line-height: var(--paper-font-display3_-_font-size);\n    line-height: var(--st-font-size-xl, var(--paper-font-display3_-_font-size))\n}\n  }\n.current--value.updating {\n    color: var(--google-red-500);\n  }\n.current--unit {\n  font-size: var(--paper-font-title_-_font-size);\n  font-size: var(--st-font-size-m, var(--paper-font-title_-_font-size));\n}\n.thermostat-trigger {\n  padding: 0px;\n}\n.clickable {\n  cursor: pointer;\n}\n.modes {\n  display: grid;\n  grid-template-columns: auto;\n  grid-auto-flow: column;\n  grid-gap: 2px;\n  margin-top: calc(var(--st-default-spacing) * 2);\n  margin-top: calc(var(--st-spacing, var(--st-default-spacing)) * 2);\n  padding: var(--st-default-spacing);\n  padding: var(--st-spacing, var(--st-default-spacing))\n}\n.modes.heading {\n    grid-template-columns: -webkit-min-content;\n    grid-template-columns: min-content;\n  }\n.mode-title {\n  padding: 0 16px;\n  align-self: center;\n  justify-self: center;\n  place-self: center;\n  font-size: 16px;\n  font-size: var(\n    --st-font-size-sensors,\n    var(--paper-font-subhead_-_font-size, 16px)\n  );\n  font-weight: 300;\n  white-space: nowrap;\n}\n.mode-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  justify-content: center;\n  min-height: 24px;\n  padding: var(--st-default-spacing) 0;\n  padding: var(--st-spacing, var(--st-default-spacing)) 0;\n  background: var(--secondary-background-color);\n  background: var(--st-mode-background, var(--secondary-background-color));\n  color: var(--secondary-text-color);\n  cursor: pointer;\n  border-radius: var(--st-default-spacing);\n  border-radius: var(--st-spacing, var(--st-default-spacing))\n}\n.mode-item:hover {\n    color: var(--primary-text-color);\n    color: var(--st-mode-active-color, var(--primary-text-color));\n  }\n.mode-item.active,\n  .mode-item.active:hover {\n    background: var(--primary-color);\n    background: var(--st-mode-active-background, var(--primary-color));\n    color: var(--text-primary-color);\n    color: var(--st-mode-active-color, var(--text-primary-color));\n  }\n.mode-icon {\n  --iron-icon-width: 24px;\n  --iron-icon-height: 24px;\n  display: block;\n}\n`
  !(function(t, e) {
    void 0 === e && (e = {})
    var n = e.insertAt
    if (t && 'undefined' != typeof document) {
      var i = document.head || document.getElementsByTagName('head')[0],
        r = document.createElement('style')
      ;(r.type = 'text/css'),
        'top' === n && i.firstChild
          ? i.insertBefore(r, i.firstChild)
          : i.appendChild(r),
        r.styleSheet
          ? (r.styleSheet.cssText = t)
          : r.appendChild(document.createTextNode(t))
    }
  })(ot)
  !(function(t) {
    console.info('%cwater-heater-card: ' + t, 'font-weight: bold')
  })('0.0.1')
  const at = ['entity', 'sensors', '_values', '_updatingValues', 'modes'],
    ct = [],
    lt = ['hvac', 'preset'],
    ut = 'hass:chevron-up',
    dt = 'hass:chevron-down',
    ht = 'mdi:plus',
    pt = 'mdi:minus',
    ft = { off: 'hass:power', auto: 'hass:autorenew', heat: 'hass:fire' },
    _t = {
      off: 'mdi:radiator-off',
      idle: 'mdi:radiator-disabled',
      heating: 'mdi:radiator',
      auto: 'mdi:radiator',
    },
    gt = { temperature: !1, state: !1 }
  function mt(t, e, n = {}) {
    return e[t + '_modes']
      .filter(t =>
        (function(t, e) {
          if (void 0 === e) return !0
          if (Array.isArray(e)) return e.includes(t)
          const n = typeof e[t]
          return 'boolean' === n ? e[t] : 'object' !== n || !1 !== e[t].include
        })(t, n)
      )
      .map(t => {
        const { include: e, ...i } = 'object' == typeof n[t] ? n[t] : {}
        return { icon: ft[t], value: t, name: t, ...i }
      })
  }
  class yt extends Y {
    static get styles() {
      return ot
    }
    static get properties() {
      return {
        i: Number,
        _hass: Object,
        config: Object,
        entity: Object,
        sensors: Array,
        modes: Object,
        icon: String,
        _values: Object,
        _updatingValues: Boolean,
        _mode: String,
        _hide: Object,
        name: String,
      }
    }
    constructor() {
      super(),
        (this._debouncedSetTemperature = it(
          t => {
            this._hass.callService('water_heater', 'set_temperature', {
              entity_id: this.config.entity,
              ...t,
            })
          },
          { wait: 1e3 }
        )),
        (this._hass = null),
        (this.entity = null),
        (this.icon = null),
        (this.sensors = []),
        (this._stepSize = 1),
        (this._values = {}),
        (this._updatingValues = !1),
        (this._hide = gt),
        (this.modeOptions = { names: !0, icons: !0, headings: !0 })
    }
    setConfig(t) {
      if (!t.entity) throw new Error('You need to define an entity')
      this.config = { decimals: 0, ...t }
    }
    set hass(t) {
      const e = t.states[this.config.entity]
      if (void 0 === e) return
      ;(this._hass = t), this.entity !== e && (this.entity = e)
      const n = e.attributes
      let i
      ;(this.entityType = (function(t) {
        return 'number' == typeof t.target_temp_high &&
          'number' == typeof t.target_temp_low
          ? 'dual'
          : 'single'
      })(n)),
        (i =
          'dual' === this.entityType
            ? {
                target_temp_low: n.target_temp_low,
                target_temp_high: n.target_temp_high,
              }
            : { temperature: n.temperature }),
        this._updatingValues && st(i, this._values)
          ? (this._updatingValues = !1)
          : this._updatingValues || (this._values = i)
      const r = t => ct.includes(t) && n[t + '_modes'],
        s = t => t.filter(r).map(t => ({ type: t, list: mt(t, n, {}) }))
      let o = []
      if (!1 === this.config.control) o = []
      else if (Array.isArray(this.config.control)) o = s(this.config.control)
      else if ('object' == typeof this.config.control) {
        const { _names: t, _icons: e, _headings: i, ...a } = this.config.control
        'boolean' == typeof t && (this.modeOptions.names = t),
          'boolean' == typeof e && (this.modeOptions.icons = e),
          'boolean' == typeof i && (this.modeOptions.headings = i)
        const c = Object.entries(a)
        o =
          c.length > 0
            ? c
                .filter(([t]) => r(t))
                .map(([t, { _name: e, ...i }]) => ({
                  type: t,
                  name: e,
                  list: mt(t, n, i),
                }))
            : s(lt)
      } else o = s(lt)
      ;(this.modes = o.map(t => {
        if ('water_heater' === t.type) {
          const n = []
          return (
            t.list.forEach(t => {
              const e = WATER_HEATER__MODES.indexOf(t.value)
              n[e] = t
            }),
            { ...t, list: n, mode: e.state }
          )
        }
        const i = n[t.type + '_mode']
        return { ...t, mode: i }
      })),
        void 0 !== this.config.icon
          ? (this.icon = this.config.icon)
          : (this.icon = _t),
        this.config.step_size && (this._stepSize = this.config.step_size),
        this.config.hide &&
          (this._hide = { ...this._hide, ...this.config.hide }),
        'string' == typeof this.config.name
          ? (this.name = this.config.name)
          : !1 === this.config.name
          ? (this.name = !1)
          : (this.name = e.attributes.friendly_name),
        this.config.sensors &&
          (this.sensors = this.config.sensors.map(
            ({ name: e, entity: n, attribute: i, unit: r = '', ...s }) => {
              let o
              const a = [e]
              return (
                n
                  ? ((o = t.states[n]),
                    a.push(o && o.attributes && o.attributes.friendly_name),
                    i && (o = o.attributes[i] + r))
                  : i &&
                    i in this.entity.attributes &&
                    ((o = this.entity.attributes[i] + r), a.push(i)),
                a.push(n),
                { ...s, name: a.find(t => !!t), state: o, entity: n, unit: r }
              )
            }
          ))
    }
    shouldUpdate(t) {
      return at.some(e => t.has(e))
    }
    localize(t, e = '') {
      const n = this._hass.selectedLanguage || this._hass.language,
        i = `${e}${t}`,
        r = this._hass.resources[n]
      return i in r ? r[i] : t
    }
    render(
      {
        _hass: t,
        _hide: e,
        _values: n,
        _updatingValues: i,
        config: r,
        entity: s,
        sensors: o,
      } = this
    ) {
      if (!s)
        return V`<ha-card class="not-found">water_heater entity not available: <strong class="name">${r.entity}</strong></ha-card>`
      const {
          state: a,
          attributes: {
            min_temp: c = null,
            max_temp: l = null,
            hvac_action: u,
            temperature: d,
            ...h
          },
        } = s,
        p = this._hass.config.unit_system.temperature,
        f = [
          this.renderInfoItem(
            e.state,
            this.localize(u, 'state_attributes.water_heater.operation_list.'),
            {
              heading:
                (this.config.label && this.config.label.state) || 'State',
            }
          ),
          o.map(
            ({ name: t, icon: e, state: n, unit: i }) =>
              n && this.renderInfoItem(!1, n, { heading: t, icon: e, unit: i })
          ) || null,
        ].filter(t => null !== t),
        _ = this.config.step_layout || 'column',
        g = 'row' === _,
        m = [!this.name && 'no-header', u].filter(t => !!t)
      return V`<ha-card class="${m.join(
        ' '
      )}">${this.renderHeader()}<section class="body"><div class="sensors">${f}</div>${Object.entries(
        n
      ).map(
        ([t, e]) =>
          V`<div class="main"><div class="current-wrapper ${_}"><ha-icon-button ?disabled="${l &&
            e >= l}" class="thermostat-trigger" @click="${() =>
            this.setTemperature(this._stepSize, t)}"><ha-icon icon="${
            g ? ht : ut
          }"></ha-icon></ha-icon-button><div @click="${() =>
            this.openEntityPopover()}" class="current--value-wrapper"><h3 class="current--value ${
            i ? 'updating' : ''
          }">${(function(t, { decimals: e = 1, fallback: n = 'N/A' } = {}) {
            return null === t ||
              '' === t ||
              ['boolean', 'undefined'].includes(typeof t)
              ? n
              : Number(t).toFixed(e)
          })(
            e,
            r
          )}</h3><span class="current--unit">${p}</span></div><ha-icon-button ?disabled="${c &&
            e <= c}" class="thermostat-trigger" @click="${() =>
            this.setTemperature(-this._stepSize, t)}"><ha-icon icon="${
            g ? pt : dt
          }"></ha-icon></ha-icon-button></div></div>`
      )}</section>${this.modes.map(t => this.renderModeType(t))}</ha-card>`
    }
    renderHeader() {
      if (!1 === this.name) return ''
      let t = this.icon
      const { hvac_action: e } = this.entity.attributes
      return (
        'object' == typeof this.icon && (t = e in this.icon && this.icon[e]),
        V`<header class="clickable" @click="${() =>
          this.openEntityPopover()}">${(t &&
          V`<ha-icon class="header__icon" .icon="${t}"></ha-icon>`) ||
          ''}<h2 class="header__title">${this.name}</h2></header>`
      )
    }
    renderModeType({ type: t, mode: e = 'none', list: n, name: i }) {
      if (0 === n.length) return null
      let r = `state_attributes.water_heater.${t}_mode.`
      'hvac' === t && (r = 'state.water_heater.')
      const s = t =>
          !1 === t || !1 === this.modeOptions.names
            ? null
            : this.localize(t, r),
        o = t =>
          t
            ? !1 === this.modeOptions.icons
              ? null
              : V`<ha-icon class="mode-icon" .icon="${t}"></ha-icon>`
            : null,
        a = 'hvac' == t ? 'operation' : t + '_mode',
        c = i || this.localize('ui.card.water_heater.' + a),
        { headings: l } = this.modeOptions
      return V`<div class="modes ${
        l ? 'heading' : ''
      }">${l ? V`<div class="mode-title">${c}</div>` : null} ${n.map(({ value: n, icon: i, name: r }) => V`<div class="mode-item ${n === e ? 'active' : ''}" @click="${() => this.setMode(t, n)}">${o(i)} ${s(r)}</div>`)}</div>`
    }
    renderInfoItem(t, e, { heading: n, icon: i, unit: r }) {
      if (t || !e) return
      let s
      if ('object' == typeof e) {
        let t = e.state
        if ('device_class' in e.attributes) {
          const [n] = e.entity_id.split('.'),
            i = ['state', n, e.attributes.device_class, ''].join('.')
          t = this.localize(e.state, i)
        }
        s = V`<div class="clickable" @click="${() =>
          this.openEntityPopover(e.entity_id)}">${t} ${r ||
          e.attributes.unit_of_measurement}</div>`
      } else s = V`<div>${e}</div>`
      return (
        (n = i ? V`<ha-icon icon="${i}"></ha-icon>` : V`${n}:`),
        V`<div class="sensor-heading">${n}</div>${s}`
      )
    }
    setTemperature(t, e = 'temperature') {
      ;(this._updatingValues = !0),
        (this._values = { ...this._values, [e]: this._values[e] + t }),
        this._debouncedSetTemperature({ ...this._values })
    }
    setMode(t, e) {
      t && e
        ? (this._hass.callService('water_heater', `set_${t}_mode`, {
            entity_id: this.config.entity,
            [t + '_mode']: e,
          }),
          this.fire('haptic', 'light'))
        : this.fire('haptic', 'failure')
    }
    openEntityPopover(t = this.config.entity) {
      this.fire('hass-more-info', { entityId: t })
    }
    fire(t, e, n) {
      ;(n = n || {}), (e = null == e ? {} : e)
      const i = new Event(t, {
        bubbles: void 0 === n.bubbles || n.bubbles,
        cancelable: Boolean(n.cancelable),
        composed: void 0 === n.composed || n.composed,
      })
      return (i.detail = e), this.dispatchEvent(i), i
    }
    getCardSize() {
      return 3
    }
  }
  return window.customElements.define('water-heater-card', yt), yt
})
