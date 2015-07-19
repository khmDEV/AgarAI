/*
 * Set scripts as local
 */
createRedirect("http://agar.io/main_out.js",
  "main_out_plus.js");
createRedirect("http://agar.io/AI.js",
  "AI.js");

/*
 * Kill intervals
 */
var clearIntervals="for (var i = 1; i < 999999999; i++){window.clearInterval(i);}";
var clearTimeouts="for (var i = 1; i < 999999999; i++){window.clearTimeout(i);}";
var removeOnload="window.onload=''";

exeScript(clearIntervals);
exeScript(clearTimeouts);
exeScript(removeOnload);

addScriptFile("http://agar.io/","main_out.js");
addScriptFile("http://agar.io/","AI.js");

function addScriptFile(from, file) {
  var scr = ["var newdiv = document.createElement('script');",
    "newdiv.type = \"text/javascript\";",
    "newdiv.src = \"" + file + "\";",
    "document.body.appendChild(newdiv);"
  ].join(' ');
  exeScript(from,scr);
}
function exeScript(from, script) {
  chrome.webRequest.onCompleted.addListener(
    function(details) {
      chrome.tabs.executeScript(details.tabId, {
        code: script
      }, null);
    }, {
      urls: [
        from
      ]
    }, ["responseHeaders"]);

}

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
