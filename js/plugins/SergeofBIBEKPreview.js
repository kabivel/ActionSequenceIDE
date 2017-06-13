
var SergeofBIBEK_Preview_BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs)
{
    try{

    if (actionName.match(/GET[ ]PREVIEW/i))
    {
        return this.SergeofBIBEKPreview();
    }
    }
    catch(e)
        {
            return true;
        }

    return SergeofBIBEK_Preview_BattleManager_processActionSequence.call(this, actionName, actionArgs);
};


BattleManager.SergeofBIBEKPreview = function()
{
    DataManager.setDefaultActions($dataSkills[11]);

    var setupActions = null;
    var wholeActions = null;
    var targetActions = null;
    var followActions = null;
    var finishActions = null;

    var setupStarter = /<(?:SETUP ACTION|setup)>/i;
    var setupEnder = /<\/(?:SETUP ACTION|setup)>/i;
    var wholeStarter = /<(?:WHOLE ACTION|whole)>/i;
    var wholeEnder = /<\/(?:WHOLE ACTION|whole)>/i;
    var targetStarter = /<(?:TARGET ACTION|target)>/i;
    var targetEnder = /<\/(?:TARGET ACTION|target)>/i;
    var followStarter = /<(?:FOLLOW ACTION|follow)>/i;
    var followEnder = /<\/(?:FOLLOW ACTION|follow)>/i;
    var finishStarter = /<(?:FINISH ACTION|finish)>/i;
    var finishEnder = /<\/(?:FINISH ACTION|finish)>/i;

    var inSetup = false;
    var inWhole = false;
    var inTarget = false;
    var inFollow = false;
    var inFinish = false;

    var SequenceData = window.parent.editor.getValue().split(/[\r\n]+/);

    for (var i = 0; i < SequenceData.length; i++)
    {
        if (SequenceData[i].match(setupStarter))
        {
            inSetup = true;
            setupActions = [];
            continue;
        }
        if (SequenceData[i].match(wholeStarter))
        {
            inWhole = true;
            wholeActions = [];
            continue;
        }
        if (SequenceData[i].match(targetStarter))
        {
            inTarget = true;
            targetActions = [];
            continue;
        }
        if (SequenceData[i].match(followStarter))
        {
            inFollow = true;
            followActions = [];
            continue;
        }
        if (SequenceData[i].match(finishStarter))
        {
            inFinish = true;
            finishActions = [];
            continue;
        }
        if (inSetup)
        {
            if (SequenceData[i].match(setupEnder))
            {
                inSetup = false;
                continue;
            }
            else
            {
                setupActions.push(this.SergeofBIBEKConvertSequenceLine(SequenceData[i]));
                continue;
            }
        }
        if (inWhole)
        {
            if (SequenceData[i].match(wholeEnder))
            {
                inWhole = false;
                continue;
            }
            else
            {
                wholeActions.push(this.SergeofBIBEKConvertSequenceLine(SequenceData[i]));
                continue;
            }
        }
        if (inTarget)
        {
            if (SequenceData[i].match(targetEnder))
            {
                inTarget = false;
                continue;
            }
            else
            {
                targetActions.push(this.SergeofBIBEKConvertSequenceLine(SequenceData[i]));
                continue;
            }
        }
        if (inFollow)
        {
            if (SequenceData[i].match(followEnder))
            {
                inFollow = false;
                continue;
            }
            else
            {
                followActions.push(this.SergeofBIBEKConvertSequenceLine(SequenceData[i]));
                continue;
            }
        }
        if (inFinish)
        {
            if (SequenceData[i].match(finishEnder))
            {
                inFinish = false;
                continue;
            }
            else
            {
                finishActions.push(this.SergeofBIBEKConvertSequenceLine(SequenceData[i]));
                continue;
            }
        }
    }

    if (setupActions != null)
    {
        $dataSkills[11].setupActions = setupActions;
    }
    if (wholeActions != null)
    {
        $dataSkills[11].wholeActions = wholeActions;
    }
    if (targetActions != null)
    {
        $dataSkills[11].targetActions = targetActions;
    }
    if (followActions != null)
    {
        $dataSkills[11].followActions = followActions;
    }
    if (finishActions != null)
    {
        $dataSkills[11].finishActions = finishActions;
    }

    return true;
}

function Scene_Pause() {
    this.initialize.apply(this, arguments);
}

Scene_Pause.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Pause.prototype.constructor = Scene_Pause;

Scene_Pause.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Pause.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    AudioManager.stopAll();
};

Scene_Pause.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
};
