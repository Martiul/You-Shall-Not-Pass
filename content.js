
console.log(`[RUNNING] ${location.hostname}...`)

handlers = {
    "www.nytimes.com": nytimes,
    "www.washingtonpost.com": washingtonpost,
}

waitForComplete = setInterval(() => {
    if (document.readyState != "complete") return
    handlers[location.hostname]()
    clearInterval(waitForComplete)
    console.log(`[DONE] ${location.hostname}`)
}, 2000)

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

