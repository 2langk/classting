'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createOneNews = void 0;
const PlainFetcher_1 = require('@nestia/fetcher/lib/PlainFetcher');
async function createOneNews(connection, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    Object.assign(Object.assign({}, connection), {
      headers: Object.assign(Object.assign({}, connection.headers), {
        'Content-Type': 'application/json',
      }),
    }),
    Object.assign(Object.assign({}, createOneNews.METADATA), { path: createOneNews.path() }),
    data,
  );
}
exports.createOneNews = createOneNews;
(function (createOneNews) {
  createOneNews.METADATA = {
    method: 'POST',
    path: '/news',
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
  createOneNews.path = () => '/news';
})(createOneNews || (exports.createOneNews = createOneNews = {}));
//# sourceMappingURL=index.js.map
