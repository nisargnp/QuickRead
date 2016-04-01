// check that jquery is loaded
if (typeof jQuery == 'undefined') {
	console.log("jQuery NOT loaded: history.js");
} else {
	console.log("JQuery loaded: history.js");
}

// get chrome message
chrome.runtime.onMessage.addListener(

	function(request, sender, sendResponse) {

		// make sure it is the right message
		if(request.action == "history") {
			
			// get the data
			var data = request.data;

			// display each key in the data
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					$("#link_area").append('<li style="font-size:20px;margin-bottom:10px;"><a href="#" class="link">' + key + '</a></li>');
				}
			}

		}

	}

)

// called on user's clickS
$(document).click(function(e) {

	//console.log(e.target.className); //== apple
	//console.log(e.target.nodeName); //== A

	// link clicked
	if (e.type == "click" && e.target.className == "link") {

		// send clicked key to background.js
		console.log(e.target.innerText);
		chrome.runtime.sendMessage({
			action: "history",
			title: e.target.innerText
		});

	}

	// clear button clicked
	if (e.type == "click" && e.target.nodeName == "BUTTON") {

		if (confirm("Clear QuickRead history?")) {

			// clear the history and reload the page
			chrome.storage.local.clear(function() {
				window.location.reload();
			});

		}

	}

});
