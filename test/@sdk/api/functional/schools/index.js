'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findManySchool = exports.createOneSchool = void 0;
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
async function findManySchool(connection, data) {
  return PlainFetcher_1.PlainFetcher.propagate(
    connection,
    Object.assign(Object.assign({}, findManySchool.METADATA), { path: findManySchool.path(data) }),
  );
}
exports.findManySchool = findManySchool;
(function (findManySchool) {
  findManySchool.METADATA = {
    method: 'GET',
    path: '/schools',
    request: null,
    response: {
      type: 'application/json',
      encrypted: false,
    },
    status: null,
  };
  findManySchool.path = (data) => {
    const variables = new URLSearchParams();
    for (const [key, value] of Object.entries(data))
      if (undefined === value) continue;
      else if (Array.isArray(value)) value.forEach((elem) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location = '/schools';
    return 0 === variables.size ? location : `${location}?${variables.toString()}`;
  };
})(findManySchool || (exports.findManySchool = findManySchool = {}));
//# sourceMappingURL=index.js.map
