define('standard_library/language/English', ['standard_library/utilities/StringUtils'], function(StringUtils) {"use strict";
    /**
     * @requires    standard_library.utilities.StringUtils
     * @name        standard_library.language.English
     * @namespace   Contains functions which check English grammar and
     * syntax.
     */
    var _this = {
        /**
         * @returns The Americanized form of the original word.
         */
        "americanize" : function(word) {
            return (word === "armour" ? "armor" : word);
        },
        /**
         * @returns The English (Anglicized) form of the original word.
         */
        "anglicize" : function(word) {
            return (word === "armor" ? "armour" : word);
        },
        /**
         * Corrects the usage of third person singular verbs to the proper tense.
         *
         * @param {String}
         *          subject                 The subject of the sentence.
         * @param {String}
         *          thirdPersonSingular     The verb of the sentence.
         * @returns {String} The correct verb based on the subject.
         */
        "conjugateVerb" : function(subject, thirdPersonSingular) {
            if ( typeof subject !== "string" || typeof thirdPersonSingular !== "string")
                return undefined;
            if (_this.isPlural(subject)) {
                if (thirdPersonSingular === "is")
                    return "are";
                else if (thirdPersonSingular === "does")
                    return "do";
                else if (thirdPersonSingular === "has")
                    return "have";
                else if (thirdPersonSingular === "goes")
                    return "go";
                else if (StringUtils.endsWith(thirdPersonSingular, "s"))
                    return thirdPersonSingular.substring(0, thirdPersonSingular.length - 1);
                else
                    return undefined;
            } else {
                return thirdPersonSingular;
            }
        },

        /**
         * Checks if the word is plural. Limited to regular plural nouns.
         *
         * @param {String}
         *          subject The subject of the sentence.
         * @returns {Boolean} True if word is plural, false otherwise.
         */
        "isPlural" : function(subject) {
            return subject.toLowerCase() === "you" || subject.toLowerCase() === "they" || subject.toLowerCase() === "we" || StringUtils.endsWith(subject, 's');
        },

        "pluralize" : function(singularNoun, number) {
            if (number !== 1)
                return number + " " + singularNoun + "s";
            else
                return number + " " + singularNoun;
        }
    };
    return _this;
});
//define
