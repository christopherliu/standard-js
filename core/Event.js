/**
 * @name 		standard_library.core.Event
 * @namespace 	Provides information on events.
 */
if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.core === "undefined")
	standard_library.core = {};
if ( typeof standard_library.core.Event === "undefined")
	standard_library.core.Event = {};

/**
 * @param {Object}
 *            attachTo Optional shorthand. Makes attachTo[eventName] map to
 *            Event.Set.
 * @returns An Event object that can be bound.
 */
standard_library.core.Event.Event = function(eventName, attachTo) {
	if (!(this instanceof Event)) {
		return new Event(eventName, attachTo);
	}
	var _eventHandler = null;
	var _isLoggingEnabled = (typeof DEBUG !== 'undefined');
	this.Call = function() {
		if (_eventHandler) {
			if (_isLoggingEnabled) {
				console.log("Event: " + eventName + "("
						+ Array.prototype.join(arguments, [ "," ]) + ")");
				// Find way to do universally.
			}
			return _eventHandler.apply(this, arguments);
		}
	};
	this.Set = function(handler) {
		_eventHandler = handler;
	};
	if (attachTo) {
		attachTo[eventName] = this.Set;
	}
}