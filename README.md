# Standard JavaScript Library
[![Build Status](https://api.travis-ci.org/christopherliu/standard-js.png?branch=master)](https://travis-ci.org/christopherliu/standard-js)

From https://github.com/christopherliu/standard-js

## Mission

> Standard-js is designed to add support for the most commonly used functions that are not always supported in every implementation of JavaScript.

## Background

> A standard library for a programming language is the library that is conventionally made available in every implementation of that language. In some cases, the library is described directly in the programming language specification; in other cases, the contents of the standard library are determined by more informal social practices in the programming community.

-[Wikipedia](http://en.wikipedia.org/wiki/Standard_library)

Most programming languages come with standard libraries. JavaScript does not. Or at least, the one it has is very limited. Why, for example, can't you write this?

    var numbersSquared = [3,4,5].map(function(num) { return num*num; });

Well, with [CommonJS](http://www.commonjs.org/) and [JavaScript 1.6](http://en.wikipedia.org/wiki/JavaScript#Versions), you can. While browser makers (read: IE) work on implementing that and standards committees hash that out, there's this.

We do *not* want to replace:

 * jQuery/Dojo/ExtJS (just get jQuery/Dojo/ExtJS)
 * HTML5 ([Modernizr](http://modernizr.com/), [CSS3PIE](http://css3pie.com) and other libraries can help here).
 
If something is available in one of the major libraries, it's probably best to use it there unless it's something that was used to patch a weakness in JavaScript (some of the jQuery functionality falls into this category).

This is a work in progress.

## How to use

Download the full library. Only use the scripts you need. Voila!

## Organization

Standard-js is built to be modular - use what you need, throw out what you don't.

 * core/ - core is designed to include primary JS functionality, including JavaScript 1.6
 * browser/ - browser specific code - DOM stuff and the like
 * etc/ - additional functionality
 
## Notes
Addresses with ECMAScript may be blocked by some servers (Apache on Site5 is the only known example). For this reason, we include ES.v5 as an alternative spelling.

### Other useful libraries

Here are links to the other stuff I use in many of my projects:

 * [sprintf](http://www.diveintojavascript.com/projects/javascript-sprintf)
 * [jQote - templating for Javascript](https://github.com/aefxx/jQote2)
 * [XRegExp - support for multiline regex, capturing groups, and more](http://xregexp.com/)
 * [Underscore.js](http://documentcloud.github.com/underscore/#isEqual)
 * [JSON](https://github.com/douglascrockford/JSON-js)
 * [List of shims and polyfills (implement functionality in old browsers)](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)
 * RequireJS

This additional list was everything of use I found on GitHub, last I checked (standard stuff only, no DOM-specific stuff).

 * Log/extend (https://github.com/msmtd/js-utils/)
 * Array comprehension stuff (https://github.com/adambossy/js-utils)
 * Date formatting (https://github.com/buzzwashere/js_utilities)
 * https://github.com/alexbech/JsUtils
 * GUID/rand (https://github.com/shezard/js_utils)
 * http://www.3site.eu/JSL/
 
## TODO
 * Mention compressors
 * Separate polyfill
 * Pick license
 * Update directory list
 
## Contributing to standard-js
StandardJS uses the [JSDoc](http://usejsdoc.org/) set of conventions, as well as the standard Eclipse/Aptana autoformatting (Ctrl-Shift-F, 80 characters per line).

## License
This code is not ready, so a license has not been chosen yet. (Default proprietary).
