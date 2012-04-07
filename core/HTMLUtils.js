/*
 * Dependencies: ECMAScript V5 @namespace Utilities useful for JavaScript use in
 * HTML.
 */
if (!HTMLUtils)
	var HTMLUtils = {};
/*
 * Given a query string, break it apart into an object.
 */
HTMLUtils.BreakQueryStringIntoParameters = function(query) {
	var params = {};
	query.split("&").map(function(a) {
		return a.split("=");
	}).forEach(function(param) {
		params[param[0]] = param[1];
	});
	return params;
}
/**
 * Given an object with properties, creates an attribute string that can be used
 * in an HTML tag.
 * 
 * Example: HTMLUtils.BuildAttributeString({"class":"generic",
 * "style":"display:none;"}) == ' class="generic" style="display:none;"'
 */
HTMLUtils.BuildAttributeString = function(attributes) {
	return Object.keys(attributes || {}).map(function(key) {
		return sprintf(' %s="%s"', key, attributes[key]);
	}).join("");
};
/**
 * Converts any string to a form suitable for use as an HTML ID. The
 * requirements for an HTML ID are as follows.
 * 
 * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be followed by
 * any number of letters, digits ([0-9]), hyphens ("-"), underscores ("_"),
 * colons (":"), and periods (".").
 */
HTMLUtils.ConvertToID =
		function(s) {
			var INVALID_ID_CHARACTERS = /[^A-Za-z0-9\-_:\.]/g;
			var INVALID_STARTING_CHARACTERS = /^[^A-Za-z]+/g;

			return s.replace(INVALID_ID_CHARACTERS, "_").replace(
					INVALID_STARTING_CHARACTERS, "");
		};
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