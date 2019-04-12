// document.cookie
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