/**
 * @requires 	standard_library.core.ECMAScript.v5
 * @requires	standard_library.utilities.StringUtils
 * @name 		standard_library.utilities.HTML
 * @namespace 	Holds functionality related to managing the standard library.
 */
if ( typeof standard_library === "undefined")
    var standard_library = {};
if (!standard_library.utilities)
    standard_library.utilities = {};
if (!standard_library.utilities.HTML)
    standard_library.utilities.HTML = {};

/**
 * Given a query string, break it apart into an object.
 * Query strings are the data in a URL after the '?'
 * Handles arrays using PHP/ASP conventions:
 * http://stackoverflow.com/a/1746566/40352
 * Note: Not all frameworks will support this behavior.
 *
 * @example HTML.breakQueryStringIntoParameters("fox=animal") === {"fox":
 * "animal"}
 * @example HTML.breakQueryStringIntoParameters("array[]=1&array[]=2") ===
 * {"array": [1,2]}
 * @example HTML.breakQueryStringIntoParameters("") === {}
 *
 * @param {String}
 * 			queryString	The string which is to be broken.
 * @returns {Object} Object of the string after it has been broken up.
 */
standard_library.utilities.HTML.breakQueryStringIntoParameters = function(queryString) {"use strict";
    // TODO Maybe update with better version.
    // http://stackoverflow.com/q/901115/40352
    // Regex would be slower but this method needs to fix +.
    if ( typeof queryString !== "string")
        return undefined;
    var params = {};
    queryString.split("&").map(function(a) {
        return a.split("=");
    }).forEach(function(fieldValuePair) {
        var key = decodeURI(fieldValuePair[0]);
        var value = decodeURI(fieldValuePair[1]);
        if (standard_library.utilities.StringUtils.endsWith(key, '[]')) {
            key = key.substring(0, key.length - 2);
            if (!( key in params)) {
                params[key] = [];
            }
            params[key].push(value);
        } else {
            params[key] = value;
        }
    });
    return params;
};

/**
 * Given an object with properties, creates an attribute string that can be used
 * in an HTML tag.
 *
 * @example HTML.BuildAttributeString({"class":"generic",
 *          "style":"display:none;"}) == ' class="generic"
 *          style="display:none;"'
 */
standard_library.utilities.HTML.buildAttributeString = function(attributes) {
    return Object.keys(attributes || {}).map(function(key) {
        return sprintf(' %s="%s"', key, attributes[key]);
    }).join("");
};

/**
 * Given an object, creates a query string that can be used in a URL. Handles
 * arrays using PHP/ASP conventions: http://stackoverflow.com/a/1746566/40352
 * (Not all frameworks will support this behavior)
 *
 * @example HEMLEntityUtils.BuildQueryString({"fox": "animal"}) === "fox=animal"
 *          HTML.BuildQueryString({"array": [1,2]}) === "array[]=1&array[]=2"
 */
standard_library.utilities.HTML.buildQueryString = function(fieldValuePairs) {
    return Object.keys(fieldValuePairs || {}).map(function(key) {
        if (Object.prototype.toString.call(fieldValuePairs[key]) === '[object Array]') {
            return fieldValuePairs[key].map(function(value) {
                return sprintf('%s=%s', encodeURI(key + '[]'), encodeURI(value));
            }).join("&");
        }
        return sprintf('%s=%s', encodeURI(key), encodeURI(fieldValuePairs[key]));
    }).join("&");
};

/**
 * Converts any string to a form suitable for use as an HTML classname. The
 * requirements for an HTML classname are as follows:
 * http://stackoverflow.com/questions/448981/what-characters-are-valid-in-css-class-names
 */
standard_library.utilities.HTML.convertToClass = function(s) {
    var INVALID_CLASS_CHARACTERS = /[^_a-zA-Z0-9-]/g;
    var INVALID_STARTING_CHARACTERS = /^[^_a-zA-Z]+/g;

    return s.replace(INVALID_CLASS_CHARACTERS, "_").replace(INVALID_STARTING_CHARACTERS, "");
};

/**
 * Converts any string to a form suitable for use as an HTML ID. The
 * requirements for an HTML ID are as follows.
 *
 * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be followed by
 * any number of letters, digits ([0-9]), hyphens ("-"), underscores ("_"),
 * colons (":"), and periods (".").
 */
standard_library.utilities.HTML.convertToID = function(s) {
    var INVALID_ID_CHARACTERS = /[^A-Za-z0-9\-_:\.]/g;
    var INVALID_STARTING_CHARACTERS = /^[^A-Za-z]+/g;

    return s.replace(INVALID_ID_CHARACTERS, "_").replace(INVALID_STARTING_CHARACTERS, "");
};

/**
 * http://stackoverflow.com/a/9609450
 *
 * @param {HTMLEncodedString}
 *            str
 * @returns {UnicodeString} Converts &amp; -> &, &lt; -> <, etc.
 */
standard_library.utilities.HTML.decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var element = false;

    function decodeHTMLEntities(str) {
        if (!element)
            element = document.createElement('div');
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    // TODO merge with other function, this is a tricky
    // operation
    /**
     * Only decodes numeric entities
     */
    /*
     * function decodeHTMLEntities(text) { return
     * text.replace(/&#([0-9]{1,4});/gi, function(match, numStr) { var num =
     * parseInt(numStr, 10); // read num as normal // number return
     * String.fromCharCode(num); }); }
     */

    return decodeHTMLEntities;
});

/**
 * Converts a string to a slug that can be part of a URL. For example, "Tim's
 * Donuts" becomes "tims-donuts." Equivalent to the web2py implementation.
 */
standard_library.utilities.HTML.makeURLSlug = function(s) {
    var _slugConversions = [[/&\w+;/g, ''], // strip html entities
    [/[\s_]+/g, '-'], // whitespace & underscores to hyphens
    [/[^a-z0-9\-]/g, ''], // strip all but alphanumeric/hyphen
    [/[-_][-_]+/g, '-'] // collapse strings of hyphens
    ];
    var _trimHyphens = function(s) {
        // Routine based on High Performance Javascript, p.103
        var str = s.replace(/^-+/, ''), end = str.length - 1;
        ws = /-/;
        while (ws.test(str.charAt(end))) {
            end--;
        }

        return str.slice(0, end + 1);
    };

    s = s.toLowerCase();
    for (var i = 0; i < 4; i++) {
        s = s.replace(_slugConversions[i][0], _slugConversions[i][1]);
    }
    s = _trimHyphens(s);
    // remove leading and trailing hyphens
    return s;
};
