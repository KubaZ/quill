import Emitter from '../core/emitter';
import BaseTheme from './base';
import ColorPicker from '../ui/color-picker';
import IconPicker from '../ui/icon-picker';
import icons from '../ui/icons';
import Picker from '../ui/picker';


const COLORS = [
  "#000000", "#e60000", "#ff9900", "#ffff00", "#008A00", "#0066cc", "#9933ff",
  "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
  "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
  "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
  "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
];

class SnowTheme extends BaseTheme {
  constructor(quill, options) {
    super(quill, options);
    this.quill.container.classList.add('ql-snow');
  }

  buildPickers(selects) {
    let pickers = selects.map((select) => {
      let picker;
      if (select.classList.contains('ql-align')) {
        picker = new IconPicker(select, icons.align);
      } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
        let format = select.classList.contains('ql-background') ? 'background' : 'color';
        if (select.querySelector('option') == null) {
          let defaultColor = format === 'background' ? '#ffffff' : '#000000';
          COLORS.forEach(function(color) {
            let option = document.createElement('option');
            if (color === defaultColor) {
              option.setAttribute('selected', 'selected');
            } else {
              option.setAttribute('value', color);
            }
            select.appendChild(option);
          });
        }
        picker = new ColorPicker(select, icons[format]);
      } else {
        picker = new Picker(select);
      }
      return picker;
    });
    let update = function() {
      pickers.forEach(function(picker) {
        picker.update();
      });
    };
    this.quill.on(Emitter.events.SELECTION_CHANGE, update)
              .on(Emitter.events.TEXT_CHANGE, update);
    document.body.addEventListener('click', (e) => {
      pickers.forEach(function(picker) {
        if (!(e.target.compareDocumentPosition(picker.container) & Node.DOCUMENT_POSITION_CONTAINS)) {
          picker.close();
        }
      });
    });
  }

  extendToolbar(toolbar) {
    toolbar.container.classList.add('ql-snow');
    this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')));
    this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')));
    this.imageTooltip = this.addModule('image-tooltip');
    this.linkTooltip = this.addModule('link-tooltip');
  }
}
SnowTheme.DEFAULTS = {
  modules: {
    'toolbar': {
      container: [
        [{ header: ['1', '2', '3', false] }],
        ['bold', 'italic', 'underline', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean']
      ],
      handlers: {
        'image': function() {
          this.quill.theme.imageTooltip.show();
        },
        'link': function(value) {
          if (value) {
            let savedRange = this.quill.selection.savedRange;
            this.quill.theme.linkTooltip.open(savedRange);
          } else {
            this.quill.format('link', false);
          }
        },
      }
    }
  }
}


export default SnowTheme;
