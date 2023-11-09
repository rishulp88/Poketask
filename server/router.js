const router = require('express').Router();
const userController = require('./controllers/auth');
// const authMiddleware = require('./middlewares/auth');


router.post('/register', userController.create);
router.post('/login', userController.login);
// router.get('/me', authMiddleware, userController.profile);
// router.post('/logout', authMiddleware, userController.logout);




module.exports = router;
