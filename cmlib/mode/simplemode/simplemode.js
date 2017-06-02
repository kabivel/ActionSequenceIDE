CodeMirror.defineSimpleMode("simplemode", {

    start: 
    [
        //start tags
        {
            regex: /\s*<(?:SETUP ACTION|WHOLE ACTION|TARGET ACTION|FOLLOW ACTION|FINISH ACTION)>\s*$/i,
            token: "tag",
            next: "inTag",
            sol: true,
            indent: true,
        },

        {
            regex: /.*/,
            token: "comment",
        },
    ],

    inTag: 
    [
        //end tags
        {
            regex: /\s*<\/(?:SETUP ACTION|WHOLE ACTION|TARGET ACTION|FOLLOW ACTION|FINISH ACTION)>\s*$/i,
            token: "tag",
            next: "start",
            sol: true,
            dedent: true,
        },

        //start blocks
        {
            regex: /(\s*)(IF|WHILE)(\s+)(.+)$/i,
            token: [null, "keyword", null, "variable-2"],
            sol: true,
            indent: true,
        },
        //else if
        {
            regex: /(\s*)(ELSE IF)(\s+)(.+)$/i,
            token: [null, "keyword", null, "variable-2"],
            sol: true,
        },
        //Control statements
        {
            regex: /\s*ELSE\s*$/i,
            token: "keyword",
            sol: true,
        },
        //End Blocks
        {
            regex: /\s*(?:END|END WHILE)\s*$/i,
            token: "keyword",
            sol: true,
            dedent: true,
        },

        //Simple Commands
        {
            regex: /\s*(?:ACTION ANIMATION|ACTION COMMON EVENT|CAST ANIMATION|CLEAR BATTLE LOG|DEATH BREAK|DISPLAY ACTION|PERFORM ACTION|PERFORM FINISH|PERFORM START|WAIT FOR ANIMATION|WAIT FOR EFFECT|WAIT FOR MOVEMENT|WAIT FOR NEW LINE|REFRESH STATUS|WAIT FOR FLOAT|WAIT FOR JUMP|WAIT FOR OPACITY|CAMERA CLAMP ON|CAMERA CLAMP OFF|WAIT FOR CAMERA|WAIT FOR ZOOM|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ACTION EFFECT|BGM: STOP|BGM: MEMORIZE|BGM: MEMORY|BGS: STOP|BGS: MEMORIZE|BGS: MEMORY|ME: STOP|SE: PLAY OK|SE: PLAY CURSOR|SE: PLAY CANCEL|SE: PLAY BUZZER|SE: PLAY EQUIP|SE: PLAY SAVE|SE: PLAY LOAD|SE: PLAY BATTLE START|SE: PLAY ESCAPE|SE: PLAY ENEMY ATTACK|SE: PLAY ENEMY DAMAGE|SE: PLAY ENEMY COLLAPSE|SE: PLAY BOSS COLLAPSE 1|SE: PLAY BOSS COLLAPSE 2|SE: PLAY ACTOR DAMAGE|SE: PLAY ACTOR COLLAPSE|SE: PLAY RECOVERY|SE: PLAY MISS|SE: PLAY EVASION|SE: PLAY MAGIC EVASION|SE: PLAY REFLECTION|SE: PLAY SHOP|SE: PLAY USE ITEM|SE: PLAY USE SKILL|SHOW BATTLE HUD|HIDE BATTLE HUD|)\s*$/i,
            token: "string",
            sol: true,
        },

        //command: target
        {
            regex: /(\s*)(ACTION ANIMATION|PERFORM ACTION|ACTION EFFECT|ATTACK ANIMATION)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(\s*)$/i,
            token: [null, "string", "opperator", "atom", null],
            sol: true,
        },

        //command: frames
        {
            regex: /(\s*)(WAIT|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ANIMATION WAIT)(:\s+)(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "number", null],
            sol: true,
        },

        //command: target, bool
        {
            regex: /(\s*)(IMMORTAL)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(,\s+)(true|false)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword",  null],
            sol: true,
        },
        // add buff
        {
            regex:  /(\s*)(ADD)(\s+)(hp|mp|atk|def|mat|mdf|agi|luk)(\s+)(BUFF|DEBUFF)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(\d+)|)(?:(,\s+)(show)|)(\s*)$/i,
            token: [null, "string", null, "variable", null, "string", "opperator", "atom", "opperator", "number", "opperator", "keyword", null],
            sol: true,
        },
        //remove buff
        {
            regex:  /(\s*)(REMOVE)(\s+)(hp|mp|atk|def|mat|mdf|agi|luk)(\s+)(BUFF|DEBUFF)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(show)|)(\s*)$/i,
            token: [null, "string", null, "variable", null, "string", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
        },
        //add/remove state
        {
            regex: /(\s*)(ADD STATE|REMOVE STATE)(\s+\d+(?:(?:,\s+\d+)*|))(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(show)|)(\s*)$/i,
            token: [null, "string", "number", "opperator" , "atom", "opperator", "keyword", null],
            sol: true,
        },
        //animation X: user, (mirror)
        {
            regex: /(\s*)(ANIMATION)(\s+\d+)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(mirror)|)(\s*)$/i,
            token: [null, "string", "number", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
        },
        //sound
        {
            regex: /(\s*)(BGM|BGS|ME|SE)(:\s+)(\w+)(?:(?:(,\s+)(\d+)(,\s+)(\d+)(,\s+)(\d+))|)(\s*)$/i,
            token: [null, "string", "opperator", "variable-2", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        //change switch
        {
            regex: /(\s*)(CHANGE SWITCH)(\s+)(\d+|\d+\.\.\d+|\d+ TO \d+)(:\s+)(on|off|toggle|switch \d+)(\s*)$/i,
            token: [null, "string", null, "number", "opperator", "keyword", null],
            sol: true,
        },
        //change variable
        {
            regex: /(\s*)(CHANGE VARIABLE)(\s+\d+)(\s+)(=|\+=|-=|\*=|\/=|%=)(\s+\d+)(\s*)$/i,
            token: [null, "string", "number", null, "opperator", "number", null],
            sol: true,
        },
        //collapse
        {
            regex: /(\s*)(COLLAPSE)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(force)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
        },
        //common event
        {
            regex: /(\s*)(COMMON EVENT)(:\s+)(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "number", null],
            sol: true,
        },
        //eval
        {
            regex: /(\s*)(EVAL)(:\s+)(.+)(\s*)$/i,
            token: [null, "string", "opperator", "variable-2", null],
            sol: true,
        },
        //+- equipment
        {
            regex: /(\s*)(GAIN|LOSE)(\s+)(ITEM|WEAPON|ARMOR)(\s+\d+)(?:(:\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", null, "string", "number", "opperator", "number", null],
            sol: true,
        },
        //gold +-
        {
            regex: /(\s*)(GOLD)(\s+)(\+|\-)(\d+)(\s*)$/i,
            token: [null, "string", null, "opperator", "number", null],
            sol: true,
        },
        //hpmptp +-
        {
            regex: /(\s*)(HP|MP|TP)(\s+)(\+|\-)(VARIABLE\s+|)(\d+)(\%|)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(show)|)(\s*)$/i,
            token: [null, "variable", null, "opperator", "string", "number", null, "opperator", "atom", "opperator", "keyword", null],
            sol: true,
        },
        //enemy effect
        {
            regex: /(\s*)(ENEMY EFFECT)(:\s+)(user|target|targets|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|(?:(?:character|enemy|friend|opponent)\s+\d+))(,\s+)(whiten|blink)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword"],
            sol: true,
        },
        //flash screen color
        {
            regex: /(\s*)(FLASH SCREEN)(:\s+)(WHITE|RED|ORANGE|YELLOW|GREEN|BLUE|PURPLE|MAGENTA|BLACK)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", null],
            sol: true,
        },
        //tint screen color
        {
            regex: /(\s*)(TINT SCREEN)(:\s+)(NORMAL|DARK|SEPIA|SUNSET|NIGHT)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", null],
            sol: true,
        },
        //flash screen rgb
        {
            regex: /(\s*)(FLASH SCREEN)(:\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        //tint screen rgb
        {
            regex: /(\s*)(TINT SCREEN)(:\s+\-|:\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,\s+\-|,\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,\s+\-|,\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,\s+)(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        //action target: #/#% (frames)
        {
            regex: /(\s*)(FLOAT|JUMP|OPACITY)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(\d+)(\%|)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "number", "opperator", "opperator", "number", null],
            sol: true,
        },
        //sv motion
        {
            regex: /(\s*)(MOTION)(\s+)(WAIT|WALK|STANDBY|CHANT|GUARD|DAMAGE|EVADE|ATTACK|THRUST|SWING|MISSILE|SKILL|SPELL|ITEM|ESCAPE|VICTORY|DYING|ABNORMAL|SLEEP|DEAD)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(no weapon)|)(\s*)$/i,
            token: [null, "string", null, "variable", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
        },
        //shake screen
        {
            regex: /(\s*)(SHAKE SCREEN)(?:(: )(\d+)(?:(, )(\d+)|)(?:(, )(\d+)|)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(FACE)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(?:(FORWARD|BACKWARD|HOME|AWAY FROM HOME)|((?:user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))))(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "atom", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(FACE)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(AWAY FROM)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "string", null, "atom", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(FACE)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(POINT|AWAY FROM POINT)(,\s+)(\d+)(,\s+)(\d+)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(MOVE)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(HOME|RETURN)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(MOVE)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(FORWARD|BACKWARD)(?:(,\s+)(\d+)|)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(MOVE)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(,\s+)(BASE|CENTER|HEAD|FRONT BASE|FRONT CENTER|FRONT HEAD|BACK BASE|BACK CENTER|BACK HEAD)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "variable", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex:  /(\s*)(MOVE)(\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(:\s+)(POINT)(,\s+)(\d+)(,\s+)(\d+)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "string", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(CAMERA FOCUS|CAMERA SCREEN)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))(?:(,\s+)(FRONT BASE|BASE|BACK BASE|FRONT CENTER|CENTER|BACK CENTER|FRONT HEAD|HEAD|BACK HEAD)|)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "variable", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(CAMERA OFFSET)(:\s+)(LEFT|RIGHT|UP|DOWN)(,\s+)(.+)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "variable-2", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(CAMERA PAN)(:\s+)(LEFT|RIGHT|UP|DOWN)(,\s+)(\d+)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(CAMERA SCREEN)(:\s+)(TOP LEFT|FAR LEFT|BOTTOM LEFT|TOP CENTER|CENTER|BOTTOM CENTER|TOP RIGHT|FAR RIGHT|BOTTOM RIGHT)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(CAMERA SCREEN)(:\s+)(POINT)(,\s+)(\d+)(,\s+)(\d+)(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "string", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(ZOOM)(:\s+)(?:(\d+)(\%)|(\d+)(\.)(\d+))(?:(,\s+)(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
        },
        
        {
            regex: /(\s*)(proxy)(\s+)(\d+)(\s+)(from)(\s+)(\d+)(\s*)$/i,
            token: [null, "string", null, "number", null, "string", null, "number", null],
            sol: true,
        },
        
        {
            regex: /.*/i,
            token: "error",
        },
    ],

    meta: 
    {

    }
});