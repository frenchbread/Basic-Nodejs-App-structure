module.exports = function(app){

    app.get('/', require('./home').get);

    //app.post('/', require('./home').post);
};