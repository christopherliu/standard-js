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
		Array.prototype.filter.call(element.attributes, function(attrPair) {
			return attrPair.value !== "";
		}).forEach(function(attrPair) {
			attributes[attrPair.name] = attrPair.value;
		});
		return attributes;
	};
standard_library.DOMUtils.PostToURL = function(attributes, params) {
	attributes.method = attributes.method || "post";

	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");

	for ( var key in attributes) {
		if (attributes.hasOwnProperty(key)) {
			form.setAttribute(key, attributes[key]);
		}
	}

	for ( var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
};