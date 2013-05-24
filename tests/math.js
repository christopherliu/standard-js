// RANDOM
module("standard_library.math.Random");

var generateRandomInteger = standard_library.math.Random.generateRandomInteger;
test("generateRandomInteger(): generateRandomInteger(): Standard case, no random function", function() {
    result = generateRandomInteger(10, 11);
    ok(result >= 10 && result <= 11, "Between 10 and 11, generated " + result);
});

test("generateRandomInteger(): Negative min case, no random function", function() {
    result = standard_library.math.Random.generateRandomInteger(-10, 11);
    ok(result >= -10 && result <= 11, "Between -10 and 11, generated " + result);
});

test("generateRandomInteger(): Negative min and negative max case, no random function", function() {
    result = generateRandomInteger(-15, -10);
    ok(result >= -15 && result <= -10, "Between -15 and -10, generated " + result);
});

test("generateRandomInteger(): Random function given", function() {
    var func = function() {
        return 0.999;
    };
    result = generateRandomInteger(4, 5, func);
    ok(result === 5, "Random() which always returns 0.999 with min and max of 4 and 5 generated " + result);
});

test("generateRandomInteger(): Lower max than min, no random function", function() {
    result = generateRandomInteger(15, 10);
    ok(result === undefined, "Between 15 and 10, generated " + result);
});

test("generateRandomInteger(): Min is not a number, no random function", function() {
    result = generateRandomInteger("a", 10);
    ok(result === undefined, "Between a and 10, generated " + result);
});

test("generateRandomInteger(): Max is not a number, no random function", function() {
    result = generateRandomInteger(10, "a");
    ok(result === undefined, "Between 10 and a, generated " + result);
});

test("generateRandomInteger(): fnRandom is not a random function", function() {
    func = 4;
    result = generateRandomInteger(4, 5, func);
    ok(result === undefined, "Incorrect random generator fnRandom" + result);
}); 