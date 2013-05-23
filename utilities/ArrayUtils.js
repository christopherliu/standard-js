/**
 * @name		standard_library.utilities.ArrayUtils
 * @namespace 	Contains functions which manipulate array objects.
 */
if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.utilities === "undefined")
	standard_library.utilities = {};
if ( typeof standard_library.utilities.ArrayUtils === "undefined")
	standard_library.utilities.ArrayUtils = {};
	
/**
 * Removes an element, or set of elements, from within an array.
 * Array Remove - By John Resig (MIT Licensed)
 * 
 * @param {Array}
 * 			array	An array with values.
 * @param {Number}
 * 			from	
 * @param {Number}
 * 			to
 * @returns {Number} The new length of the array.
 */
standard_library.utilities.ArrayUtils.remove = function(array, from, to) {
	"use strict"
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};

/**
 * Returns an array that only contains the unique items in the array. Uniqueness
 * is determined by a key that is calculated for each item in the array.
 * 
 * @param {Array}
 * 			array
 * @param {kyFunction}
 * 			function
 */
standard_library.utilities.ArrayUtils.unique = function(array, keyFunction) {
	"use strict";
	var _keys = {};
	return array.filter(function(item) {
		if (_keys[keyFunction(item)])
			return false;
		else
			_keys[keyFunction(item)] = true;
		return true;
	});
};

/**
 * Similar to Array.prototype.some, but returns the first element that satisfies
 * the finding function, or false if none found.
 * 
 * @param {Array}
 * 			array			.
 * @param [Function]
 * 			findFunction
 */
standard_library.utilities.ArrayUtils.findFirst = function(array, findFunction) {
	"use strict";
	if (!Array.isArray(ar) || typeof findFunction === "function") {
		return undefined;
	else {
		for (var i = 0, len = array.length; i < len; i++) {
		if (findFunction(array[i])) {
			return array[i];
		}
	}
	return false;
}; 

/**
 * Sums the values of an array.
 * 
 * @param {Number[]}
 * 			ar	An array object of numbers.
 * @returns {Number} the sum of the array elements
 */
standard_library.utilities.ArrayUtils.sum = function(ar) {
	"use strict";
	if (!Array.isArray(ar))
		return undefined;
	else {
		var a = 0;
		for (var i = 0; i < ar.length; i++) {
			if (typeof ar[i] === "number") {
				a = a + ar[i];
			} else {
				return undefined;
			}
		}
		return a;
	}
};