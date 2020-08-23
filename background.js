
var act = function() {
  console.log("hello bloomberg")
}
console.log("Background")

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      console.log("Background.js")

      // Lightup action icon when going to a matched page
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {hostEquals: 'developer.chrome.com', schemes: ['https']}
            }),
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {hostEquals: 'www.bloomberg.com', schemes: ['https']}
            }),
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()]         
        },
    ]);
    });
  });

// Check tabs and query for sites to use chrome. functions [Approach 1]
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length == 0) {
      return
    }
    var tab = tabs[0];
    var url = new URL(tab.url)
    var domain = url.hostname  // `domain` now has a value like 'example.com'

    console.log("Domain: ", domain)
    // Bloomberg
    if (domain.includes("bloomberg")) {
      console.log("Hello bloomberg")

      var callback = function() {
        console.log("Successfully cleared data from ", domain)
      }
      chrome.browsingData.remove({
        "origins": ["https://www.bloomberg.com", "http://www.bloomberg.com"]
      }, {
        "cacheStorage": true,
        "cookies": true,
        "fileSystems": true,
        "indexedDB": true,
        "localStorage": true,
        "pluginData": true,
        "serviceWorkers": true,
        "webSQL": true
      }, callback);
    }
  })
})

// chrome.runtime.onMessage(function(message, sender, sendResponse) {
//   console("Received message")
//   if (typeof message === "object" && message.type === "showPageAction") {
//     chrome.pageAction.show(sender.tab.id)
//   }
// })
