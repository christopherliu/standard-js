/**
 * @name		standard_library.math.Random
 * @namespace 	Holds functionality related to Random functions.
 */
// Validate the existence of the standard library.
if (typeof standard_library === "undefined")
	var standard_library = {}
// Validate existence of the folder math.
if (typeof standard_library.math === "undefined")
	standard_library.math = {}
// Validate existence of Random.js in math.
if (typeof standard_library.math.Random === "undefined")
	standard_library.math.Random = {}
	
/**
 * Returns a random integer from min to max, inclusive
 * @param {Number}
 * 			min		The minimum value the random integer may be.
 * @param {Number}
 * 			max		The maximum value the random integer may be.
 * @param {Function}
 *          random 	A replacement for the random function, 
 * 					if we choose to seed.
 * @return {Number} An integer which was randomly generated.
 */
standard_library.math.Random.generateRandomInteger = function(min, max, fnRandom) {
	"use strict";
	try {
		// Validate that min and max are numbers.
		if (typeof min === "number" && typeof max === "number") {
			// Validate that max is not less than min.
			if (max < min) {
				throw "Error: Max is greater than min.";
			// Otherwise, obtain random number.
			} else {
				// If there is a provided function,
				if (fnRandom && typeof fnRandom === "function")
					return min + Math.floor(fnRandom() * (max - min + 1));
				// Else, use the default javascript function.
				else
					return min + Math.floor(Math.random() * (max - min + 1));
			}
		} else {
			throw "Error: Min and/or max are not numberic values.";
		}
	} catch (error) {
		//alert(error);
		return undefined;
	}
};