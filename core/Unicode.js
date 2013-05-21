if (!Unicode)
	var Unicode = {};
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