function openPage(id)
{
    var panes = document.getElementsByClassName("infoPanes");

    for (var i = 0; i < panes.length; i++)
    {
        if (panes[i].id == id)
        {
            panes[i].classList.remove("hidden");
        }
        else
        {
            panes[i].classList.add("hidden");
        }
    }
}

var targetSpans = document.getElementsByClassName("target");

for (var i = 0; i < targetSpans.length; i++)
{
    targetSpans[i].addEventListener('mouseover', targetHover, false);
    targetSpans[i].addEventListener('mouseout', targetUnHover, false);
}

function targetHover(event)
{
    console.log(event);
    document.getElementById("targetsPane").classList.remove("hidden");
    document.getElementById("targetsPane").style.top = (event.clientY + 15) + "px"; 
}

function targetUnHover(event)
{
    console.log(event);
    document.getElementById("targetsPane").classList.add("hidden");
}