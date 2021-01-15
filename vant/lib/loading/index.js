"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _vue = require("vue");

var _utils = require("../utils");

var _createNamespace = (0, _utils.createNamespace)('loading'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var SpinIcon = [];

for (var i = 0; i < 12; i++) {
  SpinIcon.push((0, _vue.createVNode)("i", null, null));
}

var CircularIcon = (0, _vue.createVNode)("svg", {
  "class": bem('circular'),
  "viewBox": "25 25 50 50"
}, [(0, _vue.createVNode)("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);

var _default = createComponent({
  props: {
    size: [Number, String],
    color: String,
    vertical: Boolean,
    textSize: [Number, String],
    textColor: String,
    type: {
      type: String,
      default: 'circular'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var spinnerStyle = (0, _vue.computed)(function () {
      return (0, _extends2.default)({
        color: props.color
      }, (0, _utils.getSizeStyle)(props.size));
    });

    var renderText = function renderText() {
      if (slots.default) {
        var _props$textColor;

        return (0, _vue.createVNode)("span", {
          "class": bem('text'),
          "style": {
            fontSize: (0, _utils.addUnit)(props.textSize),
            color: (_props$textColor = props.textColor) != null ? _props$textColor : props.color
          }
        }, [slots.default()]);
      }
    };

    return function () {
      var type = props.type,
          vertical = props.vertical;
      return (0, _vue.createVNode)("div", {
        "class": bem([type, {
          vertical: vertical
        }])
      }, [(0, _vue.createVNode)("span", {
        "class": bem('spinner', type),
        "style": spinnerStyle.value
      }, [type === 'spinner' ? SpinIcon : CircularIcon]), renderText()]);
    };
  }
});

exports.default = _default;