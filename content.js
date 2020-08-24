// Match hostname with corresponding handler

handlers = {
    "www.bloomberg.com": bloomberg,
    "www.nytimes.com": nytimes,
    "www.washingtonpost.com": washingtonpost,
    "www.thestar.com": thestar,
}
if (!location.hostname in handlers) {
    console.log(`[WARNING] Could not find handler for ${location.hostname}`)
}

console.log(`[RUNNING] ${location.hostname}...`)
waitForComplete = setInterval(() => {
    if (document.readyState != "complete") return
    handlers[location.hostname]()
    clearInterval(waitForComplete)
    console.log(`[DONE] ${location.hostname}`)
}, 1000)

function bloomberg() {
    chrome.runtime.sendMessage({source: location.hostname})
    // document.body.style.overflow="scroll"
    // document.querySelector("#graphics-paywall-overlay").style.display="none"
}

function nytimes() {
    // TODO: likely dynamic class names
    document.querySelector(".css-mcm29f").style.overflow="scroll";
    document.querySelector(".css-1bd8bfl").style.background="none";
    document.querySelector("#gateway-content").style.display="none";
}

function washingtonpost() {
    document.getElementsByTagName("html")[0].style.overflow="visible";
    document.getElementsByTagName("body")[0].style.position="";
    document.getElementsByTagName("body")[0].style.overflow="visible";
    document.querySelector(".paywall-overlay").style.display="none"
}

function thestar() {
    document.querySelector(".basic-paywall-new").remove()
    content = document.querySelector(".c-article-body__content").children
    for (i = 0; i < content.length; i++) {
        if (content[i].style.display == "none") {
            content[i].style.display = ""
        }
    }

}