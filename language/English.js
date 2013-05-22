/**
 * @name		standard_library.language.English
 * @namespace 	Contains functions which checks for English grammar and syntax.
 */
if ( typeof standard_library === "undefined")
	var standard_library = {}
if ( typeof standard_library.language === "undefined")
	standard_library.language = {}
if ( typeof standard_library.language.English === "undefined")
	standard_library.language.English = {}

/**
 * Corrects the usage of verbs to the proper tense. [INCOMPLETE]
 * @param {Object}
 * 			subject					The subject using the verb.
 * @param {Object}
 * 			thirdPersonSingular		The verb being used by the subject.
 * @return {Object} The correct verb based on the subject.
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

// Quick-and-dirty function to test if word is plural, not always accurate.
// Depends on EndsWith.
/**
 * Checks if the word is plural. Limited to regular plural nouns.
 * @param {Object}
 * 			word	The subject to be checked.
 */
standard_library.language.English.isPlural = function(word) {
	return standard_library.utilities.StringUtils.endsWith(word, 's');
}