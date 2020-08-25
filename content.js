// Match hostname with corresponding handler

handlers = {
    "www.bloomberg.com": bloomberg,
    "www.nytimes.com": nytimes,
    "www.washingtonpost.com": washingtonpost,
    "www.thestar.com": thestar,
    "www.businessinsider.com": businessinsider,
}
if (!location.hostname in handlers) {
    console.log(`[WARNING] Could not find handler for ${location.hostname}`)
}

console.log(`[RUNNING] ${location.hostname}...`)
waitForComplete = setInterval(() => {
    if (document.readyState != "complete" || !handlers[location.hostname]()) return
    clearInterval(waitForComplete)
    console.log(`[DONE] ${location.hostname}`)
    chrome.runtime.sendMessage({message: `Handled ${location.hostname}`})
}, 2000)

function bloomberg() {
    chrome.runtime.sendMessage({source: location.hostname})
    return true
    // Alternative:
    // document.body.style.overflow="scroll"
    // document.querySelector("#graphics-paywall-overlay").style.display="none"
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