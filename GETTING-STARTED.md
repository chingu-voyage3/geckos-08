# Chrome Extensions - Getting Started

1. [Chrome Extensions - Getting Started](#chrome-extensions---getting-started)
	1. [Useful Chrome Extension Links](#useful-chrome-extension-links)
	2. [Chrome Extension Files](#chrome-extension-files)
		1. [Required manifest.json entries](#required-manifestjson-entries)
		2. [Replace the default Chrome Tab with another page](#replace-the-default-chrome-tab-with-another-page)
		3. [Permissions](#permissions)
	3. [Load Chrome Extension from local files](#load-chrome-extension-from-local-files)
	4. [Pack a Chrome Extension for distribution](#pack-a-chrome-extension-for-distribution)

## Useful Chrome Extension Links

- [Overview](https://developer.chrome.com/extensions)
- [Getting Started](https://developer.chrome.com/extensions/getstarted)
- [Developer's Guide](https://developer.chrome.com/extensions/devguide)
- [Manifest File](https://developer.chrome.com/extensions/manifest)
- [Event Pages](https://developer.chrome.com/extensions/event_pages)
- [Javascript API's](https://developer.chrome.com/extensions/api_index)
- [Permissions](https://developer.chrome.com/extensions/declare_permissions)
- [Sample Extensions](https://developer.chrome.com/extensions/samples)

## Chrome Extension Files

Every extension has the following files:

- A manifest file (manifest.json)
- One or more HTML files (unless the extension is a theme)
- Optional: One or more JavaScript files
- Optional: Any other files your extension needs, for example, image files

### Required manifest.json entries

```javascript
  // manifest.json
  "manifest_version": 2,
  "name": "My Extension",
  "version": "versionString"
```

### Replace the default Chrome Tab with another page

```javascript
// manifest.json
"chrome_url_overrides": {
  "newtab": "index.html"
}
```

```javascript
// background.js
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    url: `index.html`
  });
});
```

### Permissions



```javascript
// manifest.json
"permissions": [
  "background", // for chrome extension api permissions
  "storage",
  "tabs",
  "http://*.google.com/", // for CORS ajax call permissions
  "https://*.google.com/"
]
```

## Load Chrome Extension from local files

- Visit `chrome://extensions` in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox, and select _"More tools"_ --> _"Extensions"_ under the  menu to get to the same place).
- Check the _"Developer mode"_ checkbox in the top right-hand corner.
- Click _"Load unpacked extension"_, to pop up a file-selection dialog.
- Navigate to the directory in which your extension files live, and select it.
- Alternatively, you can drag and drop the directory where your extension files live onto `chrome://extensions` in your browser to load it.

## Pack a Chrome Extension for distribution

- Open up the Chrome menu by clicking the icon to the far right of the Omnibox, and select _"More tools"_ --> _"Extensions"_.
- Click _"Pack extension"_, to pop up a file-selection dialog.
- Navigate to the directory in which your extension files live, and select it (src). If you have optimized (minified, uglified, etc...) your files into a new directory, select that (build, dist, etc...).
- Click _"Pack Extension"_
