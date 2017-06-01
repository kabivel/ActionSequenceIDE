CodeMirror.defineSimpleMode("simplemode", {

    start: 
    [
        //start tags
        {
            regex: /\s*<(?:SETUP ACTION|WHOLE ACTION|TARGET ACTION|FOLLOW ACTION|FINISH ACTION)>\s*$/i,
            token: "header",
            next: "inTag",
            sol: true,
            indent: true,
        }
    ],

    inTag: 
    [
        //end tags
        {
            regex: /\s*<\/(?:SETUP ACTION|WHOLE ACTION|TARGET ACTION|FOLLOW ACTION|FINISH ACTION)>\s*$/i,
            token: "header",
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
            regex: /\s*(?:ACTION ANIMATION|ACTION COMMON EVENT|CAST ANIMATION|CLEAR BATTLE LOG|DEATH BREAK|DISPLAY ACTION|PERFORM ACTION|PERFORM FINISH|PERFORM START|WAIT FOR ANIMATION|WAIT FOR EFFECT|WAIT FOR MOVEMENT|WAIT FOR NEW LINE|REFRESH STATUS|WAIT FOR FLOAT|WAIT FOR JUMP|WAIT FOR OPACITY|CAMERA CLAMP ON|CAMERA CLAMP OFF|CAMERA PAN|CAMERA SCREEN|WAIT FOR CAMERA|WAIT FOR ZOOM|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ACTION EFFECT)\s*$/i,
            token: "comment",
            sol: true,
        },
        
        //command: target
        {
            regex: /(\s*)(ACTION EFFECT|MOTION WAIT)(:\s+)(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus)(\s*)$/i,
            token: [null, "comment", "opperator", "atom", null],
            sol: true,
        },
        
        //command: frames
        {
            regex: /(\s*)(WAIT|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ANIMATION WAIT)(:\s+)(\d+)(\s*)$/i,
            token: [null, "comment", "opperator", "variable-3", null],
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