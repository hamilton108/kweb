var Plates = require('plates'),
    fs = require('fs');

    const templates = {
        layout : fs.readFileSync(__dirname + '/ajourhold.html', 'utf8')
    };
module.exports = function(main, title, options) {
    if (! options) {
        options = {};
    }
    var data = {
    };
    ['error', 'info'].forEach(function(messageType) {
        if (options[messageType]) {
            data.messages += Plates.bind(templates.alert,
                    {message: options[messageType]});
        }
    });
    return Plates.bind(templates.layout, data);
};
