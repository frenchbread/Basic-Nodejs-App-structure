var app     = require('../app');
var config  = require('../config');

log         = require('../lib/log')(module);

var port = process.env.PORT || config.get('port');

app.listen(port, function() {
    log.info('Listening on port ' + port);
});
