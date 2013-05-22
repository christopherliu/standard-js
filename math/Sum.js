/**
 * @name		standard_library.math.Sum
 * @namespace 	Holds functionality related to Sum functions.
 */
if (typeof standard_library === "undefined")
	var standard_library = {}
if (typeof standard_library.math === "undefined")
	standard_library.math = {}
if (typeof standard_library.math.Sum === "undefined")
	standard_library.math.Sum = {}
	
/**
 * Sums the values of an array.
 * 
 * @param {Array}
 * 			ar	An array object of numbers.
 * @return {Number} the sum of the array elements
 */
standard_library.math.Sum.sum = function(ar) {
	"use strict";
	try {
		// Validate that ar is an array.
		if (!Array.isArray(ar))
			throw "Error: Parameter 'ar' provided is not an array.";
		else {
			var a = 0;
			for (var i = 0; i < ar.length; i++) {
				if (typeof ar[i] === "number") {
					a = a + ar[i];
				} else {
					throw "Error: " + ar[i] + " is not a number.";
				}
			}
			return a;
		}
	} catch (error) {
		//alert(error);
		return undefined;
	}
};
