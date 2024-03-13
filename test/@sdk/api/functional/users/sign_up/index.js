'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.signUpUser = void 0;
const PlainFetcher_1 = require('@nestia/fetcher/lib/PlainFetcher');
async function signUpUser(connection, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    Object.assign(Object.assign({}, connection), {
      headers: Object.assign(Object.assign({}, connection.headers), {
        'Content-Type': 'application/json',
      }),
    }),
    Object.assign(Object.assign({}, signUpUser.METADATA), { path: signUpUser.path() }),
    data,
  );
}
exports.signUpUser = signUpUser;
(function (signUpUser) {
  signUpUser.METADATA = {
    method: 'POST',
    path: '/users/sign-up',
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
  signUpUser.path = () => '/users/sign-up';
})(signUpUser || (exports.signUpUser = signUpUser = {}));
//# sourceMappingURL=index.js.map
