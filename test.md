Absolutely—let’s build a tiny “React-ish” library that:

lets you write JSX (compiled to h(...))

renders to real DOM (no heavy runtime)

supports a minimal useState that re-renders only the affected component

does a very small diff to update the DOM


Below is a single-file micro-library (~150 lines) you can drop in. After that, I show how to use it with JSX or without a build step.


---

tinyjsx.js — minimal JSX + state + diff

// tinyjsx.js
// Features: h() for JSX, render(), minimal diff, and useState() for function components.

const TEXT = "TEXT_ELEMENT";

export function h(type, props, ...children) {
  props = props || {};
  const flatKids = [].concat(...children).map(c =>
    typeof c === "object" ? c : createText(String(c))
  );
  return { type, props, children: flatKids, key: props.key ?? null, dom: null };
}

function createText(text) {
  return { type: TEXT, props: { nodeValue: text }, children: [], dom: null };
}

function setProp(dom, name, value) {
  if (name === "children" || name === "key") return;

  if (name === "style" && value && typeof value === "object") {
    Object.assign(dom.style, value);
    return;
  }

  if (name.startsWith("on") && typeof value === "function") {
    const event = name.slice(2).toLowerCase();
    dom.addEventListener(event, value);
    return;
  }

  // Prefer property assignment if present; otherwise attribute
  if (name in dom) dom[name] = value;
  else dom.setAttribute(name, value);
}

function removeProp(dom, name, value) {
  if (name === "children" || name === "key") return;

  if (name.startsWith("on") && typeof value === "function") {
    const event = name.slice(2).toLowerCase();
    dom.removeEventListener(event, value);
    return;
  }

  if (name === "style" && value && typeof value === "object") {
    Object.keys(value).forEach(k => (dom.style[k] = ""));
    return;
  }

  if (name in dom) {
    try { dom[name] = ""; } catch {}
  }
  dom.removeAttribute(name);
}

function updateProps(dom, prev = {}, next = {}) {
  // remove old
  Object.keys(prev).forEach(n => {
    if (!(n in next)) removeProp(dom, n, prev[n]);
  });
  // set new/changed
  Object.keys(next).forEach(n => {
    if (prev[n] !== next[n]) setProp(dom, n, next[n]);
  });
}

/* ---------- Hooks (very small) ---------- */
let CURRENT = null;

export function useState(initial) {
  if (!CURRENT) throw new Error("useState must be called inside a component");
  const i = CURRENT.hookIndex++;
  if (CURRENT.hooks[i] === undefined) {
    CURRENT.hooks[i] = typeof initial === "function" ? initial() : initial;
  }
  const setState = (next) => {
    const value = typeof next === "function" ? next(CURRENT.hooks[i]) : next;
    if (Object.is(value, CURRENT.hooks[i])) return;
    CURRENT.hooks[i] = value;
    rerenderInstance(CURRENT);
  };
  return [CURRENT.hooks[i], setState];
}

function createComponentInstance(vnode, parentDom) {
  return {
    vnode,
    parentDom,
    hooks: [],
    hookIndex: 0,
    child: null, // rendered child vnode
  };
}

function renderFunctionComponent(vnode, parentDom, instance) {
  const type = vnode.type;
  const inst = instance || createComponentInstance(vnode, parentDom);
  CURRENT = inst;
  inst.hookIndex = 0;
  const childVNode = type(vnode.props || {});
  CURRENT = null;
  inst.child = childVNode;
  vnode._inst = inst;
  return childVNode;
}

/* ---------- DOM creation & diff ---------- */

function createDom(vnode, parentDom) {
  // Resolve function component to its child
  if (typeof vnode.type === "function") {
    const child = renderFunctionComponent(vnode, parentDom);
    const dom = createDom(child, parentDom);
    vnode.dom = dom;
    child.dom = dom;
    return dom;
  }

  const dom =
    vnode.type === TEXT
      ? document.createTextNode(vnode.props.nodeValue)
      : document.createElement(vnode.type);

  updateProps(dom, {}, vnode.props);
  vnode.children.forEach(c => dom.appendChild(createDom(c, dom)));
  vnode.dom = dom;
  return dom;
}

function sameType(a, b) {
  if (!a || !b) return false;
  // Compare underlying rendered type for function components
  const ta = typeof a.type === "function" ? a.type : a.type;
  const tb = typeof b.type === "function" ? b.type : b.type;
  return ta === tb;
}

