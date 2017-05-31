var tags = [
    /<SETUP ACTION>/i,
    /<\/SETUP ACTION>/i,
    /<WHOLE ACTION>/i,
    /<\/WHOLE ACTION>/i,
    /<TARGET ACTION>/i,
    /<\/TARGET ACTION>/i,
    /<FOLLOW ACTION>/i,
    /<\/FOLLOW ACTION>/i,
    /<FINISH ACTION>/i,
    /<\/FINISH ACTION>/i
];

var controlStatements = [
    /^\s*IF .+/i,
    /^\s*ELSE\s*$/i,
    /^\s*ELSE IF .+/i,
    /^\s*END\s*$/i,
    /^\s*WHILE .+/i,
    /^\s*END WHILE\s*$/i
];

var targets = [
    "user",
    "target",
    "targets",
    "actors",
    "existing actors",
    "all actors",
    "dead actors",
    "actors not user",
    "actor x",
    "character x",
    "enemies",
    "existing enemies",
    "all enemies",
    "dead enemies",
    "enemies not user",
    "enemy x",
    "friends",
    "all friends",
    "dead friends",
    "friends not user",
    "friend x",
    "opponents",
    "all opponents",
    "dead opponents",
    "opponent x",
    "all alive",
    "all members",
    "all dead",
    "all not user",
    "focus",
    "not focus"
];

