

var targets = /(user|target|targets|actors|existing actors|all actors|dead actors|actors not user|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|all alive|all members|all dead|all not user|focus|not focus|(?:(?:actor|character|enemy|friend|opponent)\s+\d+))/i

var stats = /(hp|mp|atk|def|mat|mdf|agi|luk)/i

var zeroto255 = /(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])/i

var actions = [



    /(\s*)(ZOOM)(:\s+)(?:(\d+)(\%)|(\d+)(\.)(\d+))(?:(,\s+)(frames)|)(\s*)$/i,
    
    /(\s*)(proxy)(\s+)(\d+)(\s+)(from)(\s+)(\d+)(\s*)$/i,


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