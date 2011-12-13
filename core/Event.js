/*
Creates an object
*/
function Event (eventName) {
	var _eventHandler = null;
	var _isLoggingEnabled = (typeof DEBUG !== 'undefined');
	return {
		"Call" : function() {
			if(_eventHandler) {
				if(_isLoggingEnabled) {
					console.log("Event: " + eventName
						+ "("
						+ Array.prototype.join(arguments, [","]) + ")");//Find way to do universally.
				}
				_eventHandler.apply(this,arguments);
			}
		},
		"Set" : function(handler) {
			_eventHandler = handler;
		}
	};
}