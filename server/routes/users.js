const express = require('express');
const router = express.Router();
const User = require('../model/User.js');

//  Fetch All Users
router.get('/users', async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: 'Error internal server' })
        console.log('Error');
    }
});


//  Fetch a Single User by ID
router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id };
        const user = await User.findOne(query);
        res.status(200).json(user);

        if (!user) {
            res.status(403).json({ message: 'User not found' })

        }


    } catch (error) {
        res.status(400).json({ message: 'Error internal server' })
        console.log('Error');
    }
});

//  Add User 
router.post('/user', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User({
            name: data.name,
            email: data.email

        })

        const result = await newUser.save();
        res.status(200).json(result);

        // if (!result) {
        //     res.status(403).json({ message: 'Error the data saved' })
        // }

    } catch (error) {
        // res.status(400).json({ message: 'Error internal server' })
        console.log('Error');
    }
});

//  Update User by ID  
router.put('/user/:id', async (req, res) => {
    try {
        const data = req.body;
        const paramsId = req.params.id;
        const result = await User.findByIdAndUpdate(paramsId, { name: data.name, email: data.email });
        res.status(200).json(result);

        // if (!result) {
        //     res.status(403).json({ message: 'Error the data updated' })
        // }


    } catch (error) {
        // res.status(400).json({ message: 'Error internal server' })
        console.log('Error');
    }
});

//  Delete  User by ID  
router.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id };
        const result = await User.findByIdAndDelete(query);
        res.status(200).json(result);
        
        // if (!result) {
        //     res.status(403).json({ message: 'Error the data deleted'});            
        // }
        
    } catch (error) {
        // res.status(400).json({ message: 'Error internal server'});            
        console.log('Error');
    }
});



module.exports = router;