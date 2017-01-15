// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"}, function(response) {
      SendToCalendar(response.filmTitle, response.when, response.where);
    });
  });
});

function SendToCalendar(filmTitle, when, where) {

    // Start building the URL
	  var calURL = "http://www.google.com/calendar/event?action=TEMPLATE";

    // Page title to event title
    calURL += `&text=${filmTitle.replace(/ /g, "+")}`;

    // Set the time
    calURL += `&dates=${when}`

    // Location is Lighthouse
    calURL += `&location=Lighthouse+Cinema+D7`;

    // Put screen number in description
    calURL += `&details=+${where.replace(/ /g, "+")}`;

    // Open the created url in a new tab
	  chrome.tabs.create({url: calURL});
}
