var preHolder = document.getElementById("previewHolder");
var autoComplete = true;
var defaultCode = "<setup action>\n" +
    "  clear battle log\n" +
    "  display action\n" +
    "  immortal: targets, true\n" +
    "  perform start\n" +
    "  wait for movement\n" +
    "  cast animation\n" +
    "  wait for animation\n" +
    "</setup action>\n" +
    "\n" +
    "<whole action>\n" +
    "  perform action\n" +
    "  motion wait: user\n" +
    "  action animation\n" +
    "  wait for animation\n" +
    "  action effect\n" +
    "  death break\n" +
    "</whole action>\n" +
    "\n" +
    "<target action>\n" +
    "  perform action\n" +
    "  motion wait: user\n" +
    "  action animation\n" +
    "  wait for animation\n" +
    "  action effect\n" +
    "  death break\n" +
    "</target action>\n" +
    "\n" +
    "<follow action>\n" +
    "\n" +
    "</follow action>\n" +
    "\n" +
    "<finish action>\n" +
    "  immortal: targets, false\n" +
    "  wait for new line\n" +
    "  clear battle log\n" +
    "  perform finish\n" +
    "  wait for movement\n" +
    "  wait for effect\n" +
    "  action common event\n" +
    "</finish action>\n";

var currentProject = "";
var dirty = false;

