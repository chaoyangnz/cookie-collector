function injectScript(path) {
	var scriptElement = document.createElement('script');
	scriptElement.src = chrome.extension.getURL(path);
	console.log('🕵current document children', document.documentElement.childElementCount);
	document.documentElement.append(scriptElement);
}

injectScript('js/stacktrace.js');
injectScript('js/client-cookie-trace.js');


