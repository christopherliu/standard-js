define('standard_library/browser/Browser', ['standard_library/utilities/HTML'], function(HTML) {"use strict";
    /**
     * @requires standard_library.utilities.HTML
     * @name standard_library.browser.Browser
     * @namespace Holds functionality related to manipulating the browser, that
     * is, not directly related to the DOM.
     */
    return {
        /**
         * @returns {Object} The query string of the current browser window
         *                   as key-value pairs.
         */
        "getQueryString" : function() {
            return HTML.breakQueryStringIntoParameters(window.location.search.substring(1));
        }
    };
});
