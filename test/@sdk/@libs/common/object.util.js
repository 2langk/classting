'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.F = void 0;
const typia_1 = __importDefault(require('typia'));
const core_1 = require('@fxts/core');
class F {
  static toUnique(arr) {
    return (0, core_1.pipe)(arr, core_1.uniq, core_1.toArray);
  }
  static removeUndefined(target) {
    return (0, core_1.pipe)(
      (0, core_1.entries)(target),
      (0, core_1.map)((entry) => {
        const [key, value] = entry;
        if (Array.isArray(value)) {
          return [
            key,
            value.map((each) => {
              if (Array.isArray(each)) {
                return each.map(this.removeUndefined);
              }
              if ((0, core_1.isObject)(each) && !(each instanceof Date)) {
                return this.removeUndefined(each);
              }
              return each;
            }),
          ];
        }
        if ((0, core_1.isObject)(value) && !(value instanceof Date)) {
          return [key, this.removeUndefined(value)];
        }
        return value !== undefined ? [key, value] : ['_removed_', ''];
      }),
      (0, core_1.filter)((each) => each[0] !== '_removed_'),
      core_1.fromEntries,
    );
  }
  static groupBy(fn, keys, records) {
    if (records) {
      const map = (0, core_1.groupBy)(fn, records);
      if (!keys || keys.length === 0) return map;
      keys.forEach((key) => {
        var _a;
        map[key] = (_a = map[key]) !== null && _a !== void 0 ? _a : [];
      });
      return map;
    }
    return (records) => {
      const map = (0, core_1.groupBy)(fn, records);
      if (!keys || keys.length === 0) return map;
      keys.forEach((key) => {
        var _a;
        map[key] = (_a = map[key]) !== null && _a !== void 0 ? _a : [];
      });
      return map;
    };
  }
  static mapValues(fn, record) {
    if (record) {
      return (0, core_1.pipe)(
        (0, core_1.entries)(record),
        (0, core_1.map)((entry) => {
          const [key, value] = entry;
          return [key, fn({ key, value })];
        }),
        core_1.fromEntries,
      );
    }
    return (record) =>
      (0, core_1.pipe)(
        (0, core_1.entries)(record),
        (0, core_1.map)((entry) => {
          const [key, value] = entry;
          return [key, fn({ key, value })];
        }),
        core_1.fromEntries,
      );
  }
  static recordToArray(fn, record) {
    if (record) {
      return (0, core_1.pipe)(
        (0, core_1.entries)(record),
        (0, core_1.map)((entry) => {
          const [key, value] = entry;
          return fn({ key, value });
        }),
        core_1.toArray,
      );
    }
    return (record) =>
      (0, core_1.pipe)(
        (0, core_1.entries)(record),
        (0, core_1.map)((entry) => {
          const [key, value] = entry;
          return fn({ key, value });
        }),
        core_1.toArray,
      );
  }
}
exports.F = F;
F.clone = typia_1.default.misc.clone;
F.pipe = core_1.pipe;
F.assoicateBy = core_1.indexBy;
//# sourceMappingURL=object.util.js.map
