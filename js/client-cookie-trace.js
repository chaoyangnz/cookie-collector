// document.cookie
const parseCookie = function(cookie) {
	const c = cookie.split(';').reduce((res, c) => {
		const [key, val] = c.trim().split('=').map(decodeURIComponent)
		const allNumbers = str => /^\d+$/.test(str);
		try {
			return Object.assign(res, { [key]: allNumbers(val) ?  val : JSON.parse(val) })
		} catch (e) {
			return Object.assign(res, { [key]: val })
		}
	}, {})

	const name = Object.keys(c).filter((name) => !['domain', 'path', 'max-age', 'expires', 'secure', 'samesite'].includes(name))[0];
	const value = c[name]
	delete c[name]
	return {
		...c,
		name,
		value
	}
}

function consoleLog(...args) {
	const frame = StackTrace.getSync()[4]
	console.warn.apply(console, ['🍪', ...args, '[', `${frame.functionName}@${frame.fileName}:${frame.lineNumber}`, ']'])
}

const cookie_setter = document.__lookupSetter__('cookie').bind(document);
const cookie_getter = document.__lookupGetter__('cookie').bind(document);

Object.defineProperty(document, 'cookie', { 
	set: function(value) {
		const title = document.querySelector('title')
		let entry = parseCookie(value)
		if(title && title.textContent === 'Latest breaking news NZ | Stuff.co.nz') {
			entry = Object.assign({
				firstParty: true,
				context: window.location.href
			}, entry)
		} else {
			entry = Object.assign({
				firstParty: false,
				context: document.URL
			}, entry)
		}
		consoleLog(entry)
		cookie_setter(value)
	},
	get: function() {
		return cookie_getter()
	}									
});