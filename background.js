import { Sites } from './sites.js'

chrome.runtime.onInstalled.addListener(function() {
  let enableOnSite = {}
  let sites = Sites()
  for (let i = 0; i < sites.length; i++) {
    enableOnSite[sites[i]] = true
  }
  chrome.storage.sync.set({enableOnSite: enableOnSite}, function() {
    console.log('Stored: ', enableOnSite);
  });

  // Show button on supported sites
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    let conditions = []
    for (let i = 0; i < sites.length; i++) {
      conditions.push(new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: sites[i]},
      }))
    }
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: conditions,
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        let weekAgo = (new Date().getTime() - 1000*60*60*24*7)
        if ("message" in req) {
            console.log(req.message)
        }
        
        if ("source" in req) {
            chrome.browsingData.remove({
                "since": weekAgo,
                "origins": ["https://www." + req.source], // [req.source]
            }, {
                "cacheStorage": true,
                "cookies": true,
                "fileSystems": true,
                "indexedDB": true,
                "localStorage": true,
                "pluginData": true,
                "serviceWorkers": true,
                "webSQL": true
            }, function() {
                sendResponse({message: `Cleared browsing data for ${req.source}`})
                console.log(`Cleared browsing data for ${req.source}`)
            })
        }
    }
)
