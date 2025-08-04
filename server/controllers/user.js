const { validatePartialUser } = require("../verify/functions");
const User = require('../model/User.js');

class UserController {

    //  Fetch All Users
    static async getUsers(req, res) {
        try {
            const queryUsers = await User.find();
            const data = queryUsers.map(user => {
                return {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                }
            })
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: 'Error internal server, error show users' })
        }
    };


    //  Fetch a Single User by ID
    static async getUser(req, res) {
        try {
            const id = req.params.id;
            const verify = validatePartialUser({ id });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }

            const query = { _id: id };
            const queyUser = await User.findOne(query);

            const user = {
                _id: queyUser._id,
                email: queyUser.email,
                name: queyUser.name,
            }

            return res.status(200).json(user);



        } catch (error) {
            return res.status(500).json({ message: 'Error internal server, error show user' })
        }
    };

    //  Add User 
    static async createUser(req, res) {
        try {
            const verify = validatePartialUser(req.body);
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }

            const data = req.body;
            const newUser = new User({
                name: data.name,
                email: data.email

            })

            const result = await newUser.save();
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ message: 'Error internal server, error adding to user' })
        }
    };

    //  Update User by ID  
    static async updateUser(req, res) {
        try {
            const verify = validatePartialUser(req.params);
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }

            const data = req.body;
            const paramsId = req.params.id;
            const result = await User.findByIdAndUpdate(paramsId, { name: data.name, email: data.email });

            return res.status(200).json(result);


        } catch (error) {
            return res.status(500).json({ message: 'Error internal server' })
        }
    };

    //  Delete  User by ID  
    static async deleteUser(req, res) {
        try {
            const verify = validatePartialUser(req.params);
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }

            const id = req.params.id;
            const query = { _id: id };
            const result = await User.findByIdAndDelete(query);

            return res.status(200).json(result);


        } catch (error) {
            return res.status(500).json({ message: 'Error internal server' });
        }
    };


}



module.exports = UserController

