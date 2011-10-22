# Standard JavaScript Library

> A standard library for a programming language is the library that is conventionally made available in every implementation of that language. In some cases, the library is described directly in the programming language specification; in other cases, the contents of the standard library are determined by more informal social practices in the programming community.

-[Wikipedia](http://en.wikipedia.org/wiki/Standard_library)

Most programming languages come with standard libraries. JavaScript does not. Or at least, the one it has is very limited.

With [CommonJS](http://www.commonjs.org/), some of this can be fixed. While we're figuring that out, there's this.

## Organization

Standard-js is built to be modular - use what you need, throw out what you don't. We specifically do *not* want to replace jQuery, JavaScript 1.6, or HTML5; if something is available in one of the major libraries it should be used there.

 * core/ - core is designed to include primary JS functionality
 * browser/ - browser specific code - DOM stuff and the like
 * etc/ - additional functionality

Note that there are many many useful libraries that have not yet been copied here.

 * sprintf
 * Log/extend (https://github.com/msmtd/js-utils/)
 * Array comprehension stuff (https://github.com/adambossy/js-utils)
 * Date formatting (https://github.com/buzzwashere/js_utilities)

## License

This code is not ready, so a license has not been chosen yet. (Default proprietary).
