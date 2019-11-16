async function weather(latt, longg) {
  var clientId = "OTRlvBrQsDw";
  var clientSecret = "7IIOnt5VwOPEXqaaGkuzNK8E9JlrX16byYYZYv1Kd1G2CkgW2iDGQg";
  var accessToken = "tPtzraWo36FOEkL7NEl7wGhaIzyoFbxlqqAykG-4";

  var targetUrl =
    "https://api.predicthq.com/v1/events?category=disasters%2Csevere-weather&within=10km%4041%2C-74/";

  const nodeFetch = require("node-fetch");

  const phq = require("predicthq");

  // Initialises PredictHQ client library using your access token
  // Note: You can find/create your access token at https://control.predicthq.com/clients
  const client = new phq.Client({
    access_token: accessToken,
    fetch: nodeFetch
  });

  // Use the events endpoint
  const phqEvents = client.events;

  const logEventsToConsole = events => {
    for (const event of events) {
      // See https://developer.predicthq.com/resources/events/#fields for list of all event fields.
      console.log(event);
      console.log();
    }
  };

  // 10km range around the -36.844480,174.768368 geopoint
  const withinParam = "10km@-36.844480,174.768368";

  // Event search using `within` parameter.
  // See https://developer.predicthq.com/resources/events/#parameters for all available search parameters.
  phqEvents
    .search({category: "disasters", within: withinParam })
    .then(logEventsToConsole)
    .catch(err => console.error(err));

  // OR if you know the place ID - example below search for events within the New York state (ID: 5128638)
  // Sort by start date in descending order
//   phqEvents
//     .search({ category: "disasters", sort: "-start" })
//     .then(logEventsToConsole)
//     .catch(err => console.error(err));
}

module.exports = weather;
