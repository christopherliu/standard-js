/*
 * Dependencies: ECMAScript V5 @namespace Utilities useful for JavaScript use in
 * HTML.
 */
if (!HTMLUtils)
	var HTMLUtils = {};
/*
 * Given a query string, break it apart into an object. Handles arrays using
 * PHP/ASP conventions: http://stackoverflow.com/a/1746566/40352 (Not all
 * frameworks will support this behavior)
 * 
 * @example HTMLUtils.BreakQueryStringIntoParameters("fox=animal") === {"fox":
 * "animal"}
 * 
 * HTMLUtils.BreakQueryStringIntoParameters("array[]=1&array[]=2") === {"array":
 * [1,2]}
 * 
 * HTMLUtils.BreakQueryStringIntoParameters("") === {}
 */
HTMLUtils.BreakQueryStringIntoParameters = function(queryString) {
	// TODO maybe update with better version
	// http://stackoverflow.com/q/901115/40352
	// regex would be slower but this method needs to fix +
	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	var params = {};
	queryString.split("&").map(function(a) {
		return a.split("=");
	}).forEach(function(fieldValuePair) {
		var key = decodeURI(fieldValuePair[0]);
		var value = decodeURI(fieldValuePair[1]);
		if (endsWith(key, '[]')) {
			key = key.substring(0, key.length - 2);
			if (!(key in params)) {
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
 * @example HTMLUtils.BuildAttributeString({"class":"generic",
 *          "style":"display:none;"}) == ' class="generic"
 *          style="display:none;"'
 */
HTMLUtils.BuildAttributeString = function(attributes) {
	return Object.keys(attributes || {}).map(function(key) {
		return sprintf(' %s="%s"', key, attributes[key]);
	}).join("");
};
/**
 * Given an object, creates a query string that can be used in a URL. Handles
 * arrays using PHP/ASP conventions: http://stackoverflow.com/a/1746566/40352
 * (Not all frameworks will support this behavior)
 * 
 * @example HTMLUtils.BuildQueryString({"fox": "animal"}) === "fox=animal"
 *          HTMLUtils.BuildQueryString({"array": [1,2]}) ===
 *          "array[]=1&array[]=2"
 */
HTMLUtils.BuildQueryString = function(fieldValuePairs) {
	return Object
			.keys(fieldValuePairs || {})
			.map(
					function(key) {
						if (Object.prototype.toString
								.call(fieldValuePairs[key]) === '[object Array]') {
							return fieldValuePairs[key].map(
									function(value) {
										return sprintf('%s=%s', encodeURI(key
												+ '[]'), encodeURI(value));
									}).join("&");
						}
						return sprintf('%s=%s', encodeURI(key),
								encodeURI(fieldValuePairs[key]));
					}).join("&");
};
/**
 * Converts any string to a form suitable for use as an HTML classname. The
 * requirements for an HTML classname are as follows:
 * http://stackoverflow.com/questions/448981/what-characters-are-valid-in-css-class-names
 */
HTMLUtils.ConvertToClass = function(s) {
	var INVALID_CLASS_CHARACTERS = /[^_a-zA-Z0-9-]/g;
	var INVALID_STARTING_CHARACTERS = /^[^_a-zA-Z]+/g;

	return s.replace(INVALID_CLASS_CHARACTERS, "_").replace(
			INVALID_STARTING_CHARACTERS, "");
};
/**
 * Converts any string to a form suitable for use as an HTML ID. The
 * requirements for an HTML ID are as follows.
 * 
 * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be followed by
 * any number of letters, digits ([0-9]), hyphens ("-"), underscores ("_"),
 * colons (":"), and periods (".").
 */
HTMLUtils.ConvertToID = function(s) {
	var INVALID_ID_CHARACTERS = /[^A-Za-z0-9\-_:\.]/g;
	var INVALID_STARTING_CHARACTERS = /^[^A-Za-z]+/g;

	return s.replace(INVALID_ID_CHARACTERS, "_").replace(
			INVALID_STARTING_CHARACTERS, "");
};
/**
 * http://stackoverflow.com/a/9609450
 * 
 * @param {HTMLEncodedString}
 *            str
 * @returns {UnicodeString} Converts &amp; -> &, &lt; -> <, etc.
 */
HTMLUtils.DecodeEntities = (function() {
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
})();

/**
 * Converts a string to a slug that can be part of a URL. For example, "Tim's
 * Donuts" becomes "tims-donuts." Equivalent to the web2py implementation.
 */
HTMLUtils.MakeURLSlug = function(s) {
	var _slugConversions = [ [ /&\w+;/g, '' ], // strip html entities
	[ /[\s_]+/g, '-' ], // whitespace & underscores to hyphens
	[ /[^a-z0-9\-]/g, '' ], // strip all but alphanumeric/hyphen
	[ /[-_][-_]+/g, '-' ] // collapse strings of hyphens
	];
	var _trimHyphens = function(s) {
		// Routine based on High Performance Javascript, p.103
		var str = s.replace(/^-+/, ''), end = str.length - 1;
		ws = /-/;
		while (ws.test(str.charAt(end))) {
			end--
		}

		return str.slice(0, end + 1);
	};

	s = s.toLowerCase();
	for ( var i = 0; i < 4; i++) {
		s = s.replace(_slugConversions[i][0], _slugConversions[i][1]);
	}
	s = _trimHyphens(s); // remove leading and trailing hyphens
	return s;
};