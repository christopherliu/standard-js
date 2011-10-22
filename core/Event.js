/*
Creates an object
*/
function Event (eventName) {
	var _eventHandler = null;
	return {
		"Call" : function() {
			if(_eventHandler) {
				console.log("Event: " + eventName
					+ "("
					+ Array.prototype.join(arguments, [","]) + ")");//Find way to do universally.
				_eventHandler.apply(this,arguments);
			}
		},
		"Set" : function(handler) {
			_eventHandler = handler;
		}
	};
}