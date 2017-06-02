CodeMirror.defineSimpleMode("simplemode", {

    start: 
    [
        //start tags
        {
            regex: /\s*<SETUP ACTION>\s*$/i,
            token: "tag",
            push: "setup",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<WHOLE ACTION>\s*$/i,
            token: "tag",
            push: "whole",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<TARGET ACTION>\s*$/i,
            token: "tag",
            push: "target",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<FOLLOW ACTION>\s*$/i,
            token: "tag",
            push: "follow",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<FINISH ACTION>\s*$/i,
            token: "tag",
            push: "finish",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<ACTION SEQUENCE PROXY: \d+>\s*$/i,
            token: "tag",
            push: "proxy",
            sol: true,
            indent: true,
        },

        {
            regex: /.*/,
            token: "comment",
        },
    ],
    
    proxy:
    [
        {
            regex: /\s*<\/ACTION SEQUENCE PROXY>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    setup:
    [
        {
            regex: /\s*<\/SETUP ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    whole:
    [
        {
            regex: /\s*<\/WHOLE ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    target:
    [
        {
            regex: /\s*<\/TARGET ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    follow:
    [
        {
            regex: /\s*<\/FOLLOW ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    finish:
    [
        {
            regex: /\s*<\/FINISH ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],

    inTag: 
    [
        
        //start blocks
        {
            regex: /(\s*)(IF|WHILE)([ ])(.+)$/i,
            token: [null, "keyword", null, "variable-2"],
            sol: true,
            indent: true,
            pop: true,
        },
        //else if
        {
            regex: /(\s*)(ELSE IF)([ ])(.+)$/i,
            token: [null, "keyword", null, "variable-2"],
            sol: true,
            pop: true,
        },
        //Control statements
        {
            regex: /\s*ELSE\s*$/i,
            token: "keyword",
            sol: true,
            pop: true,
        },
        //End Blocks
        {
            regex: /\s*(?:END|END WHILE)\s*$/i,
            token: "keyword",
            sol: true,
            dedent: true,
            pop: true,
        },

        //Simple Commands
        {
            regex: /\s*(?:ACTION ANIMATION|ACTION COMMON EVENT|CAST ANIMATION|CLEAR BATTLE LOG|DEATH BREAK|DISPLAY ACTION|PERFORM ACTION|PERFORM FINISH|PERFORM START|WAIT FOR ANIMATION|WAIT FOR EFFECT|WAIT FOR MOVEMENT|WAIT FOR NEW LINE|REFRESH STATUS|WAIT FOR FLOAT|WAIT FOR JUMP|WAIT FOR OPACITY|CAMERA CLAMP ON|CAMERA CLAMP OFF|WAIT FOR CAMERA|WAIT FOR ZOOM|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ACTION EFFECT|BGM: STOP|BGM: MEMORIZE|BGM: MEMORY|BGS: STOP|BGS: MEMORIZE|BGS: MEMORY|ME: STOP|SE: PLAY OK|SE: PLAY CURSOR|SE: PLAY CANCEL|SE: PLAY BUZZER|SE: PLAY EQUIP|SE: PLAY SAVE|SE: PLAY LOAD|SE: PLAY BATTLE START|SE: PLAY ESCAPE|SE: PLAY ENEMY ATTACK|SE: PLAY ENEMY DAMAGE|SE: PLAY ENEMY COLLAPSE|SE: PLAY BOSS COLLAPSE 1|SE: PLAY BOSS COLLAPSE 2|SE: PLAY ACTOR DAMAGE|SE: PLAY ACTOR COLLAPSE|SE: PLAY RECOVERY|SE: PLAY MISS|SE: PLAY EVASION|SE: PLAY MAGIC EVASION|SE: PLAY REFLECTION|SE: PLAY SHOP|SE: PLAY USE ITEM|SE: PLAY USE SKILL|SHOW BATTLE HUD|HIDE BATTLE HUD|)\s*$/i,
            token: "string",
            sol: true,
            pop: true,
        },

        //command: target
        {
            regex: /(\s*)(ACTION EFFECT|MOTION WAIT|ATTACK ANIMATION)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(\s*)$/i,
            token: [null, "string", "opperator", "atom", null],
            sol: true,
            pop: true,
        },

        //command: frames
        {
            regex: /(\s*)(WAIT|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ANIMATION WAIT)(:[ ])(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "number", null],
            sol: true,
            pop: true,
        },

        //command: target, bool
        {
            regex: /(\s*)(IMMORTAL)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(,[ ])(true|false)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword",  null],
            sol: true,
            pop: true,
        },
        // add buff
        {
            regex:  /(\s*)(ADD)([ ])(hp|mp|atk|def|mat|mdf|agi|luk)([ ])(BUFF|DEBUFF)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(\d+)|)(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "string", null, "atom", null, "string", "opperator", "atom", "opperator", "number", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //remove buff
        {
            regex:  /(\s*)(REMOVE)([ ])(hp|mp|atk|def|mat|mdf|agi|luk)([ ])(BUFF|DEBUFF)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "string", null, "atom", null, "string", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //add/remove state
        {
            regex: /(\s*)(ADD STATE|REMOVE STATE)([ ]\d+(?:(?:,[ ]\d+)*|))(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "string", "number", "opperator" , "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //animation X: user, (mirror)
        {
            regex: /(\s*)(ANIMATION)([ ]\d+)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(mirror)|)(\s*)$/i,
            token: [null, "string", "number", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //sound
        {
            regex: /(\s*)(BGM|BGS|ME|SE)(:[ ])(\w+)(?:(?:(,[ ])(\d+)(,[ ])(\d+)(,[ ])(\d+))|)(\s*)$/i,
            token: [null, "string", "opperator", "variable-2", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //change switch
        {
            regex: /(\s*)(CHANGE SWITCH)([ ])(\d+|\d+\.\.\d+|\d+ TO \d+)(:[ ])(on|off|toggle|switch \d+)(\s*)$/i,
            token: [null, "string", null, "number", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //change variable
        {
            regex: /(\s*)(CHANGE VARIABLE)([ ]\d+)([ ])(=|\+=|-=|\*=|\/=|%=)([ ]\d+)(\s*)$/i,
            token: [null, "string", "number", null, "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //collapse
        {
            regex: /(\s*)(COLLAPSE)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(force)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //common event
        {
            regex: /(\s*)(COMMON EVENT)(:[ ])(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //eval
        {
            regex: /(\s*)(EVAL)(:[ ])(.+)(\s*)$/i,
            token: [null, "string", "opperator", "variable-2", null],
            sol: true,
            pop: true,
        },
        //+- equipment
        {
            regex: /(\s*)(GAIN|LOSE)([ ])(ITEM|WEAPON|ARMOR)([ ]\d+)(?:(:[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "string", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //gold +-
        {
            regex: /(\s*)(GOLD)([ ])(\+|\-)(\d+)(\s*)$/i,
            token: [null, "string", null, "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //hpmptp +-
        {
            regex: /(\s*)(HP|MP|TP)([ ])(\+|\-)(VARIABLE[ ]|)(\d+)(\%|)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "atom", null, "opperator", "string", "number", null, "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //enemy effect
        {
            regex: /(\s*)(ENEMY EFFECT)(:[ ])(user|target|targets|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|(?:(?:character|enemy|friend|opponent)[ ]\d+))(,[ ])(whiten|blink)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword"],
            sol: true,
            pop: true,
        },
        //flash screen color
        {
            regex: /(\s*)(FLASH SCREEN)(:[ ])(WHITE|RED|ORANGE|YELLOW|GREEN|BLUE|PURPLE|MAGENTA|BLACK)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //tint screen color
        {
            regex: /(\s*)(TINT SCREEN)(:[ ])(NORMAL|DARK|SEPIA|SUNSET|NIGHT)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //flash screen rgb
        {
            regex: /(\s*)(FLASH SCREEN)(:[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //tint screen rgb
        {
            regex: /(\s*)(TINT SCREEN)(:[ ]\-|:[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ]\-|,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ]\-|,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //action target: #/#% (frames)
        {
            regex: /(\s*)(FLOAT|JUMP|OPACITY)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(\d+)(\%|)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "number", "opperator", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //sv motion
        {
            regex: /(\s*)(MOTION)([ ])(WALK|STANDBY|CHANT|GUARD|DAMAGE|EVADE|ATTACK|THRUST|SWING|MISSILE|SKILL|SPELL|ITEM|ESCAPE|VICTORY|DYING|ABNORMAL|SLEEP|DEAD)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(no weapon)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //shake screen
        {
            regex: /(\s*)(SHAKE SCREEN)(?:(: )(\d+)(?:(, )(\d+)|)(?:(, )(\d+)|)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(FACE)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(FORWARD|BACKWARD|HOME|AWAY FROM HOME|(?:user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+)))(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(FACE)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(AWAY FROM)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", null, "atom", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(FACE)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(POINT|AWAY FROM POINT)(,[ ])(\d+)(,[ ])(\d+)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(MOVE)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(HOME|RETURN)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(MOVE)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(FORWARD|BACKWARD)(?:(,[ ])(\d+)|)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(MOVE)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(,[ ])(BASE|CENTER|HEAD|FRONT BASE|FRONT CENTER|FRONT HEAD|BACK BASE|BACK CENTER|BACK HEAD)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "atom", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex:  /(\s*)(MOVE)([ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(:[ ])(POINT)(,[ ])(\d+)(,[ ])(\d+)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA FOCUS|CAMERA SCREEN)(:[ ])(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)[ ]\d+))(?:(,[ ])(FRONT BASE|BASE|BACK BASE|FRONT CENTER|CENTER|BACK CENTER|FRONT HEAD|HEAD|BACK HEAD)|)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "atom", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA OFFSET)(:[ ])(LEFT|RIGHT|UP|DOWN)(,[ ])(.+)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "variable-2", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA PAN)(:[ ])(LEFT|RIGHT|UP|DOWN)(,[ ])(\d+)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA SCREEN)(:[ ])(TOP LEFT|FAR LEFT|BOTTOM LEFT|TOP CENTER|CENTER|BOTTOM CENTER|TOP RIGHT|FAR RIGHT|BOTTOM RIGHT)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA SCREEN)(:[ ])(POINT)(,[ ])(\d+)(,[ ])(\d+)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(ZOOM)(:[ ])(?:(\d+)(\%)|(\d+)(\.)(\d+))(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(proxy)([ ])(\d+)([ ])(from)([ ])(\d+)(\s*)$/i,
            token: [null, "string", null, "number", null, "string", null, "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /.*/i,
            token: "error",
            pop: true,
        },
    ],

    meta: 
    {

    }
});