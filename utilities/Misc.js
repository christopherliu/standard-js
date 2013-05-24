/**
 * @name 		standard_library.utilities.Misc
 * @namespace 	Miscelleanous functions which provide extra functionality are
 * placed here.
 */
if ( typeof standard_library === "undefined")
    var standard_library = {};
if (!standard_library.utilities)
    standard_library.utilities = {};
if (!standard_library.utilities.Misc)
    standard_library.utilities.Misc = {};

/**
 * Once condition is true, run action. Otherwise, wait for a bit.
 *
 * @param {Function}
 * 			condition	A function which returns true when the condition is true.
 * @param {Function}
 * 			action		A function which performs a series of function calls.
 */
standard_library.utilities.Misc.runOnce = function(condition, action) {
    function wait() {
        if (condition()) {
            action();
        } else {
            setTimeout(wait, 60);
        }
    }

    wait();
}; 