# You Shall (Not) Pass
A Chrome extension to bypass paywalls on news sites.

## Installation
Download this repo and go to `chrome://extensions/` in Chrome.

Turn on `Developer mode` in the top-right corner. Click the `Load unpacked` button and select this repository.

## Supported Sites
### Bloomberg
Clears site cache so there's always one free article remaining

### New York Times
Removes paywall and enables scrolling

### Washington Post
Remove paywall and enables scrolling. Full article content is likely behind user authentication

### The Star
Enables subscriber-exclusive articles. This is because behind the paywall, article content simply has `display:none` styling that can be removed.

### Business Insider
Enables Premium articles.
Removes payall and enables scrolling. Article content has a parent with `display:none`, which is removed.

### Wired
Clears site data so there is always a free article to read.
