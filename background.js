// check that jquery is loaded
if (typeof jQuery == 'undefined') {
	console.log("jQuery NOT loaded: background.js");
} else {
	console.log("JQuery loaded: background.js");
}

// text processing api globals
api = "https://joanfihu-article-analysis-v1.p.mashape.com/link?entity_description=True&link=";
auth = {
			"X-Mashape-Key": "HlafUsGl34mshROF7OLr0sDeh4qep198tgJjsn0F3y3UjbvLYz",
			"Accept": "application/json"
};

// implement history
chrome.contextMenus.create({
	"title": "History",
	"contexts": ["browser_action"],
	"onclick": function() {
		chrome.storage.local.get(function(data) {

			// create history tab
			chrome.tabs.create({ url: "history/history.html" }, function(tab) {
				setTimeout(function () {
					chrome.tabs.sendMessage(tab.id, {action: "history", data: data});
				}, 100);
			});

		});
	}
});

// user button click
chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		
		// set icon to blue while processing
		chrome.browserAction.setIcon({
			path: "alt_icons/icon_blue.png",
			tabId: tabs[0].id
		});

		// call to text processing api
		$.ajax({
			url: api + encodeURI(tabs[0].url),
			headers: auth,
			type: "GET",
			dataType: "json",
			success: function(data) {

				var obj = {};
				obj[data.title] = data;
				chrome.storage.local.set(obj, function() {
					console.log("Data saved.");
				});

				// set the icon color back to normal
				chrome.browserAction.setIcon({
					path: "icon.png",
					tabId: tabs[0].id
				});

				// display the returned data
				displayData(data);

			}
		});

	});

});

// getting a message
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

	// check if message is from history
	if (message.action == "history") {

		// get the data from storage and display it
		chrome.storage.local.get(message.title, function(data) {
			displayData(data[message.title]);
		});

	}

})

// create a tab to display data and send it the data
function displayData(data) {

	// create a new tab
	chrome.tabs.create({ url: "bootstrap/index.html" }, function(tab) {

		// wait for new tab page to load
		setTimeout(function () {

			// send the data to the new tab
			chrome.tabs.sendMessage(tab.id, {
				"action": "display", 
				"data": data
			});

		}, 100);

	});

}



