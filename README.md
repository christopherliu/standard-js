# Standard JavaScript Library

## Mission

> Standard-js is designed to add support for the most commonly used functions that are not always supported in every implementation of JavaScript.

## Background

> A standard library for a programming language is the library that is conventionally made available in every implementation of that language. In some cases, the library is described directly in the programming language specification; in other cases, the contents of the standard library are determined by more informal social practices in the programming community.

-[Wikipedia](http://en.wikipedia.org/wiki/Standard_library)

Most programming languages come with standard libraries. JavaScript does not. Or at least, the one it has is very limited.

With [CommonJS](http://www.commonjs.org/), and JavaScript 1.6, some of this can be fixed. While standards committees hash that out, there's this.

We do *not* want to replace:

 * jQuery/Dojo/ExtJS (just get jQuery/Dojo/ExtJS)
 * HTML5 ([Modernizr](http://modernizr.com/) does this perfectly well).
 
If something is available in one of the major libraries, it's probably best to use it there unless it's something that was used to patch a weakness in JavaScript (some of the jQuery functionality falls into this category).

This is a work in progress.

## Organization

Standard-js is built to be modular - use what you need, throw out what you don't.

 * core/ - core is designed to include primary JS functionality
 * browser/ - browser specific code - DOM stuff and the like
 * etc/ - additional functionality

Note that there are many many useful libraries that have not yet been copied here. This list was everything of use I found on GitHub, last I checked (standard stuff only, no DOM-specific stuff).

 * sprintf
 * Log/extend (https://github.com/msmtd/js-utils/)
 * Array comprehension stuff (https://github.com/adambossy/js-utils)
 * Date formatting (https://github.com/buzzwashere/js_utilities)
 * https://github.com/alexbech/JsUtils
 * GUID/rand (https://github.com/shezard/js_utils)
 * http://www.3site.eu/JSL/
 * Full Javascript 1.6 support for browsers without it.

## License

This code is not ready, so a license has not been chosen yet. (Default proprietary).
