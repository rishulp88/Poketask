///router points used in testing

import express, { Router } from "express";
import { logout, profile, getPoints, login, create } from './controllers/auth';
import authMiddleware from './middlewares/auth';
import { test, isChecked, check, remove, add } from './controllers/tasks';

const router: Router = express.Router();

router.post('/test',test)
router.post('/register', create);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/addTask', authMiddleware, add);
router.post('/check', authMiddleware, check);
router.post('/isChecked', authMiddleware, isChecked);
router.get('/points', authMiddleware, getPoints);
router.get('/me', authMiddleware, profile);
router.post('/remove', authMiddleware, remove);

export { router };