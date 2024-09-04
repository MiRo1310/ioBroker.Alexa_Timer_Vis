"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var start_timer_exports = {};
__export(start_timer_exports, {
  startTimer: () => startTimer
});
module.exports = __toCommonJS(start_timer_exports);
var import_timer_data = require("./timer-data");
var import_store = require("../store/store");
var import_global = require("./global");
var import_get_input_device = require("./get-input-device");
var import_interval = require("./interval");
var import_timer_name = require("./timer-name");
const startTimer = async (sec, name, inputString) => {
  const store = (0, import_store.useStore)();
  const _this = store._this;
  try {
    let timerSelector;
    Object.keys(import_timer_data.timerObject.timerActive.timer).forEach((i) => {
      if (import_timer_data.timerObject.timerActive.timer[i] === false) {
        import_timer_data.timerObject.timerActive.timer[i] = true;
        timerSelector = i;
      }
    });
    await (0, import_get_input_device.getInputDevice)(import_timer_data.timerObject.timer[timerSelector]);
    await (0, import_timer_name.registerIdToGetTimerName)(timerSelector);
    const jsonAlexa = await _this.getForeignStateAsync(`alexa2.0.History.json`);
    let startTimer2;
    if (jsonAlexa && (0, import_global.isString)(jsonAlexa.val)) {
      startTimer2 = JSON.parse(jsonAlexa.val).creationTime;
    } else
      startTimer2 = (/* @__PURE__ */ new Date()).getTime();
    const start_Time = (0, import_global.timeToString)(startTimer2);
    const timerMilliseconds = sec * 1e3;
    const endTimeMilliseconds = startTimer2 + timerMilliseconds;
    const endTimeString = (0, import_global.timeToString)(endTimeMilliseconds);
    saveToObject(timerSelector, endTimeMilliseconds, endTimeString, start_Time);
    await setDeviceNameInStateName(timerSelector, _this, store);
    const timer = import_timer_data.timerObject.timer[timerSelector];
    if (isMoreThanAMinute(sec)) {
      (0, import_interval.interval)(sec, timerSelector, inputString, name, timer, store.intervalMore60 * 1e3, false);
      return;
    }
    import_timer_data.timerObject.timer.timer1.timerInterval = store.intervalLess60 * 1e3;
    (0, import_interval.interval)(sec, timerSelector, inputString, name, timer, store.intervalLess60 * 1e3, true);
  } catch (e) {
    _this.log.error("Error in startTimer: " + JSON.stringify(e));
    _this.log.error("Error in startTimer: " + JSON.stringify(e.stack));
  }
};
async function setDeviceNameInStateName(timerBlock, _this, store) {
  if ((0, import_global.isString)(timerBlock)) {
    await _this.setObjectAsync("alexa-timer-vis.0." + timerBlock, {
      type: "device",
      common: { name: `${store.deviceName}` },
      native: {}
    });
  }
}
function isMoreThanAMinute(sec) {
  return sec > 60;
}
function saveToObject(timerBlock, endTimeNumber, endTimeString, start_Time) {
  if (timerBlock) {
    import_timer_data.timerObject.timer[timerBlock].endTime = endTimeNumber;
    import_timer_data.timerObject.timer[timerBlock].end_Time = endTimeString;
    import_timer_data.timerObject.timer[timerBlock].start_Time = start_Time;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  startTimer
});
//# sourceMappingURL=start-timer.js.map
