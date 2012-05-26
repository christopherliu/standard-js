/*
@returns An Event object that can be bound. Does not work with new yet.

@param {Object} attachTo Optional shorthand. Makes attachTo[eventName] map to Event.Set.
*/
function Event (eventName, attachTo) {
	var _eventHandler = null;
	var _isLoggingEnabled = (typeof DEBUG !== 'undefined');
	var ev = {
		"Call" : function() {
			if(_eventHandler) {
				if(_isLoggingEnabled) {
					console.log("Event: " + eventName
						+ "("
						+ Array.prototype.join(arguments, [","]) + ")");//Find way to do universally.
				}
				return _eventHandler.apply(this, arguments);
			}
		},
		"Set" : function(handler) {
			_eventHandler = handler;
		}
	};
    if(attachTo) {
        attachTo[eventName] = ev.Set;
    }
    return ev;
}