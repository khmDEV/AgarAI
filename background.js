createRedirect("http://agar.io/main_out.js*",
  "main_out_plus.js");

createRedirect("http://agar.io/AI.js*",
  "AI.js");

function createRedirect(from, to) {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {
        redirectUrl: chrome.extension.getURL(to)
      };

    }, {
      urls: [
        from
      ]
    }, ["blocking"]);

}
