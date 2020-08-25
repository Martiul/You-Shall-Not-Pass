// Can enable/disable extension for individual sites
chrome.storage.sync.get('enableOnSite', function(data) {
  let enableOnSite = data.enableOnSite
  
  // console.log("[popup.js]", data)
  // console.log("[popup.js]", data.enableOnSite)

  chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
    if (tabs.length == 0) return
    let domain = (new URL(tabs[0].url)).hostname
 
    // Display current site
    let currentSite = document.getElementById("current-site")
    currentSite.appendChild(document.createTextNode(`Currently browsing: ${domain}`))

    let toggles = document.getElementById("toggles")
    for (let siteName in enableOnSite) {
      // <div id="www.example.com-slider" class="siteToggle">
      //  <a href="https://www.example.com">www.example.com</a>
      //  <label class="switch">
      //    <input type="checkbox">
      //    <span class="slider round"></span>
      //  </label>
      // </div>
      let newDiv = document.createElement("div")
      newDiv.id = siteName + "-slider"
      newDiv.className = "siteToggle"

      let newLink = document.createElement("a")
      newLink.setAttribute("href", "https://"+siteName)
      newLink.setAttribute("target", "_blank")
      newLink.appendChild(document.createTextNode(siteName))
      newDiv.appendChild(newLink)
      
      let newLabel = document.createElement("label")
      newLabel.className="switch"
      newLabel.id = siteName+"-label"

      let newInput = document.createElement("input")
      newInput.setAttribute("type", "checkbox")
      if (enableOnSite[siteName]) {
        newInput.checked = true
      }
      newInput.onclick = function() {
        enableOnSite[siteName] = newInput.checked
        chrome.storage.sync.set({enableOnSite: enableOnSite}, function() {
          console.log("Updated storage")
        })
      }
      newLabel.appendChild(newInput)
      
      let newSpan = document.createElement("span")
      newSpan.className="slider round"
      newLabel.appendChild(newSpan)
      
      newDiv.appendChild(newLabel)
      toggles.appendChild(newDiv)
    }
  })
})
