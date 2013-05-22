if (!this.standard_library) {
	this.standard_library = {};
}
if (!standard_library.utilities.StringUtils) {
	standard_library.utilities.StringUtils = {};
}


/** Determines if the word starts with the pattern.
 */
standard_library.utilities.StringUtils.StartsWith = function(me, str) {
	return me.slice(0, str.length) == str;
};	

/** Determines if the word ends with the pattern.
 */
standard_library.utilities.StringUtils.EndsWith = function(word, pattern) {
	return word.match(pattern + '$');
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
//String
standard_library.utilities.StringUtils.SplitWithoutCapture = function(str, split) {
	var flags = (split.global ? "g" : "") + (split.ignoreCase ? "i" : "")
			+ (split.multiline ? "m" : "");
	var newRegExp = new RegExp(split.source.replace(/\(([^?][\s\S]*?)\)/g,
			"(?:$1)"), flags);
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
 * 
 * 
 * @param {UnicodeString}
 *            str
 * @returns {ASCIIFriendlyString}
 */
Unicode.MakeStringASCIIInvariant = function(str) {
	// http://www.fileformat.info/info/unicode/char/2019/index.htm
	return str.replace("’", "'");
};