/**
 * @requires standard_library.utilities.HTML
 * @name standard_library.browser.Browser
 * @namespace Holds functionality related to manipulating the browser, that is
 *            not directly related to the DOM.
 */
if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.browser === "undefined")
	standard_library.browser = {};
if ( typeof standard_library.browser.Browser === "undefined")
	standard_library.browser.Browser = {};

/**
 * @returns {Object} the query string of the current browser window as key-value
 *          pairs.
 */
standard_library.browser.Browser.GetQueryString = function() {
	"use strict";
	return standard_library.utilities.HTML
			.BreakQueryStringIntoParameters(window.location.search.substring(1));
};