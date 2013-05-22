// Validate existence of library.
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
 * 
 * @param 	{Number}
 * 			  min
 * 
 * 			{Function}
 *            random A replacement for the random function, if we choose to
 *            seed.
 */
standard_library.math.Random.generateRandomInteger = function(min, max, fnRandom) {
	try {
		// Validate that max is not less than min.
		if (max < min) {
			throw "Error: Max is greater than min.";
		// Otherwise, obtain random number.
		} else {
			// If there is a provided function,
			if (fnRandom)
				return min + Math.floor(fnRandom() * (max - min + 1));
			// Else, use the default javascript function.
			else
				return min + Math.floor(Math.random() * (max - min + 1));
		}
	} catch (error) {
		//alert(error);
		return undefined;
	}
};