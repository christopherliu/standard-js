/**
 * @name		standard_library.math.Sum
 * @namespace 	Holds functionality related to Sum functions.
 */

// Validate existence of library.
if (typeof standard_library === "undefined")
	var standard_library = {}
// Validate existence of the folder math.
if (typeof standard_library.math === "undefined")
	standard_library.math = {}
// Validate existence of Sum.js in math.
if (typeof standard_library.math.Sum === "undefined")
	standard_library.math.Sum = {}
	
/**
 * Sums the values of an array.
 * 
 * @param {Object}
 * 			ar	An array object of numbers.
 * @return {Number} the sum of the array elements
 */
standard_library.math.Sum.sum = function(ar) {
	"use strict";
	try {
		// Validate that ar is an array.
		if (Array.isArray(ar)) {
			var a = 0;
			for (var i = 0; i < ar.length; i++) {
				if (typeof ar[i] === "number") {
					a = a + ar[i];
				} else {
					throw "Error: " + ar[i] + " is not a number.";
				}
			}
		} else {
			throw "Error: Parameter 'ar' provided is not an array.";
		}
		return a;
	} catch (error) {
		//alert(error);
		return undefined;
	}
};
