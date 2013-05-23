/*
 * 
 */

/**
 * @class
 * @param {Object}
 *            publishingMethodAccessor This object is updated to provide private
 *            access to notifySubscribers.
 * @example <code>
 * var publisher = new Publisher(publishingMethodAccessor);
 * //OR, to subclass: Publisher.call(this, publishingMethodAccessor);
 *
 * // Called from internal methods 
 * publishingMethodAccessor.notifySubscribers({
 *	"name" : "itemDropped", "parameters" : [ value ] });
 * publishingMethodAccessor.notifySubscribers({
 * 	"name" : "itemDropped", "data1": 1, "data2": 2 }); 
 * //New, array-less named syntax

 * Now anyone can subscribe to this objects events
 * this.addSubscriber = publisher.addSubscriber;
 *  </code>
 */
standard_library.core.Publisher.publisher = function(publishingMethodAccessor) {
	// ------------------------------------------------------------------------
	// Private variables
	var subscribers = [];
	var debug = (typeof TraceJS !== 'undefined' ? TraceJS.GetLogger("debug",
			"Publisher") : function() {

	});
	if (!publishingMethodAccessor)
		publishingMethodAccessor = this;

	// -------------------------------------------------------------------------
	// Accessible methods
	/**
	 * Inform anyone subscribed to this Publisher that something has occurred to
	 * observe.
	 * 
	 * @param {Object}
	 *            event Event to publish to all subscribers.
	 * @param {String}
	 *            event.name
	 * @param {Object[]}
	 *            event.parameters If parameters is present, will call the
	 *            subscribers the old way, with an array of parameters.
	 */
	publishingMethodAccessor.notifySubscribers = function(event) {
		debug([ "notifySubscribers", event.name ], event);
		for ( var i = 0; i < subscribers.length; i++) {
			if (subscribers[i][event.name]) {
				if ("parameters" in event) {
					subscribers[i][event.name].apply(this, event.parameters
							|| []);
				} else {
					subscribers[i][event.name].call(this, event);
				}
			}
		}
	};
	/**
	 * @param {Object}
	 *            subscriber A dictionary mapping the names of events to
	 *         			     functions that respond to them.
	 * @return {Object} A user who is interested in seeing the results of the dice.
	 */
	this.addSubscriber = function(subscriber) {
		debug("addSubscriber", subscriber);
		subscribers[subscribers.length] = subscriber;
		return subscriber;
	};
	
	/**
	 * Removes all the subscribers from the array.
	 */
	this.removeAllSubscribers = function() {
		subscribers = [];
	};
	
	/**
	 * Removes one subscriber from the array.
	 * @param {Object}
	 * 			subscriber	A user who was invested in seeing the results of the dice.
	 */
	this.removeSubscriber = function(subscriber) {
		for ( var i = 0; i < subscribers.length; i++) {
			if (subscribers[i] === subscriber) {
				subscribers.splice(i, 1);
				return;
			}
		}
	};
}