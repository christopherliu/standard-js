module("standard_library.core.Event");
asyncTest("Event", 0, function() {
	var evt = standard_library.core.Event;
	function Button() {
		var onClick = new evt("OnClick", this);
		this.simulateClick = function() {
			onClick.Call();
		};
	}
	var btn = new Button();
	btn.OnClick(function() {
		start();
	});
	btn.simulateClick();
});

module("standard_library.core.Publisher");
asyncTest("standard_library.core.Publisher(): old method", 1, function() {
	var Publisher = standard_library.core.Publisher;
	function Publisher1() {
		var publishingMethodAccessor = {};
		var publisher = new Publisher(publishingMethodAccessor);
		// Now anyone can subscribe to this object's events
		this.addSubscriber = publisher.addSubscriber;
		this.sendEvent = function() {
			publishingMethodAccessor.notifySubscribers({
				"name" : "red",
				"parameters" : [ "ok" ]
			});
		};
	}
	var p1 = new Publisher1();
	p1.addSubscriber({
		"red" : function(ret) {
			equal(ret, "ok", "Publisher sends ok to subscribers");
			start();
		}
	});
	p1.sendEvent();
});
asyncTest("standard_library.core.Publisher(): new method", 1, function() {
	var Publisher = standard_library.core.Publisher;
	function Publisher2() {
		var publishingMethodAccessor = {};
		Publisher.call(this, publishingMethodAccessor);
		this.sendEvent = function() {
			publishingMethodAccessor.notifySubscribers({
				"name" : "red",
				// New, array-less named syntax
				"ret" : [ "ok" ]
			});
		};
	}
	var p2 = new Publisher2();
	p2.addSubscriber({
		"red" : function(x) {
			equal(x.ret, "ok", "Publisher sends ok to subscribers");
			start();
		}
	});
	p2.sendEvent();
});

// TODO .removeAllSubscribers and .removeSubscriber
// TODO multiple subscribers
