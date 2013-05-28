// REMOVE
module("standard_library.utilities.ArrayUtils.remove");

test("Remove front", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 0);
    ok(result === 9, "Remove the first element from array 0 to 9 returned " + array);
});

test("Remove end", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 6, 10);
    ok(result === 6, "Remove 6 to end from array 0 to 9 returned " + array);
});

test("Remove middle", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 3, 5);
    ok(result === 7, "Remove 3 to 5 from array 0 to 9 returned " + array);
});

test("Negative from", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, -3, 10);
    ok(result === 7, "Remove -3 to end from array 0 to 9 returned " + array);
});

test("Special slice test case", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, -1, 10);
    ok(result === 9, "Remove -1 to end from array 0 to 9 returned " + array);
});

test("Super large positive from", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 20);
    ok(result === 20, "Remove at 20 from array 0 to 9 returned " + array);
});

test("Super large negative from", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, -20);
    ok(result === undefined, "Remove at -20 from array 0 to 9 returned " + result);
});

test("Negative to", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 5, -3);
    ok(result === 7, "Remove 5 to -3 from array 0 to 9 returned " + array);
});

test("Super large positive to", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 3, 20);
    ok(result === 3, "Remove 3 to 20 from array 0 to 9 returned " + array);
});

test("Super large negative to", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 2, -11);
    ok(result === undefined, "Remove at -20 from array 0 to 9 returned " + result);
});

test("Negative from, negative to", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, -5, -3);
    ok(result === 7, "Remove -5 to -3 from array 0 to 9 returned " + array);
});

test("Array is not an array", function() {
    var array = 5;
    var result = standard_library.utilities.ArrayUtils.remove(array, 5, 3);
    ok(result === undefined, "Remove -5 to -3 from array 0 to 9 returned " + result);
});

test("From is not a number", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, "a", 3);
    ok(result === undefined, "Remove a to 3 from array 0 to 9 returned " + result);
});

test("To is not a number", function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = standard_library.utilities.ArrayUtils.remove(array, 5, "a");
    ok(result === undefined, "Remove 5 to a from array 0 to 9 returned " + result);
});

// UNIQUE
module("standard_library.utilities.ArrayUtils.unique");

test("Standard case, no replacement", function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var func = function(value) {
        return value;
    };
    var result = standard_library.utilities.ArrayUtils.unique(array, func);
    ok(result.toString(), "Array 1 to 10 where uniqueness is itself returned " + result);
});

test("Simple replacement", function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var func = function(value) {
        return value % 3;
    };
    var result = standard_library.utilities.ArrayUtils.unique(array, func);
    ok(result.toString(), "Array 1 to 10 where uniqueness is div by 3 returned " + result);
});

test("String replacement", function() {
    var array = ["hello", "haii", "HELLO", "hEy", "BYE"];
    var func = function(value) {
        return value.toLowerCase();
    };
    var result = standard_library.utilities.ArrayUtils.unique(array, func);
    ok(result.toString(), "hello haii HELLO hEy BYE where uniqueness is not case-sensitive returned " + result);
});

test("Array is not an array", function() {
    var array = 0;
    var func = function(value) {
        return value;
    };
    var result = standard_library.utilities.ArrayUtils.unique(array, func);
    ok(result === undefined, "Numberic 0 where uniqueness is the value itself returned " + result);
});

test("Function is not a function", function() {
    var array = [0, 1, 2, 3, 4];
    var func = 4;
    var result = standard_library.utilities.ArrayUtils.unique(array, func);
    ok(result === undefined, "Array 0 to 4 where uniqueness is numberic 0 returned " + result);
});

// FIND FIRST
module("standard_library.utilities.ArrayUtils.findFirst");

test("Standard case, find first element", function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var func = function(value) {
        return value === 1;
    };
    var result = standard_library.utilities.ArrayUtils.findFirst(array, func);
    ok(result === 1, "There is an element " + result + ", equal to 1, in the array from 1 to 10.");
});

test("Find element in middle", function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var func = function(value) {
        return (value % 2 === 0) && (value % 3 === 0);
    };
    var result = standard_library.utilities.ArrayUtils.findFirst(array, func);
    ok(result === 6, "There is an element " + result + ", div by 2 and 3, in the array from 1 to 10.");
});

test("Array of strings", function() {
    var array = ["What", "a", "merry", "day"];
    var func = function(value) {
        return standard_library.utilities.StringUtils.endsWith(value, "y");
    };
    var result = standard_library.utilities.ArrayUtils.findFirst(array, func);
    ok(result === "merry", "There is an element " + result + ", ends with y, in the array What a merry day.");
});

test("Array of arrays", function() {
    var array = [[1, 2], [1], [], [1, 2, 3]];
    var func = function(value) {
        return value.length === 3;
    };
    var result = standard_library.utilities.ArrayUtils.findFirst(array, func);
    ok(result.toString() === [1, 2, 3].toString(), "There is an element " + result + ", len 0, in the array of arrays.");
});

test("Element does not exist", function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var func = function(value) {
        return (value % 2 === 0) && (value % 7 === 0);
    };
    var result = standard_library.utilities.ArrayUtils.findFirst(array, func);
    ok(!result, "There is an element div by 2 and 7 in the array from 1 to 10 is " + result);
});

