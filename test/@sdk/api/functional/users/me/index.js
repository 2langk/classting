'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getUserMe = void 0;
const PlainFetcher_1 = require('@nestia/fetcher/lib/PlainFetcher');
async function getUserMe(connection) {
  return PlainFetcher_1.PlainFetcher.propagate(
    connection,
    Object.assign(Object.assign({}, getUserMe.METADATA), { path: getUserMe.path() }),
  );
}
exports.getUserMe = getUserMe;
(function (getUserMe) {
  getUserMe.METADATA = {
    method: 'GET',
    path: '/users/me',
    request: null,
    response: {
      type: 'application/json',
      encrypted: false,
    },
    status: null,
  };
  getUserMe.path = () => '/users/me';
})(getUserMe || (exports.getUserMe = getUserMe = {}));
//# sourceMappingURL=index.js.map
