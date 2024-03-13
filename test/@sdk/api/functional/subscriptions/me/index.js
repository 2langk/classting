'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getSubscriptionMe = void 0;
const PlainFetcher_1 = require('@nestia/fetcher/lib/PlainFetcher');
async function getSubscriptionMe(connection) {
  return PlainFetcher_1.PlainFetcher.propagate(
    connection,
    Object.assign(Object.assign({}, getSubscriptionMe.METADATA), {
      path: getSubscriptionMe.path(),
    }),
  );
}
exports.getSubscriptionMe = getSubscriptionMe;
(function (getSubscriptionMe) {
  getSubscriptionMe.METADATA = {
    method: 'GET',
    path: '/subscriptions/me',
    request: null,
    response: {
      type: 'application/json',
      encrypted: false,
    },
    status: null,
  };
  getSubscriptionMe.path = () => '/subscriptions/me';
})(getSubscriptionMe || (exports.getSubscriptionMe = getSubscriptionMe = {}));
//# sourceMappingURL=index.js.map
