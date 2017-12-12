/**
 * Listens for extension button to be clicked then creates the tab
 */

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({url: `index.html`});
});
