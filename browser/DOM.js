define('standard_library/browser/DOM', ['es5-shim/es5-shim'], function() {"use strict";
    /**
     * @requires ECMAscript v5
     * @name standard_library.browser.DOM
     * @namespace Holds functionality related to manipulating the DOM.
     */
    return {
        /**
         * Given a DOM element, retrieve an object containing all attributes.
         * This behaves funny in IE6:
         * http://www.javascriptkit.com/domref/elementproperties.shtml
         *
         * @param {Element}
         *            element An element as specified in
         *            https://developer.mozilla.org/en-US/docs/Web/API/Element
         */
        "extractAttributes" : function(element) {
            var attributes = {};
            if ( element instanceof HTMLElement === false) {
                return undefined;
            }
            Array.prototype.filter.call(element.attributes, function(attrPair) {
                return attrPair.value !== "";
            }).forEach(function(attrPair) {
                attributes[attrPair.name] = attrPair.value;
            });
            return attributes;
        },
        /**
         * Sends a request by creating a <form>, filling it out and sending it.
         *
         * @param {Object}
         *            attributes
         * @param {String}
         *            attributes.method Either "get" or "post", corresponding to
         * <form method="">. Default is post.
         * @param {String}
         *            attributes.action The URL to submit the form to,
         * corresponding to <form action="">
         * @param {Object}
         *            params Key-value representation of all the values to submit
         * in the form. These would be <input> tags in HTML.
         */
        "postToURL" : function(attributes, params) {
            attributes.method = attributes.method || "post";
            // The rest of this code assumes you are not using a library.
            // It can be made less wordy if you use one.
            var form = document.createElement("form");
            for (var aKey in attributes) {
                if (attributes.hasOwnProperty(aKey)) {
                    form.setAttribute(aKey, attributes[aKey]);
                }
            }
            for (var pKey in params) {
                if (params.hasOwnProperty(pKey)) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", pKey);
                    hiddenField.setAttribute("value", params[pKey]);

                    form.appendChild(hiddenField);
                }
            }
            document.body.appendChild(form);
            form.submit();
        }
    };
});
