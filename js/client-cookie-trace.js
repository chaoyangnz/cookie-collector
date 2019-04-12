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

	const name = Object.keys(c).filter((name) => !['domain', 'path', 'max-age', 'expires', 'secure', 'samesite', 'http-only'].includes(name))[0];
	const value = c[name]
	delete c[name]
	delete c['']
	return {
		...c,
		name,
		value
	}
}

// const background = chrome.extension.getBackgroundPage()

const cookie_setter = document.__lookupSetter__('cookie').bind(document);
const cookie_getter = document.__lookupGetter__('cookie').bind(document);

Object.defineProperty(document, 'cookie', { 
	set: function(value) {
		const frame = StackTrace.getSync()[3];
		const trace = `${frame.functionName}@${frame.fileName}:${frame.lineNumber}`

		let entry = {
			cookie: value,
			trace
		}

		const title = document.querySelector('title')
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

		fetch('http://localhost:9000?type=client', {
			method: 'POST',
			body: JSON.stringify(entry), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			console.log('🍪', entry)
		}).catch((error) => {
			console.error('🍪', error)
		})
		cookie_setter(value)
	},
	get: function() {
		return cookie_getter()
	}									
});