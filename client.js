// Include Socket.io script before this
// https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js

(function (history) {
	var pushState = history.pushState;
	history.pushState = function (state) {
		if (typeof history.onpushstate == "function") {
			history.onpushstate({
				state: state
			});
		};
		visitorData.page = document.URL;
		

		return pushState.apply(history, arguments);
	};
})(window.history);

var socket = io('https://breeze.thefeathers.in');
var visitorData = {
	referringSite: document.referrer,
	domain: window.parent.location.hostname,
	page: document.URL,
	userAgent: navigator.userAgent
}
var emit = function () {
	socket.emit('visitor-data', visitorData);
}
emit();