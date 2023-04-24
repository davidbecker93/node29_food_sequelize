const express = require('express');
const { getUser, getUserById, loginUser, createUser, updateUser, deleteUser, getLikeRes, getLikeByRes, getLikeByUser, getRateRes, getRateByRes, getRateByUser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/users', getUser);
userRouter.get('/:id', getUserById);
userRouter.post('/login', loginUser);
userRouter.post('/signup', createUser);
userRouter.put('/update-user/:id', updateUser);
userRouter.delete('/delete-user/:id', deleteUser);
userRouter.post('/like', getLikeRes);
userRouter.get('/like-rest/:id', getLikeByRes);
userRouter.get('/like-user/:id', getLikeByUser);
userRouter.post('/rate', getRateRes);
userRouter.get('/rate-rest/:id', getRateByRes);
userRouter.get('/rate-user/:id', getRateByUser);




module.exports = userRouter;
