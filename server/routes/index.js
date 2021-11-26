let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');
let userController = require('../controllers/user');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

//TODO
/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

//TODO
/* GET PublicSurveys Page Us page. */
router.get('/public-surveys', indexController.displayPublicSurveysPage);

module.exports = router;
