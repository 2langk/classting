'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateOneNews = exports.createOneNews = void 0;
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
async function updateOneNews(connection, id, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    Object.assign(Object.assign({}, connection), {
      headers: Object.assign(Object.assign({}, connection.headers), {
        'Content-Type': 'application/json',
      }),
    }),
    Object.assign(Object.assign({}, updateOneNews.METADATA), { path: updateOneNews.path(id) }),
    data,
  );
}
exports.updateOneNews = updateOneNews;
(function (updateOneNews) {
  updateOneNews.METADATA = {
    method: 'PUT',
    path: '/news/:id',
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
  updateOneNews.path = (id) =>
    `/news/${encodeURIComponent(id !== null && id !== void 0 ? id : 'null')}`;
})(updateOneNews || (exports.updateOneNews = updateOneNews = {}));
//# sourceMappingURL=index.js.map
