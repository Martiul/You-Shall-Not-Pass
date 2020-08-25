// Matchs host with corresponding handler
handlers = {
    "www.bloomberg.com": clearSiteData,
    "www.nytimes.com": nytimes,
    "www.washingtonpost.com": washingtonpost,
    "www.thestar.com": thestar,
    "www.businessinsider.com": businessinsider,
    "www.wired.com": clearSiteData
}

if (!location.hostname in handlers) {
    console.log(`[YSNP] [WARNING] Could not find handler for ${location.hostname}`)
}

console.log(`[YSNP] [RUNNING] ${location.hostname}...`)

chrome.storage.sync.get('enableOnSite', function(data) {
    let enableOnSite = data.enableOnSite
    if (!enableOnSite) {
        console.log("[YSNP] [WARNING]: Could not find 'enableOnSite' in storage data")
        return
    }
    if (!enableOnSite[location.hostname]) {
        console.log("[YSNP] Disabled for ", location.hostname)
        return
    }
    
    // Script enabled for this site
    waitForComplete = setInterval(() => {
        if (document.readyState != "complete" || !handlers[location.hostname]()) return
        clearInterval(waitForComplete)
        console.log(`[YSNP] [DONE] ${location.hostname}`)
        chrome.runtime.sendMessage({message: `Handled ${location.hostname}`})
    }, 2000)

})

//
// Handlers
//
function clearSiteData() {
    // Content scripts do not have access to browsing data
    // Call background script instead
    chrome.runtime.sendMessage({source: location.hostname})
    return true
}

function nytimes() {
    // TODO: likely dynamic class names
    document.querySelector(".css-mcm29f").style.overflow="scroll";
    document.querySelector(".css-1bd8bfl").style.background="none";
    document.querySelector("#gateway-content").style.display="none";
    return true
}

function washingtonpost() {
    body = document.getElementsByTagName("body")[0]
    if (body.style.overflow == "visible") return false
    
    document.querySelector(".paywall-overlay").style.display="none"
    document.getElementsByTagName("html")[0].style.overflow="visible";
    body.style.position="";
    body.style.overflow="visible";
    return true
}

function thestar() {
    if (!document.querySelector(".basic-paywall-new")) return false
    
    document.querySelector(".basic-paywall-new").remove()
    content = document.querySelector(".c-article-body__content").children
    for (i = 0; i < content.length; i++) {
        if (content[i].style.display == "none") {
            content[i].style.display = ""
        }
    }
    return true
}

function businessinsider() {
    document.querySelector(".tp-backdrop").style.display="none"
    document.querySelector(".tp-modal").style.display="none"
    document.getElementById("piano-inline-content-wrapper").style.display=""
    document.querySelector(".tp-modal-open").setAttribute('style', 'overflow: scroll !important')
    return true
}