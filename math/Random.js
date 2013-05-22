/**
 * @name		standard_library.math.Random
 * @namespace 	Holds functionality related to Random functions.
 */
if (typeof standard_library === "undefined")
	var standard_library = {};
if (typeof standard_library.math === "undefined")
	standard_library.math = {};
if (typeof standard_library.math.Random === "undefined")
	standard_library.math.Random = {};
	
/**
 * @param {Number}
 * 			min		The minimum value the random integer may be.
 * @param {Number}
 * 			max		The maximum value the random integer may be.
 * @param {Function}
 *          random 	A replacement for the random function, 
 * 					if we choose to seed.
 * @returns {Number} A random integer from min to max, inclusive
 */
standard_library.math.Random.generateRandomInteger = function(min, max, fnRandom) {
	"use strict";
	if (typeof min !== "number" || typeof max !== "number")
		return undefined;
	else if (max < min)
		return undefined;
	
	// If there is a provided function,
	if (fnRandom && typeof fnRandom === "function")
		return min + Math.floor(fnRandom() * (max - min + 1));
	// Else, use the default javascript function.
	else
		return min + Math.floor(Math.random() * (max - min + 1));

};