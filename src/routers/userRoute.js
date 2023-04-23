const express = require('express');
const { getUser, getUserById, loginUser, createUser, updateUser, deleteUser, getLikeById, orderFoodfromUser, getRateById } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/users', getUser);
userRouter.get('/:id', getUserById);
userRouter.post('/login', loginUser);
userRouter.post('/signup', createUser);
userRouter.put('/update-user/:id', updateUser);
userRouter.delete('/delete-user/:id', deleteUser);
userRouter.post('/rest-like/:id', getLikeById);
userRouter.post("/order-food", orderFoodfromUser);
userRouter.get("/rate/:id", getRateById);

module.exports = userRouter;
