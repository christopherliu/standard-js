/**
 * @requires 	standard_library.utilities.StringUtils
 * @name		standard_library.language.English
 * @namespace 	Contains functions which checks for English grammar and syntax.
 */
if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.language === "undefined")
	standard_library.language = {};
if ( typeof standard_library.language.English === "undefined")
	standard_library.language.English = {};

/**
 * Corrects the usage of verbs to the proper tense. [INCOMPLETE]
 *
 * @param {String}
 * 			subject					The subject of the sentence.
 * @param {String}
 * 			thirdPersonSingular		The verb of the sentence.
 * @returns {String} The correct verb based on the subject.
 */
standard_library.language.English.conjugativeVerb = function(subject, thirdPersonSingular) {
	if (subject.toLowerCase() === "you" || standard_library.language.English.isPlural(subject)) {
		if (thirdPersonSingular === "is")
			return "are";
		else if (thirdPersonSingular === "does")
			return "do";
		else
			return thirdPersonSingular.substring(0, thirdPersonSingular.length - 1);
	} else {
		return thirdPersonSingular;
	}
};

/**
 * Checks if the word is plural. Limited to regular plural nouns.
 *
 * @param {String}
 * 			word	The subject of the sentence.
 * @returns {Boolean} A boolean value on whether the string is plural or not.
 */
standard_library.language.English.isPlural = function(word) {
	return standard_library.utilities.StringUtils.endsWith(word, 's');
}