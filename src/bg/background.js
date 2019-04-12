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
      '*://*/*',
  ],
  types: ["main_frame", "sub_frame"]
},
['responseHeaders', 'extraHeaders']);


// disable CSP
chrome.webRequest.onHeadersReceived.addListener(function(details) {
  for (var i = 0; i < details.responseHeaders.length; i++) {
    if ('content-security-policy' === details.responseHeaders[i].name.toLowerCase()) {
      details.responseHeaders[i].value = '';
    }
  }

  return {
    responseHeaders: details.responseHeaders
  };
}, {
  urls: ["*://*/*"],
  types: ["main_frame", "sub_frame"]
}, ["blocking", "responseHeaders"]);
