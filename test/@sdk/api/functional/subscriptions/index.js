'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.upsertOneSubscription = void 0;
const PlainFetcher_1 = require('@nestia/fetcher/lib/PlainFetcher');
async function upsertOneSubscription(connection, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    Object.assign(Object.assign({}, connection), {
      headers: Object.assign(Object.assign({}, connection.headers), {
        'Content-Type': 'application/json',
      }),
    }),
    Object.assign(Object.assign({}, upsertOneSubscription.METADATA), {
      path: upsertOneSubscription.path(),
    }),
    data,
  );
}
exports.upsertOneSubscription = upsertOneSubscription;
(function (upsertOneSubscription) {
  upsertOneSubscription.METADATA = {
    method: 'POST',
    path: '/subscriptions',
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
  upsertOneSubscription.path = () => '/subscriptions';
})(upsertOneSubscription || (exports.upsertOneSubscription = upsertOneSubscription = {}));
//# sourceMappingURL=index.js.map
