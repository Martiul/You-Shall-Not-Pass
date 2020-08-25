
chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        weekAgo = (new Date().getTime() - 1000*60*60*24*7)
        if ("message" in req) {
            console.log(req.message)
        }
        
        if (req.source == "www.bloomberg.com") {
            chrome.browsingData.remove({
                "since": weekAgo,
                "origins": ["https://" + req.source], // [req.source]
            }, {
                "cacheStorage": true,
                "cookies": true,
                "fileSystems": true,
                "indexedDB": true,
                "localStorage": true,
                "pluginData": true,
                "serviceWorkers": true,
                "webSQL": true
            }, () => {
                console.log(`Cleared browsing data for ${req.source}`)
            })
        }
    }
)
