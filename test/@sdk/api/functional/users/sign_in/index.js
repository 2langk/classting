'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.signInUser = void 0;
const PlainFetcher_1 = require('@nestia/fetcher/lib/PlainFetcher');
async function signInUser(connection, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    Object.assign(Object.assign({}, connection), {
      headers: Object.assign(Object.assign({}, connection.headers), {
        'Content-Type': 'application/json',
      }),
    }),
    Object.assign(Object.assign({}, signInUser.METADATA), { path: signInUser.path() }),
    data,
  );
}
exports.signInUser = signInUser;
(function (signInUser) {
  signInUser.METADATA = {
    method: 'POST',
    path: '/users/sign-in',
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
  signInUser.path = () => '/users/sign-in';
})(signInUser || (exports.signInUser = signInUser = {}));
//# sourceMappingURL=index.js.map