var editor = CodeMirror(document.getElementById("codeMirrorHolder"), {
    value: defaultCode,
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


function toggleFullscreen()
{
    editor.setOption("fullScreen", !editor.getOption("fullScreen"));
    document.getElementById("description").classList.toggle("hidden");
}

function changeTheme()
{
    var theme = document.getElementById("themeSelector").value;

    editor.setOption("theme", theme);

    if (currentUser.signInStatus)
    {
        firebase.database().ref(currentUser.uid).update({
            theme: theme,
        });
    }
}

editor.on("inputRead", function(event){
    setDirty(true);
    if (autoComplete)
    {
        editor.showHint({
            hint: CodeMirror.hint.anyword,
            completeSingle: false,
        });
    }
});

function saveHandler()
{

    if (currentProject == "")
    {
        saveAsHandler();
    }
    else
    {
        firebase.database().ref(currentUser.uid + "/sequences/" + currentProject).update({
            code: editor.getValue(),
            scope: document.getElementById("skillScope").value,
            damageType: document.getElementById("skillDamageType").value,
            animation: document.getElementById("skillAnimation").value,
            castAnimation: document.getElementById("skillCastAnimation").value,
        });
        setDirty(false);
    }
}

function saveAsHandler()
{
    var result = prompt("Give this sequence a name.");

    if (result != null)
    {

        currentProject = firebase.database().ref(currentUser.uid + "/sequences").push({
            name: result,
            code: editor.getValue(),
            scope: document.getElementById("skillScope").value,
            damageType: document.getElementById("skillDamageType").value,
            animation: document.getElementById("skillAnimation").value,
            castAnimation: document.getElementById("skillCastAnimation").value,
        });
        setCurrentProject(currentProject.key);
        setDirty(false);

    }
}

function loadHandler()
{
    var key = document.getElementById("sequenceSelector").value;
    var confirmation = true;
    if (dirty)
    {
        confirmation = confirm("Unsaved changes will be lost, continue?");
    }

    if (confirmation)
    {
        firebase.database().ref(currentUser.uid).child("sequences").child(key).once('value', function(sequence){
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
            setCurrentProject(key);
            updateSkillSettings(false);
        });
    }
}

function newHandler()
{
    var confirmation = true;
    if (dirty)
    {
        confirmation = confirm("Unsaved changes will be lost, continue?");
    }

    if(confirmation)
    {
        editor.setValue(defaultCode);
        setCurrentProject("");
        setDirty(false);
    }
}

function deleteHandler()
{
    var selector = document.getElementById("sequenceSelector")

    var key = selector.value;
    var name = selector.options[selector.options.selectedIndex].innerHTML;
    var confirmation = confirm("Are you sure you want to delete: " + name + "?");

    if (confirmation)
    {
        firebase.database().ref(currentUser.uid + "/sequences").child(key).remove();

        if (currentProject == key)
        {
            editor.setValue(defaultCode);
            setCurrentProject("");
            setDirty(false);
        }
    }
}

function signInButton()
{
    document.getElementById("firebaseui-auth-container").removeAttribute("style");
}

function signOutButton()
{
    firebase.auth().signOut();
}

function signedOutHandler()
{
    document.getElementById("signedInButtons").style.display = "none";
    document.getElementById("signOutButton").style.display = "none";
    document.getElementById("signInButton").removeAttribute("style");
    document.getElementById("userName").innerHTML = "Not Logged In";
}
function signedInHandler()
{
    firebase.database().ref(currentUser.uid).child("theme").once('value', function(theme){
        document.getElementById("themeSelector").value = theme.val();
        changeTheme();
    });

    firebase.database().ref(currentUser.uid).child("volume").once('value', function(volume){
        if (volume.val())
        {
            if (volume.val().bgm != null)
            {
                document.getElementById("bgmVol").value = volume.val().bgm;
            }
            if (volume.val().bgs != null)
            {
                document.getElementById("bgsVol").value = volume.val().bgs;
            }
            if (volume.val().se != null)
            {
                document.getElementById("seVol").value = volume.val().se;
            }
            if (volume.val().me != null)
            {
                document.getElementById("meVol").value = volume.val().me;
            }
        }
    });

    firebase.database().ref(currentUser.uid).child("sequences").on('value', function(sequences){
        var htmlString = "";
        sequences.forEach(function(sequence){
            htmlString += "<option value='" + sequence.key + "'>" + sequence.val().name + "</option>";
        });
        document.getElementById("sequenceSelector").innerHTML = htmlString;
    });

    firebase.database().ref(currentUser.uid).child("ownAssets").once('value', function(assetPath){
        externalAssetPath = assetPath.val();
        document.getElementById("customPathBox").value = assetPath.val();
    });

    document.getElementById("signedInButtons").removeAttribute("style");
    document.getElementById("signInButton").style.display = "none";
    document.getElementById("signOutButton").removeAttribute("style");
    document.getElementById("userName").innerHTML = "Signed In As: " + currentUser.displayName;
}

function setDirty(torf)
{
    if (currentUser.uid != "")
    {
        var projectName = document.getElementById("projectName");

        if (torf && !dirty)
        {
            projectName.innerHTML += "(Unsaved)";
        }
        else if(!torf)
        {
            projectName.innerHTML = projectName.innerHTML.split("(Unsaved)")[0];
        }
    }
    dirty = torf;
}

function setCurrentProject(curProj)
{
    var projectName = document.getElementById("projectName");
    currentProject = curProj;
    if (curProj == "")
    {
        projectName.innerHTML = "New Sequence";
    }
    else
    {
        firebase.database().ref(currentUser.uid + "/sequences/" + curProj).once("value", function(project){
            projectName.innerHTML = "Current Sequence: " + project.val().name;   
        });

    }
}

function shareHandler()
{
    var publicName = prompt("Give the sequence a name. (Optional)");
    var publicKey = "";
    var publicURL = "";

    if (publicName != null)
    {
        publicKey = firebase.database().ref("public/").push({
            name: publicName,
            code: editor.getValue(),
            scope: document.getElementById("skillScope").value,
            damageType: document.getElementById("skillDamageType").value,
            animation: document.getElementById("skillAnimation").value,
            castAnimation: document.getElementById("skillCastAnimation").value,
            ownAssets: externalAssetPath,
        });
        publicURL = window.location.origin + "/share.html?sequence=" + publicKey.key;

        document.getElementById("shareContent").innerHTML = "<h1>Your sequence is ready to share at: </h1><a target='_blank' href='" + publicURL + "'><h1>" + publicURL + "</h1></a>";
        document.getElementById("shareModal").removeAttribute("style");
    }

}


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
    if (currentUser.signInStatus)
    {
        firebase.database().ref(currentUser.uid).child("volume").update({
            bgm: document.getElementById("bgmVol").value,
            bgs: document.getElementById("bgsVol").value,
            se: document.getElementById("seVol").value,
            me: document.getElementById("meVol").value,
        });
    }

    adjustVolume();
}

function adjustVolume()
{
    try
    {
        preHolder.contentWindow.ConfigManager.bgmVolume = parseInt(document.getElementById("bgmVol").value);
        preHolder.contentWindow.ConfigManager.bgsVolume = parseInt(document.getElementById("bgsVol").value);
        preHolder.contentWindow.ConfigManager.seVolume = parseInt(document.getElementById("seVol").value);
        preHolder.contentWindow.ConfigManager.meVolume = parseInt(document.getElementById("meVol").value);
    }
    catch(e)
    {

    }
}

function updateSkillSettings(dirty)
{
    try
    {
        var skill =  preHolder.contentWindow.$dataSkills[11];
        skill.scope = parseInt(document.getElementById("skillScope").value);
        skill.damage.type = parseInt(document.getElementById("skillDamageType").value);
        skill.animationId = parseInt(document.getElementById("skillAnimation").value);
        skill.castAnimation = parseInt(document.getElementById("skillCastAnimation").value);
    }
    catch(e)
    {

    }

    if (dirty)
    {
        setDirty(true);
    }
}

function setSkillOptions()
{
    var skill =  preHolder.contentWindow.$dataSkills[11];
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

function saveCustomPath()
{
    var path = document.getElementById("customPathBox").value;
    if (path.slice(0,7) != "http://" && path.slice(0, 8) != "https://")
    {
        path = "http://" + path;
    }
    if (path.charAt(path.length - 1) == "/")
    {
        path = path.slice(0, -1);
    }

    if (currentUser.signInStatus)
    {

        firebase.database().ref(currentUser.uid).update({
            ownAssets: path,
        });
    }
    externalAssetPath = path;
    loadCustomData();
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


function openNav() 
{
    document.getElementById("sideNav").style.width = "40%";
    document.getElementById("openNavButton").style.display = "none";
    document.getElementById("closeNavButton").removeAttribute("style");
}

function closeNav() 
{
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("closeNavButton").style.display = "none";
    document.getElementById("openNavButton").removeAttribute("style");
}

function resetEditor()
{
    document.getElementById("codeMirrorHolder").removeAttribute("style");
    editor.setOption("fullScreen", false);
    document.getElementById("description").classList.remove("hidden");
}

function clearEditor()
{
    editor.setValue("");
}

function toggleAutoComplete(element)
{
    autoComplete = !autoComplete;
    if (autoComplete)
    {
        element.textContent = "Turn Auto Complete Off";
    }
    else
    {
        element.textContent = "Turn Auto Complete On";
    }
}

document.getElementById("dragMe").addEventListener('mouseup', function(event){
    preHolder.contentWindow.document.dispatchEvent(new MouseEvent('mouseup'));
});

document.getElementById("dragMe").addEventListener('mousedown', function(event){
    preHolder.contentWindow.document.dispatchEvent(new MouseEvent('mousedown'));
});

document.getElementById("dragMe").addEventListener('touchstart', function(event){
    preHolder.contentWindow.document.dispatchEvent(new TouchEvent('touchstart'));
});

document.getElementById("dragMe").addEventListener('touchend', function(event){
    preHolder.contentWindow.document.dispatchEvent(new TouchEvent('touchend'));
});
