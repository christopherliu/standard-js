/**
 * @name		standard_library.utilities.StringUtils
 * @namespace 	Contains functions which manipulate strings.
 */
if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.utilities === "undefined")
	standard_library.utilities = {};
if ( typeof standard_library.utilities.StringUtils === "undefined")
	standard_library.utilities.StringUtils = {};

/**
 * @param {String}
 * 			word	The string to check on.
 * @param {String}
 * 			prefix	The substring to check in the string.
 * @returns {Boolean} True if word starts with prefix, false otherwise.
 */
standard_library.utilities.StringUtils.startsWith = function(word, prefix) {"use strict";
	if ( typeof word !== "string" || typeof prefix !== "string")
		return undefined
	else
		return word.slice(0, prefix.length) === prefix;
};

/**
 * @param {String}
 * 			word	The string to check on
 * @param {String}
 * 			suffix	The substring to check in the string.
 * @returns {Boolean} True if the world ends with suffix, false otherwise.
 *
 */
standard_library.utilities.StringUtils.endsWith = function(word, suffix) {"use strict";
	if ( typeof word !== "string" || typeof suffix !== "string")
		return undefined;
	else
		return word.indexOf(suffix, word.length - suffix.length) !== -1;
};

/**
 * @param {String}
 * 			word	The string to check on.
 * @param {String}
 * 			pattern	The substring to check in the string.
 * @returns {Boolean} True if word ends with str, false otherwise.
 */
standard_library.utilities.StringUtils.endsWithRegex = function(word, pattern) {"use strict";
	if ( typeof word !== "string" || typeof pattern !== "string")
		return undefined;
	else
		return !!word.match(pattern + '$');
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
 *            str		The string to be split
 * @param {Regex}
 *            split		The regexp instructions to split the string with.
 */
standard_library.utilities.StringUtils.splitWithoutCapture = function(str, split) {
	var flags = (split.global ? "g" : "") + (split.ignoreCase ? "i" : "") + (split.multiline ? "m" : "");
	var newRegExp = new RegExp(split.source.replace(/\(([^?][\s\S]*?)\)/g, "(?:$1)"), flags);
	return str.split(newRegExp);
};

/**
 * While some Unicode characters can generally be translated into equivalent
 * ASCII code points, quite a few cannot. This creates an issue when dealing
 * with a subsystem that can't handle Unicode (for example, python-SpiderMonkey
 * in Linux).
 *
 * This function takes characters that wouldn't have the same code point in
 * ASCII, and removes or replaces them.
 * http://www.fileformat.info/info/unicode/char/2019/index.htm
 *
 * @param {UnicodeString}
 *            str		The string in unicode format.
 * @returns {ASCIIFriendlyString} The string in ASCII format.
 */
standard_library.utilities.StringUtils.makeStringASCIIInvariant = function(str) {"use strict";
	if ( typeof str !== "string")
		return undefined;
	else
		return str.replace("’", "'");
};
