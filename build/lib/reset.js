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
var reset_exports = {};
__export(reset_exports, {
  resetAllTimerValuesAndState: () => resetAllTimerValuesAndState,
  resetValues: () => resetValues
});
module.exports = __toCommonJS(reset_exports);
var import_store = require("../store/store");
var import_timer_data = require("./timer-data");
var import_write_state = require("./write-state");
const resetValues = (timer, index) => {
  const store = (0, import_store.useStore)();
  const _this = store._this;
  try {
    import_timer_data.timerObject.timerActive.timer[index] = false;
    timer.hour = store.valHourForZero || "";
    timer.minute = store.valMinuteForZero || "";
    timer.second = store.valSecondForZero || "";
    timer.string_Timer = "00:00:00 h";
    timer.string_2_Timer = "";
    timer.onlySec = 0;
    timer.timeLeftSec = 0;
    timer.index = 0;
    timer.name = "Timer";
    timer.start_Time = "00:00:00";
    timer.end_Time = "00:00:00";
    timer.inputDevice = "";
    timer.timerInterval = 0;
    timer.lengthTimer = "";
    timer.percent = 0;
    timer.percent2 = 0;
    timer.changeValue = false;
    _this.setObjectAsync("alexa-timer-vis.0." + index, {
      type: "device",
      common: { name: `` },
      native: {}
    });
  } catch (e) {
    _this.log.error("Error in resetValues: " + JSON.stringify(e));
    _this.log.error(JSON.stringify(e.stack));
  }
};
function resetAllTimerValuesAndState() {
  Object.keys(import_timer_data.timerObject.timer).forEach((el) => {
    resetValues(import_timer_data.timerObject.timer[el], el);
    (0, import_write_state.writeState)(false);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resetAllTimerValuesAndState,
  resetValues
});
//# sourceMappingURL=reset.js.map