// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var filmDeets = document.querySelector('.OLCT_movieDetailsContainer');
      var showingDeets = filmDeets.querySelector('.OLCT_ticketInfoText').querySelectorAll('p');

      // Details object to return
      var details = {};

      // Set the film title
      details.filmTitle = filmDeets.querySelector('h3').innerHTML;

      // Get the start and end times
      var start = showingDeets[0].innerHTML;
      var duration = showingDeets[2].innerHTML;
      duration = duration.split("&nbsp;")[1];
      start = start.split(" ");

      var date = start.slice(2, 5).join(" ");
      var startTime = start[6];

      //start = Date.parse(start).toString("YYYY MM DD T hh mm ss Z");
      var when = `${Date.parse(date).toString("yyyyMMdd")}T${Date.parse(startTime).toString("HHmmss")}Z`;
      when += `/${Date.parse(date).toString("yyyyMMdd")}T${Date.parse(startTime).addMinutes(parseInt(duration)).toString("HHmmss")}Z`;

      details.when = when;
      
      details.where = showingDeets[1].innerHTML;

      sendResponse(details);
    }
  }
);
