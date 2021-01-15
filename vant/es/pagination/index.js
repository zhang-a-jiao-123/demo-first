import { createVNode as _createVNode } from "vue";
import { createNamespace } from '../utils';
import { BORDER } from '../utils/constant';
import { computed, watch } from 'vue';

var _createNamespace = createNamespace('pagination'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

function makePage(number, text, active) {
  return {
    number: number,
    text: text,
    active: active
  };
}

export default createComponent({
  props: {
    prevText: String,
    nextText: String,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: 'multi'
    },
    modelValue: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: [Number, String],
      default: 0
    },
    totalItems: {
      type: [Number, String],
      default: 0
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10
    },
    showPageSize: {
      type: [Number, String],
      default: 5
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var count = computed(function () {
      var pageCount = props.pageCount,
          totalItems = props.totalItems,
          itemsPerPage = props.itemsPerPage;
      var count = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count);
    });
    var pages = computed(function () {
      var items = [];
      var pageCount = count.value;
      var showPageSize = +props.showPageSize;
      var modelValue = props.modelValue,
          forceEllipses = props.forceEllipses;

      if (props.mode !== 'multi') {
        return items;
      } // Default page limits


      var startPage = 1;
      var endPage = pageCount;
      var isMaxSized = showPageSize < pageCount; // recompute if showPageSize

      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1; // Adjust if limit is exceeded

        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      } // Add page number links


      for (var number = startPage; number <= endPage; number++) {
        var page = makePage(number, number, number === modelValue);
        items.push(page);
      } // Add links to move between page sets


      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          var prevPages = makePage(startPage - 1, '...');
          items.unshift(prevPages);
        }

        if (endPage < pageCount) {
          var nextPages = makePage(endPage + 1, '...');
          items.push(nextPages);
        }
      }

      return items;
    });

    var select = function select(page, emitChange) {
      page = Math.min(count.value, Math.max(1, page));

      if (props.modelValue !== page) {
        emit('update:modelValue', page);

        if (emitChange) {
          emit('change', page);
        }
      }
    };

    watch(function () {
      return props.modelValue;
    }, function (value) {
      select(value);
    }, {
      immediate: true
    });

    var renderDesc = function renderDesc() {
      if (props.mode !== 'multi') {
        return _createVNode("li", {
          "class": bem('page-desc')
        }, [slots.pageDesc ? slots.pageDesc() : props.modelValue + "/" + count.value]);
      }
    };

    return function () {
      var value = props.modelValue;
      var simple = props.mode !== 'multi';

      var onSelect = function onSelect(value) {
        return function () {
          select(value, true);
        };
      };

      return _createVNode("ul", {
        "class": bem({
          simple: simple
        })
      }, [_createVNode("li", {
        "class": [bem('item', {
          disabled: value === 1
        }), bem('prev'), BORDER],
        "onClick": onSelect(value - 1)
      }, [slots['prev-text'] ? slots['prev-text']() : props.prevText || t('prev')]), pages.value.map(function (page) {
        return _createVNode("li", {
          "class": [bem('item', {
            active: page.active
          }), bem('page'), BORDER],
          "onClick": onSelect(page.number)
        }, [slots.page ? slots.page(page) : page.text]);
      }), renderDesc(), _createVNode("li", {
        "class": [bem('item', {
          disabled: value === count.value
        }), bem('next'), BORDER],
        "onClick": onSelect(value + 1)
      }, [slots['next-text'] ? slots['next-text']() : props.nextText || t('next')])]);
    };
  }
});