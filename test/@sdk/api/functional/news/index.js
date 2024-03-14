'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findManyNews =
  exports.deleteOneNews =
  exports.updateOneNews =
  exports.createOneNews =
    void 0;
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
async function deleteOneNews(connection, id) {
  return PlainFetcher_1.PlainFetcher.propagate(
    connection,
    Object.assign(Object.assign({}, deleteOneNews.METADATA), { path: deleteOneNews.path(id) }),
  );
}
exports.deleteOneNews = deleteOneNews;
(function (deleteOneNews) {
  deleteOneNews.METADATA = {
    method: 'DELETE',
    path: '/news/:id',
    request: null,
    response: {
      type: 'application/json',
      encrypted: false,
    },
    status: null,
  };
  deleteOneNews.path = (id) =>
    `/news/${encodeURIComponent(id !== null && id !== void 0 ? id : 'null')}`;
})(deleteOneNews || (exports.deleteOneNews = deleteOneNews = {}));
async function findManyNews(connection, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    connection,
    Object.assign(Object.assign({}, findManyNews.METADATA), { path: findManyNews.path(data) }),
  );
}
exports.findManyNews = findManyNews;
(function (findManyNews) {
  findManyNews.METADATA = {
    method: 'GET',
    path: '/news',
    request: null,
    response: {
      type: 'application/json',
      encrypted: false,
    },
    status: null,
  };
  findManyNews.path = (data) => {
    const variables = new URLSearchParams();
    for (const [key, value] of Object.entries(data))
      if (undefined === value) continue;
      else if (Array.isArray(value)) value.forEach((elem) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location = '/news';
    return 0 === variables.size ? location : `${location}?${variables.toString()}`;
  };
})(findManyNews || (exports.findManyNews = findManyNews = {}));
//# sourceMappingURL=index.js.map
