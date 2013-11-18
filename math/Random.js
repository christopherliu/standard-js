define('standard_library/math/Random', [], function() {"use strict";
    /**
     * @name        standard_library.math.Random
     * @namespace   Random number generation
     */
    return {
        /**
         * @param {Number} min
         * @param {Number} max
         * @param {Function}
         *          random  A replacement for the random function, used
         *                  if we choose to seed. Should return a random number
         * from 0 (inclusive) to 1 (exclusive).
         * @returns {Number} A random integer from min to max, inclusive
         */
        "generateRandomInteger" : function(min, max, fnRandom) {"use strict";
            if ( typeof min !== "number" || typeof max !== "number" || (fnRandom && typeof fnRandom !== "function"))
                throw "Type error";
            else if (max < min)
                throw "max less than min";

            // If there is a provided function,
            if (fnRandom) {
                return min + Math.floor(fnRandom() * (max - min + 1));
            }
            // Else, use the default javascript function.
            else {
                return min + Math.floor(Math.random() * (max - min + 1));
            }
        },
        "getBoolean" : function(fnRandom) {
            if (fnRandom) {
                return !!Math.round(fnRandom());
            } else {
                return !!Math.round(Math.random());
            }
        }
    };
});
