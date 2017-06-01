var tags = [
    /<SETUP ACTION>|<\/SETUP ACTION>|<WHOLE ACTION>|<\/WHOLE ACTION>|<TARGET ACTION>|<\/TARGET ACTION>|<FOLLOW ACTION>|<\/FOLLOW ACTION>|<FINISH ACTION>|<\/FINISH ACTION>/i
];

var controlStatements = [
    /^\s*IF .+/i,
    /^\s*ELSE\s*$/i,
    /^\s*ELSE IF .+/i,
    /^\s*END\s*$/i,
    /^\s*WHILE .+/i,
    /^\s*END WHILE\s*$/i
];

var targets = /|user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus/i;

/(.*)(actor|character|enemy|friend|opponent)(\s+)(\d+)(.*)/i

var actions = [

    /^(\s*)IMMORTAL: targets, true|false(\s*)$/i,
    /^(\s*)ADD stat BUFF: target, (turns), (show)"(\s*)$/i,
    /^(\s*)ADD stat DEBUFF: target, (turns), (show)(\s*)$/i,
    /^(\s*)ADD STATE X: target, (show)(\s*)$/i,
    /^(\s*)ADD STATE X, Y, Z: target (show)(\s*)$/i,
    /^(\s*)ANIMATION X: target, (mirror)(\s*)$/i,
    /^(\s*)BGM: STOP(\s*)$/i,
    /^(\s*)BGM: MEMORIZE(\s*)$/i,
    /^(\s*)BGM: MEMORY(\s*)$/i,
    /^(\s*)BGM: filename, (volume), (pitch), (pan)(\s*)$/i,
    /^(\s*)BGS: STOP(\s*)$/i,
    /^(\s*)BGS: MEMORIZE(\s*)$/i,
    /^(\s*)BGS: MEMORY(\s*)$/i,
    /^(\s*)BGS: filename, (volume), (pitch), (pan)(\s*)$/i,
    /^(\s*)CHANGE SWITCH X: on|off|toggle|switch z(\s*)$/i,
    /^(\s*)CHANGE SWITCH X..Y: on|off|toggle|switch z(\s*)$/i,
    /^(\s*)CHANGE SWITCH X TO Y: on|off|toggle|switch z(\s*)$/i,
    /^(\s*)CHANGE VARIABLE X = Y(\s*)$/i,
    /^(\s*)CHANGE VARIABLE X += Y(\s*)$/i,
    /^(\s*)CHANGE VARIABLE X -= Y(\s*)$/i,
    /^(\s*)CHANGE VARIABLE X *= Y(\s*)$/i,
    /^(\s*)CHANGE VARIABLE X \/= Y(\s*)$/i,
    /^(\s*)CHANGE VARIABLE X %= Y(\s*)$/i,
    /^(\s*)COLLAPSE: target, (force)(\s*)$/i,
    /^(\s*)COMMON EVENT: X(\s*)$/i,
    /^(\s*)EVAL: code(\s*)$/i,
    /^(\s*)GAIN ITEM X: Y(\s*)$/i,
    /^(\s*)LOSE ITEM X: Y(\s*)$/i,
    /^(\s*)GAIN WEAPON X: Y(\s*)$/i,
    /^(\s*)LOSE WEAPON X: Y(\s*)$/i,
    /^(\s*)GAIN ARMOR X: Y(\s*)$/i,
    /^(\s*)LOSE ARMOR X: Y(\s*)$/i,
    /^(\s*)GOLD +x(\s*)$/i,
    /^(\s*)GOLD -x(\s*)$/i,
    /^(\s*)HP +X: target, (show)(\s*)$/i,
    /^(\s*)HP -X: target, (show)(\s*)$/i,
    /^(\s*)HP +X%: target, (show)(\s*)$/i,
    /^(\s*)HP -X%: target, (show)(\s*)$/i,
    /^(\s*)HP +VARIABLE X: target, (show)(\s*)$/i,
    /^(\s*)HP -VARIABLE X: target, (show)(\s*)$/i,
    /^(\s*)HP +VARIABLE X%: target, (show)(\s*)$/i,
    /^(\s*)HP -VARIABLE X%: target, (show)(\s*)$/i,
    /^(\s*)ME: STOP(\s*)$/i,
    /^(\s*)ME: filename, (volume), (pitch), (pan)(\s*)$/i,
    /^(\s*)MP +X: target, (show)(\s*)$/i,
    /^(\s*)MP -X: target, (show)(\s*)$/i,
    /^(\s*)MP +X%: target, (show)(\s*)$/i,
    /^(\s*)MP -X%: target, (show)(\s*)$/i,
    /^(\s*)MP +VARIABLE X: target, (show)(\s*)$/i,
    /^(\s*)MP -VARIABLE X: target, (show)(\s*)$/i,
    /^(\s*)MP +VARIABLE X%: target, (show)(\s*)$/i,
    /^(\s*)MP -VARIABLE X%: target, (show)(\s*)$/i,
    /^(\s*)REMOVE stat BUFF: target, (show)(\s*)$/i,
    /^(\s*)REMOVE stat DEBUFF: target, (show)(\s*)$/i,
    /^(\s*)REMOVE STATE X: target (show)(\s*)$/i,
    /^(\s*)REMOVE STATE X, Y, Z: target (show)(\s*)$/i,
    /^(\s*)SE: filename, (volume), (pitch), (pan)(\s*)$/i,
    /^(\s*)SE: PLAY OK(\s*)$/i,
    /^(\s*)SE: PLAY CURSOR(\s*)$/i,
    /^(\s*)SE: PLAY CANCEL(\s*)$/i,
    /^(\s*)SE: PLAY BUZZER(\s*)$/i,
    /^(\s*)SE: PLAY EQUIP(\s*)$/i,
    /^(\s*)SE: PLAY SAVE(\s*)$/i,
    /^(\s*)SE: PLAY LOAD(\s*)$/i,
    /^(\s*)SE: PLAY BATTLE START(\s*)$/i,
    /^(\s*)SE: PLAY ESCAPE(\s*)$/i,
    /^(\s*)SE: PLAY ENEMY ATTACK(\s*)$/i,
    /^(\s*)SE: PLAY ENEMY DAMAGE(\s*)$/i,
    /^(\s*)SE: PLAY ENEMY COLLAPSE(\s*)$/i,
    /^(\s*)SE: PLAY BOSS COLLAPSE 1(\s*)$/i,
    /^(\s*)SE: PLAY BOSS COLLAPSE 2(\s*)$/i,
    /^(\s*)SE: PLAY ACTOR DAMAGE(\s*)$/i,
    /^(\s*)SE: PLAY ACTOR COLLAPSE(\s*)$/i,
    /^(\s*)SE: PLAY RECOVERY(\s*)$/i,
    /^(\s*)SE: PLAY MISS(\s*)$/i,
    /^(\s*)SE: PLAY EVASION(\s*)$/i,
    /^(\s*)SE: PLAY MAGIC EVASION(\s*)$/i,
    /^(\s*)SE: PLAY REFLECTION(\s*)$/i,
    /^(\s*)SE: PLAY SHOP(\s*)$/i,
    /^(\s*)SE: PLAY USE ITEM(\s*)$/i,
    /^(\s*)SE: PLAY USE SKILL(\s*)$/i,
    /^(\s*)TP +X: target, (show)(\s*)$/i,
    /^(\s*)TP -X: target, (show)(\s*)$/i,
    /^(\s*)TP +X%: target, (show)(\s*)$/i,
    /^(\s*)TP -X%: target, (show)(\s*)$/i,
    /^(\s*)TP +VARIABLE X: target, (show)(\s*)$/i,
    /^(\s*)TP -VARIABLE X: target, (show)(\s*)$/i,
    /^(\s*)TP +VARIABLE X%: target, (show)(\s*)$/i,
    /^(\s*)TP -VARIABLE X%: target, (show)(\s*)$/i,
    /^(\s*)ATTACK ANIMATION: target(\s*)$/i,
    /^(\s*)ENEMY EFFECT: target, effect-type(\s*)$/i,
    /^(\s*)FACE target: args(\s*)$/i,
    /^(\s*)FLASH SCREEN: args(\s*)$/i,
    /^(\s*)FLOAT target: (height), (frames)(\s*)$/i,
    /^(\s*)FLOAT target: (height%), (frames)(\s*)$/i,
    /^(\s*)HIDE BATTLE HUD(\s*)$/i,
    /^(\s*)JUMP target: (height), (frames)(\s*)$/i,
    /^(\s*)JUMP target: (height%), (frames)(\s*)$/i,
    /^(\s*)MOTION type: target, (no weapon)(\s*)$/i,
    /^(\s*)MOVE target: args(\s*)$/i,
    /^(\s*)OPACITY target: x, (frames)(\s*)$/i,
    /^(\s*)OPACITY target: x%, (frames)(\s*)$/i,
    /^(\s*)SHOW BATTLE HUD(\s*)$/i,
    /^(\s*)SHAKE SCREEN: (power), (speed), (frames)(\s*)$/i,
    /^(\s*)TINT SCREEN: args(\s*)$/i,
    /^(\s*)CAMERA FOCUS: target, (location), (frames)(\s*)$/i,
    /^(\s*)CAMERA OFFSET: DIRECTION, DISTANCE(\s*)$/i,
    /^(\s*)ZOOM: x%, (frames)(\s*)$/i,
    /^(\s*)ZOOM: x.y, (frames)(\s*)$/i,






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