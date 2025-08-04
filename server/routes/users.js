const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js');

//  Fetch All Users
router.get('/users', UserController.getUsers);


//  Fetch a Single User by ID
router.get('/users/:id', UserController.getUser);

//  Add User 
router.post('/users', UserController.createUser);

//  Update User by ID  
router.put('/users/:id', UserController.updateUser);

//  Delete  User by ID  
router.delete('/users/:id', UserController.deleteUser);



module.exports = router;