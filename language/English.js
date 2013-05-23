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
 * Corrects the usage of third person singular verbs to the proper tense.
 *
 * @param {String}
 * 			subject					The subject of the sentence.
 * @param {String}
 * 			thirdPersonSingular		The verb of the sentence.
 * @returns {String} The correct verb based on the subject.
 */
standard_library.language.English.conjugateVerb = function(subject, thirdPersonSingular) {
	"use strict";
	if (typeof subject !== "string" || typeof thirdPersonSingular !== "string")
		return undefined;
	if (subject.toLowerCase() === "you" || subject.toLowerCase() === "they" || subject.toLowerCase() === "we" || standard_library.language.English.isPlural(subject)) {
		if (thirdPersonSingular === "is")
			return "are";
		else if (thirdPersonSingular === "does")
			return "do";
		else if (standard_library.utilities.StringUtils.endsWith(thirdPersonSingular, "s"))
			return thirdPersonSingular.substring(0, thirdPersonSingular.length - 1);
		else
			return undefined;
	} else {
		return thirdPersonSingular;
	}
};

/**
 * Checks if the word is plural. Limited to regular plural nouns.
 *
 * @param {String}
 * 			word	The subject of the sentence.
 * @returns {Boolean} True if word is plural, false otherwise.
 */
standard_library.language.English.isPlural = function(word) {
	"use strict";
	return standard_library.utilities.StringUtils.endsWith(word, 's');
}