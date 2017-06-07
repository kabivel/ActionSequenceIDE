//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

/*
window.onload = function() {
    SceneManager.run(Scene_Boot);
};
*/


function fullRefresh()
{


}

var createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};