function diff(parentDom, oldVNode, newVNode) {
  // Mount new
  if (!oldVNode) {
    const dom = createDom(newVNode, parentDom);
    parentDom.appendChild(dom);
    return newVNode;
  }

  // Unmount old
  if (!newVNode) {
    parentDom.removeChild(oldVNode.dom);
    return null;
  }

  // If type differs, replace node
  if (!sameType(oldVNode, newVNode)) {
    const dom = createDom(newVNode, parentDom);
    parentDom.replaceChild(dom, oldVNode.dom);
    return newVNode;
  }

  // Handle function components: re-render child and diff children
  if (typeof newVNode.type === "function") {
    const inst = oldVNode._inst || createComponentInstance(newVNode, parentDom);
    newVNode._inst = inst;
    inst.vnode = newVNode;
    const oldChild = inst.child;
    const newChild = renderFunctionComponent(newVNode, parentDom, inst);
    const patchedChild = diff(parentDom, oldChild, newChild);
    newVNode.dom = newChild.dom = patchedChild?.dom || oldVNode.dom;
    return newVNode;
  }

  // Same native node type: update props and reconcile children
  const dom = (newVNode.dom = oldVNode.dom);
  updateProps(dom, oldVNode.props, newVNode.props);

  const max = Math.max(oldVNode.children.length, newVNode.children.length);
  for (let i = 0; i < max; i++) {
    const oldChild = oldVNode.children[i];
    const newChild = newVNode.children[i];

    if (!oldChild) {
      dom.appendChild(createDom(newChild, dom));
      continue;
    }
    if (!newChild) {
      dom.removeChild(oldChild.dom);
      continue;
    }
    const patched = diff(dom, oldChild, newChild);
    if (patched) newVNode.children[i] = patched;
  }

  return newVNode;
}

function rerenderInstance(inst) {
  const parentDom = inst.parentDom || findParentDom(inst);
  const old = inst.child;
  const newChild = renderFunctionComponent(inst.vnode, parentDom, inst);
  diff(parentDom, old, newChild);
}

function findParentDom(inst) {
  // Walk up to find a concrete DOM parent
  let n = inst.vnode;
  while (n && !n.dom) n = inst.child;
  return n?.dom?.parentNode || document.body;
}

export function render(vnode, container) {
  const prev = container._vnode;
  if (!prev) {
    container.appendChild(createDom(vnode, container));
  } else {
    diff(container, prev, vnode);
  }
  container._vnode = vnode;
}


---

Use it with JSX (recommended)

JSX needs a tiny compile step so that <div /> becomes h("div", ...).
With Babel or TypeScript, set the JSX factory to h.

Option A – Babel (vite/webpack/etc.)

Install: npm i -D @babel/core @babel/preset-react

In your Babel config:

{
  "presets": [
    ["@babel/preset-react", { "runtime": "classic", "pragma": "h" }]
  ]
}

Or at the top of your file:

/** @jsx h */
import { h, render, useState } from "./tinyjsx.js";


App example (JSX):

/** @jsx h */
import { h, render, useState } from "./tinyjsx.js";

function App() {
  const [text, setText] = useState("helloworld");
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "12px", fontFamily: "sans-serif" }}>
      <h1>{text}</h1>
      <button onClick={() => setText("something else")}>Change text</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

render(<App />, document.getElementById("root"));

HTML:

<div id="root"></div>
<script type="module" src="/App.jsx"></script>


---

No build step? (plain JS)

You can skip JSX and call h(...) directly.

<div id="root"></div>
<script type="module">
  import { h, render, useState } from "./tinyjsx.js";

  function App() {
    const [text, setText] = useState("helloworld");
    return h(
      "div",
      null,
      h("h1", null, text),
      h("button", { onClick: () => setText("something else") }, "Change")
    );
  }

  render(h(App, null), document.getElementById("root"));
</script>


---

What you get (and what you don’t)

✅ JSX (via h), function components, useState, DOM diffing (index-based)

✅ Props, events (onClick, etc.), inline style object updates

❌ Advanced stuff: keys, context, effects, refs, portals, suspense, etc.

You can add keys + smarter child diff later if you need list reordering.



If you want, I can extend this with useEffect (very small), keyed diffing for lists, or a micro-router—still staying tiny.

