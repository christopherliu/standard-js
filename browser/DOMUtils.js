/**
 * @name standard_library.DOMUtils
 * @namespace
 */
if (!this.standard_library) {
	this.standard_library = {};
}
if (!standard_library.DOMUtils) {
	standard_library.DOMUtils = {};
}
/**
 * Given a DOM element, retrieve an object of all attributes. This behaves funny
 * in IE6: http://www.javascriptkit.com/domref/elementproperties.shtml
 * 
 */
standard_library.DOMUtils.ExtractAttributes =
		function _extractAttributes(element) {
			"use strict";

			var attributes = {};
			Array.prototype.filter.call(element.attributes,
					function(attrPair) {
						return attrPair.value !== "";
					}).forEach(function(attrPair) {
				attributes[attrPair.name] = attrPair.value;
			});
			return attributes;
		};