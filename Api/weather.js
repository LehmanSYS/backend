async function sendWeather(b) {
    return b;
}

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
      sendWeather(1);
    }
  };
  if (latt > 40 && longg > 40){
      return true;
  }
  // 10km range around the -36.844480,174.768368 geopoint
  const withinParam = "10km@-36.844480,174.768368";

  // Event search using `within` parameter.
  // See https://developer.predicthq.com/resources/events/#parameters for all available search parameters.
  phqEvents
    .search({category: "disasters", within: withinParam })
    .then(logEventsToConsole)
    .catch(err => console.error(err));
  return false;
}

module.exports = weather;
