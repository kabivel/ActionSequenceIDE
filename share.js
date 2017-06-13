var preHolder = document.getElementById("previewHolder");
var editor = CodeMirror(document.getElementById("codeMirrorHolder"), {
    readOnly: true,
    mode: "simplemode",
    lineNumbers: true,
    tabSize: 2,
    highlightSelectionMatches: true,
    scrollbarStyle: "simple",
    styleActiveLine: true,
    theme: "serge-light",
    autoCloseBrackets: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldGutter: {
        rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.xml, CodeMirror.fold.indent)
    },
    extraKeys: {
        "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
    }

});

window.addEventListener("load", function(event){

    var key = getParameterByName("sequence");

    if(key != "" && key != null)
    {

        firebase.database().ref("public/" + key).once("value", function(sequence){
            if (sequence.exists())
            {
                document.getElementById("projectName").innerHTML = sequence.val().name;
                editor.setValue(sequence.val().code);
                if (sequence.val().scope != null)
                {
                    document.getElementById("skillScope").value = sequence.val().scope;
                }
                if (sequence.val().damageType != null)
                {
                    document.getElementById("skillDamageType").value = sequence.val().damageType;
                }
                if (sequence.val().animation != null)
                {
                    document.getElementById("skillAnimation").value = sequence.val().animation;
                }
                if (sequence.val().castAnimation != null)
                {
                    document.getElementById("skillCastAnimation").value = sequence.val().castAnimation;
                }

                externalAssetPath = sequence.val().ownAssets;
                if (externalAssetPath == undefined)
                {
                    externalAssetPath = "";
                }
                updateSkillSettings(false);
            }
            else
            {
                document.getElementById("projectName").innerHTML = "Project Not Found";
                document.getElementById("projectName").style.backgroundColor = "red";
            }
        });
    }
});

function getParameterByName(name)
{

    var url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results)
    {
        return null;
    }
    if (!results[2])
    {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function toggleFullscreen()
{
    editor.setOption("fullScreen", !editor.getOption("fullScreen"));
}

function changeTheme()
{
    var theme = document.getElementById("themeSelector").value;

    editor.setOption("theme", theme);
}

var firstClick = true;

function previewHandler()
{
    document.getElementById("dragMe").removeAttribute("style");
    document.getElementById("ghostpane").removeAttribute("style");
    document.getElementById("openPreviewButton").style.display = "none";
    document.getElementById("closePreviewButton").removeAttribute("style");
    preHolder.src = "game.html";
}

function closePreview()
{
    preHolder.src = "";
    document.getElementById("dragMe").style.display = "none";
    document.getElementById("ghostpane").style.display = "none";
    document.getElementById("closePreviewButton").style.display = "none";
    document.getElementById("openPreviewButton").removeAttribute("style");
}

function volumeHandler()
{
    adjustVolume();
}

function adjustVolume()
{
    preHolder.contentWindow.ConfigManager.bgmVolume = parseInt(document.getElementById("bgmVol").value);
    preHolder.contentWindow.ConfigManager.bgsVolume = parseInt(document.getElementById("bgsVol").value);
    preHolder.contentWindow.ConfigManager.seVolume = parseInt(document.getElementById("seVol").value);
    preHolder.contentWindow.ConfigManager.meVolume = parseInt(document.getElementById("meVol").value);
}

function updateSkillSettings(dirty)
{
    try
    {
        var skill = preHolder.contentWindow.$dataSkills[11];
        skill.scope = parseInt(document.getElementById("skillScope").value);
        skill.damage.type = parseInt(document.getElementById("skillDamageType").value);
        skill.animationId = parseInt(document.getElementById("skillAnimation").value);
        skill.castAnimation = parseInt(document.getElementById("skillCastAnimation").value);
    }
    catch(e)
    {

    }
}

function setSkillOptions()
{
    var skill = preHolder.contentWindow.$dataSkills[11];
    document.getElementById("skillScope").value = skill.scope;
    document.getElementById("skillDamageType").value = skill.damage.type;
    document.getElementById("skillAnimation").value = skill.animationId;
    document.getElementById("skillCastAnimation").value = skill.castAnimation;
    document.getElementById("skillDropdown").removeAttribute("style");
}

var externalAssetPath = "";

function loadCustomData()
{
    if (externalAssetPath != "" && externalAssetPath != undefined && externalAssetPath != null)
    {
        preHolder.contentWindow.DataManager.loadDataFile("$dataAnimations", externalAssetPath + "/data/Animations.json");
    }
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