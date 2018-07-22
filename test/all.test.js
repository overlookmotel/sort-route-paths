/* --------------------
 * sort-route-paths module
 * Tests
 * ------------------*/

'use strict';

// Modules
const chai = require('chai'),
	{expect} = chai,
	sort = require('../lib/');

// Init
chai.config.includeStack = true;

// Tests

/* jshint expr: true */
/* global describe, it, beforeEach */

const paths = [
	'/',
	'/login',
	'/artists',
	'/artists/new',
	'/artists/*',
	'/artists/:id',
	'/artists/:id/edit',
	'/artists/:id/delete',
	'/artists/albums',
	'/artists/albums/new',
	'/artists/albums/:id',
	'/artists/albums/:id/edit',
	'/artists/albums/:id/delete',
	'/artists/:id/albums',
	'/artists/:id/albums/new',
	'/artists/:id/albums/:id',
	'/artists/:id/albums/:id/edit',
	'/artists/:id/albums/:id/delete',
	'/*',
	'/:foo/:bar/:baz',
	'/*/baz/*'
];

const expectedOutput = [
	'/',
	'/artists',
	'/artists/albums',
	'/artists/albums/new',
	'/artists/albums/:id',
	'/artists/albums/:id/delete',
	'/artists/albums/:id/edit',
	'/artists/new',
	'/artists/:id',
	'/artists/:id/albums',
	'/artists/:id/albums/new',
	'/artists/:id/albums/:id',
	'/artists/:id/albums/:id/delete',
	'/artists/:id/albums/:id/edit',
	'/artists/:id/delete',
	'/artists/:id/edit',
	'/artists/*',
	'/login',
	'/*/baz/*',
	'/:foo/:bar/:baz',
	'/*'
];

describe('`sort()`', function() {
	beforeEach(function() {
		this.input = paths.concat();
		this.output = sort(this.input);
	});

	it('returns array', function() {
		expect(this.output).to.be.an('array');
	});

	it('returns new array', function() {
		expect(this.output).not.to.equal(this.input);
	});

	it('returns sorted', function() {
		expect(this.output).to.deep.equal(expectedOutput);
	});

	it('does not alter input', function() {
		expect(this.input).to.deep.equal(paths);
	});
});

describe('`sort()` with accessor function', function() {
	beforeEach(function() {
		this.input = paths.map(path => ({path}));
		this.output = sort(this.input, obj => obj.path);
	});

	it('returns array', function() {
		expect(this.output).to.be.an('array');
	});

	it('returns new array', function() {
		expect(this.output).not.to.equal(this.input);
	});

	it('returns sorted', function() {
		expect(this.output).to.deep.equal(expectedOutput.map(path => ({path})));
	});

	it('does not alter input', function() {
		expect(this.input).to.deep.equal(paths.map(path => ({path})));
	});
});

describe('`sort()` with accessor string', function() {
	beforeEach(function() {
		this.input = paths.map(path => ({path}));
		this.output = sort(this.input, 'path');
	});

	it('returns array', function() {
		expect(this.output).to.be.an('array');
	});

	it('returns new array', function() {
		expect(this.output).not.to.equal(this.input);
	});

	it('returns sorted', function() {
		expect(this.output).to.deep.equal(expectedOutput.map(path => ({path})));
	});

	it('does not alter input', function() {
		expect(this.input).to.deep.equal(paths.map(path => ({path})));
	});
});
