define('standard_library/utilities/Misc', [], function() {"use strict";
    /**
     * @name        standard_library.utilities.Misc
     * @namespace   Miscelleanous functions which provide extra functionality are
     * placed here.
     */
    return {
        /**
         * http://stackoverflow.com/a/2117523/40352
         */
        "generateRandomUUID" : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        /**
         * Once condition is true, run action. Otherwise, wait for a bit.
         *
         * @param {Function}
         *          condition   A function which returns true when the condition
         * is true.
         * @param {Function}
         *          action      A function which performs a series of function
         * calls.
         */
        "runOnce" : function(condition, action) {
            function wait() {
                if (condition()) {
                    action();
                } else {
                    setTimeout(wait, 60);
                }
            }

            wait();
        }
    };
});
