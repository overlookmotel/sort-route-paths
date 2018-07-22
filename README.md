# sort-route-paths.js

# Sort route paths

## Current status

[![NPM version](https://img.shields.io/npm/v/sort-route-paths.svg)](https://www.npmjs.com/package/sort-route-paths)
[![Build Status](https://img.shields.io/travis/overlookmotel/sort-route-paths/master.svg)](http://travis-ci.org/overlookmotel/sort-route-paths)
[![Dependency Status](https://img.shields.io/david/overlookmotel/sort-route-paths.svg)](https://david-dm.org/overlookmotel/sort-route-paths)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/sort-route-paths.svg)](https://david-dm.org/overlookmotel/sort-route-paths)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/sort-route-paths.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/sort-route-paths/master.svg)](https://coveralls.io/r/overlookmotel/sort-route-paths)

## Usage

Sort route paths so that static routes precede dynamic routes. i.e. `/foo/:id` ranked after `/foo/new`.

This is the order you'd want to add the routes to [express](https://www.npmjs.com/package/express) so that static routes match first i.e. request for `/foo/new` is matched by `/foo/new` route, not `/foo/:id`.

Ranking algorithm stolen from [sort-route-addresses](https://www.npmjs.com/package/sort-route-addresses) but this implementation also puts paths in alphabetical order.

Returns a new array of the paths sorted. Does not alter original array.

```js
const sort = require('sort-route-paths');

const paths = [
  '/*',
  '/:id',
  '/foo',
  '/foo/:id',
  '/foo/bar',
  '/'
];

console.log( sort(paths) );
```

Outputs:

```js
[
  '/',
  '/foo',
  '/foo/bar',
  '/foo/:id',
  '/:id',
  '/*'
]
```

### Sorting objects

Optional 2nd argument can be used to sort objects by a property containing the path.

#### With function

```js
const routes = [
  {id: 1, path: '/foo/:id'},
  {id: 2, path: '/foo/new'}
];

const sortedRoutes = sort( routes, route => route.path );
```

Results in:

```js
[
  {id: 2, path: '/foo/new'},
  {id: 1, path: '/foo/:id'}
];
```

#### With string

Or just provide property name as a string. These two are equivalent:

```js
sort( routes, route => route.path );
sort( routes, 'path' );
```

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/sort-route-paths/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/sort-route-paths/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