test("Array is not an array", function() {
    var array = 4;
    var func = function(value) {
        return (value % 2 === 0) && (value % 3 === 0);
    };
    var result = standard_library.utilities.ArrayUtils.findFirst(array, func);
    ok(result === undefined, "Array of 4 and function for divisible by 6 returned " + result);
});

test("Function is not a function", function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var func = 4;
    var result = standard_library.utilities.ArrayUtils.findFirst(array, func);
    ok(result === undefined, "Array of 1 to 10 and function of 4 returned " + result);
});

// SUM
module("standard_library.utilities.ArrayUtils.sum");

test("Standard case, array with numbers", function() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var result = standard_library.utilities.ArrayUtils.sum(array);
    ok(result === 55, "Array 1 to 10, sums to " + result);
});

test("Array with negative numbers", function() {
    var array = [-3, -2, -1, 0, 1, 2, 3];
    var result = standard_library.utilities.ArrayUtils.sum(array);
    ok(result === 0, "Array of strings from -3 to 3, sums to " + result);
});

test("Array with strings case", function() {
    var array = ["1", "2", "3", "4"];
    var result = standard_library.utilities.ArrayUtils.sum(array);
    ok(result === undefined, "Array of strings, sums to " + result);
});

test("Not an array case", function() {
    var array = 0;
    var result = standard_library.utilities.ArrayUtils.sum(array);
    ok(result === undefined, "Not an array, sums to " + result);
});

// / STARTS WITH
module("standard_library.utilities.StringUtils.startsWith");

test("Standard case, character", function() {
    var result = standard_library.utilities.StringUtils.startsWith("abc", "a");
    ok(result, "abc starts with a is " + result);
});

test("Standard case, string", function() {
    var result = standard_library.utilities.StringUtils.startsWith("Hello world", "Hello");
    ok(result, "Hello world starts with Hello is " + result);
});

test("Substring non-existent", function() {
    var result = standard_library.utilities.StringUtils.startsWith("Hello world", "Goodbye");
    ok(!result, "Hello world starts with Goodbye is " + result);
});

test("Substring existent but does not starts with", function() {
    var result = standard_library.utilities.StringUtils.startsWith("Hello world", "world");
    ok(!result, "Hello world starts with world is " + result);
});

test("Pattern is not a string", function() {
    var result = standard_library.utilities.StringUtils.startsWith("1234", 1);
    ok(result === undefined, "1234 starts with numberic 1 is " + result);
});

test("Word is not a string", function() {
    var result = standard_library.utilities.StringUtils.startsWith(1234, "1");
    ok(result === undefined, "Numberic 1234 starts with 1 is " + result);
});
// ENDS WITH
module("standard_library.utilities.StringUtils.endsWith");

test("Standard case, character", function() {
    var result = standard_library.utilities.StringUtils.endsWith("abc", "c");
    ok(result, "abc ends with c is " + result);
});

test("Standard case, string", function() {
    var result = standard_library.utilities.StringUtils.endsWith("Hello world", "world");
    ok(result, "Hello world ends with world is " + result);
});

test("Substring non-existent", function() {
    var result = standard_library.utilities.StringUtils.endsWith("Hello world", "earth");
    ok(!result, "Hello world ends with earth is " + result);
});

test("Substring existent but does not end with", function() {
    var result = standard_library.utilities.StringUtils.endsWith("Hello world", "Hello");
    ok(!result, "Hello world ends with Hello is " + result);
});

test("Pattern is not a string", function() {
    var result = standard_library.utilities.StringUtils.endsWith("1234", 4);
    ok(result === undefined, "1234 ends with numberic 4 is " + result);
});

test("Word is not a string", function() {
    var result = standard_library.utilities.StringUtils.endsWith(1234, "4");
    ok(result === undefined, "Numberic 1234 ends with 4 is " + result);
});

// ENDS WITH REGEX
module("standard_library.utilities.StringUtils.endsWithRegex");

// SPLIT WITHOUT CAPTURE
module("standard_library.utilities.StringUtils.splitWithoutCapture");

// UNICODE TO ASCII
module("standard_library.utilities.StringUtils.makeStringASCIIInvariant");

test("No change", function() {
    var result = standard_library.utilities.StringUtils.makeStringASCIIInvariant("La ' la");
    ok(result === "La ' la", "La ' la turns into " + result);
});

test("Change", function() {
    var result = standard_library.utilities.StringUtils.makeStringASCIIInvariant("La ’ la");
    ok(result === "La ' la", "La ’ la turns into " + result);
});

test("Not a string", function() {
    var result = standard_library.utilities.StringUtils.makeStringASCIIInvariant(3);
    ok(result === undefined, "Numberic 3 turns into " + result);
});

// HTML
module("standard_library.utilities.HTML");

// MISC
module("standard_library.utilities.Misc");

/*
 @formatter:off
 utilities
    HTML
        breakQueryStringIntoParameters
        buildAttributeString
        buildQueryString
        convertToClass
        convertToID
        DecodeEntities
            decodeHTMLEntities
makeURLSlug
    Misc
        runOnce
    StringUtils
        endsWithRegex
        splitWithoutCapture
  @formatter:on
 */