chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.debug("🕵Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});

function injectScript(path) {
	var scriptElement = document.createElement('script');
	scriptElement.src = chrome.extension.getURL(path);
	console.log('🕵current document children', document.documentElement.childElementCount);
	document.documentElement.append(scriptElement);
}

injectScript('js/stacktrace.js');
injectScript('js/client-cookie-trace.js');

// Event listener
document.addEventListener('FROM_PAGE_SCRIPT', function(e) {
    // e.detail contains the transferred data (can be anything, ranging
    // from JavaScript objects to strings).
    // Do something, for example:
    alert(e.detail);
});

