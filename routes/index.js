import express from 'express';
const router  = express.Router();

//home
router.get('/', function(req, res) {
    res.render('index', {
      header: 'express-boilerplate',
      description: 'Your basic web-app structure.'
    });
});

module.exports = router;
