/**
 * @name 		standard_library.utilities.ArrayUtils
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
 * 			from	The starting index to remove elements from the array, inclusive.
 * @param {Number}
 * 			to		The ending index to remove elemenets from the array, inclusive.
 * @returns {Number} The new length of the array.
 */
standard_library.utilities.ArrayUtils.remove = function(array, from, to) {"use strict"
	if (!Array.isArray(array) || typeof from !== "number" || (to && typeof to !== "number"))
		return undefined;
	if ((array.length + from < 0) || (to && array.length + to < 0))
		return undefined;
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};

/**
 * Returns an array that only contains the unique items in the array.
 * Goes through each element in the array. If have already been added
 * then it ignores it. Else, it adds the element.
 *
 * @param {Array}
 * 			array	The array of data to search through.
 * @param {Function}
 * 			fnKey	The function which checks each element in the array and 
 * 					changes the elements such that they are unique by its definition.
 * @returns {Array} An array with only unique elements.
 */
standard_library.utilities.ArrayUtils.unique = function(array, fnKey) {"use strict";
	var _keys = {};
	if (!Array.isArray(array) || typeof fnKey !== "function")
		return undefined;
	return array.filter(function(item) {
		if (_keys[fnKey(item)]) {
			return false;
		} else {
			_keys[fnKey(item)] = true;
			return true;
		}
	});
};

/**
 * Similar to Array.prototype.some, but returns the first element that satisfies
 * the finding function, or false if none found.
 *
 * @param {Array}
 * 			array	The array of data to search through.
 * @param [Function]
 * 			fnFind	The function which searches the array;
 * 					must take in a single parameter of an elemnt
 * @returns {T} Anything in the array and matches the first element.
 */
standard_library.utilities.ArrayUtils.findFirst = function(array, fnFind) {"use strict";
	if (!Array.isArray(array) || typeof fnFind !== "function")
		return undefined;
	else {
		for (var i = 0, len = array.length; i < len; i++) {
			if (fnFind(array[i])) {
				return array[i];
			}
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
standard_library.utilities.ArrayUtils.sum = function(ar) {"use strict";
	if (!Array.isArray(ar))
		return undefined;
	else {
		var a = 0;
		for (var i = 0; i < ar.length; i++) {
			if ( typeof ar[i] === "number") {
				a = a + ar[i];
			} else {
				return undefined;
			}
		}
		return a;
	}
}; 