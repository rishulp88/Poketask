const router = require('express').Router();
const userController = require('./controllers/auth');
const authMiddleware = require('./middlewares/auth');
const taskController = require('./controllers/tasks')


router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);
router.post('/addTask', authMiddleware, taskController.add);
router.post('/remove', authMiddleware, taskController.remove);
router.post('/check', authMiddleware, taskController.check);
router.get('/points', authMiddleware, userController.getPoints);
router.post('/isChecked', authMiddleware, taskController.isChecked);



module.exports = router;
