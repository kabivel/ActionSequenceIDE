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

    if (currentUser.signInStatus)
    {
        firebase.database().ref(currentUser.uid).update({
            theme: theme,
        });
    }
}

var firstClick = true;

function previewHandler()
{
    if (firstClick)
    {
        document.getElementById("previewHolder").removeAttribute("style");
        document.getElementById("ghostpane").removeAttribute("style");
        SceneManager.run(Scene_Boot);
        firstClick = false;
    }
    else
    {
        document.getElementById("previewHolder").removeAttribute("style");
        document.getElementById("ghostpane").removeAttribute("style");
        SceneManager.goto(Scene_Map);
    }

    window.scrollTo(0, document.getElementById("previewHolder").offsetTop - 50);
}

function closePreview()
{
    setTimeout(function(){
        SceneManager.goto(Scene_Pause);
        document.getElementById("previewHolder").style.display = "none";
        document.getElementById("ghostpane").style.display = "none";
    }, 1000);
}
