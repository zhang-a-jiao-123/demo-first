"use strict";

exports.__esModule = true;
exports.parseFormat = parseFormat;

var _utils = require("../utils");

function parseFormat(format, currentTime) {
  var days = currentTime.days;
  var hours = currentTime.hours,
      minutes = currentTime.minutes,
      seconds = currentTime.seconds,
      milliseconds = currentTime.milliseconds;

  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', (0, _utils.padZero)(days));
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', (0, _utils.padZero)(hours));
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', (0, _utils.padZero)(minutes));
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', (0, _utils.padZero)(seconds));
  }

  if (format.indexOf('S') !== -1) {
    var ms = (0, _utils.padZero)(milliseconds, 3);

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms);
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  return format;
}