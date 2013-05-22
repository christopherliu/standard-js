if (!this.standard_library) {
	this.standard_library = {};
}
if (!standard_library.math) {
	standard_library.math = {};
}
/**
 * Returns a random integer from min to max, inclusive
 * 
 * @param {Function}
 *            random A replacement for the random function, if we choose to
 *            seed.
 */
standard_library.math.Random.GenerateRandomInteger = function(min, max, random) {
	if (random)
		return min + Math.floor(random() * (max - min + 1));
	else
		return min + Math.floor(Math.random() * (max - min + 1));
};

