import express from 'express';
import { createUser } from '../controllers/userController.js';
import {authenticate} from '../firebase.js'

const userRouter = express.Router();

// Express Middleware for Firebase Authentication
userRouter.use(authenticate);

// Create User endpoint with authentication
//userRouter.post('/createUser', authenticate, createUser);

// Create User endpoint without authentication
userRouter.post('/createUser', createUser);

export default userRouter;