"use strict";

exports.__esModule = true;
exports.useRefs = useRefs;

var _vue = require("vue");

function useRefs() {
  var refs = (0, _vue.ref)([]);
  (0, _vue.onBeforeUpdate)(function () {
    refs.value = [];
  });

  var setRefs = function setRefs(index) {
    return function (el) {
      refs.value[index] = el;
    };
  };

  return [refs, setRefs];
}