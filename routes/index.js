import express from 'express';
const router  = express.Router();

//home
router.get('/', function(req, res) {
    res.render('index', {title: 'Initial Express app'});
});

module.exports = router;
