// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.debug('🕵', sender.tab.id);
  	// chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

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