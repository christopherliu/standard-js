if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.utilities === "undefined")
	standard_library.utilities = {};
if ( typeof standard_library.utilities.ArrayUtils === "undefined")
	standard_library.utilities.ArrayUtils = {};
	
/**
 * Removes an element, or set of elements, from within an array
 */
// Array Remove - By John Resig (MIT Licensed)
//Array
standard_library.utilities.ArrayUtils.Remove = function(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};

/**
 * Returns an array that only contains the unique items in the array. Uniqueness
 * is determined by a key that is calculated for each item in the array.
 */
//Array
standard_library.utilities.ArrayUtils.Unique = function(ar, keyFunction) {
	var _keys = {};
	return ar.filter(function(item) {
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
 */
//Array
standard_library.utilities.ArrayUtils.FindFirst = function(ar, findFunction) {
	for (var i = 0, len = ar.length; i < len; i++) {
		if (findFunction(ar[i])) {
			return ar[i];
		}
	}
	return false;
}; 