var actions = [
    "ACTION ANIMATION",
    "ACTION COMMON EVENT",
    "ACTION EFFECT: target",
    "ANIMATION WAIT: X",
    "CAST ANIMATION",
    "CLEAR BATTLE LOG",
    "DEATH BREAK",
    "DISPLAY ACTION",
    "IMMORTAL: targets, true/false",
    "MOTION WAIT: target",
    "PERFORM ACTION",
    "PERFORM FINISH",
    "PERFORM START",
    "WAIT: frames",
    "WAIT FOR ANIMATION",
    "WAIT FOR EFFECT",
    "WAIT FOR MOVEMENT",
    "WAIT FOR NEW LINE",
    "ADD stat BUFF: target, (turns), (show)", 
    "ADD stat DEBUFF: target, (turns), (show)",
    "ADD STATE X: target, (show)",
    "ADD STATE X, Y, Z: target (show)",
    "ANIMATION X: target, (mirror)",
    "BGM: STOP",
    "BGM: MEMORIZE",
    "BGM: MEMORY",
    "BGM: filename, (volume), (pitch), (pan)",
    "BGS: STOP",
    "BGS: MEMORIZE",
    "BGS: MEMORY",
    "BGS: filename, (volume), (pitch), (pan)",
    "CHANGE SWITCH X: on/off/toggle/switch z",
    "CHANGE SWITCH X..Y: on/off/toggle/switch z",
    "CHANGE SWITCH X TO Y: on/off/toggle/switch z",
    "CHANGE VARIABLE X = Y",
    "CHANGE VARIABLE X += Y",
    "CHANGE VARIABLE X -= Y",
    "CHANGE VARIABLE X *= Y",
    "CHANGE VARIABLE X /= Y",
    "CHANGE VARIABLE X %= Y",
    "COLLAPSE: target, (force)",
    "COMMON EVENT: X",
    "EVAL: code",
    "GAIN ITEM X: Y",
    "LOSE ITEM X: Y",
    "GAIN WEAPON X: Y",
    "LOSE WEAPON X: Y",
    "GAIN ARMOR X: Y",
    "LOSE ARMOR X: Y",
    "GOLD +x",
    "GOLD -x",
    "HP +X: target, (show)",
    "HP -X: target, (show)",
    "HP +X%: target, (show)",
    "HP -X%: target, (show)",
    "HP +VARIABLE X: target, (show)",
    "HP -VARIABLE X: target, (show)",
    "HP +VARIABLE X%: target, (show)",
    "HP -VARIABLE X%: target, (show)",
    "ME: STOP",
    "ME: filename, (volume), (pitch), (pan)",
    "MP +X: target, (show)",
    "MP -X: target, (show)",
    "MP +X%: target, (show)",
    "MP -X%: target, (show)",
    "MP +VARIABLE X: target, (show)",
    "MP -VARIABLE X: target, (show)",
    "MP +VARIABLE X%: target, (show)",
    "MP -VARIABLE X%: target, (show)",
    "REFRESH STATUS",
    "REMOVE stat BUFF: target, (show)",
    "REMOVE stat DEBUFF: target, (show)",
    "REMOVE STATE X: target (show)",
    "REMOVE STATE X, Y, Z: target (show)",
    "SE: filename, (volume), (pitch), (pan)",
    "SE: PLAY OK",
    "SE: PLAY CURSOR",
    "SE: PLAY CANCEL",
    "SE: PLAY BUZZER",
    "SE: PLAY EQUIP",
    "SE: PLAY SAVE",
    "SE: PLAY LOAD",
    "SE: PLAY BATTLE START",
    "SE: PLAY ESCAPE",
    "SE: PLAY ENEMY ATTACK",
    "SE: PLAY ENEMY DAMAGE",
    "SE: PLAY ENEMY COLLAPSE",
    "SE: PLAY BOSS COLLAPSE 1",
    "SE: PLAY BOSS COLLAPSE 2",
    "SE: PLAY ACTOR DAMAGE",
    "SE: PLAY ACTOR COLLAPSE",
    "SE: PLAY RECOVERY",
    "SE: PLAY MISS",
    "SE: PLAY EVASION",
    "SE: PLAY MAGIC EVASION",
    "SE: PLAY REFLECTION",
    "SE: PLAY SHOP",
    "SE: PLAY USE ITEM",
    "SE: PLAY USE SKILL",
    "TP +X: target, (show)",
    "TP -X: target, (show)",
    "TP +X%: target, (show)",
    "TP -X%: target, (show)",
    "TP +VARIABLE X: target, (show)",
    "TP -VARIABLE X: target, (show)",
    "TP +VARIABLE X%: target, (show)",
    "TP -VARIABLE X%: target, (show)",
    "ATTACK ANIMATION: target",
    "ENEMY EFFECT: target, effect-type",
    "FACE target: args",
    "FADE OUT: (frames)",
    "FADE IN: (frames)",
    "FLASH SCREEN: args",
    "FLOAT target: (height), (frames)",
    "FLOAT target: (height%), (frames)",
    "HIDE BATTLE HUD",
    "JUMP target: (height), (frames)",
    "JUMP target: (height%), (frames)",
    "MOTION type: target, (no weapon)",
    "MOVE target: args",
    "OPACITY target: x, (frames)",
    "OPACITY target: x%, (frames)",
    "SHOW BATTLE HUD",
    "SHAKE SCREEN: (power), (speed), (frames)",
    "TINT SCREEN: args",
    "WAIT FOR FLOAT",
    "WAIT FOR JUMP",
    "WAIT FOR OPACITY",
    "CAMERA CLAMP ON",
    "CAMERA CLAMP OFF",
    "CAMERA FOCUS: target, (location), (frames)",
    "CAMERA OFFSET: DIRECTION, DISTANCE",
    "CAMERA PAN",
    "CAMERA SCREEN",
    "RESET CAMERA: (frames)",
    "RESET ZOOM: (frames)",
    "WAIT FOR CAMERA",
    "WAIT FOR ZOOM",
    "ZOOM: x%, (frames)",
    "ZOOM: x.y, (frames)",
];

CodeMirror.defineMode('YEP', function (config, parserConfig) {
    return {
        /**
         * @param {CodeMirror.StringStream} stream
         */
        token: function (stream) {


            for (var i = 0; i < tags.length; i++)
            {
                if (stream.match(tags[i]))
                {
                    return 'header';
                }
            }

            for (var i = 0; i < controlStatements.length; i++)
            {
                if (stream.match(controlStatements[i]))
                {
                    return 'comment';
                }
            }

            while (stream.next()) {}

            return 'error';
        }
    };
});