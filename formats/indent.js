import Parchment from 'parchment';

class IdentAttributor extends Parchment.Attributor.Class {
  add(node, value) {
    if (value === '+1' || value === '-1') {
      let indent = parseInt(this.value(node) || 0);
      value = value === '+1' ? (indent + 1) : (indent - 1);
    }
    if (value === 0) {
      this.remove(node);
      return true;
    } else {
      return super.add(node, value);
    }
  }
}

let IndentClass = new IdentAttributor('indent', 'ql-indent', {
  scope: Parchment.Scope.BLOCK,
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});

export { IndentClass };
