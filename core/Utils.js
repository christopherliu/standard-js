if (!Utils)
	var Utils = {};
Utils.EndsWith = function(word, pattern) {
	return word.match(pattern + '$');
};
/**
 * Returns a random integer from min to max, inclusive
 * 
 * @param {Function}
 *            random A replacement for the random function, if we choose to
 *            seed.
 */
Utils.GenerateRandomInteger = function(min, max, random) {
	if (random)
		return min + Math.floor(random() * (max - min + 1));
	else
		return min + Math.floor(Math.random() * (max - min + 1));
};
// Quick-and-dirty function to test if word is plural, not always accurate.
// Depends on EndsWith.
Utils.IsPlural = function(word) {
	return Utils.EndsWith(word, 's');
}
/**
 * Similar to Array.prototype.map construct, but for Objects. Only includes
 * properties of the object itself, and not its prototypes.
 * 
 * @deprecated use Object.keys()
 */
Utils.ForEachOwnProperty = function(obj, testFunction) {
	for ( var propertyName in obj) {
		if (obj.hasOwnProperty(propertyName)) {
			testFunction(propertyName, obj[propertyName]);
		}
	}
};
/**
 * Removes an element, or set of elements, from within an array
 */
// Array Remove - By John Resig (MIT Licensed)
Utils.Remove = function(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};
/**
 * Returns an array that only contains the unique items in the array. Uniqueness
 * is determined by a key that is calculated for each item in the array.
 */
Utils.Unique = function(ar, keyFunction) {
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
 * Splits a string by regexp without including capturing groups in the result.
 * 
 * See the following for more context:
 * http://blog.getify.com/2010/11/to-capture-or-not/
 * 
 * Why [\s\S] instead of .?: All common Perl-like regular expression flavors
 * except JavaScript include a flag that allows dot to match newlines. Without
 * this mode, matching any single character requires, e.g., [\s\S]
 * 
 * @param {String}
 *            str
 * @param {Regex}
 *            split
 */
Utils.SplitWithoutCapture = function(str, split) {
	var flags = (split.global ? "g" : "") + (split.ignoreCase ? "i" : "")
			+ (split.multiline ? "m" : "");
	var newRegExp = new RegExp(split.source.replace(/\(([^?][\s\S]*?)\)/g,
			"(?:$1)"), flags);
	return str.split(newRegExp);
};
Utils.StartsWith = function(me, str) {
	return me.slice(0, str.length) == str;
};
/**
 * Similar to Array.prototype.some, but returns the first element that satisfies
 * the finding function, or false if none found.
 */
Utils.FindFirst = function(ar, findFunction) {
	for ( var i = 0, len = ar.length; i < len; i++) {
		if (findFunction(ar[i])) {
			return ar[i];
		}
	}
	return false;
};
/**
 * Once condition is true, run action.
 */
Utils.Once = function (condition, action) {
	function wait() {
		if (condition()) {
			action();
		} else {
			setTimeout(wait, 60);
		}
	}
	wait();
};