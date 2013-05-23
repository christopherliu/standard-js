/**
 * 
 * @returns An Event object that can be bound.
 * 
 * @param {Object}
 *            attachTo Optional shorthand. Makes attachTo[eventName] map to
 *            Event.Set.
 */
standard_library.core.Event.event = function(eventName, attachTo) {
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