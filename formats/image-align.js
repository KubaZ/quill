import Parchment from 'parchment';

let config = {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['left', 'right']
};

let ImageAlignClass = new Parchment.Attributor.Class('image-align', 'ql-image-align', config);
let ImageAlignStyle = new Parchment.Attributor.Style('image-align', 'float', config);

export { ImageAlignClass, ImageAlignStyle };
