'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createOneSchool = void 0;
const PlainFetcher_1 = require('@nestia/fetcher/lib/PlainFetcher');
async function createOneSchool(connection, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    Object.assign(Object.assign({}, connection), {
      headers: Object.assign(Object.assign({}, connection.headers), {
        'Content-Type': 'application/json',
      }),
    }),
    Object.assign(Object.assign({}, createOneSchool.METADATA), { path: createOneSchool.path() }),
    data,
  );
}
exports.createOneSchool = createOneSchool;
(function (createOneSchool) {
  createOneSchool.METADATA = {
    method: 'POST',
    path: '/schools',
    request: {
      type: 'application/json',
      encrypted: false,
    },
    response: {
      type: 'application/json',
      encrypted: false,
    },
    status: null,
  };
  createOneSchool.path = () => '/schools';
})(createOneSchool || (exports.createOneSchool = createOneSchool = {}));
//# sourceMappingURL=index.js.map
