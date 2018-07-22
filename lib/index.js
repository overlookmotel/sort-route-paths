/* --------------------
 * sort-route-paths module
 * ------------------*/

'use strict';

// Exports
module.exports = function(arr, accessor) {
	// Conform arguments
	if (!Array.isArray(arr)) throw new Error('paths must be an array');

	if (accessor == null) {
		accessor = (path) => path;
	} else if (typeof accessor == 'string') {
		const key = accessor;
		accessor = (obj) => obj[key];
	} else if (typeof accessor != 'function') {
		throw new Error('accessor must be a function or string if provided');
	}

	// Convert input arr to internal representation with paths split into parts
	arr = arr.map(item => {
		// Use accessor to retrieve path
		const path = accessor(item);

		// Split path into parts by '/', removing preceding/trailing slashes
		let parts = path.split('/');
		if (parts[0] == '') parts.shift();
		if (parts[parts.length - 1] == '') parts.length--;

		// For each part of path, determine if is dynamic (':...' or '*')
		// + determine if path has any static parts
		let hasStatic = parts.length == 0 ? 1 : 0;
		parts = parts.map(part => {
			const dyn = dynScore(part);
			if (!dyn) hasStatic = 1;
			return {str: part, dyn};
		});

		return {item, parts, hasStatic};
	});

	// Sort by path priority
	arr.sort((line1, line2) => {
		// Paths with no static parts ranked lower
		const res = compare(line2.hasStatic, line1.hasStatic);
		if (res) return res;

		// Compare parts one by one
		// Dynamic routes ranked lower, then sort alphabetically
		const parts1 = line1.parts, parts2 = line2.parts,
			len1 = parts1.length, len2 = parts2.length,
			minLen = Math.min(len1, len2);

		for (let i = 0; i < minLen; i++) {
			const res = compareParts(parts1[i], parts2[i]);
			if (res) return res;
		}

		// Compared path parts identical - rank longer paths lower
		return compare(len1, len2);
	});

	// Return routes array
	return arr.map(line => line.item);
};

function compareParts(part1, part2) {
	// Dynamic routes ranked lower
	const res = compare(part1.dyn, part2.dyn);
	if (res) return res;

	// Rank in alphabetical order
	return compare(part1.str, part2.str);
}

function compare(item1, item2) {
	if (item1 > item2) return 1;
	if (item1 < item2) return -1;
	return 0;
}

function dynScore(str) {
	const char = str[0];
	if (char == '*') return 2;
	if (char == ':') return 1;
	return 0;
}
