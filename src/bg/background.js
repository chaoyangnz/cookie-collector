// HTTP response set-cookie
chrome.webRequest.onCompleted.addListener(function(res) {
  // console.log(JSON.stringify(res.responseHeaders))
  res.responseHeaders.forEach((kv) => {
    if(kv.name.toLowerCase() == 'set-cookie') {
      const entry = {
        url: res.url,
        cookie: kv.value
      }
      fetch('http://localhost:9000?type=http', {
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
    }
  })
}, {
  urls: [
      '*://*/*'
  ]
},
['responseHeaders', 'extraHeaders']);