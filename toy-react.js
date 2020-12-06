const RENDER_TO_DOM = Symbol('render to dom');


class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase()), value)
    } else {
      this.root.setAttribute(name, value);
    }
  }

  appendChild(component) {
    let range = document.createRange();
    range.setStart(this.root, this.root.childNodes.length);
    range.setEnd(this.root, this.root.childNodes.length);
    component[RENDER_TO_DOM](range);
  }

  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }

}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }

  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }

}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._range = null;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  [RENDER_TO_DOM](range) {
    this._range = range;
    this.render()[RENDER_TO_DOM](range);
  }

  rerender() {
    this._range.deleteContents();
    this[RENDER_TO_DOM](this._range);
  }

  setState(newState) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState;
      this.rerender();
      return false;
    }

    const merge = (oldState, newState) => {
      for (let n in newState) {
        if (oldState[n] === null || oldState[n] !== 'object') {
          oldState[n] = newState[n];
        } else {
          merge(oldState[n], newState[n]);
        }
      }
    };

    merge(this.state, newState);

    this.rerender();

  }

}

export function createElement(type, attributes, ...children) {
  let e;
  if (typeof type === 'string') {
    e = new ElementWrapper(type);
  } else {
    e = new type;
  }

  for (let p in attributes) {
    e.setAttribute(p, attributes[p]);
  }

  const insertChidren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') child = new TextWrapper(child);
      if (child instanceof Array) {
        insertChidren(child);
      } else {
        e.appendChild(child);
      }

    }
  };

  insertChidren(children);

  return e;
};

export function render(component, parentElement) {
  let range = document.createRange();
  range.setStart(parentElement, 0);
  range.setEnd(parentElement, parentElement.childNodes.length);
  range.deleteContents();
  component[RENDER_TO_DOM](range);
};