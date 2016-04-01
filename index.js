// check that jquery is loaded
if (typeof jQuery == 'undefined') {
	console.log("jQuery NOT loaded: index.js");
} else {
	console.log("JQuery loaded: index.js");
}

// get chrome message
chrome.runtime.onMessage.addListener(

	function(request, sender, sendResponse) {

		// make sure that message contains the data
		if(request.action == "display") {
			
			// get the data
			var data = request.data;

			// display the data to the html page
			document.getElementById('art-link').setAttribute('href', data.link);

			document.getElementById('art-title').innerHTML = data.title;
			document.getElementById('art-subtitle').innerHTML = "By " + data.author[0] + " on " + (data.date == null ? "Unknown Date" : data.date);

			document.getElementById('art-class').innerHTML = "Classification: " + data.categories[0];
			document.getElementById('art-sentiment').innerHTML = "Sentiment: " + data.text_sentiment.word;
			document.getElementById('art-subjectivity').innerHTML = "Subjectivity: " + (data.text_sentiment.subjectivity * 100).toFixed(2) + "%";

			document.getElementById('art-summary-1').innerHTML = data.summary[0];
			document.getElementById('art-summary-2').innerHTML = data.summary[1];
			document.getElementById('art-summary-3').innerHTML = data.summary[2];
			document.getElementById('art-summary-4').innerHTML = data.summary[3];
			document.getElementById('art-summary-5').innerHTML = data.summary[4];

			for (var key in data.entities) {
				if (data.entities.hasOwnProperty(key) && data.entities[key].description != null) {
					$("#art-context").append('<li> <span title="' + data.entities[key].description + '">' + key + '</span> </li>');
				}
			}

		}

	}

);